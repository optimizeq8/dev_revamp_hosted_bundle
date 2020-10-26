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
  VictoryScatter,
  VictoryGroup,
} from "victory-native";
import chartData from "./ChartData";
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { globalColors } from "../../../GlobalStyles";

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesGreaterThanThousand: false, // Keep track of all values on xAxis  > 999
    };
  }
  kFormatter = (num) => {
    // OR condition added so that it shows up values properly
    return Math.abs(num) > 999 || this.state.valuesGreaterThanThousand
      ? (this.props.chartChoice === "Spend" ? "$" : "") +
          Math.abs(num) / (Math.abs(num) > 9999999 ? 1000000 : 1000) +
          `${Math.abs(num) > 9999999 ? "M" : "K"}`
      : (this.props.chartChoice === "Spend" ? "$" : "") +
          Math.abs(num).toFixed(0);
  };
  componentDidUpdate(prevProps) {
    // Set valuesGreaterThanThousand back to false when chartChoice changes
    if (
      prevProps.chartChoice !== this.props.chartChoice &&
      this.state.valuesGreaterThanThousand
    ) {
      this.setState({
        valuesGreaterThanThousand: false,
      });
    }
  }
  render() {
    const { translate } = this.props.screenProps;
    let data = chartData;
    let category = [];
    let tickValues = 0;
    let independentTickValues = [];
    if (this.props.campaignStats && this.props.campaignStats.length > 0) {
      data = this.props.campaignStats.map((stat, i) => {
        let date = new Date(stat.date_stop);

        let day = new Date(stat.date_stop).getDate();
        let month = date.getMonth();

        //For swipeups/ Impression check the swipe/impression  values so that it can be formatted proper as 0.5K,1K... when majority values greater than 999
        if (
          ((this.props.chartChoice === "Clicks" &&
            stat.swipes !== 0 &&
            stat.swipes > 999) ||
            (this.props.chartChoice === "Impressions" &&
              stat.impressions !== 0 &&
              stat.impressions > 999)) &&
          !this.state.valuesGreaterThanThousand
        ) {
          this.setState({
            valuesGreaterThanThousand: true,
          });
        }

        tickValues =
          this.props.chartChoice === "Spend"
            ? stat.spend
            : this.props.chartChoice === "Impressions"
            ? stat.impressions
            : this.props.chartChoice === "Clicks"
            ? stat.clicks
            : this.props.chartChoice === "CPM"
            ? (parseFloat(stat.spend) /
                parseFloat(stat.impressions !== 0 ? stat.impressions : 1)) *
              1000
            : 0;
        independentTickValues.push(tickValues);
        return {
          x: `${day}/${shortMonths[month]}`,
          y: parseFloat(tickValues),
        };
      });
    }

    return (
      <View
        style={{
          paddingLeft: I18nManager.isRTL ? wp(12) : wp(5),
          paddingRight: I18nManager.isRTL ? wp(15) : wp(5),
        }}
      >
        <ScrollView
          scrollEnabled={
            this.props.campaignStats && this.props.campaignStats.length > 1
          }
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {this.props.campaignStats && this.props.campaignStats.length < 1 ? (
            <BlurView
              intensity={70}
              tint="light"
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
                    this.props.campaignStats &&
                    this.props.campaignStats.length <= 4
                      ? wp(100)
                      : wp(150),
                },
              ]}
            />
          )}
          <VictoryChart
            domainPadding={{ y: 17 }}
            height={heightPercentageToDP(38)}
            domain={
              this.props.campaignStats && this.props.campaignStats.length === 1
                ? { y: [0, Math.max(...independentTickValues) * 1.05] }
                : {}
            }
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
              bottom:
                this.props.campaignStats &&
                this.props.campaignStats.length === 1
                  ? 50
                  : 30,
              left: 60,
              right: 50,
            }}
            width={
              this.props.campaignStats && this.props.campaignStats.length <= 4
                ? wp(100)
                : wp(120)
            }
          >
            <Defs>
              <LinearGradient x1="0" y1="0" x2="0" y2="1.3" id="myGradient">
                <Stop offset="0%" stopColor={globalColors.purple} />
                <Stop offset="5%" stopColor={"#7400E5"} />
                <Stop offset="90%" stopColor="#f8f8f8" />
              </LinearGradient>
            </Defs>
            {this.props.campaignStats &&
            this.props.campaignStats.length === 1 ? (
              <VictoryScatter
                categories={{ x: category }}
                style={{
                  data: {
                    stroke: "#9304FF",
                    fill: "url(#myGradient)",
                    strokeWidth: 5,
                  },
                }}
                size={8}
                data={data}
              />
            ) : (
              <VictoryGroup>
                <VictoryArea
                  standalone={true}
                  categories={{ x: category }}
                  interpolation="catmullRom"
                  style={{
                    data: {
                      stroke: "#9304FF",
                      fill: "url(#myGradient)",
                      strokeWidth: 5,
                    },
                  }}
                  data={data}
                />
                <VictoryScatter
                  categories={{ x: category }}
                  style={{
                    data: { stroke: "#9304FF", strokeWidth: 1.5, fill: "#FFF" },
                  }}
                  size={8}
                  data={data}
                />
              </VictoryGroup>
            )}
            <VictoryAxis
              tickCount={5}
              crossAxis
              offsetY={25}
              style={tickLabelStyles}
            />
          </VictoryChart>
        </ScrollView>
        <View
          style={[
            styles.xAxisStyle,
            I18nManager.isRTL && {
              width: 0,
            },
          ]}
        >
          <VictoryAxis
            height={heightPercentageToDP(38)}
            domainPadding={{
              y:
                this.props.campaignStats &&
                this.props.campaignStats.length === 1
                  ? 60
                  : 40,
            }}
            dependentAxis
            tickFormat={(t) => this.kFormatter(t)}
            tickCount={5}
            padding={{
              top: 20,
              bottom:
                this.props.campaignStats &&
                this.props.campaignStats.length === 1
                  ? 50
                  : 30,
              left: 60,
              right: 60,
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
    // stroke: "#A496AC",
    fill: "#A496AC",
    fontSize: 10,
    padding: 6,
    fontFamily: "montserrat-regular-english",
  },
  ticks: { stroke: "#A496AC", size: 6, padding: 0 },
};

const mapStateToProps = (state) => ({
  campaignStats: state.dashboard.instaCampaignStats,
});

export default connect(mapStateToProps, null)(LineGraph);
