import * as actionTypes from "../actions/actionTypes";
const initialState = {
  audienceList: [],
  audienceListLoading: false,
  saveAudienceLoading: false,
  audience: {
    name: "",
    audience_id: "",
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUDIENCE_DETAIL_LOCAL:
      let audience = { ...state.audience };
      if (action.payload.reset) {
        audience = {
          ...initialState.audience,
          ...action.payload,
        };
      } else {
        audience = {
          ...state.audience,
          ...action.payload,
        };
      }
      return {
        ...state,
        audience,
      };

    default:
      return state;
  }
};

export default reducer;
