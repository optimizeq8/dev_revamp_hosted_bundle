import axios from "axios";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});
export const ad_objective = info => {
  return (dispatch, getState) => {
    instance
      .post(`savecampaign`, info)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_OBJECTIVE,
          payload: data
        });
      })
      .catch(err => {
        // dispatch(console.log(err.response.data));
      });
  };
};
