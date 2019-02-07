import axios from "axios";
import jwt_decode from "jwt-decode";

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
