import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { Segment } from "expo";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const resetMessages = () => {
  return dispatch =>
    dispatch({
      type: actionTypes.RESET_MESSAGE
    });
};

export const setAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem("token", token)
      .then(
        () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
      )
      .catch(err => alert(err));
  } else {
    return AsyncStorage.removeItem("token")
      .then(() => delete axios.defaults.headers.common.Authorization)
      .catch(err => alert(err));
  }
};
