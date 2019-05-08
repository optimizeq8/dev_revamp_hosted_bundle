import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { getBusinessAccounts } from "./accountManagementActions";
import { setAuthToken } from "./genericActions";
import {  Permissions, Notifications } from "expo";

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
  

export const checkForExpiredToken = navigation => {
    return (dispatch, getState) => {
      return AsyncStorage.getItem("token").then(token => {
        if (token) {
          const currentTime = Date.now() / 1000;
          const user = jwt_decode(token);
          if (user.exp >= currentTime) {
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
            dispatch(clearPushToken(navigation));
          }
        } else {
          dispatch(logout(navigation));
        }
      });
    };
};

  

export const login = (userData, navigation) => {
    return (dispatch, getState) => {
      instance
        .post("userLogin", userData)
        .then(res => {
          console.log("oiunweg", res.data);
  
          return res.data;
        })
        .then(async user => {
          let decodedUser = null;
          if (user.hasOwnProperty("token")) {
            decodedUser = jwt_decode(user.token);
            let promise = await setAuthToken(user.token);
            return { user: decodedUser, message: user.message };
          } else {
            console.log("oiusoeiunvosnevosunvnweg");
            showMessage({
              message: user.message,
              type: "warning",
              position: "top"
            });
            const obj = { user: decodedUser, message: user.message };
            return obj;
          }
        })
        .then(decodedUser => {
          dispatch(setCurrentUser(decodedUser));
        })
        .then(() => {
          if (getState().auth.userInfo) {
            navigation.navigate("Dashboard");
  
            dispatch(getBusinessAccounts());
            dispatch(send_push_notification());
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
  };



export const logout = navigation => {
    return dispatch => {
        navigation.navigate("Signin", { loggedout: true });
        setAuthToken().then(() => dispatch(setCurrentUser(null)));
    };
  };



export const forgotPassword = (email, navigation) => {
    return dispatch => {
        // dispatch({
        //   type: actionTypes.CHANGE_PASSWORD,
        //   payload: { success: false }
        // });
        instance
        .post("forgotPassword", {
            email: email
        })
        .then(response => {
            showMessage({
            message: response.data.success
                ? "An email with a random generated password has been sent to your email account."
                : "No account exists with the provided email.",
            type: response.data.success ? "success" : "warning"
            });
            if (response.data.success) navigation.goBack();
            // return dispatch({
            //   type: actionTypes.CHANGE_PASSWORD,
            //   payload: response.data
            // });
        })
        .catch(err => console.log(err));
    };
};
  


export const clearPushToken = navigation => {
    return (dispatch, getState) => {
      instance
        .post(`updatepushToken`, {
          token: null,
          userid: getState().auth.userInfo.userid
        })
        .then(res => {
          console.log("cleared token", res.data);
          return res.data;
        })
        .then(data => {
          dispatch({
            type: actionTypes.CLEAR_PUSH_NOTIFICATION_TOKEN,
            payload: data
          });
        })
        .then(() => {
          dispatch(logout(navigation));
        })
        .catch(err => {
          console.log(err.response);
        });
    };
};


export const setCurrentUser = user => {
    return dispatch => {
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

