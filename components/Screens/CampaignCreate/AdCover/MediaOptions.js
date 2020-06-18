import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";

//icons
import CameraIcon from "../../../../assets/SVGs/Camera";
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";
import UploadIcon from "../../../../assets/SVGs/UploadDevice";
import DownloadIcon from "../../../../assets/SVGs/DownloadDevice";

import { globalColors } from "../../../../GlobalStyles";
import styles from "./styles";
import segmentEventTrack from "../../../segmentEventTrack";
import { Icon } from "native-base";

export default class MediaOptions extends Component {
  handleOptionSelect = () => {
    let { title } = this.props;

    if (title === "Image") {
      segmentEventTrack(
        ` Cover Image Picker option selected to open gallery to upload Cover Image `
      );
      this.props._pickImage();
    } else {
      segmentEventTrack(`Cover Image edit option selected`);
      this.props._pickImage(
        {
          mediaUri: this.props.mediaUri,
          serialization: this.props.serialization,
        },
        true
      );
    }
  };
  render() {
    let { title, disabled } = this.props;
    const { translate } = this.props.screenProps;
    let imageIcon = null;
    if (title === "Image") {
      imageIcon = (
        <CameraIcon width={30} height={25} fill={globalColors.orange} />
      );
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
        disabled={disabled}
        onPress={() => this.handleOptionSelect()}
        style={styles.MediaOptionsStyle}
      >
        {imageIcon}
        <View style={{ flexDirection: "column", marginLeft: 10, flex: 1 }}>
          <Text style={styles.MediaOptionsTitle}>{translate(title)}</Text>
          <Text style={[styles.MediaOptionsDescription]}>
            {translate("Dimensions 1080x1920 Aspect Ratio 9:16")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
