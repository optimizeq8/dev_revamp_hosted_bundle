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
import {
  PESDK,
  Configuration,
  TintMode,
  SerializationExportType,
} from "react-native-photoeditorsdk";

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
  // rejected,
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

    let uneditedImageUri = result.uri;
    let serialization = null;
    let configuration: Configuration = {
      forceCrop: true,
      export: {
        serialization: {
          enabled: true,
          exportType: SerializationExportType.OBJECT,
        },
      },
      transform: {
        items: [{ width: 1, height: 1 }],
      },
      sticker: {
        personalStickers: true,
        defaultPersonalStickerTintMode: TintMode.COLORIZED,
        categories: [{ identifier: "imgly_sticker_category_shapes" }],
      },
    };
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
                Math.floor(manipResult.width) !== Math.floor(manipResult.height)
              ) {
                //check for aspect ration incase user undos the cropping
                setTheState({
                  mediaError:
                    "Image's aspect ratio must be 1:1\nwith a minimum size of 500px x 500px.",
                  media: "//",
                  media_type: "",
                });

                save_campaign_info_instagram({
                  media: "//",
                  media_type: "",
                });

                return Promise.reject({
                  wrongAspect: true,
                  message:
                    "Image's aspect ratio must be 1:1\nwith a minimum size of 500px x 500px",
                });
              }
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [
                  {
                    resize: {
                      width: 500,
                      height: 500,
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
              campaign_ad_type: "InstagramFeedAd",
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
          })
          .catch((error) => {
            analytics.track(`a_error`, {
              campaign_channel: "instagram",
              campaign_ad_type: "InstagramFeedAd",
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
        if (result.duration > 120000) {
          setTheState({
            mediaError: "Maximum video duration  is 120 seconds.",
            media: "//",
            media_type: "",
            sourceChanging: true,
          });

          save_campaign_info_instagram({
            media: "//",
            media_type: "",
          });

          analytics.track(`a_error`, {
            campaign_channel: "instagram",
            campaign_ad_type: "InstagramFeedAd",
            error_page: "ad_design",
            error_description: "Maximum video duration is 120 seconds",
          });
          showMessage({
            message: translate("Maximum video duration is 120 seconds"),
            description:
              translate("Selected video duration") +
              (result.duration / 1000).toFixed(2) +
              translate("seconds"),
            position: "top",
            type: "warning",
          });

          setTheState({
            sourceChanging: false,
          });
          return;
        } else if (result.duration < 3000) {
          setTheState({
            mediaError: "Minimum video duration  is 3 seconds.",
            media: "//",
            sourceChanging: true,
          });

          save_campaign_info_instagram({
            media: "//",
            media_type: "",
          });
          analytics.track(`a_error`, {
            campaign_channel: "instagram",
            campaign_ad_type: "InstagramFeedAd",
            error_page: "ad_design",
            error_description: "Minimum video duration is 3 seconds",
          });

          showMessage({
            message: translate("Minimum video duration is 3 seconds"),
            description:
              translate("Selected video duration") +
              (result.duration / 1000).toFixed(2) +
              translate("seconds"),

            position: "top",
            type: "warning",
          });

          setTheState({ sourceChanging: false });
          return;
        } else if (file.size > 30000000) {
          setTheState({
            mediaError: "Allowed video size is up to 30 MBs.",
            media: "//",
            media_type: "",
          });

          save_campaign_info_instagram({
            media: "//",
            media_type: "",
          });
          analytics.track(`a_error`, {
            campaign_channel: "instagram",
            campaign_ad_type: "InstagramFeedAd",
            error_page: "ad_design",
            error_description: "Allowed video size is up to 30 MBs",
          });

          showMessage({
            message: translate("Allowed video size is up to {{fileSize}} MBs", {
              fileSize: 30,
            }),
            position: "top",
            type: "warning",
          });

          return;
        } else if (
          result.width >= 500 &&
          result.height >= 625
          // && Math.floor(result.width / 4) === Math.floor(result.height / 5)
        ) {
          setTheState({
            media: result.uri,
            media_type: result.type.toUpperCase(),
            mediaError: null,
            result: result.uri,
            iosVideoUploaded: false,
            sourceChanging: true,
            fileReadyToUpload: true,
          });
          analytics.track(`a_media_editor`, {
            campaign_channel: "instagram",
            campaign_ad_type: "InstagramFeedAd",
            source: "ad_design",
            source_action: "a_media_editor",
            action_status: "success",
            tool_used: "",
            media_type: "VIDEO",
            ...serialization,
            image_for: "campaign_ad",
          });

          showMessage({
            message: translate("Video has been selected successfully"),
            position: "top",
            type: "success",
          });
        }

        save_campaign_info_instagram({
          media: result.uri,
          media_type: result.type.toUpperCase(),
          fileReadyToUpload: true,
        });
        setTheState({ sourceChanging: false });
        return;
      } else {
        setTheState({
          mediaError:
            "Video's aspect ratio must be 4:5\nwith a minimum size of 500 x 625.",
          media: "//",
          media_type: "",
          sourceChanging: true,
        });

        save_campaign_info_instagram({
          media: "//",
          media_type: "",
        });

        analytics.track(`a_error`, {
          campaign_channel: "instagram",
          campaign_ad_type: "InstagramFeedAd",
          error_page: "ad_design",
          error_description:
            "Video's aspect ratio must be 4:5\nwith a minimum size of 500 x 625",
        });

        showMessage({
          message: translate(
            "Video's aspect ratio must be 4:5\nwith a minimum size of 500 x 625"
          ),
          // message:
          //   "Video's aspect ratio must be 1:1\nwith a minimum size of 1080 x 1920.",
          position: "top",
          type: "warning",
        });
        setTheState({ sourceChanging: false });
        return;
      }
    } else if (result && !result.cancelled && isNull(media)) {
      showMessage({
        message: translate("Please choose a media file"),
        position: "top",
        type: "warning",
      });

      analytics.track(`a_error`, {
        campaign_channel: "instagram",
        campaign_ad_type: "InstagramFeedAd",
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
