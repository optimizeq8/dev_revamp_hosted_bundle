import React, { Component, PureComponent } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import SingleMetric from "./SingleMetric";
//styles
import styles from "../styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
import formatNumber from "../../../formatNumber";

class CampaignStats extends PureComponent {
  renderMetrics = item => {
    const { translate } = this.props.screenProps;

    return (
      <View key={item[0].metric}>
        <SingleMetric
          detail={this.props.detail}
          translate={translate}
          loadingCampaignStats={this.props.loadingCampaignStats}
          {...item[0]}
        />
        {item.length > 1 && (
          <SingleMetric
            detail={this.props.detail}
            key={item[1].metric}
            translate={translate}
            loadingCampaignStats={this.props.loadingCampaignStats}
            {...item[1]}
          />
        )}
        {item.length > 2 && (
          <SingleMetric
            detail={this.props.detail}
            key={item[2].metric}
            translate={translate}
            loadingCampaignStats={this.props.loadingCampaignStats}
            {...item[2]}
          />
        )}
      </View>
    );
  };

  render() {
    let { googleCampaignOverall, detail } = this.props;
    const { translate } = this.props.screenProps;
    let campaignMetrics = [];
    Object.keys(googleCampaignOverall).map((metric, i) => {
      campaignMetrics.push({
        metric: metric,
        metricValue: googleCampaignOverall[metric]
      });
    });
    let metricsArr = ["impressions", "clicks", "spend"];
    let metrics = [];
    campaignMetrics = campaignMetrics.filter(
      metric => !metricsArr.includes(metric.metric)
    );

    while (campaignMetrics.length > 0)
      metrics.push(campaignMetrics.splice(0, 3));
    return (
      <View
        style={{
          flexDirection: "row",
          left: 10
        }}
      >
        {metrics.map(metric => this.renderMetrics(metric))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  googleCampaignOverall: state.dashboard.googleCampaignOverall,
  googleCampaignStats: state.dashboard.googleCampaignStats,
  loadingCampaignStats: state.dashboard.loadingCampaignStats
});
export default connect(mapStateToProps, null)(CampaignStats);
