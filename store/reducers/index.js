import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import transactionReducer from "./transactionReducer";
export default combineReducers({
  auth: authReducer,
  campaignC: campaignReducer,
  transA: transactionReducer
});
