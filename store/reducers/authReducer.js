import * as actionTypes from "../actions/actionTypes";
import * as Segment from "expo-analytics-segment";
const initialState = {
  userid: null,
  userInfo: null,
  loading: false,
  loadingUpdateInfo: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      Segment.identifyWithTraits(
        action.payload.user.userid,
        action.payload.user
      );
      return {
        ...state,
        userid: action.payload.user.userid,
        userInfo: action.payload.user,
        loading: false
      };

    case actionTypes.UPDATE_USERINFO:
      return {
        ...state,
        loadingUpdateInfo: false,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case actionTypes.SET_LOADING_USER:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_LOADING_ACCOUNT_UPDATE:
      return {
        ...state,
        loadingUpdateInfo: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
