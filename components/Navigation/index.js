import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import CampaignCreateNavigator from "./CampaignCreateNavigator";
import PaymentNavigator from "./PaymentNavigator";

export default createAppContainer(
  createSwitchNavigator({
    AuthRoot: AuthNavigator,
    MainRoot: { screen: MainNavigator, path: "campaign_create"},

//     CampaignRoot: { screen: CampaignCreateNavigator, path: "campaign_create" },
    PaymentNavigator: {
      screen: PaymentNavigator,
      path: "payment"
    }
  })
);
