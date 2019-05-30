import React from "react";
import { Platform, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import Tutorial from "../Screens/Tutorial";
import MainForm from "../Screens/Signup/MainForm";
import Signin from "../Screens/Signin";
import Invitation from "../Screens/InvitationScreen";
import { FluidNavigator } from "react-navigation-fluid-transitions";

import ForgotPassword from "../Screens/ForgotPassword";

export default FluidNavigator(
  {
    Tutorial: Tutorial,
    MainForm: MainForm,
    Signin: Signin,
    ForgotPassword: ForgotPassword,
    Invitation: Invitation
  },
  {
    initialRouteName: "Tutorial",
    mode: "card",
    navigationOptions: {
      header: null,

      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTintColor: "#fff",
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "#0000"
    }
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
