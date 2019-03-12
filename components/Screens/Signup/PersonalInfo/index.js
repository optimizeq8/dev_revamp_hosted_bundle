import React, { Component } from "react";
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
  Badge,
  Toast
} from "native-base";

// Style
import styles, { colors } from "./styles";
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
      <View>
        <View style={{ paddingBottom: 0 }}>
          <Text style={styles.text}>Personal Info</Text>
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.firstnameError ? "red" : "#D9D9D9"
              }
            ]}
          >
            <Input
              style={styles.inputtext}
              placeholder="First Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, firstname: value }
                })
              }
              onBlur={() => {
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
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.lastnameError ? "red" : "#D9D9D9"
              }
            ]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Last Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, lastname: value }
                })
              }
              onBlur={() => {
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
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.emailError ? "red" : "#D9D9D9"
              }
            ]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, email: value }
                })
              }
              onBlur={() => {
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
                bottom: 30
              }}
            >
              {this.state.emailError}
            </Text>
          ) : null}
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.passwordError ? "red" : "#D9D9D9"
              }
            ]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, password: value }
                })
              }
              onBlur={() => {
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
              style={{
                textAlign: "center",
                color: "#717171",
                fontFamily: "benton-sans-regular",
                fontSize: 15,
                paddingBottom: "10%"
              }}
            >
              {this.state.passwordError}
            </Text>
          ) : null}
          <Item
            rounded
            style={[
              styles.input,
              {
                marginBottom: 0,
                paddingBottom: 0,
                borderColor:
                  this.state.repasswordError !== "" ? "red" : "#D9D9D9"
              }
            ]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Retype Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ repassword: value })}
              onBlur={() => this._passwordVarification()}
            />
          </Item>
          {this.state.repasswordError !== "" ? (
            <Text
              style={{
                textAlign: "center",
                color: "#717171",
                fontFamily: "benton-sans-regular",
                fontSize: 15,
                marginTop: 0,
                marginBottom: 15
              }}
            >
              {this.state.repasswordError}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => this._handleSubmission()}
          style={[styles.buttonN, { paddingTop: 0, bottom: 15 }]}
        >
          <Image
            style={styles.image}
            source={require("../../../../assets/images/button.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
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
