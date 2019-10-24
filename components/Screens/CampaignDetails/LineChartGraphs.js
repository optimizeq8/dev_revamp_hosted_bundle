import React, { Component } from "react";
import { Text, View } from "react-native";
import LineGraph from "./LineGraph";
export default class LineChartGraphs extends Component {
  render() {
    return (
      <View
        style={{
          alignSelf: "center",
          flex: 1
        }}
      >
        <LineGraph
          screenProps={this.props.screenProps}
          chartChoice={this.props.chartChoice}
        />
      </View>
    );
  }
}
