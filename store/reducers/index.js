import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import transactionReducer from "./transactionReducer";
import dashboardReducer from "./dashboardReducer";
import accountManagementReducer from "./accountManagementReducer";
import genericReducer from "./genericReducer";

export default combineReducers({
  auth: authReducer,
  campaignC: campaignReducer,
  transA: transactionReducer,
  dashboard: dashboardReducer,
  account: account,
  generic: generic
});
