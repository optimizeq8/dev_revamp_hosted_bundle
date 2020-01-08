import React, { Component } from "react";
import { View, Modal, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Button, Text } from "native-base";
import { SafeAreaView } from "react-navigation";
//Icons
import PauseIcon from "../../../../assets/SVGs/ExclamationMark";
import CloseIcon from "../../../../assets/SVGs/Close";
import GradientButton from "../../../MiniComponents/GradientButton";
import CustomHeader from "../../../MiniComponents/Header";

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
        <BlurView tint="dark" intensity={100}>
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={true}
              actionButton={() => {
                this.props.handleModalToggle();
              }}
            />
            <View style={styles.popupOverlay}>
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignSelf: "center"
                }}
              >
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

                <GradientButton
                  style={styles.button}
                  onPressAction={() => this.props.handleModalToggle()}
                  textStyle={styles.buttontext}
                  text={translate("Continue Review")}
                  uppercase={true}
                />
                <GradientButton
                  transparent={true}
                  style={styles.whitebutton}
                  onPressAction={() => {
                    this.props.handleModalToggle();
                    this.props.navigation.goBack();
                  }}
                  textStyle={styles.whitebuttontext}
                  text={translate("Discard Changes")}
                  uppercase={true}
                />
              </View>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
