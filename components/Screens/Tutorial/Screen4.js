import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

import Award from "../../../assets/SVGs/award";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default class Screen4 extends React.Component {
  render() {
    const { id, activeSlide } = this.props;

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
