import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import formatNumber from "../../../formatNumber";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
import ImpressionsIcons from "../../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import InstagramIcon from "../../../../assets/SVGs/Instagram";
import MobileIcon from "../../../../assets/SVGs/CampaignDetail/MobileIcon";
import WhatsAppIcon from "../../../../assets/SVGs/SwipeUps/WhatsApp";
import LocationClicksIcon from "../../../../assets/SVGs/CampaignDetail/LocationClicksIcon";
import YoutubeIcon from "../../../../assets/SVGs/CampaignDetail/YoutubeIcon";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default class SingleMetric extends Component {
  render() {
    let { loadingCampaignStats, metric, metricValue, translate } = this.props;
    let Icon = null;
    let iconFill = "#75647C";
    let iconStroke = "none";
    switch (metric) {
      case "call clicks":
        Icon = MobileIcon;
        break;
      case "whatsapp clicks":
        Icon = WhatsAppIcon;
        break;
      case "location clicks":
        Icon = LocationClicksIcon;
        break;
      case "instagram clicks":
        Icon = InstagramIcon;
        break;
      case "youtube clicks":
        if (metricValue === 0) {
          return null;
        }
        Icon = YoutubeIcon;
        break;

      default:
        Icon = ImpressionsIcons;
        break;
    }
    return (
      <View style={[styles.metricsStyle, { marginTop: 20 }]}>
        {Icon && (
          <Icon
            width={widthPercentageToDP(7)}
            height={heightPercentageToDP(4)}
            fill={iconFill}
            stroke={iconStroke}
            style={{ marginRight: 10 }}
          />
        )}
        {!loadingCampaignStats ? (
          <Text style={[styles.title]}>
            {translate(metric)}
            {"\n "}
            <Text style={[globalStyles.numbers, { color: globalColors.rum }]}>
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
