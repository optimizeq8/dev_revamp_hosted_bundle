import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import Award from "../../../assets/SVGs/award";
import { widthPercentageToDP } from "react-native-responsive-screen";
import styles from "./styles";

export default class Screen4 extends React.Component {
  render() {
    const { id, activeSlide, changed } = this.props;

    return (
      <View style={styles.screen4View}>
        {changed && id === activeSlide && (
          <Animatable.View animation={this.props.changed ? "bounceInDown" : ""}>
            <Award width={widthPercentageToDP(70)} />
          </Animatable.View>
        )}
      </View>
    );
  }
}
