//Components
import React, { Component, createRef } from "react";
import { View, Image } from "react-native";
import { Text, Container, Icon, Input, Label, Item, Button } from "native-base";
import CodeInput from "react-native-confirmation-code-field";
import { Segment } from "expo";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import LowerButton from "../../../MiniComponents/LowerButton";
import { globalColors } from "../../../../Global Styles";

class Verification extends Component {
  inputRef = createRef();
  static navigationOptions = {
    header: null
  };
  state = {
    codeError: "",
    showEmail: false,
    email: "",
    emailError: "",
    InputE: false
  };
  componentDidMount() {
    Segment.screen("Signup Enter OTP Verification Screen");

    alert(this.props.verificationCode);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.verificationCode !== this.props.verificationCode)
      alert(this.props.verificationCode);
    if (prevProps.message !== this.props.message) {
      if (this.props.message.includes("Invalid")) {
        this.handlerOnIvalidCode();

        this.setState({
          codeError: this.props.message
        });
      } else {
        this.setState({
          codeError: this.props.message
        });
      }
    }
  }
  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.email);
    this.setState({ emailError });
    if (!emailError) {
      this.props.resendVerifyMobileCodeByEmail({
        mobile: this.props.mobileNo,
        country_code: this.props.countryCode,
        email: this.state.email
      });
    }
  };
  handlerOnIvalidCode() {
    const { current } = this.inputRef;

    if (current) {
      current.clear();
      current.focus();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Please Enter the {"\n"}
          Verification code sent to{"\n"} {this.props.mobileNo}
        </Text>
        <Text
          onPress={() => {
            this.props.resetMessages();
            this.props.resendVerifyMobileCode({
              mobile: this.props.mobileNo,
              country_code: this.props.countryCode
            });
          }}
          style={[styles.link]}
        >
          Resend Code
        </Text>
        <Text
          onPress={() => {
            this.setState({ showEmail: true });
            this.props.resetMessages();
            // this.props.resendVerifyMobileCode({
            //   mobile: this.props.mobileNo,
            //   country_code: this.props.countryCode
            // });
          }}
          style={[styles.link, { paddingVertical: 0 }]}
        >
          Not receiving an SMS? Try by email!
        </Text>
        {this.state.showEmail && (
          <>
            <Item
              floatingLabel
              style={[
                styles.input,
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
                  styles.inputtext,
                  {
                    bottom: 5,
                    color: this.state.InputE ? "#FF9D00" : "#717171"
                  }
                ]}
              >
                Email
              </Label>

              <Input
                style={styles.inputtext}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={value => this.setState({ email: value })}
                onFocus={() => {
                  this.setState({ InputE: true });
                }}
                onBlur={() => {
                  this.setState({
                    InputE: false
                  });
                  this.setState({
                    emailError: validateWrapper("email", this.state.email)
                  });
                }}
              />
            </Item>
            <Button
              transparent
              style={{
                position: "relative",
                bottom: "15%",
                left: "45%"
              }}
              onPress={() => this._handleSubmission()}
            >
              <Icon
                type="MaterialIcons"
                name="send"
                style={{ color: this.state.InputE ? "#FF9D00" : "#717171" }}
              />
            </Button>
          </>
        )}
        {this.state.codeError !== "" && (
          <Text style={[styles.errorText]}>{this.state.codeError}</Text>
        )}
        <CodeInput
          inactiveColor="black"
          activeColor="purple"
          variant="border-b"
          autoFocus
          keyboardType="numeric"
          space={20}
          onFulfill={code => {
            this.props.resetMessages();
            this.props.verifyMobileCode({
              mobile: this.props.mobileNo,
              country_code: this.props.countryCode,
              verificationCode: code
            });
          }}
          ref={this.inputRef}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  mobileNo: state.auth.mobileNo,
  countryCode: state.auth.countryCode,
  verificationCode: state.auth.verificationCode,
  message: state.auth.message
});
const mapDispatchToProps = dispatch => ({
  verifyMobileCode: mobileAuth =>
    dispatch(actionCreators.verifyMobileCode(mobileAuth)),
  resendVerifyMobileCode: mobileAuth =>
    dispatch(actionCreators.resendVerifyMobileCode(mobileAuth)),
  resendVerifyMobileCodeByEmail: mobileAuth =>
    dispatch(actionCreators.resendVerifyMobileCodeByEmail(mobileAuth)),
  resetMessages: () => dispatch(actionCreators.resetMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
