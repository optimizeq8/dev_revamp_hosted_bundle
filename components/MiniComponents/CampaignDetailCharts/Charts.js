import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./styles";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default class Charts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <AnimatedCircularProgress
            size={heightPercentageToDP("11")}
            width={6}
            fill={30}
            rotation={0}
            lineCap="round"
            style={styles.chart}
            tintColor="#FEFB00"
            backgroundColor="rgba(255,255,255,0.3)"
          >
            {fill => <Text style={styles.chartText}>{parseInt(fill)}</Text>}
          </AnimatedCircularProgress>
          <Text style={[styles.chartSubtext]}>
            {Object.keys(this.props.chartCategory)[0]}
          </Text>
        </View>
      </View>
    );
  }
}
