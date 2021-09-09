import React, { Component } from "react";
import { View, BackHandler, ScrollView } from "react-native";
import analytics from "@segment/analytics-react-native";
import SafeAreaView from "react-native-safe-area-view";

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
      first_name: this.props.userInfo.first_name,
      last_name: this.props.userInfo.last_name,
      inputF: false,
      inputL: false,
      inputE: false,
      first_nameError: "",
      last_nameError: "",
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
    const countryCode = this.props.userInfo.mobile.substring(1, 4);

    this.setState({
      phoneNum: this.props.userInfo.mobile,
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
    analytics.track(`Screen Viewed`, {
      screen_name: "PersonalInfo",
      source,
      source_action,
      business_id: this.props.mainBusiness && this.props.mainBusiness.id,
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
    const first_nameError = validateWrapper("mandatory", this.state.first_name);
    const last_nameError = validateWrapper("mandatory", this.state.last_name);
    const emailErrorMandatory = validateWrapper("mandatory", this.state.email);
    const emailError = validateWrapper("email", this.state.email);

    this.setState({
      first_nameError,
      last_nameError,
      emailError,
      emailErrorMandatory,
    });
    const { translate } = this.props.screenProps;
    // validate all fields and shows error if any
    if (
      first_nameError ||
      last_nameError ||
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
                first_nameError
                  ? "first name"
                  : last_nameError
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
        this.state.first_name !== this.props.userInfo.first_name ||
        this.state.last_name !== this.props.userInfo.last_name ||
        this.state.phoneNum !== "+" + this.props.userInfo.mobile ||
        this.state.email !== this.props.userInfo.email;
      if (changedInfo) {
        const mobile = this.state.phoneNum;
        this.props.updateUserInfo(
          {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            mobile,
          },
          this.props.navigation
        );
      } else {
        analytics.track(`Form Error Made`, {
          form_type: "Personal Info Form",
          form_field: "a_update_personal_info",
          error_description: "No changes to update",
          business_id: this.props.mainBusiness && this.props.mainBusiness.id,
        });
        showMessage({
          type: "warning",
          message: translate("No changes to update"),
          position: "top",
        });
      }
    } else {
      analytics.track(`Form Error Made`, {
        form_type: "Personal Info Form",
        form_field: "a_update_personal_info",
        error_description: "Please complete required fields",
        business_id: this.props.mainBusiness && this.props.mainBusiness.id,
      });
    }
  };

  setValue = (stateName, value) => {
    let state = {};
    state[stateName] =
      stateName === "first_name" || stateName === "last_name"
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
        {/* <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        /> */}
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Personal Info"}
          navigation={this.props.navigation}
          segment={{
            source: "PersonalInfo",
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
              stateName1="first_name"
              stateName2="last_name"
              label="Full name"
              placeholder1="First Name"
              placeholder2="Last Name"
              value={this.state.first_name}
              value2={this.state.last_name}
              valueError1={this.state.first_nameError}
              valueError2={this.state.last_nameError}
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
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
