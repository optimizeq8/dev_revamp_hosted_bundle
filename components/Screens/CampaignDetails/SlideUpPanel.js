import React, { Component } from "react";
import { View, RefreshControl, Animated, ScrollView } from "react-native";
import LineChartGraphs from "./LineChartGraphs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import styles from "./styles";
import ChartChoices from "./ChartChoices";
import WebsiteInteracions from "./WebsiteInteracions";

export default class SlideUpPanel extends Component {
  _draggedValue = new Animated.Value(0);
  draggableRange = {
    top: hp(80),
    bottom: hp(27),
  };
  state = {
    chartAnimation: new Animated.Value(1),
    LineAnimation: new Animated.Value(0),
    chartChoice: "Spend",
    gotStats: false,
    refreshing: false,
  };
  componentDidMount() {
    this.props.getCampaignStats(this.props.selectedCampaign, {
      // start_time: "2019-05-09",
      // end_time: "2019-05-25"
      start_time: this.props.selectedCampaign.start_time,
      end_time:
        new Date(this.props.selectedCampaign.end_time) < new Date()
          ? this.props.selectedCampaign.end_time
          : new Date(),
    });
  }

  _onRefresh = async (selectedCampaign) => {
    this.setState({ refreshing: true });
    await this.props.getCampaignStats(selectedCampaign, {
      // start_time: "2019-05-09",
      // end_time: "2019-05-25"
      start_time: selectedCampaign.start_time,
      end_time:
        new Date(selectedCampaign.end_time) < new Date()
          ? selectedCampaign.end_time
          : new Date(),
    });
    this.setState({ refreshing: false });
  };
  changeChart = (chartChoice) => {
    this.setState({ chartChoice });
  };

  render() {
    const { translate } = this.props.screenProps;
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
          refreshControl={
            <RefreshControl
              tintColor={"#fff"}
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh(selectedCampaign)}
            />
          }
          style={{ zIndex: 2 }}
          contentContainerStyle={{
            zIndex: 2,
            paddingBottom: 10,
            flex: 1, // needed to occupy major graph part
          }}
          showsHorizontalScrollIndicator={false}
        >
          {this.state.chartChoice !== "website interactions" ? (
            <LineChartGraphs
              screenProps={this.props.screenProps}
              chartChoice={this.state.chartChoice}
              campaign={selectedCampaign}
            />
          ) : (
            <WebsiteInteracions screenProps={this.props.screenProps} />
          )}
        </ScrollView>
      </View>
    );
  }
}
