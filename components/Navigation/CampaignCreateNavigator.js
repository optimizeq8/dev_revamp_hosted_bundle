import React from "react";
import { Platform, Animated, Easing } from "react-native";
import { FluidNavigator } from "react-navigation-fluid-transitions";

import { createStackNavigator } from "react-navigation";
import AdType from "../Screens/CampaignCreate/AdType";
import AdObjective from "../Screens/CampaignCreate/AdObjective";
import AdDesign from "../Screens/CampaignCreate/AdDesign";
import AdDetails from "../Screens/CampaignCreate/AdDetails";
import AdDesignReview from "../Screens/CampaignCreate/AdDesignReview";
import SwipeUpDestination from "../Screens/CampaignCreate/SwipeUpDestination";
import SwipeUpChoice from "../Screens/CampaignCreate/SwipeUpChoice";
import AdPaymentReview from "../Screens/CampaignCreate/AdPaymentReview";
import AddressForm from "../Screens/AddressForm";
import PaymentForm from "../Screens/PaymentForm";

export default FluidNavigator(
  {
    // Dashboard: Dashboard,
    AdType: AdType,
    AdObjective: AdObjective,
    AdDesign: { screen: AdDesign, path: "ad_design/" },
    AdDetails: AdDetails,
    AdDesignReview: AdDesignReview,
    SwipeUpDestination: SwipeUpDestination,
    SwipeUpChoice: SwipeUpChoice,
    AdPaymentReview: AdPaymentReview,
    AddressForm: AddressForm,
    PaymentForm: PaymentForm
  },
  // {
  //   duration: 6000,
  //   timing: Animated.timing,
  //   easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
  //   useNativeDriver: true
  // },

  {
    initialRouteName: "AdType",
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
      backgroundColor: "#751AFF"
    }
  }
);
