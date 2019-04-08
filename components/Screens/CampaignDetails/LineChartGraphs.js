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
    let Graphs = [
      { Spend: campaign.spends },
      { Impressions: campaign.impressions },
      { Swipes: campaign.swipes }
    ].map((category, i) => <LineGraph chartCategory={category} key={i} />);
    return (
      <View
        style={{
          paddingTop: 30,
          paddingLeft: 25,
          paddingBottom: heightPercentageToDP("34")
        }}
      >
        {Graphs}
      </View>
    );
  }
}
