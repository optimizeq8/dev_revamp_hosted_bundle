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

    let errmsg;
    if (
      (adType === "CollectionAd" && this.props.collectionAdMedia.length < 4) ||
      this.props.collectionAdMedia.includes(undefined)
    )
      errmsg = "Add more products to proceed";
    return (
      <View style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
        <Text style={styles.footerTextStyle}>
          {adType === "StoryAd" && !storyAdCards.storyAdSelected
            ? videoIsLoading
              ? translate("Please wait while the video is downloading")
              : objective !== "BRAND_AWARENESS" && swipeUpError
              ? ""
              : translate("Please add minimum of 3 media files")
            : adType === "CollectionAd"
            ? errmsg
            : objective !== "BRAND_AWARENESS" && ""}
        </Text>
        <Text style={styles.footerTextStyle}>
          {media === "//" ? translate("Please add media to proceed") : ""}
        </Text>
      </View>
    );
  }
}
