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
    let {
      width,
      height,
      color,
      marginVertical,
      stopAutoRun = false,
    } = this.props;
    if (stopAutoRun) {
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
            marginVertical: marginVertical ? marginVertical : 5,
          }}
        />
      );
    } else
      return (
        <ShimmerPlaceHolder
          stopAutoRun={stopAutoRun}
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
