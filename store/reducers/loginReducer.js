import * as actionTypes from "../actions/actionTypes";
import * as Segment from "expo-analytics-segment";
const initialState = {
  exponentPushToken: null,
  admin: false,
  clearTokenLoading: false,
  checkingForToken: false,
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
    default:
      return state;
  }
};

export default reducer;
