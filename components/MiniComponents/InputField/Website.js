import React from "react";
import { View, Text, TouchableOpacity, I18nManager } from "react-native";
import { Item, Input } from "native-base";
import * as Animatable from "react-native-animatable";
import { showMessage } from "react-native-flash-message";

import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import GradientButton from "../GradientButton";

export default class WebsiteComponent extends React.Component {
  state = {
    highlight: false
  };
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const { stateName, register } = this.props;
    const urlError = validateWrapper(
      register ? "url" : "website",
      this.props.networkString + this.props.website
    );
    this.props.getValidInfo(stateName + "Error", urlError);
    if (urlError) {
      showMessage({
        message: register
          ? translate("Please enter a valid URL")
          : translate(
              "Please enter a valid url that does not direct to Instagram, Facebook, WhatsApp, Youtube or any social media"
            ),
        type: "warning",
        position: "top",
        duration: 7000
      });
    }
  };
  handleAnimationEnd = () => {
    // Resets the valueErrors back to null for
    // parent component so that animation can play again
    this.props.getValidInfo("incomplete", false);
    this.props.getValidInfo(this.props.stateName + "Error", null);
  };
  /**
   * Handles onFocus for Input component, if focused sets highlight to true
    to switch to highlight styles  
   */
  focusFeild = () => {
    this.setState({ highlight: true });
  };
  render() {
    const { translate } = this.props.screenProps;
    const {
      customStyle,
      stateNameError,
      optional,
      setNetworkString
    } = this.props;
    return (
      <Animatable.View
        onAnimationEnd={this.handleAnimationEnd}
        duration={200}
        easing={"ease"}
        animation={stateNameError ? "shake" : ""}
      >
        <View style={styles.labelView}>
          <Text
            style={[
              styles.inputLabel,
              this.state.highlight
                ? [GlobalStyles.orangeTextColor]
                : GlobalStyles.whiteTextColor
            ]}
          >
            {translate("Website")}
            {optional && "(" + translate("optional") + ")"}
          </Text>
        </View>
        <Item style={[styles.input1, customStyle]}>
          <GradientButton
            style={styles.networkStringButton}
            onPressAction={() => {
              if (this.props.networkString === "https://") {
                setNetworkString("http://");
              } else {
                setNetworkString("https://");
              }
            }}
          >
            <Text style={styles.networkLabel}>
              {this.props.networkString === "https://" ? "https" : "http"}
            </Text>
            <Text style={styles.networkLabel}>{`< >`}</Text>
          </GradientButton>
          <Input
            style={[
              styles.inputText,
              I18nManager.isRTL ? { textAlign: "right" } : { textAlign: "left" }
            ]}
            onFocus={this.focusFeild}
            placeholder={translate(`Enter your website's URL`)}
            placeholderTextColor={globalColors.white}
            value={this.props.website}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => this.props.setWebsiteValue(value)}
            onBlur={this.validateUrl}
          />
        </Item>
      </Animatable.View>
    );
  }
}
