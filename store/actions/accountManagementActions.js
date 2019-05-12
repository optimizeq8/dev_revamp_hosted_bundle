import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { Segment } from "expo";

const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

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
  return dispatch => {
    dispatch({
        type: actionTypes.SET_LOADING_BUSINESS_LIST
    })
    instance
      .get(`businessaccounts`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        // showMessage({
        //   message: data.message,
        //   type: response.data.success ? "success" : "warning"
        // })
        return dispatch({
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
          payload: data
        });
      })

      .catch(err => {
        console.log("getBusinessAccountsError", err.message || err.response );
        showMessage({
            message: err.message || err.response || "Something went wrong, please try again.",
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
    instance
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

        dispatch({
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
          payload: { business: data.data }
        });

        return dispatch({
          type: actionTypes.ADD_BUSINESS_ACCOUNT,
          payload: { data: data.data, success: true}
        });
      })
      .then(navigation.navigate("Dashboard"))

      .catch(err => {
        console.log('error creating new bsn',err.message || err.response );
        showMessage({
            message: err.message || err.response || "Something went wrong, please try again.",
            type: "danger",
            position: "top"
         });
        dispatch({
            type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
            payload: {
                loading: false
            }
        })
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
        showMessage({
          message: response.data.message,
          type: response.data.success ? "success" : "warning",
          position: "top"
        });
        if (response.data.success) navigation.goBack();
        return dispatch({
          type: actionTypes.CHANGE_PASSWORD,
          payload: response.data
        });
      })
      .catch(err => {
          console.log("changePasswordError", err.message || err.response );

          showMessage({
              message: err.message || err.response ||"Oops! Something went wrong. Please try again.",
              type: "danger",
              position: "position"
          })

          return dispatch({
              type: actionTypes.ERROR_CHANGE_PASSWORD,
              payload: {
                  success: false
              }
          })
        });
  };
};

export const addressForm = (address, navigation, addressId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.SET_BILLING_ADDRESS_LOADING,
        payload: true
      });
      const response = await instance.put("businessaddress", {
        businessid: getState().account.mainBusiness.businessid,
        id: addressId,
        ...address
      });

      if (response.data && response.data.message === "Address ID missing") {
        const respData = await instance.post("businessaddress", {
          businessid: getState().account.mainBusiness.businessid,
          ...address
        });

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
      } else {
        showMessage({
          message: response.data.message,
          type: response.data.success ? "success" : "warning",
          position: "top"
        });
        if (response.data.success) navigation.goBack();
        return dispatch({
          type: actionTypes.ADD_ADDRESS,
          payload: response.data
        });
      }
    } catch (error) {
        console.log("Error while put/post address form", error.message);
        showMessage({
                message: "Something went wrong, please try again.",
                type: "danger",
                position: "top"
        });
        return dispatch({
            type: actionTypes.ERROR_ADD_ADDRESS,
            payload: {
                success: false
            }
        });
    }
  };
};

export const getAddressForm = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_BILLING_ADDRESS_LOADING,
      payload: true
    });
    instance
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
          console.log("Get Billing Address Error: ", err.message || err.response );
          showMessage({
            message: err.message || err.response || "Something went wrong, please try again.",
            type: "danger",
            position: "top"
          });
         return dispatch({
             type: actionTypes.ERROR_GET_BILLING_ADDRESS,
             payload: {}
         })
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
    instance
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
          console.log("create_snapchat_ad_account_ERROR", err.message || err.response );
          showMessage({
            message: err.message || err.response || "Something went wrong, please try again.",
            type: "danger",
            position: "top"
          });
          return dispatch({
              type: actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT,
              payload: {
                  loading: false
              }

          })
        });
  };
};
