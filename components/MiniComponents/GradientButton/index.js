import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

class GradientButton extends React.PureComponent {
  render() {
    const {
      children,
      style,
      text,
      textStyle,
      gradientBegin,
      gradientEnd,
      disabledGradientBegin,
      disabledGradientEnd,
      gradientDirection,
      height,
      width,
      radius,
      onPressAction,
      purpleViolet,
      violetPink,
      pinkDarkGreen,
      blueViolet,
      blueMarine,
      deepBlue,
      disabled,
      orangeDark,
      uppercase,
      transparent
    } = this.props;
    const orangeDarkColor = ["#FF9D00", "#FF5C14"];
    const transparentColor = ["rgba(0,0,0,0)", "rgba(0,0,0,0)"];
    const purpleVioletColor = ["#7B42F6", "#B01EFF"];
    const violetPinkColor = ["#B01EFF", "#E1467C"];
    const pinkDarkGreenColor = ["#E1467C", "#205284"];
    const blueVioletColor = ["#3672F8", "#B01EFF"];
    const blueMarineColor = ["#14F1D9", "#3672F8"];
    const deepBlueColor = ["#4F73C3", "#3C46A2"];
    const disabledColor = [
      disabledGradientBegin || "#FF9D00",
      disabledGradientEnd || "#FF5C14"
    ];

    const horizontalGradient = {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 }
    };

    const verticalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 }
    };

    const diagonalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    };

    return (
      <TouchableOpacity
        style={[
          styles.button,
          { height, width },
          style,
          { borderRadius: radius }
        ]}
        onPress={
          disabled
            ? null
            : () => {
                if (onPressAction) {
                  return onPressAction();
                }
              }
        }
      >
        <LinearGradient
          style={[styles.gradient]}
          colors={
            disabled
              ? disabledColor
              : purpleViolet
              ? purpleVioletColor
              : violetPink
              ? violetPinkColor
              : pinkDarkGreen
              ? pinkDarkGreenColor
              : blueViolet
              ? blueVioletColor
              : blueMarine
              ? blueMarineColor
              : deepBlue
              ? deepBlueColor
              : orangeDark
              ? orangeDarkColor
              : transparent
              ? transparentColor
              : [gradientBegin, gradientEnd]
          }
          start={
            gradientDirection === "vertical"
              ? verticalGradient.start
              : gradientDirection === "diagonal"
              ? diagonalGradient.start
              : horizontalGradient.start
          }
          end={
            gradientDirection === "vertical"
              ? verticalGradient.end
              : gradientDirection === "diagonal"
              ? diagonalGradient.end
              : horizontalGradient.end
          }
        >
          {children ? (
            children
          ) : (
            <Text uppercase={uppercase} style={[styles.text, textStyle]}>
              {text}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

GradientButton.defaultProps = {
  gradientBegin: "#FF9D00",
  gradientEnd: "#FF5C14",
  gradientDirection: "vertical",
  height: 75,
  radius: 25,
  textStyle: {},
  disabled: false,
  disabledGradientBegin: "#FF9D00",
  disabledGradientEnd: "#FF5C14"
};

export default GradientButton;
