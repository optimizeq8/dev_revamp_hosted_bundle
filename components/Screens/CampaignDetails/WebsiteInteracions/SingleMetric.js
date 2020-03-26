import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import formatNumber from "../../../formatNumber";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import globalStyles from "../../../../GlobalStyles";
import ImpressionsIcons from "../../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import InstagramIcon from "../../../../assets/SVGs/InstagramIcon";
import MobileIcon from "../../../../assets/SVGs/CampaignDetail/MobileIcon";
import WhatsAppIcon from "../../../../assets/SVGs/SwipeUps/WhatsApp";
import LocationClicksIcon from "../../../../assets/SVGs/CampaignDetail/LocationClicksIcon";
import YoutubeIcon from "../../../../assets/SVGs/CampaignDetail/YoutubeIcon";

import { heightPercentageToDP } from "react-native-responsive-screen";

export default class SingleMetric extends Component {
  render() {
    let { loadingCampaignStats, metric, metricValue, translate } = this.props;
    let Icon = null;
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
      <View style={[styles.metricsStyle, { marginVertical: 20 }]}>
        {Icon && (
          <Icon
            width={heightPercentageToDP(4)}
            height={heightPercentageToDP(4)}
            fill="#fff"
            style={{ marginRight: 10 }}
          />
        )}
        {!loadingCampaignStats ? (
          <Text style={[styles.title]}>
            {translate(metric)}
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
