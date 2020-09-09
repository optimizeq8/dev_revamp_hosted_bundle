import * as actionTypes from "../actions/actionTypes";
const initialState = {
  audienceList: [],
  audienceListLoading: false,
  audienceDetailLoading: false,
  saveAudienceLoading: false,
  audience: {
    name: "",
    targeting: {
      demographics: [
        { gender: "", min_age: 13, max_age: 50, languages: ["ar", "en"] },
      ],
      geos: [{ country_code: "kw", countries: ["kw"], region_id: [] }],
      interests: [{ category_id: [] }],
      devices: [{ os_type: "", marketing_name: [] }],
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

    case actionTypes.SET_AUDIENCE_LIST:
      return {
        ...state,
        audienceList: action.payload,
      };
    case actionTypes.AUDIENCE_LIST_LOADING:
      return {
        ...state,
        audienceListLoading: action.payload,
      };

    case actionTypes.LOADING_AUDIENCE_DETAIL:
      return {
        ...state,
        audienceDetailLoading: action.payload,
      };

    case actionTypes.SAVE_AUDIENCE_DETAIL_LOADING:
      return {
        ...state,
        saveAudienceLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
