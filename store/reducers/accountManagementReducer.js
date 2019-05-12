import * as actionTypes from "../actions/actionTypes";
import { Segment } from "expo";

const initialState = {
  loading: false,
  businessAccounts: [],
  mainBusiness: null,
  passwordChanged: false,
  loadingBillingAddress: false,
  address: {}
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
    case actionTypes.SET_BUSINESS_ACCOUNTS:
      return {
        ...state,
        mainBusiness: action.payload.business_accounts[0],
        businessAccounts: action.payload.business_accounts
      };
    case actionTypes.SET_CURRENT_BUSINESS_ACCOUNT:
      return {
        ...state,
        mainBusiness: action.payload.business
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        passwordChanged: action.payload.success
      };
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload.data,
        loadingBillingAddress: false
      };
    case actionTypes.GET_BILLING_ADDRESS:
      return {
        ...state,
        address: action.payload,
        loadingBillingAddress: false
      };
    case actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT:
      let newMainBusiness = state.businessAccounts.find(
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
    case actionTypes.SET_BILLING_ADDRESS_LOADING:
      return {
        ...state,
        loadingBillingAddress: action.payload
      };
    case actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
