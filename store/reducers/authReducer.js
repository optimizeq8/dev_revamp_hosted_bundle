import * as actionTypes from "../actions/actionTypes";
import { Segment } from "expo";
const initialState = {
  inviteCode: "",
  inviteRegistered: false,
  mobileNo: "",
  countryCode: "",
  verificationCode: false,
  successNo: false,
  verified: false,
  message: "",
  userInfo: null,
  successEmail: false,
  registered: false,
  successName: false,
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
    case actionTypes.SET_INVITE_CODE:
      return {
        ...state,
        inviteCode: action.payload.verificationCode,
        inviteRegistered: action.payload.data.registered,
        loading: !action.payload.data.success
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

    default:
      return state;
  }
};

export default reducer;
