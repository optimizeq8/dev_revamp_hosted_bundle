import axios from "axios";
import jwt_decode from "jwt-decode";
import { showMessage } from "react-native-flash-message";
import * as Segment from "expo-analytics-segment";
import { AsyncStorage, Animated } from "react-native";
import store from "../index";
import * as actionTypes from "./actionTypes";
import { setAuthToken } from "./genericActions";

createBaseUrl = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/"
    // baseURL: "https://www.optimizeapp.com/optimize/public/"
  });
const instance = createBaseUrl();

export const changeBusiness = business => {
  return dispatch => {
    showMessage({
      message: "Changed business account",
      type: "success",
      position: "top"
    });
    return dispatch({
      type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
      payload: { business: business }
    });
  };
};

export const getBusinessAccounts = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_BUSINESS_LIST
    });
    createBaseUrl()
      .get(`businessaccounts`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        // showMessage({
        //   message: data.message,
        //   type: response.data.success ? "success" : "warning"
        // })
        AsyncStorage.getItem("indexOfMainBusiness").then(value => {
          return dispatch({
            type: actionTypes.SET_BUSINESS_ACCOUNTS,
            payload: { data: data, index: value ? value : 0 }
          });
        });
        return;
      })

      .catch(err => {
        // console.log("getBusinessAccountsError", err.message || err.response);
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_BUSINESS_ACCOUNTS
        });
      });
  };
};

export const createBusinessAccount = (account, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true
    });
    createBaseUrl()
      .post(`businessaccount`, account)
      .then(res => {
        return res.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        //incase of an error?? need handling
        if (data.success) {
          dispatch({
            type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
            payload: { business: data.data }
          });
          // data.success && navigation.navigate("Dashboard");
          return dispatch({
            type: actionTypes.ADD_BUSINESS_ACCOUNT,
            payload: { data: data.data, success: true }
          });
        }
      })
      .catch(err => {
        // console.log("error creating new bsn", err.message || err.response);
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        dispatch({
          type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
          payload: {
            loading: false
          }
        });
      });
  };
};

// export const changePassword = (currentPass, newPass, navigation, userEmail) => {
//   axios.defaults.headers.common = {
//     ...axios.defaults.headers.common,
//     "Content-Type": "application/x-www-form-urlencoded"
//   };
//   return dispatch => {
//     dispatch({
//       type: actionTypes.CHANGE_PASSWORD,
//       payload: { success: false }
//     });
//     instance
//       .put("changePassword", {
//         current_password: currentPass,
//         password: newPass
//       })
//       .then(response => {
//         showMessage({
//           message: response.data.message,
//           type: response.data.success ? "success" : "warning",
//           position: "top"
//         });
//         const temPwd = navigation.getParam("temp_pwd", false);
//         // if tempPwd change relogin for setting new auth token
//         if (temPwd && response.data.success) {
//           dispatch(
//             login(
//               {
//                 email: userEmail,
//                 emailError: null,
//                 password: newPass,
//                 passwordError: ""
//               },
//               navigation
//             )
//           );
//         } else if (response.data.success) {
//           navigation.goBack();
//         }
//         return dispatch({
//           type: actionTypes.CHANGE_PASSWORD,
//           payload: response.data
//         });
//       })
//       .catch(err => {
//         console.log("changePasswordError", err.message || err.response);

//         showMessage({
//           message: "Oops! Something went wrong. Please try again.",
//           description: err.message || err.response,
//           type: "danger",
//           position: "top"
//         });

//         return dispatch({
//           type: actionTypes.ERROR_CHANGE_PASSWORD,
//           payload: {
//             success: false
//           }
//         });
//       });
//   };
// };

export const addressForm = (address, navigation, addressId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.SET_BILLING_ADDRESS_LOADING,
        payload: true
      });
      const response = await createBaseUrl().put("businessaddress", {
        businessid: getState().account.mainBusiness.businessid,
        id: addressId,
        ...address
      });
      var time = new Animated.Value(0);
      if (response.data && response.data.message === "Address ID missing") {
        const respData = await createBaseUrl().post("businessaddress", {
          businessid: getState().account.mainBusiness.businessid,
          ...address
        });

        Animated.timing(time, {
          toValue: 1,
          duration: 2000
        }).start(() => {
          showMessage({
            message: respData.data.message,
            type: respData.data.success ? "success" : "warning",
            position: "top"
          });
          if (respData.data.success) navigation.goBack();
          return dispatch({
            type: actionTypes.ADD_ADDRESS,
            payload: respData.data
          });
        });
      } else {
        Animated.timing(time, {
          toValue: 1,
          duration: 2000
        }).start(() => {
          showMessage({
            message: response.data.message,
            type: response.data.success ? "success" : "warning",
            position: "top"
          });
          if (response.data.success) {
            navigation.goBack();
          }
          return dispatch({
            type: actionTypes.ADD_ADDRESS,
            payload: response.data
          });
        });
      }
    } catch (error) {
      // console.log("Error while put/post address form", error.message);
      showMessage({
        message: "Oops! Something went wrong. Please try again.",
        description: error.message || error.response,
        type: "danger",
        position: "top"
      });
      return dispatch({
        type: actionTypes.ERROR_ADD_ADDRESS
      });
    }
  };
};

export const getAddressForm = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_BILLING_ADDRESS_LOADING,
      payload: true
    });
    createBaseUrl()
      .get(`businessaddresses/${getState().account.mainBusiness.businessid}`)
      .then(response => {
        if (response.data && response.data.success)
          if (!response.data.business_accounts) {
            return dispatch({
              type: actionTypes.GET_BILLING_ADDRESS,
              payload: {}
            });
          }
        return dispatch({
          type: actionTypes.GET_BILLING_ADDRESS,
          payload: response.data.business_accounts
        });
      })
      .catch(err => {
        // console.log("Get Billing Address Error: ", err.message || err.response);
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_GET_BILLING_ADDRESS,
          payload: {}
        });
      });
  };
};
// IS NOT IN THE AUTH TOKEN SO MIGHT NEED ANOTHER API TO FETCH ALL IDS
export const create_snapchat_ad_account = (id, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true
    });
    createBaseUrl()
      .post("snapadaccounts", { businessid: id })
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success) {
          Segment.track("Snapchat Ad Account Created Successfully");

          return dispatch({
            type: actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT,
            payload: { data: data, navigation: navigation.navigate }
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
            payload: false
          });
        }
      })
      // .then(() => {
      //   navigation.navigate("Dashboard");
      // })

      .catch(err => {
        // console.log(
        //   "create_snapchat_ad_account_ERROR",
        //   err.message || err.response
        // );
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT,
          payload: {
            loading: false
          }
        });
      });
  };
};

export const updateUserInfo = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
      payload: true
    });
    createBaseUrl()
      .put("profile", { ...info })
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success) {
          setAuthToken(data.accessToken);
          Segment.track("Profile updated Successfully");
          showMessage({
            message: data.message,
            type: "success",
            position: "top"
          });
          return dispatch({
            type: actionTypes.UPDATE_USERINFO,
            payload: { ...info }
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top"
          });
        }
        dispatch({
          type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
          payload: false
        });
      })

      .catch(err => {
        // console.log(
        //   "create_snapchat_ad_account_ERROR",
        //   err.message || err.response
        // );
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        dispatch({
          type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
          payload: false
        });
      });
  };
};
