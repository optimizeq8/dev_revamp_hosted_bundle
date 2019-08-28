import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";

import styles from "./styles";

import EditCameraIcon from "../../../../assets/SVGs/CameraCircleOutline";
import MediaButtonIcon from "../../../../assets/SVGs/MediaButtonIcon";
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
      type
    } = this.props;

    if (media && media !== "//") {
      // console.log("MediaButton media?? first if", media);
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
            {type === "cover" ? "Edit Cover Image" : "Edit Media"}
          </Text>
        </Button>
      );
    } else {
      // console.log("MediaButton media??", media);
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
              {type === "cover" ? "Add Cover Image" : "Add Media"}
            </Text>
          </Button>
        </>
      );
    }
  }
}
