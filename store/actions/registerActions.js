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

const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const send_push_notification = () => {
  return (dispatch, getState) => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(permission => {
      if (permission.status === "granted") {
        Notifications.getExpoPushTokenAsync().then(token => {
          instance
            .post(`updatepushToken`, {
              token: token,
              userid: getState().auth.userInfo.userid
            })
            .then(res => {
              console.log("token", token);
              return res.data;
            })
            .then(data => {
              dispatch({
                type: actionTypes.SET_PUSH_NOTIFICATION_TOKEN,
                payload: data
              });
            })
            .catch(err => {
              console.log(err.response);
            });
        });
      }
    });
  };
};

export const verifyBusinessName = businessName => {
    return dispatch => {
      instance
        .post(`verifyBusinessName`, { businessname: businessName })
        .then(res => res.data)
        .then(data => {
          if (data.success === true)
            Segment.track("Business Info Register Button");
            showMessage({
              message: data.message,
              type: data.success ? "success" : "warning",
              position: "top"
            })
          return dispatch({
            type: actionTypes.VERIFY_BUSINESSNAME,
            payload: data
          });
        })
        .catch(err => {
          console.log(err.response);
      });
    };
};
        


export const registerUser = (userInfo, navigation) => {
  return (dispatch, getState) => {
    instance
      .post(`registerUser`, userInfo)
      .then(res => {
        console.log("register user", res.data);
        return res.data;
      })
      .then(async user => {
        if (user.success === true)
          Segment.track("User Registered Successfully");

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
        console.log(err.response);
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
      instance
        .post(`addMobile`, mobileNo)
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.success === true) Segment.track("Phone No. Register Button");
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top"
          })
          return dispatch({
            type: actionTypes.SEND_MOBILE_NUMBER,
            payload: data
          });
        })
        .catch(err => {
          console.log(err.response);
        });
  };
};

export const verifyMobileCode = mobileAuth => {
    return dispatch => {
      instance
        .post(`verifyMobileCode`, mobileAuth)
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.success === true) Segment.track("Phone No. Verified Button");
          showMessage({
            message: data.message,
            type: data.success ? "success" : "warning",
            position: "top"
          })
          return dispatch({
            type: actionTypes.VERIFY_MOBILE_NUMBER,
            payload: data
          });
        })
        .catch(err => {
          console.log(err.response);
        });     
  };
};

export const resendVerifyMobileCode = mobileAuth => {
  return dispatch => {
    instance
      .post(`resendVerificationCode`, mobileAuth)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true)
        Segment.track("Phone No. Resend Verification Button");
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        })
        return dispatch({
          type: actionTypes.RESEND_VERIFICATION,
          payload: data
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const resendVerifyMobileCodeByEmail = mobileAuth => {
  return dispatch => {
    instance
      .post(`resendVerificationCodebyEmail`, mobileAuth)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success === true)
          Segment.track("Phone No. Email Resend Verification Button");

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
        console.log(err);
      });
  };
};

export const verifyEmail = (email, userInfo) => {
    return dispatch => {
        instance
        .post(`verifyEmail`, { email: email })
        .then(res => {
            return res.data;
        })
        .then(data => {
            if (data.success === true)
            Segment.track("Personal Info Register Button");
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
            console.log(err.response);
      });
  };
};

export const verifyInviteCode = verificationCode => {
  return dispatch => {
    instance
      .post(`verifyInvitationCode`, { verificationCode })
      .then(res => res.data)
      .then(data => {
        console.log(data);
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

      .catch(err => console.log(err.response));
  };
};

export const requestInvitationCode = info => {
  console.log(info);

  return dispatch => {
      console.log('info', info)
    instance
      .post(`requestinvitationCode`, info)
      .then(res => {
        console.log('res', res)
        return res.data
      })
      .then(data => {
        console.log(data);
       
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

      .catch(err => console.log(err.response));
  };
};