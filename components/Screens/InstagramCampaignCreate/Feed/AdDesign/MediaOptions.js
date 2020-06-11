import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";

//icons
import CameraIcon from "../../../../../assets/SVGs/Camera";
import VideoIcon from "../../../../../assets/SVGs/SwipeUps/Video";
import UploadIcon from "../../../../../assets/SVGs/UploadDevice";
import DownloadIcon from "../../../../../assets/SVGs/DownloadDevice";

import styles from "../../styles/mediaModal.styles";
import segmentEventTrack from "../../../../segmentEventTrack";
import { Icon } from "native-base";
import { globalColors } from "../../../../../GlobalStyles";

export default class MediaOptions extends Component {
  handleOptionSelect = () => {
    let { title } = this.props;

    // if (title === "Upload media from a different device") {
    //   segmentEventTrack("Option upload media from different device selected");
    //   this.props.setUploadFromDifferentDeviceModal(true);
    //   this.props.setMediaModalVisible(false);
    // } else if (title === "Download media from a different device") {
    //   segmentEventTrack("Option download media from different device selected");
    //   this.props.setDownloadMediaModal(true);
    //   this.props.getWebUploadLinkMedia();
    // } else
    if (title === "Media") {
      segmentEventTrack(
        ` Media Picker option selected to open gallery to upload Media `
      );
      this.props._pickImage("Images");
    } else {
      segmentEventTrack(` Image edit option selected`);
      this.props._pickImage(
        "Images",
        {
          mediaUri: this.props.mediaUri,
          serialization: this.props.serialization,
          media_type: this.props.media_type,
        },
        true
      );
    }
  };
  render() {
    let { title } = this.props;
    const { translate } = this.props.screenProps;
    let imageIcon = null;
    if (title === "Media") {
      imageIcon = (
        <CameraIcon width={30} height={25} fill={globalColors.orange} />
      );
    } else if (title === "Video") {
      imageIcon = (
        <VideoIcon width={30} height={30} fill={globalColors.orange} />
      );
      // } else if (title === "Upload media from a different device") {
      //   imageIcon = (
      //     <UploadIcon width={35} height={35} fill={globalColors.orange} />
      //   );
      // } else if (title === "Download media from a different device") {
      //   imageIcon = (
      //     <DownloadIcon width={35} height={35} fill={globalColors.orange} />
      //   );
    } else {
      imageIcon = (
        <Icon
          name="square-edit-outline"
          type="MaterialCommunityIcons"
          style={{ color: globalColors.orange, fontSize: 35 }}
        />
      );
    }
    return (
      <TouchableOpacity
        onPress={() => this.handleOptionSelect()}
        style={styles.MediaOptionsStyle}
      >
        {imageIcon}
        <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
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
