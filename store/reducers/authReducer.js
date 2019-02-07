import * as actionTypes from "../actions/actionTypes";

const initialState = { mobileNo: "", verificationCode: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MOBILE_NUMBER:
      return {
        ...state,
        mobileNo: action.payload.mobile,
        verificationCode: action.payload.verificationCode
      };

    default:
      return state;
  }
};

export default reducer;
