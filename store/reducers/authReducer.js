import * as actionTypes from "../actions/actionTypes";
import { Segment } from "expo";
const initialState = {
  address: {},
  mobileNo: "",
  countryCode: "",
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
  selectedCampaign: null,
  successName: false,
  filteredCampaigns: [],
  filterValue: "",
  filterStatus: "A",
  campaignStartSearch: "",
  campaignEndSearch: "",
  isListEnd: false,
  fetching_from_server: false,
  passwordChanged: false,
  exponentPushToken: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        exponentPushToken: null
      };
    case actionTypes.SET_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        exponentPushToken: action.payload.token
      };
    case actionTypes.SEND_MOBILE_NUMBER:
      return {
        ...state,
        successNo: action.payload.success,
        mobileNo: action.payload.mobile,
        countryCode: action.payload.country_code,
        verified: action.payload.verified,
        verificationCode: action.payload.verificationCode,
        registered: action.payload.registered,
        message: action.payload.message
      };
    case actionTypes.VERIFY_MOBILE_NUMBER:
      return {
        ...state,
        verified: action.payload.success,
        message: action.payload.message
      };
    case actionTypes.RESEND_VERIFICATION:
      return {
        ...state,
        successNo: action.payload.success,
        verificationCode: action.payload.verificationCode,
        message: action.payload.message
      };
    case actionTypes.RESEND_VERIFICATION_EMAIL:
      return {
        ...state,
        successNo: action.payload.success,
        verificationCode: action.payload.verificationCode,
        message: action.payload.message
      };
    case actionTypes.VERIFY_EMAIL:
      return {
        ...state,
        successEmail: action.payload.success,
        userInfo: action.payload.userInfo,
        message: action.payload.message
      };
    case actionTypes.VERIFY_BUSINESSNAME:
      return {
        ...state,
        successName: action.payload.success,
        message: action.payload.message
      };
    case actionTypes.CREATE_AD_ACCOUNT:
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
        message: action.payload.data.message,
        loading: !action.payload.data.success
      };
    case actionTypes.SET_CURRENT_USER:
      Segment.identifyWithTraits(
        action.payload.user.userid,
        action.payload.user
      );
      return {
        ...state,
        userid: action.payload.user.userid,
        userInfo: action.payload.user,
        loading: false,
        message: action.payload.message
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        passwordChanged: action.payload.success,
        message: action.payload.message
      };
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload.data,
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
        message: action.payload.message,
        loading: !action.payload.success
      };
    case actionTypes.UPDATE_CAMPAIGN_LIST:
      return {
        ...state,
        campaignList: [...state.campaignList, ...action.payload.data],
        filteredCampaigns: [...state.filteredCampaigns, ...action.payload.data],
        fetching_from_server: action.payload.fetching_from_server,
        message: action.payload.message
      };
    case actionTypes.SET_CAMPAIGN_LIST:
      return {
        ...state,
        campaignList: action.payload.data,
        filteredCampaigns: action.payload.data,
        fetching_from_server: false,
        isListEnd: false,
        loading: false,
        message: action.payload.message
      };
    case actionTypes.GOT_ALL_CAMPAIGNS:
      return {
        ...state,
        fetching_from_server: action.payload.fetching_from_server,
        isListEnd: action.payload.isListEnd,
        loading: action.payload.loading
      };
    case actionTypes.SET_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload.data,
        message: action.payload.message,
        loading: action.payload.loading
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        message: ""
      };
    case actionTypes.SET_CURRENT_BUSINESS_ACCOUNT:
      return {
        ...state,
        message: "Changed business account",
        mainBusiness: action.payload.business
      };
    case actionTypes.FILTER_CAMPAIGNS:
      let filtered = state.campaignList.filter(campaign =>
        campaign.name.toLowerCase().includes(action.payload.value.toLowerCase())
      );

      if (action.payload.selected !== "A")
        filtered = filtered.filter(campaign =>
          campaign.status.includes(action.payload.selected)
        );
      let startSearch = "";
      let endSearch = "";
      if (action.payload.dateRange && action.payload.dateRange[0] !== "") {
        startSearch = Date.parse(action.payload.dateRange[0]);
        endSearch = Date.parse(action.payload.dateRange[1]);

        filtered = filtered.filter(campaign => {
          if (
            startSearch <= Date.parse(campaign.start_time.split("T")[0]) &&
            endSearch >= Date.parse(campaign.end_time.split("T")[0])
          )
            return campaign;
        });
      }
      return {
        ...state,
        filterValue: action.payload.value,
        filteredCampaigns: filtered,
        filterStatus: action.payload.selected,
        campaignStartSearch: action.payload.dateRange[0],
        campaignEndSearch: action.payload.dateRange[1]
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        mobileNo: "",
        countryCode: "",
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
        selectedCampaign: null,
        successName: false,
        filteredCampaigns: [],
        exponentPushToken: null
      };

    default:
      return state;
  }
};

export default reducer;
