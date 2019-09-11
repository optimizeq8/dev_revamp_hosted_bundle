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
    return (
      <Text style={styles.footerTextStyle}>
        {adType === "StoryAd" && !storyAdCards.storyAdSelected
          ? videoIsLoading
            ? "Please wait while the video is downloading"
            : objective !== "BRAND_AWARENESS" && swipeUpError
            ? ""
            : "Please add minimum of 3 media files"
          : objective !== "BRAND_AWARENESS"
          ? ""
          : media === "//"
          ? "Please add media to proceed"
          : ""}
      </Text>
    );
  }
}
