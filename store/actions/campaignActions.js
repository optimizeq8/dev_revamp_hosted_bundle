import axios from "axios";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});
export const ad_objective = (info, navigation) => {
  return (dispatch, getState) => {
    console.log(info);
    instance
      .post(`savecampaign`, info)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        console.log(data);
        return dispatch({
          type: actionTypes.SET_AD_OBJECTIVE,
          payload: data
        });
      })
      .then(() => {
        navigation.replace("AdDesign");
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const ad_design = (info, navigation) => {
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
      .then(() => {
        navigation.replace("AdDetails");
      })
      .catch(err => {
        console.log(err.response);
        // dispatch(console.log(err.response.data));
      });
  };
};

export const ad_details = (info, navigation) => {
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
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(err => {
        dispatch(console.log(err.response.data));
      });
  };
};
