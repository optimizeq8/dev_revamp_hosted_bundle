import * as actionTypes from "../actions/actionTypes";

const initialState = {
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
  isListEnd: false,
  fetching_from_server: false,
  passwordChanged: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        newMainBusiness.snap_ad_account_id = action.payload.ad_account_id;
      }
      return {
        ...state,
        mainBusiness: newMainBusiness,
        businessAccounts: [...state.businessAccounts],
        message: action.payload.message
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
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
    case actionTypes.UPDATE_CAMPAIGN_LIST:
      console.log("payload", action.payload);

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
      console.log("payload", action.payload);

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
        message: action.payload.message
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
      console.log(action.payload);
      let filtered = state.campaignList.filter(campaign =>
        campaign.name.toLowerCase().includes(action.payload.value.toLowerCase())
      );

      if (action.payload.selected !== "A")
        filtered = filtered.filter(campaign =>
          campaign.status.includes(action.payload.selected)
        );

      if (action.payload.dateRange && action.payload.dateRange[0] !== "") {
        let startSearch = Date.parse(action.payload.dateRange[0]);
        let endSearch = Date.parse(action.payload.dateRange[1]);

        filtered = filtered.filter(campaign => {
          if (
            startSearch <= Date.parse(campaign.start_time) &&
            endSearch >= Date.parse(campaign.end_time)
          )
            return campaign;
        });
      }
      return {
        ...state,
        filterValue: action.payload.value,
        filteredCampaigns: filtered,
        filterStatus: action.payload.selected
      };
    case actionTypes.LOGOUT_USER:
      console.log("reset");

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
        filteredCampaigns: []
      };

    default:
      return state;
  }
};

export default reducer;
