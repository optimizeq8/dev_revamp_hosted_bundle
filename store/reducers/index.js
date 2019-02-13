import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
export default combineReducers({
  auth: authReducer,
  campaignC: campaignReducer
});
