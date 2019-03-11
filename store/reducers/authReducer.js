import * as actionTypes from "../actions/actionTypes";

const initialState = {
  mobileNo: "",
  verificationCode: false,
  successNo: false,
  verified: false,
  message: "",
  userInfo: null,
  successEmail: false,
  loading: true,
  registered: false,
  businessAccounts: [],
  mainBusiness: null,
  campaignList: [],
  selectedCampaign: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MOBILE_NUMBER:
      return {
        ...state,
        mobileNo: action.payload.mobile,
        verified: action.payload.verified,
        verificationCode: action.payload.verificationCode,
        registered: action.payload.registered,
        message: action.payload.message
      };
    case actionTypes.VERIFY_MOBILE_NUMBER:
      return {
        ...state,
        successNo: action.payload.success,

        message: action.payload.message
      };
    case actionTypes.VERIFY_EMAIL:
      return {
        ...state,
        successEmail: action.payload.success,
        userInfo: action.payload.userInfo,
        message: action.payload.message
      };
    case actionTypes.CREATE_AD_ACCOUNT:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ad_account_id: action.payload.ad_account_id
        },
        message: action.payload.message
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        userInfo: action.payload.user,
        loading: false,
        message: action.payload.message
      };
    case actionTypes.SET_BUSINESS_ACCOUNTS:
      return {
        ...state,
        mainBusiness: action.payload.business_accounts[0],
        businessAccounts: action.payload.business_accounts,
        message: action.payload.message
      };
    case actionTypes.ADD_BUSINESS_ACCOUNT:
      let arr = state.businessAccounts;
      arr.push(action.payload);
      return {
        ...state,
        businessAccounts: arr,
        message: action.payload.message
      };
    case actionTypes.SET_CAMPAIGN_LIST:
      return {
        ...state,
        campaignList: action.payload.data,
        message: action.payload.message
      };
    case actionTypes.SET_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload.data,
        message: action.payload.message
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        message: ""
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        mobileNo: "",
        verificationCode: false,
        successNo: false,
        message: "",
        userInfo: null,
        successEmail: false,
        loading: true,
        businessAccounts: [],
        mainBusiness: null,
        campaignList: [],
        selectedCampaign: null
      };
    default:
      return state;
  }
};

export default reducer;
