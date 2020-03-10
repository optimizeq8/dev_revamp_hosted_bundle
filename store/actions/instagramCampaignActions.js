import axios from "axios";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import store from "../index";
import isUndefined from "lodash/isUndefined";
import { setCampaignInfoForTransaction } from "./transactionActions";
import { errorMessageHandler } from "./ErrorActions";
import * as Segment from "expo-analytics-segment";
import NavigationService from "../../NavigationService";
import segmentEventTrack from "../../components/segmentEventTrack";

InstagramBackendURL = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/instagram/"
      : "http://googliver.optimizeapp.com/" // REPLACE TO LIVE
  });

export const ad_objective_instagram = (info, navigation_route, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_OBJ,
      payload: true
    });
    InstagramBackendURL()
      .post(`saveinstacampaign`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        data.success
          ? dispatch({
              type: actionTypes.SET_AD_OBJECTIVE_INSTAGARM,
              payload: data
            })
          : dispatch({
              type: actionTypes.SET_AD_LOADING_OBJ,
              payload: false
            });
        return data;
      })
      .then(data => {
        if (data.success) {
          segmentEventTrack("Completed Checkout Step", segmentInfo);
          // console.log("data success", data);
          NavigationService.navigate(navigation_route);
        } else {
          segmentEventTrack("Error Submitting Instagram Ad Objective", {
            campaign_error: data.message
          });

          showMessage({
            message: data.message,
            position: "top",
            type: "warning"
          });
        }
      })
      .catch(err => {
        // console.log("ad_objective", err.message || err.response);
        errorMessageHandler(err);
        return dispatch({
          type: actionTypes.ERROR_SET_AD_OBJECTIVE_INSTAGRAM
        });
      });
  };
};

export const set_adType_instagram = data => {
  return dispatch => {
    return dispatch({
      type: actionTypes.SET_AD_TYPE_INSTAGRAM,
      payload: data
    });
  };
};

export const save_campaign_info_instagram = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_CAMPAIGN_INFO_INSTAGRAM,
      payload: info
    });
  };
};

export const saveCampaignStepsInstagram = step => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_CAMPAIGN_STEP_INSTAGRAM,
      payload: step
    });
  };
};

export const setCampaignInProgressInstagram = value => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CAMPAIGN_IN_PROGRESS_INSTAGRAM,
      payload: value
    });
  };
};

export const resetCampaignInfoInstagram = (resetAdType = false) => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_CAMPAING_INFO_INSTAGRAM,
      payload: resetAdType
    });
  };
};

/**
 * Overwrites campaign's data with oldTempData plus what ever is specified
 * @param {Object} value what ever values in campaign's data to overwrite
 *
 */
export const overWriteObjectiveDataInstagram = value => {
  return dispatch => {
    dispatch({
      type: actionTypes.OVERWRITE_OBJ_DATA_INSTAGRAM,
      payload: value
    });
  };
};
