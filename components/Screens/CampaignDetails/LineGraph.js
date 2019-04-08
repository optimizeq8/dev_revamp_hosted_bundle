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

export default class LineGraph extends Component {
  render() {
    return (
      <View>
        <Text style={styles.chartTitle}>
          {Object.keys(this.props.chartCategory)[0]}
        </Text>
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={d => parseFloat(d.y).toFixed(0)}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={10}
                  pointerLength={7}
                  flyoutStyle={{
                    stroke: "#fff",
                    fill: "#fff"
                  }}
                />
              }
            />
          }
          height={heightPercentageToDP("35")}
        >
          <VictoryLine
            interpolation="catmullRom"
            style={{
              data: {
                stroke: "#FFFC00",
                strokeWidth: 5
              },
              labels: { fill: "#FF9D00", fontSize: 23 }
            }}
            data={[
              { x: "Jan", y: Math.random() * 100 },
              { x: "Feb", y: Math.random() * 100 },
              { x: "Mar", y: Math.random() * 100 },
              { x: "Apr", y: Math.random() * 100 },
              { x: "May", y: Math.random() * 100 },
              { x: "Jun", y: Math.random() * 100 },
              { x: "Jul", y: Math.random() * 100 },
              { x: "Aug", y: Math.random() * 100 },
              { x: "Sept", y: Math.random() * 100 }
            ]}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "none" },
              tickLabels: {
                stroke: "#fff",
                fill: "#fff",
                fontFamily: "montserrat-bold",
                ticks: { stroke: "#fff", size: 10 },
                fontSize: widthPercentageToDP("3.5")
              }
            }}
          />
          <VictoryAxis
            crossAxis
            style={{
              axis: { stroke: "none" },
              tickLabels: {
                stroke: "#fff",
                fill: "#fff",
                fontFamily: "montserrat-bold",
                ticks: { stroke: "#fff", size: 10 },
                fontSize: widthPercentageToDP("3.8")
              }
            }}
          />
        </VictoryChart>

        <LineChartDevider style={{ alignSelf: "center" }} />
      </View>
    );
  }
}
