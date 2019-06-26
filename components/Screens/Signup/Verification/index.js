//Components
import React, { Component, createRef } from "react";
import { View, ScrollView } from "react-native";
import { Text, Icon, Input, Label, Item, Button } from "native-base";
import CodeInput from "react-native-confirmation-code-field";
import { showMessage } from "react-native-flash-message";
import { Segment } from "expo";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = false;

class Verification extends Component {
  inputRef = createRef();
  static navigationOptions = {
    header: null
  };
  state = {
    timer: 60,
    timerStart: false,
    code: "",
    codeError: "",
    showEmail: false,
    email: "",
    emailError: "",
    InputE: false
  };
  componentDidMount() {
    Segment.screenWithProperties(
      this.props.invite ? "Invite Code" : "OTP Verification",
      {
        category: "Sign Up"
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.clockCall);
  }
  startTimer = () => {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
    this.setState({ timerStart: true });
  };

  decrementClock = () => {
    if (this.state.timer === 0) {
      clearInterval(this.clockCall);
      this.setState({ timerStart: false, timer: 120 });
    }
    this.setState(prevstate => ({ timer: prevstate.timer - 1 }));
  };

  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.email);
    this.setState({ emailError });
    if (!emailError) {
      this.setState({ showEmail: false });
      this.props.resendVerifyMobileCodeByEmail({
        mobile: this.props.mobileNo,
        country_code: this.props.countryCode,
        email: this.state.email
      });
    } else {
      showMessage({
        message: "Please enter a valid email.",
        type: "warning",
        position: "top"
      });
    }
  };

  _handleSentCode = code => {
    this.props.verifyMobileCode({
      mobile: this.props.mobileNo,
      country_code: this.props.countryCode,
      verificationCode: code
    });
  };

  _handleInviteCode = () => {
    this.props.verifyInviteCode(this.state.code);
  };
  // handlerOnInvalidCode() {
  //   const { current } = this.inputRef;

  //   if (current) {
  //     current.clear();
  //     current.focus();
  //   }
  // }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardShift style={styles.keyboardContainer}>
          {() => (
            <ScrollView
              contentContainerStyle={[
                styles.scrollViewContentContainer,
                {
                  paddingTop: !this.props.invite ? 30 : 0,
                  justifyContent: this.props.invite ? "center" : "flex-start"
                }
              ]}
            >
              {!this.props.invite ? (
                <Text style={[styles.text]}>
                  Please enter the {"\n"}
                  verification code sent to {"\n"}
                  {this.props.mobileNo}
                </Text>
              ) : (
                <Text style={[styles.inviteText]}>Invite Code</Text>
              )}
              {!this.props.invite &&
                (this.state.timerStart ? (
                  <Text style={[styles.link]}>
                    {new Date(this.state.timer * 1000)
                      .toISOString()
                      .substr(14, 5)}
                  </Text>
                ) : (
                  <Text
                    onPress={() => {
                      this.startTimer();
                      this.props.resendVerifyMobileCode({
                        mobile: this.props.mobileNo,
                        country_code: this.props.countryCode
                      });
                    }}
                    style={[styles.link]}
                  >
                    Resend Code
                  </Text>
                ))}

              {/* {this.state.codeError !== "" && !this.props.invite && (
          <Text style={[styles.errorText]}>{this.state.codeError}</Text>
        )} */}
              {this.props.invite ? (
                <>
                  <Item rounded style={[styles.input]}>
                    <Input
                      placeholderTextColor="#fff"
                      autoCorrect={false}
                      maxLength={5}
                      autoCapitalize="none"
                      style={styles.inputText}
                      onChangeText={value => {
                        this.setState({
                          code: value
                        });
                      }}
                      onBlur={() => {
                        if (validateWrapper("mandatory", this.state.code)) {
                          showMessage({
                            message: "Please enter an invite code!",
                            type: "warning",
                            position: "top"
                          });
                        }
                      }}
                      placeholder="Enter your invite code"
                    />
                  </Item>
                  <Button
                    style={[styles.button]}
                    onPress={() => {
                      this._handleInviteCode();
                    }}
                  >
                    <Text style={styles.buttonText}>Get Started!</Text>
                  </Button>
                </>
              ) : (
                <View style={styles.codeInputContainer}>
                  <CodeInput
                    inactiveColor="black"
                    activeColor="purple"
                    variant="border-b"
                    autoFocus
                    keyboardType="numeric"
                    space={20}
                    onFulfill={code => this._handleSentCode(code)}
                    ref={this.inputRef}
                  />
                </View>
              )}
              {this.props.renderInviteCode && (
                <Text
                  style={[styles.link, styles.renderInviteCodeLink]}
                  onPress={() => this.props.toggleComps()}
                >
                  Get an invitation code now!
                </Text>
              )}
              {!this.props.invite && (
                <View style={styles.emailLinkContainer}>
                  <Text
                    onPress={() => {
                      this.setState({ showEmail: !this.state.showEmail });
                    }}
                    style={[styles.link, styles.emailLink]}
                  >
                    Not receiving the SMS? Try verifying your account by email.
                  </Text>

                  {this.state.showEmail && (
                    <>
                      <Item
                        floatingLabel
                        style={[
                          styles.emailInput,
                          this.state.InputE
                            ? globalStyles.purpleBorderColor
                            : this.state.emailError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
                        ]}
                      >
                        <Label
                          style={[
                            styles.emailLabel,
                            this.state.InputE
                              ? globalStyles.orangeTextColor
                              : globalStyles.darkGrayTextColor
                          ]}
                        >
                          Email
                        </Label>
                        <Input
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value =>
                            this.setState({ email: value })
                          }
                          onFocus={() => {
                            this.setState({ InputE: true });
                          }}
                          onBlur={() => {
                            this.setState({
                              InputE: false
                            });
                            this.setState({
                              emailError: validateWrapper(
                                "email",
                                this.state.email
                              )
                            });
                          }}
                        />
                      </Item>
                      <Button
                        transparent
                        style={styles.sendButton}
                        onPress={() => this._handleSubmission()}
                      >
                        <Icon
                          type="MaterialIcons"
                          name="send"
                          style={[
                            this.state.InputE
                              ? globalStyles.orangeTextColor
                              : globalStyles.darkGrayTextColor
                          ]}
                        />
                      </Button>
                    </>
                  )}
                </View>
              )}
            </ScrollView>
          )}
        </KeyboardShift>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  mobileNo: state.register.mobileNo,
  countryCode: state.register.countryCode,
  verificationCode: state.register.verificationCode
});
const mapDispatchToProps = dispatch => ({
  verifyMobileCode: mobileAuth =>
    dispatch(actionCreators.verifyMobileCode(mobileAuth)),
  verifyInviteCode: inviteCode =>
    dispatch(actionCreators.verifyInviteCode(inviteCode)),
  resendVerifyMobileCode: mobileAuth =>
    dispatch(actionCreators.resendVerifyMobileCode(mobileAuth)),
  resendVerifyMobileCodeByEmail: mobileAuth =>
    dispatch(actionCreators.resendVerifyMobileCodeByEmail(mobileAuth))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
