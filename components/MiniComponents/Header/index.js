import React, { Component } from "react";
import { View, TouchableOpacity, Image, I18nManager } from "react-native";
import { Text } from "native-base";
import styles from "./styles";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import CloseIcon from "../../../assets/SVGs/Close.svg";
import * as Segment from "expo-analytics-segment";
import isUndefined from "lodash/isUndefined";
import isStringArabic from "../../isStringArabic";
const forwardICon = require("../../../assets/images/ForwardIconWhite.png");

export default class Header extends Component {
  render() {
    let {
      segment,
      title,
      navigation,
      closeButton,
      selectedCampaign,
      actionButton,
      campaignEnded,
      topRightButtonFunction,
      topRightButtonText,
      showTopRightButton
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (!isUndefined(segment))
              Segment.trackWithProperties(segment.str, segment.obj);
            if (!isUndefined(navigation)) navigation.goBack();
            else actionButton();
          }}
          style={[
            styles.left,
            I18nManager.isRTL ? { position: "absolute", right: 15 } : {}
          ]}
        >
          {closeButton ? (
            <CloseIcon width={17} height={17} />
          ) : (
            <BackIcon width={24} height={24} />
          )}
        </TouchableOpacity>
        <Text
          uppercase
          style={[
            styles.title,
            title &&
            (title.includes("Snap Ad") ||
              title.includes("Story Ad") ||
              title.includes("Collection Ad"))
              ? { fontFamily: "montserrat-bold-english" }
              : {}
          ]}
        >
          {title}
        </Text>
        <View style={[styles.right]}>
          {showTopRightButton ? (
            <Text onPress={() => topRightButtonFunction()} style={styles.edit}>
              {topRightButtonText}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
}
