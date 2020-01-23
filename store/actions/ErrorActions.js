import { showMessage } from "react-native-flash-message";
import store, { persistor } from "..";
import NavigationService from "../../NavigationService";
import * as actionTypes from "./actionTypes";
import { getBusinessAccounts } from "./genericActions";
export const errorMessageHandler = err => {
  if (err.errorStatus === 401) {
    showMessage({
      message: err.message,
      position: "top",
      type: "warning",
      onPress: () => {
        persistor.purge();
        store.dispatch({ type: actionTypes.RESET_CAMPAING_INFO });
        store.dispatch(getBusinessAccounts());
        NavigationService.navigate("Dashboard");
      },
      autoHide: false
    });
  } else
    showMessage({
      message:
        err.message ||
        err.response ||
        "Something went wrong, please try again.",
      type: "danger",
      position: "top"
    });
};
