import React, { Component } from "react";
import { Image as RNImage } from "react-native";
import { Image } from "react-native-expo-image-cache";
const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
export default class RNImageOrCacheImage extends Component {
  render() {
    let { media, style, resizeMode, blurRadius } = this.props;
    return media.includes("https://") ? (
      <Image style={style} {...{ preview, uri: media }} />
    ) : (
      <RNImage
        blurRadius={blurRadius}
        resizeMode={resizeMode}
        style={style}
        source={{
          uri: media
        }}
      />
    );
  }
}
