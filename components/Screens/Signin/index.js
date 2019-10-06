//// components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { Button, Text, Item, Input, Container } from "native-base";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import * as Segment from "expo-analytics-segment";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import LoadingScreen from "../../MiniComponents/LoadingScreen";
import KeyboardShift from "../../MiniComponents/KeyboardShift";
import LowerButton from "../../MiniComponents/LowerButton";
import ForwardLoading from "../../MiniComponents/ForwardLoading";

// Validation
import validateWrapper from "./ValidateWrapper";

// Icons
import Logo from "../../../assets/SVGs/Optimize";
import Background from "../../../assets/SVGs/Background";
import UserProfile from "../../../assets/SVGs/UserProfile";
import PasswordIcon from "../../../assets/SVGs/PasswordOutline";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";
import { colors } from "../../GradiantColors/colors";

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
    Segment.screenWithProperties("Sign In", {
      category: "Sign In"
    });
    // if (
    //   this.props.navigation &&
    //   this.props.navigation.getParam("loggedout", false)
    // ) {
    // } else {
    this.props.checkForExpiredToken(this.props.navigation);
    // }
  }
  render() {
    let invite = this.props.navigation.getParam("invite", false);
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ bottom: "never", top: "always" }}
        style={styles.safeAreaViewContainer}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Container style={styles.container}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={[styles.touchableViewContainer]}>
              <View>
                <Background
                  style={styles.background}
                  width={widthPercentageToDP(90)}
                  height={heightPercentageToDP(65)}
                />
              </View>
              <View style={styles.logoContainer}>
                <Logo
                  style={styles.logo}
                  width={heightPercentageToDP(12)}
                  height={heightPercentageToDP(12)}
                />
                <Text style={styles.logoText}>Optimize</Text>
              </View>
              <KeyboardShift style={styles.keyboardShiftContainer}>
                {() => (
                  <View style={styles.keyboardShiftContainer}>
                    {/* <Text style={styles.text}>Sign In</Text> */}

                    <View style={styles.mainView}>
                      <Item
                        rounded
                        style={[
                          styles.input,
                          this.state.emailError
                            ? globalStyles.redBorderColor
                            : globalStyles.transparentBorderColor
                        ]}
                      >
                        <UserProfile style={styles.inputIcon} />
                        <Input
                          placeholderTextColor="#fff"
                          autoCorrect={false}
                          autoCapitalize="none"
                          style={styles.inputText}
                          onChangeText={value => {
                            this.setState({
                              email: value.trim()
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
                          placeholder={translate("Email")}
                        />
                      </Item>

                      <Item
                        rounded
                        style={[
                          styles.input,
                          this.state.passwordError
                            ? globalStyles.redBorderColor
                            : globalStyles.transparentBorderColor
                        ]}
                      >
                        <PasswordIcon style={styles.inputIcon} />
                        <Input
                          placeholderTextColor="#fff"
                          secureTextEntry={true}
                          autoCorrect={false}
                          textContentType="password"
                          autoCapitalize="none"
                          style={styles.inputText}
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
                          placeholder={translate("Password")}
                        />
                      </Item>
                      {this.props.loading ? (
                        <ForwardLoading
                          mainViewStyle={{
                            width: widthPercentageToDP(9),
                            height: heightPercentageToDP(9)
                          }}
                          bottom={5}
                          style={{
                            width: widthPercentageToDP(7),
                            height: heightPercentageToDP(7)
                          }}
                        />
                      ) : (
                        <LowerButton
                          function={() => this._handleSubmission()}
                        />
                      )}
                      {/* <Button
                        block
                        style={styles.button}
                        onPress={() => {
                          this._handleSubmission();
                        }}
                      >
                        <Text style={styles.buttonText}>
                          {translate("Sign in")}
                        </Text>
                      </Button> */}
                      <Text
                        onPress={() => {
                          Segment.track("Forgot Password Button");
                          this.props.navigation.push("ForgotPassword");
                        }}
                        style={[styles.link, styles.forgotPasswordLink]}
                      >
                        {translate("Forgot Password?")}
                      </Text>
                    </View>
                  </View>
                )}
              </KeyboardShift>

              {invite && (
                <View style={styles.bottomInviteViewContainer}>
                  <Text style={[styles.link, styles.dontHaveAccountText]}>
                    {translate("Don’t Have an Account?")}
                  </Text>
                  {/* <Button
                    rounded
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    style={styles.bottomView}
                  >
                    <Text style={[styles.buttonText, styles.textInviteCode]}>
                      {translate("Enter Invite Code!")}
                    </Text>
                  </Button> */}
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  >
                    <Text style={styles.createOneText}>
                      {translate("Create One!")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </Container>
        {/* <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal> */}
      </SafeAreaView>
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
