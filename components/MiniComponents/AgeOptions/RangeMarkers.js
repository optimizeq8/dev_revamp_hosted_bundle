import React, { Component } from "react";
import { Text, View } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import styles from "./styles";

export default class RangeMarkers extends Component {
  render() {
    let showPlusIcon = this.props.showPlusIcon;
    return (
      <View
        style={[
          styles.rangeMakerContainer,
          { bottom: this.props.down ? -10 : 10 },
        ]}
      >
        {!this.props.down && (
          <Text
            style={[
              GlobalStyles.numbers,
              GlobalStyles.whiteTextColor,
              styles.markerStyle,
            ]}
          >
            {this.props.value +
              (this.props.value === 50 && showPlusIcon ? "+" : "")}
          </Text>
        )}
        <View style={styles.breaker} />
        {this.props.down && (
          <Text
            style={[
              GlobalStyles.numbers,
              GlobalStyles.whiteTextColor,
              styles.markerStyle,
            ]}
          >
            {this.props.value}
          </Text>
        )}
      </View>
    );
  }
}
