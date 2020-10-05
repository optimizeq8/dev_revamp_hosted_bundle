import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-community/async-storage";

import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { getUniqueId } from "react-native-device-info";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import NavigationService from "../../NavigationService";
import {
  setAuthToken,
  getBusinessAccounts,
  getAnonymousUserId,
} from "./genericActions";
import { setCurrentUser, chanege_base_url } from "./loginActions";
import { send_push_notification } from "./loginActions";
import { connect_user_to_intercom } from "./messengerActions";
import createBaseUrl from "./createBaseUrl";

import { Adjust, AdjustEvent } from "react-native-adjust";
import analytics from "@segment/analytics-react-native";

export const verifyBusinessName = (
  businessname,
  _handleBusinessName,
  submission
) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CHECKING_BUSINESSNAME, payload: true });
    createBaseUrl()
      .post(`verifyBusinessName`, { businessname })
      .then((res) => res.data)
      .then((data) => {
        (data.success ? !submission : true) &&
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top",
          });
        _handleBusinessName(data.success);
        return dispatch({
          type: actionTypes.VERIFY_BUSINESSNAME,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.CHECKING_BUSINESSNAME, payload: false });

        // console.log("verifyBusinessName", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_BUSINESSNAME,
          payload: {
            success: false,
          },
        });
      });
  };
};

// NOTE: CAN BE REMOVED ONCE TESTED COMPLETELY

// export const registerUser = (userInfo, navigation, businessInvite = false) => {
//   return (dispatch, getState) => {
//     createBaseUrl()
//       .post(
//         businessInvite === "0" ? "registerMemberUser" : `registerUser`,
//         userInfo
//       )
//       .then(res => {
//         return res.data;
//       })
//       .then(async user => {
//         if (user.success === true)

//         const decodedUser = jwt_decode(user.token);
//         let peomise = await setAuthToken(user.token);
//         return { user: decodedUser, message: user.message };
//       })
//       .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
//       .then(() => {
//         if (getState().auth.userInfo) {
//           navigation.navigate("Dashboard");
//           dispatch(send_push_notification());
//           dispatch(getBusinessAccounts());
//           AsyncStorage.setItem("registeredWithInvite", "true");
//         }
//       })
//       .catch(err => {
//         // console.log("registerUser error", err.message || err.response);
//         showMessage({
//           message:
//             err.message ||
//             err.response ||
//             "Something went wrong while registering, please try again.",
//           type: "danger",
//           position: "top"
//         });
//       });
//   };
// };

export const registerUser = (userInfo, navigation, businessInvite = "1") => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SAVING_REGISTER_ACCOUNT, payload: true });

    createBaseUrl()
      .post(
        `${businessInvite === "0" ? "registerMemberUser" : "registerUserV2"}`,
        userInfo
      )
      .then((res) => {
        return res.data;
      })
      .then(async (user) => {
        if (user.success === true) {
          const decodedUser = jwt_decode(user.token);
          let peomise = await setAuthToken(user.token);
          return { user: decodedUser, message: user.message };
          //if something goes wrong with the registeration process or Front-end verification
          //this will throw an error and stop the regiteration process
        } else return Promise.reject({ message: user.message });
      })
      .then((decodedUser) => {
        if (decodedUser && decodedUser.user) {
          if (
            [
              "nouf@optimizeapp.com",
              "sam.omran@hotmail.com",
              "imran@optimizekw.com",
              "saadiya@optimizekw.com",
              "shorook@optimizekw.com",
              "samy@optimizeapp.com",
            ].includes(decodedUser.user.email)
          ) {
            dispatch(chanege_base_url(true));
          }
          dispatch(setCurrentUser(decodedUser));
        }
      })
      .then(() => {
        if (getState().auth.userInfo) {
          analytics.alias(getState().auth.userInfo.userid);
          analytics.identify(getState().auth.userInfo.userid, {
            logged_out: false,
          });
          dispatch({
            type: actionTypes.SAVING_REGISTER_ACCOUNT,
            payload: false,
          });
          navigation.navigate("RegistrationSuccess");
          dispatch(send_push_notification());
          dispatch(getBusinessAccounts());
          dispatch(connect_user_to_intercom(getState().auth.userInfo.userid));
          AsyncStorage.setItem("registeredWithInvite", "true");
        }
      })
      .catch((err) => {
        // console.log("registerUser error", err.message || err.response);
        dispatch({
          type: actionTypes.SAVING_REGISTER_ACCOUNT,
          payload: false,
        });
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong while registering, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

export const resetRegister = () => {
  return (dispatch) => {
    setAuthToken().then(() => dispatch(setCurrentUser(null)));
  };
};

export const sendMobileNo = (mobileNo) => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post(`addMobile`, mobileNo)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
        });
        return dispatch({
          type: actionTypes.SEND_MOBILE_NUMBER,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("sendMobileNo error", err.message || err.response);
        return dispatch({
          type: actionTypes.ERROR_SEND_MOBILE_NO,
          payload: {
            success: false,
          },
        });
      });
  };
};

export const verifyMobileCode = (
  mobileAuth,
  verification_channel,
  navigationPath = "Dashboard"
) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`verifyMobileCode`, mobileAuth)
      .then((res) => {
        return res.data;
      })
      .then(async (data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
        });
        if (!data.success) {
          analytics.track(`a_otp_verify`, {
            source: "otp_verify",
            source_action: "a_otp_verify",
            device_id: getUniqueId(),
            timestamp: new Date().getTime(),
            verification_channel,
            action_status: "failure",
          });
          return dispatch({
            type: actionTypes.VERIFY_MOBILE_NUMBER,
            payload: data,
          });
        }
        dispatch({
          type: actionTypes.VERIFY_MOBILE_NUMBER,
          payload: data,
        });

        await setAuthToken(data.token);
        const decodedUser = jwt_decode(data.token);

        return {
          user: decodedUser,
          message: data.message,
          success: data.success,
        };
      })
      .then((decodedUser) => {
        if (decodedUser && decodedUser.user && decodedUser.success) {
          analytics.track(`a_otp_verify`, {
            source: "otp_verify",
            source_action: "a_otp_verify",
            device_id: getUniqueId(),
            timestamp: new Date().getTime(),
            userId: decodedUser.user.userid,
            verification_channel,
            action_status: "success",
          });
          dispatch(setCurrentUser(decodedUser));
        }
        return decodedUser.success;
      })
      .then((success) => {
        if (success) {
          let adjustVerifyAccountTracker = new AdjustEvent("gmanq8");
          Adjust.trackEvent(adjustVerifyAccountTracker);
          NavigationService.navigate("Dashboard", {
            source: "otp_verify",
            source_action: "a_otp_verify",
          });
        }
      })
      .catch((err) => {
        // console.log("verifyMobileCode error", err.message || err.response);
        analytics.track(`a_error`, {
          error_page: "otp_verify",
          action_status: "failure",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          source_action: "a_otp_verify",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
        });
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_MOBILE_NUMBER,
          payload: {
            success: false,
          },
        });
      });
  };
};

export const resendVerifyMobileCode = (mobileAuth) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`resendVerificationCode`, mobileAuth)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.success === true)
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top",
          });

        return dispatch({
          type: actionTypes.RESEND_VERIFICATION,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("resendVerifyMobileCode", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });

        return dispatch({
          type: actionTypes.RESEND_VERIFICATION,
          payload: {
            success: false,
          },
        });
      });
  };
};

export const resendVerifyMobileCodeByEmail = (mobileAuth) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`resendVerificationCodebyEmail`, mobileAuth)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
        });
        return dispatch({
          type: actionTypes.RESEND_VERIFICATION_EMAIL,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log(
        //   "resendVerifyMobileCodeByEmail error",
        //   err.message || err.response
        // );
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_RESEND_VERIFICATION_EMAIL,
          payload: {
            success: false,
          },
        });
      });
  };
};

export const verifyEmail = (email, userInfo, navigation) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.VERIFY_EMAIL_LOADING,
      payload: true,
    });
    createBaseUrl()
      .post(`verifyEmail`, { email: email }, { timeout: 5000 })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        dispatch({
          type: actionTypes.VERIFY_EMAIL,
          payload: { success: data.success, userInfo },
        });
        return data;
      })
      .then((data) => {
        if (data.success) {
          navigation.push("MainForm", {
            source: "email_registration",
            source_action: "a_create_account",
          });
        }
        if (!data.success) {
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top",
          });
        }
        analytics.track(`a_create_account`, {
          mode_of_sign_up: "email",
          source: "email_registration",
          action_status: data.success ? "success" : "failure",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          // source_action: "" Not sure
        });
      })
      .catch((err) => {
        // console.log("verifyEmail ERROR", err.message || err.response);
        showMessage({
          message:
            (err.message && !err.message.includes("timeout") && err.message) ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        dispatch({
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        });
        analytics.track(`a_error`, {
          error_page: "email_registration",
          action_status: "failure",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),

          source_action: "a_create_account",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: { success: false, userInfo },
        });
      });
  };
};

export const verifyInviteCode = (verificationCode) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`verifyInvitationCode`, { verificationCode })
      .then((res) => res.data)
      .then((data) => {
        !data.success &&
          showMessage({
            message: data.message,
            type: "danger",
            position: "top",
          });
        data.success &&
          NavigationService.navigate("MainForm", {
            invite: true,
          });
        return dispatch({
          type: actionTypes.SET_INVITE_CODE,
          payload: { data, verificationCode },
        });
      })

      .catch((err) => {
        // console.log("verifyInviteCodeError", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_INVITE_CODE,
          payload: null,
        });
      });
  };
};

export const requestInvitationCode = (info) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`requestinvitationCode`, info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        showMessage({
          message: "Request successful!",
          description: "We will contact you as soon as possible.",
          type: "success",
          position: "top",
        });

        // return dispatch({
        //   type: actionTypes.SET_INVITE_CODE,
        //   payload: { data, verificationCode }
        // });
      })

      .catch((err) => {
        // console.log("requestInvitationCodeError", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again",
          type: "danger",
          position: "top",
        });
      });
  };
};

/**
 * To register a user on the app
 * @param {*} userInfo
 * @param {*} businessInvite
 * @param {*} navigation
 */
export const registerGuestUser = (
  userInfo,
  businessInvite = "1",
  navigation
) => {
  return async (dispatch, getState) => {
    createBaseUrl()
      .post(`saveUserInfoV2`, userInfo)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_sign_up`, {
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          source: "registration_detail",
          source_action: "a_sign_up",
          action_status: data.success ? "success" : "failure",
          email: userInfo.email,
          business_invite: businessInvite === "0",
        });

        // For users creating new business while registering
        if (businessInvite === "1") {
          analytics.track(`a_create_buiness_account`, {
            source: "open_create_business_account",
            source_action: `a_create_buiness_account`,
            action_status: data.success ? "success" : "failure",
            timestamp: new Date().getTime(),
            ...userInfo,
          });
        }
        let adjustRegiserTracker = new AdjustEvent("eivlhl");
        adjustRegiserTracker.setCallbackId(userInfo.mobile);
        Adjust.trackEvent(adjustRegiserTracker);
        if (!data.success) {
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top",
          });
        }
        // TODO: NEED A SOLUTION FOR THIS
        // if (businessInvite === "0") {
        //   dispatch(registerUser(userInfo, navigation, businessInvite));
        // }

        // dispatch({
        //   type: actionTypes.REGISTER_GUEST_USER,
        //   payload: { success: data.success, userInfo }
        // });
        return data;
      })
      .then(async (user) => {
        if (user.success === true) {
          const decodedUser = jwt_decode(user.token);
          let peomise = await setAuthToken(user.token);
          return { user: decodedUser, message: user.message };
          //if something goes wrong with the registeration process or Front-end verification
          //this will throw an error and stop the regiteration process
        } else return Promise.reject({ message: user.message });
      })
      .then((decodedUser) => {
        if (decodedUser && decodedUser.user) {
          if (
            [
              "nouf@optimizeapp.com",
              "sam.omran@hotmail.com",
              "imran@optimizekw.com",
              "saadiya@optimizekw.com",
              "shorook@optimizekw.com",
              "samy@optimizeapp.com",
            ].includes(decodedUser.user.email)
          ) {
            dispatch(chanege_base_url(true));
          }
          analytics.alias(decodedUser.user.userid);
          dispatch(setCurrentUser(decodedUser));
        }
      })
      .then(() => {
        if (getState().auth.userInfo) {
          dispatch({
            type: actionTypes.SAVING_REGISTER_ACCOUNT,
            payload: false,
          });
          navigation.navigate("RegistrationSuccess", {
            source: "registration_detail",
            source_action: "a_sign_up",
          });
          dispatch(send_push_notification());
          dispatch(getBusinessAccounts());
          dispatch(connect_user_to_intercom(getState().auth.userInfo.userid));
          AsyncStorage.setItem("registeredWithInvite", "true");
        }
      })
      .catch((err) => {
        // console.log("registerGuestUser ERROR", err.message || err.response);
        analytics.track(`a_error`, {
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          error_page: "registration_detail",
          source_action: "a_sign_up",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
        });
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_REGISTER_GUEST_USER,
          payload: { success: false, userInfo },
        });
      });
  };
};

/**
 * To check reset the steps for account verification when user back press the button
 */
export const resetVerificationCode = () => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.RESET_VERIFICATION_CODE,
    });
  };
};

/**
 * To check if the deep link url verificationCode is expired or not
 */
export const verifyEmailCodeLink = (verificationCode, country_code, mobile) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`verifyEmailCodeLink`, {
        verificationCode,
        country_code,
        mobile,
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log("data verifyEmailCodeLink", data);
        showMessage({
          type: "warning",
          message: data.message,
        });
        return dispatch({
          type: actionTypes.VERIFY_EMAIL_CODE_LINK,
          payload: data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: actionTypes.VERIFY_EMAIL_CODE_LINK,
          payload: {
            success: false,
          },
        });
      });
  };
};
