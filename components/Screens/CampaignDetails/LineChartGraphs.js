import React, { Component } from "react";
import { Text, View } from "react-native";
import LineGraph from "./LineGraph";
export default class LineChartGraphs extends Component {
  render() {
    return (
      <View
        style={{
          paddingLeft: 25,
          zIndex: 3
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
