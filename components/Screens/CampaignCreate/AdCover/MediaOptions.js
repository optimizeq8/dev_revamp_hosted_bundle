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
    let { title } = this.props;

    if (title === "Image") {
      this.props._pickImage();
    } else {
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
        <CameraIcon
          width={RFValue(15, 414)}
          height={RFValue(12.5, 414)}
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
