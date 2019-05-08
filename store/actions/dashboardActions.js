import axios from "axios";
import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import { Segment } from "expo";

export const getCampaignDetails = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CAMPAIGN,
      payload: { loading: true, data: {}, message: "" }
    });
    instance
      .get(`campaigndetail/${id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log("campaign details", data);
        return dispatch({
          type: actionTypes.SET_CAMPAIGN,
          payload: data
        });
      })
      .catch(err => {
        console.log(err.response);
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
        console.log("Error: ", err); // => prints: Api is being canceled
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
        console.log(err.response);
      });
  };
};
