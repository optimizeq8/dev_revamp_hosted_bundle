import React, { Component } from "react";
import { Text, Platform } from "react-native";
import styles from "./styles";
import { Button, Icon } from "native-base";
export default class MediaButton extends Component {
  render() {
    let image = this.props.image;
    return (
      <Button
        style={styles.inputMiddleButton}
        onPress={() => {
          // this._pickImage();
          this.props._pickImage("Images");
        }}
      >
        <Icon style={styles.icon} name="camera" />
        <Text style={styles.mediaButtonMsg}>
          {image
            ? Platform.OS === "ios"
              ? "Edit Photo"
              : "Edit Photo"
            : Platform.OS === "ios"
            ? "Add cover image"
            : "Add Media"}
        </Text>
      </Button>
    );
  }
}
