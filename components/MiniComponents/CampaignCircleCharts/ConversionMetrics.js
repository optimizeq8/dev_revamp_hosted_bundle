import React, { Component } from "react";
import { View } from "react-native";
import formatNumber from "../../formatNumber";
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
      { label: "swipes", value: campaign.swipes },
      ...conversionMetric,
      ...[
        {
          label: "Reach",
          value: campaign
            ? campaign.objective === "BRAND_AWARENESS"
              ? formatNumber(campaign.cpm, false, true)
              : campaign.reach
            : 0,
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