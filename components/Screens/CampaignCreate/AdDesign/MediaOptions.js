import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
//icons
import CameraIcon from "../../../../assets/SVGs/CameraOption";
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";
import UploadIcon from "../../../../assets/SVGs/UploadDevice";
import DownloadIcon from "../../../../assets/SVGs/DownloadDevice";

import { globalColors } from "../../../../GlobalStyles";
import styles from "./styles";
import { Icon } from "native-base";

export default class MediaOptions extends Component {
  handleOptionSelect = () => {
    let { title, rejected, media_type, adType } = this.props;
    if (title === "Media Library") {
      this.props.setExistingMediaModal(true);
      this.props.getExistingMediaSnapchatList(adType);
    } else if (title === "Upload media from a different device") {
      this.props.setUploadFromDifferentDeviceModal(true);
      this.props.setMediaModalVisible(false);
    } else if (title === "Download media from a different device") {
      this.props.setDownloadMediaModal(true);
      this.props.getWebUploadLinkMedia();
    } else if (title === "Media") {
      this.props._pickImage(
        rejected
          ? !media_type || media_type === ""
            ? "All"
            : media_type === "IMAGE"
            ? "Images"
            : "Videos"
          : "All"
      );
    } else {
      this.props._pickImage(
        rejected ? (media_type === "IMAGE" ? "Images" : "Videos") : "All",
        {
          mediaUri: this.props.mediaUri,
          serialization: this.props.serialization,
          media_type: this.props.media_type,
        },
        true
      );
    }
  };
  descriptionText = () => {
    let { title } = this.props;
    const { translate } = this.props.screenProps;
    let desctext = "";
    switch (title) {
      case "Media":
        desctext = "Dimensions 1080x1920 Aspect Ratio 9:16";
        break;
      case "Video":
        desctext = "Dimensions 1080x1920 Aspect Ratio 9:16";
        break;
      case "Upload media from a different device":
        desctext = "Use any device to upload your media Aspect Ratio 9:16";
        break;
      case "Download media from a different device":
        desctext = "Dimensions 1080x1920 Aspect Ratio 9:16";
        break;
      case "Media Library":
        desctext = "Select an existing media from previously launched campaign";
        break;
      default:
        desctext = "Dimensions 1080x1920 Aspect Ratio 9:16";
    }
    return translate(desctext);
  };
  render() {
    let { title } = this.props;
    const { translate } = this.props.screenProps;
    let imageIcon = null;
    if (title === "Media Library") {
      imageIcon = (
        <CameraIcon
          width={RFValue(15, 414)}
          height={RFValue(12.5, 414)}
          fill={globalColors.orange}
        />
      );
    } else if (title === "Media") {
      imageIcon = (
        <CameraIcon
          width={RFValue(15, 414)}
          height={RFValue(12.5, 414)}
          fill={globalColors.orange}
        />
      );
    } else if (title === "Video") {
      imageIcon = (
        <VideoIcon
          width={RFValue(15, 414)}
          height={RFValue(15, 414)}
          fill={globalColors.orange}
        />
      );
    } else if (title === "Upload media from a different device") {
      imageIcon = (
        <UploadIcon
          width={RFValue(17.5, 414)}
          height={RFValue(17.5, 414)}
          fill={globalColors.orange}
        />
      );
    } else if (title === "Download media from a different device") {
      imageIcon = (
        <DownloadIcon
          width={RFValue(17.5, 414)}
          height={RFValue(17.5, 414)}
          fill={globalColors.orange}
        />
      );
    } else {
      imageIcon = (
        <Icon
          name="square-edit-outline"
          type="MaterialCommunityIcons"
          style={{ color: globalColors.orange, fontSize: RFValue(17.5, 414) }}
        />
      );
    }
    return (
      <TouchableOpacity
        onPress={() => this.handleOptionSelect()}
        style={styles.MediaOptionsStyle}
      >
        {imageIcon}
        <View
          style={{
            flexDirection: "column",
            marginLeft: RFValue(5, 414),
            flex: 1,
          }}
        >
          <Text style={styles.MediaOptionsTitle}>{translate(title)}</Text>
          <Text style={[styles.MediaOptionsDescription]}>
            {this.descriptionText()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
