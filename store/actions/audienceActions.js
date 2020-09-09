import { showMessage } from "react-native-flash-message";
import * as actionTypes from "./actionTypes";
import createBaseUrl from "./createBaseUrl";
import NavigationService from "../../NavigationService";

/**
 *  Gets an audience list for a busineess
 */
export const getAudienceList = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.AUDIENCE_LIST_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(
        `/snapchatsavedaudience/${getState().account.mainBusiness.businessid}`
      )
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.AUDIENCE_LIST_LOADING,
          payload: true,
        });
        return dispatch({
          type: actionTypes.SET_AUDIENCE_LIST,
          payload: data.success ? data.data : [],
        });
      })
      .catch((error) => {
        console.log("getAudienceList error", error.response || error.message);
        dispatch({
          type: actionTypes.AUDIENCE_LIST_LOADING,
          payload: true,
        });
        return dispatch({
          type: actionTypes.SET_AUDIENCE_LIST,
          payload: [],
        });
      });
  };
};

/**
 * Method: GET
 * To fetch the details about an audience for a business
 * @param {*} audienceId
 */
export const getAudienceDetail = (audienceId) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.LOADING_AUDIENCE_DETAIL,
      payload: true,
    });
    createBaseUrl()
      .get(
        `snapchatsavedaudience/${
          getState().account.mainBusiness.businessid
        }/${audienceId}`
      )
      .then((res) => res.data)
      .then((data) => {
        console.log("data", data);
        // dispatch({
        //   type: actionTypes.LOADING_AUDIENCE_DETAIL,
        //   payload: false,
        // });
        if (data.success) {
          // FOR THE MISSING PIECE OF INFORMATION FROM TARGETING SET IT TO DEFAULT
          let targeting = data.data.targeting;
          console.log("targeting", targeting);
          dispatch(setAudienceDetail({ reset: true, ...data.data }));
        }
      })
      .catch((error) => {
        console.log("getAudienceDetail error", error.response || error.message);
      });
  };
};

/**
 * Creates a new audience
 * @param {*} targeting
 */
export const createAudience = (targeting) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SAVE_AUDIENCE_DETAIL_LOADING,
      payload: true,
    });
    createBaseUrl()
      .post(`snapchatsavedaudience`, {
        businessid: getState().account.mainBusiness.businessid,
        targeting,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log("data createAudience", data);
        dispatch({
          type: actionTypes.SAVE_AUDIENCE_DETAIL_LOADING,
          payload: true,
        });
        if (data.success) {
          dispatch(getAudienceDetail());
          NavigationService.navigate("SnapchatAudienceList");
        }
      })
      .catch((error) =>
        console.log("createAudience error", error.response || error.message)
      );
  };
};

/**
 * To delete an audience
 * METHOD: DELETE
 * @param {*} audienceId
 */
export const deleteAudience = (audienceId) => {
  return (dispatch) => {
    createBaseUrl()
      .delete(`/snapchatsavedaudience/${audienceId}`)
      .then((res) => res.data)
      .then((data) => {
        console.log("delete audince data", data);
        if (data.success) {
          dispatch(getAudienceList());
        }
      })
      .catch((error) => {
        console.log("deleteAudience error", error.response || error.message);
      });
  };
};

/**
 * To update an existing audience detail
 * @param {*} audienceId
 * @param {*} audienceName
 * @param {*} targeting
 */
export const updateAudience = (audienceId, audienceName, targeting) => {
  return (dispatch, getState) => {
    createBaseUrl()
      .put(`snapchatsavedaudience/${audienceId}`, {
        businessid: getState().account.mainBusiness.businessid,
        name: audienceName,
        targeting,
      })
      .then((res) => res.data)
      .then((data) => console.log(" updateAudience data", data))
      .catch((error) =>
        console.log("updateAudience error", error.response || error.message)
      );
  };
};

/**
 * To set the audience detail locally
 * @param {*} audienceInfo
 */
export const setAudienceDetail = (audienceInfo) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_AUDIENCE_DETAIL_LOCAL,
      payload: audienceInfo,
    });
  };
};
