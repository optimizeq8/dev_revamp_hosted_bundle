import * as actionTypes from "../actions/actionTypes";
import * as Segment from 'expo-analytics-segment';
const initialState = {
  exponentPushToken: null,
  admin: false
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
    case actionTypes.SET_BASEURL:
      return {
        ...state,
        admin: true
      };
    case actionTypes.ERROR_SET_PUSH_NOTIFICATION_TOKEN:
      return {
        ...state,
        exponentPushToken: null
      };
    default:
      return state;
  }
};

export default reducer;
