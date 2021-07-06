import React, { Component } from "react";
import { View, Text, BackHandler, ScrollView } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { LinearGradient } from "expo-linear-gradient";
import analytics from "@segment/analytics-react-native";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//components
import Header from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";
import styles from "./styles";

class VerifyBusiness extends React.Component {
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`start_verify`, {
      source,
      source_action,
      verification_channel: "Business",
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    const { approved, businessid } = this.props.mainBusiness;
    if (approved === "3") {
      this.props.checkBusinessVerified(
        businessid,
        this.props.screenProps.translate
      );
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  renderMessage = () => {
    const { approved } = this.props.mainBusiness;
    let message = null;
    let title = null;
    switch (approved) {
      case "0":
        title = " ";
        message =
          "To give you the best service that we can offer, our team needs to verify your business first Please make sure the information you entered during registration is accurate before submitting If you need to make changes, you can do so in the menu under 'Business Info' and 'Personal Info'";
        break;
      case "1":
        title = " ";
        message = "Get started and launch your ads now";
        break;
      case "2":
        title = "Pending Verification";
        message =
          "Our team is still working towards verifying your business We know your eager to get started, and it won't be much longer";
        break;
      case "3":
        message =
          "Your business could not be verified because of the following reason:";
        break;
    }
    return { message, title };
  };
  renderRejectedReasons = () => {
    const { approved, reject_reason } = this.props.mainBusiness;
    const { translate } = this.props.screenProps;
    let reasonsView = null;
    if (approved === "3" && reject_reason && reject_reason.length > 0) {
      let reasons = reject_reason.map((reason) => {
        return { key: Object.keys(reason), value: reason[Object.keys(reason)] };
      });
      reasonsView = reasons.map((rea) => (
        <View style={styles.rejView}>
          <Text style={styles.rejectedReason}>
            {translate(rea.key)}. {translate(rea.value)}.
          </Text>
        </View>
      ));
    }
    return reasonsView;
  };
  render() {
    const { translate } = this.props.screenProps;

    const { approved } = this.props.mainBusiness;
    const { message, title } = this.renderMessage();
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <Header
          screenProps={this.props.screenProps}
          title={"Verify Business"}
          navigation={this.props.navigation}
          segment={{
            source: "otp_verify",
            source_action: "a_go_back",
          }}
        />
        <View style={[styles.verifyBusinessView]}>
          {title && <Text style={styles.title}>{translate(title)}</Text>}

          {message && (
            <Text style={styles.approvalText}>{translate(message)}</Text>
          )}
          {this.renderRejectedReasons()}
          {approved === "0" && (
            <GradientButton
              screenProps={this.props.screenProps}
              height={50}
              text={translate("Verify your Business")}
              style={styles.refreshButton}
              textStyle={styles.textRefreshStyle}
              onPressAction={() => {
                const { businessid } = this.props.mainBusiness;
                this.props.checkBusinessVerified(businessid, translate);
              }}
              disabled={this.props.checkingBusinessStatus}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  checkingBusinessStatus: state.account.checkingBusinessStatus,
  mainBusiness: state.account.mainBusiness,
  businessAccounts: state.account.businessAccounts,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  checkBusinessVerified: (businessid, translate) =>
    dispatch(actionCreators.checkBusinessVerified(businessid, translate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyBusiness);
