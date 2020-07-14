import * as Permissions from "expo-permissions";
import { showMessage } from "react-native-flash-message";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import analytics from "@segment/analytics-react-native";
import * as ImageManipulator from "expo-image-manipulator";
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
import PhotoEditorConfiguration from "../../../../../Functions/PhotoEditorConfiguration";

import { RNFFprobe, RNFFmpeg } from "react-native-ffmpeg";
// ADD TRANSLATE PROP
export const askForPermssion = async (screenProps) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const { translate } = screenProps;
  if (status !== "granted") {
    const pkg = "com.optimizeapp.optimizeapp";
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
      allowsEditing: Platform.OS === "ios" && mediaTypes === "Videos",
    });
  }

  return result;
};

export const _pickImage = async (
  mediaTypes = "All",
  save_campaign_info_instagram,
  setTheState,
  screenProps,
  setMediaModalVisible,
  mediaEditor = {},
  editImage,
  videoIsExporting,
  carouselAdCards = {},
  carouselAdsArray,
  media_option = "single"
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

    let uneditedImageUri = result.uri;
    let serialization = null;
    let configuration = PhotoEditorConfiguration({
      width: 9,
      height: 16,
      serialization: mediaEditor && mediaEditor.hasOwnProperty("serialization"),
    });
    let file = {};
    if (result) {
      file = await FileSystem.getInfoAsync(result.uri, {
        size: true,
      });
      setTheState({ directory: "/ImagePicker/" });
    }
    setMediaModalVisible(false);
    const { translate } = screenProps;
    if (result && !result.cancelled) {
      if (result.type === "image") {
        PESDK.openEditor(
          result.uri,
          configuration,
          mediaEditor && mediaEditor.hasOwnProperty("serialization")
            ? mediaEditor.serialization
            : null
        )
          .then(async (manipResult) => {
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
                  mediaError: `Image's aspect ratio must be 1:1\nwith a minimum size of ${
                    media_option === "single"
                      ? "500px x 500px"
                      : "600px x 600px"
                  }.`,
                  media: "//",
                  media_type: "",
                });

                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
                });

                return Promise.reject({
                  wrongAspect: true,
                  message: `Image's aspect ratio must be 1:1\nwith a minimum size of ${
                    media_option === "single"
                      ? "500px x 500px"
                      : "600px x 600px"
                  }`,
                });
              }
              let size =
                media_option === "single"
                  ? { width: 500, height: 500 }
                  : { width: 600, height: 600 };
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [
                  {
                    resize: size,
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

                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
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

                return Promise.reject("Image must be less than 5 MBs");
              }

              setTheState({
                directory: "/ImageManipulator/",
              });
              result.uri = manipResult.uri;
              result.height = manipResult.height;
              result.width = manipResult.width;
            } else {
              return Promise.reject("Editing canceled");
            }
          })
          .then(() => {
            if (media_option === "carousel") {
              let cards = carouselAdsArray;
              let card =
                carouselAdsArray[carouselAdCards.selectedCarouselAd.index];

              card = {
                ...card,
                index: carouselAdCards.selectedCarouselAd.index,
                media: result.uri,
                uploaded: false,
                media_type: result.type.toUpperCase(),
                iosVideoUploaded: false,
                fileReadyToUpload: true,
                uneditedImageUri,
                serialization: result.serialization,
              };
              analytics.track(`a_media_editor`, {
                campaign_channel: "instagram",
                campaign_ad_type: "InstagramStoryAd",
                action_status: "success",
                tool_used: "PESDK",
                media_type: result.type.toUpperCase(),
                ...result.serialization,
                index: carouselAdCards.selectedCarouselAd.index,
                source: "ad_design",
                source_action: "a_media_editor",
                image_for: "campaign_story_ad",
              });

              cards[carouselAdCards.selectedCarouselAd.index] = card;
              setTheState({
                carouselAdCards: {
                  ...carouselAdCards,
                  storyAdSelected: false,
                  selectedCarouselAd: {
                    ...card,
                  },
                },
                fileReadyToUpload: true,
                type: result.type.toUpperCase(),
              });
              // save_campaign_info_instagram({
              //   media: result.uri,
              //   type: result.type.toUpperCase(),
              //   fileReadyToUpload: true,
              // });
            } else {
              setTheState({
                media: result.uri,
                media_type: result.type.toUpperCase(),
                mediaError: null,
                result: result.uri,
                iosVideoUploaded: false,
                fileReadyToUpload: true,
                uneditedImageUri,
                serialization,
              });

              analytics.track(`a_media_editor`, {
                campaign_channel: "instagram",
                campaign_ad_type: "InstagramStoryAd",
                source: "ad_design",
                source_action: "a_media_editor",
                action_status: "success",
                tool_used: "PESDK",
                media_type: "IMAGE",
                ...serialization,
                image_for: "campaign_ad",
              });
              showMessage({
                message: translate("Image has been selected successfully"),
                position: "top",
                type: "success",
              });

              save_campaign_info_instagram({
                media: result.uri,
                media_type: result.type.toUpperCase(),
                fileReadyToUpload: true,
              });
            }
          })
          .catch((error) => {
            analytics.track(`a_error`, {
              campaign_channel: "instagram",
              campaign_ad_type: "InstagramStoryAd",
              error_page: "ad_design",
              error_description: error.wrongAspect
                ? error.message
                : error ||
                  "The dimensions are too large, please choose a different image",
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
        //FOR VIDEO CAROUSEL RATIO  SHOULD BE ONLY BE 1:1
        let ratio =
          media_option === "single"
            ? [
                { width: 9, height: 16 },
                { width: 4, height: 5 },
              ]
            : [{ width: 1, height: 1 }];
        let uneditedImageUri = result.uri;
        let vConfiguration: Configuration = {
          forceCrop: true,
          transform: {
            items: ratio,
          },
          sticker: {
            personalStickers: true,
            categories: [{ identifier: "imgly_sticker_category_shapes" }],
          },
        };
        if (Platform.OS === "ios") {
          let resUri = result.uri.split("/");
          exportOption["filename"] = resUri[resUri.length - 1].split(".")[0]; //get name of file without .mp4 || .mov extension
          vConfiguration["export"] = exportOption;
        } else {
          vConfiguration["export"] = exportOption;
        }
        VESDK.openEditor(
          { uri: result.uri },
          vConfiguration,
          mediaEditor && mediaEditor.hasOwnProperty("serialization")
            ? mediaEditor.serialization
            : null
        )

          .then(async (manipResult) => {
            // console.log("manipResult", manipResult);

            if (manipResult) {
              let actualUri = manipResult.hasChanges
                ? manipResult.video
                  ? manipResult.video
                  : manipResult.image
                : result.uri;
              videoIsExporting(true);
              let newResult = {};
              if (manipResult.hasChanges) {
                newResult = await RNFFprobe.getMediaInformation(actualUri);
                newResult = {
                  width:
                    newResult.streams[
                      newResult.streams[0].hasOwnProperty("width") ? 0 : 1
                    ].width,
                  height:
                    newResult.streams[
                      newResult.streams[0].hasOwnProperty("height") ? 0 : 1
                    ].height,
                  duration: newResult.duration / 1000,
                };
              } else {
                newResult = {
                  width: result.width,
                  height: result.height,
                  duration: result.duration / 1000,
                };
              }
              let newSize = await FileSystem.getInfoAsync(actualUri);
              // if (
              //   ((Math.floor(newResult.width / 9) !==
              //     Math.floor(newResult.height / 16) &&
              //     Math.floor(newResult.width / 4) !==
              //       Math.floor(newResult.height / 5) &&
              //     Math.floor(newResult.width / 1) !==
              //       Math.floor(newResult.height / 1)) ||
              //     newResult.width < 500) &&
              //   newResult.duration <= 120 &&
              //   newResult.duration >= 1.0
              // ) {
              //   let outputUri = actualUri.split("/");

              //   // await RNFFmpeg.execute(
              //   //   `-y -i ${actualUri} -vf scale=${
              //   //     Math.floor(newResult.width / 9) !==
              //   //     Math.floor(newResult.height / 16)
              //   //       ? "1080:1920"
              //   //       : "-1:1920" //-1 means scale inly by 1920 to keep aspect ratio
              //   //   } -vcodec libx264 ${FileSystem.documentDirectory}${
              //   //     outputUri[outputUri.length - 1]
              //   //   }`
              //   // );
              //   newResult = await RNFFprobe.getMediaInformation(
              //     `${FileSystem.documentDirectory}${
              //       outputUri[outputUri.length - 1]
              //     }`
              //   );

              //   newResult = {
              //     width:
              //       newResult.streams[
              //         newResult.streams[0].hasOwnProperty("width") ? 0 : 1
              //       ].width,
              //     height:
              //       newResult.streams[
              //         newResult.streams[0].hasOwnProperty("height") ? 0 : 1
              //       ].height,
              //     duration: newResult.duration / 1000,
              //     newUri: newResult.path,
              //   };
              //   newSize = await FileSystem.getInfoAsync(
              //     `${FileSystem.cacheDirectory}${
              //       outputUri[outputUri.length - 1]
              //     }`
              //   );
              // }
              videoIsExporting(false);
              if (newResult.duration > 120) {
                analytics.track(`a_error`, {
                  error_page: "ad_design",
                  error_description: "Maximum video duration  is 120 seconds.",
                });
                setTheState({
                  mediaError: "Maximum video duration  is 120 seconds.",
                  media: "//",
                  sourceChanging: true,
                  uneditedImageUri: "//",
                });
                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
                  //   rejected,
                });

                showMessage({
                  message: translate("Maximum video duration is 120 seconds"),
                  description:
                    translate("Selected video duration") +
                    newResult.duration.toFixed(2) +
                    translate("seconds"),
                  position: "top",
                  type: "warning",
                });
                // onToggleModal((false);
                setTheState({
                  sourceChanging: false,
                });
                return false;
              } else if (newResult.duration < 1.0) {
                analytics.track(`a_error`, {
                  campaign_channel: "instagram",
                  campaign_ad_type: "InstagramStoryAd",
                  error_page: "ad_design",
                  error_description: "Minimum video duration  is 1 second",
                });
                setTheState({
                  mediaError: "Minimum video duration  is 1 second",
                  media: "//",
                  sourceChanging: true,
                  uneditedImageUri: "//",
                });
                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
                  //   rejected,
                });

                showMessage({
                  message: translate("Minimum video duration is 1 second"),
                  description:
                    translate("Selected video duration") +
                    newResult.duration.toFixed(2) +
                    translate("seconds"),

                  position: "top",
                  type: "warning",
                });
                // onToggleModal((false);
                setTheState({ sourceChanging: false });
                return false;
              } else if (
                (Math.floor(newResult.width / 9) !==
                  Math.floor(newResult.height / 16) &&
                  Math.floor(newResult.width / 4) !==
                    Math.floor(newResult.height / 5)) ||
                newResult.width < 500
              ) {
                analytics.track(`a_error`, {
                  campaign_channel: "instagram",
                  campaign_ad_type: "InstagramStoryAd",
                  error_page: "ad_design",
                  error_description:
                    "Video's aspect ratio must be 16:9 or 4:5\nwith a minimum width size of 500",
                });
                setTheState({
                  mediaError:
                    "Video's aspect ratio must be 16:9 or 4:5 \nwith a minimum width size of 500",
                  media: "//",
                  sourceChanging: true,
                  uneditedImageUri: "//",
                });
                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
                  //   rejected,
                });
                // onToggleModal((false);

                showMessage({
                  message:
                    "Video's aspect ratio must be 16:9 or 4:5\nwith a minimum width size of 500",
                  // message:
                  //   "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
                  position: "top",
                  type: "warning",
                });
                setTheState({ sourceChanging: false });
                return false;
              } else if (newSize.size > 32000000) {
                analytics.track(`a_error`, {
                  campaign_channel: "instagram",
                  campaign_ad_type: "InstagramStoryAd",
                  error_page: "ad_design",
                  error_description: "Allowed video size is up to 32 MBs",
                });
                setTheState({
                  mediaError: "Allowed video size is up to 32 MBs.",
                  media: "//",
                  uneditedImageUri: "//",
                });
                // !rejected &&
                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
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
                // onToggleModal((false);
                return false;
              } else {
                result.uri = newResult.hasOwnProperty("newUri")
                  ? newResult.newUri
                  : manipResult.hasChanges
                  ? manipResult.video
                    ? manipResult.video
                    : manipResult.image
                  : result.uri;
                result.serialization = manipResult.serialization;
              }
            } else {
              analytics.track(`a_error`, {
                campaign_channel: "instagram",
                campaign_ad_type: "InstagramStoryAd",
                error_page: "ad_design",
                error_description: "Editing canceled",
              });
              return Promise.reject("Editing canceled");
            }
          })
          .then((correct = true) => {
            // console.log(result);

            if (
              media_option === "carousel" &&
              carouselAdCards.carouselAdSelected
            ) {
              let cards = carouselAdsArray;
              let card =
                carouselAdsArray[carouselAdCards.selectedCarouselAd.index];

              card = {
                ...card,
                uploaded: false,
                index: carouselAdCards.selectedCarouselAd.index,
                media: correct ? result.uri : "//",
                media_type: result.type.toUpperCase(),
                iosVideoUploaded: false,
                uneditedImageUri,
                fileReadyToUpload: true,
                serialization: result.serialization,
              };

              cards[carouselAdCards.selectedCarouselAd.index] = card;
              analytics.track(`a_media_editor`, {
                campaign_channel: "instagram",
                campaign_ad_type: "InstagramStoryAd",
                action_status: "success",
                tool_used: "VESDK",
                media_type: result.type.toUpperCase(),
                ...result.serialization,
              });
              setTheState({
                carouselAdCards: {
                  ...carouselAdCards,
                  carouselAdSelected: false,
                  selectedCarouselAd: {
                    ...card,
                  },
                },
                fileReadyToUpload: true,
                media_type: result.type.toUpperCase(),
              });
              // save_campaign_info_instagram({
              //   media: result.uri,
              //   media_type: result.type.toUpperCase(),
              //   fileReadyToUpload: true,
              //   //   rejected,
              // });
              // onToggleModal((false);
            } else {
              if (correct) {
                setTheState({
                  media: result.uri,
                  media_type: result.type.toUpperCase(),
                  mediaError: null,
                  iosVideoUploaded: false,
                  sourceChanging: true,
                  fileReadyToUpload: true,
                  uneditedImageUri,
                  serialization: result.serialization,
                });
                // onToggleModal((false);
                analytics.track(`a_media_editor`, {
                  campaign_channel: "instagram",
                  campaign_ad_type: "InstagramStoryAd",
                  action_status: "success",
                  tool_used: "VESDK",
                  media_type: result.type.toUpperCase(),
                  ...result.serialization,
                });

                showMessage({
                  message: translate("Video has been selected successfully"),
                  position: "top",
                  type: "success",
                });
                save_campaign_info_instagram({
                  media: result.uri,
                  media_type: result.type.toUpperCase(),
                  fileReadyToUpload: true,
                  uneditedImageUri,
                  serialization: result.serialization,
                  //   rejected,
                });
                setTheState({ sourceChanging: false });
              } else {
                analytics.track(`a_error`, {
                  error_page: "ad_design",
                  error_description: "Selected Video Unsuccessfully",

                  campaign_channel: "instagram",
                  campaign_ad_type: "InstagramStoryAd",
                });

                setTheState({
                  media: "//",
                  media_type: "",
                });
              }
            }

            return;
          })
          .catch((err) => {
            // console.log(err);
            analytics.track(`a_error`, {
              error_page: "ad_design",
              error_description: err,
              campaign_channel: "instagram",
              campaign_ad_type: "InstagramStoryAd",
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

      analytics.track(`a_error`, {
        campaign_channel: "instagram",
        campaign_ad_type: "InstagramStoryAd",
        error_page: "ad_design",
        error_description: "Image Picker closed without selecting a media file",
      });

      setTheState({
        mediaError: "Please choose a media file.",
        media: "//",
        media_type: "",
      });

      save_campaign_info_instagram({
        media: "//",
        media_type: "",
      });

      return;
    } else {
      return;
    }
  } catch (error) {
    // console.log("error image pick", error);
  }
};
