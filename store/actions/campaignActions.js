import axios from "axios";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import store, { persistor } from "../index";
import filter from "lodash/filter";

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
export const resetCampaignInfo = (resetAdType = false) => {
  return dispatch => {
    dispatch({ type: actionTypes.RESET_CAMPAING_INFO, payload: resetAdType });
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
        // Segment.trackWithProperties("Register Business Info", {
        //   category: "Sign Up",
        //   label: "Step 4 of Registration"
        // });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
          duration: 1000
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
          ? navigation.push(
              getState().campaignC.adType === "StoryAd" ? "AdCover" : "AdDesign"
            )
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
        console.log("ad_design error", err.message || err.response);
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

export const uploadStoryAdCover = (
  info,
  loading,
  navigation,
  onToggleModal,
  rejected,
  cancelUplaod,
  selectedCampaign
) => {
  onToggleModal(true);
  return dispatch => {
    dispatch({
      type: actionTypes.SET_COVER_LOADING_DESIGN,
      payload: true
    });
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data"
    };
    createBaseUrl()
      .post(`savestorypreviewmedia`, info, {
        onUploadProgress: ProgressEvent =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top"
        });
        return dispatch({
          type: actionTypes.SET_COVER_DESIGN,
          payload: data
        });
      })
      .then(() => {
        onToggleModal(false);
        dispatch(save_campaign_info({ formattedCover: info }));
      })
      .then(() => {
        navigation.push("AdDesign", {
          rejected,
          selectedCampaign,
          adType: selectedCampaign.campaign_type
        });
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
          type: actionTypes.ERROR_SET_COVER_DESIGN
        });
      });
  };
};

export const addSnapCard = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.ADD_SNAP_CARD
    });
  };
};

export const setStoryAdAttechment = info => {
  return dispatch => {
    dispatch({ type: actionTypes.STORYAD_ATTACHMENT, payload: info });
  };
};

export const uploadStoryAdCard = (
  info,
  card,
  cancelUpload,
  iosUploadVideo,
  rejected,
  finalSubmision
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_STORYADCARD_LOADING_DESIGN,
      payload: { uploading: true, index: card.index }
    });
    dispatch({
      type: actionTypes.SET_STORYADMEDIA_DESIGN_UPLOADED,
      payload: { card }
    });
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data"
    };
    createBaseUrl()
      .post(`savestorymedia`, info, {
        // onUploadProgress: ProgressEvent =>
        // loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        // cancelToken: cancelUpload.token
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        // console.log(data);
        rejected &&
          showMessage({
            message: data.message,
            type: data.success ? "success" : "danger",
            position: "top"
          });
        if (
          getState().campaignC.loadingStoryAdsArray.length > 1 &&
          getState().campaignC.loadingStoryAdsArray.reduce(
            (n, x) => n + (x === true),
            0
          ) === 1
        ) {
          finalSubmision();
        }
        return dispatch({
          type: actionTypes.SET_STORYADMEDIA_DESIGN,
          payload: { data: data.data, card }
        });
      })
      .catch(err => {
        // loading(0);
        dispatch({
          type: actionTypes.SET_STORYADCARD_LOADING_DESIGN,
          payload: { uploading: false, index: card.index }
        });
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

export const deleteStoryAdCard = (story_id, card, removeCrad) => {
  return dispatch => {
    !story_id
      ? dispatch({
          type: actionTypes.DELETE_STORY_AD_CARD,
          payload: { card }
        })
      : dispatch({
          type: actionTypes.SET_DELETE_CARD_LOADING,
          payload: { deleteing: true, index: card.index }
        });
    createBaseUrl()
      .delete(`savestorymedia/${story_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.DELETE_STORY_AD_CARD,
          payload: { data: data, card }
        });
      })

      .catch(err => {
        dispatch({
          type: actionTypes.SET_DELETE_CARD_LOADING,
          payload: { deleteing: false, index: card.index }
        });
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

export const handleStoryAdVideo = card => {
  return dispatch => {
    dispatch({ type: actionTypes.HANDLE_STORY_VIDEO, payload: card });
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

export const get_device_brands = os => {
  return (dispatch, getState) => {
    createBaseUrl()
      .get(`deviceBrands${os}`)
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

export const setRejectedStoryAds = data => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_REJECTED_STORYADS,
      payload: data
    });
  };
};

export const setRejectedCollectionAds = data => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_REJECTED_COLLECTIONADS,
      payload: data
    });
  };
};

export const setRejectedAdType = data => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_REJECTED_ADTYPE,
      payload: data
    });
  };
};
export const verifyInstagramHandle = insta_handle => {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.SET_INSTAGRAM_POST_LOADING,
        payload: false
      });
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
        if (data.is_private) {
          return dispatch({
            type: actionTypes.ERROR_GET_INSTAGRAM_POST,
            payload: {
              error: true,
              errorMessage: `${insta_handle} is a private account Try with some other account`
            }
          });
        } else {
          return dispatch({
            type: actionTypes.ERROR_GET_INSTAGRAM_POST,
            payload: {
              error: false,
              errorMessage: null
            }
          });
        }
      }
    } catch (err) {
      // console.log('insta error verify account', err.response || err.message);
      return dispatch({
        type: actionTypes.ERROR_GET_INSTAGRAM_POST,
        payload: {
          error: true,
          errorMessage: `${insta_handle} doesn't exist Try another account name`
        }
      });
    }
  };
};
export const getInstagramPostInitial = insta_handle => {
  // console.log("insta_handle", insta_handle);

  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.SET_INSTAGRAM_POST_LOADING,
        payload: true
      });
      // console.log('getInstagramPost insta_handle', insta_handle);
      var response = await axios.get(
        `https://www.instagram.com/${insta_handle}`
      );
      if (response && response.data) {
        var data = response.data;
        data = data.split("window._sharedData = ");
        data = data[1].split("</script>");
        data = data[0];
        data = data.substr(0, data.length - 1);
        data = JSON.parse(data);

        data = data.entry_data.ProfilePage[0].graphql.user;
        // console.log('data', data);
        var businessLogo = data.profile_pic_url;
        const mediaArray = [];

        const mediaList = data.edge_owner_to_timeline_media;
        // console.log("mediaList", mediaList);
        mediaArray.push(...mediaList.edges);
        let hasNextPage = mediaList.page_info.has_next_page;
        let end_cursor = mediaList.page_info.end_cursor;
        // console.log("mediaArrayLength", mediaArray.length);

        if (mediaArray && mediaArray.length > 0) {
          var imagesList = mediaArray.map(media => {
            // console.log('media', media);
            // if (!media.node.is_video)
            return {
              imageUrl: media.node.display_url,
              shortcode: media.node.shortcode,
              imageId: media.node.id,
              productDescription:
                media.node.edge_media_to_caption.edges.length > 0
                  ? media.node.edge_media_to_caption.edges[0].node.text
                  : "",
              isVideo: media.node.is_video
            };
          });

          imagesList = imagesList.filter(item => {
            return !item.isVideo;
          });

          return dispatch({
            type: actionTypes.SET_INSTAGRAM_POST,
            payload: {
              businessLogo: businessLogo,
              imagesList: imagesList,
              instaHandleId: data.id,
              instaHasNextPage: hasNextPage,
              instaEndCursor: end_cursor
            }
          });
          // console.log('imageListAfterSize', imagesList.length);
        }

        return dispatch({
          type: actionTypes.SET_INSTAGRAM_POST,
          payload: {
            businessLogo: "",
            imagesList: [],
            instaHandleId: null,
            instaHasNextPage: null,
            instaEndCursor: null
          }
        });
      }
    } catch (error) {
      // console.log("insta error", error.response || error.message);
      return dispatch({
        type: actionTypes.ERROR_GET_INSTAGRAM_POST,
        payload: {
          error: true,
          errorMessage: null
        }
      });
    }
  };
};

export const getWebProducts = campaign_id => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_WEB_PRODUCTS_LOADING,
      payload: true
    });
    createBaseUrl()
      .get(`webProducts/${campaign_id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        // showMessage({
        //     message: data.message,
        //     type: data.success ? 'success': 'warning'
        // })
        // console.log("getWebProducts", data);

        if (data.success) {
          return dispatch({
            type: actionTypes.GET_WEB_PRODUCTS,
            payload: data.productsinfo
          });
        }
        return dispatch({
          type: actionTypes.GET_WEB_PRODUCTS,
          payload: {
            id: null,
            webproducts: []
          }
        });
      })
      .catch(error => {
        // console.log("error getWebProduct", error.response || error.message);

        return dispatch({
          type: actionTypes.ERROR_GET_WEB_PRODUCTS,
          payload: {
            id: null,
            webproducts: [],
            error: true
          }
        });
      });
  };
};

export const saveWebProducts = (
  cartList,
  campaign_id,
  productInfoId,
  navigation,
  businessLogo,
  from
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SAVE_WEB_PRODUCTS_LOADING,
      payload: true
    });
    // if productInfoId doesn't exist
    if (!productInfoId) {
      createBaseUrl()
        .post("webProducts", {
          businessid: getState().account.mainBusiness.businessid,
          webproducts: cartList,
          campaign_id,
          businesslogo: businessLogo
        })
        .then(res => {
          return res.data;
        })
        .then(data => {
          // console.log('saveWebProducts data', data);
          showMessage({
            message: data.message,
            type: data.success ? "success" : "danger",
            duration: 2000
          });
          dispatch({
            type: actionTypes.SUCCESS_SAVE_WEB_PRODUCTS,
            payload: {
              id: data.id,
              webproducts: cartList
            }
          });
          return data;
        })
        .then(data => {
          if (data.success) {
            navigation.navigate("AdDesign");
          }
          return data;
        })
        .then(() => {
          return dispatch({
            type: actionTypes.SAVE_WEB_PRODUCTS_LOADING,
            payload: false
          });
        })
        .catch(error => {
          console.log("saveWebProducts error", error.response || error.message);
          return dispatch({
            type: actionTypes.ERROR_SAVE_WEB_PRODUCTS
          });
        });
    } else {
      //productExist edit list
      createBaseUrl()
        .put("webProducts", {
          businessid: getState().account.mainBusiness.businessid,
          webproducts: cartList,
          campaign_id,
          id: productInfoId,
          businesslogo: businessLogo
        })
        .then(res => {
          return res.data;
        })
        .then(data => {
          // console.log('updateWebProducts data', data);
          showMessage({
            message: data.message,
            type: data.success ? "success" : "danger",
            duration: 2000
          });
          dispatch({
            type: actionTypes.SUCCESS_SAVE_WEB_PRODUCTS,
            payload: {
              id: data.id,
              webproducts: cartList
            }
          });
          return data;
        })
        .then(data => {
          if (data.success && from) {
            navigation.navigate("AdDesign");
          }
        })
        .then(() => {
          return dispatch({
            type: actionTypes.SAVE_WEB_PRODUCTS_LOADING,
            payload: false
          });
        })
        .catch(error => {
          // console.log(
          //   "updateWebProducts error",
          //   error.response || error.message
          // );
          return dispatch({
            type: actionTypes.ERROR_SAVE_WEB_PRODUCTS
          });
        });
    }
  };
};

export const getMediaUploadUrl = (campaign_id, brand_name, headline) => {
  return dispatch => {
    createBaseUrl()
      .post(`/webuploadlink`, {
        campaign_id,
        brand_name,
        headline
      })
      .then(res => {
        // console.log("webuploadlink", res.data);
        return res.data;
      })
      .then(data => {
        // console.log("webuploadlink", data);
        if (data.success) {
          return dispatch({
            type: actionTypes.GET_UPLOAD_MEDIA_DIFFERENT_DEVICE_URL_ACCESS_CODE,
            payload: {
              weblink: data.weblink,
              accessCode: data.accessCode
            }
          });
        }
        showMessage({
          message: data.message,
          type: "danger"
        });
        return dispatch({
          type:
            actionTypes.ERROR_GET_UPLOAD_MEDIA_DIFFERENT_DEVICE_URL_ACCESS_CODE,
          payload: {
            weblink: "",
            accessCode: "",
            error: data.message
          }
        });
      })
      .catch(error => {
        // console.log("getMediaUploadUrl error", error.response || error.message);
        return dispatch({
          type:
            actionTypes.ERROR_GET_UPLOAD_MEDIA_DIFFERENT_DEVICE_URL_ACCESS_CODE,
          payload: {
            weblink: "",
            accessCode: "",
            error: error.response || error.message
          }
        });
      });
  };
};

export const getWebUploadLinkMedia = campaign_id => {
  return dispatch => {
    dispatch({
      type: actionTypes.GET_WEB_UPLOAD_LINK_MEDIA_LOADING,
      payload: true
    });
    createBaseUrl()
      .get(`/webuploadlinkmedia/${campaign_id}`)
      .then(res => res.data)
      .then(data => {
        // console.log("data", data);
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning"
        });
        dispatch({
          type: actionTypes.GET_WEB_UPLOAD_LINK_MEDIA_LOADING,
          payload: false
        });
        if (data.success) {
          return dispatch({
            type: actionTypes.GET_WEB_UPLOAD_LINK_MEDIA,
            payload: {
              mediaWebLink: data.media,
              mediaTypeWebLink: data.media_type
            }
          });
        }
      })
      .catch(error => {
        // console.log("getWebUploadLinkMedia", error.response || error.message);
        return dispatch({
          type: actionTypes.ERROR_GET_WEB_UPLOAD_LINK_MEDIA
        });
      });
  };
};

export const saveCampaignSteps = step => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_CAMPAIGN_STEP,
      payload: step
    });
  };
};

export const setCampaignInProgress = value => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CAMPAIGN_IN_PROGRESS,
      payload: value
    });
  };
};

export const loadMoreInstagramPost = (instaHandleId, instaEndCursor) => {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.LOADING_MORE_INSTAGRAM_POST,
        payload: true
      });
      const responseMedia = await axios.get(
        `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${instaHandleId}","first":12,"after":"${instaEndCursor}"}`
      );
      // console.log("responseMediA", responseMedia.data);

      let mediaArray = [
        ...responseMedia.data.data.user.edge_owner_to_timeline_media.edges
      ];

      let hasNextPage =
        responseMedia.data.data.user.edge_owner_to_timeline_media.page_info
          .has_next_page;
      let end_cursor =
        responseMedia.data.data.user.edge_owner_to_timeline_media.page_info
          .end_cursor;

      if (mediaArray && mediaArray.length > 0) {
        var imagesList = mediaArray.map(media => {
          return {
            imageUrl: media.node.display_url,
            shortcode: media.node.shortcode,
            imageId: media.node.id,
            productDescription:
              media.node.edge_media_to_caption.edges.length > 0
                ? media.node.edge_media_to_caption.edges[0].node.text
                : "",
            isVideo: media.node.is_video
          };
        });

        imagesList = imagesList.filter(item => {
          return !item.isVideo;
        });
        return dispatch({
          type: actionTypes.GET_MORE_INSTAGRAM_POST,
          payload: {
            imagesList: imagesList,
            instaHasNextPage: hasNextPage,
            instaEndCursor: end_cursor
          }
        });
      }
    } catch (error) {
      console.log("ERROR LOADING MORE", error.message || error.response);

      return dispatch({
        type: actionTypes.ERROR_GET_MORE_INSTAGRAM_POST,
        payload: {
          imagesList: [],
          instaHasNextPage: null,
          instaEndCursor: null
        }
      });
    }
    // console.log('imageListAfterSize', imagesList.length);
  };
};
