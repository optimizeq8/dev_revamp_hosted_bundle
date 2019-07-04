import React, { Component } from "react";
import { Text, Platform } from "react-native";
import styles from "./styles";
import { Button, Icon } from "native-base";
export default class MediaButton extends Component {
  render() {
    let {
      image,
      snapAdCard,
      snapCardInfo,
      _handleStoryAdCards,
      setMediaModalVisible
    } = this.props;
    console.log(image);

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
                  left: "82%"
                }
              : {}
          ]}
          onPress={() => {
            // this._pickImage();
            snapAdCard
              ? _handleStoryAdCards(snapCardInfo)
              : setMediaModalVisible(true);
          }}
        >
          <Icon
            style={[
              styles.icon,
              snapAdCard ? { fontSize: 20, paddingRight: 15 } : {}
            ]}
            name="camera"
          />
        </Button>
        <Text style={styles.mediaButtonMsg}>
          {image !== "blank"
            ? "Edit Photo"
            : Platform.OS === "ios"
            ? "Add Photo"
            : "Add Media"}
        </Text>
      </>
    );
  }
}
