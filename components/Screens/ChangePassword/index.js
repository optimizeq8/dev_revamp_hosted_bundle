import React, { Component } from "react";
import { connect } from "react-redux";
import { BackHandler, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";
import analytics from "@segment/analytics-react-native";
import SafeAreaView from "react-native-safe-area-view";

import CustomHeader from "../../MiniComponents/Header";
import CheckMarkLoading from "../../MiniComponents/CheckMarkLoading";
import InputField from "../../MiniComponents/InputFieldNew";
import LowerButton from "../../MiniComponents/LowerButton";

//icons
import PasswordOutline from "../../../assets/SVGs/PasswordOutline";

// Style
import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";

class ChangePassword extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        currentPassword: "",
        password: "",
      },

      inputF: false,
      inputL: false,
      inputE: false,
      inputP: false,
      inputPR: false,

      repassword: "",
      currentPasswordError: "",
      passwordError: "",

      repasswordError: "",
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      false
    );
    analytics.track(`change_password`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidUpdate(prevProps) {}
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _passwordVarification = () => {
    const { translate } = this.props.screenProps;
    if (
      this.state.userInfo.password !== this.state.repassword ||
      this.state.repassword === ""
    ) {
      showMessage({
        type: "danger",
        message: translate("Your Passwords don't match"),
        position: "top",
      });
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
    const currentPasswordError = validateWrapper(
      "mandatory",
      this.state.userInfo.currentPassword
    );
    const passwordError = validateWrapper(
      "password",
      this.state.userInfo.password
    );

    this.setState({
      currentPasswordError,
      passwordError,
    });
    if (this._passwordVarification() && !this.state.passwordError) {
      this.props.changePassword(
        this.state.userInfo.currentPassword,
        this.state.userInfo.password,
        this.props.navigation,
        this.props.user.email
      );
    } else {
      analytics.track(`a_change_password`, {
        source: "change_password",
        source_action: "a_change_password",
        timestamp: new Date().getTime(),
        action_status: "failure",
        error_description:
          this.state.repasswordError || this.state.passwordError,
      });
    }
  };
  setValue = (stateName, value) => {
    if (stateName === "repassword") {
      let state = {};
      state[stateName] = value;
      this.setState({
        ...state,
      });
    } else {
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          [stateName]: value,
        },
      });
    }
  };
  getValidInfo = async (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;

    if (
      stateError === "passwordError" &&
      validObj &&
      validObj.includes("8 characters")
    ) {
      showMessage({
        type: "danger",
        message: this.props.screenProps.translate(validObj),
        position: "top",
      });
    }

    this.setState({
      ...state,
    });
  };
  feildsComponent = () => {
    const tempPassword = this.props.navigation.getParam("temp_pwd", false);
    const feilds = [
      {
        label: tempPassword ? "Current Password" : "Old Password",
        stateName1: "currentPassword",
        value: this.state.userInfo.currentPassword,
        valueError1: this.state.currentPasswordError,
        incomplete: true,
        icon: PasswordOutline,
      },
      {
        label: "New Password",
        stateName1: "password",
        value: this.state.userInfo.password,
        valueError1: this.state.passwordError,
        incomplete: true,
        icon: PasswordOutline,
      },
      {
        label: "Re-enter Password",
        stateName1: "repassword",
        value: this.state.repassword,
        valueError1: this.state.repasswordError,
        incomplete: true,
      },
    ].map((feild) => {
      return (
        <InputField
          icon={feild.icon}
          key={feild.label}
          label={feild.label}
          setValue={this.setValue}
          getValidInfo={this.getValidInfo}
          disabled={this.props.loading}
          stateName1={feild.stateName1}
          value={feild.value}
          valueError1={feild.valueError1}
          autoFocus={false}
          incomplete={feild.incomplete}
          translate={this.props.screenProps.translate}
          secureTextEntry={true}
        />
      );
    });
    return feilds;
  };
  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Change Password"}
          navigation={this.props.navigation}
          segment={{
            source: "change_password",
            source_action: "a_go_back",
          }}
        />

        <InputScrollView
          showsVerticalScrollIndicator={false}
          {...ScrollView.props}
          contentContainerStyle={styles.contentContainer}
        >
          {this.feildsComponent()}
          {this.props.loading ? (
            <CheckMarkLoading progress={this.props.progress} />
          ) : (
            <LowerButton
              screenProps={this.props.screenProps}
              checkmark={true}
              function={() => this._handleSubmission()}
              style={styles.button}
            />
          )}
        </InputScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changePassword: (currentPass, newPass, navigation, userEmail) =>
    dispatch(
      actionCreators.changePassword(currentPass, newPass, navigation, userEmail)
    ),
  logout: (navigation) => dispatch(actionCreators.logout(navigation)),
});

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  loading: state.account.loadingPasswordChanged,
  progress: state.account.progress,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
