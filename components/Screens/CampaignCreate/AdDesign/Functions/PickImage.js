import * as Permissions from "expo-permissions";
import { showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import segmentEventTrack from "../../../../segmentEventTrack";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
import { Linking } from "expo";
import { PESDK } from "react-native-photoeditorsdk";
import {
  VESDK,
  Configuration,
  VideoFormat,
  SerializationExportType,
  TintMode,
} from "react-native-videoeditorsdk";
import { ProcessingManager } from "react-native-video-processing";
import PhotoEditorConfiguration from "../../../../Functions/PhotoEditorConfiguration";
// ADD TRANSLATE PROP
export const askForPermssion = async (screenProps) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const { translate } = screenProps;
  if (status !== "granted") {
    const pkg = Constants.manifest.releaseChannel
      ? Constants.manifest.android.package // When published, considered as using standalone build
      : "host.exp.exponent"; // In expo client mode
    showMessage({
      message: translate("Please allow access to the gallery to upload media"),
      position: "top",
      type: "warning",
      onPress: () =>
        Platform.OS === "ios"
          ? Linking.openURL("app-settings:")
          : Platform.OS === "android" &&
            IntentLauncher.startActivityAsync(
              IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
              { data: "package:" + pkg }
            ),
      duration: 5000,
      description: translate("Press here to open settings"),
    });
  }
  return status;
};

export const pick = async (mediaTypes, screenProps) => {
  let status = await askForPermssion(screenProps);
  let result = "";
  if (status === "granted") {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes,
      //Platform.OS === "ios" ? "Images" : "All",
      base64: false,
      exif: false,
      quality: 0.8,
    });
  }

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
  screenProps,
  rejected,
  mediaEditor = {},
  editImage
) => {
  try {
    let result = {};
    if (!editImage) result = await pick(mediaTypes, screenProps);
    else
      result = {
        uri: mediaEditor.mediaUri,
        cancelled: false,
        type: mediaEditor.media_type === "IMAGE" ? "image" : "video",
      };
    let configuration = PhotoEditorConfiguration({
      serialization: mediaEditor && mediaEditor.hasOwnProperty("serialization"),
    });
    const { translate } = screenProps;
    setMediaModalVisible(false);
    if (result && !result.cancelled) {
      if (result.type === "image") {
        let uneditedImageUri = result.uri;
        PESDK.openEditor(
          result.uri,
          configuration,
          mediaEditor && mediaEditor.hasOwnProperty("serialization")
            ? mediaEditor.serialization
            : null
        )
          .then(async (manipResult) => {
            let serialization = {};
            if (manipResult) {
              serialization = manipResult.serialization;
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.image
              );
              if (
                Math.floor(manipResult.width / 9) !==
                Math.floor(manipResult.height / 16)
              ) {
                //check for aspect ration incase user undos the cropping
                setTheState({
                  mediaError:
                    "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px.",
                  media: "//",
                  type: "",
                });
                !rejected &&
                  save_campaign_info({
                    media: "//",
                    type: "",
                  });
                onToggleModal(false);
                segmentEventTrack("Selected Image Error", {
                  campaign_error_image:
                    "Image's aspect ratio must be 9:16 with a minimum size of 1080px x 1920px",
                });
                return Promise.reject({
                  wrongAspect: true,
                  message:
                    "Image's aspect ratio must be 9:16\nwith a minimum size of 1080px x 1920px",
                });
              }
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [
                  {
                    resize: {
                      width: 1080,
                      height: 1920,
                    },
                  },
                ],
                {
                  compress: 1,
                }
              );
              let newSize = await FileSystem.getInfoAsync(manipResult.uri, {
                size: true,
              });

              if (newSize.size > 5000000) {
                setTheState({
                  mediaError: "Image must be less than 5 MBs",
                  image: "//",
                });
                onToggleModal(false);
                !rejected &&
                  save_campaign_info({
                    media: "//",
                    type: "",
                  });
                showMessage({
                  message: translate(
                    "Image must be less than {{fileSize}} MBs",
                    {
                      fileSize: 5,
                    }
                  ),
                  position: "top",
                  type: "warning",
                });
                segmentEventTrack("Seleeted Image Error", {
                  campaign_error_image: "Image must be less than 5 MBs",
                });
                return Promise.reject("Image must be less than 5 MBs");
              }

              setTheState({
                directory: "/ImageManipulator/",
              });
              result.uri = manipResult.uri;
              result.height = manipResult.height;
              result.width = manipResult.width;
              result.serialization = serialization;
            } else {
              return Promise.reject("Editing canceled");
            }
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
                fileReadyToUpload: true,
                uneditedImageUri,
                serialization: result.serialization,
              };
              segmentEventTrack("Selected Story Ad Image Successful");
              segmentEventTrack("Selected Story Ad serialization", {
                index: storyAdCards.selectedStoryAd.index,
                ...result.serialization,
              });
              cards[storyAdCards.selectedStoryAd.index] = card;
              setTheState({
                storyAdCards: {
                  ...storyAdCards,
                  // storyAdSelected: false,
                  selectedStoryAd: {
                    ...card,
                  },
                },
                fileReadyToUpload: true,
                type: result.type.toUpperCase(),
              });
              save_campaign_info({
                media: result.uri,
                type: result.type.toUpperCase(),
                fileReadyToUpload: true,
              });
              onToggleModal(false);
            } else {
              setTheState({
                media: result.uri,
                type: result.type.toUpperCase(),
                mediaError: null,
                result: result.uri,
                iosVideoUploaded: false,
                fileReadyToUpload: true,
                uneditedImageUri,
                serialization: result.serialization,
              });

              onToggleModal(false);
              showMessage({
                message: translate("Image has been selected successfully"),
                position: "top",
                type: "success",
              });
              segmentEventTrack("Selected Image Successful");
              segmentEventTrack("Selected Image serialization", {
                ...result.serialization,
              });
              !rejected &&
                save_campaign_info({
                  media: result.uri,
                  type: result.type.toUpperCase(),
                  fileReadyToUpload: true,
                  uneditedImageUri,
                  serialization: result.serialization,
                });
            }
          })
          .catch((error) => {
            // console.log(error);

            onToggleModal(false);
            segmentEventTrack("Seleeted Image Error", {
              campaign_error_image: "The dimensions are too large",
              error,
            });
            showMessage({
              message: error.wrongAspect
                ? error.message
                : error ||
                  translate(
                    "The dimensions are too large, please choose a different image"
                  ),
              position: "top",
              type: "warning",
            });
          });
      } else if (result.type === "video") {
        let exportOption = {
          serialization: {
            enabled: true,
            exportType: SerializationExportType.OBJECT,
          },
        };
        uneditedImageUri = result.uri;
        let vConfiguration: Configuration = {
          forceCrop: true,
          transform: {
            items: [{ width: 9, height: 16 }],
          },
          sticker: {
            personalStickers: true,
            categories: [{ identifier: "imgly_sticker_category_shapes" }],
          },
        };
        if (Platform.OS === "ios") {
          exportOption["filename"] = "exportSerlization";
          vConfiguration["export"] = exportOption;
        } else {
          vConfiguration["export"] = exportOption;
        }
        VESDK.openEditor(
          { uri: result.uri },
          vConfiguration,
          mediaEditor &&
            mediaEditor.hasOwnProperty("serialization") &&
            Platform.OS === "android"
            ? mediaEditor.serialization
            : null
        )

          .then(async (manipResult) => {
            console.log("manipResult", manipResult);

            if (manipResult) {
              let newResult = await ProcessingManager.getVideoInfo(
                manipResult.hasChanges
                  ? manipResult.video
                    ? manipResult.video
                    : manipResult.image
                  : result.uri
              );
              // manipResult.serialization.image;
              console.log(newResult);

              let newSize = await FileSystem.getInfoAsync(
                manipResult.hasChanges
                  ? manipResult.video
                    ? manipResult.video
                    : manipResult.image
                  : result.uri
              );

              if (
                Math.floor(newResult.size.width / 9) !==
                Math.floor(newResult.size.height / 16)
              ) {
                setTheState({
                  mediaError:
                    "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
                  media: "//",
                  sourceChanging: true,
                  uneditedImageUri: "//",
                });
                !rejected &&
                  save_campaign_info({
                    media: "//",
                    type: "",
                  });
                onToggleModal(false);
                segmentEventTrack("Selected Video Error", {
                  campaign_error_video:
                    "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920",
                });

                showMessage({
                  message: translate(
                    "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920"
                  ),
                  // message:
                  //   "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
                  position: "top",
                  type: "warning",
                });
                setTheState({ sourceChanging: false });
                return false;
              } else if (newResult.duration > 10.999) {
                setTheState({
                  mediaError: "Maximum video duration  is 10 seconds.",
                  media: "//",
                  sourceChanging: true,
                  uneditedImageUri: "//",
                });
                !rejected &&
                  save_campaign_info({
                    media: "//",
                    type: "",
                  });
                segmentEventTrack("Selected Video Error", {
                  campaign_error_video: "Maximum video duration is 10 seconds",
                });
                showMessage({
                  message: translate("Maximum video duration is 10 seconds"),
                  description:
                    translate("Selected video duration") +
                    newResult.duration.toFixed(2) +
                    translate("seconds"),
                  position: "top",
                  type: "warning",
                });
                onToggleModal(false);
                setTheState({
                  sourceChanging: false,
                });
                return false;
              } else if (newResult.duration < 3.0) {
                setTheState({
                  mediaError: "Minimum video duration  is 3 seconds.",
                  media: "//",
                  sourceChanging: true,
                  uneditedImageUri: "//",
                });
                !rejected &&
                  save_campaign_info({
                    media: "//",
                    type: "",
                  });
                segmentEventTrack("Selected Video Error", {
                  campaign_error_video: "Minimum video duration is 3 seconds",
                });
                showMessage({
                  message: translate("Minimum video duration is 3 seconds"),
                  description:
                    translate("Selected video duration") +
                    newResult.duration.toFixed(2) +
                    translate("seconds"),

                  position: "top",
                  type: "warning",
                });
                onToggleModal(false);
                setTheState({ sourceChanging: false });
                return false;
              } else if (newSize.size > 32000000) {
                setTheState({
                  mediaError: "Allowed video size is up to 32 MBs.",
                  media: "//",
                  uneditedImageUri: "//",
                });
                !rejected &&
                  save_campaign_info({
                    media: "//",
                    type: "",
                  });
                segmentEventTrack("Selected Video Error", {
                  videoError: "Allowed video size is up to 32 MBs",
                });
                showMessage({
                  message: translate(
                    "Allowed video size is up to {{fileSize}} MBs",
                    {
                      fileSize: 32,
                    }
                  ),
                  position: "top",
                  type: "warning",
                });
                onToggleModal(false);
                return false;
              } else {
                result.uri = manipResult.hasChanges
                  ? manipResult.video
                    ? manipResult.video
                    : manipResult.image
                  : result.uri;
                result.serialization = manipResult.serialization;
              }
            } else {
              return Promise.reject("Editing canceled");
            }
          })
          .then((correct = true) => {
            if (adType === "StoryAd" && storyAdCards.storyAdSelected) {
              let cards = storyAdsArray;
              let card = storyAdsArray[storyAdCards.selectedStoryAd.index];

              card = {
                ...card,
                uploaded: false,
                index: storyAdCards.selectedStoryAd.index,
                media: correct ? result.uri : "//",
                media_type: result.type.toUpperCase(),
                iosVideoUploaded: false,
                uneditedImageUri,
                fileReadyToUpload: true,
              };

              cards[storyAdCards.selectedStoryAd.index] = card;
              setTheState({
                storyAdCards: {
                  ...storyAdCards,
                  // storyAdSelected: false,
                  selectedStoryAd: {
                    ...card,
                  },
                },
                fileReadyToUpload: true,
                type: result.type.toUpperCase(),
              });
              !rejected &&
                save_campaign_info({
                  media: result.uri,
                  type: result.type.toUpperCase(),
                  fileReadyToUpload: true,
                });
              onToggleModal(false);
            } else {
              if (correct) {
                setTheState({
                  media: result.uri,
                  type: result.type.toUpperCase(),
                  mediaError: null,
                  iosVideoUploaded: false,
                  sourceChanging: true,
                  fileReadyToUpload: true,
                  uneditedImageUri,
                  serialization: result.serialization,
                });
                onToggleModal(false);
                segmentEventTrack("Selected Video Successfully");
                showMessage({
                  message: translate("Video has been selected successfully"),
                  position: "top",
                  type: "success",
                });
                !rejected &&
                  save_campaign_info({
                    media: result.uri,
                    type: result.type.toUpperCase(),
                    fileReadyToUpload: true,
                  });
                setTheState({ sourceChanging: false });
              } else {
                segmentEventTrack("Selected Video Unsuccessfully");
                setTheState({
                  media: "//",
                });
              }
            }

            return;
          })
          .catch((err) => {
            // console.log(err);
            segmentEventTrack("Selected Video Error", {
              campaign_error_image: err,
            });
            showMessage({
              message: err,
              type: "warning",
            });
          });
      }
    } else if (result && !result.cancelled && isNull(media)) {
      showMessage({
        message: translate("Please choose a media file"),
        position: "top",
        type: "warning",
      });
      segmentEventTrack("Image Picker closed without selecting a media file");
      setTheState({
        mediaError: "Please choose a media file.",
        media: "//",
        uneditedImageUri: "//",
      });
      !rejected &&
        save_campaign_info({
          media: "//",
          type: "",
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
    segmentEventTrack("error image picker", { campaign_error_image: error });
  }
};
