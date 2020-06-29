import * as Permissions from "expo-permissions";
import { showMessage } from "react-native-flash-message";
import analytics from "@segment/analytics-react-native";
import { Platform, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import segmentEventTrack from "../../../../segmentEventTrack";
import * as IntentLauncher from "expo-intent-launcher";

import { PESDK } from "react-native-photoeditorsdk";
import {
  VESDK,
  Configuration,
  VideoFormat,
  SerializationExportType,
  TintMode,
} from "react-native-videoeditorsdk";
import { RNFFprobe, RNFFmpeg } from "react-native-ffmpeg";

import PhotoEditorConfiguration from "../../../../Functions/PhotoEditorConfiguration";
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
  editImage,
  videoIsExporting
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
                analytics.track(`a_error`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                  error_page: "ad_design",
                  error_description:
                    "Image's aspect ratio must be 9:16 with a minimum size of 1080px x 1920px",
                });
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
                analytics.track(`a_error`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                  error_page: "ad_design",
                  error_description: "Image must be less than 5 MBs",
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
              analytics.track(`a_media_editor`, {
                campaign_channel: "snapchat",
                campaign_ad_type: adType,
                action_status: "success",
                tool_used: "PESDK",
                media_type: result.type.toUpperCase(),
                ...result.serialization,
                index: storyAdCards.selectedStoryAd.index,
                source: "ad_design",
                source_action: "a_media_editor",
                image_for: "campaign_story_ad",
              });

              cards[storyAdCards.selectedStoryAd.index] = card;
              setTheState({
                storyAdCards: {
                  ...storyAdCards,
                  storyAdSelected: false,
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

              analytics.track(`a_error`, {
                campaign_channel: "snapchat",
                campaign_ad_type: adType,
                error_page: "ad_design",
                error_description:
                  "Image's aspect ratio must be 9:16 with a minimum size of 1080px x 1920px",
              });

              onToggleModal(false);
              showMessage({
                message: translate("Image has been selected successfully"),
                position: "top",
                type: "success",
              });
              analytics.track(`a_media_editor`, {
                campaign_channel: "snapchat",
                campaign_ad_type: adType,
                source: "ad_design",
                source_action: "a_media_editor",
                action_status: "success",
                tool_used: "PESDK",
                media_type: "IMAGE",
                ...result.serialization,
                image_for: "campaign_ad",
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
            analytics.track(`a_error`, {
              campaign_channel: "snapchat",
              campaign_ad_type: adType,
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
        let uneditedImageUri = result.uri;
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
              if (
                (Math.floor(newResult.width / 9) !==
                  Math.floor(newResult.height / 16) ||
                  (newResult.width < 1080 && newResult.height < 1920)) &&
                newResult.duration <= 10.999 &&
                newResult.duration >= 3.0
              ) {
                let outputUri = actualUri.split("/");

                await RNFFmpeg.execute(
                  `-y -i ${actualUri} -vf scale=${
                    Math.floor(newResult.width / 9) !==
                    Math.floor(newResult.height / 16)
                      ? "1080:1920"
                      : "-1:1920" //-1 means scale inly by 1920 to keep aspect ratio
                  } -vcodec libx264 ${FileSystem.documentDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );
                newResult = await RNFFprobe.getMediaInformation(
                  `${FileSystem.documentDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );

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
                  newUri: newResult.path,
                };
                newSize = await FileSystem.getInfoAsync(
                  `${FileSystem.cacheDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );
              }
              videoIsExporting(false);
              if (newResult.duration > 10.999) {
                analytics.track(`a_error`, {
                  error_page: "ad_design",
                  error_description: "Maximum video duration  is 10 seconds.",
                });
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
                analytics.track(`a_error`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                  error_page: "ad_design",
                  error_description: "Minimum video duration  is 3 seconds.",
                });
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
              } else if (
                Math.floor(newResult.width / 9) !==
                  Math.floor(newResult.height / 16) ||
                (newResult.width < 1080 && newResult.height < 1920)
              ) {
                analytics.track(`a_error`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                  error_page: "ad_design",
                  error_description:
                    "Video's aspect ratio must be 9:16\nwith a minimum size of 1080 x 1920.",
                });
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
              } else if (newSize.size > 32000000) {
                analytics.track(`a_error`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                  error_page: "ad_design",
                  error_description: "Allowed video size is up to 32 MBs",
                });
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
                campaign_channel: "snapchat",
                campaign_ad_type: adType,
                error_page: "ad_design",
                error_description: "Editing canceled",
              });
              return Promise.reject("Editing canceled");
            }
          })
          .then((correct = true) => {
            // console.log(result);

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
                serialization: result.serialization,
              };

              cards[storyAdCards.selectedStoryAd.index] = card;
              analytics.track(`a_media_editor`, {
                campaign_channel: "snapchat",
                campaign_ad_type: adType,
                action_status: "success",
                tool_used: "VESDK",
                media_type: result.type.toUpperCase(),
                ...result.serialization,
              });
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
                analytics.track(`a_media_editor`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                  action_status: "success",
                  tool_used: "VESDK",
                  media_type: result.type.toUpperCase(),
                  ...result.serialization,
                });
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
                    uneditedImageUri,
                    serialization: result.serialization,
                  });
                setTheState({ sourceChanging: false });
              } else {
                analytics.track(`a_error`, {
                  error_page: "ad_design",
                  error_description: "Selected Video Unsuccessfully",
                  campaign_channel: "snapchat",
                  campaign_ad_type: adType,
                });
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
            analytics.track(`a_error`, {
              error_page: "ad_design",
              error_description: err,
              campaign_channel: "snapchat",
              campaign_ad_type: adType,
            });
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
      analytics.track(`a_error_form`, {
        error_page: "ad_design",
        error_description: "Image Picker closed without selecting a media file",
      });

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
    analytics.track(`a_error`, {
      campaign_channel: "snapchat",
      campaign_ad_type: adType,
      error_page: "ad_design",
      error_description: error.response || error.message || error,
    });
    segmentEventTrack("error image picker", {
      campaign_error_image: error,
    });
  }
};
