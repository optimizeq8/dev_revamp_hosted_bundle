import React, { Component } from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../styles";
import formatNumber from "../../../formatNumber";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import globalStyles from "../../../../GlobalStyles";
import ImpressionsIcons from "../../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import SpendIcons from "../../../../assets/SVGs/SpendingIcon";
import FrequencyIcon from "../../../../assets/SVGs/CampaignDetail/FrequencyIcon";
import CPIIcon from "../../../../assets/SVGs/CampaignDetail/CPIIcon";
import CPVIcon from "../../../../assets/SVGs/CampaignDetail/CPVIcon";
import ReachIcon from "../../../../assets/SVGs/CampaignDetail/ReachIcon";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Small } from "../../../MiniComponents/StyledComponents";

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
      case "Frequency":
        Icon = FrequencyIcon;
        break;
      case "Reach":
        Icon = ReachIcon;
        break;
      case "swipeup rate":
        Icon = SwipeUpsIcon;
        break;
      case "Clicks":
        Icon = SwipeUpsIcon;
        break;
      default:
      case "eCPV":
        Icon = CPVIcon;
        break;
      case "swipes":
        Icon = SwipeUpsIcon;
        break;
    }
    return (
      <View style={styles.metricsStylePurple}>
        {Icon && (
          <Icon
            width={heightPercentageToDP(3)}
            height={heightPercentageToDP(3)}
            fill="#fff"
            style={{ marginRight: RFValue(5, 414) }}
          />
        )}
        {!loadingCampaignStats ? (
          <View style={{ width: "80%" }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={[styles.title, globalStyles.whiteTextColor]}
            >
              {translate(metric)}
              {metric.toLowerCase() === "cpm" && translate("(USD)")}
            </Text>
            <View style={globalStyles.row}>
              {((metric.toLowerCase().includes("c") &&
                metric.toLowerCase() !== "ctr" &&
                metric.toLowerCase() !== "link click" &&
                metric.toLowerCase() !== "reach" &&
                metric.toLowerCase() !== "frequency" &&
                metric.toLowerCase() !== "purchases" &&
                metric.toLowerCase() !== "clicks") ||
                metric.toLowerCase() === "roas") && (
                <Small
                  style={[
                    styles.numbers,
                    {
                      fontSize: RFValue(4.5, 414),
                      fontFamily: "montserrat-regular",
                    },
                  ]}
                >
                  $
                </Small>
              )}
              <Text
                style={[styles.numbers, { fontFamily: "montserrat-regular" }]}
              >
                {formatNumber(
                  Number.isInteger(metricValue) ||
                    metric.toLowerCase() === "clicks" ||
                    metric.toLowerCase() === "link click" ||
                    metric.toLowerCase() === "impressions" ||
                    metric.toLowerCase() === "reach"
                    ? metricValue
                    : metric.toLowerCase() === "purchases"
                    ? Math.round(parseFloat(metricValue))
                    : parseFloat(metricValue).toFixed(2),
                  true
                )}
              </Text>
              {metric.toLowerCase() === "ctr" && (
                <Small
                  style={[
                    styles.numbers,
                    {
                      fontSize: RFValue(4.5, 414),
                      fontFamily: "montserrat-regular",
                    },
                  ]}
                >
                  %
                </Small>
              )}
            </View>
          </View>
        ) : (
          <PlaceholderLine width={RFValue(35, 414)} />
        )}
      </View>
    );
  }
}
