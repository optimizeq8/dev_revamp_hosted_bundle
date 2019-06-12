import React, { Component } from "react";
import { ScrollView } from "react-native";
import CustomLabel from "./CustomLabel";
import { connect } from "react-redux";

import shortMonths from "./ShortMonths";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryAxis
} from "victory-native";
import chartData from "./ChartData";

class LineGraph extends Component {
  kFormatter = num => {
    return Math.abs(num) > 999
      ? (Math.abs(num) / 1000).toFixed(1) + " k"
      : Math.abs(num);
  };
  render() {
    let data = chartData;
    let category = [];
    if (this.props.campaignStats.length > 1) {
      data = this.props.campaignStats.map((stat, i) => {
        let date = new Date(stat.end_time.split("-07:00")[0]);
        let startDate = new Date(stat.start_time.split("-07:00")[0]);

        let day = date.getDate();
        let month = date.getMonth();
        let hour =
          startDate.getHours() +
          ":00" +
          "/" +
          date.getHours() +
          ":00" +
          "\n" +
          day +
          "/" +
          shortMonths[month];
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
              : this.props.chartChoice !== "Swipe-Ups" && stat.stats.swipes
        };
      });
    }

    return (
      <ScrollView horizontal style={{ height: 200 }}>
        <VictoryChart
          domainPadding={{ y: 10 }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={d => parseFloat(d.y).toFixed(0)}
              labelComponent={
                <CustomLabel
                  category={category}
                  chartChoice={this.props.chartChoice}
                />
              }
            />
          }
          padding={{ top: 60, bottom: 30, left: 50, right: 50 }}
          height={200}
          width={500}
        >
          <VictoryLine
            categories={{ x: category }}
            interpolation="cardinal"
            style={{
              data: {
                stroke: "#FFFC00",
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
            style={{
              axis: { stroke: "none" },
              tickLabels: {
                stroke: "#fff",
                fill: "#fff",
                fontFamily: "montserrat-bold",
                fontSize: 8
              },
              ticks: { stroke: "#fff", size: 5 }
            }}
          />
          <VictoryAxis
            tickCount={5}
            crossAxis
            offsetY={25}
            style={{
              axis: { stroke: "none" },
              ticks: { stroke: "#fff", size: 6, padding: 0 },
              tickLabels: {
                stroke: "#fff",
                fill: "#fff",
                fontFamily: "montserrat-bold",
                fontSize: 9,
                padding: 1
              }
            }}
          />
        </VictoryChart>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  campaignStats: state.dashboard.campaignStats,
  granularity: state.dashboard.granularity
});

export default connect(
  mapStateToProps,
  null
)(LineGraph);
