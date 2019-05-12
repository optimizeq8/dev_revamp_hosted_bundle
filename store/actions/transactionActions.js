import axios from "axios";
import * as actionTypes from "./actionTypes";
import NavigationService from "../../NavigationService";
import { showMessage } from "react-native-flash-message";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const getTransactions = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    instance
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
        console.log("getTransactions Error: ", err.response); // => prints: Api is being canceled
        showMessage({
            message: "Something went wrong, please try again.",
            type: "danger",
            position: "top"
        });
        return dispatch({
            type: actionTypes.ERROR_SET_TRANSACTION_LIST
        })
    
    });
  };
};

export const getWalletAmount = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    instance
      .get(`mywallet`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_WALLET_AMOUNT,
          payload: data
        });
      })
      .catch(err => {
            console.log("getWalletAmount Error: ", err.response || err.message); // => prints: Api is being canceled
            showMessage({
                message: "Something went wrong, please try again.",
                type: "danger",
                position: "top"
            });
            return dispatch({
                type: actionTypes.ERROR_SET_WALLET_AMOUNT
            });    
      });
  };
};

export const addWalletAmount = (info, openBrowser) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    instance
      .post(`purchaseWalletAmount`, info)
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
        console.log("addWalletAmount Error: ", err);

        showMessage({
            message: "Something went wrong, please try again.",
            type: "danger",
            position: "top"
        });
        return dispatch({
            type: actionTypes.ERROR_ADD_WALLET_AMOUNT
        });

      });
  };
};

export const useWallet = campaign_id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    instance
      .post(`useWallet`, { campaign_id })
      .then(res => {
        return res.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: "info",
          position: "top"
        });
        return dispatch({
          type: actionTypes.USE_WALLET_AMOUNT,
          payload: data
        });
      })

      .catch(err => {
        console.log("useWallet Error: ", err.message);
        showMessage({
            message: "Something went wrong, please try again.",
            type: "danger",
            position: "top"
        });
        return dispatch({
            type: actionTypes.ERROR_USE_WALLET_AMOUNT
        });

      });
  };
};

export const removeWalletAmount = campaign_id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    instance
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

      .catch(err => {
        console.log("removeWalletAmount Error: ", err.message);
        showMessage({
            message: "Something went wrong, please try again.",
            type: "danger",
            position: "top"
        });
        return dispatch({
            type: actionTypes.ERROR_REMOVE_WALLET_AMOUNT
        });

      });
  };
};

export const checkoutwithWallet = campaign_id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true
    });
    instance
      .post(`checkoutwithWallet`, { campaign_id })
      .then(res => {
        return res.data;
      })
      .then(data => NavigationService.navigate("SuccessRedirect", { ...data }))

      .then(data => {
        return dispatch({
          type: actionTypes.CHECKOUT_WITH_WALLET,
          payload: data
        });
      })

      .catch(err => {
        console.log("checkoutwithWallet Error: ", err.message);
        showMessage({
            message: "Something went wrong, please try again.",
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
