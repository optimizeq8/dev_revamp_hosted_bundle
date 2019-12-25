import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styles from "../styles";
import formatNumber from "../../../formatNumber";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import globalStyles from "../../../../GlobalStyles";
import ImpressionsIcon from "../../../../assets/SVGs/Performance/Impressions";
import SpendIcon from "../../../../assets/SVGs/Performance/Spend";
import ClicksIcon from "../../../../assets/SVGs/Performance/Clicks";
import CPCIcon from "../../../../assets/SVGs/Performance/CPC";
import CTRIcon from "../../../../assets/SVGs/Performance/CTR";
import CPIIcon from "../../../../assets/SVGs/CampaignDetail/CPIIcon";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default class SingleMetric extends Component {
  render() {
    let {
      loadingCampaignStats,
      metric,
      metricValue,
      translate,
      detail
    } = this.props;
    let Icon = null;
    // console.log("metric", metric);

    switch (metric) {
      case "impressions":
        Icon = ImpressionsIcon;
        break;
      case "spend":
        Icon = SpendIcon;
        break;
      case "cpm":
        Icon = CPIIcon;
        break;
      case "cpc":
        Icon = CPCIcon;
        break;
      case "ctr":
        Icon = CTRIcon;
        break;
      case "clicks":
        Icon = ClicksIcon;
    }
    return (
      <View style={[detail ? styles.metricsStyle : styles.metricsCardStyle]}>
        {Icon && (
          <Icon
            width={heightPercentageToDP(3)}
            height={heightPercentageToDP(3)}
            fill="#fff"
            style={{ marginRight: 10 }}
          />
        )}
        {!loadingCampaignStats ? (
          <View
            style={{
              display: "flex",
              flexDirection: detail ? "column" : "column-reverse"
            }}
          >
            <Text
              uppercase
              style={{
                color: "#fff",
                fontFamily: detail ? "montserrat-bold" : "montserrat-regular",
                fontSize: 12,
                textAlign: "left"
              }}
            >
              {translate(metric)}
            </Text>
            <Text style={[styles.numbers, { textAlign: "left" }]}>
              {formatNumber(metricValue, true)}
            </Text>
          </View>
        ) : (
          <PlaceholderLine width={70} />
        )}
      </View>
    );
  }
}
