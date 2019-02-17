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

export const ad_design = info => {
  return (dispatch, getState) => {
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data"
    };
    instance
      .post(`savebrandmedia`, info)
      .then(res => {
        console.log(res.data);
        console.log("SUCCESS!!");

        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DESIGN,
          payload: data
        });
      })
      .catch(err => {
        console.log(err.response);
        // dispatch(console.log(err.response.data));
      });
  };
};

export const ad_details = info => {
  var body = new FormData();
  body.append("campaign_id", "8");
  body.append("lifetime_budget_micro", "500");
  body.append("targeting", {
    demographics: [
      {
        gender: ["MALE", "FEMALE"]
      }
    ]
  });

  return (dispatch, getState) => {
    instance
      .post(`savetargeting`, info)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DETAILS,
          payload: data
        });
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};
