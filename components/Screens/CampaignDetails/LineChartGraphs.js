import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import LineChart from "./line-chart";
import LineChartDevider from "../../../assets/SVGs/LineChartDevider.svg";
import styles from "./styles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLabel,
  VictoryAxis
} from "victory-native";
import LineGraph from "./LineGraph";
export default class LineChartGraphs extends Component {
  render() {
    let campaign = this.props.campaign;

    return (
      <View
        style={{
          paddingLeft: 25
        }}
      >
        <LineGraph
          chartChoice={this.props.chartChoice}
          chartCategory={campaign.spends}
        />
      </View>
    );
  }
}
