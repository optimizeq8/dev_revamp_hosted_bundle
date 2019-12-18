import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import CustomLabel from "./CustomLabel";
import { connect } from "react-redux";
import { BlurView } from "expo-blur";
import shortMonths from "./ShortMonths";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryArea
} from "victory-native";
import chartData from "./ChartData";
import styles from "./styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Defs, LinearGradient, Stop } from "react-native-svg";

class LineGraph extends Component {
  kFormatter = num => {
    return Math.abs(num) > 999
      ? (Math.abs(num) / 1000).toFixed(1) + " k"
      : Math.abs(num).toFixed(2);
  };
  render() {
    const { translate } = this.props.screenProps;
    let data = chartData;
    let category = [];
    if (this.props.campaignStats.length > 0) {
      data = this.props.campaignStats.map((stat, i) => {
        let date = new Date(stat.end_time.split("-07:00")[0]);
        let startDate = new Date(stat.start_time.split("-07:00")[0]);

        let day = new Date(stat.end_time.split("T")[0]).getDate();
        let month = date.getMonth();
        let hour = `${startDate.getHours()}:00 / ${date.getHours()}:00
${day}/${shortMonths[month]}`;
        if (this.props.granularity !== "DAY") category.push(hour);

        return {
          x:
            this.props.granularity !== "DAY"
              ? i
              : `${day}/${shortMonths[month]}`,
          y:
            this.props.chartChoice === "Spend"
              ? stat.stats.spend / 1000000
              : this.props.chartChoice === "Impressions"
              ? stat.stats.impressions
              : this.props.chartChoice === "Swipe Ups"
              ? stat.stats.swipes
              : this.props.chartChoice === "CPM"
              ? (parseFloat(stat.stats.spend / 1000000) /
                  parseFloat(stat.stats.impressions)) *
                1000
              : 0
        };
      });
    }

    return (
      <ScrollView
        scrollEnabled={this.props.campaignStats.length > 1}
        horizontal
        contentContainerStyle={{ bottom: 20, height: "100%", paddingTop: 20 }}
      >
        {this.props.campaignStats.length < 1 ? (
          <BlurView intensity={70} tint="dark" style={styles.placeHolderChart}>
            <Text style={styles.placeHolderChartText}>
              {translate("Not enough data to display")}
            </Text>
          </BlurView>
        ) : (
          <View
            style={[
              styles.placeHolderChart,
              styles.ScrollChartArea,
              {
                width: this.props.campaignStats.length < 1 ? wp(90) : wp(150)
              }
            ]}
          />
        )}
        <VictoryChart
          domainPadding={{ y: 15 }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => {
                return this.props.chartChoice === "Spend"
                  ? parseFloat(datum.y).toFixed(2)
                  : parseFloat(datum.y).toFixed(0);
              }}
              labelComponent={
                <CustomLabel
                  category={category}
                  chartChoice={this.props.chartChoice}
                />
              }
            />
          }
          padding={{ top: 70, bottom: 20, left: 50, right: 50 }}
          height={240}
          width={this.props.campaignStats.length < 1 ? wp(90) : wp(150)}
        >
          <Defs>
            <LinearGradient x1="0" y1="0" x2="0" y2="180" id="myGradient">
              <Stop offset="0%" stopColor="#FF7D08" />
              <Stop offset="5%" stopColor="#f07204" />
              <Stop offset="60%" stopColor="#000" />
            </LinearGradient>
          </Defs>
          <VictoryArea
            categories={{ x: category }}
            interpolation="cardinal"
            style={{
              data: {
                stroke: "#FF7D08",
                fill: "url(#myGradient)",
                strokeWidth: 5
              }
            }}
            data={data}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={t => this.kFormatter(t)}
            offsetX={45}
            tickCount={4}
            style={tickLabelStyles}
          />
          <VictoryAxis
            tickCount={5}
            crossAxis
            offsetY={25}
            style={tickLabelStyles}
          />
        </VictoryChart>
      </ScrollView>
    );
  }
}

let tickLabelStyles = {
  axis: { stroke: "none" },
  tickLabels: {
    stroke: "#fff",
    fill: "#fff",
    fontSize: 8,
    padding: 4
  },
  ticks: { stroke: "#fff", size: 5, padding: 0 }
};

const mapStateToProps = state => ({
  campaignStats: state.dashboard.campaignStats,
  granularity: state.dashboard.granularity
});

export default connect(mapStateToProps, null)(LineGraph);
