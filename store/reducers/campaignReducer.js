import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  data: null,
  campaign_id: "",
  average_reach: 0,
  interests: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AD_OBJECTIVE:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: action.payload.data,
        message: action.payload.message
      };
    case actionTypes.SET_AD_DESIGN:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message
      };
    case actionTypes.SET_AD_DETAILS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        message: action.payload.message
      };
    case actionTypes.SET_SNAP_AUDIENCE_SIZE:
      return {
        ...state,
        average_reach: action.payload.average_reach
      };
    case actionTypes.SET_INTERESTS:
      return {
        ...state,
        interests: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
