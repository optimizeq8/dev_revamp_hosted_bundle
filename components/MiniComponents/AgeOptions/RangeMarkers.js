import React, { Component } from "react";
import { Text, View } from "react-native";
import GlobalStyles from "../../../Global Styles";
import styles from "./styles";

export default class RangeMarkers extends Component {
  render() {
    return (
      <View
        style={[
          styles.rangeMakerContainer,
          { bottom: this.props.down ? -10 : 10 }
        ]}
      >
        {!this.props.down && (
          <Text style={[GlobalStyles.numbers, { color: "#fff" }]}>
            {this.props.value === 35 ? "35+" : this.props.value}
          </Text>
        )}
        <View style={styles.breaker} />
        {this.props.down && (
          <Text style={[GlobalStyles.numbers, { color: "#fff" }]}>
            {this.props.value === 35 ? "35+" : this.props.value}
          </Text>
        )}
      </View>
    );
  }
}
