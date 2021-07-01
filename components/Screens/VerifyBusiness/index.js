import React, { Component } from "react";
import { View, Text } from "react-native";
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
  }
  renderBusinessNamesNotApproved = () => {
    let businessNotApproved = null;
    let counter = 0;
    businessNotApproved = this.props.businessAccounts.map((business, index) => {
      if (business.approved && business.approved === "0") {
        counter = counter + 1;
        return (
          <Text style={styles.businessname}>
            {counter}. {business.businessname}
          </Text>
        );
      }
    });
    return businessNotApproved;
  };
  getBusinessIdOfNotApproved = () => {
    let businessNotApproved = null;
    businessNotApproved = this.props.businessAccounts.filter(
      (business) => business.approved && business.approved === "0"
    );
    return businessNotApproved[0].businessid;
  };
  render() {
    const { translate } = this.props.screenProps;
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
        <View style={styles.verifyBusinessView}>
          <Text style={styles.approvalText}>
            {translate("Your approval request is in review")}
          </Text>
          {this.renderBusinessNamesNotApproved()}
          <GradientButton
            screenProps={this.props.screenProps}
            height={50}
            text={translate("Check your status")}
            style={styles.refreshButton}
            textStyle={styles.textRefreshStyle}
            onPressAction={() => {
              this.props.checkBusinessVerified(
                this.getBusinessIdOfNotApproved(),
                translate
              );
            }}
            disabled={this.props.checkingBusinessStatus}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  checkingBusinessStatus: state.account.checkingBusinessStatus,
  mainBusiness: state.account.mainBusiness,
  businessAccounts: state.account.businessAccounts,
});

const mapDispatchToProps = (dispatch) => ({
  checkBusinessVerified: (businessid, translate) =>
    dispatch(actionCreators.checkBusinessVerified(businessid, translate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyBusiness);
