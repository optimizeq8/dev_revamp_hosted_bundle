import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";

import styles from "./styles";

import EditCameraIcon from "../../../../assets/SVGs/CameraCircleOutline";
import MediaButtonIcon from "../../../../assets/SVGs/MediaButtonIcon";
import NavigationService from "../../../../NavigationService";
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
      navigateToCover,
      rejected,
    } = this.props;
    const { translate } = this.props.screenProps;

    if (media && media !== "//") {
      return (
        <Button
          disabled={disabled}
          transparent
          onPress={() => {
            if (navigateToCover) {
              NavigationService.navigate("AdCover", { rejected });
            } else {
              snapAdCard
                ? _handleStoryAdCards({
                    index: snapCardInfo.index,
                    ...snapCardInfo.item,
                  })
                : cover
                ? _pickImage("Images")
                : setMediaModalVisible(true);
            }
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
            disabled={disabled}
            style={[
              styles.inputMiddleButton,
              snapAdCard
                ? {
                    width: 40,
                    height: 40,
                    top: "27%",
                    // left: "85%"
                  }
                : {},
            ]}
            onPress={() => {
              // this._pickImage();
              if (navigateToCover) {
                this.props.navigation.push("AdCover", { rejected });
              } else {
                snapAdCard
                  ? _handleStoryAdCards({
                      index: snapCardInfo.index,
                      ...snapCardInfo.item,
                    })
                  : cover
                  ? _pickImage("Images")
                  : setMediaModalVisible(true);
              }
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
