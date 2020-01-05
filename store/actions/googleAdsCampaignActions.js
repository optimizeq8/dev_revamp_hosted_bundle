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

GoogleBackendURL = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "http://goog.optimizeapp.com/"
      : "http://googliver.optimizeapp.com/"
  });

/**
 * @method
 * @param {Object} info this has the businessid
 * @param {Object} navigation
 * @returns {Function} returns an action to create an ad account under google
 */
export const create_google_ad_account = (info, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true
    });
    GoogleBackendURL()
      .post(`create/account/`, { businessid: info.businessid })
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.error) {
          showMessage({
            message: data.error,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
            payload: false
          });
        } else {
          Segment.track("Google Ad Account Created Successfully");
          return dispatch({
            type: actionTypes.CREATE_GOOGLE_AD_ACCOUNT,
            payload: { data: data }
          });
        }
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_CREATE_GOOGLE_AD_ACCOUNT,
          payload: {
            loading: false
          }
        });
      });
  };
};

/**
 * @method
 * @param {String} country country code
 * @returns {Function} an action to set the values of the regions with thier reach
 */
export const get_google_SE_location_list_reach = country => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_LOADING,
      payload: true
    });
    //set initial state to []
    dispatch({
      type: actionTypes.SET_GOOGLE_COUNTRY_REGIONS_REACH,
      payload: {
        data: [],
        loading: true
      }
    });
    GoogleBackendURL()
      .get(`country/reach/?country=${country}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.error) {
          showMessage({
            message: data.error,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_LOADING,
            payload: false
          });
        } else {
          return dispatch({
            type: actionTypes.SET_GOOGLE_COUNTRY_REGIONS_REACH,
            payload: { data: data, loading: false }
          });
        }
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_COUNTRY_REGIONS_REACH,
          payload: {
            loading: false
          }
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
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true
    });
    GoogleBackendURL()
      .post("campaign/", info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.error) {
          showMessage({
            message: data.error,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_UPLOADING,
            payload: false
          });
        } else {
          dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_INFO,
            payload: { data: data }
          });
        }
        return data;
      })
      .then(data => {
        if (!data.error) {
          dispatch(
            get_budget(
              {
                businessid: info.businessid,
                campaign_id: info.campaign_id
              },
              segmentInfo,
              navigation
            )
          );
        }
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_INFO,
          payload: {
            loading: false
          }
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
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true
    });
    GoogleBackendURL()
      .post("create/ad/", info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (!data.error) {
          //do not set the reducer if it is a rejected data
          if (!rejected) {
            segmentEventTrack("Successfully Submitted Ad Info");
            dispatch({
              type: actionTypes.SET_GOOGLE_CAMPAIGN_AD_DESIGN,
              payload: { data: data }
            });
          } else segmentEventTrack("Successfully re-Submitted rejected ad");
        } else {
          segmentEventTrack("Error Submitting Ad Info", {
            campaign_error: data.error
          });
          showMessage({
            message: data.error,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_UPLOADING,
            payload: false
          });
        }
        return data;
      })
      .then(data => {
        if (rejected && !data.error) NavigationService.navigate("Dashboard");
        else if (!rejected && !data.error) {
          Segment.trackWithProperties("Completed Checkout Step", segmentInfo);
          NavigationService.navigate("GoogleAdTargetting");
        }
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_DESIGN,
          payload: {
            loading: false
          }
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
export const get_google_SE_keywords = (keyword, campaign_id, businessid) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_LOADING,
      payload: true
    });
    GoogleBackendURL()
      .get(
        `keywords/?keyword=${keyword}&campaign_id=${campaign_id}&businessid=${businessid}`
      )
      .then(res => {
        if (isUndefined(res.data.keywords)) {
          return { keywords: [res.data] };
        } else return res.data;
      })
      .then(data => {
        if (!data.error) {
          return dispatch({
            type: actionTypes.SET_GOOGLE_SE_KEYWORDS,
            payload: { data: [keyword, ...data.keywords], loading: false }
          });
        } else {
          showMessage({
            message: data.error,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_LOADING,
            payload: false
          });
        }
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_SE_KEYWORDS,
          payload: {
            loading: false
          }
        });
      });
  };
};

/**
 *  this creates targeting info which are only age, budget and gender.
 *  there is an action that gets called to create the keywords seperatly if it gets submitted
 *
 * @method
 * @param {Object} info has keys for targetting that include (gender/age/budget/keywords)
 * @returns {Function} an action to set the targetting info and the campaign transactions info
 */
export const create_google_SE_campaign_ad_targeting = (info, segmentInfo) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true
    });
    GoogleBackendURL()
      .put("campaign/", info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (!data.error) {
          dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_AD_TARGETING,
            payload: { data: data }
          });
          //sets the transaction reducer if there is chanage in the data
          dispatch(
            setCampaignInfoForTransaction({
              campaign_id: data.campaign_id,
              campaign_budget: data.budget,
              campaign_budget_kdamount: data.kdamount,
              channel: "google"
            })
          );
        } else {
          showMessage({
            message: data.error,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_GOOGLE_UPLOADING,
            payload: false
          });
        }
        return data;
      })
      .then(data => {
        if (!data.error) dispatch(create_google_keywords(info, segmentInfo));
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_TARGETING,
          payload: {
            loading: false
          }
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
  getStats = false
) => {
  return (dispatch, getState) => {
    if (getStats)
      dispatch({
        type: actionTypes.SET_STATS_LOADING,
        payload: true
      });
    else
      dispatch({
        type: actionTypes.SET_CAMPAIGN_LOADING,
        payload: { loading: true, data: {} }
      });

    GoogleBackendURL()
      .get(
        `campaign/detail/?campaign_id=${id}&start_time=${start_time}&end_time=${end_time}&businessid=${
          getState().account.mainBusiness.businessid
        }`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        // added to handle in case of error
        if (data.error) {
          showMessage({
            message: data.error,
            type: "danger",
            position: "top"
          });
          return dispatch({
            type: actionTypes.ERROR_SET_CAMPAIGN,
            payload: { loading: false }
          });
        }
        if (getStats)
          return dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_STATS,
            payload: { loading: false, data: data }
          });
        else
          return dispatch({
            type: actionTypes.SET_CAMPAIGN,
            payload: { loading: false, data: data }
          });
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
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

/**
 * Used to keep track of the data during the campaign creation
 *
 * @method
 * @param {Object} info
 * @returns {Function} an action to set the data in the reducer
 */
export const save_google_campaign_data = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_GOOGLE_CAMPAIGN_DATA,
      payload: info
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
export const save_google_campaign_steps = steps => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_GOOGLE_CAMPAIGN_STEPS,
      payload: steps
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
export const set_google_campaign_resumed = value => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_CAMPAIGN_RESUMED,
      payload: value
    });
  };
};

/**
 * reset campaign data
 * @method
 * @returns {Function} an action to reset the reducer
 */
export const rest_google_campaign_data = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_GOOGLE_CAMPAIGN
    });
  };
};

/**
 * update targeting info after the campiagn is published
 *
 * @method
 * @param {Object} info (gender/age/location/language/campiagnid)
 */
export const update_google_audience_targeting = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true
    });
    GoogleBackendURL()
      .post(`campaign/edit/`, info)
      .then(resp => resp.data)
      .then(data => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
        });
        return data;
      })
      .then(data => {
        if (!data.error) {
          NavigationService.navigate("Dashboard");
        } else
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top"
          });
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        console.log("data error", err);
        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
        });
      });
  };
};

/**
 * update keywords after the campign is lunched
 *
 * @method
 * @param {Object} info
 */
export const update_google_keywords = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true
    });
    GoogleBackendURL()
      .post(`keywords/`, info)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
        });
        return data;
      })
      .then(data => {
        if (!data.error) {
          NavigationService.navigate("Dashboard");
        } else
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top"
          });
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });

        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
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
  return dispatch => {
    GoogleBackendURL()
      .post(`keywords/`, info)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
        });
        return data;
      })
      .then(data => {
        if (!data.error) {
          segmentEventTrack("Completed Checkout Step", segmentInfo);
          NavigationService.navigate("GoogleAdPaymentReview");
        } else
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top"
          });
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        console.log("data error", err);

        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
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
      payload: true
    });
    GoogleBackendURL()
      .post(
        `${endCampaign ? "end" : pauseOrEnable ? "enable" : "pause"}/campaign/`,
        {
          campaign_id: campaign_id,
          businessid: getState().account.mainBusiness.businessid
        }
      )
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionTypes.UPDATE_GOOGLE_CAMPAIGN_STATUS,
          payload: data
        });
        dispatch({
          type: actionTypes.SET_GOOGLE_STATUS_LOADING,
          payload: false
        });
        handleModalToggle(data.status);
      })
      .catch(err => {
        errorMessageHandler(err);
        dispatch({
          type: actionTypes.SET_GOOGLE_STATUS_LOADING,
          payload: false
        });
      });
  };
};

export const get_budget = (info, segmentInfo, navigation) => {
  return dispatch => {
    GoogleBackendURL()
      .post(`campaign/budget/`, info)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
        });
        return data;
      })
      .then(data => {
        if (!data.error) {
          dispatch({
            type: actionTypes.SET_BUDGET_RANGE,
            payload: data
          });
          Segment.trackWithProperties("Completed Checkout Step", segmentInfo);
          navigation.push("GoogleAdDesign");
        } else
          showMessage({
            message: "Oops! Something went wrong. Please try again.",
            description: data.error,
            type: "danger",
            position: "top"
          });
      })
      .catch(err => {
        showMessage({
          message: "Oops! Something went wrong. Please try again.",
          description: err.message || err.response,
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.SET_GOOGLE_UPLOADING,
          payload: false
        });
      });
  };
};
