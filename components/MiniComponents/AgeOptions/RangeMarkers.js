import React, { Component } from "react";
import { Text, View } from "react-native";
import GlobalStyles from "../../../Global Styles";

export default class RangeMarkers extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          bottom: this.props.down ? -10 : 10,
          width: 50
        }}
      >
        {!this.props.down && (
          <Text style={[GlobalStyles.numbers, { color: "#fff" }]}>
            {this.props.value === 35 ? "35+" : this.props.value}
          </Text>
        )}
        <View
          style={{
            width: 5,
            height: 20,
            backgroundColor: "#fff",
            borderRadius: 14
          }}
        />
        {this.props.down && (
          <Text style={[GlobalStyles.numbers, { color: "#fff" }]}>
            {this.props.value === 35 ? "35+" : this.props.value}
          </Text>
        )}
      </View>
    );
  }
}
