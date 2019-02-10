import * as actionTypes from "../actions/actionTypes";

const initialState = {
  mobileNo: "",
  verificationCode: false,
  successNo: false,
  message: "",
  userinfo: null,
  successEmail: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MOBILE_NUMBER:
      return {
        ...state,
        mobileNo: action.payload.mobile,
        verificationCode: action.payload.verificationCode,
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
        userinfo: action.payload.userInfo,
        message: action.payload.message
      };
    case actionTypes.SIGN_UP_USER:
      return {
        ...state,
        userinfo: action.payload.userinfo,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default reducer;
