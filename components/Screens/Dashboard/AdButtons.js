import React, { Component } from "react";
import { Text, View, I18nManager, TouchableOpacity } from "react-native";
import isEqual from "react-fast-compare";
import { RFValue } from "react-native-responsive-fontsize";
//styles
import styles from "./styles";
export default class AdButtons extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }
  render() {
    let ad = this.props.ad;
    let AdIcon = ad.icon;
    let ChannelIcon = ad.channelIcon;
    return (
      <View style={styles.adButtonView}>
        <TouchableOpacity
          style={styles.snapAd}
          onPress={() => {
            this.props.navigationHandler(ad);
          }}
        >
          <AdIcon
            width={
              ad.mediaType === "google" ? RFValue(10, 414) : RFValue(15, 414)
            }
            height={
              ad.mediaType === "google" ? RFValue(10, 414) : RFValue(15, 414)
            }
          />
          {ChannelIcon && (
            <ChannelIcon
              width={
                ad.mediaType === "instagram"
                  ? RFValue(13.5, 414)
                  : RFValue(30, 414)
              }
              height={
                ad.mediaType === "instagram"
                  ? RFValue(13.5, 414)
                  : RFValue(30, 414)
              }
              style={[
                styles.channelIcon,
                I18nManager.isRTL
                  ? {
                      top:
                        ad.mediaType === "instagram"
                          ? RFValue(-5, 414)
                          : RFValue(-11, 414),
                      right: -20,
                    }
                  : {
                      top:
                        ad.mediaType === "instagram"
                          ? RFValue(-5, 414)
                          : RFValue(-11, 414),

                      left: ad.mediaType === "instagram" ? -10 : -20,
                    },
              ]}
              fill={ad.mediaType === "google" ? "#0000" : "#000"}
            />
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.adButtonText,
            !isStringArabic(this.props.translate(ad.title))
              ? {
                  fontFamily: "montserrat-bold-english",
                }
              : {
                  fontFamily: "montserrat-bold",
                },
          ]}
        >
          {"\u200F"} {this.props.translate(ad.title)}
          {/**Added speecial character for strings that has combination of english and arabic */}
        </Text>
      </View>
    );
  }
}
