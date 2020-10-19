import { cloneDeep } from "lodash";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  data: null,
  campaign_id: "",
  average_reach: 0,
  kdamount: 0,
  minValueBudget: 0,
  maxValueBudget: 0,
  total_reach: 0,
  interests: null,
  deviceBrands: null,
  isoVersions: null,
  androidVersions: null,
  loadingObj: false,
  loadingDesign: false,
  loadingDetail: false,
  loading: false,
  payment_data: null,
  languagesList: [],
  videoUrl: "",
  videoUrlLoading: "",
  media: "",
  countryName: "",
  interestNames: [],
  regionNames: [],
  campaignEnded: false,
  adType: "InstagramFeedAd",
  incompleteCampaign: false,
  campaignProgressStarted: false,
  currentCampaignSteps: [],
  oldTempAdType: "",
  oldTempData: null,
  carouselAdsArray: [
    {
      id: 0,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 1,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 2,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 3,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 4,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 5,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 6,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 7,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 8,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
    {
      id: 9,
      media: "//",
      destination: "BLANK",
      attachment: "BLANK",
    },
  ],
  loadingCarouselAdsArray: [],

  instagramExistingPost: [],
  paging: {},

  customInterests: [],
  postsLoading: false,
  instaRejCampaign: {},
  movingAmountToWallet: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AD_OBJECTIVE_INSTAGARM:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        loadingObj: false,
        incompleteCampaign: true,
        //saves this part just in case anything is changed in AdObjective and not submitting
        oldTempData: { ...state.data, ...action.payload.data },
        oldTempAdType: state.adType,
      };

    case actionTypes.SET_AD_TYPE_INSTAGRAM:
      return {
        ...state,
        adType: action.payload,
      };
    case actionTypes.SET_MINIMUN_CASH_INSTAGRAM:
      return {
        ...state,
        minValueBudget: action.payload.minValueBudget,
        maxValueBudget: action.payload.maxValueBudget,
      };
    case actionTypes.ERROR_SET_AD_OBJECTIVE_INSTAGRAM:
      return {
        ...state,
        loadingObj: false,
      };
    case actionTypes.SET_AD_OBJECTIVE_INSTAGARM_FEED:
      return {
        ...state,
        loadingObj: action.payload,
      };
    case actionTypes.SET_INSTAGRAM_AD_LOADING_OBJ:
      return {
        ...state,
        loadingObj: action.payload,
      };
    case actionTypes.SET_AD_DESIGN_INSTAGRAM:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
          call_to_action: {
            value: action.payload.data.call_to_action,
            label: action.payload.data.call_to_action.replace(/_/g, " "),
          },
          attachment:
            action.payload.data.attachment !== "BLANK"
              ? JSON.parse(action.payload.data.attachment)
              : action.payload.data.attachment,
          //added checking if data is not null becuase it was throwing an error for
          //re-uploading for rejected ads
          media: state.data && state.data.media,
        },
        message: action.payload.message,

        loadingDesign: false,
      };
    case actionTypes.SAVE_CAMPAIGN_INFO_INSTAGRAM:
      let resetSwipeUps = {};
      let savedData = { ...state.data };
      let savedInstaRejCampaign = { ...state.instaRejCampaign };
      if (action.payload.reset) {
        resetSwipeUps = {
          attachment: "BLANK",
          call_to_action: {
            label: "BLANK",
            value: "BLANK",
          },
          destination: "BLANK",
          link: "",
          existingPost: action.payload.existingPost
            ? action.payload.existingPost
            : 0,
          reset: false,
        };
      }
      if (!action.payload.rejected) {
        savedData = {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps,
        };
      } else {
        savedInstaRejCampaign = {
          ...state.instaRejCampaign,
          ...action.payload,
          ...resetSwipeUps,
        };
      }

      return {
        ...state,
        data: savedData,
        instaRejCampaign: savedInstaRejCampaign,
        currentCampaignSteps: action.payload.reset
          ? state.currentCampaignSteps.length > 0
            ? //If objective is changed then AdDesign should be the current step again to set the swipe ups
              state.currentCampaignSteps.filter(
                (step) =>
                  step !== "InstagramFeedAdDetails" &&
                  step !== "InstagramFeedAdPaymentReview"
              )
            : []
          : state.currentCampaignSteps,
        oldTempData: {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps,
        },
      };

    case actionTypes.RESET_CAMPAING_INFO_INSTAGRAM:
      let resetAdType = action.payload;
      let adType = "InstagramFeedAd";
      let data = null;
      let campaign_id = "";
      let countryName = "";
      let interestNames = [];
      let regionNames = [];
      let minValueBudget = 0;
      let maxValueBudget = 0;
      let incompleteCampaign = false;
      let currentCampaignSteps = [];
      if (resetAdType) {
        currentCampaignSteps = state.currentCampaignSteps;
        incompleteCampaign = state.incompleteCampaign;
        adType = state.adType;
        campaign_id = state.campaign_id;
        data = state.data ? state.data : {};
        minValueBudget = state.minValueBudget;
        maxValueBudget = state.maxValueBudget;
        countryName = state.countryName;
        interestNames = state.interestNames;
        regionNames = state.regionNames;
        if (data) {
          delete data.media;
          delete data.media_type;
          delete data.media_upload;
          delete data.ios_upload;
          delete data.formatted;
          delete data.objective;
          delete data.objectiveLabel;
        }
        //overwrite any old campaign data with the reseted campaign data if user submits a rejected ad
        if (state.oldTempData) {
          data = { ...data, ...state.oldTempData };
        }
      }

      return {
        ...state,
        campaign_id: campaign_id,
        data: data,
        average_reach: 0,
        total_reach: 0,
        media: "",
        minValueBudget: minValueBudget,
        adType: adType,
        maxValueBudget: maxValueBudget,
        countryName: countryName,
        interestNames: interestNames,
        regionNames: regionNames,
        incompleteCampaign: incompleteCampaign,
        currentCampaignSteps: currentCampaignSteps,
        carouselAdsArray: [
          {
            id: 0,
            media: "//",
          },
          {
            id: 1,
            media: "//",
          },
          {
            id: 2,
            media: "//",
          },
          {
            id: 3,
            media: "//",
          },
          {
            id: 4,
            media: "//",
          },
          {
            id: 5,

            media: "//",
          },
          {
            id: 6,

            media: "//",
          },
          {
            id: 7,

            media: "//",
          },
          {
            id: 8,

            media: "//",
          },
          {
            id: 9,

            media: "//",
          },
        ],
        loadingCarouselAdsArray: [],
      };
    case actionTypes.SET_AD_LOADING_DESIGN_INSTAGRAM:
      return {
        ...state,
        loadingDesign: action.payload,
      };
    case actionTypes.SET_INSTAGRAM_INTERESTS:
      return {
        ...state,
        interests: action.payload,
      };
    case actionTypes.SET_CUSTOM_INSTAGRAM_INTERESTS:
      return {
        ...state,
        customInterests: action.payload,
      };
    case actionTypes.SET_INSTAGRAM_OS_VERSIONS:
      return {
        ...state,
        isoVersions: action.payload.isoVersions,
        androidVersions: action.payload.androidVersions,
      };
    case actionTypes.SET_INSTAGRAM_DEVICE_BRANDS:
      return {
        ...state,
        deviceBrands: action.payload,
      };
    case actionTypes.SET_INSTAGRAM_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: action.payload.average_reach,
      };
    case actionTypes.ERROR_SET_INSTAGRAM_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: 0,
      };

    case actionTypes.SET_INSTAGRAM_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: (state.average_reach / action.payload.average_reach) * 100,
      };
    case actionTypes.ERROR_SET_INSTAGRAM_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: 0,
      };
    case actionTypes.SET_AD_LOADING_DETAIL_INSTAGRAM:
      return {
        ...state,
        loadingDetail: action.payload,
      };
    case actionTypes.SET_AD_DETAILS_INSTAGRAM:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data.data },
        message: action.payload.data.message,
        kdamount: action.payload.data.kdamount,
        loadingDetail: false,
      };
    case actionTypes.ERROR_SET_AD_DETAILS_INSTAGRAM:
      return {
        ...state,
        loadingDetail: false,
      };
    case actionTypes.SAVE_CAMPAIGN_STEP_INSTAGRAM:
      return {
        ...state,
        currentCampaignSteps: action.payload,
      };
    case actionTypes.SET_CAMPAIGN_IN_PROGRESS_INSTAGRAM:
      return {
        ...state,
        campaignProgressStarted: action.payload,
      };
    case actionTypes.SET_CAROUSELADMEDIA_DESIGN:
      let carouselAds = state.carouselAdsArray;
      carouselAds[action.payload.data.carousel_order] = {
        ...carouselAds[action.payload.data.carousel_order],
        ...action.payload.data,
        ...action.payload.card,
        uploaded: true,
      };
      let loadingAr = state.loadingCarouselAdsArray;
      loadingAr[action.payload.data.carousel_order] = false;

      return {
        ...state,
        loadingCarouselAdsArray: [...loadingAr],
        carouselAdsArray: [...carouselAds],
      };
    case actionTypes.SET_CAROUSELADMEDIA_DESIGN_UPLOADED:
      let carouselAdsUploaded = state.carouselAdsArray;
      carouselAdsUploaded[action.payload.card.index] = {
        ...action.payload.card,
        uploaded: false,
      };
      return {
        ...state,
        carouselAdsArray: [...carouselAdsUploaded],
      };
    case actionTypes.DELETE_CAROUSEL_AD_CARD:
      let deleteStoryAds = state.carouselAdsArray;
      deleteStoryAds = deleteStoryAds.map((ad, index) => {
        if (
          (action.payload.card.hasOwnProperty("item") &&
            action.payload.card.item.id !== ad.id) ||
          (action.payload.hasOwnProperty("data") &&
            ad.carousel_id !== action.payload.data.carousel_id)
        ) {
          return ad;
        } else {
          return {
            id: index,
            media: "//",
          };
        }
      });
      let deletedLoadingAr = state.loadingCarouselAdsArray;
      deletedLoadingAr[action.payload.card.index] = false;
      return {
        ...state,
        loadingCarouselAdsArray: [...deletedLoadingAr],
        carouselAdsArray: [...deleteStoryAds],
      };
    case actionTypes.SET_INSTAGRAM_REJECTED_CAROUSEL:
      let rejAds = action.payload;
      let rejNewCarouselAdsArray = [];
      let stateAdArray = cloneDeep(state.carouselAdsArray);
      if (rejAds) {
        rejNewCarouselAdsArray = rejAds.map((ad, i) => {
          return {
            ...ad,
            index: ad.carousel_order,
            id: ad.carousel_id,
            destination: "BLANK",
            attachment: "BLANK",
          };
        });
        rejNewCarouselAdsArray.forEach(
          (story) => (stateAdArray[story.index] = story)
        );
      }
      return {
        ...state,
        carouselAdsArray: stateAdArray,
      };

    case actionTypes.SET_CAROUSELADCARD_LOADING_DESIGN:
      let ar = state.loadingCarouselAdsArray;
      let storyPro = state.carouselAdsArray;

      storyPro[action.payload.index] = {
        ...storyPro[action.payload.index],
        progress: action.payload.progress,
      };
      ar[action.payload.index] = action.payload.uploading;
      return {
        ...state,
        loadingCarouselAdsArray: [...ar],
        carouselAdsArray: [...storyPro],
      };
    case actionTypes.SET_DELETE_CAROUSEL_CARD_LOADING:
      let deleteLoadAr = state.loadingCarouselAdsArray;
      deleteLoadAr[action.payload.index] = action.payload.deleteing;
      return {
        ...state,
        loadingCarouselAdsArray: [...deleteLoadAr],
      };
    case actionTypes.ERROR_SET_INSTAGRAM_AD_DESIGN:
      return {
        ...state,
        loadingDesign: false,
      };
    case actionTypes.GET_INSTAGRAM_POST_AD: {
      return {
        ...state,
        instagramExistingPost: action.payload.data,
        paging: action.payload.paging,
      };
    }
    case actionTypes.LOADING_INSTAGRAM_POSTS: {
      return {
        ...state,
        postsLoading: action.payload,
      };
    }
    case actionTypes.SET_INSTAGRAM_REJECTED_ADTYPE:
      return {
        ...state,
        adType: action.payload,
      };
    case actionTypes.SET_INSTAGRAM_REJECTED_CAMPAIGN:
      let instaRejCampaign = action.payload;

      //Since we receive call_to_action as "ORDER_NOW" for example from campaignDetails,
      //Turn it to an object so that the process for re-uploading is the same as normal
      if (typeof instaRejCampaign.call_to_action === "string") {
        instaRejCampaign.call_to_action = {
          label: instaRejCampaign.call_to_action.replace("_", " "),
          value: instaRejCampaign.call_to_action,
        };
      }

      //Same thing, attachment comes in as a string from campaignDetails,
      if (instaRejCampaign.hasOwnProperty("attachment")) {
        let instaRejCampaignAttacment = instaRejCampaign.attachment;
        //if its a string and not "BLANK" then parse it
        instaRejCampaignAttacment =
          typeof instaRejCampaignAttacment === "string" &&
          instaRejCampaignAttacment !== "BLANK"
            ? JSON.parse(instaRejCampaignAttacment)
            : instaRejCampaignAttacment;
        //Sometimes attachemnts have utm parameters, they are deleted so that
        //if sent back they will be added from the backend
        if (instaRejCampaign.hasOwnProperty("link")) {
          if (instaRejCampaign.link.includes("?utm_source")) {
            instaRejCampaign.link = instaRejCampaign.link.split(
              "?utm_source"
            )[0];
          }
        }
        instaRejCampaign.attachment = instaRejCampaignAttacment;
      }
      return { ...state, instaRejCampaign };
    case actionTypes.RESET_INSTAGRAM_REJECTED_CAMPAIGN:
      return { ...state, instaRejCampaign: null };
    case actionTypes.MOVING_AMOUNT_TO_WALLET_INSTAGRAM: {
      return {
        ...state,
        movingAmountToWallet: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
