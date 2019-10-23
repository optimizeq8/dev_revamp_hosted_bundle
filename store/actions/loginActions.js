import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage, Animated } from "react-native";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { getBusinessAccounts } from "./accountManagementActions";
import { setAuthToken } from "./genericActions";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import store from "../index";
import * as SecureStore from "expo-secure-store";
import { update_app_status_chat_notification } from "./messengerActions";

createBaseUrl = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/"
    // baseURL: "https://www.optimizeapp.com/optimize/public/"
  });
const instance = createBaseUrl();

export const chanege_base_url = admin => {
  return dispatch => {
    if (admin)
      dispatch({
        type: actionTypes.SET_BASEURL
      });
  };
};

export const send_push_notification = () => {
  return (dispatch, getState) => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(permission => {
      if (permission.status === "granted") {
        Notifications.getExpoPushTokenAsync().then(token => {
          createBaseUrl()
            .post(`updatepushToken`, {
              token: token,
              userid: getState().auth.userInfo.userid
            })
            .then(res => {
              return res.data;
            })
            .then(data => {
              dispatch({
                type: actionTypes.SET_PUSH_NOTIFICATION_TOKEN,
                payload: data
              });
            })
            .catch(err => {
              // console.log(
              //   "send_push_notification",
              //   err.message || err.response
              // );
              showMessage({
                message:
                  err.message ||
                  err.response ||
                  "Something went wrong, please try again.",
                type: "danger",
                position: "top"
              });
              dispatch({
                type: actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN
              });
            });
        });
      }
    });
  };
};

export const checkForExpiredToken = navigation => {
  return (dispatch, getState) => {
    return SecureStore.getItemAsync("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        if (user.exp >= currentTime && user.tmp_pwd !== "1") {
          if (
            [
              "nouf@optimizeapp.com",
              "sam.omran@hotmail.com",
              "imran@optimizekw.com",
              "saadiya@optimizekw.com",
              "shorook@optimizekw.com"
            ].includes(user.email)
          )
            dispatch(chanege_base_url(true));
          setAuthToken(token)
            .then(() =>
              dispatch(
                setCurrentUser({
                  user: user,
                  message: "Logged-in Successfully"
                })
              )
            )
            .then(() => {
              dispatch(send_push_notification());
              dispatch(getBusinessAccounts());
            })
            .then(() => {
              navigation.navigate("Dashboard");
            });
        } else {
          dispatch(clearPushToken(navigation, user.userid));
        }
      }
    });
  };
};

export const login = (userData, navigation) => {
  return (dispatch, getState) => {
    if (
      [
        "nouf@optimizeapp.com",
        "sam.omran@hotmail.com",
        "imran@optimizekw.com",
        "saadiya@optimizekw.com",
        "shorook@optimizekw.com"
      ].includes(userData.email)
    ) {
      dispatch(chanege_base_url(true));
    }
    dispatch({
      type: actionTypes.SET_LOADING_USER,
      payload: true
    });
    createBaseUrl()
      .post("userLogin", userData)
      .then(res => {
        return res.data;
      })
      .then(async user => {
        let decodedUser = null;
        if (user.hasOwnProperty("token")) {
          decodedUser = jwt_decode(user.token);
          let promise = await setAuthToken(user.token);
          return { user: decodedUser, message: user.message };
        } else {
          showMessage({
            message: user.message,
            type: "warning",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_LOADING_USER,
            payload: false
          });
          const obj = { user: decodedUser, message: user.message };
          return obj;
        }
        // }
      })
      .then(decodedUser => {
        if (decodedUser && decodedUser.user) {
          dispatch(setCurrentUser(decodedUser));
        }
      })
      .then(() => {
        if (getState().auth.userInfo) {
          if (getState().auth.userInfo.tmp_pwd === "1") {
            navigation.navigate("ChangePassword", { temp_pwd: true });
          } else {
            navigation.navigate("Dashboard");
          }

          dispatch(getBusinessAccounts());
          dispatch(send_push_notification());
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.SET_LOADING_USER,
          payload: false
        });
        // console.log("login error", err.message || err.response);
        showMessage({
          type: "danger",
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          position: "top"
        });
      });
  };
};

export const logout = navigation => {
  return dispatch => {
    setAuthToken()
      .then(() => dispatch(setCurrentUser(null)))
      .then(() => {
        navigation.navigate("Signin", { loggedout: true });
      });
  };
};

export const forgotPassword = (email, navigation) => {
  return dispatch => {
    // dispatch({
    //   type: actionTypes.CHANGE_PASSWORD,
    //   payload: { success: false }
    // });
    createBaseUrl()
      .post("forgotPassword", {
        email: email
      })
      .then(response => {
        showMessage({
          message: response.data.success
            ? "An email with a random generated password has been sent to your email account."
            : "No account exists with the provided email.",
          type: response.data.success ? "success" : "warning",
          position: "top"
        });
        if (response.data.success) navigation.goBack();
        // return dispatch({
        //   type: actionTypes.CHANGE_PASSWORD,
        //   payload: response.data
        // });
      })
      .catch(err => {
        // console.log("forgotPassword error", err.message || err.response);
      });
  };
};

export const clearPushToken = (navigation, userid) => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post(`updatepushToken`, {
        token: null,
        userid: userid
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        dispatch({
          type: actionTypes.CLEAR_PUSH_NOTIFICATION_TOKEN,
          payload: data
        });
      })
      .then(() => {
        dispatch(update_app_status_chat_notification(false));
        dispatch(logout(navigation));
      })
      .catch(err => {
        // console.log("clear push notification", err.message || err.response);
        dispatch({
          type: actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN
        });
      });
  };
};

export const setCurrentUser = user => {
  return dispatch => {
    // console.log("user:", user);

    if (user) {
      return dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: user
      });
    } else {
      return dispatch({ type: actionTypes.LOGOUT_USER, payload: { user } });
    }
  };
};

export const changePassword = (currentPass, newPass, navigation, userEmail) => {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD,
      payload: { success: false, loading: true }
    });
    createBaseUrl()
      .put("changePassword", {
        current_password: currentPass,
        password: newPass
      })
      .then(response => {
        const temPwd = navigation.getParam("temp_pwd", false);
        // if tempPwd change relogin for setting new auth token
        if (temPwd && response.data.success) {
          showMessage({
            message: response.data.message,
            type: response.data.success ? "success" : "warning",
            position: "top"
          });
          dispatch(
            login(
              {
                email: userEmail,
                emailError: null,
                password: newPass,
                passwordError: ""
              },
              navigation
            )
          );
          return dispatch({
            type: actionTypes.CHANGE_PASSWORD,
            payload: { success: response.data.success, loading: false }
          });
        }
        //   let time = new Animated.Value(0);
        let time = new Animated.Value(0);

        Animated.timing(time, {
          toValue: 1,
          duration: 2000
          //   easing: Easing.linear
        }).start(() => {
          showMessage({
            message: response.data.message,
            type: response.data.success ? "success" : "warning",
            position: "top"
          });
          if (response.data.success) {
            navigation.goBack();
          }
          return dispatch({
            type: actionTypes.CHANGE_PASSWORD,
            payload: {
              success: response.data.success,
              loading: false
            }
          });
        });
      })
      .catch(err => {
        // console.log("changePasswordError", err.message || err.response);

        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });

        return dispatch({
          type: actionTypes.ERROR_CHANGE_PASSWORD,
          payload: {
            success: false
          }
        });
      });
  };
};
