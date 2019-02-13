import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: "",
  data: null,
  campaign_id: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MOBILE_NUMBER:
      return {
        ...state,
        campaign_id: action.payload.campaign_id,
        data: action.payload.data,
        message: action.payload.message
      };

    default:
      return state;
  }
};

export default reducer;
