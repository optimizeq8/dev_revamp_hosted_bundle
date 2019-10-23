import React, { Component } from "react";
import { Image as RNImage } from "react-native";
import { Image, CacheManager } from "react-native-expo-image-cache";
import { ActivityIndicator } from "react-native-paper";
import { NavigationEvents } from "react-navigation";
const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
export default class RNImageOrCacheImage extends Component {
  state = { path: "" };
  async componentDidMount() {}
  handlCacheLoading = async () => {
    if (this.props.media !== "//") {
      const path = await CacheManager.get(this.props.media).getPath();
      this.setState({ path });
    }
  };
  render() {
    let { media, style, resizeMode, blurRadius } = this.props;
    return (
      <>
        <NavigationEvents onDidFocus={this.handlCacheLoading} />

        {media.includes("https://") ? (
          <>
            {!this.state.path && (
              <ActivityIndicator
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  top: "30%"
                }}
                color="white"
              />
            )}
            <Image style={style} {...{ preview, uri: media }} />
          </>
        ) : (
          <RNImage
            blurRadius={blurRadius}
            resizeMode={resizeMode}
            style={style}
            source={{
              uri: media
            }}
          />
        )}
      </>
    );
  }
}
