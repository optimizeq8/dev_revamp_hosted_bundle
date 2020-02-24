import React, { Component } from "react";
import { ScrollView, View, Text, I18nManager } from "react-native";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { Defs, LinearGradient, Stop } from "react-native-svg";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesGreaterThanThousand: false // Keep track of all values on xAxis  > 999
    };
  }

  componentDidUpdate(prevProps) {
    // Set valuesGreaterThanThousand back to false when chartChoice changes
    if (
      prevProps.chartChoice !== this.props.chartChoice &&
      this.state.valuesGreaterThanThousand
    ) {
      this.setState({
        valuesGreaterThanThousand: false
      });
    }
  }
  kFormatter = num => {
    // OR condition added so that it shows up values properly
    return Math.abs(num) > 999 || this.state.valuesGreaterThanThousand
      ? (this.props.chartChoice === "Spend" ? "$" : "") +
          Math.abs(num) / (Math.abs(num) > 9999999 ? 1000000 : 1000) +
          `${Math.abs(num) > 9999999 ? "M" : "K"}`
      : (this.props.chartChoice === "Spend" || this.props.chartChoice === "CPC"
          ? "$"
          : "") +
          Math.abs(num) +
          (this.props.chartChoice === "ctr" ? "%" : "");
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
        //For Clicks/ CPC check the clicks/cpc  values so that it can be formatted proper as 0.5K,1K... when majority values greater than 999
        if (
          ((this.props.chartChoice === "Clicks" &&
            stat.clicks !== 0 &&
            stat.clicks > 999) ||
            (this.props.chartChoice === "CPC" &&
              stat.cpc !== 0 &&
              stat.cpc > 999)) &&
          !this.state.valuesGreaterThanThousand
        ) {
          this.setState({
            valuesGreaterThanThousand: true
          });
        }
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
      <View
        style={{
          paddingLeft: 30
        }}
      >
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
            domain={
              this.props.campaignStats.length === 1 || true
                ? { y: [0, Math.max(...independentTickValues) * 1.05] }
                : {}
            }
            height={heightPercentageToDP(38)}
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
              top: 60,
              bottom: this.props.campaignStats.length === 1 ? 50 : 30,
              left: I18nManager.isRTL
                ? this.props.campaignStats.length > 4
                  ? 180
                  : 120
                : 60,
              right: 50
            }}
            width={this.props.campaignStats.length <= 4 ? wp(100) : wp(120)}
          >
            <Defs>
              <LinearGradient x1="0" y1="0" x2="0" y2="1.3" id="myGradient">
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
                interpolation="catmullRom"
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
            height={heightPercentageToDP(38)}
            domainPadding={{
              y: this.props.campaignStats.length !== 1 ? 60 : 40
            }}
            tickFormat={t => this.kFormatter(t)}
            offsetX={55}
            tickCount={5}
            padding={{
              top: 20,
              bottom: this.props.campaignStats.length === 1 ? 50 : 30,
              left: 60,
              right: 60
            }}
            domain={
              independentTickValues.length > 0
                ? [0, Math.max(...independentTickValues) * 1.05]
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
    fontSize: 13,
    padding: 5,
    fontFamily: "Helvetica",
    fontWeight: "100"
  },
  ticks: { stroke: "#fff", size: 6, padding: 0 }
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(LineGraph);
