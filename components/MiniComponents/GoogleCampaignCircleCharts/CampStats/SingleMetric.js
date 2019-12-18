import React, { Component } from "react";
import { Text, View } from "react-native";
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
      <View
        style={[
          styles.metricsStyle,
          { backgroundColor: detail ? "#0004" : "#0000" }
        ]}
      >
        {Icon && (
          <Icon
            width={heightPercentageToDP(3)}
            height={heightPercentageToDP(3)}
            fill="#fff"
            style={{ marginRight: 10 }}
          />
        )}
        {!loadingCampaignStats ? (
          <Text
            style={{
              color: "#fff",
              fontFamily: "montserrat-bold",
              fontSize: 12,
              textAlign: "left",
              textTransform: "uppercase"
            }}
          >
            {translate(metric)}
            {/* {metric} */}
            {"\n "}
            <Text style={[globalStyles.numbers]}>
              {formatNumber(metricValue, true)}
            </Text>
          </Text>
        ) : (
          <PlaceholderLine width={70} />
        )}
      </View>
    );
  }
}
