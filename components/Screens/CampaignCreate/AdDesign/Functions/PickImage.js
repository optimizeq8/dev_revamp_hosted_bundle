import * as Permissions from "expo-permissions";
import { showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
// ADD TRANSLATE PROP
export const askForPermssion = async screenProps => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const { translate } = screenProps;
  if (status !== "granted") {
    showMessage({
      message: translate("Please allow access to the gallery to upload media"),
      position: "top",
      type: "warning"
    });
    Platform.OS === "ios" && Linking.openURL("app-settings:");
  }
};

export const pick = async (mediaTypes, screenProps) => {
  await askForPermssion(screenProps);
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: mediaTypes,
    //Platform.OS === "ios" ? "Images" : "All",
    base64: false,
    exif: false,
    quality: 0.8
  });

  return result;
};

export const _pickImage = async (
  mediaTypes = "All",
  setMediaModalVisible,
  storyAdCards,
  storyAdsArray,
  save_campaign_info,
  onToggleModal,
  adType,
  setTheState,
  screenProps
) => {
  try {
    let result = await pick(mediaTypes, screenProps);

    let file = await FileSystem.getInfoAsync(result.uri, {
      size: true
    });
    const { translate } = screenProps;
    setMediaModalVisible(false);
    setTheState({ directory: "/ImagePicker/" });
    if (!result.cancelled) {
      if (result.type === "image") {
        if (result.width >= 1080 && result.height >= 1920) {
          ImageManipulator.manipulateAsync(
            result.uri,
            [
              {
                resize:
                  result.width >= (result.height / 16) * 9
                    ? {
                        height: 1920
                      }
                    : {
                        width: 1080
                      }
              }
            ],
            {
              compress: 1
            }
          )
            .then(async manipResult => {
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [
                  {
                    crop: {
                      originX: Math.floor((manipResult.width - 1080) / 2),
                      originY: Math.floor((manipResult.height - 1920) / 2),
                      width: 1080,
                      height: 1920
                    }
                  }
                ],
                {
                  compress: 1
                }
              );
              let newSize = await FileSystem.getInfoAsync(manipResult.uri, {
                size: true
              });

              if (newSize.size > 5000000) {
                setTheState({
                  mediaError: "Image must be less than 5 MBs",
                  image: "//"
                });
                onToggleModal(false);
                save_campaign_info({
                  media: "//",
                  type: ""
                });
                showMessage({
                  message: translate(
                    "Image must be less than {{fileSize}} MBs",
                    {
                      fileSize: 5
                    }
                  ),
                  position: "top",
                  type: "warning"
                });
                return Promise.reject("Image must be less than 5 MBs");
              }

              setTheState({
                directory: "/ImageManipulator/"
              });
              result.uri = manipResult.uri;
              result.height = manipResult.height;
              result.width = manipResult.width;
            })
            .then(() => {
              if (adType === "StoryAd" && storyAdCards.storyAdSelected) {
                let cards = storyAdsArray;
                let card = storyAdsArray[storyAdCards.selectedStoryAd.index];

                card = {
                  ...card,
                  index: storyAdCards.selectedStoryAd.index,
                  media: result.uri,
                  uploaded: false,
                  media_type: result.type.toUpperCase(),
                  iosVideoUploaded: false,
                  rejectionUpload: true
                };

                cards[storyAdCards.selectedStoryAd.index] = card;
                setTheState({
                  storyAdCards: {
                    ...storyAdCards,
                    // storyAdSelected: false,
                    selectedStoryAd: {
                      ...card
                    }
                  },
                  type: result.type.toUpperCase()
                });
                save_campaign_info({
                  media: result.uri,
                  type: result.type.toUpperCase()
                });
                onToggleModal(false);
              } else {
                setTheState({
                  media: result.uri,
                  type: result.type.toUpperCase(),
                  mediaError: null,
                  result: result.uri,
                  iosVideoUploaded: false,
                  rejectionUpload: true
                });

                onToggleModal(false);
                showMessage({
                  message: translate("Image has been selected successfully"),
                  position: "top",
                  type: "success"
                });
                save_campaign_info({
                  media: result.uri,
                  type: result.type.toUpperCase()
                });
              }
            })
            .catch(error => {
              // console.log(error);

              onToggleModal(false);
              showMessage({
                message:
                  error ||
                  translate(
                    "The dimensions are too large, please choose a different image"
                  ),
                // message:
                //   error ||
                //   "The dimensions are too large, please choose a different image.",
                position: "top",
                type: "warning"
              });
            });
          return;
        } else if (
          Math.floor(result.width / 9) !== Math.floor(result.height / 16) ||
          result.width < 1080 ||
          result.height < 1920
        ) {
          setTheState({
            mediaError:
              "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px.",
            media: "//",
            type: ""
            // videoIsLoading: false
          });
          save_campaign_info({
            media: "//",
            type: ""
          });
          onToggleModal(false);
          showMessage({
            message: translate(
              "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px"
            ),
            // message:
            //   "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px.",
            position: "top",
            type: "warning"
          });
          return;
        } else {
          setTheState({
            media: result.uri,
            type: result.type.toUpperCase(),
            mediaError: null,
            result: result.uri,
            iosVideoUploaded: false
          });
          onToggleModal(false);
          showMessage({
            message: translate("Image has been selected successfully"),
            position: "top",
            type: "success"
          });
          save_campaign_info({
            media: result.uri,
            type: result.type.toUpperCase()
          });
          return;
        }
      } else if (result.type === "video") {
        if (result.duration > 10999) {
          setTheState({
            mediaError: "Maximum video duration  is 10 seconds.",
            media: "//",
            sourceChanging: true
          });
          save_campaign_info({
            media: "//",
            type: ""
          });
          showMessage({
            message: translate("Maximum video duration is 10 seconds"),
            description:
              translate("Selected video duration") +
              (result.duration / 1000).toFixed(2) +
              translate("seconds"),
            position: "top",
            type: "warning"
          });
          onToggleModal(false);
          setTheState({
            sourceChanging: false
          });
          return;
        } else if (result.duration < 3000) {
          setTheState({
            mediaError: "Minimum video duration  is 3 seconds.",
            media: "//",
            sourceChanging: true
          });
          save_campaign_info({
            media: "//",
            type: ""
          });
          showMessage({
            message: translate("Minimum video duration is 3 seconds"),
            description:
              translate("Selected video duration") +
              (result.duration / 1000).toFixed(2) +
              translate("seconds"),

            position: "top",
            type: "warning"
          });
          onToggleModal(false);
          setTheState({ sourceChanging: false });
          return;
        } else if (file.size > 32000000) {
          setTheState({
            mediaError: "Allowed video size is up to 32 MBs.",
            media: "//"
          });
          save_campaign_info({
            media: "//",
            type: ""
          });
          showMessage({
            message: translate("Allowed video size is up to {{fileSize}} MBs", {
              fileSize: 32
            }),
            position: "top",
            type: "warning"
          });
          onToggleModal(false);
          return;
        } else if (
          result.width >= 1080 &&
          result.height >= 1920 &&
          Math.floor(result.width / 9) === Math.floor(result.height / 16)
        ) {
          if (adType === "StoryAd" && storyAdCards.storyAdSelected) {
            let cards = storyAdsArray;
            let card = storyAdsArray[storyAdCards.selectedStoryAd.index];

            card = {
              ...card,
              uploaded: false,
              index: storyAdCards.selectedStoryAd.index,
              media: result.uri,
              media_type: result.type.toUpperCase(),
              iosVideoUploaded: false,
              rejectionUpload: true
            };

            cards[storyAdCards.selectedStoryAd.index] = card;
            setTheState({
              storyAdCards: {
                ...storyAdCards,
                // storyAdSelected: false,
                selectedStoryAd: {
                  ...card
                }
              },
              type: result.type.toUpperCase()
            });
            save_campaign_info({
              media: result.uri,
              type: result.type.toUpperCase()
            });
            onToggleModal(false);
          } else {
            setTheState({
              media: result.uri,
              type: result.type.toUpperCase(),
              mediaError: null,
              result: result.uri,
              iosVideoUploaded: false,
              sourceChanging: true
            });
            onToggleModal(false);
            showMessage({
              message: translate("Video has been selected successfully"),
              position: "top",
              type: "success"
            });
          }
          save_campaign_info({
            media: result.uri,
            type: result.type.toUpperCase()
          });
          setTheState({ sourceChanging: false });
          return;
        } else {
          setTheState({
            mediaError:
              "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
            media: "//",

            sourceChanging: true
          });
          save_campaign_info({
            media: "//",
            type: ""
          });
          onToggleModal(false);
          showMessage({
            message: translate(
              "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920"
            ),
            // message:
            //   "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
            position: "top",
            type: "warning"
          });
          setTheState({ sourceChanging: false });
          return;
        }
      }
    } else if (!result.cancelled && isNull(media)) {
      showMessage({
        message: translate("Please choose a media file"),
        position: "top",
        type: "warning"
      });
      setTheState({
        mediaError: "Please choose a media file.",
        media: "//"
      });
      save_campaign_info({
        media: "//",
        type: ""
      });
      onToggleModal(false);
      return;
    } else {
      onToggleModal(false);
      return;
    }
  } catch (error) {
    onToggleModal(false);
    // console.log("error image pick", error);
  }
};
