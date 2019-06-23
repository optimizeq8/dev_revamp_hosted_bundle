import React, { Component } from "react";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default class PlaceholderLine extends Component {
  render() {
    let { width, height, color, marginVertical } = this.props;

    return (
      <Animatable.View
        animation="flash"
        iterationCount="infinite"
        duration={2500}
        easing="linear"
        style={{
          width: width ? width : 100,
          height: height ? height : 20,
          backgroundColor: color ? color : "rgba(255,157,0,0.8)",
          borderRadius: 20,
          alignSelf: "center",
          marginVertical: marginVertical ? marginVertical : 10
        }}
      />
    );
  }
}
