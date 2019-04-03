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
export default class LineChartGraphs extends Component {
  render() {
    return (
      <View
        style={{
          paddingTop: 30,
          paddingLeft: 25,
          paddingBottom: heightPercentageToDP("34")
        }}
      >
        <Text style={styles.chartTitle}>Spend</Text>
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
                  Math.random() * 1003114,
                  Math.random() * 12200,
                  Math.random() * 1022140,
                  Math.random() * 100,
                  Math.random() * 1200,
                  Math.random() * 1131300
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width * 1.5} // from react-native
          height={220}
          yAxisLabel={"$"}
          chartConfig={{
            strokeWidth: 5,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `#FFFC00`,
            style: {
              borderRadius: 16,
              color: "#fff"
            }
          }}
          bezier
        />
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
