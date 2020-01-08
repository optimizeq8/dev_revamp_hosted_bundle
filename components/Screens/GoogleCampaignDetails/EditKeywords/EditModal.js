import React, { Component } from "react";
import { View, Modal, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Button, Text } from "native-base";

//Icons
import PauseIcon from "../../../../assets/SVGs/ExclamationMark";
import CloseIcon from "../../../../assets/SVGs/Close";

//styles
import styles from "./styles";
export default class StatusModal extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onDismiss={() => this.props.handleModalToggle()}
        onRequestClose={() => this.props.handleModalToggle()}
        visible={this.props.modalVisible}
      >
        <BlurView tint="dark" intensity={100} style={styles.BlurView}>
          <Button
            transparent
            onPress={() => {
              this.props.handleModalToggle();
            }}
            style={styles.btnClose}
          >
            <CloseIcon width={20} height={20} />
          </Button>

          <PauseIcon
            width={43}
            height={112}
            style={{ alignSelf: "center", marginBottom: 20 }}
          />
          <Text
            uppercase
            style={[styles.title, { fontSize: 16, alignSelf: "center" }]}
          >
            {translate("Your changes will be lost")}
          </Text>
          <Text style={[styles.pauseDes]}>
            {translate(
              "You’re in the middle of reviewing your ad,\nif you go back, all changes will be discarded"
            )}
          </Text>

          <View style={{ top: 20 }}>
            <Button
              onPress={() => this.props.handleModalToggle()}
              style={styles.statusButtons}
              transparent
            >
              <Text uppercase style={styles.statusButtonsText}>
                {translate("Continue Review")}
              </Text>
            </Button>

            <Button
              onPress={() => {
                this.props.handleModalToggle();
                this.props.navigation.goBack();
              }}
              style={styles.statusButtons}
              transparent
            >
              <Text uppercase style={styles.statusButtonsText}>
                {translate("Discard Changes")}
              </Text>
            </Button>
          </View>
        </BlurView>
      </Modal>
    );
  }
}
