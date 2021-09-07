import * as actionTypes from "../actions/actionTypes";
import find from "lodash/find";
import analytics from "@segment/analytics-react-native";

import { Animated } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

export const initialState = {
  loading: false,
  businessAccounts: [],
  mainBusiness: {},
  passwordChanged: false,
  loadingPasswordChanged: false,
  loadingBillingAddress: false,
  address: {
    country: "",
    area: "",
    block: "",
    street: "",
    building: "",
    office: "",
    avenue: "",
  },
  errorLoadingBillingAddress: false,
  businessLoadError: false,
  savingBillingAddress: false,
  // progress: new Animated.Value(0),
  // progressSaving: new Animated.Value(0),
  deletingBusinessLoading: false,
  editBusinessInfoLoading: false,
  editBusinessInfoErrorMessage: null,
  tempUserInfo: null,
  agencyTeamMembers: [],
  loadingTeamMembers: false,
  numberOfTeamAdmins: 0,
  businessesLoading: false,
  tempInviteId: "",
  businessInvitee: "",
  invitedEmail: "",
  teamInviteLoading: false,
  pendingTeamInvites: [],
  crashApp: false,
  businessSearchLoading: false,
  searchedBusinessesList: [],
  checkingBusinessStatus: false,
  passwordChangeMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BUSINESS_ACCOUNT:
      let arr = state.businessAccounts;
      let newBusiness = action.payload;
      arr.push(newBusiness);
      return {
        ...state,
        businessAccounts: arr,
        loading: false,
      };
    case actionTypes.ERROR_ADD_BUSINESS_ACCOUNT:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case actionTypes.SET_BUSINESS_ACCOUNTS:
      let main = state.mainBusiness;
      let setNewBusinessAccounts = action.payload.data || [];
      if (
        !action.payload.businessSeleced &&
        setNewBusinessAccounts &&
        setNewBusinessAccounts.length > 0
      ) {
        main = setNewBusinessAccounts[action.payload.index]
          ? setNewBusinessAccounts[action.payload.index]
          : setNewBusinessAccounts[0];
        analytics.identify(`${action.payload.userid}`, {
          business_id: main.id,
          business_name: main.name,
          revenue: main.revenue,
          ltv: main.ltv,
          wallet_amount: main.wallet_amount,
          first_name: action.payload.user.firstname,
          last_name: action.payload.user.lastname,
        });
        analytics.group(`${main.id}`, {
          business_id: main.id,
          name: main.name,
          company: main.name,
          revenue: main.revenue,
          ltv: main.ltv,
          wallet_amount: main.wallet_amount,
        });
      }
      AsyncStorage.setItem("selectedBusinessId", JSON.stringify(main.id)).catch(
        (err) => console.log(err)
      );
      return {
        ...state,
        mainBusiness: main,
        businessAccounts: setNewBusinessAccounts,
        businessesLoading: false,
        businessLoadError: false,
      };
    case actionTypes.ERROR_SET_BUSINESS_ACCOUNTS:
      return {
        ...state,
        loading: false,
        businessLoadError: true,
      };
    case actionTypes.SET_CURRENT_BUSINESS_ACCOUNT:
      let newSetMainBusiness = action.payload;
      AsyncStorage.setItem(
        "indexOfMainBusiness",
        `${newSetMainBusiness.index}`
      );
      AsyncStorage.setItem("selectedBusinessId", `${newSetMainBusiness.id}`);

      return {
        ...state,
        mainBusiness: newSetMainBusiness,
      };
    case actionTypes.ERROR_SET_CURRENT_BUSINESS_ACCOUNT:
      return {
        ...state,
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        passwordChanged: action.payload.success,
        loadingPasswordChanged: action.payload.loading,
        progress: new Animated.Value(0),
        passwordChangeMessage: action.payload.message,
      };
    case actionTypes.ERROR_CHANGE_PASSWORD:
      return {
        ...state,
        passwordChanged: action.payload.success,
        loadingPasswordChanged: false,
        passwordChangeMessage: action.payload.message,
        loadingPasswordChanged: action.payload.loading,
      };
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload.data,
        savingBillingAddress: action.payload.data.success,
        progressSaving: new Animated.Value(0),
      };
    case actionTypes.ERROR_ADD_ADDRESS:
      return {
        ...state,
        savingBillingAddress: false,
        errorLoadingBillingAddress: true,
      };

    case actionTypes.GET_BILLING_ADDRESS:
      return {
        ...state,
        address: action.payload, // returns empty address object
        loadingBillingAddress: false,
      };
    case actionTypes.ERROR_GET_BILLING_ADDRESS:
      return {
        ...state,
        address: action.payload,
        loadingBillingAddress: false,
        errorLoadingBillingAddress: true,
      };
    case actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT:
      let newMainBusiness = state.businessAccounts.find(
        (bus) => bus.id === state.mainBusiness.id
      );
      if (newMainBusiness) {
        newMainBusiness.snap_ad_account_id =
          action.payload.data.snap_ad_account_id;
      }
      return {
        ...state,
        mainBusiness: newMainBusiness,
        businessAccounts: [...state.businessAccounts],
        loading: false,
      };
    case actionTypes.CREATE_GOOGLE_AD_ACCOUNT:
      var mb = find(
        state.businessAccounts,
        (bus) => bus.businessid === state.mainBusiness.businessid
      );
      if (mb) {
        mb.google_account_id = action.payload.data.google_account_id;
      }
      return {
        ...state,
        mainBusiness: mb,
        businessAccounts: [...state.businessAccounts],
        loading: false,
      };
    case actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT:
      return {
        ...state,
        // mainBusiness: newMainBusiness,
        // businessAccounts: [...state.businessAccounts],
        loading: action.payload.loading,
      };
    case actionTypes.ERROR_CREATE_GOOGLE_AD_ACCOUNT:
      return {
        ...state,
        // mainBusiness: newMainBusiness,
        // businessAccounts: [...state.businessAccounts],
        loading: action.payload.loading,
      };
    case actionTypes.SET_BILLING_ADDRESS_LOADING:
      return {
        ...state,
        savingBillingAddress: action.payload,
        errorLoadingBillingAddress: false,
      };
    case actionTypes.GET_BILLING_ADDRESS_LOADING:
      return {
        ...state,
        address: { ...initialState.address },
        loadingBillingAddress: action.payload,
        errorLoadingBillingAddress: false,
      };
    case actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_LOADING_BUSINESS_LIST:
      return {
        ...state,
        businessesLoading: action.payload,
      };
    case actionTypes.UPDATE_MAINBUSINESS:
      let updatedMainBusiness = {
        insta_handle: action.payload.insta_handle,
        whatsappnumber: action.payload.whatsappnumber,
        weburl: action.payload.weburl,
        callnumber: action.payload.callnumber,
        source: action.payload.source,
        googlemaplink: action.payload.googlemaplink,
      };
    case actionTypes.DELETE_BUSINESS_ACCOUNT:
      let newBusinessAccounts = state.businessAccounts.filter(
        (business) => business.businessid !== action.payload
      );
      let mainBusiness = state.mainBusiness;
      //if the business that was deleted is the mainBusiness then reset mainBusiness to the first business in the lsit
      if (mainBusiness.businessid === action.payload) {
        AsyncStorage.setItem("indexOfMainBusiness", "0");
        mainBusiness =
          newBusinessAccounts.length > 0 ? newBusinessAccounts[0] : {};
      }
      return {
        ...state,
        businessAccounts: newBusinessAccounts,
        mainBusiness: mainBusiness,
      };
    case actionTypes.DELETE_BUSINESS_LOADING:
      return {
        ...state,
        deletingBusinessLoading: action.payload,
      };
    //the temp info of the invited user eg. first and last name and email
    case actionTypes.SET_TEMP_USERINFO:
      return {
        ...state,
        tempUserInfo: action.payload,
      };
    case actionTypes.UPDATE_BUSINESS_INFO_LOADING:
      return {
        ...state,
        editBusinessInfoLoading: action.payload,
      };
    case actionTypes.UPDATE_BUSINESS_INFO_SUCCESS:
      return {
        ...state,
        editBusinessInfoLoading: false,
        mainBusiness: {
          ...state.mainBusiness,
          ...action.payload,
        },
      };
    case actionTypes.UPDATE_BUSINESS_INFO_ERROR:
      return {
        ...state,
        editBusinessInfoLoading: false,
        editBusinessInfoErrorMessage: action.payload.editBusinessErrorMessage,
      };
    case actionTypes.SET_TEAM_MEMBERS:
      let newMainBusinessRole = state.mainBusiness;
      let mainBusinessUser = {};
      let pendingTeamInvites = [];
      //if a role of a member is updated by an admin,
      //update the user_role key in mainBusiness whenever they open the team list or refreash the list
      mainBusinessUser = action.payload.teamMembers.find(
        (member) => member.userid === state.mainBusiness.userid
      );
      if (mainBusinessUser)
        newMainBusinessRole["user_role"] = mainBusinessUser.user_role;

      pendingTeamInvites = action.payload.pendingTeamInvites;
      return {
        ...state,
        agencyTeamMembers: action.payload.teamMembers,
        mainBusiness: { ...state.mainBusiness, ...newMainBusinessRole },
        pendingTeamInvites: pendingTeamInvites,
        loadingTeamMembers: false,
      };
    case actionTypes.SET_UPDATED_TEAM_MEMBER:
      // update the userrole key in agencyTeamMembers when a member is updated
      //so they don't have to refresh the list again
      let newTeamMembers = state.agencyTeamMembers.map((member) => {
        if (member.userid === action.payload.userid) {
          return { ...member, user_role: action.payload.userrole };
        } else {
          return member;
        }
      });
      let updatedMainBusinessRole = state.mainBusiness;
      //Update user_role key in mainBusiness if the updated member is the logged in user
      if (updatedMainBusinessRole.userid === action.payload.userid) {
        updatedMainBusinessRole["user_role"] = action.payload.userrole;
      }
      return {
        ...state,
        agencyTeamMembers: [...newTeamMembers],
        mainBusiness: { ...state.mainBusiness, ...updatedMainBusinessRole },
        loadingTeamMembers: false,
      };
    case actionTypes.DELETE_TEAM_MEMBER:
      let filteredAgencyTeamMembers = state.agencyTeamMembers.filter(
        (memebr) => memebr.userid !== action.payload.userid
      );
      return {
        ...state,
        agencyTeamMembers: [...filteredAgencyTeamMembers],
        loadingTeamMembers: false,
      };
    case actionTypes.SET_TEAM_MEMBERS_LOADING:
      return { ...state, loadingTeamMembers: action.payload };
    //saves businessInvitee, invitedEmail and tempInivtedId from the navigation params of the deep_link
    case actionTypes.SAVE_INVITEE_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.RESET_INVITEE_INFO:
      return {
        ...state,
        businessInvitee: "",
        tempInviteId: "",
        invitedEmail: "",
      };
    case actionTypes.SET_TEAMINV_LOADING:
      return { ...state, teamInviteLoading: action.payload };
    case actionTypes.SET_BUSINESS_INVITES:
      return { ...state, businessInvites: action.payload };
    case actionTypes.CRASH_APP:
      return {
        ...state,
        crashApp: action.payload,
      };
    case actionTypes.BUSINESS_SEARCH_LOADING:
      return {
        ...state,
        businessSearchLoading: action.payload,
      };
    case actionTypes.BUSINESS_SEARCH_FOUND:
      return {
        ...state,
        searchedBusinessesList: action.payload,
        businessSearchLoading: false,
      };
    case actionTypes.CHECK_BUSINESS_STATUS:
      return {
        ...state,
        checkingBusinessStatus: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
