import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import * as Segment from "expo-analytics-segment";
import { AsyncStorage } from "react-native";
import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
import store from "../index";
import createBaseUrl from "./createBaseUrl";

export const setAuthToken = token => {
  if (token) {
    return SecureStore.setItemAsync("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `Bearer ${token}`)
      )
      .catch(err => {
        //  console.log("setAuthToken setItem token", err.message || err.response )
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response
        });
      });
  } else {
    return SecureStore.deleteItemAsync("token")
      .then(() => delete axios.defaults.headers.common.Authorization)
      .catch(err => {
        // console.log(
        //   "setAuthToken removeItem token",
        //   err.message || err.response
        // )
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response
        });
      });
  }
};

export const checkForUpdate = (retries = 3) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_UPDATE_LOADING, payload: true });
    createBaseUrl()
      .get(`appVersion`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionTypes.SET_ACTUAL_VERSION,
          payload: data
        });
      })
      .catch(err => {
        if (retries > 0) {
          dispatch(checkForUpdate(retries - 1));
          return;
        }
        dispatch({ type: actionTypes.SET_UPDATE_LOADING, payload: false });
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err && (err.message || err.response)
        });
      });
  };
};
export const update_app_status_chat_notification = app_state => {
  return (dispatch, getState) => {
    axios
      .post(
        getState().login.admin
          ? "https://optimizekwtestingserver.com/optimize/public/sendChatNotificationbySMS"
          : "https://www.optimizeapp.com/optimize/public/sendChatNotificationbySMS",

        {
          app_state: app_state,
          userid: getState().auth.userInfo && getState().auth.userInfo.userid
        }
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        // console.log("updated read status", data);

        return dispatch({
          type: actionTypes.SET_MESSENGER_SMS_NOTIFICATION_STATUS,
          payload: app_state
          // getState().messenger.messages.length === data.intercom_chat_link
        });
      })
      .catch(err => {
        // showMessage({
        //   message:
        //     err.message ||
        //     err.response ||
        //     "Something went wrong, please try again.",
        //   type: "danger",
        //   position: "top"
        // });
        console.log(
          "sendChatNotificationbySMS err",
          err.message || err.response
        );
      });
  };
};

export const getBusinessAccounts = () => {
  return (dispatch, getState) => {
    dispatch(getBusinessInvites());
    dispatch({
      type: actionTypes.SET_LOADING_BUSINESS_LIST,
      payload: true
    });
    createBaseUrl()
      .get(`businessaccounts`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        // showMessage({
        //   message: data.message,
        //   type: response.data.success ? "success" : "warning"
        // })
        AsyncStorage.getItem("indexOfMainBusiness").then(value => {
          return dispatch({
            type: actionTypes.SET_BUSINESS_ACCOUNTS,
            payload: {
              data: data,
              index: value ? value : 0,
              userid: getState().auth.userInfo.userid
            }
          });
        });
        return;
      })

      .catch(err => {
        // console.log("getBusinessAccountsError", err.message || err.response);
        // errorMessageHandler(err);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });

        return dispatch({
          type: actionTypes.ERROR_SET_BUSINESS_ACCOUNTS
        });
      });
  };
};

export const getBusinessInvites = () => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post("verifyTeamInvite", { userid: getState().auth.userInfo.userid })
      .then(res => res.data)
      .then(data => {
        dispatch({
          payload: data.data,
          type: actionTypes.SET_BUSINESS_INVITES
        });
      });
  };
};
export const checkNotification = (message, data) => {
  return (dispatch, getState) => {
    dispatch({
      payload: { message, data },
      type: actionTypes.CHECK_NOTIFICATION
    });
  };
};
