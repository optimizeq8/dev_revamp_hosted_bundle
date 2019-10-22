import * as actionTypes from "../actions/actionTypes";

const initialState = { actualVersion: "", loadingChecker: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTUAL_VERSION:
      return { ...state, actualVersion: action.payload, loadingChecker: false };
    case actionTypes.SET_UPDATE_LOADING:
      return { ...state, loadingChecker: action.payload };
    default:
      return state;
  }
};

export default reducer;
