import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Segment from "expo-analytics-segment";
import NavigationService from "../../NavigationService";
import { setAuthToken, getBusinessAccounts } from "./genericActions";
import { setCurrentUser, chanege_base_url } from "./loginActions";
import { send_push_notification } from "./loginActions";
import createBaseUrl from "./createBaseUrl";
import segmentEventTrack from "../../components/segmentEventTrack";

export const verifyBusinessName = (businessname, _handleBusinessName) => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyBusinessName`, { businessname })
      .then(res => res.data)
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        _handleBusinessName(data.success);
        return dispatch({
          type: actionTypes.VERIFY_BUSINESSNAME,
          payload: data
        });
      })
      .catch(err => {
        // console.log("verifyBusinessName", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_BUSINESSNAME,
          payload: {
            success: false
          }
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
//           Segment.trackWithProperties("Complete Registration", {
//             category: "Sign Up",
//             label: "Successfully Registered"
//           });

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
      .then(res => {
        return res.data;
      })
      .then(async user => {
        if (user.success === true) {
          Segment.trackWithProperties("Register Business Info", {
            category: "Sign Up",
            label: "Step 3 of Registration"
          });
          const decodedUser = jwt_decode(user.token);
          let peomise = await setAuthToken(user.token);
          return { user: decodedUser, message: user.message };
          //if something goes wrong with the registeration process or Front-end verification
          //this will throw an error and stop the regiteration process
        } else return Promise.reject({ message: user.message });
      })
      .then(decodedUser => {
        if (decodedUser && decodedUser.user) {
          if (
            [
              "nouf@optimizeapp.com",
              "sam.omran@hotmail.com",
              "imran@optimizekw.com",
              "saadiya@optimizekw.com",
              "shorook@optimizekw.com",
              "samy@optimizeapp.com"
            ].includes(decodedUser.user.email)
          ) {
            dispatch(chanege_base_url(true));
          }
          dispatch(setCurrentUser(decodedUser));
        }
      })
      .then(() => {
        if (getState().auth.userInfo) {
          dispatch({
            type: actionTypes.SAVING_REGISTER_ACCOUNT,
            payload: false
          });
          navigation.navigate("RegistrationSuccess");
          dispatch(send_push_notification());
          dispatch(getBusinessAccounts());
          AsyncStorage.setItem("registeredWithInvite", "true");
        }
      })
      .catch(err => {
        // console.log("registerUser error", err.message || err.response);
        dispatch({
          type: actionTypes.SAVING_REGISTER_ACCOUNT,
          payload: false
        });
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong while registering, please try again.",
          type: "danger",
          position: "top"
        });
      });
  };
};

export const resetRegister = () => {
  return dispatch => {
    setAuthToken().then(() => dispatch(setCurrentUser(null)));
  };
};

export const sendMobileNo = mobileNo => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post(`addMobile`, mobileNo)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true) {
          segmentEventTrack("Successfully code sent on mobile", {
            category: "Account Verification",
            label: "Step 1 of Account Verification"
          });
        }

        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        return dispatch({
          type: actionTypes.SEND_MOBILE_NUMBER,
          payload: data
        });
      })
      .catch(err => {
        // console.log("sendMobileNo error", err.message || err.response);
        return dispatch({
          type: actionTypes.ERROR_SEND_MOBILE_NO,
          payload: {
            success: false
          }
        });
      });
  };
};

export const verifyMobileCode = mobileAuth => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyMobileCode`, mobileAuth)
      .then(res => {
        return res.data;
      })
      .then(async data => {
        if (data.success === true) {
          segmentEventTrack("Successfully Verified Account", {
            category: "Account Verification",
            label: "Step 2 of Account Verification"
          });
        }

        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        if (!data.success) {
          return dispatch({
            type: actionTypes.VERIFY_MOBILE_NUMBER,
            payload: data
          });
        }
        dispatch({
          type: actionTypes.VERIFY_MOBILE_NUMBER,
          payload: data
        });

        await setAuthToken(data.token);
        const decodedUser = jwt_decode(data.token);
        return { user: decodedUser, message: data.message };
      })
      .then(decodedUser => {
        if (decodedUser && decodedUser.user) {
          dispatch(setCurrentUser(decodedUser));
        }
      })
      .then(() => {
        NavigationService.navigate("Dashboard");
      })
      .catch(err => {
        // console.log("verifyMobileCode error", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_MOBILE_NUMBER,
          payload: {
            success: false
          }
        });
      });
  };
};

export const resendVerifyMobileCode = mobileAuth => {
  return dispatch => {
    createBaseUrl()
      .post(`resendVerificationCode`, mobileAuth)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true)
          Segment.trackWithProperties("Resend Verification Code by Phone No.", {
            category: "Sign Up",
            label: "Request a new Verification Code"
          });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });

        return dispatch({
          type: actionTypes.RESEND_VERIFICATION,
          payload: data
        });
      })
      .catch(err => {
        // console.log("resendVerifyMobileCode", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });

        return dispatch({
          type: actionTypes.RESEND_VERIFICATION,
          payload: {
            success: false
          }
        });
      });
  };
};

export const resendVerifyMobileCodeByEmail = mobileAuth => {
  return dispatch => {
    createBaseUrl()
      .post(`resendVerificationCodebyEmail`, mobileAuth)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true) {
          Segment.trackWithProperties("Resend Verification Code by Email", {
            category: "Account Verification",
            label: "Request a new Verification Code"
          });
        }

        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        return dispatch({
          type: actionTypes.RESEND_VERIFICATION_EMAIL,
          payload: data
        });
      })
      .catch(err => {
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
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_RESEND_VERIFICATION_EMAIL,
          payload: {
            success: false
          }
        });
      });
  };
};

export const verifyEmail = (email, userInfo, navigation) => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyEmail`, { email: email })
      .then(res => {
        return res.data;
      })
      .then(data => {
        dispatch({
          type: actionTypes.VERIFY_EMAIL,
          payload: { success: data.success, userInfo }
        });
        return data;
      })
      .then(data => {
        if (data.success) {
          Segment.trackWithProperties("Register Email Info", {
            category: "Sign Up",
            label: "Step 1 of Registration"
          });
          navigation.push("MainForm");
        }
        if (!data.success) {
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top"
          });
        }
      })
      .catch(err => {
        // console.log("verifyEmail ERROR", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: { success: false, userInfo }
        });
      });
  };
};

export const verifyInviteCode = verificationCode => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyInvitationCode`, { verificationCode })
      .then(res => res.data)
      .then(data => {
        !data.success &&
          showMessage({
            message: data.message,
            type: "danger",
            position: "top"
          });
        data.success &&
          NavigationService.navigate("MainForm", {
            invite: true
          });
        return dispatch({
          type: actionTypes.SET_INVITE_CODE,
          payload: { data, verificationCode }
        });
      })

      .catch(err => {
        // console.log("verifyInviteCodeError", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_INVITE_CODE,
          payload: null
        });
      });
  };
};

export const requestInvitationCode = info => {
  return dispatch => {
    createBaseUrl()
      .post(`requestinvitationCode`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        showMessage({
          message: "Request successful!",
          description: "We will contact you as soon as possible.",
          type: "success",
          position: "top"
        });

        // return dispatch({
        //   type: actionTypes.SET_INVITE_CODE,
        //   payload: { data, verificationCode }
        // });
      })

      .catch(err => {
        // console.log("requestInvitationCodeError", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again",
          type: "danger",
          position: "top"
        });
      });
  };
};

/**
 * To register a user as guest user on personal info registeration
 * @param {*} userInfo
 * @param {*} businessInvite
 * @param {*} navigation
 */
export const registerGuestUser = (
  userInfo,
  businessInvite = "1",
  navigation
) => {
  return dispatch => {
    createBaseUrl()
      .post(`saveUserInfo`, userInfo)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true) {
          Segment.trackWithProperties("Register Personal Info", {
            category: "Sign Up",
            label: "Step 2 of Registration"
          });
        }

        if (!data.success) {
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top"
          });
        }
        if (businessInvite === "0") {
          dispatch(registerUser(userInfo, navigation, businessInvite));
        }

        return dispatch({
          type: actionTypes.REGISTER_GUEST_USER,
          payload: { success: data.success, userInfo }
        });
      })
      .catch(err => {
        // console.log("registerGuestUser ERROR", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_REGISTER_GUEST_USER,
          payload: { success: false, userInfo }
        });
      });
  };
};

/**
 * To check reset the steps for account verification when user back press the button
 */
export const resetVerificationCode = () => {
  return dispatch => {
    return dispatch({
      type: actionTypes.RESET_VERIFICATION_CODE
    });
  };
};

/**
 * To check if the deep link url verificationCode is expired or not
 */
export const verifyEmailCodeLink = (verificationCode, country_code, mobile) => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyEmailCodeLink`, {
        verificationCode,
        country_code,
        mobile
      })
      .then(res => res.data)
      .then(data => {
        // console.log("data verifyEmailCodeLink", data);
        showMessage({
          type: "warning",
          message: data.message
        });
        return dispatch({
          type: actionTypes.VERIFY_EMAIL_CODE_LINK,
          payload: data
        });
      })
      .catch(error => {
        return dispatch({
          type: actionTypes.VERIFY_EMAIL_CODE_LINK,
          payload: {
            success: false
          }
        });
      });
  };
};
