//// components
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-navigation";
import analytics from "@segment/analytics-react-native";
import InputScrollView from "react-native-input-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import InputField from "../../MiniComponents/InputFieldNew";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import AppUpdateChecker from "../AppUpdateChecker";

// Validation
import validateWrapper from "./ValidateWrapper";

// Icons
import Logo from "../../../assets/SVGs/Optimize";
import PasswordIcon from "../../../assets/SVGs/PasswordOutline";
import SignInCover from "../../../assets/SVGs/SignInCover";

import PersonTransparentIcon from "../../../assets/SVGs/MenuIcons/PersonTransparent";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import GradientButton from "../../MiniComponents/GradientButton";
import { showMessage } from "react-native-flash-message";

class Signin extends Component {
  static navigationOptions = {
    header: null,
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
      activeTab: 0,
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  _handleSubmission = () => {
    const emailError = validateWrapper("email", this.state.email);
    const passwordError = validateWrapper("password", this.state.password);
    this.setState({
      emailError: emailError,
      passwordError: passwordError,
    });
    if (!emailError && !passwordError) {
      this.props.login(this.state, this.props.navigation);
    }
  };

  async componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam("source_action", null);
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    const device_id = this.props.screenProps.device_id;
    await analytics.track(`email_registration`, {
      source,
      source_action,
      anonymous_userId,
      device_id,
    });
    this.setState({
      source,
      source_action,
    });
    if (Platform.OS === "ios") {
      Linking.addEventListener("url", this.handleDeepLink);
      Linking.getInitialURL().then((url) => {
        if (url && url.includes("adj")) {
          this.handleDeepLink({ url });
        }
      });
    }
    if (this.props.userInfo) this.props.navigation.navigate("Dashboard");
  }
  handleDeepLink = (url) => {
    if (this.props.userInfo) {
      let screen = url.url.split("/main_navigator/");
      screen = screen[1].split("/")[0];
      if (url && url.url.includes("adType")) {
        let adTypePart = url.url
          .split("/main_navigator/")[1]
          .split("adType=")[1];
        let adType = adTypePart.substring(0, adTypePart.indexOf("&"));
        this.props.set_adType(adType);
      }

      this.props.navigation.navigate(screen);
      Linking.removeEventListener("url");
    }
  };
  componentWillUnmount() {
    Linking.removeEventListener("url");
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
      ...state,
    });
  };
  createNewAccount = () => {
    const device_id = this.props.screenProps.device_id;
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    if (!this.state.newEmailError) {
      analytics.track(`a_create_account`, {
        mode_of_sign_up: "email",
        source: "email_registration",
        source_action: "a_create_account",
        action_status: "success",
        timestamp: new Date().getTime(),
        device_id,
        anonymous_userId,
        // source_action: "" Not sure
      });
      this.props.verifyEmail(
        this.state.newEmail,
        { email: this.state.newEmail },

        this.props.navigation
      );
    } else {
      analytics.track(`a_create_account`, {
        mode_of_sign_up: "email",
        source: "email_registration",
        action_status: "failure",
        timestamp: new Date().getTime(),
        device_id,
        anonymous_userId,
        source_action: "a_error",
      });

      showMessage({
        message: this.state.newEmailError,
        type: "warning",
      });
    }
  };

  /**
   * change active tab
   */
  changeActiveTab = (activeTabSignUp) => {
    // let activeTabSignUp = this.state.activeTab === 0;
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    const device_id = this.props.screenProps.device_id;

    // Action event
    analytics.track(`a_${activeTabSignUp ? "sign_in" : "sign_up"}_tab`, {
      source: activeTabSignUp ? "sign_in" : "email_registration",
      anonymous_userId,
      device_id,
      source_action: `a_${activeTabSignUp ? "sign_up" : "sign_in"}_tab`,
      timestamp: new Date().getTime(),
    });

    // Screeen event
    analytics.track(`${activeTabSignUp ? "sign_in" : "email_registration"}`, {
      source: `${activeTabSignUp ? "sign_in" : "email_registration"}`,
      source_action: `a_${activeTabSignUp ? "sign_up" : "sign_in"}_tab`,
      anonymous_userId,
      device_id,
      timestamp: new Date().getTime(),
    });
    this.setState({
      activeTab: activeTabSignUp ? 1 : 0,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    if (this.props.userInfo) {
      return <LoadingScreen dash={true} />;
    } else if (this.props.checkingForTokenError) {
      return (
        <ErrorComponent
          screenProps={this.props.screenProps}
          dashboard={true}
          loading={this.props.loading}
          navigation={this.props.navigation}
        />
      );
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
            <View style={{ flex: 1 }}>
              <SignInCover
                style={styles.SignInCoverImage}
                height={heightPercentageToDP(42)}
              />
              <InputScrollView
                showsVerticalScrollIndicator={false}
                {...ScrollView.props}
                contentContainerStyle={styles.mainView}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.logoContainer}>
                  <Logo
                    style={styles.logo}
                    width={heightPercentageToDP(9)}
                    height={heightPercentageToDP(9)}
                  />
                  <View style={styles.signTextContainer}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => this.changeActiveTab(0)}
                      disabled={this.props.emailLoading}
                      style={[
                        styles.tabView,
                        this.state.activeTab === 0 && styles.activeTabView,
                      ]}
                    >
                      <Text
                        style={[
                          styles.signText,
                          {
                            color:
                              this.state.activeTab === 0
                                ? "#FFF"
                                : "rgba(255,255,255,0.65)",
                          },
                        ]}
                      >
                        {translate("SIGN UP")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => this.changeActiveTab(1)}
                      disabled={this.props.emailLoading}
                      style={[
                        styles.tabView,
                        this.state.activeTab === 1 && styles.activeTabView,
                      ]}
                    >
                      <Text
                        style={[
                          styles.signText,
                          {
                            color:
                              this.state.activeTab === 1
                                ? "#FFF"
                                : "rgba(255,255,255,0.65)",
                          },
                        ]}
                      >
                        {translate("Sign in")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.heading}>
                  {this.state.activeTab === 0
                    ? translate("Create an Account")
                    : translate("Welcome Back !")}
                </Text>
                {this.state.activeTab === 0 && (
                  <InputField
                    // disabled={this.props.loadingUpdateInfo}
                    // customStyles={{ width: "100%", marginLeft: 0 }}
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
                )}
                {this.state.activeTab === 1 && (
                  <>
                    <InputField
                      // disabled={this.props.loadingUpdateInfo}
                      // customStyles={{ width: "100%", marginLeft: 0 }}
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
                      // customStyles={{ width: "100%", marginLeft: 0 }}
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
                  </>
                )}
                <GradientButton
                  text={
                    this.state.activeTab === 0
                      ? translate("Create Account")
                      : translate("Sign in")
                  }
                  uppercase
                  style={styles.gradientBtn}
                  textStyle={styles.gradientBtnText}
                  onPressAction={
                    this.state.activeTab === 0
                      ? this.createNewAccount
                      : this._handleSubmission
                  }
                />
                {this.state.activeTab === 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.push("ForgotPassword");
                    }}
                  >
                    <Text style={[styles.link, styles.forgotPasswordLink]}>
                      {translate("Forgot Password?")}
                    </Text>
                  </TouchableOpacity>
                )}
              </InputScrollView>
              <AppUpdateChecker screenProps={this.props.screenProps} />
              {(this.props.emailLoading || this.props.loading) && (
                <LoadingScreen dash={true} />
              )}
            </View>
          )}
        </SafeAreaView>
      );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loading: state.auth.loading,
  checkingForToken: state.login.checkingForToken,
  checkingForTokenError: state.login.checkingForTokenError,
  emailLoading: state.register.emailLoading,
});

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (email, userInfo, navigation) =>
    dispatch(actionCreators.verifyEmail(email, userInfo, navigation)),
  login: (userInfo, navigation) =>
    dispatch(actionCreators.login(userInfo, navigation)),
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  checkForExpiredToken: (navigation) =>
    dispatch(actionCreators.checkForExpiredToken(navigation)),
  set_adType: (value) => dispatch(actionCreators.set_adType(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
