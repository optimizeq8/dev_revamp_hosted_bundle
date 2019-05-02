import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { Segment, Permissions, Notifications } from "expo";

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
export const changeBusiness = business => {
  return dispatch => {
    console.log("chosen business", business);

    return dispatch({
      type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
      payload: { business: business }
    });
  };
};

export const getCampaign = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CAMPAIGN,
      payload: { loading: true, data: {}, message: "" }
    });
    instance
      .get(`campaigndetail/${id}`)
      .then(res => {
        console.log("data", res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_CAMPAIGN,
          payload: data
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const getCampaignList = (id, increasePage, cancelToken) => {
  return dispatch => {
    dispatch({
      type: actionTypes.GOT_ALL_CAMPAIGNS,
      payload: { isListEnd: false, fetching_from_server: false, loading: true }
    });
    instance
      .get(`campaignlist/${id}/${1}`, {
        cancelToken
      })
      .then(res => {
        console.log(res.data);

        return res.data;
      })
      .then(data => {
        increasePage();
        return dispatch({
          type: actionTypes.SET_CAMPAIGN_LIST,
          payload: data
        });
      })
      .catch(err => {
        // console.log(err.response);
        console.log("Error: ", err); // => prints: Api is being canceled
      });
  };
};

export const updateCampaignList = (id, page, increasePage) => {
  console.log("svwevwvwev");

  return dispatch => {
    dispatch({
      type: actionTypes.GOT_ALL_CAMPAIGNS,
      payload: { isListEnd: false, fetching_from_server: true }
    });
    instance
      .get(`campaignlist/${id}/${page}`)
      .then(res => {
        // console.log("dataaaa", res.data);
        return res.data;
      })
      .then(JSONobj => {
        if (JSONobj.data.length > 0) {
          increasePage();
          return dispatch({
            type: actionTypes.UPDATE_CAMPAIGN_LIST,
            payload: { data: JSONobj.data, fetching_from_server: false }
          });
        } else {
          return dispatch({
            type: actionTypes.GOT_ALL_CAMPAIGNS,
            payload: { isListEnd: true, fetching_from_server: false }
          });
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const getBusinessAccounts = () => {
  return dispatch => {
    instance
      .get(`businessaccounts`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        // console.log("businessacc", data);

        return dispatch({
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
          payload: data
        });
      })

      .catch(err => {
        console.log(err.response);
      });
  };
};

export const createBusinessAccount = (account, navigation) => {
  return dispatch => {
    instance
      .post(`businessaccount`, account)
      .then(res => {
        return res.data;
      })
      .then(data => {
        dispatch({
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
          payload: { business: data.data }
        });
        return dispatch({
          type: actionTypes.ADD_BUSINESS_ACCOUNT,
          payload: data.data
        });
      })
      .then(navigation.navigate("Dashboard"))

      .catch(err => {
        console.log(err.response);
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

export const sendMobileNo = mobileNo => {
  return (dispatch, getState) => {
    instance
      .post(`addMobile`, mobileNo)
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log("phone ", data);
        if (data.success === true) Segment.track("Phone No. Register Button");

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

export const resetMessages = () => {
  return dispatch =>
    dispatch({
      type: actionTypes.RESET_MESSAGE
    });
};

export const verifyMobileCode = mobileAuth => {
  return dispatch => {
    instance
      .post(`verifyMobileCode`, mobileAuth)
      .then(res => {
        console.log("verify", res.data);

        return res.data;
      })
      .then(data => {
        if (data.success === true) Segment.track("Phone No. Verified Button");

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
        console.log("resendVerifyMobileCode", res.data);

        return res.data;
      })
      .then(data => {
        if (data.success === true)
          Segment.track("Phone No. Resend Verification Button");

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
        console.log("resendVerificationCodebyEmail--", res.data);

        return res.data;
      })
      .then(data => {
        if (data.success === true)
          Segment.track("Phone No. Email Resend Verification Button");

        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning"
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
  console.log("email", email);

  return dispatch => {
    instance
      .post(`verifyEmail`, { email: email })
      .then(res => {
        console.log("verify email", res.data);
        return res.data;
      })
      .then(data => {
        if (data.success === true)
          Segment.track("Personal Info Register Button");

        return dispatch({
          type: actionTypes.VERIFY_EMAIL,
          payload: { success: data.success, userInfo, message: data.message }
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const verifyBusinessName = businessName => {
  console.log("businessName", businessName);

  return dispatch => {
    instance
      .post(`verifyBusinessName`, { businessname: businessName })
      .then(res => res.data)
      .then(data => {
        console.log("businessName", data);
        if (data.success === true)
          Segment.track("Business Info Register Button");

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
        return res.data;
      })
      .then(async user => {
        console.log("userInfo", user);
        if (data.success === true)
          Segment.track("User Registered Successfully");

        const decodedUser = jwt_decode(user.token);
        let peomise = await setAuthToken(user.token);
        return { user: decodedUser, message: user.message };
      })
      .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
      .then(() => {
        if (getState().auth.userInfo) {
          console.log("state user", getState().auth.userInfo);
          navigation.navigate("Dashboard");
          dispatch(send_push_notification());
          dispatch(getBusinessAccounts());
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const login = (userData, navigation) => {
  return (dispatch, getState) => {
    instance
      .post("userLogin", userData)
      .then(res => {
        return res.data;
      })
      .then(async user => {
        let decodedUser = null;
        if (typeof user.token !== "undefined") {
          decodedUser = jwt_decode(user.token);
          let promise = await setAuthToken(user.token);
        } else {
          console.log("decodedUser", decodedUser);
        }
        const obj = { user: decodedUser, message: user.message };
        return obj;
      })
      .then(decodedUser => {
        console.log(decodedUser);
        dispatch(setCurrentUser(decodedUser));
      })
      .then(() => {
        if (getState().auth.userInfo) {
          navigation.navigate("Dashboard");
          console.log(
            "auth token",
            axios.defaults.headers.common.Authorization
          );
          dispatch(getBusinessAccounts());
          dispatch(send_push_notification());
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};
export const changePassword = (currentPass, newPass, navigation) => {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return dispatch => {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD,
      payload: { success: false }
    });
    instance
      .put("changePassword", {
        current_password: currentPass,
        password: newPass
      })
      .then(response => {
        console.log(response.data);

        showMessage({
          message: response.data.message,
          type: response.data.success ? "success" : "warning"
        });
        if (response.data.success) navigation.goBack();
        return dispatch({
          type: actionTypes.CHANGE_PASSWORD,
          payload: response.data
        });
      })
      .catch(err => console.log(err));
  };
};
export const addressForm = (address, navigation) => {
  return (dispatch, getState) => {
    instance
      .post("businessaddress", {
        businessid: getState().auth.mainBusiness.businessid,
        ...address
      })
      .then(response => {
        console.log(response.data);

        showMessage({
          message: response.data.message,
          type: response.data.success ? "success" : "warning"
        });
        if (response.data.success) navigation.goBack();
        return dispatch({
          type: actionTypes.ADD_ADDRESS,
          payload: response.data
        });
      })
      .catch(err => console.log(err));
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

const setAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
      )
      .catch(err => alert(err));
  } else {
    return AsyncStorage.removeItem("token")
      .then(() => {
        delete axios.defaults.headers.common.Authorization;
      })
      .catch(err => alert(err));
  }
};

const setCurrentUser = user => {
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
export const logout = navigation => {
  navigation.navigate("Signin", { loggedout: true });
  setAuthToken();
  return setCurrentUser(null);
};

export const resetRegister = () => {
  setAuthToken();
  return setCurrentUser(null);
};
// IS NOT IN THE AUTH TOKEN SO MIGHT NEED ANOTHER API TO FETCH ALL IDS
export const create_ad_account = (id, navigation) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    instance
      .post("snapadaccounts", { businessid: id })
      .then(res => {
        console.log("create_ad_account", res.data);

        return res.data;
      })
      .then(data => {
        if (data.success) {
          Segment.track("Snapchat Ad Account Created Successfully");

          return dispatch({
            type: actionTypes.CREATE_AD_ACCOUNT,
            payload: { data: data, navigation: navigation.navigate }
          });
        } else {
          showMessage({
            message: data.message,
            type: "info"
          });
          dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
      })
      // .then(() => {
      //   navigation.navigate("Dashboard");
      // })

      .catch(err => console.log(err.response));
  };
};
