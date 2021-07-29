import * as Permissions from "expo-permissions";
import { showMessage } from "react-native-flash-message";
import { Platform, Linking } from "react-native";
import analytics from "@segment/analytics-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";

import { PESDK, Configuration, TintMode } from "react-native-photoeditorsdk";
import PhotoEditorConfiguration from "../../Functions/PhotoEditorConfiguration";
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      exif: false,
      quality: 0.8,
    });
  }

  return result;
};

export const _pickImage = async (
  mediaTypes = "Images",
  screenProps,
  startUpload,
  mainBusiness
) => {
  try {
    let result = {};
    result = await pick(mediaTypes, screenProps);
    result = { uri: result.uri, cancelled: false, type: "image" };
    let configuration = PhotoEditorConfiguration({
      width: 1,
      height: 1,
      serialization: result && result.hasOwnProperty("serialization"),
      transform: {
        items: [{ width: 1, height: 1, name: "Square" }],
      },
    });
    let file = {};
    if (result) {
      file = await FileSystem.getInfoAsync(result.uri, {
        size: true,
      });
    }
    const { translate } = screenProps;
    if (result && !result.cancelled) {
      let uneditedImageUri = result.uri;
      let newSize = 0;
      PESDK.openEditor(
        result.uri,
        configuration,
        result && result.hasOwnProperty("serialization")
          ? result.serialization
          : null
      )
        .then(async (manipResult) => {
          let serialization = {};
          if (manipResult) {
            serialization = manipResult.serialization;
            manipResult = await ImageManipulator.manipulateAsync(
              manipResult.image
            );

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
            newSize = await FileSystem.getInfoAsync(manipResult.uri, {
              size: true,
            });

            if (newSize.size > 5000000) {
              analytics.track(`Form Error Made`, {
                source: "OptimizeWebsite",
                source_action: "a_select_media",
                error_description: "Image must be less than 5 MBs",
                business_id: mainBusiness && mainBusiness.businessid,
              });

              showMessage({
                message: translate("Image must be less than {{fileSize}} MBs", {
                  fileSize: 5,
                }),
                position: "top",
                type: "warning",
              });

              return Promise.reject("Image must be less than 5 MBs");
            }

            result.uri = manipResult.uri;
            result.height = manipResult.height;
            result.width = manipResult.width;
            result.serialization = serialization;
          } else {
            analytics.track(`Button Pressed`, {
              button_type: "Cancel Media Editor",
              source: "OptimizeWebsite",
              business_id: mainBusiness && mainBusiness.businessid,
            });
            return Promise.reject("Editing canceled");
          }
        })
        .then(() => {
          analytics.track(`Website Logo Selected`, {
            source: "OptimizeWebsite",
            media_type: "IMAGE",
            media_uri: result.uri,
            media_specs: {
              size: newSize.size,
              height: result.height,
              width: result.width,
            },
            business_id: mainBusiness && mainBusiness.businessid,
          });

          showMessage({
            message: translate("Image has been selected successfully"),
            position: "top",
            type: "success",
          });
          var res = result.uri.split("/");
          res = res[res.length - 1];
          var photo = {
            uri: result.uri,
            type: "IMAGE" + "/" + format,
            name: res,
          };
          let format = res.split(".")[1];
          startUpload(photo);
        })
        .catch((error) => {
          // console.log(error);
          analytics.track(`Form Error Made`, {
            source: "OptimizeWebsite",
            source_action: "a_select_media",
            error_description: error.wrongAspect
              ? error.message
              : error ||
                translate(
                  "The dimensions are too large, please choose a different image"
                ),
            image_for: "Business Logo",
            business_id: mainBusiness && mainBusiness.businessid,
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
    } else {
      return;
    }
  } catch (error) {
    // console.log("error image pick", error);
  }
};

export const _pickImageMedia = async (
  mediaTypes = "Images",
  screenProps,
  startUpload
) => {
  try {
    let result = {};
    result = await pick(mediaTypes, screenProps);
    result = { uri: result.uri, cancelled: false, type: "image" };
    let configuration = PhotoEditorConfiguration({
      width: 1,
      height: 1,
      serialization: result && result.hasOwnProperty("serialization"),
      transform: {
        items: [{ width: 1, height: 1, name: "Square" }],
      },
    });
    let file = {};
    if (result) {
      file = await FileSystem.getInfoAsync(result.uri, {
        size: true,
      });
    }
    const { translate } = screenProps;
    if (result && !result.cancelled) {
      let uneditedImageUri = result.uri;
      let newSize = 0;
      PESDK.openEditor(
        result.uri,
        configuration,
        result && result.hasOwnProperty("serialization")
          ? result.serialization
          : null
      )
        .then(async (manipResult) => {
          let serialization = {};
          if (manipResult) {
            serialization = manipResult.serialization;
            manipResult = await ImageManipulator.manipulateAsync(
              manipResult.image
            );

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
            newSize = await FileSystem.getInfoAsync(manipResult.uri, {
              size: true,
            });

            if (newSize.size > 5000000) {
              analytics.track(`Form Error Made`, {
                source: "OptimizeWebsite",
                source_action: "a_select_product_media",
                image_for: "Product Media",
                error_description: "Image must be less than 5 MBs",
                business_id: mainBusiness && mainBusiness.businessid,
              });

              showMessage({
                message: translate("Image must be less than {{fileSize}} MBs", {
                  fileSize: 5,
                }),
                position: "top",
                type: "warning",
              });

              return Promise.reject("Image must be less than 5 MBs");
            }

            result.uri = manipResult.uri;
            result.height = manipResult.height;
            result.width = manipResult.width;
            result.serialization = serialization;
          } else {
            analytics.track(`Button Pressed`, {
              button_type: "Cancel Media Editor",
              source: "OptimizeWebsite",
              source_action: "a_select_media",
              image_for: "Product Media",
              business_id: mainBusiness && mainBusiness.businessid,
            });
            return Promise.reject("Editing canceled");
          }
        })
        .then(() => {
          analytics.track(`Website Product Media Selected`, {
            source: "OptimizeWebsite",
            media_type: "IMAGE",
            media_uri: result.uri,
            media_specs: {
              size: newSize.size,
              height: result.height,
              width: result.width,
            },
            business_id: mainBusiness && mainBusiness.businessid,
          });

          showMessage({
            message: translate("Image has been selected successfully"),
            position: "top",
            type: "success",
          });
          var res = result.uri.split("/");
          res = res[res.length - 1];
          var photo = {
            uri: result.uri,
            type: "IMAGE" + "/" + format,
            name: res,
          };
          let format = res.split(".")[1];
          startUpload(photo);
        })
        .catch((error) => {
          // console.log(error);
          analytics.track(`Form Error Made`, {
            source: "OptimizeWebsite",
            source_action: "a_select_media",
            error_description: error.wrongAspect
              ? error.message
              : error ||
                translate(
                  "The dimensions are too large, please choose a different image"
                ),
            image_for: "Product Media",
            business_id: mainBusiness && mainBusiness.businessid,
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
    } else {
      return;
    }
  } catch (error) {
    // console.log("error image pick", error);
  }
};
