import axios from "axios";
import * as actionTypes from "./actionTypes";
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

export const filterTransactions = query => {
  return dispatch =>
    dispatch({
      type: actionTypes.FILTER_TRANSACTION,
      payload: query
    });
};