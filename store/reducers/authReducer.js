import AsyncStorage from "@react-native-community/async-storage";
import * as actionTypes from "../actions/actionTypes";
import analytics from "@segment/analytics-react-native";
import * as Notifications from "expo-notifications";
import { MixpanelInstance } from "react-native-mixpanel";

const initialState = {
  userid: null,
  userInfo: null,
  loading: false,
  loadingUpdateInfo: false,
  iosHashIntercom: null,
  andoidHashIntercom: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      const MixpanelSDK = new MixpanelInstance(
        "c9ade508d045eb648f95add033dfb017",
        false,
        false
      );
      MixpanelSDK.initialize().then();
      AsyncStorage.getItem("appLanguage")
        .then((language) => {
          let userTraits = {
            ...action.payload.user,
            $name:
              action.payload.user.firstname +
              " " +
              action.payload.user.lastname,
            selected_language: language,
            $phone: "+" + action.payload.user.mobile,
            logged_out: false,
          };
          Notifications.getDevicePushTokenAsync()
            .then((token) => {
              if (Platform.OS === "android") {
                userTraits["$android_devices"] = [token.data];
              } else {
                userTraits["$ios_devices"] = [token.data];
              }
              analytics.identify(action.payload.user.userid, userTraits);
            })
            .catch((err) => {
              // console.log(err);
              analytics.track(`a_error`, {
                error_page: "While setting current user",
                error_description: err.response || err.message,
              });
              analytics.identify(action.payload.user.userid, userTraits);
            });
          MixpanelSDK.identify(action.payload.user.userid);
        })
        .catch((error) => {
          analytics.alias(action.payload.user.userid);
          analytics.identify(action.payload.user.userid, {
            ...action.payload.user,
            $name:
              action.payload.user.firstname +
              " " +
              action.payload.user.lastname,
            $phone: "+" + action.payload.user.mobile,
            logged_out: false,
          });
        });

      return {
        ...state,
        userid: action.payload.user.userid,
        userInfo: action.payload.user,
        loading: false,
      };

    case actionTypes.UPDATE_USERINFO:
      return {
        ...state,
        loadingUpdateInfo: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case actionTypes.SET_LOADING_USER:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_LOADING_ACCOUNT_UPDATE:
      return {
        ...state,
        loadingUpdateInfo: action.payload,
      };
    case actionTypes.SET_HASH_INTERCOM_KEYS:
      return {
        ...state,
        iosHashIntercom: action.payload.ios,
        andoidHashIntercom: action.payload.android,
      };
    default:
      return state;
  }
};

export default reducer;
