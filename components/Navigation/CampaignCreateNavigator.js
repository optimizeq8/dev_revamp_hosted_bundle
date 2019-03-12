import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import AdType from "../Screens/CampaignCreate/AdType";
import AdObjective from "../Screens/CampaignCreate/AdObjective";
import AdDesign from "../Screens/CampaignCreate/AdDesign";
import AdDetails from "../Screens/CampaignCreate/AdDetails";
import AdDesignReview from "../Screens/CampaignCreate/AdDesignReview";
import SwipeUpDestination from "../Screens/CampaignCreate/SwipeUpDestination";
import SwipeUpChoice from "../Screens/CampaignCreate/SwipeUpChoice";
export default createStackNavigator(
  {
    AdType: AdType,
    AdObjective: AdObjective,
    AdDesign: AdDesign,
    AdDetails: AdDetails,
    AdDesignReview: AdDesignReview,
    SwipeUpDestination: SwipeUpDestination,
    SwipeUpChoice: SwipeUpChoice
  },
  {
    initialRouteName: "AdType",
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
