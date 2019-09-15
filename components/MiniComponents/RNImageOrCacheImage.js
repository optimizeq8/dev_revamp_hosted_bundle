import React, { Component } from "react";
import { Image as RNImage } from "react-native";
import { Image } from "react-native-expo-image-cache";
const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
export default class RNImageOrCacheImage extends Component {
  render() {
    let { media, style, resizeMode } = this.props;
    return media.includes("https://") ? (
      <Image resizeMode="stretch" style={style} {...{ preview, uri: media }} />
    ) : (
      <RNImage
        resizeMode={resizeMode}
        style={style}
        source={{
          uri: media
        }}
      />
    );
  }
}
