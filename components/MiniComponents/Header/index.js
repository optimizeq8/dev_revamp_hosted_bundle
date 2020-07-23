import React, { Component } from "react";
import { View, TouchableOpacity, Image, I18nManager } from "react-native";
import { Text } from "native-base";
import analytics from "@segment/analytics-react-native";
import styles from "./styles";
import BackIcon from "../../../assets/SVGs/BackButton";
import MSGBackIcon from "../../../assets/SVGs/MSGBackButton";
import CloseIcon from "../../../assets/SVGs/Close";
import SnapchatIcon from "../../../assets/SVGs/Snapchat-Border";
import GoogleSE from "../../../assets/SVGs/GoogleAds";
import * as Segment from "expo-analytics-segment";
import isUndefined from "lodash/isUndefined";
import isStringArabic from "../../isStringArabic";
const forwardICon = require("../../../assets/images/ForwardIconWhite.png");
import ShareIcon from "../../../assets/SVGs/ShareIcon";
import Settings from "../../../assets/SVGs/Settings";
import InstagramIcon from "../../../assets/SVGs/InstagramIcon";
import CalenderkIcon from "../../../assets/SVGs/Calender";
import BinIcon from "../../../assets/SVGs/Bin";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

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
      titleStyle,
      icon,
      backButton,
      translateTitle = true,
      showTopRightButtonIcon = false,
      disabled = false,
      changeHeaderColor = false,
      iconColor = "#FFF",
    } = this.props;
    const { translate } = this.props.screenProps;
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
      <View
        style={[styles.container, { height: 50, padding: 0 }, containerStyle]}
      >
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            if (!isUndefined(segment)) {
              analytics.track(segment.source_action, {
                source: segment.source,
                source_action: segment.source_action,
              });
              Segment.trackWithProperties(segment.str, segment.obj);
            }
            if (!isUndefined(navigation)) navigation.goBack();
            else actionButton();
          }}
          style={[
            styles.left,
            I18nManager.isRTL && {
              transform: [{ rotateY: "180deg" }, { translateX: -13 }],
            },
          ]}
        >
          {closeButton ? (
            backButton === "messenger" ? (
              <MSGBackIcon width={40} height={40} />
            ) : (
              <CloseIcon width={23} height={23} stroke={iconColor} />
            )
          ) : (
            <BackIcon width={24} height={24} stroke={iconColor} />
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
        {icon === "instagram" && (
          <View style={{ paddingHorizontal: 5 }}>
            <InstagramIcon width={30} height={24} fill="#fff" />
          </View>
        )}
        {icon === "calendar" && (
          <CalenderkIcon
            width={heightPercentageToDP(5) < 30 ? 15 : 30}
            height={heightPercentageToDP(5) < 30 ? 15 : 30}
            fill="#000"
            style={styles.icon}
          />
        )}
        {title && typeof title === "object" ? (
          <View style={[styles.titleView]}>
            {title.map((text) => (
              <Text
                key={text}
                uppercase
                style={[
                  styles.titleText,
                  !isStringArabic(text)
                    ? {
                        fontFamily: "montserrat-bold-english",
                      }
                    : {},
                  titleStyle,
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
                      fontFamily: "montserrat-bold-english",
                    }
                  : {},
                titleStyle,
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
          ) : showTopRightButtonIcon ? (
            <TouchableOpacity onPress={topRightButtonFunction}>
              {showTopRightButtonIcon === "settings" ? (
                <Settings width={30} />
              ) : showTopRightButtonIcon === "delete" ? (
                <View
                  style={{ display: "flex", flexDirection: "row", right: 20 }}
                >
                  <BinIcon width={30} fill="#9300ff" />
                  <Text
                    style={{
                      fontFamily: "montserrat-regular",
                      fontSize: 14,
                      color: globalColors.purple,
                    }}
                  >
                    Delete
                  </Text>
                </View>
              ) : (
                <ShareIcon fill="#fff" />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
