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
  VictoryArea,
  VictoryScatter
} from "victory-native";
import chartData from "./ChartData";
import styles from "./styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Defs, LinearGradient, Stop } from "react-native-svg";

class LineGraph extends Component {
  kFormatter = num => {
    return Math.abs(num) > 999
      ? (this.props.chartChoice === "Spend" ? "$" : "") +
          (Math.abs(num) / 1000).toFixed(
            this.props.chartChoice === "CPC" ? 2 : 0
          ) +
          " k"
      : (this.props.chartChoice === "Spend" ? "$" : "") +
          Math.abs(num).toFixed(this.props.chartChoice === "CPC" ? 2 : 0);
  };
  render() {
    const { translate } = this.props.screenProps;

    let data = chartData;
    let category = [];
    let tickValues = 0;
    let independentTickValues = [];
    if (this.props.campaignStats.length > 0) {
      data = this.props.campaignStats.map((stat, i) => {
        let date = new Date(stat.report_date);

        let day = date.getDate();
        let month = date.getMonth();
        tickValues =
          this.props.chartChoice === "Spend"
            ? stat.spend
            : this.props.chartChoice === "Clicks"
            ? stat.clicks
            : this.props.chartChoice === "CPC"
            ? stat.cpc
            : this.props.chartChoice === "ctr"
            ? stat.ctr
            : 0;
        independentTickValues.push(tickValues);

        return {
          x: `${day}/${shortMonths[month]}`,
          y: tickValues
        };
      });
    }

    return (
      <View style={{ paddingLeft: 30 }}>
        <ScrollView
          scrollEnabled={this.props.campaignStats.length > 1}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {this.props.campaignStats.length < 1 ? (
            <BlurView
              intensity={70}
              tint="dark"
              style={styles.placeHolderChart}
            >
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
                  width:
                    this.props.campaignStats.length <= 4 ? wp(100) : wp(150)
                }
              ]}
            />
          )}
          <VictoryChart
            domainPadding={{ y: 17 }}
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
            padding={{
              top: 70,
              bottom: this.props.campaignStats.length === 1 ? 50 : 30,
              left: 60,
              right: 50
            }}
            width={this.props.campaignStats.length <= 4 ? wp(100) : wp(120)}
          >
            <Defs>
              <LinearGradient x1="0" y1="0" x2="0" y2="180" id="myGradient">
                <Stop offset="0%" stopColor="#FF7D08" />
                <Stop offset="5%" stopColor="#f07204" />
                <Stop offset="60%" stopColor="#000" />
              </LinearGradient>
            </Defs>
            {this.props.campaignStats.length === 1 ? (
              <VictoryScatter
                categories={{ x: category }}
                style={{
                  data: {
                    stroke: "#FF7D08",
                    fill: "url(#myGradient)",
                    strokeWidth: 5
                  }
                }}
                size={8}
                data={data}
              />
            ) : (
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
            )}

            <VictoryAxis
              tickCount={5}
              crossAxis
              offsetY={25}
              style={tickLabelStyles}
            />
          </VictoryChart>
        </ScrollView>
        <View style={styles.xAxisStyle}>
          <VictoryAxis
            dependentAxis
            domainPadding={{ y: 17 }}
            tickFormat={t => this.kFormatter(t)}
            offsetX={45}
            tickCount={5}
            padding={{
              top: 70,
              bottom: this.props.campaignStats.length === 1 ? 50 : 20,
              left: 60,
              right: 60
            }}
            domain={
              independentTickValues.length > 0
                ? [0, Math.max(...independentTickValues)]
                : [0, 1]
            }
            style={tickLabelStyles}
          />
        </View>
      </View>
    );
  }
}

let tickLabelStyles = {
  axis: { stroke: "none" },
  tickLabels: {
    stroke: "#fff",
    fill: "#fff",
    fontSize: 14,
    padding: 5,
    fontFamily: "Helvetica",
    fontWeight: "100"
  },
  ticks: { stroke: "#fff", size: 6, padding: 0 }
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(LineGraph);
