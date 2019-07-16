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
      snapAdCard,
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
              : setMediaModalVisible(true);
          }}
          style={[
            styles.inputMiddleButton2,
            snapAdCard
              ? {
                  width: 40,
                  height: 40,
                  top: "65%",
                  left: "82%"
                }
              : {}
          ]}
        >
          <EditCameraIcon />
          <Text
            style={[
              styles.mediaButtonMsgEdit,
              snapAdCard ? {} : { width: 150 }
            ]}
          >
            {image !== "blank" && image !== "//" ? "Edit Photo" : "Add Media"}
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
                    top: "65%",
                    left: "85%"
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
                : setMediaModalVisible(true);
            }}
          >
            <MediaButtonIcon width={"100%"} height={"100%"} name="camera" />
            <Text style={[styles.mediaButtonMsg]}>
              {image !== "blank" && image !== "//" ? "Edit Photo" : "Add Media"}
            </Text>
          </Button>
        </>
      );
  }
}
