import React, { Component } from "react";
import { View, Text } from "react-native";
import Chart from "../CampaignCard/Charts";
import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles from "../../../GlobalStyles";
import styles from "./styles";
import formatNumber from "../../formatNumber";
import { heightPercentageToDP } from "react-native-responsive-screen";
class CampaignCard extends Component {
  render() {
    let campaign = this.props.campaign;
    let charts = [
      { spend: campaign ? campaign.spends : 0 }
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
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {charts}
        <View>
          <View style={styles.campaignIcons}>
            <ImpressionsIcons
              height={heightPercentageToDP(3)}
              width={heightPercentageToDP(3)}
              style={{ bottom: 3 }}
            />
            <View style={styles.campaignInfo}>
              <Text
                style={[GlobalStyles.numbers, styles.campaignNumbers]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {formatNumber(campaign ? campaign.impressions : 0, true)}
              </Text>
              <Text style={[styles.subtext]}>Impressions</Text>
            </View>
          </View>
          <View style={styles.campaignIcons}>
            <SwipeUpsIcon
              height={heightPercentageToDP(3)}
              width={heightPercentageToDP(3)}
            />
            <View style={styles.campaignInfo}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[GlobalStyles.numbers, styles.campaignNumbers]}
              >
                {campaign && campaign.objective !== "BRAND_AWARENESS"
                  ? formatNumber(campaign ? campaign.swipes : 0, true)
                  : campaign
                  ? campaign.cpm
                  : 0}
              </Text>
              <Text style={[styles.subtext]}>
                {campaign && campaign.objective !== "BRAND_AWARENESS"
                  ? "Swipe Ups"
                  : "CPM"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CampaignCard;
