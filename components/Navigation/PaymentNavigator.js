import { createStackNavigator } from "react-navigation";
import ErrorRedirect from "../Screens/ErrorRedirect";
import SuccessRedirect from "../Screens/SuccessRedirect";
import PaymentForm from "../Screens/PaymentForm";

export default createStackNavigator(
  {
    ErrorRedirect: {
      screen: ErrorRedirect,
      path: "error/"
    },
    SuccessRedirect: {
      screen: SuccessRedirect,
      path: "success/"
    },
    PaymentForm: {
      screen: PaymentForm
    }
  },
  {
    initialRouteName: "PaymentForm"
  }
);
