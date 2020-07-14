import React, { Component, PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

//icons
import SingleMetric from "./SingleMetric";

class CampaignStats extends PureComponent {
  renderMetrics = (item) => {
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
    let { instaCampaignMetrics } = this.props;

    let metrics = [];
    let objectiveMetric = [];
    objectiveMetric = instaCampaignMetrics;
    // filters out the unrelated metrics based on each objective
    // switch (selectedCampaign.objective) {
    //   case "BRAND_AWARENESS":
    //     objectiveMetric = instaCampaignMetrics.filter(
    //       (metric) =>
    //         ![
    //           "video views",
    //           "swipes",
    //           "eCPSU",
    //           "eCPV",
    //           "swipeup rate",
    //           "impressions",
    //           "spend",
    //         ].includes(metric.metric)
    //     );
    //     break;

    // case "TRAFFIC":
    //   objectiveMetric = instaCampaignMetrics.filter(
    //     (metric) =>
    //       !["video views", "eCPV", "spend", "swipes"].includes(metric.metric)
    //   );
    //   break;
    // case "WEB_CONVERSION":
    //   objectiveMetric = instaCampaignMetrics.filter(
    //     (metric) =>
    //       !["video views", "eCPV", "spend", "swipes"].includes(metric.metric)
    //   );
    //   break;
    // case "APP_INSTALLS":
    //   objectiveMetric = instaCampaignMetrics.filter(
    //     (metric) =>
    //       !["video views", "eCPV", "spend", "swipes"].includes(metric.metric)
    //   );
    //   break;
    // case "VIDEO_VIEWS":
    // objectiveMetric = instaCampaignMetrics.filter(
    //   (metric) => !["eCPSU", "spend", "swipes"].includes(metric.metric)
    // );
    // break;
    //   default:
    //     break;
    // }
    while (objectiveMetric.length > 0)
      metrics.push(objectiveMetric.splice(0, 3));

    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
        }}
      >
        {metrics.map((metric) => this.renderMetrics(metric))}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
  instaCampaignMetrics: state.dashboard.instaCampaignMetrics,
});
export default connect(mapStateToProps, null)(CampaignStats);
