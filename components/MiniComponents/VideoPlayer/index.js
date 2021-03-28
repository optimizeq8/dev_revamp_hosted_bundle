import React, { Component } from "react";
import { Video } from "expo-av";
import styles from "./styles";
export default class VideoPlayer extends Component {
  render() {
    let {
      shouldPlay = true,
      media,
      videoIsLoading,
      isMuted = true,
      onReadyForDisplay,
    } = this.props;
    return (
      <Video
        onLoadStart={() =>
          media !== "//" && videoIsLoading && videoIsLoading(true)
        }
        onLoad={() => videoIsLoading && videoIsLoading(false)}
        source={{
          uri: media !== "//" ? media : "dfv.dfv",
        }}
        shouldPlay={shouldPlay}
        isLooping
        isMuted={isMuted}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        style={styles.video}
        onReadyForDisplay={onReadyForDisplay}
      />
    );
  }
}
