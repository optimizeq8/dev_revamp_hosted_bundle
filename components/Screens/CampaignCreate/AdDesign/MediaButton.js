import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";

import styles from "./styles";

import EditCameraIcon from "../../../../assets/SVGs/CameraCircleOutline";
import MediaButtonIcon from "../../../../assets/SVGs/MediaButtonIcon";
export default class MediaButton extends Component {
  render() {
    let {
      image,
      cover,
      snapAdCard,
      _pickImage,
      snapCardInfo,
      _handleStoryAdCards,
      setMediaModalVisible
    } = this.props;

    if (image && image !== "//") {
      return (
        <Button
          transparent
          onPress={() => {
            // this._pickImage();
            snapAdCard
              ? _handleStoryAdCards({
                  index: snapCardInfo.index,
                  ...snapCardInfo.item
                })
              : cover
              ? _pickImage()
              : setMediaModalVisible(true);
          }}
          style={[
            styles.inputMiddleButton2,
            snapAdCard
              ? {
                  width: "100%",
                  height: 40,
                  top: "30%"
                }
              : {}
          ]}
        >
          <EditCameraIcon width={"100%"} height={"100%"} />
          <Text
            style={[
              styles.mediaButtonMsgEdit,
              snapAdCard ? {} : { width: 150 }
            ]}
          >
            {image !== "//" ? "Edit Photo" : "Add Media"}
          </Text>
        </Button>
      );
    } else
      return (
        <>
          <Button
            style={[
              styles.inputMiddleButton,
              snapAdCard
                ? {
                    width: 40,
                    height: 40,
                    top: "30%"
                    // left: "85%"
                  }
                : {}
            ]}
            onPress={() => {
              // this._pickImage();
              snapAdCard
                ? _handleStoryAdCards({
                    index: snapCardInfo.index,
                    ...snapCardInfo.item
                  })
                : cover
                ? _pickImage("Images")
                : setMediaModalVisible(true);
            }}
          >
            <MediaButtonIcon width={"100%"} height={"100%"} name="camera" />
            <Text style={[styles.mediaButtonMsg]}>
              {image !== "//" ? "Edit Photo" : "Add Media"}
            </Text>
          </Button>
        </>
      );
  }
}
