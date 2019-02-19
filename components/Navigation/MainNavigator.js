import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import Home from "../Screens/Home";
import SnapchatCreateAdAcc from "../Screens/SnapchatCreateAdAcc";

export default createStackNavigator(
  {
    Home: Home,
    SnapchatCreateAdAcc: SnapchatCreateAdAcc
  },
  {
    initialRouteName: "Home",
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
