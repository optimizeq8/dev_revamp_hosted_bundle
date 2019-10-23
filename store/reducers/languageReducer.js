import * as actionTypes from "../actions/actionTypes";

const initialState = {
  terms: {},
  phoneLanguage: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE_LIST_POEDIT:
      return {
        ...state,
        phoneLanguage: action.payload.language,
        terms: action.payload.terms
      };
    default:
      return state;
  }
};

export default reducer;
