import * as actionTypes from "../actions/actionTypes";
import { Platform } from "react-native";

const initialState = {
  actualVersion: "",
  underMaintenance: false,
  underMaintenanceMessage_ar: "",
  underMaintenanceMessage_en: "",
  updateMessage_ar: "",
  updateMessage_en: "",
  customMessage_en: "",
  customMessage_ar: "",
  loadingChecker: false,
  checkNotification: "Not received",
  notificationData: "No data",
  ad_tutorial_type: "",
  ad_tutorial_link: "",
  ad_tutorial_media_type: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTUAL_VERSION:
      return {
        ...state,
        actualVersion:
          Platform.OS === "android"
            ? action.payload.android_version
            : action.payload.ios_version,
        underMaintenance: action.payload.underMaintenance,
        underMaintenanceMessage_ar: action.payload.underMaintenanceMessage_ar,
        underMaintenanceMessage_en: action.payload.underMaintenanceMessage_en,
        updateMessage_ar: action.payload.updateMessage_ar,
        updateMessage_en: action.payload.updateMessage_en,
        customMessage_en: action.payload.customMessage_en,
        customMessage_ar: action.payload.customMessage_ar,
        loadingChecker: false,
      };
    case actionTypes.SET_UPDATE_LOADING:
      return { ...state, loadingChecker: action.payload };
    case actionTypes.CHECK_NOTIFICATION:
      return {
        ...state,
        checkNotification: action.payload.message,
        notificationData: action.payload.data,
      };
    case actionTypes.SET_TUTORIAL_MEDIA_LINK:
      return {
        ...state,
        ad_tutorial_type: action.payload.ad_type,
        ad_tutorial_link: action.payload.link,
        ad_tutorial_media_type: action.payload.media_type,
      };
    default:
      return state;
  }
};

export default reducer;
