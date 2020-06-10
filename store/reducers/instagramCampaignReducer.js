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
  adType: "InstagramAdFeed",
  incompleteCampaign: false,
  campaignProgressStarted: false,
  currentCampaignSteps: [],
  oldTempAdType: "",
  oldTempData: null,
  storyAdAttachment: {},
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
      if (action.payload.reset) {
        resetSwipeUps = {
          attachment: "BLANK",
          call_to_action: {
            label: "BLANK",
            value: "BLANK",
          },
          destination: "BLANK",
          reset: false,
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps,
        },
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
    default:
      return state;
  }
};

export default reducer;
