import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import { Badge } from "native-base";
import isUndefined from "lodash/isUndefined";
import analytics from "@segment/analytics-react-native";

//icons
import BackIcon from "../../../assets/SVGs/BackButtonPurple";
import FowrwardIcon from "../../../assets/SVGs/ArrowForwardPurple";
import InstagramIcon from "../../../assets/SVGs/InstagramIcon";
import SnapchatIcon from "../../../assets/SVGs/Snapchat-Border";
import GoogleSE from "../../../assets/SVGs/GoogleAds";

//styles
import styles from "./styles";
import isStringArabic from "../../isStringArabic";

export default class TopStepsHeader extends Component {
  handleTouchableOpacity = () => {
    let { segment, navigation, actionButton } = this.props;
    if (!isUndefined(segment)) {
      analytics.track(segment.source_action, {
        source: segment.source,
        source_action: segment.source_action,
      });
    }
    if (!isUndefined(navigation)) navigation.goBack();
    else actionButton();
  };

  handleProcessSteps = () => {
    let { translate } = this.props.screenProps;
    let steps = this.props.rejected
      ? ["Compose"]
      : [("Details", "Compose", "Audience", "Payment")];
    // if (this.props.adType === "StoryAd") {
    //   steps = ["Details", "Cover", "Compose", "Audience", "Payment"];
    // }
    let stepsComponants = steps.map((step, i) => {
      return (
        <Fragment key={step}>
          <View style={styles.badgeView}>
            <Badge
              style={
                this.props.currentScreen === step
                  ? styles.activeBadege
                  : styles.badge
              }
            >
              <Text
                style={
                  this.props.currentScreen === step
                    ? styles.activeBadegeText
                    : styles.badgeText
                }
              >
                {translate(JSON.stringify(i + 1))}
              </Text>
            </Badge>
            <Text
              style={
                this.props.currentScreen === step
                  ? styles.activeTitleText
                  : styles.badgeText
              }
            >
              {translate(step)}
            </Text>
          </View>
          {steps.length - 1 !== i && <View style={[styles.dash]} />}
        </Fragment>
      );
    });
    return stepsComponants;
  };
  render() {
    let {
      title,
      actionButton,
      containerStyle,
      titleStyle,
      icon,
      translateTitle = true,
      disabled = false,
      iconColor = "#FFF",
      adType,
    } = this.props;
    let { translate } = this.props.screenProps;
    if (translateTitle)
      if (title && typeof title === "object") {
        title = title.map((text) => translate(text));
        if (I18nManager.isRTL) {
          title = title.reverse();
        }
      } else if (title && typeof title === "string") {
        title = translate(title);
      }

    return (
      <View style={styles.progressCardView}>
        <TouchableOpacity
          disabled={disabled}
          onPress={this.handleTouchableOpacity}
          style={[styles.left]}
        >
          {I18nManager.isRTL ? <FowrwardIcon /> : <BackIcon />}
        </TouchableOpacity>

        <View style={styles.registerHeaderIconView}>
          {icon === "snapchat" && (
            <View style={{ paddingHorizontal: 5 }}>
              <SnapchatIcon fill="black" width={30} height={30} />
            </View>
          )}
          {icon === "google" && (
            <View style={{ paddingHorizontal: 5 }}>
              <GoogleSE width={30} style={styles.googleIcon} />
            </View>
          )}
          {icon === "instagram" && (
            <View style={{ paddingHorizontal: 5 }}>
              <InstagramIcon width={30} height={30} />
            </View>
          )}
          <Text
            style={[
              styles.title,
              title &&
                typeof title === "string" &&
                !isStringArabic(title) &&
                styles.english,
            ]}
          >
            {title && typeof title === "string" ? title : title.join(" ")}
          </Text>
        </View>
        <View style={styles.content}>{this.handleProcessSteps()}</View>
      </View>
    );
  }
}
