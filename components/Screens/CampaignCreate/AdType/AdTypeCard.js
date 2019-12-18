import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as Segment from "expo-analytics-segment";
import { ActivityIndicator } from "react-native-paper";

//styles
import styles from "./styles";
import { globalColors } from "../../../../GlobalStyles";
import isStringArabic from "../../../isStringArabic";
export default class AdTypeCard extends Component {
  render() {
    let adType = this.props.adType;
    const { translate } = this.props.screenProps;
    return (
      <TouchableOpacity
        onPress={() => {
          Segment.trackWithProperties(`${adType.title} AdType Card Button`, {
            business_name: this.props.mainBusiness.businessname,
            campaign_type: this.props.campaign_type
          });
          this.props.navigationHandler(adType);
        }}
      >
        <View style={styles.typeCardContainer}>
          <Text
            style={[
              styles.slidTitle,
              !isStringArabic(translate(adType.title))
                ? {
                    fontFamily: "montserrat-bold-english"
                  }
                : {}
            ]}
          >
            {translate(adType.title)}{" "}
          </Text>
          <View
            style={[
              styles.placeholder,
              {
                width: adType.mediaType === "google" ? "180%" : "100%",
                backgroundColor:
                  adType.mediaType === "google" ? "#0000" : "#fff"
              }
            ]}
          >
            <Image
              loadingIndicatorSource={
                <ActivityIndicator color={globalColors.white} />
              }
              style={styles.media}
              resizeMode={adType.mediaType === "google" ? "contain" : "stretch"}
              source={adType.media}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
