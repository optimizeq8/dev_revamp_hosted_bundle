import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import QuestionIcon from "../../assets/SVGs/QuestionIcon.svg";
import { globalColors } from "../../GlobalStyles";

export default class QuestionComponent extends Component {
  render() {
    let { onPressFunction, style, width = 35, height = 35 } = this.props;
    return (
      <TouchableOpacity
        style={[styles.questionIconContainer, style]}
        onPress={() => onPressFunction()}
      >
        <QuestionIcon width={width} height={height} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  questionIconContainer: {
    borderRadius: 100,
    borderColor: globalColors.twilight,
  },
});
