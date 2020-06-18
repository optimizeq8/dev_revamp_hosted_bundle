import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";
import VideoPlayer from "../../../../MiniComponents/VideoPlayer";

// ICONS
import MediaButtonIcon from "../../../../../assets/SVGs/CameraCircleOutline";

// STYLES
import styles from "../../styles/adDesign.styles";

//FUNCTIONS
import { _pickImage } from "./Functions/PickImages";

export default class SingleImage extends React.PureComponent {
  render() {
    const {
      media,
      setTheState,
      screenProps,
      save_campaign_info_instagram,
      media_type = "IMAGE",
      videoIsLoading,
      setMediaModalVisible,
      disabled,
    } = this.props;
    const { translate } = this.props.screenProps;

    return (
      <View style={[styles.placeholder]}>
        {media_type === "VIDEO" && (
          <VideoPlayer videoIsLoading={videoIsLoading} media={media} />
        )}
        {media_type === "IMAGE" && (
          <RNImageOrCacheImage media={media} style={styles.placeholder1} />
        )}

        <TouchableOpacity
          disabled={disabled}
          onPress={() =>
            // _pickImage(
            //   "All",
            //   save_campaign_info_instagram,
            //   setTheState,
            //   screenProps
            // )
            setMediaModalVisible(true)
          }
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
