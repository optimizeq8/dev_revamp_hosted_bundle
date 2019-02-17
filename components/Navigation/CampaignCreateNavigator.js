import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import AdType from "../Screens/CampaignCreate/AdType";
import AdObjective from "../Screens/CampaignCreate/AdObjective";
import AdDesign from "../Screens/CampaignCreate/AdDesign";
import AdDetails from "../Screens/CampaignCreate/AdDetails";
export default createStackNavigator(
  {
    AdType: AdType,
    AdObjective: AdObjective,
    AdDesign: AdDesign,
    AdDetails: AdDetails
  },
  {
    initialRouteName: "AdDetails",
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
