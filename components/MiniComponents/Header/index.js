import React, { Component } from "react";
import { View, TouchableOpacity, Image, I18nManager, Text } from "react-native";
import { Icon } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import analytics from "@segment/analytics-react-native";
import styles from "./styles";
import BackIcon from "../../../assets/SVGs/BackButton";
import MSGBackIcon from "../../../assets/SVGs/MSGBackButton";
import CloseIcon from "../../../assets/SVGs/Close";
import SnapchatIcon from "../../../assets/SVGs/Snapchat-Border";
import GoogleSE from "../../../assets/SVGs/GoogleAds";
import isUndefined from "lodash/isUndefined";
import isStringArabic from "../../isStringArabic";
const forwardICon = require("../../../assets/images/ForwardIconWhite.png");
import ShareIcon from "../../../assets/SVGs/ShareIcon";
import Settings from "../../../assets/SVGs/Settings";
import InstagramIcon from "../../../assets/images/AdTypes/InstaWhiteLogo";
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
      titleContainerStyle,
      rightViewStyle,
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
              <CloseIcon
                width={RFValue(10, 414)}
                height={RFValue(10, 414)}
                stroke={iconColor}
              />
            )
          ) : (
            <BackIcon
              width={RFValue(12, 414)}
              height={RFValue(12, 414)}
              stroke={iconColor}
            />
          )}
        </TouchableOpacity>
        {icon === "snapchat" && (
          <View style={{ paddingHorizontal: RFValue(2.5, 414) }}>
            <SnapchatIcon
              fill={"black"}
              width={RFValue(15, 414)}
              height={RFValue(15, 414)}
            />
          </View>
        )}
        {icon === "google" && (
          <View style={{ paddingHorizontal: RFValue(2.5, 414) }}>
            <GoogleSE width={RFValue(15, 414)} style={styles.googleIcon} />
          </View>
        )}
        {icon === "instagram" && (
          <View style={{ paddingHorizontal: RFValue(2.5, 414) }}>
            <InstagramIcon
              //   style={styles.instaIcon}
              width={RFValue(15, 414)}
              height={RFValue(15, 414)}
              fill="#fff"
            />
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
          <View style={[styles.titleView, titleContainerStyle]}>
            <Text
              numberOfLines={2}
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
        <View
          pointerEvents={disabled ? "none" : "auto"}
          style={[styles.right, rightViewStyle]}
        >
          {showTopRightButton ? (
            <TouchableOpacity
              disabled={disabled}
              onPress={() => topRightButtonFunction()}
            >
              <Text style={styles.edit}>{topRightButtonText}</Text>
            </TouchableOpacity>
          ) : showTopRightButtonIcon ? (
            <TouchableOpacity
              disabled={disabled}
              onPress={topRightButtonFunction}
            >
              {showTopRightButtonIcon === "settings" ? (
                <Settings width={30} fill={iconColor} />
              ) : showTopRightButtonIcon === "edit" ? (
                <Icon
                  name="edit"
                  type="FontAwesome5"
                  style={{ fontSize: 23, color: "#FFF" }}
                />
              ) : showTopRightButtonIcon === "delete" ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    right: 20,
                    alignItems: "center",
                  }}
                >
                  <BinIcon width={30} fill="#9300ff" />
                  <Text
                    style={{
                      fontFamily: "montserrat-regular",
                      fontSize: 14,
                      color: globalColors.purple,
                    }}
                  >
                    {translate("Delete")}
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
