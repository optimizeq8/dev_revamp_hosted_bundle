import axios from "axios";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import store from "../index";
import analytics from "@segment/analytics-react-native";
import isUndefined from "lodash/isUndefined";
import { setCampaignInfoForTransaction } from "./transactionActions";
import { errorMessageHandler } from "./ErrorActions";
import * as Segment from "expo-analytics-segment";
import NavigationService from "../../NavigationService";
import segmentEventTrack from "../../components/segmentEventTrack";
import createBaseUrl from "./createBaseUrl";

InstagramBackendURL = () =>
  axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/instagram/"
      : "http://optimizeapp.com/optimize/instagram/",
  });

/**
 *
 * @param {*} info {businessid, campaign_id, name (ad name), state_time, end_time, objective}
 * @param {*} navigation_route Route to direct on success oneOf[InstagramFeedAdDesign ,InstagramStoryAdDesign ]
 * @param {*} segmentInfo Object for showing on analytics tool [campaign data]
 */
export const ad_objective_instagram = (info, navigation_route, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_INSTAGRAM_AD_LOADING_OBJ,
      payload: true,
    });
    InstagramBackendURL()
      .post(`saveinstacampaign`, info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_submit_ad_objective`, {
          source: "ad_objective",
          campaign_channel: "instagram",
          action_status: data.success ? "success" : "failure",
          source_action: "a_submit_ad_objective",
          ...segmentInfo,
        });
        data.success
          ? dispatch({
              type: actionTypes.SET_AD_OBJECTIVE_INSTAGARM,
              payload: data,
            })
          : dispatch({
              type: actionTypes.SET_INSTAGRAM_AD_LOADING_OBJ,
              payload: false,
            });
        return data;
      })
      .then((data) => {
        if (data.success) {
          NavigationService.navigate(navigation_route, {
            source: "ad_objective",
            source_action: "a_submit_ad_objective",
          });
        } else {
          showMessage({
            message: data.message,
            position: "top",
            type: "warning",
          });
        }
      })
      .catch((err) => {
        // console.log("ad_objective", err.message || err.response);
        errorMessageHandler(err);
        return dispatch({
          type: actionTypes.ERROR_SET_AD_OBJECTIVE_INSTAGRAM,
        });
      });
  };
};

/**
 *
 * @param {*} data One of [IntagramFeedAd , InstagramStoryAd]
 */
export const set_adType_instagram = (data) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_AD_TYPE_INSTAGRAM,
      payload: data,
    });
  };
};

/**
 *
 * @param {*} info To locally store the data
 */
export const save_campaign_info_instagram = (info) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_CAMPAIGN_INFO_INSTAGRAM,
      payload: info,
    });
  };
};

/**
 *
 * @param {*} step save campaigns steps instagram
 * // need to rethink as there will will be 2 separte routes now
 */
export const saveCampaignStepsInstagram = (step) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_CAMPAIGN_STEP_INSTAGRAM,
      payload: step,
    });
  };
};

export const setCampaignInProgressInstagram = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CAMPAIGN_IN_PROGRESS_INSTAGRAM,
      payload: value,
    });
  };
};

export const resetCampaignInfoInstagram = (resetAdType = false) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_CAMPAING_INFO_INSTAGRAM,
      payload: resetAdType,
    });
  };
};

/**
 * Overwrites campaign's data with oldTempData plus what ever is specified
 * @param {Object} value what ever values in campaign's data to overwrite
 *
 */
export const overWriteObjectiveDataInstagram = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.OVERWRITE_OBJ_DATA_INSTAGRAM,
      payload: value,
    });
  };
};
/**
 *
 * @param {string} path Oneof [InstagramFeedAdDesign, InstagramFeedAdDesign] to redirect to next  roye and to set data in reducer
 * @param {object} info INFO includes following
 * @param {*} campaign_id campaign_id
 * @param {*} message caption
 * @param {*} media
 * @param {*} media_type OneOf[IMAGE , VIDEO]
 * @param {*} media_option  OneOf [single, carousel]
 * @param {*} ios_upload  Passed as 0 so doesn't cause any issue on back end for uploading through differnet device
 * @param {*} destination [For Objective = "BRAND_AWARENESS" destionation is set as link]
 * @param {*} link Website link for destinations having link
 * @param {*} attachment App store links  , Incase of website link set as "BLANK"
 * @param {*} call_to_action Call to action for the destination
 * @param {*} carousel_data Array having carousel_ids in case of media_option is carousel
 */
export const saveBrandMediaInstagram = (
  path = "InstagramFeedAdDesign",
  info,
  loading,
  onToggleModal,
  cancelUplaod,
  segmentInfo
) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_DESIGN_INSTAGRAM,
      payload: true,
    });

    InstagramBackendURL()
      .post(`saveinstabrandmedia`, info, {
        onUploadProgress: (ProgressEvent) =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        dispatch({
          type: actionTypes.SET_AD_LOADING_DESIGN_INSTAGRAM,
          payload: false,
        });
        analytics.track(`a_submit_ad_design`, {
          source: "ad_design",
          source_action: "a_submit_ad_design",
          action_status: data.success ? "success" : "failure",
          ...segmentInfo,
        });
        if (data.success) {
          onToggleModal(false);
          dispatch(save_campaign_info_instagram({ info }));
          // console.log("data", data.data);
          NavigationService.navigate("InstagramFeedAdTargetting", {
            source: "ad_design",
            source_action: "a_submit_ad_design",
          });
          return dispatch({
            type: actionTypes.SET_AD_DESIGN_INSTAGRAM,
            payload: data,
          });
        }
      })
      .catch((error) => {
        loading(0);
        onToggleModal(false);
        dispatch({
          type: actionTypes.SET_AD_LOADING_DESIGN_INSTAGRAM,
          payload: false,
        });
        // console.log("error saveBrandMedia ", error.response || error.message);
      });
  };
};

/**
 *  To get interest list
 */
export const get_interests_instagram = () => {
  return (dispatch) => {
    InstagramBackendURL()
      .get(`categorizedinterests`)
      .then((res) => res.data)
      .then((data) => {
        if (data && data.interests) {
          return dispatch({
            type: actionTypes.SET_INSTAGRAM_INTERESTS,
            payload: data.interests,
          });
        }
      })
      .catch((error) => {
        // console.log("error get_interests_instagram", error);
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_INTERESTS,
          payload: [],
        });
      });
  };
};

/**
 * To get OS versions list
 * @param {*} osType  One of [Android, iOS]
 */
export const getOSVersion = (osType) => {
  return (dispatch) => {
    InstagramBackendURL()
      .get(`osversion/${osType}`)
      .then((res) => res.data)
      .then((data) => {
        if (data && data.osversion) {
          let osVersionArray = data.osversion.description.split(";");

          if (osType === "Android") {
            return dispatch({
              type: actionTypes.SET_INSTAGRAM_OS_VERSIONS,
              payload: {
                isoVersions: [],
                androidVersions: osVersionArray,
              },
            });
          }
          if (osType === "iOS") {
            return dispatch({
              type: actionTypes.SET_INSTAGRAM_OS_VERSIONS,
              payload: {
                isoVersions: osVersionArray,
                androidVersions: [],
              },
            });
          }
        }
      })
      .catch((error) => {
        // console.log("getOSVersion error", error.response || error.message);
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_OS_VERSIONS,
          payload: {
            isoVersions: [],
            androidVersions: [],
          },
        });
      });
  };
};

/**
 * To get device brands name
 * @param {*} osType One of [Android, iOS]
 */
export const getDeviceBrand = (osType) => {
  return (dispatch) => {
    InstagramBackendURL()
      .get(`deviceBrands/${osType}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.device_make) {
          const deviceBrands = data.device_make.map((device) => {
            return {
              name: device.name,
            };
          });
          return dispatch({
            type: actionTypes.SET_INSTAGRAM_DEVICE_BRANDS,
            payload: deviceBrands,
          });
        }
      })
      .catch((error) => {
        // console.log("getDeviceBrand error", error.response || error.message);
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_DEVICE_BRANDS,
          payload: [],
        });
      });
  };
};

/**
 * To get audience size
 * @param {*} info // All tragetting aspects that have been selected like gender, user_os,versions min/max, interests, device brands
 * @param {*} totalReach // For country total rach
 */
export const instagram_ad_audience_size = (info, totalReach) => {
  return (dispatch) => {
    InstagramBackendURL()
      .post(`audiencesize`, info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_AUDIENCE_SIZE,
          payload: data,
        });
      })
      .then(() => dispatch(get_total_reach_instagram(totalReach)))
      .catch((err) => {
        // console.log("instagram_ad_audience_size", err.message || err.response);
        errorMessageHandler(err);
        return dispatch({
          type: actionTypes.ERROR_SET_INSTAGRAM_AUDIENCE_SIZE,
        });
      });
  };
};

/**
 * To get total reach based on country
 * @param {*} info
 */
export const get_total_reach_instagram = (info) => {
  return (dispatch) => {
    InstagramBackendURL()
      .post("audiencesize", info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_INSTAGRAM_TOTAL_AUDIENCE_SIZE,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("get_total_reach_instagram ", err.message || err.response);
        errorMessageHandler(err);
        return dispatch({
          type: actionTypes.ERROR_SET_INSTAGRAM_TOTAL_AUDIENCE_SIZE,
        });
      });
  };
};

/**
 * To save ad details targeting
 * @param {*} info
 * @param {*} navigation
 * @param {*} segmentInfo
 */
export const ad_details_instagram = (info, navigation, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING_DETAIL_INSTAGRAM,
      payload: true,
    });
    InstagramBackendURL()
      .post(`saveinstatargeting`, info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_submit_ad_targeting`, {
          source: "ad_targeting",
          source_action: "a_submit_ad_targeting",
          action_status: data.success ? "success" : "failure",
          campaign_budget: data.data.lifetime_budget_micro,
          ...segmentInfo,
        });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top",
        });
        dispatch(
          setCampaignInfoForTransaction({
            campaign_id: getState().instagramAds.campaign_id,
            campaign_budget: data.data.lifetime_budget_micro,
            campaign_budget_kdamount: data.kdamount,
            channel: "instagram",
          })
        );
        return dispatch({
          type: actionTypes.SET_AD_DETAILS_INSTAGRAM,
          payload: { data },
        });
      })
      .then(() => {
        // Segment.trackWithProperties("Completed Checkout Step", segmentInfo);
        // Ad the route here for
        navigation.navigate("InstagramAdPaymentReview", {
          source: "ad_targeting",
          source_action: "a_submit_ad_targeting",
        });
      })
      .catch((err) => {
        // console.log("ad_details_instagram error", err.message || err.response);
        errorMessageHandler(err);
        return dispatch({
          type: actionTypes.ERROR_SET_AD_DETAILS_INSTAGRAM,
        });
      });
  };
};

export const getInstagramCampaignDetails = (id, navigation) => {
  return (dispatch) => {
    // dispatch(get_languages());
    dispatch({
      type: actionTypes.SET_CAMPAIGN_LOADING,
      payload: { loading: true, data: {} },
    });

    navigation.navigate("InstagramCampaignDetails", {
      source: "dashboard",
      source_action: "a_open_campaign",
    });

    createBaseUrl()
      .get(`campaigndetail/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        data = {
          campaign_id: "6493",
          name: "WEEE",
          brand_name: "SamyOptimize",
          campaign_type: "SnapAd",
          snap_ad_id: null,
          snap_campaign_id: null,
          snap_adsquads_id: null,
          headline: "WEEE",
          objective: "BRAND_AWARENESS",
          lifetime_budget_micro_after_deduction: "67.5",
          lifetime_budget_micro: 75,
          agency_fee: "7.5",
          status: "LIVE",
          start_time: "2020-06-14T00:00:00",
          end_time: "2020-06-15T23:59:59",
          media:
            "https://optimizekwtestingserver.com/optimize/snap-media/4E6AFCFE-FB11-4838-9942-96062E7BA22A.jpg",
          media_type: "IMAGE",
          targeting: {
            demographics: [
              {
                gender: "FEMALE",
                languages: ["ar", "en"],
                min_age: 13,
                max_age: 45,
              },
            ],
            interests: [
              {
                category_id: [
                  "SLC_1",
                  "SLC_10",
                  "SLC_100",
                  "SLC_101",
                  "SLC_102",
                  "SLC_103",
                  "SLC_104",
                  "SLC_105",
                  "SLC_109",
                  "SLC_11",
                  "SLC_121",
                  "SLC_122",
                  "SLC_123",
                  "SLC_126",
                  "SLC_124",
                  "SLC_13",
                  "SLC_14",
                  "SLC_15",
                  "SLC_150",
                  "SLC_162",
                  "SLC_17",
                  "SLC_176",
                  "SLC_180",
                  "SLC_181",
                  "SLC_183",
                  "SLC_184",
                  "SLC_19",
                  "SLC_2",
                  "SLC_20",
                  "SLC_21",
                  "SLC_22",
                  "SLC_23",
                  "SLC_24",
                  "SLC_29",
                  "SLC_3",
                  "SLC_30",
                  "SLC_31",
                  "SLC_34",
                  "SLC_35",
                  "SLC_37",
                  "SLC_38",
                  "SLC_39",
                  "SLC_4",
                  "SLC_40",
                  "SLC_42",
                  "SLC_46",
                  "SLC_44",
                  "SLC_48",
                  "SLC_5",
                  "SLC_51",
                  "SLC_53",
                  "SLC_54",
                  "SLC_55",
                  "SLC_56",
                  "SLC_57",
                  "SLC_58",
                  "SLC_6",
                  "SLC_60",
                  "SLC_59",
                  "SLC_63",
                  "SLC_64",
                  "SLC_65",
                  "SLC_68",
                  "SLC_69",
                  "SLC_7",
                  "SLC_71",
                  "SLC_73",
                  "SLC_76",
                  "SLC_77",
                  "SLC_78",
                  "SLC_79",
                  "SLC_8",
                  "SLC_80",
                  "SLC_83",
                  "SLC_87",
                  "SLC_88",
                  "SLC_9",
                  "SLC_90",
                  "SLC_91",
                  "SLC_96",
                ],
              },
            ],
            devices: [
              {
                marketing_name: [
                  "Apple/iPhone 11 Pro Max/",
                  "Apple/iPhone 11 Pro/",
                  "Apple/iPhone 11/",
                  "Apple/iPhone 4s/",
                  "Apple/iPhone 5/",
                  "Apple/iPhone 5c/",
                  "Apple/iPhone 5s/",
                  "Apple/iPhone 6 Plus/",
                  "Apple/iPhone 6/",
                  "Apple/iPhone 6s Plus/",
                  "Apple/iPhone 6s/",
                  "Apple/iPhone 7 Plus/",
                  "Apple/iPhone 7/",
                  "Apple/iPhone 8 Plus/",
                  "Apple/iPhone SE/",
                  "Apple/iPhone 8/",
                  "Apple/iPhone X/",
                  "Apple/iPhone XR/",
                  "Apple/iPhone XS Max/",
                  "Apple/iPhone XS/",
                ],
                os_type: "iOS",
              },
            ],
            geos: [
              {
                country_code: "ae",
                region_id: [
                  "25151",
                  "25152",
                  "25153",
                  "25154",
                  "25156",
                  "25157",
                ],
              },
            ],
            enable_targeting_expansion: "true",
          },
          completed: "1",
          campaign_end: "0",
          call_to_action: "BLANK",
          source: null,
          attachment: "BLANK",
          destination: "SNAP_AD",
          review_status: "PENDING",
          review_status_reason: [],
          impressions: 0,
          spends: 0,
          swipes: 0,
          video_views: 0,
          reach: 0,
          paid_frequency: 0,
          cpm: 0,
        };
        if (
          typeof data === "string" &&
          data.toLowerCase() === "connection-failure"
        ) {
          throw TypeError("Connection-Failure, Please try again later");
        }

        // analytics.track(`a_open_campaign_details`, {
        //   source: "dashboard",
        //   source_action: "a_open_campaign_details",
        //   action_status: data.sucess ? "success" : "failure",
        //   campaign_id: id,
        //   campaign_type: "snapchat",
        //   campaign_ad_type: data.data && data.data.campaign_type,
        //   error_description: !data.sucess && data.message,
        // });
        dispatch({
          type: actionTypes.SET_CAMPAIGN,
          payload: { loading: false, data: data },
        });
        dispatch({
          type: actionTypes.END_CAMPAIGN,
          payload: data.campaign_end === "1",
        });

        return data;
      })
      .then((data) => {
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
      .catch((err) => {
        // analytics.track(`a_error`, {
        //   error_page: "dashboard",
        //   source_action: "a_open_campaign_details",
        //   action_status: "failure",
        //   campaign_id: id,
        //   campaign_type: "snapchat",
        //   campaign_ad_type: null,
        //   error_description:
        //     err.message ||
        //     err.response ||
        //     "Something went wrong, please try again.",
        // });
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
