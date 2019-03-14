import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import { View, TouchableOpacity, Image } from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../../store/actions";
import CodeInput from "react-native-confirmation-code-field";

class Verification extends Component {
  inputRef = createRef();
  static navigationOptions = {
    header: null
  };
  state = { codeError: "" };
  componentDidMount() {
    alert(this.props.verificationCode);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.verificationCode !== this.props.verificationCode)
      alert(this.props.verificationCode);
    if (prevProps.message !== this.props.message) {
      console.log("hu", this.props.message);

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
  handlerOnIvalidCode() {
    const { current } = this.inputRef;

    if (current) {
      current.clear();
      current.focus();
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>
          Please Enter the {"\n"}
          Verification code sent to{"\n"} {this.props.mobileNo}
        </Text>
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
              verificationCode: code
            });
          }}
          ref={this.inputRef}
        />
        {this.state.codeError !== "" && (
          <Text style={[styles.text, { marginBottom: 0, paddingVertical: 0 }]}>
            {this.state.codeError}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            this.props.resetMessages();
            this.props.resendVerifyMobileCode(this.props.mobileNo);
          }}
        >
          <Text style={[styles.text, { textDecorationLine: "underline" }]}>
            Resend Code
          </Text>
        </TouchableOpacity>
        {/*<TouchableOpacity
          onPress={() => {
            this.props.verifyMobileCode({
              mobile: this.props.mobileNo,
              verificationCode: this.props.verificationCode
            });
          }}
          style={styles.button}
        >
          <Image
            style={styles.image}
            source={require("../../../../assets/images/button.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>*/}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  mobileNo: state.auth.mobileNo,
  verificationCode: state.auth.verificationCode,
  message: state.auth.message
});
const mapDispatchToProps = dispatch => ({
  verifyMobileCode: mobileAuth =>
    dispatch(actionCreators.verifyMobileCode(mobileAuth)),
  resendVerifyMobileCode: mobileAuth =>
    dispatch(actionCreators.resendVerifyMobileCode(mobileAuth)),
  resetMessages: () => dispatch(actionCreators.resetMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
