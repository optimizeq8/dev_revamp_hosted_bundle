import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  data: null,
  campaign_id: "",
  adType: "",
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
  image: "",
  countryName: "",
  interestNames: [],
  regionNames: [],
  campaignEnded: false,
  storyAdsArray: [],
  loadingStoryAdsArray: [],
  coverLoading: false,
  storyAdCover: null,
  adType: "SnapAd",
  collectionAdLinkForm: 0,
  collectionLoader: false,
  collectionAdMedia: [],
  weburlAvalible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AD_TYPE:
      return {
        ...state,
        adType: action.payload
      };
    case actionTypes.SET_COLLECTION_AD_LINK_FORM:
      return {
        ...state,
        collectionAdLinkForm: action.payload
      };
    case actionTypes.SET_AD_OBJECTIVE:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        loadingObj: false
      };
    case actionTypes.SET_MINIMUN_CASH:
      return {
        ...state,
        minValueBudget: action.payload.minValueBudget,
        maxValueBudget: action.payload.maxValueBudget
      };
    case actionTypes.ERROR_SET_AD_OBJECTIVE:
      return {
        ...state,
        loadingObj: false
      };
    case actionTypes.SET_AD_LOADING_COLLECTION_MEDIA:
      return {
        ...state,
        collectionLoader: action.payload
      };
    case actionTypes.SET_AD_COLLECTION_MEDIA:
      let arr = state.collectionAdMedia;
      arr[action.payload.collection_order] = action.payload;
      return {
        ...state,
        collectionLoader: false,
        collectionAdMedia: [...arr]
      };
    case actionTypes.ERROR_SET_AD_COLLECTION_MEDIA:
      return {
        ...state,
        collectionLoader: false
      };
    case actionTypes.SET_AD_DESIGN:
      console.log("set design", state.data);

      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
          call_to_action: {
            value: action.payload.data.call_to_action,
            label: action.payload.data.call_to_action.replace(/_/g, " ")
          },
          attachment:
            action.payload.data.attachment !== "BLANK"
              ? JSON.parse(action.payload.data.attachment)
              : action.payload.data.attachment
        },
        message: action.payload.message,

        loadingDesign: false
      };
    case actionTypes.SAVE_CAMPAIGN_INFO:
      let resetSwipeUps = {};
      if (action.payload.reset) {
        resetSwipeUps = {
          attachment: "BLANK",
          call_to_action: {
            label: "BLANK",
            value: "BLANK"
          },
          destination: "BLANK",
          reset: false
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          ...resetSwipeUps
        }
      };
    case actionTypes.ERROR_SET_AD_DESIGN:
      return {
        ...state,
        loadingDesign: false
      };

    case actionTypes.SET_VIDEO_URL:
      return {
        ...state,
        videoUrl: action.payload.media_upload_url,
        videoUrlLoading: !action.payload.success
      };
    case actionTypes.GET_VIDEO_URL_LOADING:
      return {
        ...state,
        videoUrlLoading: action.payload
      };
    case actionTypes.SET_AD_DETAILS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data.data },
        image: action.payload.image,
        countryName: action.payload.names.countryName,
        interestNames: action.payload.names.interestNames,
        regionNames: action.payload.names.regionNames,
        message: action.payload.data.message,
        kdamount: action.payload.data.kdamount,
        loadingDetail: false
      };
    case actionTypes.ERROR_SET_AD_DETAILS:
      return {
        ...state,
        loadingDetail: false
      };

    case actionTypes.UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        kdamount: action.payload.kdamount
      };
    case actionTypes.ERROR_UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state
      };
    case actionTypes.END_CAMPAIGN:
      return {
        ...state,
        campaignEnded: action.payload
      };
    case actionTypes.SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: action.payload.average_reach
      };
    case actionTypes.ERROR_SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: 0
      };

    case actionTypes.SET_SNAP_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: (state.average_reach / action.payload.average_reach) * 100
      };
    case actionTypes.ERROR_SET_SNAP_TOTAL_AUDIENCE_SIZE:
      return {
        ...state,
        total_reach: 0
      };

    case actionTypes.PAYMENT_REQUEST_URL:
      return {
        ...state,
        payment_data: action.payload,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_PAYMENT_REQUEST_URL:
      return {
        ...state,
        payment_data: null,
        loading: false
      };

    case actionTypes.SET_INTERESTS:
      return {
        ...state,
        interests: action.payload
      };
    case actionTypes.ERROR_SET_INTERESTS:
      return {
        ...state
      };

    case actionTypes.SET_DEVICE_MAKES:
      return {
        ...state,
        deviceBrands: action.payload
      };
    case actionTypes.ERROR_SET_DEVICE_MAKES:
      return {
        ...state
      };

    case actionTypes.SET_IOS_VERSIONS:
      return {
        ...state,
        isoVersions: action.payload
      };
    case actionTypes.ERROR_SET_IOS_VERSIONS:
      return {
        ...state
      };

    case actionTypes.SET_ANDROID_VERSIONS:
      return {
        ...state,
        androidVersions: action.payload
      };
    case actionTypes.ERROR_SET_ANDROID_VERSIONS:
      return {
        ...state
      };

    case actionTypes.SET_AD_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_AD_LOADING_OBJ:
      return {
        ...state,
        loadingObj: action.payload
      };
    case actionTypes.SET_AD_LOADING_DESIGN:
      return {
        ...state,
        loadingDesign: action.payload
      };
    case actionTypes.SET_AD_LOADING_DETAIL:
      return {
        ...state,
        loadingDetail: action.payload
      };
    case actionTypes.SET_COVER_LOADING_DESIGN:
      return {
        ...state,
        coverLoading: action.payload
      };
    case actionTypes.ERROR_SET_COVER_DESIGN:
      return {
        ...state,
        coverLoading: false
      };
    case actionTypes.SET_COVER_DESIGN:
      return {
        ...state,
        storyAdCover: {
          ...action.payload.data,
          preview_media_id: action.payload.preview_media_id
        },
        coverLoading: false
      };
    case actionTypes.SET_STORYADMEDIA_DESIGN:
      let storyAds = state.storyAdsArray;
      storyAds[action.payload.data.story_order] = {
        ...action.payload.data,
        ...action.payload.card
      };
      let loadingAr = state.loadingStoryAdsArray;
      loadingAr[action.payload.data.story_order] = false;

      return {
        ...state,
        loadingStoryAdsArray: [...loadingAr],
        storyAdsArray: [...storyAds]
      };
    case actionTypes.DELETE_STORY_AD_CARD:
      let deleteStoryAds = state.storyAdsArray.filter(ad => {
        if (ad === undefined || ad.story_id !== action.payload.data.story_id)
          return ad;
      });
      // deleteStoryAds[action.payload.data.story_order] = {
      //   ...action.payload.data,
      //   ...action.payload.card
      // };
      let deletedLoadingAr = state.loadingStoryAdsArray;
      deletedLoadingAr[action.payload.card.index] = false;

      return {
        ...state,
        loadingStoryAdsArray: [...deletedLoadingAr],
        storyAdsArray: [...deleteStoryAds]
      };
    case actionTypes.SET_STORYADCARD_LOADING_DESIGN:
      let ar = state.loadingStoryAdsArray;
      ar[action.payload.index] = action.payload.uploading;
      return {
        ...state,
        loadingStoryAdsArray: [...ar]
      };
    case actionTypes.SET_DELETE_CARD_LOADING:
      let deleteLoadAr = state.loadingStoryAdsArray;
      deleteLoadAr[action.payload.index] = action.payload.deleteing;
      return {
        ...state,
        loadingStoryAdsArray: [...deleteLoadAr]
      };
    case actionTypes.SET_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: action.payload
      };
    case actionTypes.ERROR_SET_LANGUAGE_LIST:
      return {
        ...state,
        languagesList: []
      };
    case actionTypes.RESET_COLLECTIONS:
      return {
        ...state,
        collectionLoader: false,
        collectionAdMedia: []
      };
    case actionTypes.RESET_CAMPAING_INFO:
      return {
        ...state,
        campaign_id: "",
        data: null,
        average_reach: 0,
        total_reach: 0,
        image: "",
        minValueBudget: 0,
        adType: "",
        maxValueBudget: 0,
        countryName: "",
        interestNames: [],
        regionNames: [],
        storyAdsArray: [],
        loadingStoryAdsArray: [],
        coverLoading: false,
        storyAdCover: null,
        collectionAdLinkForm: 0,
        collectionLoader: false,
        collectionAdMedia: []
      };
    case actionTypes.VERIFY_BUSINESSURL:
      return {
        ...state,
        weburlAvalible: action.payload.success
      };
    default:
      return state;
  }
};

export default reducer;
