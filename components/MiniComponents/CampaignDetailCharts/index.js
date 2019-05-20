import React, { Component } from "react";
import { View, Text } from "react-native";
import Chart from "../CampaignCard/Charts";
import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles from "../../../Global Styles";
import styles from "./styles";
import formatNumber from "../../formatNumber";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
                {formatNumber(campaign.impressions, true)}
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
                {campaign.objective !== "BRAND_AWARENESS"
                  ? formatNumber(campaign.swipes, true)
                  : campaign.impressions > 0
                  ? (parseFloat(campaign.spends) /
                      parseFloat(campaign.impressions)) *
                    1000
                  : 0}
              </Text>
              <Text style={[styles.subtext]}>
                {campaign.objective !== "BRAND_AWARENESS" ? "Swipe Ups" : "CPM"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CampaignCard;
