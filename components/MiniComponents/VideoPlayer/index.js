import React, { Component } from "react";
import { Video } from "expo-av";
import styles from "./styles";
export default class VideoPlayer extends Component {
  render() {
    let { media, videoIsLoading } = this.props;
    return (
      <Video
        onLoadStart={() => media !== "//" && videoIsLoading(true)}
        onLoad={() => videoIsLoading(false)}
        source={{
          uri: media !== "//" ? media : "dfv.dfv"
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
