import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  UIManager,
} from "react-native";
import styles from "./styles";
import { NavigationEvents } from "react-navigation";

const { State: TextInputState } = TextInput;

export default class KeyboardShift extends Component {
  state = {
    shift: new Animated.Value(0),
  };

  handleKeyboardFocus = () => {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  };

  handleKeyboardBlur = () => {
    this.keyboardDidShowSub && this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub && this.keyboardDidHideSub.remove();
  };
  render() {
    const { children: renderProp, style } = this.props;
    const { shift } = this.state;
    return (
      <>
        <NavigationEvents
          onDidFocus={this.handleKeyboardFocus}
          onDidBlur={this.handleKeyboardBlur}
        />
        <Animated.View
          style={[
            style,
            styles.container,
            { transform: [{ translateY: shift }] },
          ]}
        >
          {renderProp()}
        </Animated.View>
      </>
    );
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedInput = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedInput,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0 || isNaN(gap)) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
}

KeyboardShift.propTypes = {
  children: PropTypes.func.isRequired,
};
