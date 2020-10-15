import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "../../styles/adDesign.styles";

// Icons
import EditCameraIcon from "../../../../../assets/SVGs/CameraCircleOutline";

export default class MediaButton extends Component {
  render() {
    let {
      media,
      cover,
      carouselAdCard,
      _pickImage,
      snapCardInfo,
      _handlecarouselAdCards,
      setMediaModalVisible,
      type,
      disabled,
    } = this.props;
    const { translate } = this.props.screenProps;

    if (media && media !== "//") {
      return (
        <TouchableOpacity
          disabled={disabled}
          transparent
          onPress={() => {
            carouselAdCard
              ? _handlecarouselAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item,
                })
              : cover
              ? _pickImage("Images")
              : setMediaModalVisible(true);
          }}
          style={[
            styles.inputMiddleButton2,
            carouselAdCard
              ? {
                  width: "100%",
                  height: 40,
                  top: "30%",
                }
              : {},
          ]}
        >
          <EditCameraIcon width={"100%"} height={"100%"} />
          <Text
            style={[
              styles.mediaButtonMsgEdit,
              carouselAdCard ? {} : { width: 150 },
            ]}
          >
            {type === "cover"
              ? translate("Edit Cover Image")
              : translate("Edit Media")}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.inputMiddleButton,
            carouselAdCard
              ? {
                  width: 34,
                  height: 36,
                  top: "27%",
                  // left: "85%"
                }
              : {},
          ]}
          onPress={() => {
            // this._pickImage();

            carouselAdCard
              ? _handlecarouselAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item,
                })
              : cover
              ? _pickImage("Images")
              : setMediaModalVisible(true);
          }}
        >
          <EditCameraIcon width={"100%"} height={"100%"} name="camera" />
          <Text style={[styles.mediaButtonMsg]}>
            {type === "cover"
              ? translate("Add Cover Image")
              : !carouselAdCard && translate("Add Media")}
          </Text>
        </TouchableOpacity>
      );
    }
  }
}
