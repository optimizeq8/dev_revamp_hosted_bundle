import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";

import styles from "./styles";

import EditCameraIcon from "../../../../assets/SVGs/CameraCircleOutline";
import MediaButtonIcon from "../../../../assets/SVGs/MediaButtonIcon";
import segmentEventTrack from "../../../segmentEventTrack";
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
    } = this.props;
    const { translate } = this.props.screenProps;

    if (media && media !== "//") {
      return (
        <Button
          transparent
          onPress={() => {
            segmentEventTrack(
              `Button clicked to  ${
                snapAdCard
                  ? "Edit Media for Story Ad Card"
                  : cover
                  ? "Select image for story ad cover"
                  : "Open Upload Media Modal"
              } `
            );
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
        </Button>
      );
    } else {
      return (
        <>
          <Button
            style={[
              styles.inputMiddleButton,
              snapAdCard
                ? {
                    width: 60,
                    height: 60,
                    top: "20%",
                    // left: "85%"
                  }
                : {},
            ]}
            onPress={() => {
              // this._pickImage();
              segmentEventTrack(
                `Button clicked to  ${
                  snapAdCard
                    ? "Add Media for Story Ad Card"
                    : cover
                    ? "Select image for story ad cover"
                    : "Open Upload Media Modal"
                } `
              );
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
          </Button>
        </>
      );
    }
  }
}
