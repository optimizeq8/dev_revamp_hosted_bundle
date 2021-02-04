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
import TwitterIcon from "../../../../assets/SVGs/CampaignDetail/TwitterIcon";
import SnapchatIcon from "../../../../assets/SVGs/CampaignDetail/SnapchatIcon";
import WebsiteIcon from "../../../../assets/SVGs/CampaignDetail/WebsiteIcon";
import LinkedInIcon from "../../../../assets/SVGs/CampaignDetail/LinkedInIcon";

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
        if (metricValue === 0) {
          return null;
        }
        Icon = LocationClicksIcon;
        break;
      case "instagram clicks":
        Icon = InstagramIcon;
        break;
      case "website clicks":
        if (metricValue === 0) {
          return null;
        }
        Icon = WebsiteIcon;
        break;
      case "snapchat clicks":
        if (metricValue === 0) {
          return null;
        }
        Icon = SnapchatIcon;
        break;
      case "twitter clicks":
        if (metricValue === 0) {
          return null;
        }
        Icon = TwitterIcon;
        break;
      case "linkedin clicks":
        if (metricValue === 0) {
          return null;
        }
        Icon = LinkedInIcon;
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
