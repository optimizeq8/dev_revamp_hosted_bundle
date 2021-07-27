import React, { Component, createRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AppState,
  StyleSheet,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";

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
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { showMessage } from "react-native-flash-message";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";

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
    analytics.track(`Screen Viewed`, {
      screen_name: "VerifyAccount",
      source,
      source_action,
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
        analytics.track(`Button Pressed`, {
          button_type: "Change Verification Mode",
          button_content: this.state.verifyByMobile
            ? "Verify By E-mail Instead"
            : "Verify By Mobile Number Instead",
          source: "Tutorial",
        });
      }
    );
  };

  editField = (stateName, value) => {
    this.setState({
      [`${stateName}Edit`]: value,
    });
  };

  changePhoneNo = (number, countryCode, type, valid) => {
    analytics.track(`Form Populated`, {
      form_type: "Verifying Mobile Number",
      form_field: "mobile",
      form_value: number,
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
    analytics.track("Button Pressed", {
      button_type: "Send OTP By SMS",
      button_content: "Verify",
      source: "VerifyAccount",
    });
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
    analytics.track("Button Pressed", {
      button_type: "Send OTP By Email",
      button_content: "Verify",
      source: "VerifyAccount",
    });
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
      analytics.track(`Screen Viewed`, {
        screen_name: "VerifyAccount",
        source: "VerifyAccount",
        source_action: "changed_to_mboile_number",
      });
    } else if (
      !this.props.successNo &&
      !verifyByMobile &&
      prevState.verifyByMobile
    ) {
      analytics.track(`Screen Viewed`, {
        screen_name: "VerifyAccount",
        source: "VerifyAccount",
        source_action: "changed_to_email",
      });
    } else if (!prevProps.successNo && this.props.successNo) {
      analytics.track(`Button Pressed`, {
        button_type: this.state.resend_otp
          ? "Resend OTP"
          : `Verify OTP by ${verifyByMobile ? "Mobile" : "Email"}`,
        button_content: "",
        source: "VerifyAccount",
      });
    }
  }

  /**
   * To resend OTP
   */
  resendOTP = () => {
    analytics.track(`Button Pressed`, {
      button_type: this.state.resend_otp
        ? "Resend OTP"
        : `Verify OTP by ${verifyByMobile ? "Mobile" : "Email"}`,
      button_content: "Resend Code",
      source: "VerifyAccount",
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
    const { approved } = this.props.mainBusiness;
    analytics.track("Form Submitted", {
      form_type: "Account Verification",
      form_context: {
        mobile: this.state.phoneNum,
      },
      verification_mode: this.state.verifyByMobile ? "Mobile" : "Email",
    });
    this.props.verifyMobileCode(
      {
        mobile: this.state.phoneNum.substring(4),
        country_code: this.state.country_code,
        verificationCode: this.state.code,
        userid: this.props.userInfo.userid,
      },
      this.state.verifyByMobile ? "Mobile" : "Email",
      source === "my_website_tutorial" && approved !== "0"
        ? "TutorialWeb"
        : "Dashboard"
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
      <SafeAreaView
        style={{ height: "100%" }}
        forceInset={{ top: "always", bottom: "never" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <Header
          screenProps={this.props.screenProps}
          title={"Verify Account"}
          navigation={this.props.navigation}
          segment={{
            source: "VerifyAccount",
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
