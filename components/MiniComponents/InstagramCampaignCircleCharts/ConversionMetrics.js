import React, { Component } from "react";
import { Text, View } from "react-native";
import formatNumber from "../../formatNumber";
import styles from "./styles";
import ReachIcon from "../../../assets/SVGs/CampaignDetail/ReachIcon";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import SingleMetric from "../../Screens/InstagramCampaignDetails/CampStats/SingleMetric";

export default class ConversionMetrics extends Component {
  renderMetrics = (item) => {
    const { translate } = this.props;
    return (
      <View key={item[0].label}>
        <SingleMetric
          translate={translate}
          loadingCampaignStats={this.props.loadingCampaignStats}
          metricValue={item[0].value}
          metric={item[0].label}
        />
        {item.length > 1 && (
          <SingleMetric
            key={item[1].label}
            translate={translate}
            loadingCampaignStats={this.props.loadingCampaignStats}
            metricValue={item[1].value}
            metric={item[1].label}
          />
        )}
        {item.length > 2 && (
          <SingleMetric
            key={item[2].label}
            translate={translate}
            loadingCampaignStats={this.props.loadingCampaignStats}
            metricValue={item[2].value}
            metric={item[2].label}
          />
        )}
      </View>
    );
  };

  render() {
    let {
      detail,
      metric,
      translate,
      conversionMetric,
      campaign,
      mediaChannel,
    } = this.props;

    let metrics = [];
    let objectiveMetric = [];
    objectiveMetric = [
      { label: "Clicks", value: campaign.clicks },
      ...conversionMetric,
      ...[
        {
          label: "Reach",
          value: formatNumber(
            campaign
              ? campaign.objective === "BRAND_AWARENESS"
                ? campaign.cpm
                : mediaChannel === "instagram"
                ? campaign.clicks
                : campaign.swipes
              : 0,
            campaign.objective !== "BRAND_AWARENESS",
            campaign.objective === "BRAND_AWARENESS"
          ),
        },
        {
          label: "Frequency",
          value: parseFloat(campaign.paid_frequency).toFixed(2),
        },
      ],
    ];
    while (objectiveMetric.length > 0)
      metrics.push(objectiveMetric.splice(0, 3));
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: RFValue(2.5, 414),
        }}
      >
        {metrics.map((metric) => this.renderMetrics(metric))}
      </View>
    );
  }
}
