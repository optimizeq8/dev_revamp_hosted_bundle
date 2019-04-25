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
          bottom: 10,
          width: 50
        }}
      >
        <Text style={[GlobalStyles.numbers, { color: "#fff" }]}>
          {this.props.value === 35 ? "35+" : this.props.value}
        </Text>
        <View
          style={{
            width: 5,
            height: 20,
            backgroundColor: "#fff",
            borderRadius: 14
          }}
        />
      </View>
    );
  }
}
