import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-navigation";
import { Modal } from "react-native-paper";
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
        <SafeAreaView
          style={styles.safeAreaView}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <BlurView tint="dark" intensity={100}>
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            actionButton={() => {
              this.props.handleModalToggle();
            }}
            segment={{
              source: "ad_keywords",
              source_action: "a_go_back",
            }}
          />

          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              height: "100%",
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
        </BlurView>
      </Modal>
    );
  }
}
