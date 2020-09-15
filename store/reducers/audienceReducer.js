import * as actionTypes from "../actions/actionTypes";
const initialState = {
  audienceList: [],
  audienceListLoading: false,
  audienceDetailLoading: false,
  saveAudienceLoading: false,
  audience: {
    id: "",
    name: "",
    targeting: {
      demographics: [
        { gender: "", min_age: 13, max_age: 50, languages: ["ar", "en"] },
      ],
      geos: [{ country_code: "", region_id: [] }],
      interests: [{ category_id: [] }],
      devices: [
        {
          os_type: "",
          marketing_name: [],
          os_version_max: "",
          os_version_min: "",
        },
      ],
      locations: [{ circles: [] }],
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
        saveAudienceLoading: false,
      };

    case actionTypes.SAVE_AUDIENCE_DETAIL_LOADING:
      return {
        ...state,
        saveAudienceLoading: action.payload,
      };

    case actionTypes.SET_AUDIENCE_DETAIL:
      let audienceCopy = {
        ...action.payload,
        targeting: {
          // initialising it blank state
          demographics: [
            { gender: "", min_age: 13, max_age: 50, languages: ["ar", "en"] },
          ],
          geos: [{ country_code: "", region_id: [] }],
          interests: [{ category_id: [] }],
          devices: [
            {
              os_type: "",
              marketing_name: [],
              os_version_max: "",
              os_version_min: "",
            },
          ],
          locations: [{ circles: [] }],
          ...action.payload.targeting,
        },
      };

      return {
        ...state,
        audience: audienceCopy,
      };

    default:
      return state;
  }
};

export default reducer;
