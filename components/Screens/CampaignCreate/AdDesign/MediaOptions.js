import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";

//icons
import CameraIcon from "../../../../assets/SVGs/Camera";
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";

import { globalColors } from "../../../../GlobalStyles";
import styles from "./styles";

export default class MediaOptions extends Component {
  handleOptionSelect = () => {
    let { title } = this.props;

    if (Platform.OS === "ios" && title === "Video") {
      this.props.getVideoUploadUrl();
    } else if (title === "Upload media from a different device") {
      this.props.setUploadFromDifferentDeviceModal(true);
      this.props.setMediaModalVisible(false);
    } else if (title === "Download media from a different device") {
      this.props.setDownloadMediaModal(true);
      this.props.getWebUploadLinkMedia();
    } else {
      this.props._pickImage(title === "Image" ? "Images" : "Videos");
    }
  };
  render() {
    let { title } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <TouchableOpacity
        onPress={() => this.handleOptionSelect()}
        style={styles.MediaOptionsStyle}
      >
        {title === "Image" ? (
          <CameraIcon width={30} height={25} fill={globalColors.orange} />
        ) : (
          <VideoIcon width={30} height={30} fill={globalColors.orange} />
        )}
        <View style={{ flexDirection: "column", marginLeft: 30 }}>
          <Text style={styles.MediaOptionsTitle}>{translate(title)}</Text>
          <Text style={[styles.MediaOptionsDescription]}>
            {title === "Upload media from a different device"
              ? translate(
                  "Use any device to upload your media Aspect Ratio 9:16"
                )
              : translate("Dimensions 1080x1920 Aspect Ratio 9:16")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
