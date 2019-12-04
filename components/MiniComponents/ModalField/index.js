import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styles from "./styles";
import { Item, Icon } from "native-base";
import GlobalStyles from "../../../GlobalStyles";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

export default class ModalField extends Component {
  componentDidUpdate(prevProps) {
    //incomplete gets reset everytime the animtion ends
    //so when the user tries to submit again it'll try to validate again
    //and play the animation accordingly
    if (
      prevProps.incomplete !== this.props.incomplete &&
      this.props.incomplete
    ) {
      this.validate();
    }
  }
  /** 
    Validates if the modalField is empty or not
  */
  validate = () => {
    let valueError = null;
    // same as above but for the main input field
    valueError = validateWrapper("mandatory", this.props.value);
    this.props.getValidInfo(this.props.stateName + "Error", valueError);
  };

  /**
   * Handles onAnimationEnd for Animatable.View
   * Resets the stateNameError back to null for
      parent component so that animation can play again
   */
  handleAnimationEnd = () => {
    this.props.getValidInfo(this.props.stateName + "Error", null);
    this.props.getValidInfo("incomplete", false);
  };

  render() {
    let {
      label,
      translate,
      setModalVisible,
      disabled,
      valueText,
      valueError
    } = this.props;

    return (
      <Animatable.View
        onAnimationEnd={this.handleAnimationEnd}
        duration={200}
        easing={"ease"}
        animation={valueError ? "shake" : ""}
      >
        <View style={styles.labelView}>
          <Text
            uppercase
            style={[styles.inputLabel, GlobalStyles.whiteTextColor]}
          >
            {translate(label)}
          </Text>
        </View>
        <Item
          onPress={() => !disabled && setModalVisible(true)}
          style={[styles.input1]}
        >
          <Text style={styles.inputText}>{translate(valueText)}</Text>
          <Icon type="AntDesign" name="down" style={styles.downicon} />
        </Item>
      </Animatable.View>
    );
  }
}

ModalField.propTypes = {
  //the parent's state key that will be passed and changed through this component
  // eg. state{*stateName1*: value}
  stateName: PropTypes.string.isRequired,
  //The label that appears on top of the input field
  label: PropTypes.string,
  //checks whether to disable the feild or not
  disabled: PropTypes.bool,
  //the translate function
  translate: PropTypes.func.isRequired,
  //the function that opens the modal
  setModalVisible: PropTypes.func,
  //the value that shows on the input field when modal is being used
  valueText: PropTypes.string
};
