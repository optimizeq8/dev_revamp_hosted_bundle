import React, { Component } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
        width={widthButton ? widthButton : RFValue(30, 414)}
        height={RFValue(30, 414)}
        radius={RFValue(25, 414)}
        onPressAction={() => this.props.function(false)}
      >
        <View style={styles.view}>
          {text && <Text style={styles.text}>{translate(text)}</Text>}
          {this.props.checkmark ? (
            <CheckmarkIcon
              width={width ? width : RFValue(26.5, 414)}
              height={height ? height : RFValue(26.5, 414)}
            />
          ) : this.props.cross ? (
            <CrossIcon
              fill={"#ff9d00"}
              width={width ? width : RFValue(12.5, 414)}
              height={height ? height : RFValue(12.5, 414)}
            />
          ) : I18nManager.isRTL ? (
            <BackButton
              style={styles.rtlReverse}
              width={width ? width : RFValue(12.5, 414)}
              height={height ? height : RFValue(12.5, 414)}
              stroke={"#FFF"}
            />
          ) : (
            <ArrowForward
              style={styles.rtlReverse}
              width={width ? width : RFValue(12.5, 414)}
              height={height ? height : RFValue(12.5, 414)}
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
    fontSize: RFValue(7, 414),
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
