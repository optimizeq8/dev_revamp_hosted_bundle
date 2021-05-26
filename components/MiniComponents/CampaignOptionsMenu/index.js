import React, { Component } from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";

export default class index extends Component {
  render() {
    let {
      showCampaignOptions,
      handleOptionsModal,
      showRepeatButton,
      translate,
    } = this.props;
    return (
      <Modal
        visible={showCampaignOptions}
        animationType="slide"
        transparent
        hardwareAccelerated={true}
        onRequestClose={() => {
          handleOptionsModal(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => handleOptionsModal(false)}>
          <View style={{ height: "100%" }}></View>
        </TouchableWithoutFeedback>
        <View style={styles.menuContainer}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              marginBottom: 20,
            }}
          >
            <Text style={styles.menuHeaderText}>
              {translate("Campaign Options")}
            </Text>
          </View>
          {showRepeatButton()}
        </View>
      </Modal>
    );
  }
}
