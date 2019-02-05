import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AuthNavigator from "./AuthNavigator";

export default createAppContainer(
  createSwitchNavigator({
    Aut: AuthNavigator
  })
);
