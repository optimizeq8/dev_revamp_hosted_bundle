import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { connect } from "react-redux";
import GradientButton from "../../MiniComponents/GradientButton";
import { codeFieldStyle } from "../VerifyAccount/styles";
import styles from "./styles";
import analytics from "@segment/analytics-react-native";
import Header from "../../MiniComponents/Header";
import * as actionCreators from "../../../store/actions";

class VerifyEngagmentNumber extends Component {
  state = { code: "", country_code: "", phoneNum: "" };
  componentDidMount() {
    if (this.props.engagmentPhoneNumber) {
      let engagmentPhoneNumber = this.props.engagmentPhoneNumber;
      this.setState({
        phoneNum: engagmentPhoneNumber,
        country_code: engagmentPhoneNumber.substring(1, 4),
      });
    }
  }
  verifyOTP = () => {
    this.props.verifySnapchatOtp(
      this.props.campaign_id,
      this.props.engagementNumberID,
      this.state.code,
      this.props.handleButton
    );
  };
  resendOTP = () => {
    analytics.track(`otp_verify`, {
      source: "otp_verify",
      source_action: `a_resend_otp`,
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
      verification_channel: "Mobile",
      userId: this.props.userInfo.userid,
      resend_otp: true,
    });
    analytics.track(`a_resend_otp`, {
      source: "otp_verify",
      source_action: `a_resend_otp`,
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
      verification_channel: this.state.verifyByMobile ? "Mobile" : "Email",
      userId: this.props.userInfo.userid,
    });

    this.props.resendVerifyMobileCode({
      mobile: this.state.phoneNum,
      country_code: this.state.country_code,
    });
    this.setState({
      resendOTP: true,
    });
  };
  render() {
    let { screenProps } = this.props;
    let { translate } = screenProps;
    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <Header
          screenProps={this.props.screenProps}
          title={"Verify Number"}
          navigation={this.props.navigation}
          segment={{
            source: "otp_verify",
            source_action: "a_go_back",
          }}
          actionButton={() => this.props.handleButton(false, false)}
          navigation={undefined}
          // showGoBackButton={false}
        />
        <Text style={styles.headingText}>
          {translate("So that your call campaign can start")}
        </Text>

        <View style={styles.mobileDetailCard}>
          <Text style={styles.codeSentText}>
            {translate("We’ve sent a code to your Mobile number")}
          </Text>
          <Text style={styles.detail}>{this.state.phoneNum}</Text>
          <View style={{ marginVertical: 10 }}>
            <CodeField
              autoFocus
              cellCount={6}
              onChangeText={(code) => {
                this.setState({ code });
                if (code.length === 6) {
                  this.verifyOTP(code);
                }
              }}
              textContentType="oneTimeCode"
              rootStyle={codeFieldStyle.codeFieldRoot}
              ref={this.inputRef}
              keyboardType="number-pad"
              value={this.state.code}
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[
                    codeFieldStyle.cell,
                    isFocused && codeFieldStyle.focusCell,
                  ]}
                  // onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <GradientButton
            style={[styles.verifyButton]}
            uppercase
            text={translate("Verify")}
            disabled={this.state.code === ""}
            onPressAction={this.verifyOTP}
          />
          <TouchableOpacity
            onPress={() => this.props.handleButton(true, false)}
          >
            <Text style={styles.bottomText}>{translate("Resend Code")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  verified: state.register.verified,
  mobileNo: state.register.mobileNo,
  countryCode: state.register.countryCode,
  verificationCode: state.register.verificationCode,
  successNo: state.register.successNo,
  emailLinkCodeExpired: state.register.emailLinkCodeExpired,
  engagementNumberID: state.campaignC.engagementNumberID,
});
const mapDispatchToProps = (dispatch) => ({
  sendMobileNo: (mobileNo) => dispatch(actionCreators.sendMobileNo(mobileNo)),
  verifyMobileCode: (mobileAuth, verification_channel, navigationPath) =>
    dispatch(
      actionCreators.verifyMobileCode(
        mobileAuth,
        verification_channel,
        navigationPath
      )
    ),
  resendVerifyMobileCode: (mobileAuth) =>
    dispatch(actionCreators.resendVerifyMobileCode(mobileAuth)),
  resendVerifyMobileCodeByEmail: (mobileAuth) =>
    dispatch(actionCreators.resendVerifyMobileCodeByEmail(mobileAuth)),
  resetVerificationCode: () => dispatch(actionCreators.resetVerificationCode()),
  verifySnapchatOtp: (
    campaign_id,
    phone_number_id,
    verification_code,
    handleButton
  ) =>
    dispatch(
      actionCreators.verifySnapchatOtp(
        campaign_id,
        phone_number_id,
        verification_code,
        handleButton
      )
    ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEngagmentNumber);