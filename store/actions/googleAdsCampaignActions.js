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
    // ? "https://optimize.reemcantmath.com/"
    // : "https://optimize.reemcantmath.com/"
    // baseURL: "http://optimize.reemcantmath.com"
    // headers: {
    //   Authorization: axios.defaults.headers.common.Authorization
    // }
  });

export const create_google_ad_account = (info, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true
    });
    GoogleBackendURL()
      .post(`create/account/?businessid=${info.businessid}`)
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
        console.log("err", err);
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
          Segment.trackWithProperties("Completed Checkout Step", segmentInfo);
          navigation.push("GoogleAdDesign");
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
          segmentEventTrack("Successfully Submitted Ad Info");
          dispatch({
            type: actionTypes.SET_GOOGLE_CAMPAIGN_AD_DESIGN,
            payload: { data: data }
          });
        } else {
          //  console.log("error: ", data.error);
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

export const get_google_SE_keywords = (keyword, campaign_id, businessid) => {
  // console.log("campaign_id", campaign_id);
  // console.log("businessid", businessid);

  return (dispatch, getState) => {
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
            payload: { data: data.keywords, loading: false }
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

export const create_google_SE_campaign_ad_targetting = (info, segmentInfo) => {
  return (dispatch, getState) => {
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
            type: actionTypes.SET_GOOGLE_CAMPAIGN_AD_TARGETTING,
            payload: { data: data }
          });

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
          type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_TARGETTING,
          payload: {
            loading: false
          }
        });
      });
  };
};

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
        // return dispatch({
        //   type: actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_DETAILS,
        //   payload: false
        // });
        return dispatch({
          type: actionTypes.ERROR_SET_CAMPAIGN,
          payload: { loading: false }
        });
      });
  };
};

export const set_google_SE_budget_range = budget => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_BUDGET_RANGE,
      payload: budget
    });
  };
};

export const save_google_campaign_data = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_GOOGLE_CAMPAIGN_DATA,
      payload: info
    });
  };
};

export const save_google_campaign_steps = steps => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_GOOGLE_CAMPAIGN_STEPS,
      payload: steps
    });
  };
};

export const set_google_campaign_resumed = value => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_CAMPAIGN_RESUMED,
      payload: value
    });
  };
};

export const rest_google_campaign_data = value => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_GOOGLE_CAMPAIGN,
      payload: value
    });
  };
};

export const update_google_audience_targetting = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_GOOGLE_UPLOADING,
      payload: true
    });
    GoogleBackendURL()
      .post(`campaign/edit/`, info)
      .then(resp => resp.data)
      .then(data => {
        // console.log("data success", data);
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
        // console.log("data success", data);
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

export const create_google_keywords = (info, segmentInfo) => {
  return dispatch => {
    // dispatch({
    //   type: actionTypes.SET_GOOGLE_UPLOADING,
    //   payload: true
    // });
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

export const enable_end_or_pause_google_campaign = (
  campaign_id,
  pauseOrEnable,
  endCampaign,
  handleModalToggle
) => {
  return (dispatch, getState) => {
    console.log(
      `${endCampaign ? "end" : pauseOrEnable ? "enable" : "pause"}/`,
      {
        campaign_id: campaign_id,
        businessid: getState().account.mainBusiness.businessid
      }
    );
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
