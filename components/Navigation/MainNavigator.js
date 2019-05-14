import React from "react";
import { Platform } from "react-native";
import { FluidNavigator } from "react-navigation-fluid-transitions";

import { createStackNavigator } from "react-navigation";
import Home from "../Screens/Home";
import Menu from "../Screens/Menu";
import Dashboard from "../Screens/Dashboard";
import SnapchatCreateAdAcc from "../Screens/SnapchatCreateAdAcc";
import CreateBusinessAccount from "../Screens/CreateBusinessAccount";
import CampaignDetails from "../Screens/CampaignDetails";
import BusinessList from "../Screens/BusinessList";
import ChangePassword from "../Screens/Change Password/";
import AddressForm from "../Screens/AddressForm";
import TransactionList from "../Screens/Transactions";
import PersonalInfo from "../Screens/PersonalInfo";
import Wallet from "../Screens/Wallet";
import MultiSelect from "../MiniComponents/MultiSelect/MultiSelect";

export default FluidNavigator(
  {
    Home: Home,
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
    Wallet: Wallet
  },
  {
    initialRouteName: "Dashboard",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: true,
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
