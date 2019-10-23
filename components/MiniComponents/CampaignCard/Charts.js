import React, { Component } from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";

export default class Charts extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let spends = this.props.chartCategory.spend;
    let x = this.props.campaign
      ? (spends / this.props.campaign.lifetime_budget_micro) * 100
      : 0;
    return (
      <View>
        <AnimatedCircularProgress
          size={this.props.detail ? 65 : 65}
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
              ${spends > 100 ? parseInt(spends) : parseFloat(spends).toFixed(2)}
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={[styles.chartSubtext]}>{translate("Spend")}</Text>
      </View>
    );
  }
}
