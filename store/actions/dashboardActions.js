import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import { Segment } from "expo";
import { showMessage } from "react-native-flash-message";

const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
  // baseURL: "https://www.optimizeapp.com/optimize/public/"
});

export const filterCampaigns = query => {
  return {
    type: actionTypes.FILTER_CAMPAIGNS,
    payload: query
  };
};

export const getCampaignDetails = (id, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CAMPAIGN,
      payload: { loading: true, data: {} }
    });
    navigation.push("CampaignDetails");

    instance
      .get(`campaigndetail/${id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_CAMPAIGN,
          payload: { loading: false, data: data.data }
        });
      })
      .catch(err => {
        // console.log("getCampaignDetails error", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_CAMPAIGN,
          payload: { loading: false }
        });
      });
  };
};

export const getCampaignStats = (campaign, navigation) => {
  console.log({
    campaign_id: campaign.snap_campaign_id,
    start_time: "2019-05-29",
    end_time: "2019-05-30"
  });

  return dispatch => {
    dispatch({
      type: actionTypes.SET_STATS_LOADING,
      payload: true
    });
    instance
      .post(`getcampaignStats`, {
        campaign_id: campaign.snap_campaign_id,
        start_time: "2019-05-29",
        end_time: "2019-06-02"
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(data);

        return dispatch({
          type: actionTypes.SET_CAMPAIGN_STATS,
          payload: { loading: false, data: data }
        });
      })
      .catch(err => {
        console.log("getCampaignDetails error", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
      });
  };
};

export const getCampaignList = (id, increasePage, cancelToken) => {
  return dispatch => {
    dispatch({
      type: actionTypes.GOT_ALL_CAMPAIGNS,
      payload: { isListEnd: false, fetching_from_server: false, loading: true }
    });
    instance
      .get(`campaignlist/${id}/${1}`, {
        cancelToken
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        increasePage();
        return dispatch({
          type: actionTypes.SET_CAMPAIGN_LIST,
          payload: data
        });
      })
      .catch(err => {
        // console.log("getCampaignListError: ", err.message || err.response); // => prints: Api is being canceled????
        {
          !err.message.includes("Api") &&
            showMessage({
              message:
                err.response || "Something went wrong, please try again.",
              type: "danger",
              position: "top"
            });
        }
        return dispatch({
          type: actionTypes.ERROR_SET_CAMPAIGN_LIST,
          payload: {
            isListEnd: false,
            fetching_from_server: false,
            loading: false
          }
        });
      });
  };
};

export const updateCampaignList = (id, page, increasePage) => {
  return dispatch => {
    dispatch({
      type: actionTypes.GOT_ALL_CAMPAIGNS,
      payload: { isListEnd: false, fetching_from_server: true }
    });
    instance
      .get(`campaignlist/${id}/${page}`)
      .then(res => {
        return res.data;
      })
      .then(JSONobj => {
        if (JSONobj.data.length > 0) {
          increasePage();
          return dispatch({
            type: actionTypes.UPDATE_CAMPAIGN_LIST,
            payload: { data: JSONobj.data, fetching_from_server: false }
          });
        } else {
          return dispatch({
            type: actionTypes.GOT_ALL_CAMPAIGNS,
            payload: { isListEnd: true, fetching_from_server: false }
          });
        }
      })
      .catch(err => {
        // console.log("updateCampaignList", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_UPDATE_CAMPAIGN_LIST,
          payload: {
            isListEnd: false,
            fetching_from_server: false
          }
        });
      });
  };
};
