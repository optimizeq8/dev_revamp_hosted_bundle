import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { Segment, Permissions, Notifications } from "expo";
import NavigationService from "../../NavigationService";
import { setAuthToken } from "./genericActions";
import { setCurrentUser } from "./loginActions";
import { getBusinessAccounts } from "./accountManagementActions";

import store from "../index";

createBaseUrl = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/"
    // baseURL: "https://www.optimizeapp.com/optimize/public/"
  });
const instance = createBaseUrl();

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
              return dispatch({
                type: actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN
              });
            });
        });
      }
    });
  };
};

export const verifyBusinessName = (businessname, _handleBusinessName) => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyBusinessName`, { businessname })
      .then(res => res.data)
      .then(data => {
        if (data.success === true)
          Segment.trackWithProperties("Register Business Info", {
            category: "Sign Up",
            label: "Step 4 of Registration"
          });
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

export const registerUser = (userInfo, navigation) => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post(`registerUser`, userInfo)
      .then(res => {
        return res.data;
      })
      .then(async user => {
        if (user.success === true)
          Segment.trackWithProperties("Complete Registration", {
            category: "Sign Up",
            label: "Successfully Registered"
          });

        const decodedUser = jwt_decode(user.token);
        let peomise = await setAuthToken(user.token);
        return { user: decodedUser, message: user.message };
      })
      .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
      .then(() => {
        if (getState().auth.userInfo) {
          navigation.navigate("Dashboard");
          dispatch(send_push_notification());
          dispatch(getBusinessAccounts());
          AsyncStorage.setItem("registeredWithInvite", "true");
        }
      })
      .catch(err => {
        // console.log(err.message || err.response);
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
        if (data.success === true)
          Segment.track("Register Phone No.", {
            category: "Sign Up",
            label: "Step 1 of Registration"
          });
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
      .then(data => {
        if (data.success === true)
          Segment.trackWithProperties("Verify Phone No.", {
            category: "Sign Up",
            label: "Step 2 of Registration"
          });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        return dispatch({
          type: actionTypes.VERIFY_MOBILE_NUMBER,
          payload: data
        });
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
        if (data.success === true)
          Segment.trackWithProperties("Resend Verification Code by Email", {
            category: "Sign Up",
            label: "Request a new Verification Code"
          });
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

export const verifyEmail = (email, userInfo) => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyEmail`, { email: email })
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true)
          Segment.trackWithProperties("Register Personal Info", {
            category: "Sign Up",
            label: "Step 3 of Registration"
          });
        if (!data.success) {
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top"
          });
        }
        return dispatch({
          type: actionTypes.VERIFY_EMAIL,
          payload: { success: data.success, userInfo }
        });
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
