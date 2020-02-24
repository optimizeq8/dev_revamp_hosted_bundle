import React, { Component } from "react";
import { View, Animated, ScrollView } from "react-native";
import LineChartGraphs from "./LineChartGraphs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import styles from "./styles";
import ChartChoices from "./ChartChoices";

export default class SlideUpPanel extends Component {
  _draggedValue = new Animated.Value(0);
  draggableRange = {
    top: hp(80),
    bottom: hp(27)
  };
  state = {
    chartAnimation: new Animated.Value(1),
    LineAnimation: new Animated.Value(0),
    chartChoice: "Spend",
    gotStats: false,
    refreshing: false
  };

  _onRefresh = async selectedCampaign => {
    this.setState({ refreshing: true });
    await this.props.getCampaignStats(
      selectedCampaign.campaign.id,
      selectedCampaign.start_time,
      selectedCampaign.end_time
    );
    this.setState({ refreshing: false });
  };
  changeChart = chartChoice => {
    this.setState({ chartChoice });
  };

  render() {
    let selectedCampaign = this.props.selectedCampaign;
    this._draggedValue.addListener(({ value }) => {
      this.hideCharts(value);
    });

    return (
      <View style={[styles.bottomContainer]}>
        <ChartChoices
          screenProps={this.props.screenProps}
          changeChart={this.changeChart}
          selectedCampaign={selectedCampaign}
        />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100
          }}
        >
          <LineChartGraphs
            screenProps={this.props.screenProps}
            chartChoice={this.state.chartChoice}
            campaignStats={this.props.campaignStats}
          />
        </ScrollView>
      </View>
    );
  }
}
