import React from "react";
import { View, Text, TouchableOpacity, I18nManager } from "react-native";
import { Item, Input } from "native-base";
import * as Animatable from "react-native-animatable";
import { showMessage } from "react-native-flash-message";

import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import GradientButton from "../GradientButton";

//Icon
import WebsiteIcon from "../../../assets/SVGs/SwipeUps/Website";

export default class WebsiteComponent extends React.Component {
  state = {
    highlight: false
  };
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const { stateName, register, deepLink } = this.props;
    const urlError = validateWrapper(
      deepLink ? "deepLink" : register ? "url" : "website",
      this.props.website
    );
    console.log("urlError", urlError);

    this.props.getValidInfo &&
      this.props.getValidInfo(stateName + "Error", urlError);
    if (urlError && this.props.website) {
      const regex = /(snapchat.|instagram.|youtube.|youtu.be|facebook.|fb.me|whatsapp.|wa.me)/g;

      showMessage({
        message: deepLink
          ? translate("Invalid deep link URL")
          : register
          ? translate("Please enter a valid URL")
          : !this.props.website.match(regex)
          ? "Please enter a valid url"
          : "Please enter a valid url that does not direct to Instagram, Facebook, WhatsApp, Youtube or any social media",
        description: deepLink
          ? translate(
              "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://urlcom'"
            )
          : "",
        type: "warning",
        position: "top",
        duration: 7000
      });
    }
    this.setState({ highlight: false });
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
      setNetworkString,
      disabled,
      label = "Website",
      placeholder = "Enter your website's URL"
    } = this.props;
    return (
      <Animatable.View
        onAnimationEnd={this.handleAnimationEnd}
        duration={200}
        easing={"ease"}
        animation={stateNameError ? "shake" : ""}
      >
        <Item disabled={disabled} style={[styles.input1, customStyle]}>
          <WebsiteIcon
            width={23}
            height={24}
            style={styles.icon}
            fill={
              this.state.highlight ? globalColors.orange : globalColors.white
            }
          />
          <View style={styles.colView}>
            <Text
              style={[
                styles.inputLabel,
                this.state.highlight
                  ? [GlobalStyles.orangeTextColor]
                  : GlobalStyles.whiteTextColor
              ]}
            >
              {translate(label)}
              {optional && "(" + translate("optional") + ")"}
            </Text>
            <Input
              style={[
                styles.inputText
                // I18nManager.isRTL ? { textAlign: "right" } : { textAlign: "left" }
              ]}
              ref={input => {
                this.props.inputs && (this.props.inputs["inputWeb"] = input);
              }}
              disabled={disabled}
              onFocus={this.focusFeild}
              placeholder={translate(placeholder)}
              placeholderTextColor={globalColors.white}
              value={this.props.website}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.props.setWebsiteValue(value)}
              onBlur={this.validateUrl}
            />
          </View>
        </Item>
      </Animatable.View>
    );
  }
}