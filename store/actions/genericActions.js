import axios from "axios";
import * as actionTypes from "./actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
import { persistor } from "../index";
import createBaseUrl from "./createBaseUrl";
import NavigationService from "../../NavigationService";

export const setAuthToken = (token) => {
  if (token) {
    return SecureStore.setItemAsync("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `Bearer ${token}`)
      )
      .catch((err) => {
        console.log("setAuthToken setItem token", err.message || err.response);
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response,
        });
      });
  } else {
    return SecureStore.deleteItemAsync("token")
      .then(() => delete axios.defaults.headers.common.Authorization)
      .catch((err) => {
        console.log(
          "setAuthToken removeItem token",
          err.message || err.response
        );
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response,
        });
      });
  }
};

export const checkForUpdate = (facebookIDsOnly, retries = 3) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_UPDATE_LOADING, payload: true });
    createBaseUrl()
      .get(`appVersion`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: facebookIDsOnly
            ? actionTypes.SET_FACEBOOK_IDS
            : actionTypes.SET_ACTUAL_VERSION,
          payload: data,
        });
      })
      .catch((err) => {
        if (retries > 0) {
          dispatch(checkForUpdate(retries - 1));
          return;
        }
        dispatch({
          type: actionTypes.SET_UPDATE_LOADING,
          payload: false,
        });
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err && (err.message || err.response),
        });
      });
  };
};
export const update_app_status_chat_notification = (app_state) => {
  return (dispatch, getState) => {
    axios
      .post(
        getState().login.admin
          ? "https://optimizekwtestingserver.com/optimize/public/sendChatNotificationbySMS"
          : "https://www.optimizeapp.com/optimize/public/sendChatNotificationbySMS",
        {
          app_state: app_state,
          userid: getState().auth.userInfo && getState().auth.userInfo.userid,
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("updated read status", data);

        return dispatch({
          type: actionTypes.SET_MESSENGER_SMS_NOTIFICATION_STATUS,
          payload: app_state,
          // getState().messenger.messages.length === data.intercom_chat_link
        });
      })
      .catch((err) => {
        // console.log(
        //   "sendChatNotificationbySMS err",
        //   err.message || err.response
        // );
      });
  };
};

export const getBusinessAccounts = (businessSeleced) => {
  return async (dispatch, getState) => {
    dispatch(getBusinessInvites());
    dispatch({
      type: actionTypes.SET_LOADING_BUSINESS_LIST,
      payload: true,
    });
    let selectedBusinessId = await AsyncStorage.getItem("selectedBusinessId");
    createBaseUrl()
      .get(`businessaccounts/${selectedBusinessId}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // showMessage({
        //   message: data.message,
        //   type: response.data.success ? "success" : "warning"
        // })
        AsyncStorage.getItem("indexOfMainBusiness").then((value) => {
          return dispatch({
            type: actionTypes.SET_BUSINESS_ACCOUNTS,
            payload: {
              data: data,
              index: value ? value : 0,
              userid: getState().auth.userInfo.userid,
              businessSeleced,
              user: getState().auth.userInfo,
            },
          });
        });
        return;
      })

      .catch((err) => {
        // console.log("getBusinessAccountsError", err.message || err.response);
        // errorMessageHandler(err);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });

        return dispatch({
          type: actionTypes.ERROR_SET_BUSINESS_ACCOUNTS,
        });
      });
  };
};

export const getBusinessInvites = () => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post("verifyTeamInvite", { userid: getState().auth.userInfo.userid })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          payload: data.data,
          type: actionTypes.SET_BUSINESS_INVITES,
        });
      });
  };
};
export const checkNotification = (message, data) => {
  return (dispatch, getState) => {
    dispatch({
      payload: { message, data },
      type: actionTypes.CHECK_NOTIFICATION,
    });
  };
};

export const tutorialLinks = (screenName, appLanguage) => {
  return (dispatch) => {
    axios
      .get(
        `https://optimizeapp.com/optimize/public/frontendAdTypeMedia/${screenName}_${appLanguage}`
      )
      .then((result) => result.data)
      .then((data) => {
        if (data.success) {
          return dispatch({
            type: actionTypes.SET_TUTORIAL_MEDIA_LINK,
            payload: data.data[0],
          });
        }
        return dispatch({
          type: actionTypes.SET_TUTORIAL_MEDIA_LINK,
          payload: {
            ad_type: "",
            link: "",
            media_type: "",
          },
        });
      });
  };
};

export const setCounterForUnreadMessage = (count) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_UNREAD_INTERCOM_MESSAGE_COUNT,
      payload: count,
    });
  };
};

export const handleAlreadyCreatedCampaigns = (data, channel) => {
  return (dispatch) => {
    showMessage({
      message: data.message,
      position: "top",
      type: "warning",
      floating: false,
    });
    persistor.purge();
    dispatch({
      type: actionTypes[
        channel === "snapchat"
          ? "RESET_CAMPAING_INFO"
          : "RESET_CAMPAING_INFO_INSTAGRAM"
      ],
    });
    NavigationService.navigate("AdType", {
      campaignCreationReset: true,
      channel,
    });
  };
};
