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
    highlight: false,
  };
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const { stateName, deepLink } = this.props;
    const urlError = validateWrapper(
      deepLink ? "deepLink" : "website",
      this.props.website
    );
    this.props.getValidInfo &&
      this.props.getValidInfo(stateName + "Error", urlError);
    if (urlError && this.props.website) {
      const regex = /(snapchat.|instagram.|youtube.|youtu.be|facebook.|fb.me|whatsapp.|wa.me|api.whatsapp.)/g;

      showMessage({
        message: deepLink
          ? translate("Invalid deep link URL")
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
        duration: 7000,
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

  /**
   * Even field is touched outside bring it to focus
   */
  bringFieldToFocus = () => {
    this.refs["websiteField"]._root.focus();
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
      placeholder = "Enter your website's URL",
      iconFill,
      labelColor,
      inputColor = "#FFF",
      customIconColor,
      customTextStyle,
    } = this.props;
    return (
      <Animatable.View
        onAnimationEnd={this.handleAnimationEnd}
        duration={200}
        easing={"ease"}
        animation={stateNameError ? "shake" : ""}
      >
        <Item
          onPress={this.bringFieldToFocus}
          disabled={disabled}
          style={[styles.input1, customStyle]}
        >
          <WebsiteIcon
            width={23}
            height={24}
            style={styles.icon}
            fill={
              iconFill
                ? iconFill
                : this.state.highlight
                ? globalColors.orange
                : globalColors.rum
            }
          />
          <View style={styles.colView}>
            <Text
              style={[
                styles.inputLabel,
                labelColor
                  ? { color: labelColor }
                  : this.state.highlight
                  ? GlobalStyles.orangeTextColor
                  : GlobalStyles.rumTextColor,
              ]}
            >
              {translate(label)}
              {optional && "(" + translate("optional") + ")"}
            </Text>
            <Input
              style={[
                styles.inputText,
                {
                  fontFamily: "montserrat-light-english",
                  color: inputColor,
                  fontSize:
                    this.props.website && this.props.website.length > 43
                      ? 7
                      : this.props.website && this.props.website.length > 38
                      ? 8.5
                      : this.props.website && this.props.website.length > 30
                      ? 9
                      : 12,
                },
                customTextStyle,
                // I18nManager.isRTL ? { textAlign: "right" } : { textAlign: "left" }
              ]}
              ref={"websiteField"}
              disabled={disabled}
              onFocus={this.focusFeild}
              placeholder={translate(placeholder)}
              placeholderTextColor={globalColors.white}
              value={this.props.website}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(value) => this.props.setWebsiteValue(value)}
              onBlur={this.validateUrl}
            />
          </View>
        </Item>
      </Animatable.View>
    );
  }
}
