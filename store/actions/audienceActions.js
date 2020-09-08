import axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as actionTypes from "./actionTypes";

export const getAudienceList = () => {};

export const createAudience = () => {};

export const deleteAudience = () => {};

export const updateAudience = () => {};

export const setAudienceDetail = (audienceInfo) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_AUDIENCE_DETAIL_LOCAL,
      payload: audienceInfo,
    });
  };
};
