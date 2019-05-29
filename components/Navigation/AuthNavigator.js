import React from "react";
import { Platform, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import Tutorial from "../Screens/Tutorial";
import MainForm from "../Screens/Signup/MainForm";
import Signin from "../Screens/Signin";
import Invitation from "../Screens/InvitationScreen";

import ForgotPassword from "../Screens/ForgotPassword";

export default createStackNavigator(
  {
    Tutorial: Tutorial,
    MainForm: MainForm,
    Signin: Signin,
    ForgotPassword: ForgotPassword,
    Invitation: Invitation
  },
  {
    initialRouteName: "Tutorial",
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
      backgroundColor: "#751AFF"
    }
  }
);
