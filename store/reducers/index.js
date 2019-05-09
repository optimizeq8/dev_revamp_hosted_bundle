import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import transactionReducer from "./transactionReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";

const appReducer = combineReducers({
  auth      : authReducer,
  campaignC : campaignReducer,
  transA    : transactionReducer,
  login     : loginReducer,
  register  : registerReducer
});



const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = {
      ...state,
      mobileNo: "",
      countryCode: "",
      verificationCode: false,
      successNo: false,
      verified: false,
      message: "",
      userInfo: null,
      successEmail: false,
      loadingCurrentUser: true,
      registered: false,
      businessAccounts: [],
      mainBusiness: null,
      campaignList: [],
      selectedCampaign: null,
      successName: false,
      filteredCampaigns: [],
      exponentPushToken: null
    
    }
  }

  return appReducer(state, action)
}
export default rootReducer;