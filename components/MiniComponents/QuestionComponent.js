import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import QuestionIcon from "../../assets/SVGs/QuestionIcon.svg";
import { globalColors } from "../../GlobalStyles";
import { RFValue } from "react-native-responsive-fontsize";
export default class QuestionComponent extends Component {
  render() {
    let { onPressFunction, style, width = 35, height = 35 } = this.props;
    return (
      <TouchableOpacity
        style={[styles.questionIconContainer, style]}
        onPress={() => onPressFunction()}
      >
        <QuestionIcon
          width={RFValue(width / 2, 414)}
          height={RFValue(height / 2, 414)}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  questionIconContainer: {
    borderRadius: RFValue(50, 414),
    borderColor: globalColors.twilight,
  },
});
