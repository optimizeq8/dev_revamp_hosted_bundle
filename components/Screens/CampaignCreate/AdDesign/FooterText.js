import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
export default class FooterText extends Component {
  render() {
    let {
      adType,
      videoIsLoading,
      objective,
      swipeUpError,
      media,
      storyAdCards
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Text style={styles.footerTextStyle}>
        {adType === "StoryAd" && !storyAdCards.storyAdSelected
          ? videoIsLoading
            ? translate("Please wait while the video is downloading")
            : objective !== "BRAND_AWARENESS" && swipeUpError
            ? ""
            : "Please add minimum of 3 media files"
          : objective !== "BRAND_AWARENESS"
          ? ""
          : media === "//"
          ? translate("Please add media to proceed")
          : ""}
      </Text>
    );
  }
}
