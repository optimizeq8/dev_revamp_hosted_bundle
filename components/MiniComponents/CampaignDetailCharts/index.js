import React, { Component } from "react";
import { View } from "react-native";
import Chart from "./Charts";

class CampaignCard extends Component {
  render() {
    let campaign = this.props.campaign;
    let charts = [
      { spend: campaign.spends },
      { impressions: campaign.impressions },
      { swipes: campaign.swipes }
    ].map((category, i) => <Chart chartCategory={category} key={i} />);
    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        {charts}
      </View>
    );
  }
}

export default CampaignCard;
