import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const checkForExpiredToken = navigation => {
  return dispatch => {
    return AsyncStorage.getItem("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        console.log(user);
        console.log(currentTime);
        if (user.exp >= currentTime) {
          setAuthToken(token)
            .then(() => dispatch(setCurrentUser(user)))
            .then(() => {
              navigation.navigate("Home");
            });
        }
      }
    });
  };
};

export const sendMobileNo = mobileNo => {
  return (dispatch, getState) => {
    instance
      .post(`addMobile`, mobileNo)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SEND_MOBILE_NUMBER,
          payload: data
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};

export const verifyMobileCode = mobileAuth => {
  return dispatch => {
    instance
      .post(`verifyMobileCode`, mobileAuth)
      .then(res => {
        console.log(res.data);

        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.VERIFY_MOBILE_NUMBER,
          payload: data
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};

export const verifyEmail = (email, userInfo) => {
  return dispatch => {
    instance
      .post(`verifyEmail`, email)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.VERIFY_EMAIL,
          payload: { success: data.success, userInfo }
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};

export const registerUser = (userInfo, navigation) => {
  return (dispatch, getState) => {
    instance
      .post(`registerUser`, userInfo)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        return decodedUser;
      })
      .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
      .then(() => {
        console.log("state", getState().auth);
        navigation.navigate("Home");
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
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        return decodedUser;
      })
      .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
      .then(() => {
        console.log(getState().auth);
        navigation.navigate("Home");
      })
      .catch(err => {});
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
    console.log("user", { user });
    if (user) {
      return dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: { user }
      });
    } else {
      return dispatch({ type: actionTypes.LOGOUT_USER, payload: { user } });
    }
  };
};

export const logout = navigation => {
  navigation.navigate("Signin");

  setAuthToken();
  return setCurrentUser(null);
};

export const create_ad_account = navigation => {
  return dispatch => {
    instance
      .post("snapadaccounts")
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(data);
      })
      .then(() => {
        navigation.navigate("Home");
      })

      .catch(err => {});
  };
};
