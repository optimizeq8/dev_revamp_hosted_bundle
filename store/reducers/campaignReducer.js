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
  videoUrlLoading: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AD_OBJECTIVE:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: action.payload.data,
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

    case actionTypes.SET_AD_DESIGN:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        loadingDesign: false
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
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message,
        kdamount: action.payload.kdamount,
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
    case actionTypes.RESET_CAMPAING_ID:
      return {
        ...state,
        campaign_id: ""
      };
    default:
      return state;
  }
};

export default reducer;
