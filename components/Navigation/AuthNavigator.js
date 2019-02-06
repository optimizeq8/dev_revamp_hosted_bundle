import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import SplashScreen from "../Screens/SplashScreen";
import Tutorial from "../Screens/Tutorial";
import MainForm from "../Screens/Signup/MainForm";
import Signin from "../Screens/Signin";

export default createStackNavigator(
  {
    SplashScreen: SplashScreen,
    Tutorial: Tutorial,
    MainForm: MainForm,
    Signin: Signin
  },
  {
    initialRouteName: "MainForm",
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
