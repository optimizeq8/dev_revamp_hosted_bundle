import * as actionTypes from "../actions/actionTypes";

const initialState = {
  mobileNo: "",
  verificationCode: false,
  successNo: false,
  message: "",
  userInfo: null,
  successEmail: false,
  loading: true
};

const reducer = (state = initialState, action) => {
  console.log("reducer", action.payload);

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
        userInfo: action.payload.userInfo,
        message: action.payload.message
      };
    case actionTypes.SIGN_UP_USER:
      return {
        ...state,
        userInfo: action.payload.userinfo,
        message: action.payload.message
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        userInfo: action.payload.user,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;
