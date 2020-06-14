import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import GlobalStyles from "../../../../GlobalStyles";

import Box from "./Box";
export default class BoxStats extends Component {
  getStats = selectedCampaign => {
    switch (selectedCampaign && selectedCampaign.objective) {
      case "BRAND_AWARENESS":
        return [
          <Box
            key={"BRAND_AWARENESS 1"}
            title={"Impressions"}
            info={selectedCampaign.video_views}
            screenProps={this.props.screenProps}
          />,
          <Box
            key={"BRAND_AWARENESS 2"}
            title={"CPM"}
            dollar={true}
            info={selectedCampaign.cpm}
            screenProps={this.props.screenProps}
          />
        ];
      case "TRAFFIC":
      case "WEB_CONVERSION":
        return [
          <Box
            key={"TRAFFIC 1"}
            title={"Swipe Ups"}
            info={selectedCampaign.swipes}
            screenProps={this.props.screenProps}
          />,
          <Box
            key={"TRAFFIC 2"}
            title={"Cost Per Swipe Up"}
            dollar={true}
            info={selectedCampaign.eCPSU}
            screenProps={this.props.screenProps}
          />
        ];
      case "APP_INSTALLS":
        return [
          <Box
            key={"APP_INSTALLS 1"}
            title={"Swipe Ups"}
            info={selectedCampaign.swipes}
            screenProps={this.props.screenProps}
          />,
          <Box
            key={"APP_INSTALLS 2"}
            title={"Cost Per Swipe Up"}
            info={selectedCampaign.eCPSU}
            dollar={true}
            screenProps={this.props.screenProps}
          />
          // <Box
          //   key={"APP_INSTALLS 1"}
          //   title={"App Installs"}
          //   info={selectedCampaign.total_installs}
          // />,
          // <Box
          //   key={"APP_INSTALLS 2"}
          //   title={"Cost per App Install"}
          //   info={selectedCampaign.eCPI}
          // />
        ];
      case "VIDEO_VIEWS":
        return [
          <Box
            key={"VIDEO_VIEWS 1"}
            title={"Video Views"}
            info={selectedCampaign.swipes}
            screenProps={this.props.screenProps}
          />,
          <Box
            key={"VIDEO_VIEWS 2"}
            title={"Cost per Video View"}
            dollar={true}
            info={selectedCampaign.eCPV}
            screenProps={this.props.screenProps}
          />
        ];
      default:
        break;
    }
  };
  render() {
    let selectedCampaign = this.props.selectedCampaign;

    return (
      <View style={styles.boxStatsRow}>{this.getStats(selectedCampaign)}</View>
    );
  }
}
