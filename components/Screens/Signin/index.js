//// components
import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  Item,
  Input,
  Container
} from "native-base";
import { LinearGradient } from "expo";
//Validation
import validateWrapper from "./ValidateWrapper";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

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
    this.props.resetMessages();
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
            source={require("../../../assets/images/logo01.png")}
            resizeMode="contain"
          />
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
            <Text style={styles.error}>{this.state.emailError}</Text>
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
            <Text style={styles.error}>{this.state.passwordError}</Text>
          ) : null}
          <Text
            onPress={() => this.props.navigation.push("ForgotPassword")}
            style={[styles.link, { paddingVertical: 25, fontSize: 12 }]}
          >
            Forgot Password?
          </Text>
          <Button
            block
            style={styles.button}
            onPress={() => {
              this._handleSubmission();
            }}
          >
            <Text style={styles.buttontext}>Sign in</Text>
          </Button>
        </View>
        <View>
          <View style={{ marginBottom: 30 }}>
            <Text style={[styles.link, { paddingBottom: 7 }]}>
              Don’t Have an Account?
            </Text>
            <Button
              rounded
              onPress={() => {
                this.props.resetRegister();
                this.props.navigation.navigate("MainForm");
              }}
              style={styles.bottomView}
            >
              <Text
                style={[
                  styles.buttontext,
                  { color: "#fff", fontFamily: "montserrat-semibold" }
                ]}
              >
                Sign Up Now!
              </Text>
            </Button>
          </View>
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
  resetMessages: () => dispatch(actionCreators.resetMessages()),
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
