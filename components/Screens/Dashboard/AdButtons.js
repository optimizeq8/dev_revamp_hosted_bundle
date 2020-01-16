import React, { Component } from "react";
import { Text, View, I18nManager, TouchableOpacity } from "react-native";
import isEqual from "react-fast-compare";
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
            style={{}}
            width={ad.mediaType === "google" ? 20 : 30}
            height={ad.mediaType === "google" ? 20 : 30}
            stroke="#fff"
          />
          {ChannelIcon && (
            <ChannelIcon
              width={60}
              height={60}
              style={[
                styles.channelIcon,
                I18nManager.isRTL
                  ? {
                      right: -20
                    }
                  : {
                      left: -20
                    }
              ]}
              fill="#0000"
            />
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.adButtonText,
            !isStringArabic(this.props.translate(ad.title))
              ? {
                  fontFamily: "montserrat-regular-english"
                }
              : {
                  fontFamily: "montserrat-regular"
                }
          ]}
        >
          {this.props.translate(ad.title)}
        </Text>
      </View>
    );
  }
}
