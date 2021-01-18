import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class CopilotStepNumber extends Component {
  render() {
    return (
      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumberText]}>
          {this.props.currentStepNumber}
        </Text>
      </View>
    );
  }
}
