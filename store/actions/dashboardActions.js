import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import * as Segment from "expo-analytics-segment";
import { showMessage } from "react-native-flash-message";
import store from "../index";
import createBaseUrl from "./createBaseUrl";
import { get_languages } from "./campaignActions";

export const filterCampaigns = query => {
  return {
    type: actionTypes.FILTER_CAMPAIGNS,
    payload: query
  };
};

export const getCampaignDetails = (id, navigation) => {
  return dispatch => {
    dispatch(get_languages());
    dispatch({
      type: actionTypes.SET_CAMPAIGN_LOADING,
      payload: { loading: true, data: {} }
    });
    navigation.push("CampaignDetails");

    createBaseUrl()
      .get(`campaigndetail/${id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (
          typeof data === "string" &&
          data.toLowerCase() === "connection-failure"
        ) {
          throw TypeError("Connection-Failure, Please try again later");
        }
        dispatch({
          type: actionTypes.SET_CAMPAIGN,
          payload: { loading: false, data: data.data }
        });
        return data.data;
      })
      .then(data => {
        let endDate = new Date(data.end_time);
        endDate.setDate(endDate.getDate() + 2);
        if (
          data.snap_ad_id &&
          data.campaign_end === "0" &&
          endDate < new Date()
        ) {
          dispatch(checkRemainingBudget(data.campaign_id));
        }
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

export const getCampaignStats = (campaign, duration) => {
  let timeDiff = Math.round(
    Math.abs(
      (new Date(duration.start_time).getTime() -
        new Date(duration.end_time).getTime()) /
        86400000
    )
  );

  let addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return `${result.getFullYear()}-${("0" + (result.getMonth() + 1)).slice(
      -2
    )}-${result.getDate()}`;
  };

  return dispatch => {
    dispatch({
      type: actionTypes.SET_STATS_LOADING,
      payload: true
    });
    createBaseUrl()
      .post(`getcampaignStatsNew`, {
        //testing
        // campaign_id: "0fe08957-c083-4344-8c62-6825cdaa711a",
        // start_time: "2019-05-09",
        // end_time: "2019-05-25",

        // campaign_id: "e5f5477b-583f-4519-9757-cab7f4155a5f",
        // //duration.start_time,
        // start_time: "2019-05-18",
        // //duration.end_time,
        // end_time: addDays("2019-05-25", 1),

        //Actual api
        campaign_id: campaign.snap_campaign_id,
        start_time: duration.start_time.split("T")[0],
        end_time: addDays(duration.end_time, 1),
        hour: 0
        //timeDiff + 1 <= 5 ? 1 : 0
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_CAMPAIGN_STATS,
          payload: { loading: false, data: data }
        });
      })
      .catch(err => {
        // console.log("getCampaignStats error", err.message || err.response);
        dispatch({
          type: actionTypes.SET_CAMPAIGN_STATS,
          payload: { loading: false, data: {}, err }
        });
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
      payload: {
        isListEnd: false,
        fetching_from_server: false,
        loadingCampaigns: true
      }
    });
    createBaseUrl()
      .get(`campaignlist/${id}/${1}`, {
        cancelToken
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        increasePage(true);
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
                err.message ||
                err.response ||
                "Something went wrong, please try again.",
              type: "danger",
              position: "top"
            });
        }
        return dispatch({
          type: actionTypes.ERROR_SET_CAMPAIGN_LIST,
          payload: {
            isListEnd: false,
            fetching_from_server: false,
            loadingCampaigns: false
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
    createBaseUrl()
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

export const checkRemainingBudget = campaign_id => {
  return dispatch => {
    createBaseUrl()
      .post(`checkRemainingSpend`, { campaign_id })
      .then(res => {
        return res.data;
      })
      .then(
        data =>
          data.success &&
          data.transfer &&
          showMessage({
            message: data.message,
            type: "success",
            position: "top"
          })
      )
      .catch(err => console.log(err.response));
  };
};

export const setRejectedCampaignData = rejCampaign => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_REJECTED_CAMPAIGN, payload: rejCampaign });
  };
};

export const downloadCSV = (campaign_id, email, showModalMessage) => {
  console.log(campaign_id, email);

  return dispatch => {
    createBaseUrl()
      .post(`exportData`, { campaign_id, email })
      .then(res => res.data)
      .then(data => {
        showModalMessage(data.message, data.success ? "success" : "warning");
      })
      .catch(err => showModalMessage(err));
  };
};
