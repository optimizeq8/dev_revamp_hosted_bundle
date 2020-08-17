import React, { Component } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import GradientButton from "../MiniComponents/GradientButton";
import ForwardButton from "../../assets/SVGs/ForwardButton";
import CheckmarkIcon from "../../assets/SVGs/Checkmark";
import CrossIcon from "../../assets/SVGs/CrossButton";
import BackButton from "../../assets/SVGs/BackButton";
import ArrowForward from "../../assets/SVGs/ArrowForward";

export default class LowerButton extends Component {
  render() {
    let {
      width,
      height,
      style,
      disabled,
      text,
      widthButton,
      purpleViolet,
    } = this.props;
    let bottom = this.props.bottom ? this.props.bottom : 0;
    const { translate } = this.props.screenProps;
    return (
      <GradientButton
        disabled={disabled}
        disabledGradientBegin={"rgba(0,0,0,0)"}
        disabledGradientEnd={"rgba(0,0,0,0)"}
        purpleViolet={purpleViolet}
        style={[
          {
            bottom: heightPercentageToDP(bottom),
          },
          styles.button,
          style,
        ]}
        width={widthButton ? widthButton : 60}
        height={60}
        radius={50}
        onPressAction={() => this.props.function(false)}
      >
        <View style={styles.view}>
          {text && <Text style={styles.text}>{translate(text)}</Text>}
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
              stroke={"#FFF"}
            />
          ) : (
            <ArrowForward
              style={styles.rtlReverse}
              width={width ? width : 25}
              height={height ? height : 25}
            />
          )}
        </View>
      </GradientButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
  },
  text: {
    color: "#FFF",
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "montserrat-bold",
    // flex: 1,
  },
  view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rtlReverse: { left: widthPercentageToDP(0.5) },
});
