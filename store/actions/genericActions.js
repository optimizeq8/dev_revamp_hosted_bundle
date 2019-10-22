import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import * as Segment from "expo-analytics-segment";
import { AsyncStorage } from "react-native";
import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
createBaseUrl = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/"
  });
export const setAuthToken = token => {
  if (token) {
    return SecureStore.setItemAsync("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
      )
      .catch(err => {
        //  console.log("setAuthToken setItem token", err.message || err.response )
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response
        });
      });
  } else {
    return SecureStore.deleteItemAsync("token")
      .then(() => delete axios.defaults.headers.common.Authorization)
      .catch(err => {
        // console.log(
        //   "setAuthToken removeItem token",
        //   err.message || err.response
        // )
        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err.message || err.response
        });
      });
  }
};

export const checkForUpdate = (retries = 3) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_UPDATE_LOADING, payload: true });
    createBaseUrl()
      .get(`checkVersion/`)
      .then(res => res.data)
      .then(data =>
        dispatch({ type: actionTypes.SET_ACTUAL_VERSION, payload: data })
      )
      .catch(err => {
        if (retries > 0) {
          dispatch(checkForUpdate(retries - 1));
          return;
        }
        dispatch({ type: actionTypes.SET_UPDATE_LOADING, payload: false });

        showMessage({
          message: "Oops! Something went wrong! Please try again later.",
          type: "warning",
          position: "top",
          description: err && (err.message || err.response)
        });
      });
  };
};
