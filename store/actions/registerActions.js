import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-community/async-storage";

import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
// import { getUniqueId } from "react-native-device-info";
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
import NavigationService from "../../NavigationService";
import {
  setAuthToken,
  getBusinessAccounts,
  getAnonymousUserId,
} from "./genericActions";
import {
  setCurrentUser,
  chanege_base_url,
  getUserProfile,
} from "./loginActions";
import { createBusinessAccount } from "./index";
// import { send_push_notification } from "./loginActions";
import { connect_user_to_intercom } from "./messengerActions";
import createBaseUrl from "./createBaseUrl";

// import { Adjust, AdjustEvent } from "react-native-adjust";
import analytics from "@segment/analytics-react-native";
// const MixpanelSDK = new MixpanelInstance(
//   "c9ade508d045eb648f95add033dfb017",
//   false,
//   false
// );
// MixpanelSDK.initialize().then();
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
    console.log("userInfo", JSON.stringify(userInfo, null, 2));
    createBaseUrl()
      .post(
        // `${businessInvite === "0" ? "registerMemberUser" :
        "users",
        // }`
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .then(async (user) => {
        if (user.success === true) {
          const decodedUser = jwt_decode(user.access_token);
          let peomise = await setAuthToken(user.access_token);
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
          dispatch(createBusinessAccount(userInfo, navigation));
          //   analytics.alias(getState().auth.userInfo.userid);
          // MixpanelSDK.createAlias(getState().auth.userInfo.userid);
          // MixpanelSDK.identify(getState().auth.userInfo.userid);
          analytics.identify(`${getState().auth.userInfo.userid}`, {
            logged_out: false,
          });
          dispatch({
            type: actionTypes.SAVING_REGISTER_ACCOUNT,
            payload: false,
          });
          navigation.navigate("RegistrationSuccess");
          // dispatch(send_push_notification());
          dispatch(getBusinessAccounts());
          // dispatch(connect_user_to_intercom(getState().auth.userInfo.userid));
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

export const sendMobileNo = (mobile) => {
  // console.log("mobile", mobile);
  return (dispatch, getState) => {
    return createBaseUrl()
      .post(`users/otp`, {
        mobile,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("sendMobileNo data", data);
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
        // console.log("sendMobileNo error", err);
        let errorMsg = null;
        if (
          err.response &&
          err.response.data &&
          Object.keys(err.response.data.data).length > 0
        ) {
          for (var key in err.response.data.data) {
            errorMsg = err.response.data.data[key][0];
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          errorMsg = err.response.data.message;
        } else if (err.message || err.response) {
          errorMsg =
            err.message ||
            err.response ||
            "Something went wrong, please try again.";
        }
        showMessage({
          message: errorMsg,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SEND_MOBILE_NUMBER,
          payload: {
            success: false,
            message: errorMsg,
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
  return (dispatch, getState) => {
    return createBaseUrl()
      .post(`users/otp/verify`, mobileAuth)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("verifyMobileCode data", data);
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
        });
        if (!data.success) {
          analytics.track(`Account Verified`, {
            account_verified: false,
          });
          // return dispatch({
          //   type: actionTypes.VERIFY_MOBILE_NUMBER,
          //   payload: data,
          // });
        }

        // dispatch({
        //   type: actionTypes.VERIFY_MOBILE_NUMBER,
        //   payload: data,
        // });
        if (data.success) {
          dispatch(getUserProfile());
        }

        return data.success;
      })

      .then((success) => {
        if (success) {
          // let adjustVerifyAccountTracker = new AdjustEvent("gmanq8");
          // Adjust.trackEvent(adjustVerifyAccountTracker);
          NavigationService.navigate(navigationPath, {
            source: "otp_verify",
            source_action: "a_otp_verify",
          });
        }
      })
      .catch((err) => {
        // console.log("verifyMobileCode error", err);
        let errorMsg = null;
        if (
          err.response &&
          err.response.data &&
          Object.keys(err.response.data.data).length > 0
        ) {
          for (var key in err.response.data.data) {
            errorMsg = err.response.data.data[key][0];
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          errorMsg = err.response.data.message;
        } else if (err.message || err.response) {
          errorMsg =
            err.message ||
            err.response ||
            "Something went wrong, please try again.";
        }
        analytics.track(`Form Error Made`, {
          source: "VerfiyAccount",
          error_description: errorMsg,
        });
        showMessage({
          message: errorMsg,
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
    return createBaseUrl()
      .post(`validate/email`, {
        email: email,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("verifyEmail data", JSON.stringify(data, null, 2));
        dispatch({
          type: actionTypes.VERIFY_EMAIL,
          payload: {
            success: data.success,
            userInfo,
            message: data.message,
          },
        });
        return data;
      })
      .then((data) => {
        if (data.success) {
          navigation.navigate("MainForm", {
            source: "Signin",
            source_action: "Create Account",
          });
        }
        if (!data.success) {
          showMessage({
            message: data.message,
            type: "warning",
            position: "top",
          });
        }
        dispatch({
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        });
        analytics.track(`Sign up Initiated`, {
          mode_of_sign_up: "email",
          source: "Signin",
          action_status: data.success ? "success" : "failure",
          email,
        });
      })
      .catch((err) => {
        // console.log("verifyEmail ERROR", err.response);

        let errorMessage =
          err && err.response && err.response.data
            ? err.response.data.message
              ? err.response.data.message
              : err.message && !err.message.includes("timeout") && err.message
            : err.response
            ? err.response
            : "Something went wrong, please try again.";
        // console.log("errorMessage", errorMessage);
        showMessage({
          message: errorMessage,
          type: "danger",
          position: "top",
        });

        analytics.track(`Form Error Made`, {
          source: "Signin",
          source_action: "a_create_account",
          error_description: errorMessage,
        });
        dispatch({
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: {
            success: false,
            userInfo,
            message: errorMessage,
          },
        });
        return dispatch({
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
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
  info,
  businessInvite = "1",
  navigation,
  businessAccount
) => {
  return (dispatch, getState) => {
    let user_info = {
      email: info.email,
      password: info.password,
      password_confirmation: info.repassword,
      first_name: info.firstname,
      last_name: info.lastname,
      mobile: info.mobile,
    };

    let business_info = {
      name: info.name,
      category: info.category,
      country_id: info.country_id,
      instagram_handle: info.instagram_handle,
      other_business_category: info.other_business_category,
    };
    console.log(
      "user_info, business_info",
      JSON.stringify(user_info, null, 2),
      JSON.stringify(business_info, null, 2)
    );

    return createBaseUrl()
      .post(`users`, user_info)
      .then((res) => {
        return res.data;
      })
      .then(async (data) => {
        console.log("registerGuestUser data", JSON.stringify(data, null, 2));
        delete info.password;

        analytics.track(`Form Submitted`, {
          form_type: "Registration Detail Form",
          form_context: {
            ...info,
            business_invite: businessInvite === "0",
          },
        });
        if (data.success) {
          console.log("reached here");
          await setAuthToken(data.data.access_token);
        }
        //=====Tracked from the backend=====//
        // For users creating new business while registering
        // if (businessInvite === "1") {
        //   analytics.track(`Business Created`, {
        //     business_name: businessAccount.businessname,
        //     business_category: businessAccount.businesscategory,
        //     country: businessAccount.country,
        //     insta_handle_for_review: businessAccount.insta_handle_for_review,
        //     other_business_category: businessAccount.otherBusinessCategory,
        //   });
        // }
        // analytics.track("Signed Up", {
        //   first_name: info.firstname,
        //   last_name: info.lastname,
        //   email: info.email,
        //   mobile: info.mobile,
        // });
        // let adjustRegiserTracker = new AdjustEvent("eivlhl");
        // adjustRegiserTracker.setCallbackId(info.mobile);
        // Adjust.trackEvent(adjustRegiserTracker);
        // if (!data.success) {
        //   showMessage({
        //     message: data.message,
        //     type: data.success ? "success" : "warning",
        //     position: "top",
        //   });
        // }
        // TODO: NEED A SOLUTION FOR THIS
        // if (businessInvite === "0") {
        //   dispatch(registerUser(info, navigation, businessInvite));
        // }

        // dispatch({
        //   type: actionTypes.REGISTER_GUEST_USER,
        //   payload: { success: data.success, info }
        // });
        return data;
      })
      .then(async () => {
        console.log("get user call");
        await dispatch(getUserProfile());
      })
      .then(async () => {
        await dispatch(createBusinessAccount(business_info, navigation));
      })
      .then(() => {
        console.log("finalluy");
        if (getState().auth.info) {
          // dispatch(createBusinessAccount(info, navigation));
          dispatch({
            type: actionTypes.SAVING_REGISTER_ACCOUNT,
            payload: false,
          });
          navigation.navigate("RegistrationSuccess", {
            source: "RegistrationDetailForm",
            source_action: "Registration Detail Form Submitted",
          });
          // dispatch(send_push_notification());
          // dispatch(getBusinessAccounts());// add back later
          // dispatch(connect_user_to_intercom(getState().auth.info.userid));
          AsyncStorage.setItem("registeredWithInvite", "true");
        }
      })
      .catch((err) => {
        console.log("registerGuestUser ERROR", err);
        let errorMsg = null;
        if (
          err.response &&
          err.response.data &&
          Object.keys(err.response.data.data).length > 0
        ) {
          for (var key in err.response.data.data) {
            errorMsg = err.response.data.data[key][0];
          }
        } else if (err.message || err.response) {
          errorMsg =
            err.message ||
            err.response ||
            "Something went wrong, please try again.";
        }
        console.log("errorMsg", errorMsg);
        analytics.track(`Form Error Made`, {
          source: "RegistrationDetailForm",
          source_action: "a_sign_up",
          error_description: errorMsg,
        });
        showMessage({
          message: errorMsg,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_REGISTER_GUEST_USER,
          payload: { success: false, info, message: errorMsg },
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

export const verifyOTPByCall = () => {
  return (dispatch) => {
    return createBaseUrl()
      .post(`users/otp/call`)
      .then((res) => res.data)
      .then((data) => {
        // console.log(`verifyOTPByCall`, data);
        showMessage({
          type: data.success ? "success" : "warning",
          message: data.message,
        });
        return dispatch({
          type: actionTypes.OTP_BY_CALL,
          payload: {
            success: data.success,
          },
        });
      })
      .catch((err) => {
        // console.log("err verifyOTPByCall", err);
        return dispatch({
          type: actionTypes.OTP_BY_CALL,
          payload: {
            success: false,
          },
        });
      });
  };
};
