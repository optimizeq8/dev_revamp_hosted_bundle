import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
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
  Toast
} from "native-base";
import { LinearGradient } from "expo";
import validateWrapper from "./ValidateWrapper";

// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        emailError:
          this.props.message.includes("Email") && this.props.message
            ? "Invalid Email"
            : "",
        passwordError:
          this.props.message.includes("Password") && this.props.message
            ? "Invalid Password "
            : ""
      });
    }
  }
  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.email);
    const passwordError = validateWrapper("password", this.state.password);
    this.setState({
      emailError: emailError,
      passwordError: passwordError
    });
    if (!emailError && !passwordError) {
      this.props.login(this.state, this.props.navigation);
    }
  };
  componentDidMount() {
    this.props.checkForExpiredToken(this.props.navigation);
  }
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <View style={{ marginTop: 25 }}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.logo}>optimize</Text>
        </View>
        <Text style={styles.text}>Sign In</Text>

        <View style={styles.mainView}>
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.emailError ? "red" : "rgba(0, 0, 0, 0)"
              }
            ]}
          >
            <Input
              placeholderTextColor="#fff"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.inputtext}
              onChangeText={value => {
                this.setState({
                  email: value
                });
              }}
              onBlur={() => {
                this.setState({
                  emailError: validateWrapper("email", this.state.email)
                });
              }}
              placeholder="Email"
            />
          </Item>
          {this.state.emailError ? (
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "montserrat-regular",
                fontSize: 15,
                marginTop: 25
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
                borderColor: this.state.passwordError
                  ? "red"
                  : "rgba(0, 0, 0, 0)"
              }
            ]}
          >
            <Input
              placeholderTextColor="#fff"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.inputtext}
              onChangeText={value => {
                this.setState({
                  password: value
                });
              }}
              onBlur={() => {
                this.setState({
                  passwordError: validateWrapper(
                    "password",
                    this.state.password
                  )
                });
              }}
              placeholder="Password"
            />
          </Item>
          {this.state.passwordError ? (
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "montserrat-regular",
                fontSize: 15,
                marginTop: 25
              }}
            >
              {this.state.passwordError}
            </Text>
          ) : null}
          <Text
            onPress={() => {}}
            style={[styles.link, { paddingVertical: 25, fontSize: 12 }]}
          >
            Forgot Password?
          </Text>
          <Button
            block
            dark
            style={styles.button}
            onPress={() => {
              this._handleSubmission();
            }}
          >
            <Text style={styles.buttontext}>Sign in</Text>
          </Button>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("MainForm")}
            style={styles.bottomView}
          >
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.link}>I Don’t Have an Account</Text>
              <Text style={[styles.link, { color: "#FF9D00" }]}>
                Create one!
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  login: (userInfo, navigation) =>
    dispatch(actionCreators.login(userInfo, navigation)),
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
