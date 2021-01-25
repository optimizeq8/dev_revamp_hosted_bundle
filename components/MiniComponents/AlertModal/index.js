import React, { PureComponent } from "react";
import { Modal, Text, View, Image, SafeAreaView } from "react-native";
import styles from "./styles";
import GradientButton from "../GradientButton";
import { globalColors } from "../../../GlobalStyles";
import Header from "../Header";
export default class AlertModal extends PureComponent {
  state = { showAlertModal: false };
  componentDidUpdate(prevProps) {
    if (
      prevProps.showAlertModal !== this.props.showAlertModal &&
      this.props.showAlertModal
    ) {
      this.setState({ showAlertModal: this.props.showAlertModal });
    }
  }
  handleDismissingAlert = () => {
    this.setState({ showAlertModal: false }, () =>
      setTimeout(() => {
        this.props.openIntercom();
      }, 300)
    );
  };
  render() {
    let { screenProps, resetAlertModal } = this.props;
    let { translate } = screenProps;
    if (!this.state.showAlertModal) {
      return null;
    }
    return (
      <Modal transparent animationType={"fade"}>
        <SafeAreaView style={{ backgroundColor: globalColors.offWhite }} />
        <Header
          title={"Support"}
          navigation={undefined}
          closeButton
          screenProps={screenProps}
          actionButton={() =>
            this.setState({ showAlertModal: false }, () => resetAlertModal())
          }
          titleStyle={{ color: globalColors.rum }}
          iconColor={globalColors.rum}
          containerStyle={{ backgroundColor: globalColors.offWhite }}
        />
        <View style={styles.modalContainer}>
          <View style={styles.popUpContainer}>
            <View style={styles.alertIconContainer}>
              <Image
                resizeMode={"contain"}
                source={require("../../../assets/images/Support-center.png")}
                style={styles.alertIcon}
              />
            </View>

            <Text style={styles.alertTitle}>
              {translate("Live chat unavailable")}
            </Text>
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertText}>
                {translate(
                  "Please note that we are currently out of office and will get back to you as soon as possible"
                )}
              </Text>
              <Text style={styles.alertTitle}>
                {translate("Working hours")}
              </Text>
              <Text style={styles.alertExtraText}>
                {translate("Sun - Thu")}
              </Text>
              <Text
                style={[styles.alertExtraText, { color: globalColors.orange }]}
              >
                {translate("10 am - 6 pm")}
              </Text>
              <Text style={styles.alertExtraText}>{translate("Sat")}</Text>
              <Text
                style={[styles.alertExtraText, { color: globalColors.orange }]}
              >
                {translate("12 am - 6 pm")}
              </Text>
            </View>
          </View>
          <GradientButton
            purpleViolet
            text="Continue"
            onPressAction={this.handleDismissingAlert}
            style={styles.alertGradientButton}
          />
        </View>
      </Modal>
    );
  }
}
