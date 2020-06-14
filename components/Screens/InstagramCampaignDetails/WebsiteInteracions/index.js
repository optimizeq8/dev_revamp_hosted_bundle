import React, { Component, PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

//icons
import SingleMetric from "./SingleMetric";

/**
 * Component to display  the metrics for SME campaigns
 * @class
 */
class WebsiteInteracions extends PureComponent {
  renderMetrics = item => {
    const { translate } = this.props.screenProps;

    return (
      <View key={item[0].metric}>
        <SingleMetric
          translate={translate}
          loadingCampaignStats={this.props.loadingCampaignStats}
          {...item[0]}
        />
        {item.length > 1 && (
          <SingleMetric
            key={item[1].metric}
            translate={translate}
            loadingCampaignStats={this.props.loadingCampaignStats}
            {...item[1]}
          />
        )}
        {item.length > 2 && (
          <SingleMetric
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
    let { smeMetrics } = this.props;

    let metrics = [];
    let objectiveMetric = [...smeMetrics];

    while (objectiveMetric.length > 0)
      metrics.push(objectiveMetric.splice(0, 3));

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
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
  smeMetrics: state.dashboard.smeMetrics
});
export default connect(mapStateToProps, null)(WebsiteInteracions);
