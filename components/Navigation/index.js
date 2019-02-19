import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import CampaignCreateNavigator from "./CampaignCreateNavigator";

export default createAppContainer(
  createSwitchNavigator({
    AuthRoot: AuthNavigator,
    MainRoot: MainNavigator,
    CampaignRoot: CampaignCreateNavigator
  })
);
