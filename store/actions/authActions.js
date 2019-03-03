import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const getCampaign = id => {
  return dispatch => {
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
        // dispatch(console.log(err.response.data));
      });
  };
};

export const getCampaignList = id => {
  return dispatch => {
    instance
      .get(`campaignlist/${id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_CAMPAIGN_LIST,
          payload: data
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
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
        return dispatch({
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
          payload: data
        });
      })

      .catch(err => {
        // dispatch(console.log(err.response.data));
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
        return dispatch({
          type: actionTypes.ADD_BUSINESS_ACCOUNT,
          payload: data.data
        });
      })
      .then(navigation.navigate("Home"))

      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};

export const checkForExpiredToken = navigation => {
  return (dispatch, getState) => {
    return AsyncStorage.getItem("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        console.log(user);
        if (user.exp >= currentTime) {
          setAuthToken(token)
            .then(() => dispatch(setCurrentUser(user)))
            .then(() => dispatch(getBusinessAccounts()))

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
        return res.data;
      })
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        return decodedUser;
      })
      .then(decodedUser => dispatch(setCurrentUser(decodedUser)))
      .then(() => {
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
      .then(() => {})

      .then(() => {
        if (getState().auth.userInfo) {
          navigation.navigate("Home");
          console.log(
            "auth token",
            axios.defaults.headers.common.Authorization
          );
          dispatch(getBusinessAccounts());
        }
      })
      .catch(err => {});
  };
};

const setAuthToken = token => {
  console.log("token", token);
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
    console.log("message", user);
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

export const logout = navigation => {
  navigation.navigate("Signin");

  setAuthToken();
  return setCurrentUser(null);
};
// IS NOT IN THE AUTH TOKEN SO MIGHT NEED ANOTHER API TO FETCH ALL IDS
export const create_ad_account = navigation => {
  return dispatch => {
    instance
      .post("snapadaccounts")
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.CREATE_AD_ACCOUNT,
          payload: data
        });
      })
      .then(() => {
        navigation.navigate("Home");
      })

      .catch(err => {});
  };
};
