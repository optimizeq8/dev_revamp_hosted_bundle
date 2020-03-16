import React, { Component } from "react";
import { Text, View } from "react-native";
import LineGraph from "./LineGraph";
export default class LineChartGraphs extends Component {
  render() {
    // console.log("this.props.campaignStats", this.props.campaignStats);
    return (
      <LineGraph
        screenProps={this.props.screenProps}
        chartChoice={this.props.chartChoice}
        // campaignStats={stats}
        campaignStats={this.props.campaignStats}
      />
    );
  }
}
