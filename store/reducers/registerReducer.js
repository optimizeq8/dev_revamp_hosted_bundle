import * as actionTypes from "../actions/actionTypes";
const initialState = {
  inviteCode: "",
  inviteRegistered: false,
  mobileNo: "",
  countryCode: "",
  verificationCode: false,
  successNo: false,
  verified: false,
  userInfo: null,
  successEmail: false,
  loadingRegister: true,
  registered: false,
  successName: false,
  successPersonalInfo: false,
  savingRegister: false,
  emailLinkCodeExpired: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INVITE_CODE:
      return {
        ...state,
        inviteCode: action.payload.verificationCode,
        inviteRegistered: action.payload.data.registered,
        loadingRegister: !action.payload.data.success
      };
    case actionTypes.ERROR_SET_INVITE_CODE:
      return {
        ...state,
        loadingRegister: false
      };
    case actionTypes.SEND_MOBILE_NUMBER:
      return {
        ...state,
        successNo: action.payload.success,
        mobileNo: action.payload.mobile,
        countryCode: action.payload.country_code,
        verified: action.payload.verified,
        verificationCode: action.payload.verificationCode,
        registered: action.payload.registered
      };
    case actionTypes.ERROR_SEND_MOBILE_NUMBER:
      return {
        ...state,
        successNo: action.payload.success
        // mobileNo: action.payload.mobile,
        // countryCode: action.payload.country_code,
        // verified: action.payload.verified,
        // verificationCode: action.payload.verificationCode,
        // registered: action.payload.registered,
      };
    case actionTypes.VERIFY_MOBILE_NUMBER:
      return {
        ...state,
        verified: action.payload.success
      };
    case actionTypes.ERROR_VERIFY_MOBILE_NUMBER:
      return {
        ...state,
        verified: action.payload.success
      };
    case actionTypes.RESEND_VERIFICATION:
      return {
        ...state,
        successNo: action.payload.success,
        verificationCode: action.payload.verificationCode
      };
    case actionTypes.ERROR_RESEND_VERIFICATION:
      return {
        ...state,
        successNo: action.payload.success
        // verificationCode: action.payload.verificationCode,
      };
    case actionTypes.RESEND_VERIFICATION_EMAIL:
      return {
        ...state,
        successNo: action.payload.success,
        verificationCode: action.payload.verificationCode
      };
    case actionTypes.ERROR_RESEND_VERIFICATION_EMAIL:
      return {
        ...state,
        successNo: action.payload.success
        // verificationCode: action.payload.verificationCode,
      };
    case actionTypes.VERIFY_EMAIL:
      return {
        ...state,
        successEmail: action.payload.success,
        userInfo: action.payload.userInfo
      };
    case actionTypes.ERROR_VERIFY_EMAIL:
      return {
        ...state,
        successEmail: action.payload.success,
        userInfo: action.payload.userInfo
      };

    case actionTypes.VERIFY_BUSINESSNAME:
      return {
        ...state,
        successName: action.payload.success
      };
    case actionTypes.ERROR_VERIFY_BUSINESSNAME:
      return {
        ...state,
        successName: action.payload.success
      };
    case actionTypes.REGISTER_GUEST_USER:
      return {
        ...state,
        successPersonalInfo: action.payload.success,
        userInfo: action.payload.userInfo
      };
    case actionTypes.ERROR_REGISTER_GUEST_USER:
      return {
        ...state,
        successPersonalInfo: action.payload.success,
        userInfo: action.payload.userInfo
      };
    case actionTypes.SAVING_REGISTER_ACCOUNT:
      return {
        ...state,
        savingRegister: action.payload
      };
    case actionTypes.RESET_VERIFICATION_CODE:
      return {
        ...state,
        successNo: false,
        mobileNo: "",
        countryCode: "",
        verificationCode: false
      };
    case actionTypes.VERIFY_EMAIL_CODE_LINK:
      return {
        ...state,
        emailLinkCodeExpired: !action.payload.success,
        successNo: action.payload.success
      };
    default:
      return state;
  }
};

export default reducer;
