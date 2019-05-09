import React, { Component } from "react";
import { View, Text } from "react-native";
import Chart from "../CampaignCard/Charts";
import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles from "../../../Global Styles";
import styles from "./styles";
import { widthPercentageToDP } from "react-native-responsive-screen";
class CampaignCard extends Component {
  render() {
    let campaign = this.props.campaign;
    let charts = [
      { spend: campaign.spends }
      // { impressions: campaign.impressions },
      // { swipes: campaign.swipes }
    ].map((category, i) => (
      <Chart
        campaign={campaign}
        detail={true}
        chartCategory={category}
        key={i}
      />
    ));
    return (
      <View
        style={{
          top: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {charts}
        <View style={{}}>
          <View style={{ top: 10, left: 10, flexDirection: "row" }}>
            <ImpressionsIcons />
            <View
              style={{
                flexDirection: "column",
                width: widthPercentageToDP(40)
              }}
            >
              <Text
                style={[GlobalStyles.numbers, { flex: 0 }]}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {campaign.impressions}
              </Text>
              <Text style={[styles.subtext, { textAlign: "center" }]}>
                Impressions
              </Text>
            </View>
          </View>
          <View
            style={{
              top: 10,
              left: 10,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <SwipeUpsIcon />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                flex: 1
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={[GlobalStyles.numbers, { alignSelf: "center" }]}
              >
                {campaign.swipes}
              </Text>
              <Text style={[styles.subtext, { textAlign: "center" }]}>
                Swipe Ups
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CampaignCard;
