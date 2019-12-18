import React, { Component } from "react";
import { View, TouchableOpacity, Image, I18nManager } from "react-native";
import { Text } from "native-base";
import styles from "./styles";
import BackIcon from "../../../assets/SVGs/BackButton";
import CloseIcon from "../../../assets/SVGs/Close";
import SnapchatIcon from "../../../assets/SVGs/Snapchat-Border";
import GoogleSE from "../../../assets/SVGs/GoogleAds";
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
      titelStyle,
      icon,
      translateTitle = true
    } = this.props;
    const { translate } = this.props.screenProps;
    if (translateTitle)
      if (title && typeof title === "object") {
        title = title.map(text => translate(text));
        if (I18nManager.isRTL) {
          title = title.reverse();
        }
      } else if (title && typeof title === "string") {
        title = translate(title);
      }
    return (
      <View
        style={[styles.container, { height: 50, padding: 0 }, containerStyle]}
      >
        <TouchableOpacity
          onPress={() => {
            if (!isUndefined(segment))
              Segment.trackWithProperties(segment.str, segment.obj);
            if (!isUndefined(navigation)) navigation.goBack();
            else actionButton();
          }}
          style={[
            styles.left,
            I18nManager.isRTL && {
              transform: [{ rotateY: "180deg" }, { translateX: -13 }]
            }
          ]}
        >
          {closeButton ? (
            <CloseIcon width={23} height={23} />
          ) : (
            <BackIcon width={24} height={24} />
          )}
        </TouchableOpacity>
        {icon === "snapchat" && (
          <View style={{ paddingHorizontal: 5 }}>
            <SnapchatIcon width={30} height={30} />
          </View>
        )}
        {icon === "google" && (
          <View style={{ paddingHorizontal: 5 }}>
            <GoogleSE width={30} style={styles.googleIcon} />
          </View>
        )}
        {title && typeof title === "object" ? (
          <View style={[styles.titleView]}>
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
                    : {},
                  titelStyle
                ]}
              >
                {text}
              </Text>
            ))}
          </View>
        ) : (
          <View style={[styles.titleView]}>
            <Text
              numberOfLines={2}
              uppercase
              style={[
                styles.titleText,
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
          </View>
        )}
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
