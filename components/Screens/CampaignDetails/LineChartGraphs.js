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
import { heightPercentageToDP } from "react-native-responsive-screen";
import { VictoryChart, VictoryLine } from "victory-native";
export default class LineChartGraphs extends Component {
  render() {
    return (
      <View
        style={{
          paddingTop: 30,
          paddingLeft: 20,
          paddingBottom: heightPercentageToDP("34")
        }}
      >
        <Text style={styles.chartTitle}>Spend</Text>
        <VictoryChart>
          <VictoryLine
            interpolation="natural"
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 6 }
            ]}
          />
        </VictoryChart>
        <LineChartDevider style={{ alignSelf: "center" }} />
        <Text style={styles.chartTitle}>Imprissions</Text>
        <LineChart
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sept"
            ],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width * 1.5} // from react-native
          height={220}
          yAxisLabel={"$"}
          onDataPointClick={({ value, getColor }) =>
            console.log({
              message: `${value}`,
              description: "You selected this value",
              backgroundColor: getColor(0.9)
            })
          }
          chartConfig={{
            decimalPlaces: 2, // optional, defaults to 2dp
            strokeWidth: 5,
            color: (opacity = 1) => `#FFFC00`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            borderRadius: 16,
            paddingBottom: 30
          }}
        />
        <LineChartDevider style={{ alignSelf: "center" }} />
        <Text style={styles.chartTitle}>Swipes</Text>
        <LineChart
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width * 1.5} // from react-native
          height={220}
          yAxisLabel={"$"}
          chartConfig={{
            strokeWidth: 5,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `#FFFC00`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            borderRadius: 16,
            paddingBottom: 30
          }}
        />
      </View>
    );
  }
}
