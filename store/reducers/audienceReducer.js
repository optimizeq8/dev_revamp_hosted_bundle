import * as actionTypes from "../actions/actionTypes";
const initialState = {
  audienceList: [],
  audienceListLoading: false,
  saveAudienceLoading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BUSINESS_ACCOUNT:
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
