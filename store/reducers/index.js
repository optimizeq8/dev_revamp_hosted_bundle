import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import transactionReducer from "./transactionReducer";
import dashboardReducer from "./dashboardReducer";
import accountManagementReducer from "./accountManagementReducer";
import genericReducer from "./genericReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import messengerReducer from "./messengerReducer";
import languageReducer from "./languageReducer";
import googleAdsReducer from "./googleAdsCampaignReducer";
<<<<<<< HEAD
import websiteReducer from "./optimizeWebsiteReducer";
=======
import instagramAdsReducer from "./instagramCampaignReducer";
>>>>>>> 8176c501352f48ce8b96b17c7f3404d0a89464fd

const appReducer = combineReducers({
  auth: authReducer,
  campaignC: campaignReducer,
  transA: transactionReducer,
  login: loginReducer,
  register: registerReducer,
  dashboard: dashboardReducer,
  account: accountManagementReducer,
  generic: genericReducer,
  messenger: messengerReducer,
  language: languageReducer,
  googleAds: googleAdsReducer,
<<<<<<< HEAD
  website: websiteReducer
=======
  instagramAds: instagramAdsReducer
>>>>>>> 8176c501352f48ce8b96b17c7f3404d0a89464fd
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
