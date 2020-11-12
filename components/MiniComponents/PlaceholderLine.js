import React, { Component } from "react";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from "rn-placeholder";

export default class PlaceholderLineComp extends Component {
  render() {
    let { width, height, color, marginVertical } = this.props;

    return (
      <Placeholder Animation={Shine}>
        <PlaceholderLine
          style={[
            {
              width: width ? width : 100,
              height: height ? height : 20,
              backgroundColor: color ? color : "#0002",
              borderRadius: 20,
              alignSelf: "center",
              marginVertical: marginVertical ? marginVertical : 5,
            },
          ]}
        />
      </Placeholder>
    );
  }
}
