import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import { Segment } from "expo";
import { AsyncStorage } from "react-native";

export const setAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem("token", token)
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
    return AsyncStorage.removeItem("token")
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
