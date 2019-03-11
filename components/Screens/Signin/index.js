import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView } from "react-native";
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
    const Slide = ({ title }) => (
      <View style={styles.slide}>
        <Image
          style={{
            height: 250,
            width: 250
          }}
          source={require("../../../assets/images/tutorial/inst01.png")}
          resizeMode="contain"
        />
      </View>
    );
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Image
          style={styles.image}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
        <Card padder style={styles.mainCard}>
          <Text style={styles.text}>Start Optimizing {"\n"} your Ads</Text>
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
                color: "#717171",
                fontFamily: "benton-sans-regular",
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
                borderColor: this.state.passwordError ? "red" : "#D9D9D9"
              }
            ]}
          >
            <Input
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
                color: "#717171",
                fontFamily: "benton-sans-regular",
                fontSize: 15,
                marginTop: 25
              }}
            >
              {this.state.passwordError}
            </Text>
          ) : null}
          <Button
            block
            dark
            style={styles.button}
            onPress={() => {
              this._handleSubmission();
            }}
          >
            <Text style={styles.buttontext}>Login</Text>
          </Button>
        </Card>
        <View style={{ backgroundColor: "#fff" }}>
          <Card padder style={styles.bottomCard}>
            <Text
              onPress={() => this.props.navigation.navigate("MainForm")}
              style={styles.link}
            >
              I Don’t Have an Account
            </Text>
          </Card>
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
