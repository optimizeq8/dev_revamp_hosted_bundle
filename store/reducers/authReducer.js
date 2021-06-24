import AsyncStorage from "@react-native-community/async-storage";
import * as actionTypes from "../actions/actionTypes";
import analytics from "@segment/analytics-react-native";
import { MixpanelInstance } from "react-native-mixpanel";
import { Notifications as RNNotifications } from "react-native-notifications";

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
      // const MixpanelSDK = new MixpanelInstance(
      //   "ef78d7f5f4160b74fda35568224f6cfa",
      //   false,
      //   false
      // );

      // MixpanelSDK.initialize()
      //   .then(() => {
      // NOTE: Added to solve issue for undefined profiles
      //   analytics.alias(action.payload.user.userid);
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
          // NOTE: expo-notification not working for iOS
          try {
            RNNotifications.registerRemoteNotifications();
            RNNotifications.events().registerRemoteNotificationsRegistered(
              (event) => {
                if (Platform.OS === "android") {
                  userTraits = {
                    ...userTraits,
                    android_devices: [event.deviceToken],
                  };
                } else {
                  userTraits = {
                    ...userTraits,
                    ios_devices: [event.deviceToken],
                  };
                }
                analytics.identify(action.payload.user.userid, userTraits);
              }
            );
          } catch (err) {
            // console.log(err);
            analytics.track(`a_error`, {
              error_page: "a_error_token",
              error_description: err.response || err.message,
            });
            analytics.identify(action.payload.user.userid, userTraits);
          }
          // MixpanelSDK.identify(action.payload.user.userid);
        })
        .catch((error) => {
          analytics.track(`a_error`, {
            error_page: "a_error_app_language",
            error_description: error.response || error.message,
          });
          // Catch never gets called
          // analytics.alias(action.payload.user.userid);
          // analytics.identify(action.payload.user.userid, {
          //   ...action.payload.user,
          //   $name:
          //     action.payload.user.firstname +
          //     " " +
          //     action.payload.user.lastname,
          //   $phone: "+" + action.payload.user.mobile,
          //   logged_out: false,
          // });
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
