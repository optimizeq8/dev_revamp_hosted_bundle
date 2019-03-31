import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView
} from "react-native";
import { Button, Text, Item, Input, Icon, Label } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";

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
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        emailError:
          this.props.message.includes("exist") && this.props.message
            ? this.props.message
            : ""
      });
    }
  }

  _passwordVarification = () => {
    if (
      this.state.userInfo.password !== this.state.repassword ||
      this.state.repassword === ""
    ) {
      this.setState({ repasswordError: "Your Passwords don't match." });
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
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={{ flex: 1, marginVertical: 10 }}>
          <KeyboardShift>
            {() => (
              <View style={styles.contentContainer}>
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputF
                        ? "#7039FF"
                        : this.state.firstnameError
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
                        flexDirection: "column",
                        color: this.state.inputF ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    <Icon
                      style={{
                        fontSize: 20,
                        color: this.state.inputF ? "#FF9D00" : "#717171"
                      }}
                      name="person"
                    />
                    {"  "}
                    First Name
                  </Label>

                  <Input
                    style={styles.inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value => {
                      this.setState({
                        userInfo: { ...this.state.userInfo, firstname: value }
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
                    {
                      borderColor: this.state.inputL
                        ? "#7039FF"
                        : this.state.lastnameError
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
                        color: this.state.inputL ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    Last Name
                  </Label>

                  <Input
                    style={styles.inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        userInfo: { ...this.state.userInfo, lastname: value }
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
                    {
                      borderColor: this.state.inputE
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
                        flexDirection: "row",
                        color: this.state.inputE ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    <Icon
                      style={{
                        fontSize: 20,
                        color: this.state.inputE ? "#FF9D00" : "#717171"
                      }}
                      name="mail"
                    />
                    {"  "}
                    Email
                  </Label>

                  <Input
                    style={styles.inputtext}
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
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#717171",
                      fontFamily: "benton-sans-regular",
                      fontSize: 15,
                      bottom: 40
                    }}
                  >
                    {this.state.emailError}
                  </Text>
                ) : null}
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputP
                        ? "#7039FF"
                        : this.state.passwordError
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

                        color: this.state.inputP ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    <Icon
                      style={{
                        fontSize: 20,
                        color: this.state.inputP ? "#FF9D00" : "#717171"
                      }}
                      name="key"
                    />
                    {"  "}
                    Password
                  </Label>
                  <Input
                    style={styles.inputtext}
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        userInfo: { ...this.state.userInfo, password: value }
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
                  <Text
                    style={[
                      styles.text,
                      {
                        bottom: 40,
                        paddingVertical: 0,
                        paddingTop: 0,
                        marginBottom: 0,
                        paddingVertical: 0
                      }
                    ]}
                  >
                    {this.state.passwordError}
                  </Text>
                ) : null}
                {this.state.userInfo.password !== "" && (
                  <Item
                    floatingLabel
                    style={[
                      styles.input,
                      {
                        marginBottom: 0,
                        paddingBottom: 0,
                        borderColor: this.state.inputPR
                          ? "#7039FF"
                          : this.state.repasswordError !== ""
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
                          color: this.state.inputPR ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      Retype Password
                    </Label>

                    <Input
                      style={styles.inputtext}
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
                )}
                {this.state.repasswordError !== "" &&
                this.state.userInfo.password !== "" ? (
                  <Text
                    style={[
                      styles.text,
                      {
                        bottom: 15,
                        paddingTop: 0,
                        marginBottom: 0,
                        paddingVertical: 0
                      }
                    ]}
                  >
                    {this.state.repasswordError}
                  </Text>
                ) : null}
                <Button
                  onPress={() => this._handleSubmission()}
                  style={styles.button}
                >
                  <Icon style={styles.icon} name="arrow-forward" />
                </Button>
              </View>
            )}
          </KeyboardShift>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  message: state.auth.message,
  mobileNo: state.auth.mobileNo
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: (email, userInfo) =>
    dispatch(actionCreators.verifyEmail(email, userInfo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
