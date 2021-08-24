import axios from "axios";
import jwt_decode from "jwt-decode";
var querystring = require("querystring");
import { Animated, AppState, Platform } from "react-native";
import Intercom from "react-native-intercom";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import analytics from "@segment/analytics-react-native";
import { saveBusinessInvitee } from "./accountManagementActions";
import { setAuthToken, getBusinessAccounts } from "./genericActions";
import * as Permissions from "expo-permissions";
import store from "../index";
import * as SecureStore from "expo-secure-store";
import { update_app_status_chat_notification } from "./genericActions";
import createBaseUrl from "./createBaseUrl";
import NavigationService from "../../NavigationService";
import { errorMessageHandler } from "./ErrorActions";
import AsyncStorage from "@react-native-community/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";
export const chanege_base_url = (admin) => {
  return (dispatch) => {
    if (admin)
      dispatch({
        type: actionTypes.SET_BASEURL,
      });
  };
};

// export const send_push_notification = () => {
//   return (dispatch, getState) => {
//     Permissions.getAsync(Permissions.NOTIFICATIONS)
//       .then((permission) => {
//         if (permission.status === "granted") {
//           Notifications.getDevicePushTokenAsync({
//             gcmSenderId: "707133061105",
//           }).then((token) => {
//             createBaseUrl()
//               .post(`updatepushToken`, {
//                 token: token.data,
//                 token_type: token.type,
//                 userid: getState().auth.userInfo.userid,
//               })
//               .then((res) => {
//                 return res.data;
//               })
//               .then((data) => {
//                 dispatch({
//                   type: actionTypes.SET_PUSH_NOTIFICATION_TOKEN,
//                   payload: data,
//                 });
//               })
//               .catch((err) => {
//                 // console.log(
//                 //   "send_push_notification",
//                 //   err.message || err.response
//                 // );
//                 showMessage({
//                   message:
//                     err.message ||
//                     err.response ||
//                     "Something went wrong, please try again.",
//                   type: "danger",
//                   position: "top",
//                 });
//                 dispatch({
//                   type: actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN,
//                 });
//               });
//           });
//         }
//       })
//       .catch((err) => {
//         // console.log("Token Error", err);
//       });
//   };
// };

export const checkForExpiredToken = (navigation) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.CHECKING_FOR_TOKEN, payload: true });
    return SecureStore.getItemAsync("token")
      .then((token) => {
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
                "shorook@optimizekw.com",
                "samy@optimizeapp.com",
              ].includes(user.email)
            )
              dispatch(chanege_base_url(true));
            // check if the local store token is same as in db
            createBaseUrl()
              .get("verifyAccessToken", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                timeout: 10000,
                timeoutErrorMessage:
                  "Something went wrong, please try again later",
              })
              .then((responseToken) => {
                if (responseToken.data.success) {
                  setAuthToken(token)
                    .then(() =>
                      dispatch(
                        setCurrentUser({
                          user: user,
                          message: "Logged-in Successfully",
                        })
                      )
                    )
                    .then(() => {
                      // dispatch(send_push_notification());
                      dispatch(getBusinessAccounts());
                    })
                    .then(() => {
                      analytics.identify(getState().auth.userInfo.userid, {
                        logged_out: false,
                      });
                      navigation &&
                        NavigationService.navigate("Dashboard", {
                          source: AppState.currentState,
                          source_action: "a_check_expired_token",
                        });
                    });
                } else {
                  dispatch(clearPushToken(navigation, user.userid));
                }
              })
              .then(() => {
                dispatch({
                  type: actionTypes.CHECKING_FOR_TOKEN,
                  payload: false,
                });

                // navigation &&
                //   NavigationService.navigate("Dashboard", {
                //     source: AppState.currentState,
                //     source_action: "a_check_expired_token",
                //   });
              })
              .catch((err) => {
                // console.log(
                //   "verifyAccessToken error",
                //   JSON.stringify(err.response, null, 2)
                // );
                errorMessageHandler(err);
                dispatch({
                  type: actionTypes.CHECKING_FOR_TOKEN_ERROR,
                  payload: true,
                });
              });
          } else {
            dispatch(clearPushToken(navigation, user.userid));
          }
        } else
          dispatch({
            type: actionTypes.CHECKING_FOR_TOKEN,
            payload: false,
          });
      })
      .catch((err) => console.log("CHECK FOR EXPIRED TOKEN", err));
  };
};

export const login = (userData, navigation = NavigationService) => {
  let userInfo = {
    ...userData,
    is_mobile: 0,
  };
  return async (dispatch, getState) => {
    // if (
    //   [
    //     "nouf@optimizeapp.com",
    //     "sam.omran@hotmail.com",
    //     "imran@optimizekw.com",
    //     "saadiya@optimizekw.com",
    //     "shorook@optimizekw.com",
    //     "samy@optimizeapp.com",
    //   ].includes(userData.email)
    // ) {
    //   dispatch(chanege_base_url(true));
    // }
    dispatch({
      type: actionTypes.SET_LOADING_USER,
      payload: true,
    });
    return createBaseUrl()
      .post("login", querystring.stringify(userInfo), {
        timeout: 5000,
        timeoutErrorMessage: "Something went wrong, please try again.",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        return res.data;
      })
      .then(async (user) => {
        // let decodedUser = null;
        if (user.hasOwnProperty("access_token")) {
          // decodedUser = jwt_decode(user.access_token);
          return await setAuthToken(user.access_token);
        } else {
          /*
          showMessage({
            message: user.message,
            type: "warning",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_LOADING_USER,
            payload: false,
          });
          const obj = { user: decodedUser, message: user.message };
          return obj; */
        }
        // }
      })
      .then(async () => {
        return await dispatch(getUserProfile());
      })
      .then(() => {
        if (getState().auth.userInfo) {
          analytics.identify(getState().auth.userInfo.id, {
            logged_out: false,
          });
          if (getState().auth.userInfo.tmp_pwd === "1") {
            navigation.navigate("ChangePassword", {
              temp_pwd: true,
              source: "sign_in",
              source_action: "a_sign_in",
            });
          } else {
            /** Add back later */
            // dispatch(
            //   saveBusinessInvitee({
            //     tempInviteId: navigation.getParam("v", ""),
            //     businessInvitee: navigation.getParam("business", ""),
            //     invitedEmail: navigation.getParam("email", ""),
            //   })
            // );
            analytics.track(`Signed In`, {
              first_name: getState().auth.userInfo.first_tname,
              last_name: getState().auth.userInfo.last_name,
              email: getState().auth.userInfo.email,
              mobile: getState().auth.userInfo.mobile,
              verified_account: getState().auth.userInfo.verified,
            });
            navigation.navigate("Dashboard", {
              // v: navigation.getParam("v", ""),
              // business: navigation.getParam("business", ""),
              // email: navigation.getParam("email", ""),
              source: "Signin",
              source_action: "a_sign_in",
            });
          }
          dispatch({
            type: actionTypes.SET_LOADING_USER,
            payload: false,
          });
          // dispatch(getBusinessAccounts()); // Add back later
          // dispatch(send_push_notification());
        }
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.SET_LOADING_USER,
          payload: false,
        });
        console.log("login error", JSON.stringify(err.data, null, 2));
        showMessage({
          type: "danger",
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          position: "top",
        });
      });
  };
};

export const logout = (navigation) => {
  return (dispatch, getState) => {
    setAuthToken()
      .then(() => {
        analytics.identify(getState().auth.userid, { logged_out: true });
        navigation &&
          navigation.navigate("SwitchLanguage", {
            loggedout: true,
            v:
              (navigation && navigation.getParam("v", false)) ||
              getState().account.tempInviteId,
            business:
              (navigation && navigation.getParam("business", "")) ||
              getState().account.businessInvitee,
            email:
              (navigation && navigation.getParam("email", "")) ||
              getState().account.invitedEmail,
          });
      })
      //Switched the navigation with this line so that the ErrorComponent doesn't mount when logging out
      .then(() => dispatch(setCurrentUser(null)))
      .then(() => {
        analytics.reset();
        Intercom.logout();
        AsyncStorage.setItem("selectedBusinessId", "");
      })
      .then(() => dispatch(checkHashForUser()));
  };
};

export const forgotPassword = (email, navigation) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD_LOADING,
      payload: true,
    });

    return createBaseUrl()
      .post(
        `password/email`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        analytics.track(`Forgot Password Request`, {
          source: "ForgotPassword",
          source_action: "a_forget_password",
          email,
          action_status: response.data.status ? "success" : "failure",
        });
        showMessage({
          message: response.data.status,
          type: "success",
          position: "top",
        });
        // console.log("response", JSON.stringify(response.data, null, 2));
        dispatch({
          type: actionTypes.CHANGE_PASSWORD_LOADING,
          payload: false,
        });
        return dispatch({
          type: actionTypes.FORGOT_PASSWORD,
          payload: {
            success: true,
            message: response.data.status,
          },
        });
        // if (response.data.success) {
        //   analytics.track(`a_go_back`, {
        //     source: "forget_password",
        //     source_action: "a_go_back",
        //   });
        //   navigation.goBack();
        // }
      })
      .catch((err) => {
        // console.log("forgotPassword error", err.response);
        let errorMessage = null;
        if (err.response && err.response.data) {
          if (Object.keys(err.response.data.data).length > 0) {
            // iterate over the error data object
            for (const key in err.response.data.data) {
              errorMessage = err.response.data.data[0];
            }
          }
        } else if (err.message || err.response) {
          errorMessage = err.message || err.response;
        }
        // errorMessage = err.response.data
        //   ? err.response.data.email
        //     ? err.response.data.email
        //     : err.response.data.message
        //     ? err.response.data.message
        //     : err.message || err.response
        //   : err.message || err.response;

        showMessage({
          message: errorMessage,
          type: "warning",
          position: "top",
        });
        dispatch({
          type: actionTypes.CHANGE_PASSWORD_LOADING,
          payload: false,
        });
        return dispatch({
          type: actionTypes.FORGOT_PASSWORD,
          payload: {
            success: false,
            message: errorMessage,
          },
        });
      });
  };
};

export const clearPushToken = (navigation, userid) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CLEAR_PUSH_NOTIFICATION_LOADING,
      payload: true,
    });
    createBaseUrl()
      .post(`updatepushToken`, {
        token: null,
        userid: userid,
      })
      .then((res) => {
        return res.data;
      })
      .then(async (data) => {
        analytics.identify(userid, { logged_out: true });
        dispatch(logout(navigation)); //Call this first so that it navigates first then turns everything to null
        //so that the error componenet doesn't show up in the dashboard
      })
      .then(() => {
        dispatch({
          type: actionTypes.CLEAR_PUSH_NOTIFICATION_TOKEN,
        });
      })
      .then(() => dispatch(update_app_status_chat_notification(false)))
      .catch((err) => {
        // console.log("clear push notification", err.message || err.response);
        dispatch({
          type: actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN,
        });
      });
  };
};

export const setCurrentUser = (user) => {
  return (dispatch) => {
    // console.log("user:", user);

    if (user) {
      return dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: user,
      });
    } else {
      analytics.reset();
      return dispatch({
        type: actionTypes.LOGOUT_USER,
        payload: { user },
      });
    }
  };
};

export const changePassword = (currentPass, newPass, navigation, userEmail) => {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD,
      payload: { success: false, message: null, loading: true },
    });
    return createBaseUrl()
      .patch("users/password/update", {
        password: currentPass,
        new_password: newPass,
      })
      .then((response) => {
        console.log("response", JSON.stringify(response, null, 2));
        // const temPwd = navigation.getParam("temp_pwd", false);
        // // if tempPwd change relogin for setting new auth token
        // if (temPwd && response.data.success) {
        //   analytics.track(`Password Changed`, {
        //     source: "ChangePassword",
        //     action_status: response.data.success ? "success" : "failure",
        //     error_description: !response.data.success && response.data.message,
        //     business_id:
        //       getState().account.mainBusiness &&
        //       getState().account.mainBusiness.businessid,
        //   });
        //   showMessage({
        //     message: response.data.message,
        //     type: response.data.success ? "success" : "warning",
        //     position: "top",
        //   });
        //   dispatch(
        //     login(
        //       {
        //         email: userEmail,
        //         emailError: null,
        //         password: newPass,
        //         passwordError: "",
        //       },
        //       navigation
        //     )
        //   );
        //   return dispatch({
        //     type: actionTypes.CHANGE_PASSWORD,
        //     payload: {
        //       success: response.data.success,
        //       loading: false,
        //     },
        //   });
        // }
        // let time = new Animated.Value(0);

        // Animated.timing(time, {
        //   toValue: 1,
        //   duration: 2000,
        //   useNativeDriver: true,

        //   //   easing: Easing.linear
        // }).start(() => {
        // analytics.track(`Password Changed`, {
        //   source: "ChangePassword",
        //   action_status: response.data.success ? "success" : "failure",
        //   error_description: !response.data.success && response.data.message,
        //   business_id:
        //     getState().account.mainBusiness &&
        //     getState().account.mainBusiness.businessid,
        // });

        // showMessage({
        //   message: response.data.message,
        //   type: response.data.success ? "success" : "warning",
        //   position: "top",
        // });
        // if (response.data.success) {
        //   navigation.navigate("Dashboard", {
        //     source: "change_password",
        //     source_action: "a_change_password",
        //   });
        // }
        return dispatch({
          type: actionTypes.CHANGE_PASSWORD,
          payload: {
            success: response.data.success,
            loading: false,
            message: response.data.status,
          },
        });
        // });
      })
      .catch((err) => {
        // console.log("changePasswordError", err.response);
        let errorMessage = err.response
          ? err.response.data
            ? err.response.data.error
              ? err.response.data.error.message
              : err.message
            : err.message
          : "Oops! Something went wrong. Please try again.";
        showMessage({
          message: errorMessage,
          type: "danger",
          position: "top",
        });

        return dispatch({
          type: actionTypes.ERROR_CHANGE_PASSWORD,
          payload: {
            success: false,
            message: errorMessage,
            loading: false,
          },
        });
      });
  };
};

export const checkHashForUser = () => {
  return (dispatch) => {
    createBaseUrl()
      .get(`intercomhash`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          return dispatch({
            type: actionTypes.SET_HASH_INTERCOM_KEYS,
            payload: data.data,
          });
        }
      })
      .catch((error) => {
        console.log("error hashForUser", error.error || error.message);
        return dispatch({
          type: actionTypes.SET_HASH_INTERCOM_KEYS,
          payload: {
            ios: null,
            android: null,
          },
        });
      });
  };
};

export const checkPassword = (
  userData,
  modalFlash,
  closeBioMetricModal,
  translate
) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CHECKING_FOR_PASSWORD_LOADING,
      payload: true,
    });
    createBaseUrl()
      .post("userLogin", userData, {
        timeout: 5000,
        timeoutErrorMessage: "Something went wrong, please try again.",
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: actionTypes.PASSWORD_CHECKED,
            payload: data.success,
          });
          ReactNativeBiometrics.simplePrompt({
            promptMessage: "Authorize",
          })
            .then(async (resultObject) => {
              const { success } = resultObject;

              if (success) {
                let userConnectedBiometrics = await SecureStore.getItemAsync(
                  "accountsSecured",
                  {
                    keychainService:
                      Platform.OS === "ios" ? "kSecAttrService" : "Alias",
                  }
                );
                if (userConnectedBiometrics) {
                  userConnectedBiometrics = JSON.parse(userConnectedBiometrics);
                  userConnectedBiometrics = [
                    ...userConnectedBiometrics,
                    { username: userData.email, password: userData.password },
                  ];
                } else {
                  userConnectedBiometrics = [
                    { username: userData.email, password: userData.password },
                  ];
                }
                SecureStore.setItemAsync(
                  "accountsSecured",
                  JSON.stringify(userConnectedBiometrics),
                  {
                    keychainService:
                      Platform.OS === "ios" ? "kSecAttrService" : "Alias",
                  }
                ).then((value) => {
                  closeBioMetricModal();
                  showMessage({
                    message: translate("Account secured successfully"),
                    type: "success",
                  });
                });
              }
            })
            .catch((err) => {
              errorMessageHandler(err);
              // console.log("check pass", err);
            });
        } else {
          modalFlash.showMessage({
            message: translate("Wrong password"),
            type: "warning",
          });
          dispatch({
            type: actionTypes.SET_CHECKING_FOR_PASSWORD_LOADING,
            payload: false,
          });
        }
      })
      .catch((error) => {
        // console.log("error hashForUser", error.error || error.message);
        errorMessageHandler(error);
        return dispatch({
          type: actionTypes.SET_CHECKING_FOR_PASSWORD_LOADING,
          payload: false,
        });
      });
  };
};

export const getUserProfile = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_PROFILE_LOADING,
      payload: true,
    });
    return createBaseUrl()
      .get(`users`)
      .then((response) => response.data)
      .then((data) => {
        // console.log("getUserProfile Data", data);
        dispatch({
          type: actionTypes.USER_PROFILE_LOADING,
          payload: false,
        });
        analytics.alias(data.id);
        analytics.flush();
        dispatch(setCurrentUser(data));
        return true;
      })
      .catch((error) => {
        // console.log("getUserProfileError", error);

        dispatch({
          type: actionTypes.USER_PROFILE_LOADING,
          payload: false,
        });
      });
  };
};
