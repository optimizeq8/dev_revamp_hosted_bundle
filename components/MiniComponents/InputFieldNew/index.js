import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Item, Input } from "native-base";
import * as Animatable from "react-native-animatable";

//function
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
import PropTypes from "prop-types";

//styles
import GlobalStyles, { globalColors } from "../../../GlobalStyles";

export default class InputField extends Component {
  typingTimeout = null;
  state = {
    highlight: false,
  };

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
    Validates if the input field is empty or not
    @param {Boolean} secondHalf Checks whether is's the second part 
                      of the input field
  */
  validate = (secondHalf = false) => {
    let valueError = null;
    if (secondHalf) {
      // validates the value of the second part of the input field
      valueError = validateWrapper("mandatory", this.props.value2);
      // sets the state for the error validator in the parent component
      this.props.getValidInfo(this.props.stateName2 + "Error", valueError);
    } else {
      // same as above but for the main input field
      valueError = validateWrapper(
        // newEmail is used on the sign up screen
        // this to check if the input field is for email/password input,
        //if so validate using the 'email'/'password' validator
        this.props.stateName1 === "email" ||
          this.props.stateName1 === "newEmail"
          ? "email"
          : this.props.stateName1 === "password"
          ? "password"
          : "mandatory",
        this.props.value
      );
      this.props.getValidInfo(this.props.stateName1 + "Error", valueError);
    }

    // if the input field is for email input, show the error in a FlashMessage
    if (
      (this.props.stateName1 === "email" ||
        this.props.stateName1 === "newEmail") &&
      valueError
    ) {
      showMessage({
        message: valueError,
        position: "top",
        type: "warning",
      });
    }
    //Set the error in state so that the animation plays
    this.setState({
      valueError,
    });
  };

  /** 
    handles onChangeText of Input component, 
    @param {String} value the value received from Input component
    @param {Boolean} secondHalf Checks whether is's the second part 
                                  of the input field
   */
  handleTextChange = (value, secondHalf = false) => {
    const { stateName1 } = this.props;
    if (stateName1 === "email" || stateName1 === "newEmail") {
      value = value.trim();
    }
    if (stateName1 !== "email" && stateName1 !== "newEmail") {
      // Remove validation on timeout while typing for email fields
      clearTimeout(this.typingTimeout);
    }

    if (secondHalf) this.props.setValue(this.props.stateName2, value);
    else this.props.setValue(this.props.stateName1, value);
    if (stateName1 !== "email" && stateName1 !== "newEmail") {
      this.typingTimeout = setTimeout(() => this.validate(), 800);
    }
  };

  /**
   * Handles onFocus for Input component, if focused sets highlight to true
    to switch to highlight styles  
   */
  focusFeild = () => {
    this.setState({ highlight: true });
  };

  /**
   * handles onBlur for Input component
   * 
   * @param {Boolean} secondHalf Checks whether is's the second part 
                                  of the input field
   */
  handleBlur = (secondHalf = false) => {
    // sets highlight to false to switch back to original style
    this.setState({ highlight: false });
    //check if function is being called from the second part of the input field
    //Either way, sets the values for the parent component
    if (secondHalf) {
      // set segments

      this.props.setValue(this.props.stateName2, this.props.value2);
    } else {
      // set segments

      this.props.setValue(this.props.stateName1, this.props.value);
    }
    this.validate(secondHalf);
  };
  /**
   * Handles onAnimationEnd for Animatable.View
   */
  handleAnimationEnd = () => {
    // Resets the valueErrors back to null for
    // parent component so that animation can play again
    this.props.getValidInfo("incomplete", false);
    this.props.getValidInfo(this.props.stateName1 + "Error", null);
    this.props.getValidInfo(this.props.stateName2 + "Error", null);
  };

  /**
   * Even field is touched outside bring it to focus
   */
  bringFieldToFocus = () => {
    this.refs["inputField"]._root.focus();
    this.setState({ highlight: true });
  };
  render() {
    let {
      stateName2,
      placeholder1,
      placeholder2,
      label,
      translate,
      icon,
      disabled = false,
      autoFocus,
      maxLength,
      valueError1,
      valueError2,
      secureTextEntry,
      customStyles,
      compulsory,
      animateCustomStyle,
      loading = false,
      inputStyle,
      placeholderColor = "#FFF",
      labelColor = globalColors.white,
    } = this.props;

    let FieldIcon = icon ? icon : null;
    return (
      <Animatable.View
        onAnimationEnd={this.handleAnimationEnd}
        duration={200}
        easing={"ease"}
        style={[{ width: "100%" }, animateCustomStyle]}
        animation={valueError1 || valueError2 ? "shake" : ""}
      >
        <Item
          style={[styles.input1, customStyles]}
          onPress={this.bringFieldToFocus}
        >
          {FieldIcon && (
            <FieldIcon
              style={[styles.iconSize, styles.icon]}
              fill={
                this.state.highlight ? globalColors.orange : globalColors.white
              }
              stroke={
                this.state.highlight ? globalColors.orange : globalColors.white
              }
            />
          )}

          <View style={[styles.colView, !FieldIcon && { marginLeft: 20 }]}>
            <Text
              style={[
                styles.inputLabel,
                this.state.highlight
                  ? [GlobalStyles.orangeTextColor]
                  : { color: labelColor },
              ]}
            >
              {translate(label)}
              {compulsory && "*"}
            </Text>
            <View style={[styles.rowView]}>
              <Input
                ref={"inputField"}
                placeholderTextColor={placeholderColor}
                editable={!this.props.loading || !disabled}
                placeholder={placeholder1 && translate(placeholder1)}
                value={this.props.value}
                style={[
                  styles.inputText,
                  stateName2 ? { maxWidth: "45%" } : {},
                  disabled ? { opacity: 0.6 } : {},
                  inputStyle,
                ]}
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                maxLength={maxLength ? maxLength : 34}
                autoFocus={autoFocus}
                autoCapitalize="none"
                onChangeText={(value) => this.handleTextChange(value)}
                onFocus={this.focusFeild}
                onBlur={() => this.handleBlur(false)}
              />
              {stateName2 && (
                <View
                  style={{
                    width: 1,
                    height: "90%",
                    backgroundColor: "#fff5",
                  }}
                />
              )}
              {stateName2 && (
                <Input
                  placeholderTextColor={placeholderColor}
                  editable={!this.props.loading || !disabled}
                  placeholder={placeholder2 && translate(placeholder2)}
                  value={this.props.value2}
                  style={[
                    styles.inputText,
                    { marginLeft: 8 },
                    stateName2 ? { maxWidth: "45%" } : {},
                    disabled ? { opacity: 0.6 } : {},
                  ]}
                  autoCorrect={false}
                  maxLength={maxLength ? maxLength : 34}
                  autoCapitalize="none"
                  onChangeText={(value2) => this.handleTextChange(value2, true)}
                  onFocus={this.focusFeild}
                  onBlur={() => this.handleBlur(true)}
                />
              )}
            </View>
          </View>
        </Item>
      </Animatable.View>
    );
  }
}

InputField.propTypes = {
  //the parent's state key that will be passed and changed through this component
  // eg. state{*stateName1*: value}
  stateName1: PropTypes.string.isRequired,
  stateName2: PropTypes.string,
  //The label that appears on top of the input field
  label: PropTypes.string,
  //Placeholders if needed, 1 is for the main field, 2 is
  //for the second part of the input field
  placeholder1: PropTypes.string,
  placeholder2: PropTypes.string,
  //Actual state values for the parent component
  //1 is for the main field, 2 is for the second part of the input field
  value: PropTypes.string.isRequired,
  value2: PropTypes.string,
  //An icon that's passed from the parent component to display
  icon: PropTypes.any,
  //checks whether to disable the field or not
  disabled: PropTypes.bool,
  //The parent's function that sets the error values in its state
  getValidInfo: PropTypes.func.isRequired,
  //The parent's function that the child can call and set the state for the parent
  setValue: PropTypes.func.isRequired,
  //A bool sent by the parent to check if all the required values are there
  //when the user sumbits the form
  incomplete: PropTypes.bool.isRequired,
  //the translate function
  translate: PropTypes.func.isRequired,
  //checks whether the component is being used to open a modal or not
  modal: PropTypes.bool,
  //the function that opens the modal
  setModalVisible: PropTypes.func,
  //the value that shows on the input field when modal is being used
  valueText: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
};
