import React from "react";
import Tutorial from "../Screens/Tutorial";
import MainForm from "../Screens/Signup/MainForm";
import AppUpdateChecker from "../Screens/AppUpdateChecker";
import SwitchLanguage from "../Screens/SwitchLanguage";
import SwitchLanguageLoading from "../Screens/SwitchLanguage/Loading";
import RegistrationSuccess from "../Screens/Signup/RegistrationSuccess";

import Signin from "../Screens/Signin";
// import Invitation from "../Screens/InvitationScreen";
import { FluidNavigator } from "react-navigation-fluid-transitions";

import ForgotPassword from "../Screens/ForgotPassword";

export default FluidNavigator(
  {
    Tutorial: Tutorial,
    MainForm: { screen: MainForm, path: "register_team/" },
    AppUpdateChecker: AppUpdateChecker,

    Signin: Signin,
    ForgotPassword: ForgotPassword,
    SwitchLanguage: SwitchLanguage,
    SwitchLanguageLoading: SwitchLanguageLoading,
    RegistrationSuccess: RegistrationSuccess,

    // Invitation: Invitation
  },
  {
    initialRouteName: "SwitchLanguage",
    mode: "card",
    navigationOptions: {
      header: null,

      headerStyle: {
        backgroundColor: "#0000",
      },
      headerTintColor: "#0000",
      headerTextStyle: {
        fontWeight: "bold",
      },
    },
    cardStyle: {
      backgroundColor: "#751AFF",
    },
  }
);

//  initialRouteName: "Tutorial",
//   navigationOptions: {
//     header: null,

//     headerStyle: {
//       backgroundColor: "#0000"
//     },
//     headerTintColor: "#fff",
//     headerTextStyle: {
//       fontWeight: "bold"
//     }
//   },
//   headerTitleContainerStyle: {
//     left: 0,
//     right: 0,
//     backgroundColor: "#0000"
//   },
//   cardStyle: {
//     backgroundColor: "#0000"
//   },
//   transitionConfig: () => ({
//     containerStyle: {
//       margin: 0,
//       padding: 0,
//       borderColor: "#0000",
//       borderWidth: 0,
//       width: "100%",
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//       backgroundColor: "#0000"
//     }
//   })
