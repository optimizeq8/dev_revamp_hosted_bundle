import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { Item, Input, Icon, Label, Text } from "native-base";
import * as Segment from "expo-analytics-segment";

import LowerButton from "../../../MiniComponents/LowerButton";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

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
          <KeyboardShift style={styles.contentContainer}>
            {() => (
              <View style={styles.contentContainer}>
                <View style={styles.marginVertical}>
                  <View style={[styles.labelView]}>
                    <Text
                      uppercase
                      style={[
                        styles.inputLabel,
                        styles.labelInputText,
                        this.state.inputF
                          ? globalStyles.orangeTextColor
                          : globalStyles.whiteTextColor
                      ]}
                    >
                      {translate("First Name")}
                    </Text>
                  </View>
                  <Item
                    style={[
                      styles.input,
                      this.state.inputF
                        ? globalStyles.transparentBorderColor
                        : this.state.firstnameError
                          ? globalStyles.redBorderColor
                          : globalStyles.transparentBorderColor
                    ]}
                  >
                    <UserProfile
                      style={[
                        styles.iconSize,
                        this.state.inputF
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor
                      ]}
                      fill={this.state.inputF ? "#FF9D00" : "#FFF"}
                    />

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
                          firstnameError:
                            validateWrapper(
                              "mandatory",
                              this.state.userInfo.firstname
                            ) ||
                            validateWrapper(
                              "firstName",
                              this.state.userInfo.firstname
                            )
                        });
                      }}
                    />
                  </Item>
                  {this.state.firstnameError && this.state.firstnameError !== "" ? (
                    <Text style={[styles.text, styles.repasswordErrorText]}>
                      {translate(this.state.firstnameError)}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.marginVertical}>
                  <View style={[styles.labelView]}>
                    <Text
                      uppercase
                      style={[
                        styles.inputLabel,
                        styles.labelInputText,
                        this.state.inputL
                          ? globalStyles.orangeTextColor
                          : globalStyles.whiteTextColor
                      ]}
                    >
                      {translate("Last Name")}
                    </Text>
                  </View>
                  <Item
                    style={[
                      styles.input,
                      this.state.inputL
                        ? globalStyles.purpleBorderColor
                        : this.state.lastnameError
                          ? globalStyles.redBorderColor
                          : globalStyles.transparentBorderColor
                    ]}
                  >
                    <UserProfile
                      style={[
                        styles.iconSize,
                        this.state.inputL
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor
                      ]}
                      fill={this.state.inputL ? "#FF9D00" : "#FFF"}
                    />

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
                          lastnameError:
                            validateWrapper(
                              "mandatory",
                              this.state.userInfo.lastname
                            ) ||
                            validateWrapper(
                              "lastName",
                              this.state.userInfo.lastname
                            )
                        });
                      }}
                    />
                  </Item>
                  {this.state.lastnameError && this.state.lastnameError !== "" ? (
                    <Text style={[styles.text]}>
                      {translate(this.state.lastnameError)}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.marginVertical}>
                  <View style={[styles.labelView]}>
                    <Text
                      uppercase
                      style={[
                        styles.inputLabel,
                        styles.labelInputText,
                        this.state.inputE
                          ? globalStyles.orangeTextColor
                          : globalStyles.whiteTextColor
                      ]}
                    >
                      {translate("Email")}
                    </Text>
                  </View>
                  <Item
                    ref={r => {
                      this._textInputRef = r;
                    }}
                    style={[
                      styles.input,
                      this.state.inputE
                        ? globalStyles.purpleBorderColor
                        : this.state.emailError
                          ? globalStyles.redBorderColor
                          : globalStyles.transparentBorderColor
                    ]}
                  >
                    <EmailIcon
                      style={[styles.iconSize]}
                      fill={this.state.inputE ? "#FF9D00" : "#FFF"}
                    />

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
                  {this.state.emailError && this.state.emailError !== "" && (
                    <Text style={[styles.text, styles.emailErrorText]}>
                      {translate(this.state.emailError)}
                    </Text>
                  )}
                </View>

                <View style={styles.marginVertical}>
                  <View style={[styles.labelView]}>
                    <Text
                      uppercase
                      style={[
                        styles.inputLabel,
                        styles.labelInputText,
                        this.state.inputP
                          ? globalStyles.orangeTextColor
                          : globalStyles.whiteTextColor
                      ]}
                    >
                      {translate("Password")}
                    </Text>
                  </View>
                  <Item
                    ref={r => {
                      this._textInputRef = r;
                    }}
                    style={[
                      styles.input,
                      this.state.inputP
                        ? globalStyles.purpleBorderColor
                        : this.state.passwordError
                          ? globalStyles.redBorderColor
                          : globalStyles.transparentBorderColor
                    ]}
                  >
                    <PasswordIcon
                      style={[styles.iconSize]}
                      fill={this.state.inputP ? "#FF9D00" : "#FFF"}
                    />

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
                </View>

                <View style={styles.marginVertical}>
                  <View style={[styles.labelView]}>
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
                      style={styles.inputText}
                      secureTextEntry={true}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value =>
                        this.setState({ repassword: value })
                      }
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
                <LowerButton function={() => this._handleSubmission()} />
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
