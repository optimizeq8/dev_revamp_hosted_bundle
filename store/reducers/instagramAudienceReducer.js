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
      genders: [""],
      flexible_spec: [
        {
          interests: [],
        },
      ],
      user_os: [""],
      user_device: [],
      os_version_min: "",
      os_version_max: "",
      geo_locations: { countries: [], regions: [] },
      age_max: 65,
      age_min: 18,
    },
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INSTAGRAM_AUDIENCE_DETAIL_LOCAL:
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

    case actionTypes.SET_INSTAGRAM_AUDIENCE_LIST:
      return {
        ...state,
        audienceList: action.payload,
      };
    case actionTypes.AUDIENCE_INSTAGRAM_LIST_LOADING:
      return {
        ...state,
        audienceListLoading: action.payload,
      };

    case actionTypes.LOADING_INSTAGRAM_AUDIENCE_DETAIL:
      return {
        ...state,
        audienceDetailLoading: action.payload,
        saveAudienceLoading: false,
      };

    case actionTypes.SAVE_INSTAGRAM_AUDIENCE_DETAIL_LOADING:
      return {
        ...state,
        saveAudienceLoading: action.payload,
      };

    case actionTypes.SET_INSTAGRAM_AUDIENCE_DETAIL:
      let audienceCopy = {
        ...action.payload,
        // targeting: {
        //   genders: [""],
        //   flexible_spec: [
        //     {
        //       interests: [],
        //     },
        //   ],
        //   user_os: [""],
        //   user_device: [],
        //   os_version_min: "",
        //   os_version_max: "",
        //   geo_locations: { countries: [], regions: [] },
        //   age_max: 65,
        //   age_min: 18,
        // },
      };

      return {
        ...state,
        audience: audienceCopy,
        audienceDetailLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
