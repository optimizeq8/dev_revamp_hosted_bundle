import * as actionTypes from "../actions/actionTypes";
import find from "lodash/find";
import { AsyncStorage, Animated } from "react-native";

const initialState = {
  campaign_id: "",
  loading: false,
  locationsFetchedList: [],
  name: "",
  country: "",
  language: "1000",
  start_time: "",
  end_time: "",
  location: [],

  headline1: "",
  headline2: "",
  headline3: "",
  description: "",
  description2: "",
  finalurl: "",

  budget: 0,
  age: ["Undetermined"],
  gender: "Undetermined",
  keywords: [],
  fetchedKeywords: [],
  uploading: false,
  loading: false,
  campaignSteps: [],
  incompleteCampaign: false,
  campaignResumed: false,
  campaignStatusLoading: false
};

const reducer = (state = initialState, action) => {
  // console.log("campign reduce", action.payload);

  switch (action.type) {
    case actionTypes.SET_GOOGLE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_GOOGLE_COUNTRY_REGIONS_REACH:
      return {
        ...state,
        locationsFetchedList: action.payload.data,
        loading: action.payload.loading
      };
    case actionTypes.ERROR_SET_GOOGLE_COUNTRY_REGIONS_REACH:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.SET_GOOGLE_UPLOADING:
      return {
        ...state,
        uploading: action.payload
      };
    case actionTypes.SET_GOOGLE_CAMPAIGN_INFO:
      return {
        ...state,
        ...action.payload.data,
        uploading: false,
        incompleteCampaign: true
      };
    case actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_INFO:
      return {
        ...state,
        uploading: false
      };
    case actionTypes.SET_GOOGLE_CAMPAIGN_AD_DESIGN:
      return {
        ...state,
        ...action.payload.data,
        uploading: false
      };
    case actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_DESIGN:
      return {
        ...state,
        uploading: false
      };
    case actionTypes.SET_GOOGLE_CAMPAIGN_AD_TARGETTING:
      return {
        ...state,
        ...action.payload.data
      };
    case actionTypes.ERROR_SET_GOOGLE_CAMPAIGN_AD_TARGETTING:
      return {
        ...state,
        uploading: false
      };
    case actionTypes.SET_GOOGLE_SE_KEYWORDS:
      return {
        ...state,
        fetchedKeywords: action.payload.data,
        loading: action.payload.loading
      };
    case actionTypes.ERROR_SET_GOOGLE_SE_KEYWORDS:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.SET_BUDGET_RANGE:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.SAVE_GOOGLE_CAMPAIGN_DATA:
      // console.log("save google data", action.payload);

      return {
        ...state,
        ...action.payload
      };
    case actionTypes.SAVE_GOOGLE_CAMPAIGN_STEPS:
      return {
        ...state,
        campaignSteps: action.payload
      };
    case actionTypes.SET_GOOGLE_CAMPAIGN_RESUMED:
      return {
        ...state,
        campaignResumed: action.payload
      };
    case actionTypes.RESET_GOOGLE_CAMPAIGN:
      return initialState;

    case actionTypes.SET_GOOGLE_STATUS_LOADING:
      return {
        ...state,
        campaignStatusLoading: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
