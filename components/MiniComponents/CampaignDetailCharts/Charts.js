import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles, { colors } from "./styles";

export default class Charts extends Component {
  render() {
    console.log(this.props.chartCategory);

    return (
      <TouchableOpacity style={styles.container}>
        <View>
          <AnimatedCircularProgress
            size={75}
            width={6}
            fill={30}
            rotation={0}
            lineCap="round"
            style={styles.chart}
            tintColor="#FEFB00"
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="rgba(255,255,255,0.3)"
          >
            {fill => <Text style={styles.chartText}>{parseInt(fill)}</Text>}
          </AnimatedCircularProgress>
          <Text style={[styles.chartSubtext]}>
            {Object.keys(this.props.chartCategory)[0]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
