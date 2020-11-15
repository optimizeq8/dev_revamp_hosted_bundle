import React, { Component } from "react";
import { InteractionManager, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default class PlaceholderLineComp extends Component {
  render() {
    let { width, height, color, marginVertical } = this.props;
    return (
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        width={width ? widthPercentageToDP(width) : 100}
        height={height ? heightPercentageToDP(height) : 20}
        shimmerColors={["#0003", "#fff2", "#fff5"]}
        style={[
          {
            width: width ? width : 100,
            height: height ? height : 20,
            borderRadius: 20,
            alignSelf: "center",
            marginVertical: marginVertical ? marginVertical : 5,
          },
        ]}
      />
    );
  }
}
