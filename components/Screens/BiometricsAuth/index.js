import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import ReactNativeBiometrics from "react-native-biometrics";
import Toggle from "../../MiniComponents/Toggle";
import { connect } from "react-redux";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { colors } from "../../GradiantColors/colors";
import CustomHeader from "../../MiniComponents/Header";
import styles from "./styles";
import { Icon } from "native-base";
import FaceID from "../../../assets/SVGs/FaceID.svg";
import GradientButton from "../../MiniComponents/GradientButton";
import PasswordIcon from "../../../assets/SVGs/PasswordOutline";
import InputField from "../../MiniComponents/InputFieldNew";
import AsyncStorage from "@react-native-community/async-storage";
import * as actionCreators from "../../../store/actions";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Loading from "../../MiniComponents/LoadingScreen";
import analytics from "@segment/analytics-react-native";

class BiometricsAuth extends Component {
  state = {
    biometryType: "",
    biometricsEnabled: false,
    showPasswordField: false,
    password: "",
    passwordError: "",
    userConnectedBiometrics: [],
  };
  componentDidMount() {
    analytics.track("Screen Viewed", {
      screen_name: "SecureAccount",
      source: "Menu",
    });
    ReactNativeBiometrics.isSensorAvailable().then(async (type) => {
      let userConnectedBiometrics = await SecureStore.getItemAsync(
        "accountsSecured",
        {
          keychainService: Platform.OS === "ios" ? "kSecAttrService" : "Alias",
        }
      );
      userConnectedBiometrics = JSON.parse(userConnectedBiometrics);
      if (userConnectedBiometrics) {
        let biometricsEnabled = userConnectedBiometrics.find(
          (acc) => acc.username === this.props.userInfo.email
        );
        this.setState({
          biometricsEnabled: biometricsEnabled,
          userConnectedBiometrics,
        });
      }
      if (type.available) {
        this.setState({ biometryType: type.biometryType });
      }
    });
  }
  handleToggle = () => {
    analytics.track("Button Pressed", {
      button_type: `Toggle ${
        !this.state.biometricsEnabled ? "On" : "Off"
      } Biometrics`,
      button_content: !this.state.biometricsEnabled ? "On" : "Off",
      source: "SecureAccount",
    });
    if (!this.state.biometricsEnabled) {
      this.setState({ showPasswordField: true });
    } else
      ReactNativeBiometrics.simplePrompt({ promptMessage: "Autorize" }).then(
        (action) => {
          if (action.success) {
            this.setState({ biometricsEnabled: !this.state.biometricsEnabled });
            if (!this.state.biometricsEnabled) {
              let newUserConnectedBiometrics =
                this.state.userConnectedBiometrics;
              newUserConnectedBiometrics = newUserConnectedBiometrics.filter(
                (acc) => acc.username !== this.props.userInfo.email
              );
              if (newUserConnectedBiometrics.length === 0) {
                SecureStore.deleteItemAsync("accountsSecured", {
                  keychainService:
                    Platform.OS === "ios" ? "kSecAttrService" : "Alias",
                });
              } else
                SecureStore.setItemAsync(
                  "accountsSecured",
                  JSON.stringify(newUserConnectedBiometrics),
                  {
                    keychainService:
                      Platform.OS === "ios" ? "kSecAttrService" : "Alias",
                  }
                );
            }
          } else {
            showMessage({ message: "Action not autorized", type: "danger" });
          }
        }
      );
  };
  handlePasswordField = () => {
    this.setState({ showPasswordField: true });
  };
  handleAd;
  setValue = (stateName, value) => {
    analytics.track("Form Populated", {
      form_type: "Biometrics Form",
      form_field: "user_password",
    });
    this.setState({ [stateName]: value });
  };
  getValidInfo = (stateError, validWrap) => {
    let state = {};
    state[stateError] = validWrap;
    this.setState({
      ...state,
    });
  };
  handleAddingAccount = () => {
    let { translate } = this.props.screenProps;
    analytics.track("Button Pressed", {
      button_type: `Secure Account With Biometrics`,
      button_content: this.state.showPasswordField
        ? translate("Continue")
        : translate("Enable"),
      source: "SecureAccount",
    });
    this.props.checkPassword(
      {
        email: this.props.userInfo.email,
        password: this.state.password,
      },
      this.refs.modalFlash,
      this.handleDismissingBiometricModal,
      this.props.screenProps.translate
    );
  };
  handleDismissingBiometricModal = () => {
    analytics.track("Button Pressed", {
      button_type: this.props.showingInModal
        ? "Ignore Biometrics Modal"
        : "Enable Biometrics",
      button_content: this.props.showingInModal ? "Not Now" : "",
      source: "SecureAccount",
    });
    AsyncStorage.setItem("ignoreBiometricModal", "true");
    if (this.props.showingInModal) this.props.closeBiometricsModal();
    else {
      this.setState({ showPasswordField: false, biometricsEnabled: true });
    }
  };
  render() {
    let { showingInModal, closeBiometricsModal, screenProps } = this.props;
    let { showPasswordField, biometricsEnabled, biometryType } = this.state;
    let { translate } = screenProps;
    return (
      <View
        style={[
          styles.safeAreaViewContainer,
          !showingInModal ? { backgroundColor: globalColors.purple } : {},
        ]}
      >
        <SafeAreaView
          forceInset={{ bottom: "never", top: "always" }}
        ></SafeAreaView>
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Secure Account"}
          navigation={this.props.navigation}
          actionButton={() => closeBiometricsModal()}
          segment={{
            source: "SecureAccount",
            source_action: "a_go_back",
          }}
          hideButton={showingInModal}
        />
        <View
          style={[
            styles.titleContainer,
            showingInModal && { justifyContent: "center", height: "80%" },
          ]}
        >
          {this.state.biometryType === "FaceID" ? (
            <FaceID fill={globalColors.white} style={styles.icon} />
          ) : (
            <Icon
              name={"fingerprint"}
              type="MaterialCommunityIcons"
              style={{ fontSize: 50, color: "#fff" }}
            />
          )}
          <Text style={styles.title}>{translate(`Secure your account`)}</Text>

          <Text style={styles.description} numberOfLines={2}>
            {biometricsEnabled
              ? translate(`Your account has been secured using`) +
                " " +
                translate(biometryType)
              : translate(
                  `Would you like to enable ${biometryType} with this account`
                )}
          </Text>
          {showPasswordField && (
            <InputField
              // disabled={this.props.loadingUpdateInfo}
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
              key={"password"}
              secureTextEntry={true}
              customStyles={{ width: "70%" }}
              autoFocus
            />
          )}
          {showingInModal ? (
            <>
              <GradientButton
                uppercase
                text={
                  showPasswordField
                    ? translate("Continue")
                    : translate("Enable")
                }
                onPressAction={
                  showPasswordField
                    ? this.handleAddingAccount
                    : this.handlePasswordField
                }
                style={styles.gradientButton}
              />
              <GradientButton
                uppercase
                transparent
                text={translate("Not now")}
                onPressAction={this.handleDismissingBiometricModal}
                style={[styles.gradientButton, styles.gradientButtonBorder]}
              />
            </>
          ) : (
            <View style={styles.toggleConatiner}>
              <Text style={styles.toggleText}>
                {translate("Sign in")}:{"\n" + this.props.userInfo.email}
              </Text>
              <Toggle
                onPress={this.handleToggle}
                switchOn={!!biometricsEnabled}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                duration={500}
                circleStyle={styles.toggleCircle}
                containerStyle={styles.toggleStyle}
                buttonText={!!biometricsEnabled ? "On" : "Off"}
                buttonTextStyle={styles.switchButtonText}
                containerStyle={styles.toggleStyle}
                circleStyle={styles.switchCircle}
                circleColorOff="#FF9D00"
                circleColorOn="#66D072"
              />
            </View>
          )}
          {!showingInModal && showPasswordField && (
            <GradientButton
              uppercase
              text={
                showPasswordField ? translate("Continue") : translate("Enable")
              }
              onPressAction={
                showPasswordField
                  ? this.handleAddingAccount
                  : this.handlePasswordField
              }
              style={[
                styles.gradientButton,
                { height: "6%", marginVertical: 20 },
              ]}
            />
          )}
        </View>
        <FlashMessage ref="modalFlash" position="top" floating />
        {this.props.checkingPassword && <Loading dash />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loading: state.auth.loading,
  checkingForToken: state.login.checkingForToken,
  passwordValid: state.login.passwordValid,
  checkingPassword: state.login.checkingPassword,
});
const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (email, userInfo, navigation) =>
    dispatch(actionCreators.verifyEmail(email, userInfo, navigation)),
  checkPassword: (
    userInfo,
    modalFlash,
    handleDismissingBiometricModal,
    translate
  ) =>
    dispatch(
      actionCreators.checkPassword(
        userInfo,
        modalFlash,
        handleDismissingBiometricModal,
        translate
      )
    ),
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  checkForExpiredToken: (navigation) =>
    dispatch(actionCreators.checkForExpiredToken(navigation)),
  set_adType: (value) => dispatch(actionCreators.set_adType(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BiometricsAuth);
