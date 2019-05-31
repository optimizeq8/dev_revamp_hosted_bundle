//// components
import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  Item,
  Input,
  Container
} from "native-base";
import { LinearGradient, Segment } from "expo";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
//Validation
import validateWrapper from "./ValidateWrapper";

//icons
import Logo from "../../../assets/SVGs/Optimize";
import Background from "../../../assets/SVGs/Background";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { Modal } from "react-native-paper";
import KeyboardShift from "../../MiniComponents/KeyboardShift";

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
    Segment.screen("Sign in Screen");

    if (
      this.props.navigation &&
      this.props.navigation.getParam("loggedout", false)
    ) {
    } else {
      this.props.checkForExpiredToken(this.props.navigation);
    }
  }
  render() {
    let invite = this.props.navigation.getParam("invite", {});

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <Container style={styles.container}>
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              locations={[0.7, 1]}
              style={styles.gradient}
            />
            <View>
              <Background
                style={styles.background}
                width={widthPercentageToDP(90)}
                height={heightPercentageToDP(65)}
              />
            </View>
            <View style={{ marginTop: "1%" }}>
              <Logo
                style={styles.logo}
                width={heightPercentageToDP(20)}
                height={heightPercentageToDP(20)}
              />
              <Text style={styles.logotext}>Optimize</Text>
            </View>
            <KeyboardShift>
              {() => (
                <>
                  <Text style={styles.text}>Sign In</Text>

                  <View style={styles.mainView}>
                    <Item
                      rounded
                      style={[
                        styles.input,
                        {
                          borderColor: this.state.emailError
                            ? "red"
                            : "rgba(0, 0, 0, 0)"
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
                            emailError: validateWrapper(
                              "email",
                              this.state.email
                            )
                          });
                        }}
                        placeholder="Email"
                      />
                    </Item>
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
                        textContentType="password"
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
                    <Text
                      onPress={() => {
                        Segment.track("Forgot Password Button");
                        this.props.navigation.push("ForgotPassword");
                      }}
                      style={[
                        styles.link,
                        { paddingVertical: 25, fontSize: 12 }
                      ]}
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
                  <View style={{ top: "15%" }}>
                    {invite && (
                      <>
                        <Text style={[styles.link, { paddingBottom: 7 }]}>
                          Don’t Have an Account?
                        </Text>
                        <Button
                          rounded
                          onPress={() => {
                            this.props.navigation.navigate("Invitation");
                          }}
                          style={styles.bottomView}
                        >
                          <Text
                            style={[
                              styles.buttontext,
                              {
                                color: "#fff",
                                fontFamily: "montserrat-semibold"
                              }
                            ]}
                          >
                            Enter Invite Code!
                          </Text>
                        </Button>
                      </>
                    )}
                  </View>
                </>
              )}
            </KeyboardShift>
          </Container>
          <Modal visible={this.props.loading}>
            <LoadingScreen top={0} />
          </Modal>
        </>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  login: (userInfo, navigation) =>
    dispatch(actionCreators.login(userInfo, navigation)),
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
