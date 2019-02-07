import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});
export const sendMobileNo = mobileNo => {
  return dispatch => {
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
