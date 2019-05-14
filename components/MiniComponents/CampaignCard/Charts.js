import React, { Component } from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default class Charts extends Component {
  render() {
    let spends = this.props.chartCategory.spend;
    let x = (spends / this.props.campaign.lifetime_budget_micro) * 100;
    return (
      <View>
        <AnimatedCircularProgress
          size={this.props.detail ? heightPercentageToDP("11") : 65}
          width={5}
          fill={x}
          rotation={0}
          lineCap="round"
          style={styles.chart}
          tintColor="#FEFB00"
          backgroundColor="rgba(255,255,255,0.3)"
        >
          {fill => (
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.chartText}
            >
              {parseInt(fill)}
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={[styles.chartSubtext]}>
          {Object.keys(this.props.chartCategory)[0]}
        </Text>
      </View>
    );
  }
}
