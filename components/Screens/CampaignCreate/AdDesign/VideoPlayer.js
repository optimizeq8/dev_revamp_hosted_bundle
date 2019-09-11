import React, { Component } from "react";
import { Text, View } from "react-native";
import { Video } from "expo-av";
import styles from "./styles";
export default class VideoPlayer extends Component {
  render() {
    let { storyAdCards, media, videoIsLoading } = this.props;
    return (
      <Video
        onLoadStart={() =>
          ((storyAdCards.selectedStoryAd.media &&
            storyAdCards.storyAdSelected) ||
            media) &&
          videoIsLoading(true)
        }
        onLoad={() => videoIsLoading(false)}
        source={{
          uri:
            media !== "//" && !storyAdCards.storyAdSelected
              ? media
              : storyAdCards.selectedStoryAd.media &&
                storyAdCards.storyAdSelected
              ? storyAdCards.selectedStoryAd.media
              : "//"
        }}
        shouldPlay
        isLooping
        isMuted
        resizeMode={"stretch"}
        style={styles.video}
      />
    );
  }
}
