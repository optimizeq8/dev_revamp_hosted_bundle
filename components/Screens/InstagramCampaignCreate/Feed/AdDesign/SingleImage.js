import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";
import VideoPlayer from "../../../../MiniComponents/VideoPlayer";

// ICONS
import MediaButtonIcon from "../../../../../assets/SVGs/CameraCircleOutline";

// STYLES
import styles from "../../styles/adDesign.styles";

//FUNCTIONS
import { _pickImage } from "./Functions/PickImages";

export default class SingleImage extends React.PureComponent {
  state = { width: null, height: null, AP: 1 / 1 };
  showModal = () => {
    this.props.setMediaModalVisible(true);
  };
  componentDidMount() {
    if (this.props.media) {
      Image.getSize(this.props.media, (width, height) =>
        this.setState({ AP: width / height })
      );
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.media !== this.props.media) {
      Image.getSize(this.props.media, (width, height) =>
        this.setState({ AP: width / height })
      );
    }
  }
  render() {
    const {
      media,
      media_type = "IMAGE",
      videoIsExporting,
      disabled,
    } = this.props;
    const { translate } = this.props.screenProps;
    console.log({
      width: this.state.width,
      height: this.state.height,
    });
    return (
      <View
        style={[
          styles.placeholder,
          {
            aspectRatio: this.state.AP,
          },
        ]}
      >
        {media_type === "VIDEO" && (
          <VideoPlayer
            shouldPlay={false}
            videoIsLoading={videoIsExporting}
            media={media}
          />
        )}
        {media_type === "IMAGE" && (
          <RNImageOrCacheImage
            resizeMode="contain"
            media={media}
            style={[styles.placeholder1]}
          />
        )}

        <TouchableOpacity
          disabled={disabled}
          onPress={this.showModal}
          style={{ alignSelf: "center" }}
        >
          <MediaButtonIcon />
          <Text style={styles.addMediaText}>
            {media === "//" ? translate("Add Media") : translate("Edit Media")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
