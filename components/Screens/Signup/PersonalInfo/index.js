import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text
} from "react-native";
import { Item, Input, Icon, Label } from "native-base";
import * as Segment from "expo-analytics-segment";

import LowerButton from "../../../MiniComponents/LowerButton";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: this.props.mobileNo,
        password: ""
      },
      inputF: false,
      inputL: false,
      inputE: false,
      inputP: false,
      inputPR: false,

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
  }

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
  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.userInfo.email);
    const passwordError = validateWrapper(
      "password",
      this.state.userInfo.password
    );
    const lastnameError = validateWrapper(
      "mandatory",
      this.state.userInfo.lastname
    );
    const firstnameError = validateWrapper(
      "mandatory",
      this.state.userInfo.firstname
    );
    this.setState({
      emailError,
      passwordError,
      lastnameError,
      firstnameError
    });
    if (
      this._passwordVarification() &&
      !this.state.firstnameError &&
      !this.state.lastError &&
      !this.state.emailError &&
      !this.state.passwordError
    ) {
      this.props.verifyEmail(this.state.userInfo.email, this.state.userInfo);
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.scrollViewStyleContainer}>
          <KeyboardShift>
            {() => (
              <View style={styles.contentContainer}>
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    this.state.inputF
                      ? globalStyles.purpleBorderColor
                      : this.state.firstnameError
                      ? globalStyles.redBorderColor
                      : globalStyles.lightGrayBorderColor
                  ]}
                >
                  <Label
                    style={[
                      styles.inputText,
                      styles.labelInputText,
                      this.state.inputF
                        ? globalStyles.orangeTextColor
                        : globalStyles.darkGrayTextColor
                    ]}
                  >
                    <Icon
                      style={[
                        styles.iconSize,
                        this.state.inputF
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor
                      ]}
                      name="person"
                      type="MaterialIcons"
                    />
                    {"  "}
                    {translate("First Name")}
                  </Label>

                  <Input
                    style={styles.inputText}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => {
                      this.setState({
                        userInfo: {
                          ...this.state.userInfo,
                          firstname: value
                        }
                      });
                    }}
                    onFocus={() => {
                      this.setState({ inputF: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputF: false });
                      this.setState({
                        firstnameError: validateWrapper(
                          "mandatory",
                          this.state.userInfo.firstname
                        )
                      });
                    }}
                  />
                </Item>
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    this.state.inputL
                      ? globalStyles.purpleBorderColor
                      : this.state.lastnameError
                      ? globalStyles.redBorderColor
                      : globalStyles.lightGrayBorderColor
                  ]}
                >
                  <Label
                    style={[
                      styles.inputText,
                      styles.labelInputText,
                      this.state.inputL
                        ? globalStyles.orangeTextColor
                        : globalStyles.darkGrayTextColor
                    ]}
                  >
                    {translate("Last Name")}
                  </Label>

                  <Input
                    style={styles.inputText}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        userInfo: {
                          ...this.state.userInfo,
                          lastname: value
                        }
                      })
                    }
                    onFocus={() => {
                      this.setState({ inputL: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputL: false });
                      this.setState({
                        lastnameError: validateWrapper(
                          "mandatory",
                          this.state.userInfo.lastname
                        )
                      });
                    }}
                  />
                </Item>
                <Item
                  ref={r => {
                    this._textInputRef = r;
                  }}
                  floatingLabel
                  style={[
                    styles.input,
                    this.state.inputE
                      ? globalStyles.purpleBorderColor
                      : this.state.emailError
                      ? globalStyles.redBorderColor
                      : globalStyles.lightGrayBorderColor
                  ]}
                >
                  <Label
                    style={[
                      styles.inputText,
                      styles.labelInputText,
                      this.state.inputE
                        ? globalStyles.orangeTextColor
                        : globalStyles.darkGrayTextColor,
                      styles.labelEmail
                    ]}
                  >
                    <Icon
                      style={[
                        styles.iconSize,
                        this.state.inputE
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor
                      ]}
                      name="mail"
                      type="MaterialIcons"
                    />
                    {"  "}
                    {translate("Email")}
                  </Label>

                  <Input
                    style={styles.inputText}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        userInfo: { ...this.state.userInfo, email: value }
                      })
                    }
                    onFocus={() => {
                      this.setState({ inputE: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputE: false });
                      this.setState({
                        emailError: validateWrapper(
                          "email",
                          this.state.userInfo.email
                        )
                      });
                    }}
                  />
                </Item>
                {this.state.emailError ? (
                  // <View
                  //   style={{ justifyContent: "center", alignSelf: "center" }}
                  // >
                  <Text style={[styles.text, styles.emailErrorText]}>
                    {this.state.emailError}
                  </Text>
                ) : // </View>
                null}
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    this.state.inputP
                      ? globalStyles.purpleBorderColor
                      : this.state.passwordError
                      ? globalStyles.redBorderColor
                      : globalStyles.lightGrayBorderColor
                  ]}
                >
                  <Label
                    style={[
                      styles.inputText,
                      this.state.inputP
                        ? globalStyles.orangeTextColor
                        : globalStyles.darkGrayTextColor,
                      styles.labelPassword
                    ]}
                  >
                    <Icon
                      style={[
                        this.state.inputP
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor,
                        styles.labelIcon
                      ]}
                      name="key"
                      type="Entypo"
                    />
                    {"  "}
                    {translate("Password")}
                  </Label>
                  <Input
                    style={styles.inputText}
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        userInfo: {
                          ...this.state.userInfo,
                          password: value
                        }
                      })
                    }
                    onFocus={() => {
                      this.setState({ inputP: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputP: false });
                      this.setState({
                        passwordError: validateWrapper(
                          "password",
                          this.state.userInfo.password
                        )
                      });
                    }}
                  />
                </Item>
                {this.state.passwordError &&
                this.state.passwordError.includes("8 characters") ? (
                  <Text style={[styles.text, styles.repasswordErrorText]}>
                    {translate(this.state.passwordError)}
                  </Text>
                ) : null}

                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    this.state.inputPR
                      ? globalStyles.purpleBorderColor
                      : this.state.repasswordError !== ""
                      ? globalStyles.redBorderColor
                      : globalStyles.lightGrayBorderColor,
                    styles.repeatPassword
                  ]}
                >
                  <Label
                    style={[
                      styles.inputText,
                      this.state.inputPR
                        ? globalStyles.orangeTextColor
                        : globalStyles.darkGrayTextColor,
                      styles.labelPassword
                    ]}
                  >
                    {translate("Re-enter Password")}
                  </Label>

                  <Input
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
                <LowerButton function={() => this._handleSubmission()} />
                {/* <Button
                  onPress={() => this._handleSubmission()}
                  style={styles.button}
                >
                  <Icon style={styles.icon} name="arrow-forward" />
                </Button> */}
              </View>
            )}
          </KeyboardShift>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  mobileNo: state.register.mobileNo
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: (email, userInfo) =>
    dispatch(actionCreators.verifyEmail(email, userInfo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
