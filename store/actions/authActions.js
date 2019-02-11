import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const sendMobileNo = mobileNo => {
  return (dispatch, getState) => {
    instance
      .post(`addMobile`, mobileNo)
      .then(res => {
        console.log(res.data.message);
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
        console.log(res.data.message);

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
        console.log(res.data.success);
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

export const registerUser = userInfo => {
  return dispatch => {
    instance
      .post(`registerUser`, userInfo)
      .then(res => {
        console.log(res.data.message);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SIGN_UP_USER,
          payload: data
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};

export const login = (userData, navigation) => {
  return dispatch => {
    instance
      .post("userLogin", userData)
      .then(res => {
        console.log(res.data);
        return res.data.userinfo;
      })
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        console.log("decodedUser");

        setAuthToken(user.token).then(() =>
          dispatch(setCurrentUser(decodedUser))
        );
      })
      .then(() => {
        navigation.navigate("Tutorial");
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
    if (user) {
      dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
    } else {
      dispatch({ type: actionTypes.LOGOUT_USER, payload: user });
    }
  };
};

export const logout = navigation => {
  navigation.navigate("SplashScreen");

  setAuthToken();
  return setCurrentUser(null);
};
