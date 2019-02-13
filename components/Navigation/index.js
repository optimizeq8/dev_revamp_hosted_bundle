import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import CampaignCreateNavigator from "./CampaignCreateNavigator";

export default createAppContainer(
  createSwitchNavigator({
    CampaignRoot: CampaignCreateNavigator,
    AuthRoot: AuthNavigator
  })
);
