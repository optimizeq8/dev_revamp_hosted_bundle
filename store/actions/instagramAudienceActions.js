import analytics from "@segment/analytics-react-native";
import * as actionTypes from "./actionTypes";
import InstagramBackendURL from "./instagramCampaignActions";
import NavigationService from "../../NavigationService";

/**
 *  Gets an audience list for a busineess
 */
export const getInstagramAudienceList = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.AUDIENCE_INSTAGRAM_LIST_LOADING,
      payload: true,
    });
    InstagramBackendURL()
      .get(
        `/instagramsavedaudience/${getState().account.mainBusiness.businessid}`
      )
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.AUDIENCE_INSTAGRAM_LIST_LOADING,
          payload: false,
        });
        // console.log("getInstagramAudienceList data", data);
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_AUDIENCE_LIST,
          payload: data.success ? data.data : [],
        });
      })
      .catch((error) => {
        // console.log(
        //   "getInstagramAudienceList error",
        //   error.response || error.message
        // );
        dispatch({
          type: actionTypes.AUDIENCE_INSTAGRAM_LIST_LOADING,
          payload: false,
        });
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_AUDIENCE_LIST,
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
export const getInstagramAudienceDetail = (audienceId) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.LOADING_INSTAGRAM_AUDIENCE_DETAIL,
      payload: true,
    });
    InstagramBackendURL()
      .get(
        `instagramsavedaudience/${
          getState().account.mainBusiness.businessid
        }/${audienceId}`
      )
      .then((res) => res.data)
      .then((data) => {
        if (data.success) {
          return dispatch({
            type: actionTypes.SET_INSTAGRAM_AUDIENCE_DETAIL,
            payload: data.data,
          });
        }
      })
      .catch((error) => {
        // console.log("getAudienceDetail error", error.response || error.message);
      });
  };
};

/**
 *
 * @param {*} audience Object of id, name and targeting
 */
export const createInstagramAudience = (
  audience,
  navigate = null,
  locationsInfo = [],
  custom_interest = [],
  custom_location = []
) => {
  // console.log(
  //   "createAudience targeting ",
  //   JSON.stringify(audience.targeting, null, 2)
  // );
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING,
      payload: true,
    });
    InstagramBackendURL()
      .post(`instagramsavedaudience`, {
        businessid: getState().account.mainBusiness.businessid,
        name: audience.name,
        targeting: audience.targeting,
        coordinates: locationsInfo,
        custom_interest,
        custom_location,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING,
          payload: false,
        });
        analytics.track("a_create_audience", {
          source: "audience_detail",
          source_action: "a_create_audience",
          action_status: data.success ? "success" : "failure",
          action_description: data.message,
          audience_name: audience.name,
          audience_targeting: audience.targeting,
        });
        if (data.success) {
          dispatch(getInstagramAudienceList());
          navigate &&
            NavigationService.navigate(navigate, {
              source: "audience_detail",
              source_action: "a_create_audience",
            });
        }
      })
      .catch((error) => {
        // console.log("createAudience error", error.response || error.message);
        dispatch({
          type: actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING,
          payload: false,
        });
      });
  };
};

/**
 * To delete an audience
 * METHOD: DELETE
 * @param {*} audienceId
 */
export const deleteInstagramAudience = (audienceId) => {
  return (dispatch) => {
    InstagramBackendURL()
      .delete(`/instagramsavedaudience/${audienceId}`)
      .then((res) => res.data)
      .then((data) => {
        analytics.track("a_delete_audience", {
          source: "audience_list",
          source_action: "a_delete_audience",
          action_status: data.success ? "success" : "failure",
          action_description: data.message,
          audience_id: audienceId,
        });
        if (data.success) {
          dispatch(getInstagramAudienceList());
        }
      })
      .catch((error) => {
        // console.log("deleteAudience error", error.response || error.message);
      });
  };
};

/**
 * To update an existing audience detail
 * @param {*} audienceId
 * @param {*} audienceName
 * @param {*} targeting
 */
export const updateInstagramAudience = (
  audienceId,
  audienceName,
  targeting,
  locationsInfo = [],
  custom_interest = [],
  custom_location = [],
  navigationPath = "InstagramFeedAdTargetting"
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING,
      payload: true,
    });
    InstagramBackendURL()
      .put(`instagramsavedaudience/${audienceId}`, {
        businessid: getState().account.mainBusiness.businessid,
        name: audienceName,
        targeting: JSON.stringify(targeting),
        coordinates: locationsInfo,
        custom_interest,
        custom_location,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING,
          payload: false,
        });
        analytics.track("a_update_audience", {
          source: "audience_detail",
          source_action: "a_update_audience",
          action_status: data.success ? "success" : "failure",
          action_description: data.message,
          audience_id: audienceId,
          audience_name: audienceName,
          audience_targeting: targeting,
        });
        if (data.success) {
          dispatch(getInstagramAudienceList());
          NavigationService.navigate(navigationPath, {
            source: "audience_detail",
            source_action: "a_update_audience",
          });
        }
      })
      .catch((error) => {
        // console.log("updateAudience error", error.response || error.message);
        dispatch({
          type: actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING,
          payload: false,
        });
      });
  };
};

/**
 * To set the audience detail locally
 * @param {*} audienceInfo
 */
export const setInstagramAudienceDetail = (audienceInfo) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_INSTAGRAM_AUDIENCE_DETAIL_LOCAL,
      payload: audienceInfo,
    });
  };
};

/**
 * To set the customLocations obj from audience in the reducer
 * @param {*} customLocations
 */
export const setInstagramAudienceCustomLocations = (customLocations) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_INSTAGRAM_CUSTOM_LOCATION_FROM_AUDIENCE,
      payload: customLocations,
    });
  };
};