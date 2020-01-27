import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import formatNumber from "../../../formatNumber";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import globalStyles from "../../../../GlobalStyles";
import ImpressionsIcons from "../../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SpendIcons from "../../../../assets/SVGs/SpendingIcon";
import FrequencyIcon from "../../../../assets/SVGs/CampaignDetail/FrequencyIcon";
import CPIIcon from "../../../../assets/SVGs/CampaignDetail/CPIIcon";
import CPVIcon from "../../../../assets/SVGs/CampaignDetail/CPVIcon";
import ReachIcon from "../../../../assets/SVGs/CampaignDetail/ReachIcon";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default class SingleMetric extends Component {
  render() {
    let { loadingCampaignStats, metric, metricValue, translate } = this.props;
    let Icon = null;
    switch (metric) {
      case "impressions":
        Icon = ImpressionsIcons;
        break;
      case "spend":
        Icon = SpendIcons;
        break;
      case "cpm":
        Icon = CPIIcon;
        break;
      case "Paid Frequency":
        Icon = FrequencyIcon;
        break;
      case "Reach":
        Icon = ReachIcon;
        break;
      default:
      case "eCPV":
        Icon = CPVIcon;
        break;
    }
    return (
      <View style={styles.metricsStyle}>
        {Icon && (
          <Icon
            width={heightPercentageToDP(3)}
            height={heightPercentageToDP(3)}
            fill="#fff"
            style={{ marginRight: 10 }}
          />
        )}
        {!loadingCampaignStats ? (
          <Text style={[styles.title]}>
            {translate(metric)}
            {"\n "}
            <Text
              style={[styles.numbers, { fontFamily: "montserrat-regular" }]}
            >
              {formatNumber(
                Number.isInteger(metricValue)
                  ? metricValue
                  : parseFloat(metricValue).toFixed(2),
                !metric.toLowerCase().includes("c")
              )}
            </Text>
          </Text>
        ) : (
          <PlaceholderLine width={70} />
        )}
      </View>
    );
  }
}
