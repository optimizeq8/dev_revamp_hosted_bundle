import { combineReducers } from "redux";
import authReducer from "./authReducer";
import campaignReducer from "./campaignReducer";
import transactionReducer from "./transactionReducer";
import dashboardReducer from "./dashboardReducer";
import accountManagementReducer from "./accountManagementReducer";
import genericReducer from "./genericReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";

const appReducer = combineReducers({
  auth: authReducer,
  campaignC: campaignReducer,
  transA: transactionReducer,
  login: loginReducer,
  register: registerReducer,
  dashboard: dashboardReducer,
  account: accountManagementReducer,
  generic: genericReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
