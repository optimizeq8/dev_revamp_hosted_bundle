import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import Header from "../../MiniComponents/Header";
import styles from "./styles";
import InputField from "../../MiniComponents/InputField";
import EmailTransparentIcon from "../../../assets/SVGs/EmailTransparent";
import CustomButtons from "../../MiniComponents/CustomButtons";
import FlashMessage from "react-native-flash-message";
import Modal from "react-native-modal";
export default class CSVModal extends Component {
  state = { email: "", emailError: "", incomplete: false };

  setValue = (stateName, value) => {
    let state = {};
    state[stateName] = value;
    this.setState({
      ...state
    });
  };
  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state
    });
  };

  actionButton = () => {
    this.props.showCSVModal(false);
  };

  handleSubmit = () => {
    this.InFref.validate();
    if (!this.state.emailError) {
      if (this.props.google)
        this.props.downloadGoogleCSV(
          this.props.campaign_id,
          this.state.email,
          this.showModalMessage
        );
      else
        this.props.downloadCSV(
          this.props.campaign_id,
          this.state.email,
          this.showModalMessage
        );
    } //incomplete is set to signal the child components to play the animations of shaking
    else this.setState({ incomplete: true });
  };

  showModalMessage = (message, type) => {
    this.refs.modalFlash.showMessage({
      message: message,
      type: type
    });
  };
  render() {
    let { isVisible, screenProps, downloadCSV, campaign_id } = this.props;
    const { translate } = screenProps;

    return (
      <Modal
        style={{ margin: 0 }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isVisible}
      >
        <BlurView intensity={100} tint="dark" style={{ height: "100%" }}>
          {/* <SafeAreaView
            style={{ justifyContent: "space-evenly" }}
            forceInset={{ top: "always" }}
          > */}
          <Header
            closeButton={true}
            actionButton={this.actionButton}
            screenProps={screenProps}
            title={"Export CSV"}
          />
          <Text style={styles.CSVText}>
            {translate("Send a detailed CSV file of your ads performance")}
          </Text>
          <InputField
            ref={ref => (this.InFref = ref)}
            stateName1={"email"}
            value={this.state.email}
            valueError1={this.state.emailError}
            setValue={this.setValue}
            getValidInfo={this.getValidInfo}
            translate={translate}
            incomplete={this.state.incomplete}
            autoFocus={true}
            icon={EmailTransparentIcon}
            label={"Recipient email"}
          />
          <CustomButtons
            onPressFunction={this.handleSubmit}
            buttonStyle={CSVStyle.customButtonStyle}
            screenProps={screenProps}
            content="Send"
            filled
          />
          <CustomButtons
            buttonStyle={CSVStyle.customButtonStyle}
            onPressFunction={this.actionButton}
            screenProps={screenProps}
            content="Cancel"
          />
          {/* </SafeAreaView> */}
          <FlashMessage ref="modalFlash" position="top" />
        </BlurView>
      </Modal>
    );
  }
}

const CSVStyle = StyleSheet.create({
  customButtonStyle: { height: 50, width: "70%" }
});
