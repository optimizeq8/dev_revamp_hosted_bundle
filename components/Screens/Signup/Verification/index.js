//Components
import React, { Component, createRef } from "react";
import { View, Image, ScrollView } from "react-native";
import { Text, Container, Icon, Input, Label, Item, Button } from "native-base";
import CodeInput from "react-native-confirmation-code-field";
import { Segment } from "expo";

Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = false;
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { globalColors } from "../../../../Global Styles";
import { showMessage } from "react-native-flash-message";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

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
    Segment.screen("Signup Enter OTP Verification Screen");
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
        <KeyboardShift>
          {() => (
            <ScrollView contentContainerStyle={{ height: "100%" }}>
              {!this.props.invite ? (
                <Text style={[styles.text, { lineHeight: 20 }]}>
                  Please enter the {"\n"}
                  verification code sent to {"\n"} {this.props.mobileNo}
                </Text>
              ) : (
                <>
                  <Text style={[styles.inviteText, { paddingTop: 20 }]}>
                    Invite Code
                  </Text>
                </>
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
                      style={styles.inputtext}
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
                    <Text style={styles.buttontext}>Get Started!</Text>
                  </Button>
                </>
              ) : (
                <View style={{ height: "10%" }}>
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
              {!this.props.invite && (
                <View style={{ top: "10%" }}>
                  <Text
                    onPress={() => {
                      this.setState({ showEmail: !this.state.showEmail });
                    }}
                    style={[styles.link, { paddingVertical: 0 }]}
                  >
                    Not receiving the SMS? Try verifying your account by email.
                  </Text>

                  {this.state.showEmail && (
                    <>
                      <Item
                        floatingLabel
                        style={[
                          styles.emailInput,
                          {
                            borderColor: this.state.InputE
                              ? "#7039FF"
                              : this.state.emailError
                              ? "red"
                              : "#D9D9D9"
                          }
                        ]}
                      >
                        <Label
                          style={[
                            {
                              bottom: 5,
                              color: this.state.InputE ? "#FF9D00" : "#717171"
                            }
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
                        style={{
                          position: "relative",
                          bottom: "2%",
                          alignSelf: "flex-end"
                        }}
                        onPress={() => this._handleSubmission()}
                      >
                        <Icon
                          type="MaterialIcons"
                          name="send"
                          style={{
                            color: this.state.InputE ? "#FF9D00" : "#717171"
                          }}
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
