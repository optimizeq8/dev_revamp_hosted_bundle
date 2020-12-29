import * as actionTypes from "../actions/actionTypes";
const initialState = {
  exponentPushToken: null,
  admin: false,
  clearTokenLoading: false,
  checkingForToken: false,
  forgotPasswordSuccess: null,
  forgotPasswordMessage: "",
  temp_exist: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        exponentPushToken: null,
        clearTokenLoading: false,
        checkingForToken: false,
      };
    case actionTypes.CLEAR_PUSH_NOTIFICATION_LOADING:
      return {
        ...state,
        clearTokenLoading: action.payload,
      };
    case actionTypes.SET_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        exponentPushToken: action.payload.token,
      };
    case actionTypes.SET_BASEURL:
      return {
        ...state,
        admin: true,
      };
    case actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        exponentPushToken: null,
      };
    case actionTypes.CHECKING_FOR_TOKEN:
      return { ...state, checkingForToken: action.payload };
    case actionTypes.CHECKING_FOR_TOKEN_ERROR:
      return {
        ...state,
        checkingForTokenEroor: action.payload,
        checkingForToken: false,
      };
    case actionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordSuccess: action.payload.success,
        forgotPasswordMessage: action.payload.message,
        temp_exist: action.payload.temp_exist,
      };
    default:
      return state;
  }
};

export default reducer;
