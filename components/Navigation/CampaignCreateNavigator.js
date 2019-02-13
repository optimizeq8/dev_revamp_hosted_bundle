import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import AdType from "../Screens/CampaignCreate/AdType";
import AdObjective from "../Screens/CampaignCreate/AdObjective";
export default createStackNavigator(
  {
    AdType: AdType,
    AdObjective: AdObjective
  },
  {
    initialRouteName: "AdObjective",
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
