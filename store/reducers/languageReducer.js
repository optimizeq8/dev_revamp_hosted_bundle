import * as actionTypes from "../actions/actionTypes";

const initialState = {
  terms: {},
  phoneLanguage: "",
  languageChangeLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE_LIST_POEDIT:
      return {
        ...state,
        phoneLanguage: action.payload.language,
        terms: action.payload.terms,
        languageChangeLoading: false
      };
    case actionTypes.SET_LANGUAGE_CHANGE_LOADING:
      return {
        ...state,
        languageChangeLoading: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
