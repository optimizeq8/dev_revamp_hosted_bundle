//Components
import React, { Component, createRef } from "react";
import { View, Image } from "react-native";
import { Text, Container, Icon } from "native-base";
import CodeInput from "react-native-confirmation-code-field";

// Style
import styles, { colors } from "./styles";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

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
      <View style={styles.container}>
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
          <Text style={[styles.errorText]}>{this.state.codeError}</Text>
        )}

        <Text
          onPress={() => {
            this.props.resetMessages();
            this.props.resendVerifyMobileCode(this.props.mobileNo);
          }}
          style={[styles.link]}
        >
          Resend Code
        </Text>
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
