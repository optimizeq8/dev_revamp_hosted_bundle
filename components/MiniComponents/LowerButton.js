import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import GradientButton from "../MiniComponents/GradientButton";
import ForwardButton from "../../assets/SVGs/ForwardButton";
import CheckmarkIcon from "../../assets/SVGs/Checkmark";
import CrossIcon from "../../assets/SVGs/CrossButton";
import BackButton from "../../assets/SVGs/BackButton";
import ArrowForward from "../../assets/SVGs/ArrowForward";

export default class LowerButton extends Component {
  render() {
    let { width, height, style } = this.props;
    let bottom = this.props.bottom ? this.props.bottom : 0;
    return (
      <GradientButton
        style={[
          {
            bottom: heightPercentageToDP(bottom)
          },
          style,
          styles.button
        ]}
        width={60}
        height={60}
        radius={50}
        onPressAction={() => this.props.function(false)}
      >
        {this.props.checkmark ? (
          <CheckmarkIcon
            width={width ? width : 53}
            height={height ? height : 53}
          />
        ) : this.props.cross ? (
          <CrossIcon
            fill={"#ff9d00"}
            width={width ? width : 25}
            height={height ? height : 25}
          />
        ) : I18nManager.isRTL ? (
          <BackButton
            style={styles.rtlReverse}
            width={width ? width : 25}
            height={height ? height : 25}
          />
        ) : (
          <ArrowForward
            style={styles.rtlReverse}
            width={width ? width : 25}
            height={height ? height : 25}
          />
        )}
      </GradientButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center"
  },
  rtlReverse: { left: widthPercentageToDP(0.5) }
});
