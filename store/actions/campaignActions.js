import axios from "axios";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import store from "../index";

createBaseUrl = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/"
    // baseURL: "https://www.optimizeapp.com/optimize/public/"
  });
const instance = createBaseUrl();

export const payment_request_credit_card = (
  campaign_id,
  openBrowser,
  navigation
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true
    });
    createBaseUrl()
      .post(`makeccpayment/${campaign_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.cc_payment_url) {
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data
          });
        } else {
          navigation.navigate("SuccessRedirect", data);
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data
          });
        }
      })
      .then(() => {
        if (getState().campaignC.payment_data.cc_payment_url) {
          openBrowser();
        }
      })
      .catch(err => {
        // console.log("payment_request_cc", err.message || err.response);
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
export const resetCampaignInfo = () => {
  return dispatch => {
    dispatch({ type: actionTypes.RESET_CAMPAING_INFO });
  };
};

export const payment_request_knet = (campaign_id, openBrowser, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true
    });
    createBaseUrl()
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
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data
          });
        }
      })
      .then(() => {
        if (getState().campaignC.payment_data.knet_payment_url) {
          openBrowser();
        }
      })
      .catch(err => {
        // console.log("payment_request_knet", err || err);
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
    createBaseUrl()
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
        // console.log("snap_ad_audience_size", err.message || err.response);
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
    createBaseUrl()
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
        // console.log("get_total_reach", err.message || err.response);
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

export const verifyBusinessUrl = weburl => {
  return dispatch => {
    createBaseUrl()
      .post(`verifyBusinessUrl`, { weburl })
      .then(res => res.data)
      .then(data => {
        console.log(data);

        // Segment.trackWithProperties("Register Business Info", {
        //   category: "Sign Up",
        //   label: "Step 4 of Registration"
        // });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });

        return dispatch({
          type: actionTypes.VERIFY_BUSINESSURL,
          payload: data
        });
      })
      .catch(err => {
        // console.log("verifyBusinessName", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_VERIFY_BUSINESSNAME,
          payload: {
            success: false
          }
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
    createBaseUrl()
      .post(`savecampaign`, info)
      .then(res => {
        // console.log("objectives", res.data);

        return res.data;
      })
      .then(data => {
        dispatch({
          type: actionTypes.SET_AD_OBJECTIVE,
          payload: data
        });
        return data;
      })
      .then(data => {
        data.success
          ? navigation.push("AdDesign")
          : showMessage({ message: data.message, position: "top" });
      })
      .catch(err => {
        // console.log("ad_objective", err.message || err.response);
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

export const save_campaign_info = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_CAMPAIGN_INFO,
      payload: info
    });
  };
};
export const ad_design = (
  info,
  loading,
  navigation,
  onToggleModal,
  appChoice,
  rejected,
  cancelUplaod,
  longVideo,
  iosUploadVideo
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
    createBaseUrl()
      .post(rejected ? `reuploadbrandmedia` : `savebrandmedia`, info, {
        onUploadProgress: ProgressEvent =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        // dispatch(
        //   save_campaign_info("adDesign", {
        //     appChoice,
        //     longVideo,
        //     iosUploadVideo
        //   })
        // );
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
        dispatch(save_campaign_info({ formatted: info }));
      })
      .then(() => {
        !rejected
          ? navigation.push("AdDetails")
          : navigation.navigate("Dashboard");
      })
      .catch(err => {
        loading(0);
        onToggleModal(false);
        // console.log("ad_design", err.message || err.response);
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
    createBaseUrl()
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
        // console.log("getVideoUploadUrl", err.message || err.response);
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
    createBaseUrl()
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
        // console.log("get_interests", err.message || err.response);
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
    createBaseUrl()
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
        // console.log("get_device_brands", err.message || err.response);
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
    createBaseUrl()
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
        // console.log("get_ios_versions", err.message || err.response);
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
    createBaseUrl()
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
        // console.log("get_android_versions", err.message || err.response);
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

export const ad_details = (info, names, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_DETAIL,
      payload: true
    });
    createBaseUrl()
      .post(`savetargeting`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DETAILS,
          payload: { data, names }
        });
      })
      .then(() => {
        navigation.navigate("AdPaymentReview");
      })
      .catch(err => {
        // console.log("ad_details", err.message || err.response);
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
    createBaseUrl()
      .put(`savetargeting`, { ...info, businessid })
      .then(res => {
        // console.log("back end info", res.data);

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
        // console.log("updateCampaign", err.message || err.response);
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
    createBaseUrl()
      .put(`updateCampaignStatus`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        handleToggle(data.status);
        if (data.message) {
          showMessage({ message: data.message, type: "info", position: "top" });
        }
        return dispatch({
          type: actionTypes.UPDATE_CAMPAIGN_STATUS,
          payload: data
        });
      })
      .catch(err => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        // console.log(err.message || err.response);
      });
  };
};

export const endCampaign = (info, handleToggle) => {
  return dispatch => {
    createBaseUrl()
      .put(`endCampaign`, info)
      .then(res => {
        return res.data;
      })
      .then(data => {
        handleToggle(data.status);
        if (data.message) {
          showMessage({ message: data.message, type: "info", position: "top" });
        }
        return dispatch({
          type: actionTypes.END_CAMPAIGN,
          payload: data.success
        });
      })
      .catch(err => {
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        // console.log(err.message || err.response);
      });
  };
};

export const get_languages = () => {
  return (dispatch, getState) => {
    createBaseUrl()
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
        // console.log("get_language", err.message || err.response);
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

export const set_adType = data => {
  return dispatch => {
    return dispatch({
      type: actionTypes.SET_AD_TYPE,
      payload: data
    });
  };
};

export const set_collectionAd_link_form = data => {
  return dispatch => {
    return dispatch({
      type: actionTypes.SET_COLLECTION_AD_LINK_FORM,
      payload: data
    });
  };
};

export const reset_collections = () => {
  return dispatch => {
    return dispatch({
      type: actionTypes.RESET_COLLECTIONS
    });
  };
};

export const save_collection_media = (
  media,
  localUri,
  loading,
  navigation,
  cancelUplaod,
  onToggleModal
) => {
  onToggleModal(true);
  return dispatch => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_COLLECTION_MEDIA,
      payload: true
    });
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data"
    };
    createBaseUrl()
      .post(`savecollectionmedia`, media, {
        onUploadProgress: ProgressEvent =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token
      })
      .then(res => {
        // console.log("data:", res.data);

        return res.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.SET_AD_COLLECTION_MEDIA,
          payload: { ...data.data, localUri }
        });
      })
      .then(() => {
        onToggleModal(false);
      })
      .then(() => {
        navigation.navigate("AdDesign");
      })
      .catch(err => {
        loading(0);
        onToggleModal(false);
        // console.log("ad_design", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.ERROR_SET_AD_COLLECTION_MEDIA
        });
      });
  };
};
