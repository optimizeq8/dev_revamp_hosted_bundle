import * as actionTypes from "../actions/actionTypes";
import find from "lodash/find";
import { AsyncStorage, Animated } from "react-native";

const initialState = {
  loading: false,
  businessAccounts: [],
  mainBusiness: null,
  passwordChanged: false,
  loadingPasswordChanged: false,
  loadingBillingAddress: false,
  address: {},
  errorLoadingBillingAddress: false,
  businessLoadError: false
  savingBillingAddress: false,
  progress: new Animated.Value(0),
  progressSaving: new Animated.Value(0)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BUSINESS_ACCOUNT:
      let arr = state.businessAccounts;
      arr.push(action.payload.data);
      return {
        ...state,
        businessAccounts: arr,
        loading: !action.payload.success
      };
    case actionTypes.ERROR_ADD_BUSINESS_ACCOUNT:
      return {
        ...state,
        loading: action.payload.loading
      };
    case actionTypes.SET_BUSINESS_ACCOUNTS:
      let main = action.payload.data.business_accounts[action.payload.index]
        ? action.payload.data.business_accounts[action.payload.index]
        : action.payload.data.business_accounts[0];
      return {
        ...state,
        mainBusiness: main,
        businessAccounts: action.payload.data.business_accounts,
        loading: false,
        businessLoadError: false
      };
    case actionTypes.ERROR_SET_BUSINESS_ACCOUNTS:
      return {
        ...state,
        loading: false,
        businessLoadError: true
      };
    case actionTypes.SET_CURRENT_BUSINESS_ACCOUNT:
      let indexOfMainBusiness = state.businessAccounts.findIndex(
        business => business.businessid === action.payload.business.businessid
      );

      AsyncStorage.setItem("indexOfMainBusiness", `${indexOfMainBusiness}`);
      return {
        ...state,
        mainBusiness: action.payload.business
      };
    case actionTypes.ERROR_SET_CURRENT_BUSINESS_ACCOUNT:
      return {
        ...state
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        passwordChanged: action.payload.success,
        loadingPasswordChanged: action.payload.loading,
        progress: new Animated.Value(0)
      };
    case actionTypes.ERROR_CHANGE_PASSWORD:
      return {
        ...state,
        passwordChanged: action.payload.success,
        loadingPasswordChanged: false
      };
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload.data,
        savingBillingAddress: action.payload.data.success,
        progressSaving: new Animated.Value(0)
      };
    case actionTypes.ERROR_ADD_ADDRESS:
      return {
        ...state,
        savingBillingAddress: false,
        errorLoadingBillingAddress: true
      };

    case actionTypes.GET_BILLING_ADDRESS:
      return {
        ...state,
        address: action.payload, // returns empty address object
        loadingBillingAddress: false
      };
    case actionTypes.ERROR_GET_BILLING_ADDRESS:
      return {
        ...state,
        address: action.payload,
        loadingBillingAddress: false,
        errorLoadingBillingAddress: true
      };
    case actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT:
      let newMainBusiness = find(
        state.businessAccounts,
        bus => bus.businessid === state.mainBusiness.businessid
      );
      if (newMainBusiness) {
        newMainBusiness.snap_ad_account_id = action.payload.data.ad_account_id;
      }
      return {
        ...state,
        mainBusiness: newMainBusiness,
        businessAccounts: [...state.businessAccounts],
        loading: false
      };
    case actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT:
      return {
        ...state,
        // mainBusiness: newMainBusiness,
        // businessAccounts: [...state.businessAccounts],
        loading: action.payload.loading
      };
    case actionTypes.SET_BILLING_ADDRESS_LOADING:
      return {
        ...state,
        savingBillingAddress: action.payload,
        errorLoadingBillingAddress: false
      };
    case actionTypes.GET_BILLING_ADDRESS_LOADING:
      return {
        ...state,
        loadingBillingAddress: action.payload,
        errorLoadingBillingAddress: false
      };
    case actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_LOADING_BUSINESS_LIST:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
