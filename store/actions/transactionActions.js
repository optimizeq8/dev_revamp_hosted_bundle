import axios from "axios";
import * as actionTypes from "./actionTypes";
import NavigationService from "../../NavigationService";
import { showMessage } from "react-native-flash-message";
import store from "../index";
import Axios from "axios";

createBaseUrl = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/"
    // baseURL: "https://www.optimizeapp.com/optimize/public/"
  });
const instance = createBaseUrl();

export const getTransactions = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    createBaseUrl()
      .get(`paymentHistory`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_TRANSACTION_LIST,
          payload: data
        });
      })
      .catch(err => {
        // console.log("getTransactions Error: ", err.message || err.response); // => prints: Api is being canceled
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_TRANSACTION_LIST
        });
      });
  };
};

export const getWalletAmount = (retries = 3) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });

    createBaseUrl()
      .get(`mybusinesswallet/${getState().account.mainBusiness.businessid}`, {
        timeout: 3000
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        data.success &&
          showMessage({
            message: "Wallet retrieved",
            type: "success"
          });
        return dispatch({
          type: actionTypes.SET_WALLET_AMOUNT,
          payload: data
        });
      })
      .catch(err => {
        // console.log("getWalletAmount Error: ", err.response || err.message); // => prints: Api is being canceled
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        if (retries > 0) {
          dispatch(getWalletAmount(retries - 1));
          return;
        }
        return dispatch({
          type: actionTypes.ERROR_SET_WALLET_AMOUNT
        });
      });
  };
};

export const addWalletAmount = (info, openBrowser, retries = 3) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    createBaseUrl()
      .post(
        `purchaseBusinessWalletAmount`,
        {
          ...info,
          businessid: getState().account.mainBusiness.businessid
        },
        { timeout: 10000 }
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.ADD_WALLET_AMOUNT,
          payload: data
        });
      })
      .then(() => openBrowser())
      .catch(err => {
        // console.log("addWalletAmount Error: ", err.message || err.response);

        if (retries > 0) {
          dispatch(addWalletAmount(info, openBrowser, retries - 1));
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_ADD_WALLET_AMOUNT
        });
      });
  };
};
export const getWalletAmountInKwd = (amount, retries = 3) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    createBaseUrl()
      .get(`kdamount/${amount}`, { timeout: 10000 })
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.GET_WALLET_AMOUNT_IN_KWD,
          payload: data
        });
      })
      .catch(err => {
        // console.log(
        //   "getWalletAmountInKwd Error: ",
        //   err.message || err.response
        // );

        if (retries > 0) {
          dispatch(getWalletAmountInKwd(amount, retries - 1));
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long to retrieve wallet amount in KWD, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_GET_WALLET_AMOUNT_IN_KWD
        });
      });
  };
};
export const useWallet = (campaign_id, setWalletModal, retries = 3) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    createBaseUrl()
      .post(`useWallet`, { campaign_id }, { timeout: 10000 })
      .then(res => {
        return res.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: "info",
          position: "top"
        });
        if (!data.success) {
          return dispatch({
            type: actionTypes.SET_TRAN_LOADING,
            payload: false
          });
        } else
          return dispatch({
            type: actionTypes.USE_WALLET_AMOUNT,
            payload: data
          });
      })

      .catch(err => {
        // console.log("useWallet Error: ", err.message);

        if (retries > 0) {
          dispatch(useWallet(campaign_id, setWalletModal, retries - 1));
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        setWalletModal(false);
        return dispatch({
          type: actionTypes.ERROR_USE_WALLET_AMOUNT
        });
      });
  };
};

export const removeWalletAmount = (
  campaign_id,
  navigation,
  names,
  goBack,
  retries = 3
) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    createBaseUrl()
      .post(`removeWallet`, { campaign_id })
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.REMOVE_WALLET_AMOUNT,
          payload: data
        });
      })
      .then(() => {
        if (goBack)
          navigation.navigate("AdPaymentReview", {
            names: names
          });
      })
      .catch(err => {
        // console.log("removeWalletAmount Error: ", err.message || err.response);
        if (reties > 0) {
          removeWalletAmount(
            campaign_id,
            navigation,
            names,
            goBack,
            retries - 1
          );
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_REMOVE_WALLET_AMOUNT
        });
      });
  };
};

export const checkoutwithWallet = (campaign_id, retries = 3) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    createBaseUrl()
      .post(`checkoutwithWallet`, { campaign_id })
      .then(res => {
        return res.data;
      })
      .then(data => NavigationService.navigate("SuccessRedirect", { ...data }))

      .then(data => {
        // console.log("CHECKOUT_WITH_WALLET data", data);
        return dispatch({
          type: actionTypes.CHECKOUT_WITH_WALLET,
          payload: data
        });
      })

      .catch(err => {
        // console.log("checkoutwithWallet Error: ", err.message || err.response);
        if (retries > 0) {
          checkoutwithWallet(campaign_id, retries - 1);
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_CHECKOUT_WITH_WALLET
        });
      });
  };
};
export const filterTransactions = query => {
  return dispatch =>
    dispatch({
      type: actionTypes.FILTER_TRANSACTION,
      payload: query
    });
};
