import * as actionTypes from "../actions/actionTypes";
const initialState = {
  audienceList: [],
  audienceListLoading: false,
  saveAudienceLoading: false,
  audience: {
    name: "",
    audience_id: "",
    targeting: {
      demographics: [
        { gender: "", min_age: 13, max_age: 50, languages: ["ar", "en"] },
      ],
      geos: [{ countries: ["kw"], region_id: [] }],
      interests: [{ category_id: [] }],
      devices: [{ os_type: "", marketing_name: ["Asus 1"] }],
    },
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
