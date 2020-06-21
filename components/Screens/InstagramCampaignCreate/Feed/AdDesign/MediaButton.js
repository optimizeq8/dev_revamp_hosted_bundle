import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Button, Icon } from "native-base";

import styles from "../../styles/adDesign.styles";

import EditCameraIcon from "../../../../../assets/SVGs/CameraCircleOutline";
export default class MediaButton extends Component {
  render() {
    let {
      media,
      cover,
      snapAdCard,
      _pickImage,
      snapCardInfo,
      _handleStoryAdCards,
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
            snapAdCard
              ? _handleStoryAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item,
                })
              : cover
              ? _pickImage("Images")
              : setMediaModalVisible(true);
          }}
          style={[
            styles.inputMiddleButton2,
            snapAdCard
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
              snapAdCard ? {} : { width: 150 },
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
            snapAdCard
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

            snapAdCard
              ? _handleStoryAdCards({
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
              : !snapAdCard && translate("Add Media")}
          </Text>
        </TouchableOpacity>
      );
    }
  }
}
