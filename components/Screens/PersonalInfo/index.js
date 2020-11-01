import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import InputScrollView from "react-native-input-scroll-view";
import CheckMarkLoading from "../../MiniComponents/CheckMarkLoading";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import CustomHeader from "../../MiniComponents/Header";

//icons
import EmailTransparentIcon from "../../../assets/SVGs/EmailTransparent";
import PersonTransparentIcon from "../../../assets/SVGs/MenuIcons/PersonTransparent";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";
// import PhoneNoField from "./PhoneInput";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
import LowerButton from "../../MiniComponents/LowerButton";
import InputFeild from "../../MiniComponents/InputFieldNew";
import PhoneNoField from "../Signup/PhoneNo/PhoneNoFieldNew";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";

class PersonalInfo extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: "",
      countryCode: "",
      valid: false,
      type: "",
      email: this.props.userInfo.email,
      firstname: this.props.userInfo.firstname,
      lastname: this.props.userInfo.lastname,
      inputF: false,
      inputL: false,
      inputE: false,
      firstnameError: "",
      lastnameError: "",
      emailError: "",
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    const countryCode = this.props.userInfo.mobile.substring(0, 3);
    this.setState({
      phoneNum: "+" + this.props.userInfo.mobile,
      valid: true,
      countryCode: countryCode,
    });
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_personal_details`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  changePersonalNo = (number, countryCode, type, valid) => {
    // if (number.toString().length > 3 && valid) {
    this.setState({
      // phoneNum: number.toString().length > 3 && valid ? number.split(countryCode)[1] : number,
      phoneNum: number,
      countryCode: countryCode,
      valid,
      type,
    });
    // }
  };

  validator = () => {
    const firstnameError = validateWrapper("mandatory", this.state.firstname);
    const lastnameError = validateWrapper("mandatory", this.state.lastname);
    const emailErrorMandatory = validateWrapper("mandatory", this.state.email);
    const emailError = validateWrapper("email", this.state.email);

    this.setState({
      firstnameError,
      lastnameError,
      emailError,
      emailErrorMandatory,
    });
    const { translate } = this.props.screenProps;
    // validate all fields and shows error if any
    if (
      firstnameError ||
      lastnameError ||
      emailError ||
      emailErrorMandatory ||
      !this.state.valid
    ) {
      showMessage({
        type: "warning",
        message: translate(
          !this.state.valid
            ? "Please enter a valid number!"
            : `Please provide a ${
                firstnameError
                  ? "first name"
                  : lastnameError
                  ? "last name"
                  : (emailError || emailErrorMandatory) && "email"
              }`
        ),
      });
      return false;
    } else return true;
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    if (this.validator()) {
      const changedInfo =
        this.state.firstname !== this.props.userInfo.firstname ||
        this.state.lastname !== this.props.userInfo.lastname ||
        this.state.phoneNum !== "+" + this.props.userInfo.mobile ||
        this.state.email !== this.props.userInfo.email;
      if (changedInfo) {
        const country_code = this.state.phoneNum.substring(1, 4);
        const mobile = this.state.phoneNum.substring(4, this.state.phoneNum);
        this.props.updateUserInfo(
          {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            country_code,
            mobile,
          },
          this.props.navigation
        );
      } else {
        analytics.track(`a_update_personal_info`, {
          source: "open_personal_details",
          source_action: "a_update_personal_info",
          action_status: "failure",
          error_description: "No changes to update",
        });
        showMessage({
          type: "warning",
          message: translate("No changes to update"),
          position: "top",
        });
      }
    } else {
      analytics.track(`a_update_personal_info`, {
        source: "open_personal_details",
        source_action: "a_update_personal_info",
        action_status: "failure",
        error_description: "Please complete required fields",
      });
    }
  };

  setValue = (stateName, value) => {
    let state = {};
    state[stateName] =
      stateName === "firstname" || stateName === "lastname"
        ? value.replace(/[^a-z\u0621-\u064A]/gi, "")
        : value;
    this.setState({ ...state });
  };

  getValidInfo = (stateError, validWrap) => {
    let state = {};
    state[stateError] = validWrap;
    this.setState({
      ...state,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
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
          title={"Personal Info"}
          navigation={this.props.navigation}
          segment={{
            source: "open_personal_details",
            source_action: "a_go_back",
          }}
        />
        <View style={styles.mainCard}>
          <InputScrollView
            showsVerticalScrollIndicator={false}
            {...ScrollView.props}
            contentContainerStyle={[styles.businessView]}
          >
            <InputFeild
              key={"Full Name"}
              getValidInfo={this.getValidInfo}
              setValue={this.setValue}
              incomplete={false}
              translate={this.props.screenProps.translate}
              stateName1="firstname"
              stateName2="lastname"
              label="Full name"
              placeholder1="First Name"
              placeholder2="Last Name"
              value={this.state.firstname}
              value2={this.state.lastname}
              valueError1={this.state.firstnameError}
              valueError2={this.state.lastnameError}
              icon={PersonTransparentIcon}
              disabled={this.props.loadingUpdateInfo}
              maxLength={30}
            />
            <InputFeild
              disabled={this.props.loadingUpdateInfo}
              incomplete={false}
              translate={this.props.screenProps.translate}
              stateName1="email"
              label="Email"
              placeholder1="Enter their email"
              value={this.state.email}
              valueError1={this.state.emailError}
              icon={EmailTransparentIcon}
              setValue={this.setValue}
              getValidInfo={this.getValidInfo}
              key={"Email"}
            />
            <View style={styles.marginVertical}>
              <PhoneNoField
                disabled={this.props.loadingUpdateInfo}
                screenProps={this.props.screenProps}
                valid={this.state.valid}
                changeNo={this.changePersonalNo}
                phoneNum={this.state.phoneNum}
                label={"Mobile No"}
              />
            </View>
            {this.props.loadingUpdateInfo ? (
              <CheckMarkLoading
                style={{ top: "100%", width: 60, height: 60 }}
              />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                checkmark
                bottom={-10}
                function={this._handleSubmission}
              />
            )}
          </InputScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loadingUpdateInfo: state.auth.loadingUpdateInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
