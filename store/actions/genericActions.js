import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import * as Segment from "expo-analytics-segment";
import { AsyncStorage } from "react-native";
import * as SecureStore from "expo-secure-store";

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
