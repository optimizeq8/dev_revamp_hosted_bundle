import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";

//icons
import CameraIcon from "../../../../assets/SVGs/Camera";
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";

import { globalColors } from "../../../../GlobalStyles";
import styles from "./styles";

export default class MediaOptions extends Component {
  render() {
    let { title } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          Platform.OS === "ios" && title === "Video"
            ? this.props.getVideoUploadUrl()
            : this.props._pickImage(title === "Image" ? "Images" : "Videos")
        }
        style={styles.MediaOptionsStyle}
      >
        {title === "Image" ? (
          <CameraIcon width={30} height={25} fill={globalColors.orange} />
        ) : (
          <VideoIcon width={30} height={30} fill={globalColors.orange} />
        )}
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.MediaOptionsTitle}>{title}</Text>
          <Text style={styles.MediaOptionsDescription}>
            Dimensions 1080x1920
            {"\n"}Aspect Ratio 9:16
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
