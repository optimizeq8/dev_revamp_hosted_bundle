import axios from "axios";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import analytics from "@segment/analytics-react-native";
import store from "../index";
import isUndefined from "lodash/isUndefined";
import { setCampaignInfoForTransaction } from "./transactionActions";
import { errorMessageHandler } from "./ErrorActions";
import NavigationService from "../../NavigationService";
// import { AdjustEvent, Adjust } from "react-native-adjust";
import { getUniqueId } from "react-native-device-info";
const GoogleBackendURL = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "http://goog.optimizeapp.com/"
      : "http://googliver.optimizeapp.com/",
  });
export default GoogleBackendURL;
/**
 * @method
 * @param {Object} info this has the businessid
 * @param {Object} navigation
 * @returns {Function} returns an action to create an ad account under google
 */
export const create_google_ad_account = (info, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true,
    });
    GoogleBackendURL()
      .post(`create/account/`, { businessid: info.businessid })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`Google AD Account Created`, {
          source: "GoogletCreateAdAcc",
          campaign_channel: "google",
          form_context: { ...info },
          action_status: data.success ? "success" : "failure",
          business_id: getState().account.mainBusiness.businessid,
        });
        if (data.error) {
          showMessage({
            message: data.error,
            type: "info",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
            payload: false,
          });
        } else {
          // let adjustGoogleAdAccTracker = new AdjustEvent("qvz33a");
          // Adjust.trackEvent(adjustGoogleAdAccTracker);
          dispatch({
            type: actionTypes.CREATE_GOOGLE_AD_ACCOUNT,
            payload: { data: data },
          });
        }
        return data;
      })
      .then((data) => {
        if (!data.error)
          navigation.navigate("GoogleAdInfo", {
            source: "ad_TNC",
            source_action: "a_accept_ad_TNC",
          });
      })
      .catch((err) => {
        analytics.track(`Form Error Made`, {
          source: "GoogletCreateAdAcc",
          campaign_channel: "google",
          source_action: "a_accept_ad_TNC",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          business_id: getState().account.mainBusiness.businessid,
        });
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_CREATE_GOOGLE_AD_ACCOUNT,
          payload: {
            loading: false,
          },
        });
      });
  };
};

/**
 * @method
 * @param {String} country country code
 * @returns {Function} an action to set the values of the regions with thier reach
 */
export const get_google_SE_location_list_reach = (country) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_LOADING,
      payload: true,
    });
    //set initial state to []
    dispatch({
      type: actionTypes.SET_GOOGLE_COUNTRY_REGIONS_REACH,
      payload: {
        data: [],
        loading: true,
      },
    });
    GoogleBackendURL()
      .get(`country/reach/?country=${country}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.error) {
          showMessage({
            message: data.error,
            type: "info",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_LOADING,
            payload: false,
          });
        } else {
          return dispatch({
            type: actionTypes.SET_GOOGLE_COUNTRY_REGIONS_REACH,
            payload: { data: data, loading: false },
          });
        }
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_COUNTRY_REGIONS_REACH,
          payload: {
            loading: false,
          },
        });
      });
  };
};

/**
 * Used to create the first step in the campaign. users can't create campaigns with the same name (will return an error)
 * the language and country are submitted here becaus ethis will help later recommend keywords based on the demographics
 *
 * @method
 * @param {Object} info has the keys for creating a campaign (dates/name/locations/language/businessid)
 * @param {Object} navigation
 * @return {Function} an action to set the campaign info data from the first step along with a campaign id
 */
export const create_google_SE_campaign_info = (
  info,
  navigation,
  segmentInfo
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true,
    });
    GoogleBackendURL()
      .post("campaign/", info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Ad Info Form",
          form_context: {
            action_status: !data.error ? "success" : "failure",
            campaign_error: data.error,
            ...segmentInfo,
          },
          busines_id: getState().account.mainBusiness.businessid,
        });
        if (data.error) {
          showMessage({
            message: data.error,
            type: "info",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_UPLOADING,
            payload: false,
          });
        } else {
          dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_INFO,
            payload: { data: data },
          });
        }
        return data;
      })
      .then((data) => {
        if (!data.error) {
          dispatch(
            get_budget(
              {
                businessid: info.businessid,
                id: data.id,
              },
              { ...segmentInfo, checkout_id: data.id },
              navigation
            )
          );
        }
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_INFO,
          payload: {
            loading: false,
          },
        });
      });
  };
};

/**
 * used to create the campiagn's ad part. will recive an error key if the data was incorrect
 * while validation (special characters, wrong/url length, inavlid url)
 *
 * @method
 * @param {Object} info has keys for the headers/description/url
 * @param {Boolean} rejected this is used to handle the rejected ads default is false
 * @return {Function} returns an actions that sets the data in the reducer
 */
export const create_google_SE_campaign_ad_design = (
  info,
  rejected,
  segmentInfo
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true,
    });
    GoogleBackendURL()
      .post("create/ad/", info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Ad Design Form",
          form_context: {
            ...segmentInfo,
            action_status: !data.error ? "success" : "failure",
            campaign_resumbit: rejected,
            campaign_error: data.error,
          },
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          //do not set the reducer if it is a rejected data
          if (!rejected) {
            dispatch({
              type: actionTypes.SET_GOOGLE_CAMPAIGN_AD_DESIGN,
              payload: { data: data },
            });
          }
        } else {
          showMessage({
            message: data.error,
            type: "info",
            position: "top",
          });
        }
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
        return data;
      })
      .then((data) => {
        if (rejected && !data.error)
          NavigationService.navigate("Dashboard", {
            source: "GoogleComposeAd",
            source_action: "a_submit_ad_design",
          });
        else if (!rejected && !data.error) {
          NavigationService.navigate("GoogleAdTargeting", {
            source: "GoogleComposeAd",
            source_action: "a_submit_ad_design",
          });
        }
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_DESIGN,
          payload: {
            loading: false,
          },
        });
      });
  };
};

/**
 * this is used to generate search results for recomended keywords.
 * this comes based on the selected language and region on the first step
 *
 * @method
 * @param {String} keyword
 * @param {String} campaign_id
 * @param {String} businessid
 * @returns {Function} an action to set an array of search results for the lookedup keyword
 */
export const get_google_SE_keywords = (
  keyword,
  campaign_id,
  businessid,
  segmentInfo
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_LOADING,
      payload: true,
    });
    GoogleBackendURL()
      .get(
        `keywords/?keyword=${keyword}&id=${campaign_id}&businessid=${businessid}`
      )
      .then((res) => {
        if (isUndefined(res.data.keywords)) {
          return { keywords: [res.data] };
        } else return res.data;
      })
      .then((data) => {
        analytics.track(`Google Keywords Searched`, {
          ...segmentInfo,
          action_status: !data.error ? "success" : "error",
          keywords: keyword,
          no_of_results: data.keywords && data.keywords.length,
          error_description: !!data.error && data.error,
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          return dispatch({
            type: actionTypes.SET_GOOGLE_SE_KEYWORDS,
            payload: {
              data: data.keywords,
              loading: false,
            },
          });
        } else {
          showMessage({
            message: data.error,
            type: "info",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_LOADING,
            payload: false,
          });
        }
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_SE_KEYWORDS,
          payload: {
            loading: false,
          },
        });
      });
  };
};

/**
 *  this creates targeting info which are only age, budget and gender.
 *  there is an action that gets called to create the keywords seperatly if it gets submitted
 *
 * @method
 * @param {Object} info has keys for targeting that include (gender/age/budget/keywords)
 * @returns {Function} an action to set the targeting info and the campaign transactions info
 */
export const create_google_SE_campaign_ad_targeting = (info, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true,
    });
    GoogleBackendURL()
      .put("campaign/", info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Ad Targeting Form",
          form_context: {
            ...segmentInfo,
            action_status: data.error ? "failure" : "success",
            campaign_error: data.error,
          },
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_AD_TARGETING,
            payload: { data: data },
          });
          //sets the transaction reducer if there is chanage in the data
          dispatch(
            setCampaignInfoForTransaction({
              campaign_id: data.id,
              campaign_budget: data.budget,
              campaign_budget_kdamount: data.kdamount,
              channel: "google",
            })
          );
        } else {
          analytics.track(`Form Error Made`, {
            source: "GoogleAdTargeting",
            source_action: "a_submit_ad_targeting",
            error_description:
              data.error || "Something went wrong. Please try again",
            business_id: getState().account.mainBusiness.businessid,
          });
          showMessage({
            message: data.error,
            type: "info",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_UPLOADING,
            payload: false,
          });
        }
        return data;
      })
      .then((data) => {
        if (!data.error) dispatch(create_google_keywords(info, segmentInfo));
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_TARGETING,
          payload: {
            loading: false,
          },
        });
      });
  };
};
/**
 * this action is used for two things: retrieve the campiagn details' info and get stats info.
 * the default for stats comes as the whole campaign date range which is sent from the campiagn card
 *
 * @method
 * @param {String} id
 * @param {String} start_time
 * @param {String} end_time
 * @param {Boolean} getStats used to set the google campiagn stats seperatly from the whole campaign's data
 * @returns {Function} returns an action that either sets the campiagn stats in the reducer or the whole campaign
 */
export const get_google_campiagn_details = (
  id,
  start_time,
  end_time,
  getStats = false,
  segmentInfo
) => {
  return (dispatch, getState) => {
    if (getStats)
      dispatch({
        type: actionTypes.SET_STATS_LOADING,
        payload: true,
      });
    else
      dispatch({
        type: actionTypes.SET_CAMPAIGN_LOADING,
        payload: { loading: true, data: {} },
      });

    GoogleBackendURL()
      .get(
        `campaign/detail/?id=${id}&start_time=${start_time}&end_time=${end_time}&businessid=${
          getState().account.mainBusiness.businessid
        }`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`Button Pressed`, {
          button_type: "Open Campaign Details",
          action_status: !data.error ? "success" : "failure",
          campaign_id: id,
          campaign_type: "google",
          campaign_ad_type: "GoogleSEAd",
          error_description: !data.success && data.message,
          busines_id: getState().account.mainBusiness.businessid,
        });

        // added to handle in case of error
        if (data.error) {
          showMessage({
            message: data.error,
            type: "danger",
            position: "top",
          });
          return dispatch({
            type: actionTypes.ERROR_SET_CAMPAIGN,
            payload: { loading: false },
          });
        }
        if (getStats)
          return dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_STATS,
            payload: { loading: false, data: data },
          });
        else {
          let endDate = new Date(data.campaign.end_time);
          endDate.setDate(endDate.getDate() + 2);
          if (
            !data.campaign.completed &&
            data.campaign.status === "REMOVED" &&
            endDate < new Date()
          ) {
            dispatch(refundGoogleCampaignAmount(data.campaign.id));
          }
          return dispatch({
            type: actionTypes.SET_CAMPAIGN,
            payload: { loading: false, data: data },
          });
        }
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
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

/**
 * Used to keep track of the data during the campaign creation
 *
 * @method
 * @param {Object} info
 * @returns {Function} an action to set the data in the reducer
 */
export const save_google_campaign_data = (info) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_GOOGLE_CAMPAIGN_DATA,
      payload: info,
    });
  };
};

/**
 * Used to keep track of the last step the user made while creating a campiagn
 *
 * @method
 * @param {Array} steps array has the names of the screens that were passed starting from the dashboard
 * @returns {Function} an action to set the list in the reducer
 */
export const save_google_campaign_steps = (steps) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_GOOGLE_CAMPAIGN_STEPS,
      payload: steps,
    });
  };
};

/**
 * this is to set the status of the campign to resumed or otherwise depending if the user
 * chose to complete the campaign or start a new one
 *
 * @method
 * @param {Boolean} value
 * @returns {Function} an action to set the resume state of the campaign
 */
export const set_google_campaign_resumed = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_CAMPAIGN_RESUMED,
      payload: value,
    });
  };
};

/**
 * reset campaign data
 * @method
 * @returns {Function} an action to reset the reducer
 */
export const rest_google_campaign_data = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_GOOGLE_CAMPAIGN,
    });
  };
};

/**
 * update targeting info after the campiagn is published
 *
 * @method
 * @param {Object} info (gender/age/location/language/campiagnid)
 */
export const update_google_audience_targeting = (info, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true,
    });
    GoogleBackendURL()
      .post(`campaign/edit/`, info)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
        return data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Ad Targeting Form",
          form_context: {
            ...info,
          },
          action_status: !data.error ? "success" : "failure",
          error_description:
            data.error &&
            (data.error || "Oops! Something went wrong. Please try again"),
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          NavigationService.navigate("Dashboard", {
            source: "GoogleAdTargeting",
            source_action: "a_update_ad_targeting",
          });
        } else {
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top",
          });
        }
      })
      .catch((err) => {
        analytics.track(`Form Error Made`, {
          form_field: segmentInfo.source_action,
          source: segmentInfo.source,
          error_description: err.message || err.response,
          business_id: getState().account.mainBusiness.businessid,
        });
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
      });
  };
};

/**
 * update keywords after the campign is lunched
 *
 * @method
 * @param {Object} info
 * @param {Boolean} info.completed this was created to keep track of the rejection process
 */
export const update_google_keywords = (info, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true,
    });
    GoogleBackendURL()
      .post(`keywords/`, info)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
        return data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Keywords Update Form",
          form_context: {},
          ...segmentInfo,
          action_status: !data.error ? "success" : "failure",
          error_description:
            data.error &&
            (data.error || "Oops! Something went wrong. Please try again"),
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          NavigationService.navigate("Dashboard", {
            source: segmentInfo.source,
            source_action: segmentInfo.source_action,
          });
        } else {
          analytics.track(`Form Error Made`, {
            ...segmentInfo,
            source: segmentInfo.source,
            action_status: !data.error ? "success" : "failure",
            error_description:
              data.error &&
              (data.error || "Oops! Something went wrong. Please try again"),
            business_id: getState().account.mainBusiness.businessid,
          });
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top",
          });
        }
      })
      .catch((err) => {
        analytics.track(`Form Error Made`, {
          source: segmentInfo.source,
          action_status: !data.error ? "success" : "failure",
          error_description: err.message || err.response,
          business_id: getState().account.mainBusiness.businessid,
        });
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });

        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
      });
  };
};

/**
 * Gets called after the ad targeting information is submitted
 *
 * @method
 * @param {Object} info
 */
export const create_google_keywords = (info, segmentInfo) => {
  return (dispatch, getState) => {
    GoogleBackendURL()
      .post(`keywords/`, info)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
        return data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Ad Targeting Form",
          form_context: {
            action_status: data.error ? "failure" : "success",
            campaign_error: data.error,
            ...segmentInfo,
          },
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          NavigationService.navigate("GoogleAdPaymentReview", {
            source: "GoogeAdTargeting",
            source_action: "a_submit_ad_tageting",
          });
        } else {
          analytics.track(`Form Error Made`, {
            source_action: "a_ad_keywords",
            error_description:
              data.error || "Something went wrong. Please try again",
            business_id: getState().account.mainBusiness.businessid,
          });
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top",
          });
        }
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
      });
  };
};

/**
 * Updates the status of the campiagn from paused/enabled/ended
 *
 * @method
 * @param {String} campaign_id
 * @param {Boolean} pauseOrEnable
 * @param {Boolean} endCampaign
 * @param {Function} handleModalToggle
 *
 */
export const enable_end_or_pause_google_campaign = (
  campaign_id,
  pauseOrEnable,
  endCampaign,
  handleModalToggle
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_GOOGLE_STATUS_LOADING,
      payload: true,
    });
    GoogleBackendURL()
      .post(
        `${endCampaign ? "end" : pauseOrEnable ? "enable" : "pause"}/campaign/`,
        {
          id: campaign_id,
          businessid: getState().account.mainBusiness.businessid,
        }
      )
      .then((res) => res.data)
      .then((data) => {
        analytics.track(
          `Campaign ${
            endCampaign ? "Ended" : pauseOrEnable ? "Resumed" : "Paused"
          } `,
          {
            campaign_channel: "google",
            campaign_id: campaign_id,
            campaign_status: endCampaign
              ? "END"
              : pauseOrEnable
              ? "LIVE"
              : "PAUSE",
            action_status: !data.error ? "sucsess" : "failure",
            source: "GoogleCampaignDetails",
            source_action: "a_update_campaign_status",
            error_description: !!data.error && data.error,
            business_id: getState().account.mainBusiness.businessid,
          }
        );
        dispatch({
          type: actionTypes.UPDATE_GOOGLE_CAMPAIGN_STATUS,
          payload: data,
        });
        dispatch({
          type: actionTypes.SET_GOOGLE_STATUS_LOADING,
          payload: false,
        });
        handleModalToggle(data.status);
      })
      .catch((err) => {
        errorMessageHandler(err);
        dispatch({
          type: actionTypes.SET_GOOGLE_STATUS_LOADING,
          payload: false,
        });
      });
  };
};

export const get_budget = (info, segmentInfo, navigation) => {
  return (dispatch, getState) => {
    GoogleBackendURL()
      .post(`campaign/budget/`, info)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
        return data;
      })
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Google Ad Info Budget",
          form_context: {
            ...segmentInfo,
            action_status: !data.error ? "success" : "failure",
            campaign_error: data.error,
          },
          business_id: getState().account.mainBusiness.businessid,
        });
        if (!data.error) {
          dispatch({
            type: actionTypes.SET_BUDGET_RANGE,
            payload: data,
          });
          navigation.push("GoogleSEAPreviewScreen", {
            source: "GoogleAdInfo",
            source_action: "a_submit_ad_objective",
          });
        } else
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top",
          });
      })
      .catch((err) => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false,
        });
      });
  };
};

export const downloadGoogleCSV = (campaign_id, email, showModalMessage) => {
  return (dispatch, getState) => {
    GoogleBackendURL()
      .get(
        `export/report/?businessid=${
          getState().account.mainBusiness.businessid
        }&id=${campaign_id}&email=${email}`
      )
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`CSV Downloaded`, {
          channel: "email",
          source: "GoogleCampaignDetails",
          source_action: "a_share_csv",
          campaign_channel: "google",
          action_status: data.message ? "success" : "failure",
          campaign_error: data.error,
          campaign_id: campaign_id,
          export_email: email,
          business_id: getState().account.mainBusiness.businessid,
        });
        if (data.message) showModalMessage(data.message, "success");
      })
      .catch((err) => showModalMessage(err));
  };
};

export const refundGoogleCampaignAmount = (campaign_id) => {
  return (dispatch, getState) => {
    GoogleBackendURL()
      .post(`request/refund/`, {
        businessid: getState().account.mainBusiness.businessid,
        id: campaign_id,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.message)
          showMessage({ message: data.message, type: "success" });
      })
      .catch((err) => {
        errorMessageHandler(err);
      });
  };
};

export const getInstagramNameDescription = (insta_handle) => {
  return async (dispatch) => {
    try {
      var response = await axios.get(
        `https://www.instagram.com/${insta_handle}`
      );
      if (response) {
        var data = response.data;
        data = data.split("window._sharedData = ");
        data = data[1].split("</script>");
        data = data[0];
        data = data.substr(0, data.length - 1);
        data = JSON.parse(data);
        data = data.entry_data.ProfilePage[0].graphql.user;
        // console.log("data", JSON.stringify(data, null, 2));
        let info = {
          biography: data.biography,
          external_url: data.external_url,
          business_category_name: data.business_category_name,
          full_name: data.full_name,
        };
        // let info = {
        //   biography:
        //     "We are not standard ! ! ( U n i q u e )\n🔥  Streetwear meets Aesthetic.\n🛒  Shop now | 𝙊𝙣𝙡𝙞𝙣𝙚 𝙨𝙩𝙤𝙧𝙚\n‎📱 ORDER THROUGH WEBSITE ⇩\n🌏  WORLDWIDE SHIPPING",
        //   external_url: "http://upay.to/standardgoodskw/",
        //   business_category_name: "Food & Personal Goods",
        //   full_name: "STANDARD GOODS® | 𝐊𝐮𝐰𝐚𝐢𝐭",
        // };

        // let info = {
        //   biography:
        //     "‎أول تطبيق للدعايات الرقمية\nLaunch Your Ads in Minutes with\nOptimizeApp - iOS & Android📱\nAll Performance, No Hassle\n 👇🏻حمل التطبيق عبر الرابط:",
        //   external_url: "https://optimizeapp.com/download",
        //   business_category_name: "Business & Utility Services",
        //   full_name: "OptimizeApp تطبيق أوبتيمايز",
        // };

        return dispatch({
          type: actionTypes.SET_INSTAGRAM_DETAIL,
          payload: info,
        });
      }
    } catch (err) {
      //   console.log(
      //     "getInstagramNameDescription account",
      //     err.response || err.message
      //   );
      return dispatch({
        type: actionTypes.SET_INSTAGRAM_DETAIL,
        payload: {
          external_url: "",
          biography: "",
          business_category_name: "",
          full_name: "",
        },
      });
      //   return dispatch({
      //     type: actionTypes.SET_INSTAGRAM_DETAIL,
      //     payload: {
      //       biography:
      //         "We are not standard ! ! ( U n i q u e )\n🔥  Streetwear meets Aesthetic.\n🛒  Shop now | 𝙊𝙣𝙡𝙞𝙣𝙚 𝙨𝙩𝙤𝙧𝙚\n‎📱 ORDER THROUGH WEBSITE ⇩\n🌏  WORLDWIDE SHIPPING",
      //       external_url: "http://upay.to/standardgoodskw/",
      //       business_category_name: "Food & Personal Goods",
      //       full_name: "STANDARD GOODS® | 𝐊𝐮𝐰𝐚𝐢𝐭",
      //     },
      //   });
    }
  };
};
