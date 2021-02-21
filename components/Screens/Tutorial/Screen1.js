import React, { Component } from "react";
import { View, Text, I18nManager } from "react-native";
import * as Animatable from "react-native-animatable";
import { RFValue } from "react-native-responsive-fontsize";
import { snapAds, googleAds } from "../../Data/adTypes.data";
import styles from "./styles";
export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.adTypesData = [...snapAds, ...googleAds];
  }

  render() {
    const { translate } = this.props.screenProps;
    const { id, activeSlide, changed } = this.props;

    return (
      <View style={styles.screen1OuterView}>
        {id === activeSlide &&
          this.adTypesData.map((item) => {
            let AdIcon = item.icon;
            let ChannelIcon = item.channelIcon;
            return (
              <Animatable.View
                duration={2000}
                animation={"bounceInDown"}
                key={item.title}
                style={styles.screen1innerView}
              >
                <View style={styles.screen1Container}>
                  <AdIcon
                    style={{ alignSelf: "center" }}
                    width={
                      item.mediaType === "google"
                        ? RFValue(12.5, 414)
                        : RFValue(17.5, 414)
                    }
                    height={
                      item.mediaType === "google"
                        ? RFValue(12.5, 414)
                        : RFValue(17.5, 414)
                    }
                  />
                  {ChannelIcon && (
                    <ChannelIcon
                      width={RFValue(37.5, 414)}
                      height={RFValue(37.5, 414)}
                      style={[
                        styles.channelIcon,
                        I18nManager.isRTL
                          ? {
                              right: -30,
                            }
                          : {
                              left: -30,
                            },
                      ]}
                      fill={item.mediaType === "google" ? "#0000" : "black"}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.slide1Title,
                    {
                      fontFamily:
                        item.mediaType === "google"
                          ? "montserrat-bold"
                          : "montserrat-bold-english",
                    },
                  ]}
                >
                  {translate(item.title)}
                </Text>
              </Animatable.View>
            );
          })}
      </View>
    );
  }
}
