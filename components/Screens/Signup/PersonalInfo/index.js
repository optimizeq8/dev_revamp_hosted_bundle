import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, I18nManager } from "react-native";
import { Item, Input, Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";

import LowerButton from "../../../MiniComponents/LowerButton";
import InputFeild from "../../../MiniComponents/InputField";
import PhoneNoField from "../PhoneNo/PhoneNoField";
import InputScrollView from "react-native-input-scroll-view";

//icons
import UserProfile from "../../../../assets/SVGs/UserProfile";
import EmailIcon from "../../../../assets/SVGs/EmailOutline";
import PasswordIcon from "../../../../assets/SVGs/PasswordOutline";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { showMessage } from "react-native-flash-message";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: this.props.mobileNo,
        country_code: this.props.countryCode,
        password: "",
        v: this.props.tempId
      },
      inputF: false,
      inputL: false,
      inputE: false,
      inputP: false,
      inputPR: false,
      valid: false,
      repassword: "",
      emailError: "",
      passwordError: "",
      lastnameError: "",
      firstnameError: "",
      repasswordError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this._passwordVarification = this._passwordVarification.bind(this);
  }
  componentDidMount() {
    Segment.screenWithProperties("Personal Info Registration", {
      category: "Sign Up"
    });
    if (this.props.userInfo) {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          ...this.props.userInfo
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.tempUserInfo && this.props.tempUserInfo) {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          firstname: this.props.tempUserInfo.firstname,
          lastname: this.props.tempUserInfo.lastname,
          email: this.props.tempUserInfo.email,
          v: this.props.tempId
        }
      });
    }
  }
  setValue = (stateName, value) => {
    let state = {};
    state[stateName] =
      stateName === "firstname" || stateName === "lastname"
        ? value.replace(/[^a-z\u0621-\u064A]/gi, "")
        : value;
    let userInfo = {
      ...this.state.userInfo,
      ...state
    };
    this.setState({ userInfo });
  };

  getValidInfo = (stateError, validWrap) => {
    let state = {};
    state[stateError] = validWrap;
    this.setState({
      ...state
    });
  };
  _passwordVarification = () => {
    if (
      this.state.userInfo.password !== this.state.repassword ||
      this.state.repassword === ""
    ) {
      this.setState({ repasswordError: "Your Passwords don't match" });
      return false;
    } else if (
      this.state.userInfo.password === this.state.repassword &&
      this.state.repassword !== ""
    ) {
      this.setState({ repasswordError: "" });
      return true;
    }
  };
  changePersonalNo = (number, countryCode, type, valid) => {
    let userInfo = {
      ...this.state.userInfo,
      mobile: number,
      country_code: countryCode
    };
    // if (number.toString().length > 3 && valid) {
    this.setState({
      // phoneNum: number.toString().length > 3 && valid ? number.split(countryCode)[1] : number,
      userInfo,
      valid,
      type
    });
    // }
  };
  _handleSubmission = async () => {
    const { translate } = this.props.screenProps;
    // Need to validate all fields again here since for the input feild component the error value is set to null after animation is over
    const passwordError = validateWrapper(
      "password",
      this.state.userInfo.password
    );
    const emailError = validateWrapper("email", this.state.userInfo.email);
    const firstnameError = validateWrapper(
      "mandatory",
      this.state.userInfo.firstname
    );
    const lastnameError = validateWrapper(
      "mandatory",
      this.state.userInfo.lastname
    );

    this.setState({
      passwordError,
      emailError,
      firstnameError,
      lastnameError
    });
    if (passwordError) {
      showMessage({
        message: translate(passwordError),
        type: "warning"
      });
    }
    if (emailError) {
      showMessage({
        message: translate(emailError),
        type: "warning"
      });
    }
    if (firstnameError) {
      showMessage({
        message: translate(firstnameError),
        type: "warning"
      });
    }
    if (lastnameError) {
      showMessage({
        message: translate(lastnameError),
        type: "warning"
      });
    }
    if (!this.state.valid) {
      showMessage({
        message: translate("Please enter a valid number!"),
        type: "warning"
      });
    }

    if (
      this._passwordVarification() &&
      !firstnameError &&
      !lastnameError &&
      !emailError &&
      !passwordError &&
      this.state.valid // condition for mobile no
    ) {
      const mobile = this.state.userInfo.mobile.substring(
        4,
        this.state.userInfo.mobile
      );
      let userInfo = {
        ...this.state.userInfo,
        mobile
      };

      this.props.registerGuestUser(
        userInfo,
        this.props.businessInvite,
        this.props.navigation
      );
    }
  };
  focusTheField = fieldName => {
    this.inputs[fieldName]._root.focus();
  };
  inputs = {};
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Container style={styles.personalInfoView}>
        <InputScrollView
          {...ScrollView.props}
          contentContainerStyle={[
            {
              paddingBottom: "55%",
              paddingTop: 20
            }
          ]}
        >
          <View style={styles.contentContainer}>
            <InputFeild
              key={"Full Name"}
              getValidInfo={this.getValidInfo}
              setValue={this.setValue}
              incomplete={false}
              translate={this.props.screenProps.translate}
              stateName1="firstname"
              stateName2="lastname"
              label="Full name"
              placeholder1="First Name"
              placeholder2="Last Name"
              value={this.state.userInfo.firstname}
              value2={this.state.userInfo.lastname}
              valueError1={this.state.firstnameError}
              valueError2={this.state.lastnameError}
              icon={UserProfile}
              disabled={this.props.loadingUpdateInfo}
              maxLength={30}
            />
            <View style={[styles.mobileView]}>
              <View style={[styles.labelView]}>
                <Text uppercase style={[styles.inputLabel]}>
                  {translate("Mobile No")}
                </Text>
              </View>

              <PhoneNoField
                disabled={this.props.loadingUpdateInfo}
                screenProps={this.props.screenProps}
                valid={this.state.valid}
                changeNo={this.changePersonalNo}
                phoneNum={this.state.userInfo.mobile}
              />
            </View>

            <InputFeild
              // disabled={this.props.loadingUpdateInfo}
              // customStyles={{ width: "100%", marginLeft: 0 }}
              incomplete={false}
              translate={this.props.screenProps.translate}
              stateName1="email"
              label="Email"
              placeholder1="Enter your email"
              value={this.state.userInfo.email}
              valueError1={this.state.emailError}
              icon={EmailIcon}
              setValue={this.setValue}
              getValidInfo={this.getValidInfo}
              key={"Email"}
            />
            {this.state.emailError && this.state.emailError !== "" ? (
              <Text style={[styles.text, styles.emailErrorText]}>
                {translate(this.state.emailError)}
              </Text>
            ) : null}

            <InputFeild
              // disabled={this.props.loadingUpdateInfo}
              incomplete={false}
              translate={this.props.screenProps.translate}
              stateName1="password"
              label="Password"
              placeholder1="Enter your password"
              value={this.state.userInfo.password}
              valueError1={this.state.passwordError}
              icon={PasswordIcon}
              setValue={this.setValue}
              getValidInfo={this.getValidInfo}
              key={"password"}
              secureTextEntry={true}
            />

            <View style={styles.marginVertical}>
              <View
                style={[
                  styles.labelView,
                  { width: !I18nManager.isRTL ? 150 : "50%" }
                ]}
              >
                <Text
                  numberOfLines={1}
                  lineBreakMode={"middle"}
                  uppercase
                  style={[
                    styles.inputLabel,
                    styles.labelInputText,
                    this.state.inputPR
                      ? globalStyles.orangeTextColor
                      : globalStyles.whiteTextColor
                  ]}
                >
                  {translate("Re-enter Password")}
                </Text>
              </View>
              <Item
                style={[
                  styles.input,
                  this.state.inputPR
                    ? globalStyles.purpleBorderColor
                    : this.state.repasswordError !== ""
                    ? globalStyles.redBorderColor
                    : globalStyles.transparentBorderColor,
                  styles.repeatPassword
                ]}
              >
                <PasswordIcon
                  style={[styles.iconSize]}
                  fill={this.state.inputPR ? "#FF9D00" : "#FFF"}
                />

                <Input
                  ref={input => {
                    this.inputs["inputPR"] = input;
                  }}
                  blurOnSubmit={true}
                  returnKeyType={"done"}
                  style={styles.inputText}
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value => this.setState({ repassword: value })}
                  onFocus={() => {
                    this.setState({ inputPR: true });
                  }}
                  onBlur={() => {
                    this.setState({ inputPR: false });
                    this._passwordVarification();
                  }}
                />
              </Item>
              {this.state.repasswordError !== "" &&
              this.state.userInfo.password !== "" ? (
                <Text style={[styles.text, styles.repasswordErrorText]}>
                  {translate(this.state.repasswordError)}
                </Text>
              ) : null}
            </View>
            <LowerButton
              style={{
                alignSelf: "flex-end",
                marginHorizontal: widthPercentageToDP(12)
              }}
              // bottom={-10}
              function={() => this._handleSubmission()}
            />
          </View>
        </InputScrollView>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  mobileNo: state.register.mobileNo,
  countryCode: state.register.countryCode,
  tempUserInfo: state.account.tempUserInfo,
  successEmail: state.register.successEmail,
  userInfo: state.register.userInfo
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: (email, userInfo, businessInvite, navigation) =>
    dispatch(
      actionCreators.verifyEmail(email, userInfo, businessInvite, navigation)
    ),
  registerGuestUser: (userInfo, businessInvite, navigation) =>
    dispatch(
      actionCreators.registerGuestUser(userInfo, businessInvite, navigation)
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
