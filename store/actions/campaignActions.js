import axios from "axios";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";

const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const resetCampaignId = () => {
  return dispatch => {
    dispatch({ type: actionTypes.RESET_CAMPAING_ID });
  };
};

export const payment_request_knet = (campaign_id, openBrowser, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true
    });
    instance
      .get(`makeknetpayment/${campaign_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.knet_payment_url) {
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data
          });
        } else {
          navigation.navigate("SuccessRedirect", data);
        }
      })
      .then(() => {
        if (getState().campaignC.payment_data) {
          openBrowser();
        }
      })
      .catch(err => {
        console.log("payment_request_knet", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_PAYMENT_REQUEST_URL,
          payload: {
            loading: false
          }
        });
      });
  };
};

export const snap_ad_audience_size = (info, totalReach) => {
  return (dispatch, getState) => {
    instance
      .post(`snapaudiencesize`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_SNAP_AUDIENCE_SIZE,
          payload: data
        });
      })
      .then(() => dispatch(get_total_reach(totalReach)))
      .catch(err => {
        console.log("snap_ad_audience_size", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_SNAP_AUDIENCE_SIZE
        });
      });
  };
};

export const get_total_reach = info => {
  return dispatch => {
    instance
      .post("snapaudiencesize", info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_SNAP_TOTAL_AUDIENCE_SIZE,
          payload: data
        });
      })
      .catch(err => {
        console.log("get_total_reach", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_SNAP_TOTAL_AUDIENCE_SIZE
        });
      });
  };
};

export const ad_objective = (info, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_OBJ,
      payload: true
    });
    instance
      .post(`savecampaign`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_OBJECTIVE,
          payload: data
        });
      })
      .then(() => {
        navigation.push("AdDesign");
      })
      .catch(err => {
        console.log("ad_objective", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_AD_OBJECTIVE
        });
      });
  };
};

export const getMinimumCash = values => {
  return dispatch =>
    dispatch({
      type: actionTypes.SET_MINIMUN_CASH,
      payload: values
    });
};

export const ad_design = (
  info,
  laoding,
  navigation,
  onToggleModal,
  appChoice,
  rejected,
  cancelUplaod,
  longVideo
) => {
  onToggleModal(true);
  return dispatch => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_DESIGN,
      payload: true
    });
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data"
    };
    instance
      .post(rejected ? `reuploadbrandmedia` : `savebrandmedia`, info, {
        onUploadProgress: ProgressEvent =>
          laoding((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        rejected &&
          showMessage({
            message: data.message,
            type: data.success ? "success" : "danger",
            position: "top"
          });
        return dispatch({
          type: actionTypes.SET_AD_DESIGN,
          payload: data
        });
      })
      .then(() => {
        onToggleModal(false);
      })
      .then(() =>
        !rejected
          ? navigation.push("AdDetails", {
              image: longVideo ? info._parts[3][1].uri : info._parts[0][1].uri,
              appChoice: appChoice
            })
          : navigation.navigate("Dashboard")
      )
      .catch(err => {
        laoding(0);
        onToggleModal(false);
        console.log("ad_design", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_AD_DESIGN
        });
      });
  };
};

export const getVideoUploadUrl = (campaign_id, openBrowser) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_VIDEO_URL_LOADING, payload: true });
    instance
      .get(`uploadMedia/${campaign_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_VIDEO_URL,
          payload: data
        });
      })
      .then(() => openBrowser())
      .catch(err => {
        console.log("getVideoUploadUrl", err.message || err.response);
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

export const get_interests = countryCode => {
  return (dispatch, getState) => {
    instance
      .get(`interestsbycountry/${countryCode}`)
      .then(res => {
        return res.data.interests;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_INTERESTS,
          payload: data
        });
      })
      .catch(err => {
        console.log("get_interests", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_INTERESTS
        });
      });
  };
};

export const get_device_brands = () => {
  return (dispatch, getState) => {
    instance
      .get(`deviceBrands`)
      .then(res => {
        return res.data.targeting_dimensions;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_DEVICE_MAKES,
          payload: data
        });
      })
      .catch(err => {
        console.log("get_device_brands", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_DEVICE_MAKES
        });
      });
  };
};

export const get_ios_versions = () => {
  return (dispatch, getState) => {
    instance
      .get(`osversion/iOS`)
      .then(res => {
        return res.data.targeting_dimensions;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_IOS_VERSIONS,
          payload: data
        });
      })
      .catch(err => {
        console.log("get_ios_versions", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_IOS_VERSIONS
        });
      });
  };
};

export const get_android_versions = () => {
  return (dispatch, getState) => {
    instance
      .get(`osversion/ANDROID`)
      .then(res => {
        return res.data.targeting_dimensions;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_ANDROID_VERSIONS,
          payload: data
        });
      })
      .catch(err => {
        console.log("get_android_versions", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_ANDROID_VERSIONS
        });
      });
  };
};

export const ad_details = (info, names, navigation, image) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_DETAIL,
      payload: true
    });
    instance
      .post(`savetargeting`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DETAILS,
          payload: data
        });
      })
      .then(() => {
        navigation.navigate("AdPaymentReview", {
          names,
          image
        });
      })
      .catch(err => {
        console.log("ad_details", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_AD_DETAILS
        });
      });
  };
};

export const updateCampaign = (info, businessid, navigation) => {
  return (dispatch, getState) => {
    instance
      .put(`savetargeting`, { ...info, businessid })
      .then(res => {
        console.log("back end info", res.data);

        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.UPDATE_CAMPAIGN_DETAILS,
          payload: data
        });
      })
      .then(() => {
        navigation.navigate("Dashboard");
      })
      .catch(err => {
        console.log("updateCampaign", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_UPDATE_CAMPAIGN_DETAILS
        });
      });
  };
};

// Does not have a reducer case (nothing is done with it yet)
export const updateStatus = (info, handleToggle) => {
  return (dispatch, getState) => {
    instance
      .put(`updateCampaignStatus`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        handleToggle(data.status);
        return dispatch({
          type: actionTypes.UPDATE_CAMPAIGN_STATUS,
          payload: data
        });
      })
      .catch(err => {
        console.log(err.message || err.response);
      });
  };
};

export const get_languages = () => {
  return (dispatch, getState) => {
    instance
      .get(`language`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_LANGUAGE_LIST,
          payload: data
        });
      })
      .catch(err => {
        console.log("get_language", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_LANGUAGE_LIST
        });
      });
  };
};
