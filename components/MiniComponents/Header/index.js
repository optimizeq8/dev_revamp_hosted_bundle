import React, { Component } from "react";
import { View, TouchableOpacity, Image, I18nManager } from "react-native";
import { Text } from "native-base";
import styles from "./styles";
import BackIcon from "../../../assets/SVGs/BackButton";
import CloseIcon from "../../../assets/SVGs/Close";
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
      showTopRightButton,
      containerStyle,
      titelStyle
    } = this.props;
    const { translate } = this.props.screenProps;
    if (title && typeof title === "object") {
      title = title.map(text => translate(text));
      if (I18nManager.isRTL) {
        title = title.reverse();
      }
    } else if (title && typeof title === "string") {
      title = translate(title);
    }
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          onPress={() => {
            if (!isUndefined(segment))
              Segment.trackWithProperties(segment.str, segment.obj);
            if (!isUndefined(navigation)) navigation.goBack();
            else actionButton();
          }}
          style={[
            styles.left,
            I18nManager.isRTL ? { position: "absolute", right: 0, top: 5 } : {}
          ]}
        >
          {closeButton ? (
            <CloseIcon width={17} height={17} />
          ) : (
            <BackIcon width={24} height={24} />
          )}
        </TouchableOpacity>
        {title && typeof title === "object" ? (
          <View
            style={[
              styles.titleView,
              I18nManager.isRTL
                ? {
                    // left: 15
                    bottom: 0
                  }
                : {
                    left: 15,
                    bottom: 12
                  }
            ]}
          >
            {title.map(text => (
              <Text
                key={text}
                uppercase
                style={[
                  styles.titleText,
                  !isStringArabic(text)
                    ? {
                        fontFamily: "montserrat-bold-english"
                      }
                    : {}
                ]}
              >
                {text}
              </Text>
            ))}
          </View>
        ) : (
          <Text
            uppercase
            style={[
              styles.title,
              !isStringArabic(title)
                ? {
                    fontFamily: "montserrat-bold-english"
                  }
                : {},
              titelStyle
            ]}
          >
            {title}
          </Text>
        )}
        <View
          style={[
            styles.right,
            I18nManager.isRTL ? { position: "absolute", left: 5 } : {}
          ]}
        >
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
