import * as actionTypes from "../actions/actionTypes";
import { Segment } from "expo";
const initialState = {
  userid: null,
  userInfo: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      Segment.identifyWithTraits(
        action.payload.user.userid,
        action.payload.user
      );
      return {
        ...state,
        userid: action.payload.user.userid,
        userInfo: action.payload.user,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
