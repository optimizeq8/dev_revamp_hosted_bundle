import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import Home from "../Screens/Home";
import Dashboard from "../Screens/Dashboard";
import SnapchatCreateAdAcc from "../Screens/SnapchatCreateAdAcc";
import CreateBusinessAccount from "../Screens/CreateBusinessAccount";
import CampaignDetails from "../Screens/CampaignDetails";

export default createStackNavigator(
  {
    Home: Home,
    Dashboard: Dashboard,
    SnapchatCreateAdAcc: SnapchatCreateAdAcc,
    CreateBusinessAccount: CreateBusinessAccount,
    CampaignDetails: CampaignDetails
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
