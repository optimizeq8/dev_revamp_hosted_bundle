import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../styles";
import formatNumber from "../../../formatNumber";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import ImpressionsIcon from "../../../../assets/SVGs/Performance/Impressions";
import SpendIcon from "../../../../assets/SVGs/Performance/Spend";
import ClicksIcon from "../../../../assets/SVGs/Performance/Clicks";
import CPCIcon from "../../../../assets/SVGs/Performance/CPC";
import CTRIcon from "../../../../assets/SVGs/Performance/CTR";
import CPIIcon from "../../../../assets/SVGs/CampaignDetail/CPIIcon";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Small } from "../../../MiniComponents/StyledComponents";
export default class SingleMetric extends Component {
  render() {
    let {
      loadingCampaignStats,
      metric,
      metricValue,
      translate,
      detail,
    } = this.props;
    let Icon = null;

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
            style={styles.metricIcon}
          />
        )}
        {!loadingCampaignStats ? (
          <View
            style={[
              styles.metricView,
              {
                flexDirection: detail ? "column" : "column-reverse",
              },
            ]}
          >
            <Text
              style={[
                {
                  fontFamily: detail ? "montserrat-bold" : "montserrat-regular",
                },
                styles.metricText,
              ]}
            >
              {translate(metric)}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Small
                style={[
                  (styles.numbers,
                  {
                    fontSize: 10,
                    color: "#FF9D00",
                    fontFamily: "montserrat-regular",
                  }),
                ]}
              >
                {metric === "cpc" || metric === "cpm" ? "$" : ""}
              </Small>
              <Text
                style={[
                  styles.numbers,
                  ,
                  detail && { fontFamily: "montserrat-regular" },
                ]}
              >
                {formatNumber(
                  Number.isInteger(metricValue)
                    ? metricValue
                    : parseFloat(metricValue).toFixed(2),
                  true
                )}
              </Text>
              <Small
                style={[(styles.numbers, { fontSize: 10, color: "#FF9D00" })]}
              >
                {metric === "ctr" ? "%" : ""}
              </Small>
            </View>
          </View>
        ) : (
          <PlaceholderLine width={70} />
        )}
      </View>
    );
  }
}
