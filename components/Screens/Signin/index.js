//// components
import React, { Component } from "react";
import { View, TouchableOpacity, Linking, Platform } from "react-native";
import { Text } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import * as Segment from "expo-analytics-segment";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import InputField from "../../MiniComponents/InputField";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import AppUpdateChecker from "../AppUpdateChecker";

// Validation
import validateWrapper from "./ValidateWrapper";

// Icons
import Logo from "../../../assets/SVGs/Optimize";
import PasswordIcon from "../../../assets/SVGs/PasswordOutline";
import SignInCover from "../../../assets/SVGs/SignInCover";

SignInCover;
import PersonTransparentIcon from "../../../assets/SVGs/MenuIcons/PersonTransparent";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import GradientButton from "../../MiniComponents/GradientButton";
import { showMessage } from "react-native-flash-message";

class Signin extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      newEmail: "",
      newEmailError: "",
      activeTab: 0
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
    Segment.screenWithProperties("Signup Using Email", {
      category: "Sign Up",
      label: "Step 1 of Registeration"
    });
    if (Platform.OS === "ios") {
      Linking.addEventListener("url", this.handleDeepLink);
      Linking.getInitialURL().then(url => {
        if (url.includes("adj")) {
          this.handleDeepLink({ url });
        }
      });
    }
    if (this.props.userInfo) this.props.navigation.navigate("Dashboard");
  }
  handleDeepLink = url => {
    if (this.props.userInfo) {
      let screen = url.url.split("/main_navigator/");
      screen = screen[1].split("/")[0];
      if (url.url.includes("adType")) {
        let adTypePart = url.url
          .split("/main_navigator/")[1]
          .split("adType=")[1];
        let adType = adTypePart.substring(0, adTypePart.indexOf("&"));
        this.props.set_adType(adType);
      }

      this.props.navigation.navigate(screen);
      Linking.removeEventListener("url", evnt =>
        console.log("unmounted", evnt)
      );
    }
  };
  componentWillUnmount() {
    Linking.removeEventListener("url", evnt => console.log("unmounted", evnt));
  }
  setValue = (stateName, value) => {
    let state = {};
    state[stateName] = value;
    this.setState({ ...state });
  };

  getValidInfo = (stateError, validWrap) => {
    let state = {};
    state[stateError] = validWrap;
    this.setState({
      ...state
    });
  };
  createNewAccount = () => {
    if (!this.state.newEmailError) {
      this.props.verifyEmail(
        this.state.newEmail,
        { email: this.state.newEmail },

        this.props.navigation
      );
    } else {
      showMessage({
        message: this.state.newEmailError,
        type: "warning"
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    if (this.props.userInfo) {
      return <LoadingScreen dash={true} />;
    } else
      return (
        <SafeAreaView
          forceInset={{ bottom: "never", top: "always" }}
          style={styles.safeAreaViewContainer}
        >
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={styles.gradient}
          />

          {this.props.checkingForToken ? (
            <LoadingScreen dash={true} />
          ) : (
            <View style={styles.mainView}>
              <View style={styles.logoContainer}>
                <Logo
                  style={styles.logo}
                  width={heightPercentageToDP(9)}
                  height={heightPercentageToDP(9)}
                />
                <View style={styles.signTextContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Segment.screenWithProperties("Signup Using Email", {
                        category: "Sign Up",
                        label: "Step 1 of Registeration"
                      });
                      this.setState({
                        activeTab: 0
                      });
                    }}
                    style={[
                      styles.tabView,
                      this.state.activeTab === 0 && styles.activeTabView
                    ]}
                  >
                    <Text
                      style={[
                        styles.signText,
                        {
                          color:
                            this.state.activeTab === 0
                              ? "#FFF"
                              : "rgba(255,255,255,0.65)"
                        }
                      ]}
                    >
                      {translate("SIGN UP")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Segment.screenWithProperties("Sign In", {
                        category: "Sign In"
                      });
                      this.setState({
                        activeTab: 1
                      });
                    }}
                    style={[
                      styles.tabView,
                      this.state.activeTab === 1 && styles.activeTabView
                    ]}
                  >
                    <Text
                      style={[
                        styles.signText,
                        {
                          color:
                            this.state.activeTab === 1
                              ? "#FFF"
                              : "rgba(255,255,255,0.65)"
                        }
                      ]}
                    >
                      {translate("Sign in")}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.logoText}>Optimize</Text> */}
              </View>
              {this.state.activeTab === 0 && (
                <View style={styles.outView}>
                  <Text style={styles.heading}>
                    {translate("Create an Account")}
                  </Text>
                  <InputField
                    // disabled={this.props.loadingUpdateInfo}
                    customStyles={{ width: "100%", marginLeft: 0 }}
                    incomplete={false}
                    translate={this.props.screenProps.translate}
                    stateName1="newEmail"
                    label="Email"
                    placeholder1="Enter your email"
                    value={this.state.newEmail}
                    valueError1={this.state.newEmailError}
                    icon={PersonTransparentIcon}
                    setValue={this.setValue}
                    getValidInfo={this.getValidInfo}
                    key={"Email"}
                  />
                  <GradientButton
                    text={translate("Create Account")}
                    uppercase
                    style={{
                      height: 50,
                      width: "100%",
                      marginHorizontal: 0
                    }}
                    textStyle={{ fontSize: 14 }}
                    onPressAction={this.createNewAccount}
                  />
                </View>
              )}
              {this.state.activeTab === 1 && (
                <View style={styles.outView}>
                  <Text style={styles.heading}>
                    {translate("Welcome Back !")}
                  </Text>
                  <InputField
                    // disabled={this.props.loadingUpdateInfo}
                    customStyles={{ width: "100%", marginLeft: 0 }}
                    incomplete={false}
                    translate={this.props.screenProps.translate}
                    stateName1="email"
                    label="Email"
                    placeholder1="Enter your email"
                    value={this.state.email}
                    valueError1={this.state.emailError}
                    icon={PersonTransparentIcon}
                    setValue={this.setValue}
                    getValidInfo={this.getValidInfo}
                    key={"Email"}
                  />
                  <InputField
                    // disabled={this.props.loadingUpdateInfo}
                    customStyles={{ width: "100%", marginLeft: 0 }}
                    incomplete={false}
                    translate={this.props.screenProps.translate}
                    stateName1="password"
                    label="Password"
                    placeholder1="Enter your password"
                    value={this.state.password}
                    valueError1={this.state.passwordError}
                    icon={PasswordIcon}
                    setValue={this.setValue}
                    getValidInfo={this.getValidInfo}
                    key={"Passowrd"}
                    secureTextEntry={true}
                  />

                  <GradientButton
                    disabled={this.props.loading}
                    text={translate("Sign in")}
                    uppercase
                    style={styles.signInButton}
                    textStyle={{ fontSize: 14 }}
                    onPressAction={() => this._handleSubmission()}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Segment.track("Forgot Password Button");
                      this.props.navigation.push("ForgotPassword");
                    }}
                  >
                    <Text style={[styles.link, styles.forgotPasswordLink]}>
                      {translate("Forgot Password?")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.SignInCoverImage}>
                <SignInCover height={heightPercentageToDP(42)} />
              </View>
              <AppUpdateChecker screenProps={this.props.screenProps} />
            </View>
          )}
        </SafeAreaView>
      );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loading: state.auth.loading,
  checkingForToken: state.login.checkingForToken
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: (email, userInfo, navigation) =>
    dispatch(actionCreators.verifyEmail(email, userInfo, navigation)),
  login: (userInfo, navigation) =>
    dispatch(actionCreators.login(userInfo, navigation)),
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  checkForExpiredToken: navigation =>
    dispatch(actionCreators.checkForExpiredToken(navigation)),
  set_adType: value => dispatch(actionCreators.set_adType(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
