import axios from "axios";
import * as actionTypes from "./actionTypes";
import analytics from "@segment/analytics-react-native";
import { showMessage } from "react-native-flash-message";
import store from "../index";
import createBaseUrl from "./createBaseUrl";
import InstagramBaseUrl from "./instagramCampaignActions";
import { get_languages } from "./campaignActions";
import snapchatObjectives from "../../components/Data/snapchatObjectives.data";
import instagramObjectives from "../../components/Data/instagramObjectives.data";

export const filterCampaigns = (query) => {
  return {
    type: actionTypes.FILTER_CAMPAIGNS,
    payload: query,
  };
};

export const getCampaignDetails = (id, navigation) => {
  return (dispatch, getState) => {
    dispatch(get_languages());
    dispatch({
      type: actionTypes.SET_CAMPAIGN_LOADING,
      payload: { loading: true, data: {} },
    });

    navigation.navigate("CampaignDetails", {
      source: "Dashboard",
      source_action: "a_open_campaign",
    });

    createBaseUrl()
      .get(`campaigndetail/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (
          typeof data === "string" &&
          data.toLowerCase() === "connection-failure"
        ) {
          throw TypeError("Connection-Failure, Please try again later");
        }

        analytics.track(`Button Pressed`, {
          button_type: "Open Campaign Details",
          action_status: data.success ? "success" : "failure",
          campaign_id: id,
          campaign_type: "snapchat",
          campaign_ad_type: data.data && data.data.campaign_type,
          error_description: !data.success && data.message,
          busines_id: getState().account.mainBusiness.businessid,
        });
        dispatch({
          type: actionTypes.SET_CAMPAIGN,
          payload: { loading: false, data: data.data },
        });
        dispatch({
          type: actionTypes.END_CAMPAIGN,
          payload: data.data.campaign_end === "1",
        });

        return data.data;
      })
      // .then((data) => {
      //   let endDate = new Date(data.end_time);
      //   endDate.setDate(endDate.getDate() + 2);
      //   if (
      //     data.snap_ad_id &&
      //     data.campaign_end === "0" &&
      //     endDate < new Date()
      //   ) {
      //     dispatch(checkRemainingBudget(data.campaign_id));
      //   }
      // })
      .catch((err) => {
        analytics.track(`Form Error Made`, {
          source: "Dashboard",
          source_action: "a_open_campaign_details",
          campaign_id: id,
          campaign_type: "snapchat",
          campaign_ad_type: null,
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          business_id: getState().account.mainBusiness.businessid,
        });
        // console.log("getCampaignDetails error", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_CAMPAIGN,
          payload: { loading: false },
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
    )}-${("0" + result.getDate()).slice(-2)}`;
  };

  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_STATS_LOADING,
      payload: true,
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
        hour: 0,
        //timeDiff + 1 <= 5 ? 1 : 0
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_CAMPAIGN_STATS,
          payload: { loading: false, data: data },
        });
      })
      .catch((err) => {
        // console.log("getCampaignStats error", err.message || err.response);
        dispatch({
          type: actionTypes.SET_CAMPAIGN_STATS,
          payload: { loading: false, data: {}, err },
        });
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
      });
  };
};

export const getCampaignList = (id, increasePage, cancelToken) => {
  return (dispatch) => {
    dispatch(getNumberOfCampaigns());
    dispatch({
      type: actionTypes.GOT_ALL_CAMPAIGNS,
      payload: {
        isListEnd: false,
        fetching_from_server: false,
        loadingCampaigns: true,
      },
    });
    createBaseUrl()
      .get(`campaignlist/${id}/${1}`, {
        cancelToken,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        increasePage(true);
        return dispatch({
          type: actionTypes.SET_CAMPAIGN_LIST,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("getCampaignListError: ", err.message || err.response); // => prints: Api is being canceled????
        {
          !err.message.includes("Api") &&
            showMessage({
              message:
                err.message ||
                err.response ||
                "Something went wrong, please try again.",
              type: "danger",
              position: "top",
            });
        }
        return dispatch({
          type: actionTypes.ERROR_SET_CAMPAIGN_LIST,
          payload: {
            isListEnd: false,
            fetching_from_server: false,
            loadingCampaigns: false,
          },
        });
      });
  };
};

export const updateCampaignList = (id, page, increasePage) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GOT_ALL_CAMPAIGNS,
      payload: { isListEnd: false, fetching_from_server: true },
    });
    createBaseUrl()
      .get(`campaignlist/${id}/${page}`)
      .then((res) => {
        return res.data;
      })
      .then((JSONobj) => {
        if (JSONobj.data.length > 0) {
          increasePage();
          return dispatch({
            type: actionTypes.UPDATE_CAMPAIGN_LIST,
            payload: { data: JSONobj.data, fetching_from_server: false },
          });
        } else {
          return dispatch({
            type: actionTypes.GOT_ALL_CAMPAIGNS,
            payload: { isListEnd: true, fetching_from_server: false },
          });
        }
      })
      .catch((err) => {
        // console.log("updateCampaignList", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_UPDATE_CAMPAIGN_LIST,
          payload: {
            isListEnd: false,
            fetching_from_server: false,
          },
        });
      });
  };
};

export const checkRemainingBudget = (campaign_id) => {
  return (dispatch) => {
    createBaseUrl()
      .post(`checkRemainingSpend`, { campaign_id })
      .then((res) => {
        return res.data;
      })
      .then(
        (data) =>
          data.success &&
          data.transfer &&
          showMessage({
            message: data.message,
            type: "success",
            position: "top",
          })
      )
      .catch((err) => {
        // console.log(err.response)
      });
  };
};

export const setRejectedCampaignData = (rejCampaign) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_REJECTED_CAMPAIGN, payload: rejCampaign });
  };
};

export const resetRejectedCampaignData = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_REJECTED_CAMPAIGN });
  };
};
export const downloadCSV = (campaign_id, email, showModalMessage) => {
  return (dispatch, getState) => {
    createBaseUrl()
      .post(`exportData`, { campaign_id, email })
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`CSV Downloaded`, {
          channel: "email",
          source: "CampaignDetails",
          source_action: "a_share_csv",
          campaign_channel: "snapchat",
          action_status: data.success ? "success" : "failure",
          campaign_id: campaign_id,
          export_email: email,
          business_id: getState().account.mainBusiness.businessid,
        });
        showModalMessage(data.message, data.success ? "success" : "warning");
      })
      .catch((err) => showModalMessage(err));
  };
};

export const getNumberOfCampaigns = () => {
  return (dispatch, getState) => {
    createBaseUrl()
      .get(`businesscampaigns/${getState().account.mainBusiness.businessid}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.success)
          dispatch({
            type: actionTypes.GET_NUMBER_OF_CAMPAIGNS,
            payload: data.business_campaigns,
          });
      })
      .catch((err) => {
        //   showModalMessage(err)
      });
  };
};

export const getSnapchatObjectiveList = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SNAPCHAT_OBJECTIVE_LIST_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(`snap/objectives/${getState().account.mainBusiness.businessid}/list`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SNAPCHAT_OBJECTIVE_LIST_LOADING,
          payload: false,
        });
        return dispatch({
          type: actionTypes.SET_SNAPCHAT_OBJECTIVE_LIST,
          payload:
            data.data && Object.keys(data.data).length > 0
              ? data.data
              : snapchatObjectives,
        });
      })
      .catch((err) => {
        // console.log(
        //   "err getSnapchatObjectiveList",
        //   err.response || err.message
        // );
        dispatch({
          type: actionTypes.SNAPCHAT_OBJECTIVE_LIST_LOADING,
          payload: false,
        });
        return dispatch({
          type: actionTypes.SET_SNAPCHAT_OBJECTIVE_LIST,
          payload: snapchatObjectives,
        });
      });
  };
};

export const getInstagramObjectiveList = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.INSTAGRAM_OBJECTIVE_LIST_LOADING,
      payload: true,
    });
    InstagramBaseUrl()
      .get(`getObjectives/${getState().account.mainBusiness.businessid}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.INSTAGRAM_OBJECTIVE_LIST_LOADING,
          payload: false,
        });
        // console.log("data.data", data.data);
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_OBJECTIVE_LIST,
          payload:
            data.data && Object.keys(data.data).length > 0
              ? data.data
              : instagramObjectives,
        });
      })
      .catch((err) => {
        // console.log(
        //   "err getInstagramObjectiveList",
        //   err.response || err.message
        // );
        dispatch({
          type: actionTypes.INSTAGRAM_OBJECTIVE_LIST_LOADING,
          payload: false,
        });
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_OBJECTIVE_LIST,
          payload: instagramObjectives,
        });
      });
  };
};
