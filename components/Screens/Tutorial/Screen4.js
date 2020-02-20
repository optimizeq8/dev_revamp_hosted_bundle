import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Segment from "expo-analytics-segment";

import Award from "../../../assets/SVGs/award";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default class Screen4 extends React.Component {
  render() {
    const { id, activeSlide } = this.props;
    if (id === activeSlide) {
      Segment.screen(`Tutorial 4`);
    }

    return (
      <View>
        {id === activeSlide && (
          <Animatable.View animation={"bounceInDown"}>
            <Award height={heightPercentageToDP(50)} />
          </Animatable.View>
        )}
      </View>
    );
  }
}
