import React, { Component, createRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AppState,
  StyleSheet,
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import analytics from "@segment/analytics-react-native";
//components
import Header from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";

//styles
import styles, { codeFieldStyle } from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import Card from "./Card";
import { globalColors } from "../../../GlobalStyles";
import { showMessage } from "react-native-flash-message";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

class VerifyAccount extends Component {
  inputRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      verifyByMobile: true,
      userInfo: {
        country_code: "",
        mobile: "",
      },
      mobileEdit: false,
      emailEdit: false,
      code: "",
      phoneNum: "",
      country_code: "",
      valid: false,
      showErrorComponent: false,
      resend_otp: false,
    };
  }
  handleDidFocusLink = (appState) => {
    if (appState === "active") {
      const countryCode = this.props.userInfo.mobile.substring(0, 3);
      const mobile = this.props.userInfo.mobile.substring(3);

      //FROM EMAIL LINK
      // check if email in the link is same as logged in user
      const linkEmail = this.props.navigation.getParam("email", null);

      if (linkEmail && linkEmail !== this.props.userInfo.email) {
        this.setState({
          showErrorComponent: true,
        });
      } else if (linkEmail === this.props.userInfo.email) {
        const code = this.props.navigation.getParam("code", null);

        //To autofill code through email
        const { current } = this.inputRef;

        if (current) {
          current.handlerOnTextChange(code);
        }
        // check if email link is valid or not

        this.props.verifyEmailCodeLink(code, countryCode, mobile);

        this.setState({
          code: code,
          verifyByMobile: false,
        });
      }
    }
  };
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    const device_id = this.props.screenProps.device_id;
    analytics.track(`start_verify`, {
      source,
      source_action,
      device_id,
      userId: this.props.userInfo.userid,
      timestamp: new Date().getTime(),
      verification_channel: "Mobile",
      channel_changed: false,
    });
    // USING APP STATE To see if screen is focused or not
    AppState.addEventListener("change", this.handleDidFocusLink);
    // RESET THE SUCCESSNO to FALSE
    this.props.resetVerificationCode();
    if (this.props.userInfo) {
      this.setState({
        userInfo: { ...this.props.userInfo },
      });

      const countryCode = this.props.userInfo.mobile.substring(0, 3);
      const mobile = this.props.userInfo.mobile.substring(3);

      this.setState({
        phoneNum: "+" + this.props.userInfo.mobile,
        valid: true,
        country_code: countryCode,
      });
      this.handleDidFocusLink("active");
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleDidFocusLink);
  }

  toggleVerify = () => {
    this.setState(
      {
        verifyByMobile: !this.state.verifyByMobile,
      },
      () => {
        analytics.track(
          `a_verification_by_${this.state.verifyByMobile ? "mobile" : "email"}`,
          {
            source: "start_verify",
            source_action: `a_verification_by_${
              this.state.verifyByMobile ? "mobile" : "email"
            }`,
            timestamp: new Date().getTime(),
            device_id: this.props.screenProps.device_id,
            verification_channel: `${
              this.state.verifyByMobile ? "Mobile" : "Email"
            }`,
            channel_changed: true,
            userId: this.props.userInfo.userid,
          }
        );
      }
    );
  };

  editField = (stateName, value) => {
    this.setState({
      [`${stateName}Edit`]: value,
    });
  };

  changePhoneNo = (number, countryCode, type, valid) => {
    analytics.track(`a_change_mobile_number`, {
      source: "start_verify",
      source_action: "a_change_mobile_number",
      mobile: number,
    });
    this.setState({
      phoneNum: number,
      country_code: countryCode,
      valid,
      type,
    });
  };

  _handleSentCode = (code) => {
    this.setState({
      code,
    });
  };

  /**
   *
   *  Send Verification Code To Mobile
   *   */
  sendMobileNo = () => {
    const { translate } = this.props.screenProps;
    if (!this.state.valid) {
      showMessage({
        message: translate("Please enter a valid number!"),
        type: "warning",
      });
    } else {
      const mobile = this.state.phoneNum.substring(4);
      this.props.sendMobileNo({
        country_code: this.state.country_code,
        mobile,
      });
    }
  };

  /**
   *
   *  Send Verification Code To Mobile
   *   */
  sendEmail = () => {
    // Taking USER's original phone number that was used while registeration
    const mobile = this.props.userInfo.mobile.substring(3);
    this.props.resendVerifyMobileCodeByEmail({
      country_code: this.state.country_code,
      mobile,
      email: this.state.userInfo.email,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { verifyByMobile } = this.state;
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    // Segments to keep track of screens
    if (
      !this.props.successNo &&
      !prevState.verifyByMobile &&
      this.state.verifyByMobile
    ) {
      analytics.track(`start_verify`, {
        source,
        source_action: `a_verification_by_mobile`,
        timestamp: new Date().getTime(),
        device_id: this.props.screenProps.device_id,
        verification_channel: "Mobile",
        channel_changed: true,
        userId: this.props.userInfo.userid,
      });
    } else if (
      !this.props.successNo &&
      !verifyByMobile &&
      prevState.verifyByMobile
    ) {
      analytics.track(`start_verify`, {
        source,
        source_action: `a_verification_by_email`,
        timestamp: new Date().getTime(),
        device_id: this.props.screenProps.device_id,
        verification_channel: "Email",
        channel_changed: true,
        userId: this.props.userInfo.userid,
      });
    } else if (!prevProps.successNo && this.props.successNo) {
      analytics.track(`otp_verify`, {
        source: this.state.resend_otp ? "otp_verify" : "start_verify",
        source_action: this.state.resend_otp
          ? `a_resend_otp`
          : `a_verification_by_${verifyByMobile ? "mobile" : "email"}`,
        timestamp: new Date().getTime(),
        device_id: this.props.screenProps.device_id,
        verification_channel: verifyByMobile ? "Mobile" : "Email",
        userId: this.props.userInfo.userid,
        resend_otp: this.state.resend_otp,
      });
    }
  }

  /**
   * To resend OTP
   */
  resendOTP = () => {
    analytics.track(`otp_verify`, {
      source: "otp_verify",
      source_action: `a_resend_otp`,
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
      verification_channel: this.state.verifyByMobile ? "Mobile" : "Email",
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
    if (this.state.verifyByMobile) {
      this.props.resendVerifyMobileCode({
        mobile: this.props.mobileNo,
        country_code: this.props.countryCode,
      });
    } else {
      this.sendEmail();
    }
    this.setState({
      resendOTP: true,
    });
  };

  /**
   * VERIFY OTP
   */
  verifyOTP = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    segmentEventTrack("Button Pressed to verify mobile code");
    this.props.verifyMobileCode(
      {
        mobile: this.state.phoneNum.substring(4),
        country_code: this.state.country_code,
        verificationCode: this.state.code,
        userid: this.props.userInfo.userid,
      },
      this.state.verifyByMobile ? "Mobile" : "Email",
      source === "my_website_tutorial" ? "OptimizeWebsite" : "Dashboard"
    );
  };

  render() {
    const { translate } = this.props.screenProps;
    const { userInfo, verifyByMobile } = this.state;
    // console.log("verificationCode", this.props.verificationCode);

    /**
     *
     * Show Error Component if user is not logged in,
     *  email link is expired
     *  or
     *  loggedInEmail is not same as the email in the link
     *
     */
    if (
      this.props.emailLinkCodeExpired ||
      !this.props.userInfo ||
      this.state.showErrorComponent
    ) {
      return (
        <ErrorComponent
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
    }

    let content = (
      <Card
        disabled={this.state.mobileEdit}
        screenProps={this.props.screenProps}
        heading={"Mobile Number"}
        detail={this.state.phoneNum}
        bottomText={"Verify By E-mail Instead"}
        toggleVerify={this.toggleVerify}
        stateName={"mobile"}
        editField={this.editField}
        changePhoneNo={this.changePhoneNo}
        onPress={this.sendMobileNo}
        valid={this.state.valid}
      />
    );

    if (!this.props.successNo && !verifyByMobile) {
      content = (
        <Card
          screenProps={this.props.screenProps}
          heading={"Email Address"}
          detail={userInfo.email}
          bottomText={"Verify By Mobile Number Instead"}
          toggleVerify={this.toggleVerify}
          stateName={"email"}
          editField={this.editField}
          onPress={this.sendEmail}
        />
      );
    }

    if (this.props.successNo) {
      content = (
        <View style={styles.mobileDetailCard}>
          <Text style={styles.codeSentText}>
            {verifyByMobile
              ? translate("We’ve sent a code to your Mobile number")
              : translate("We’ve sent a code to your Email")}
          </Text>
          <Text style={styles.detail}>
            {verifyByMobile ? this.state.phoneNum : userInfo.email}
          </Text>
          <View style={{ marginVertical: 10 }}>
            <CodeField
              autoFocus
              cellCount={5}
              onChangeText={(code) => {
                this.setState({ code });
                if (code.length === 5) {
                  this._handleSentCode(code);
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
          <TouchableOpacity onPress={this.resendOTP}>
            <Text style={styles.bottomText}>{translate("Resend Code")}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <SafeAreaView forceInset={{ top: "always", bottom: "never" }}>
        <Header
          screenProps={this.props.screenProps}
          title={"Verify Account"}
          navigation={this.props.navigation}
          segment={{
            source: "otp_verify",
            source_action: "a_go_back",
          }}
        />
        <Text style={styles.headingText}>
          {translate(
            "And start publishing campaigns, It’ll take a couple of seconds"
          )}
        </Text>
        {content}
      </SafeAreaView>
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
  verifyEmailCodeLink: (verificationCode, country_code, mobile) =>
    dispatch(
      actionCreators.verifyEmailCodeLink(verificationCode, country_code, mobile)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
