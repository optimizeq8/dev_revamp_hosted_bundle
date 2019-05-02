import axios from "axios";
import * as actionTypes from "./actionTypes";
import NavigationService from "../../NavigationService";
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
        // console.log(err.response);
        if (axios.isCancel(err)) {
          console.log("Error: ", err.message); // => prints: Api is being canceled
        }
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
        console.log("wallettttt", res.data);

        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_WALLET_AMOUNT,
          payload: data
        });
      })
      .catch(err => {
        // console.log(err.response);
        if (axios.isCancel(err)) {
          console.log("Error: ", err.message); // => prints: Api is being canceled
        }
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
        console.log(res.data);

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
        console.log("Error: ", err);
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
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.USE_WALLET_AMOUNT,
          payload: data
        });
      })

      .catch(err => {
        console.log("Error: ", err);
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
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.REMOVE_WALLET_AMOUNT,
          payload: data
        });
      })

      .catch(err => {
        console.log("Error: ", err);
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
        console.log("checkoutwithWallet ", res.data);
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
        console.log("Error: ", err);
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
