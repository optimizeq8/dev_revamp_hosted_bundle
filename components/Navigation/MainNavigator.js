import React from "react";
import { Platform } from "react-native";
import { FluidNavigator } from "react-navigation-fluid-transitions";

import { createStackNavigator } from "react-navigation";
import Menu from "../Screens/Menu";
import Dashboard from "../Screens/Dashboard";
import SnapchatCreateAdAcc from "../Screens/SnapchatCreateAdAcc";
import CreateBusinessAccount from "../Screens/CreateBusinessAccount";
import CampaignDetails from "../Screens/CampaignDetails";
import BusinessList from "../Screens/BusinessList";
import ChangePassword from "../Screens/ChangePassword/";
import AddressForm from "../Screens/AddressForm";
import TransactionList from "../Screens/Transactions";
import PersonalInfo from "../Screens/PersonalInfo";
import Wallet from "../Screens/Wallet";
import MultiSelect from "../MiniComponents/MultiSelect/MultiSelect";

import AdType from "../Screens/CampaignCreate/AdType";
import AdObjective from "../Screens/CampaignCreate/AdObjective";
import AdDesign from "../Screens/CampaignCreate/AdDesign";
import AdDetails from "../Screens/CampaignCreate/AdDetails";
import AdDesignReview from "../Screens/CampaignCreate/AdDesignReview";
import SwipeUpDestination from "../Screens/CampaignCreate/SwipeUpDestination";
import SwipeUpChoice from "../Screens/CampaignCreate/SwipeUpChoice";
import AdPaymentReview from "../Screens/CampaignCreate/AdPaymentReview";
import PaymentForm from "../Screens/PaymentForm";
import ErrorRedirect from "../Screens/ErrorRedirect";
import SuccessRedirect from "../Screens/SuccessRedirect";
import Animated, { Easing } from "react-native-reanimated";

export default FluidNavigator(
  {
    Menu: { screen: Menu, navigationOptions: { gesturesEnabled: false } },
    Dashboard: Dashboard,
    SnapchatCreateAdAcc: SnapchatCreateAdAcc,
    CreateBusinessAccount: CreateBusinessAccount,
    CampaignDetails: CampaignDetails,
    BusinessList: BusinessList,
    ChangePassword: ChangePassword,
    AddressForm: AddressForm,
    PersonalInfo: PersonalInfo,
    MultiSelect: MultiSelect,
    TransactionList: TransactionList,
    Wallet: Wallet,
    AdType: AdType,
    AdObjective: AdObjective,
    AdDesign: { screen: AdDesign, path: "ad_design/" },
    AdDetails: AdDetails,
    AdDesignReview: AdDesignReview,
    SwipeUpDestination: SwipeUpDestination,
    SwipeUpChoice: SwipeUpChoice,
    AdPaymentReview: AdPaymentReview,
    AddressForm: AddressForm,
    PaymentForm: PaymentForm,

    ErrorRedirect: {
      screen: ErrorRedirect,
      path: "error/"
    },
    SuccessRedirect: {
      screen: SuccessRedirect,
      path: "success/"
    }
    //     PaymentForm: {
    //       screen: PaymentForm
    //     }
  },

  {
    transConfig,

    initialRouteName: "Dashboard",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: true,
      headerStyle: {
        backgroundColor: "#0000"
      },
      headerTintColor: "#0000",
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "#0000",
      opacity: 1
    }
  }
);

const transConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});
