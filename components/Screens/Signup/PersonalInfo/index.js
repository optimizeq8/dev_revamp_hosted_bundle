import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, I18nManager, Text } from "react-native";
import { Item, Input, Container } from "native-base";
import * as Segment from "expo-analytics-segment";

import LowerButton from "../../../MiniComponents/LowerButton";
import InputFeild from "../../../MiniComponents/InputFieldNew";
import PhoneNoField from "../PhoneNo/PhoneNoFieldNew";
import BusinessAccount from "../../CreateBusinessAccount";
import GradientButton from "../../../MiniComponents/GradientButton";
import InputScrollView from "react-native-input-scroll-view";
import { openPrivacy, openTerms } from "../../../Terms&Conditions";

//icons
import UserProfile from "../../../../assets/SVGs/UserProfile";
import EmailIcon from "../../../../assets/SVGs/EmailOutline";
import PasswordIcon from "../../../../assets/SVGs/PasswordOutline";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { showMessage } from "react-native-flash-message";

import isEmpty from "lodash/isEmpty";
class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: this.props.mobileNo,
        country_code: this.props.countryCode,
        password: "",
        v: this.props.tempId,
      },
      businessAccount: {
        businessname: "",
        businesscategory: "",
        country: "",
        otherBusinessCategory: null,
        // businesstype: "1",
        // businessemail: "",
        // brandname: "",
        // websitelink: "",
        // appstorelink: {
        //   app_name: "",
        //   ios_app_id: "",
        //   icon_media_url: ""
        // },
        // playstorelink: {
        //   app_name: "",
        //   icon_media_url: "",
        //   android_app_url: ""
        // }
      },
      inputF: false,
      inputL: false,
      inputE: false,
      inputP: false,
      inputPR: false,
      inputC: false, // For country modal,
      inputT: false, // For business category
      valid: false,
      repassword: "",
      emailError: "",
      passwordError: "",
      lastnameError: "",
      firstnameError: "",
      repasswordError: "",
      businesscategoryError: null,
      businessnameError: null,
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this._passwordVarification = this._passwordVarification.bind(this);
  }
  componentDidMount() {
    Segment.screenWithProperties("Registration Detail Screen", {
      category: "Sign Up",
    });
    if (this.props.userInfo) {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          ...this.props.userInfo,
        },
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.tempUserInfo && this.props.tempUserInfo) {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          firstname: this.props.tempUserInfo.firstname,
          lastname: this.props.tempUserInfo.lastname,
          email: this.props.tempUserInfo.email,
          v: this.props.tempId,
        },
      });
    }
  }
  setValue = (stateName, value) => {
    let state = {};
    state[stateName] =
      stateName === "firstname" || stateName === "lastname"
        ? value.replace(/[^a-z\u0621-\u064A]/gi, "")
        : value;
    let userInfo = {
      ...this.state.userInfo,
      ...state,
    };
    this.setState({ userInfo });
  };

  getValidInfo = (stateError, validWrap) => {
    let state = {};
    state[stateError] = validWrap;
    this.setState({
      ...state,
    });
  };
  _passwordVarification = () => {
    if (
      this.state.userInfo.password !== this.state.repassword ||
      this.state.repassword === ""
    ) {
      this.setState({ repasswordError: "Your Passwords don't match" });
      return false;
    } else if (
      this.state.userInfo.password === this.state.repassword &&
      this.state.repassword !== ""
    ) {
      this.setState({ repasswordError: "" });
      return true;
    }
  };
  changePersonalNo = (number, countryCode, type, valid) => {
    let userInfo = {
      ...this.state.userInfo,
      mobile: number,
      country_code: countryCode,
    };
    // if (number.toString().length > 3 && valid) {
    this.setState({
      // phoneNum: number.toString().length > 3 && valid ? number.split(countryCode)[1] : number,
      userInfo,
      valid,
      type,
    });
    // }
  };
  _handleSubmission = async () => {
    const { translate } = this.props.screenProps;
    // Need to validate all fields again here since for the input feild component the error value is set to null after animation is over
    const passwordError = validateWrapper(
      "password",
      this.state.userInfo.password
    );
    const emailError = validateWrapper("email", this.state.userInfo.email);
    const firstnameError = validateWrapper(
      "mandatory",
      this.state.userInfo.firstname
    );
    const lastnameError = validateWrapper(
      "mandatory",
      this.state.userInfo.lastname
    );
    const businessnameError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businessname
    );

    const businesscategoryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businesscategory
    );
    const countryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.country
    );

    const businesscategoryOtherError =
      this.state.businessAccount.businesscategory === "43" &&
      validateWrapper(
        "mandatory",
        this.state.businessAccount.otherBusinessCategory
      );

    this.setState({
      passwordError,
      emailError,
      firstnameError,
      lastnameError,
      businessnameError,
      businesscategoryError,
      businesscategoryOtherError,
      countryError,
    });
    if (businessnameError) {
      showMessage({
        message: translate("Enter your business name"),
        type: "warning",
      });
    }
    if (businesscategoryError) {
      showMessage({
        message: translate(businesscategoryError),
        type: "warning",
      });
    }
    if (businesscategoryOtherError) {
      showMessage({
        message: translate(businesscategoryOtherError),
        type: "warning",
      });
    }
    if (this.props.businessInvite !== "0" && countryError) {
      showMessage({
        message: translate("Please choose a country"),
        type: "warning",
      });
    }
    if (passwordError) {
      showMessage({
        message: translate(passwordError),
        type: "warning",
      });
    }
    if (emailError) {
      showMessage({
        message: translate(emailError),
        type: "warning",
      });
    }
    if (firstnameError) {
      showMessage({
        message: translate(firstnameError),
        type: "warning",
      });
    }
    if (lastnameError) {
      showMessage({
        message: translate(lastnameError),
        type: "warning",
      });
    }
    if (!this.state.valid) {
      showMessage({
        message: translate("Please enter a valid number!"),
        type: "warning",
      });
    }
    // For non invited user
    if (
      this.props.businessInvite !== "0" &&
      this._passwordVarification() &&
      !firstnameError &&
      !lastnameError &&
      !emailError &&
      !passwordError &&
      !businessnameError &&
      !businesscategoryError &&
      !businesscategoryOtherError &&
      !countryError &&
      this.state.valid // condition for mobile no
    ) {
      const mobile = this.state.userInfo.mobile.substring(
        4,
        this.state.userInfo.mobile
      );
      let userInfo = {
        ...this.state.userInfo,
        mobile,
      };

      const info = {
        ...userInfo,
        ...this.state.businessAccount,
      };
      this.props.registerGuestUser(
        info,
        this.props.businessInvite,
        this.props.navigation
      );
    }
    // For invited users
    else if (
      this.props.businessInvite === "0" &&
      this._passwordVarification() &&
      !firstnameError &&
      !lastnameError &&
      !emailError &&
      !passwordError &&
      this.state.valid // condition for mobile no
    ) {
      const mobile = this.state.userInfo.mobile.substring(
        4,
        this.state.userInfo.mobile
      );
      let userInfo = {
        ...this.state.userInfo,
        mobile,
      };

      const info = {
        ...userInfo,
      };
      this.props.registerGuestUser(
        info,
        this.props.businessInvite,
        this.props.navigation
      );
    }
  };
  focusTheField = (fieldName) => {
    this.inputs[fieldName]._root.focus();
  };
  inputs = {};

  // Set value for business accounts detail

  setValueBusiness = (stateName, value) => {
    let state = {};
    state[stateName] =
      stateName === "businessname"
        ? value.replace(/[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi, "")
        : value;

    let businessAccount = {
      ...this.state.businessAccount,
      ...state,
    };
    this.setState({ businessAccount });
  };

  getValidInfoBusiness = (stateError, validWrap) => {
    let state = {};
    if (stateError === "businessnameError") {
      this._verifyBusinessName(this.state.businessAccount.businessname, false);
    }

    state[stateError] = validWrap;
    this.setState({
      ...state,
    });
  };
  _handleBusinessName = (value) => {
    this.setState({
      businessnameAvalible: value,
      checkingBusinessNameSubmission: false,
    });
  };
  _verifyBusinessName = async (name, submision) => {
    if (name !== "") {
      if (submision) this.setState({ checkingBusinessNameSubmission: true });
      await this.props.verifyBusinessName(
        name,
        this._handleBusinessName,
        submision
      );
      return this.props.successName;
    }
  };

  // HANDLE business category STARTS HERE

  _handleBusinessCategories = (type) => {
    this.setState({
      businessAccount: {
        ...this.state.businessAccount,
        businesstype: type,
      },
    });
  };

  onSelectedBusinessCategoryIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCategoryModal = () => {
    this.setState({
      businesscategoryError: validateWrapper(
        "mandatory",
        this.state.businessAccount.businesscategory
      ),
      inputT: false,
    });
  };

  onSelectedBusinessCategoryChange = (value) => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          businessAccount: {
            ...this.state.businessAccount,
            businesscategory: value[0].value,
          },
        },
        () => {
          this.closeCategoryModal();
        }
      );
    }
  };
  openCategoryModal = () => {
    this.setState({ inputT: true });
  };

  // HANDLE business category ENDS HERE

  // --COUNTRY HANDLE FOR BUSINESS STARTS HERE--

  onSelectedCountryIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("country", value);
  };
  closeCountryModal = () => {
    this.setState({
      countryError: validateWrapper(
        "mandatory",
        this.state.businessAccount.country
      ),
      inputC: false,
    });
  };
  openCountryModal = () => {
    this.setState({ inputC: true });
  };
  onSelectedCountryChange = (value) => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          businessAccount: {
            ...this.state.businessAccount,
            country: value[0].value,
          },
        },
        () => {
          this.closeCountryModal();
        }
      );
    }
  };
  // --COUNTRY HANDLE FOR BUSINESS ENDS HERE--
  render() {
    const { translate } = this.props.screenProps;
    return (
      <InputScrollView
        {...ScrollView.props}
        contentContainerStyle={[
          {
            paddingBottom: "55%",
            paddingTop: 20,
            paddingHorizontal: 26,
          },
        ]}
      >
        {this.props.businessInvite !== "0" && (
          <BusinessAccount
            businessAccount={this.state.businessAccount}
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            registering={true}
            setValue={this.setValueBusiness}
            getValidInfo={this.getValidInfoBusiness}
            _handleBusinessCategories={this._handleBusinessCategories}
            onSelectedBusinessCategoryIdChange={
              this.onSelectedBusinessCategoryIdChange
            }
            closeCategoryModal={this.closeCategoryModal}
            onSelectedBusinessCategoryChange={
              this.onSelectedBusinessCategoryChange
            }
            businesscategoryError={this.state.businesscategoryError}
            openCategoryModal={this.openCategoryModal}
            inputT={this.state.inputT}
            onSelectedCountryIdChange={this.onSelectedCountryIdChange}
            closeCountryModal={this.closeCountryModal}
            onSelectedCountryChange={this.onSelectedCountryChange}
            openCountryModal={this.openCountryModal}
            inputC={this.state.inputC}
          />
        )}
        <View style={styles.subHeadView}>
          <UserProfile fill="#FFF" stroke={"#FFF"} />
          <Text style={styles.subHeading}>{translate("Personal Details")}</Text>
        </View>
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
          value={this.state.userInfo.firstname}
          value2={this.state.userInfo.lastname}
          valueError1={this.state.firstnameError}
          valueError2={this.state.lastnameError}
          icon={UserProfile}
          disabled={this.props.loadingUpdateInfo}
          maxLength={30}
        />
        <InputFeild
          // disabled={this.props.loadingUpdateInfo}
          // customStyles={{ width: "100%", marginLeft: 0 }}
          incomplete={false}
          translate={this.props.screenProps.translate}
          stateName1="email"
          label="Email"
          placeholder1="Enter your email"
          value={this.state.userInfo.email}
          valueError1={this.state.emailError}
          icon={EmailIcon}
          setValue={this.setValue}
          getValidInfo={this.getValidInfo}
          key={"Email"}
        />
        {this.state.emailError && this.state.emailError !== "" ? (
          <Text style={[styles.text, styles.emailErrorText]}>
            {translate(this.state.emailError)}
          </Text>
        ) : null}

        <PhoneNoField
          disabled={this.props.loadingUpdateInfo}
          screenProps={this.props.screenProps}
          valid={this.state.valid}
          changeNo={this.changePersonalNo}
          phoneNum={this.state.userInfo.mobile}
          label={"Mobile No"}
        />

        <InputFeild
          // disabled={this.props.loadingUpdateInfo}
          incomplete={false}
          translate={this.props.screenProps.translate}
          stateName1="password"
          label="Password"
          placeholder1="Enter your password"
          value={this.state.userInfo.password}
          valueError1={this.state.passwordError}
          icon={PasswordIcon}
          setValue={this.setValue}
          getValidInfo={this.getValidInfo}
          key={"password"}
          secureTextEntry={true}
        />

        <Item
          style={[
            styles.input,
            this.state.inputPR
              ? globalStyles.purpleBorderColor
              : this.state.repasswordError !== ""
              ? globalStyles.redBorderColor
              : globalStyles.transparentBorderColor,
            // styles.repeatPassword
          ]}
        >
          <PasswordIcon
            style={[styles.iconSize]}
            fill={this.state.inputPR ? "#FF9D00" : "#FFF"}
          />
          <View style={styles.colView}>
            <Text
              style={[
                styles.inputLabel,
                this.state.inputPR
                  ? globalStyles.orangeTextColor
                  : globalStyles.whiteTextColor,
              ]}
            >
              {translate("Re-enter Password")}
            </Text>
            <Input
              ref={(input) => {
                this.inputs["inputPR"] = input;
              }}
              blurOnSubmit={true}
              returnKeyType={"done"}
              style={styles.inputText}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(value) => this.setState({ repassword: value })}
              onFocus={() => {
                this.setState({ inputPR: true });
              }}
              onBlur={() => {
                this.setState({ inputPR: false });
                this._passwordVarification();
              }}
            />
          </View>
        </Item>
        <Text style={styles.textAgreement}>
          <Text style={[styles.link, styles.buttonLink]}>
            {translate(`By tapping the button below you agree to all the`) +
              " "}
            <Text
              onPress={() => openTerms()}
              style={[styles.link, styles.tNcLink]}
            >
              {translate(`Terms & Conditions`)}
            </Text>{" "}
            {translate(`mentioned in this`) + " "}
            <Text
              onPress={() => openPrivacy()}
              style={[styles.link, styles.tNcLink, styles.agreementLink]}
            >
              {translate(`agreement`)}
            </Text>
          </Text>
        </Text>
        {this.state.repasswordError !== "" &&
        this.state.userInfo.password !== "" ? (
          <Text style={[styles.text, styles.repasswordErrorText]}>
            {translate(this.state.repasswordError)}
          </Text>
        ) : null}
        <GradientButton
          uppercase
          style={styles.submitButton}
          text={translate("Create Account")}
          onPressAction={this._handleSubmission}
        />
      </InputScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  mobileNo: state.register.mobileNo,
  countryCode: state.register.countryCode,
  tempUserInfo: state.account.tempUserInfo,
  successEmail: state.register.successEmail,
  userInfo: state.register.userInfo,
  successName: state.register.successName,
});

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (email, userInfo, businessInvite, navigation) =>
    dispatch(
      actionCreators.verifyEmail(email, userInfo, businessInvite, navigation)
    ),
  registerGuestUser: (userInfo, businessInvite, navigation) =>
    dispatch(
      actionCreators.registerGuestUser(userInfo, businessInvite, navigation)
    ),
  verifyBusinessName: (businessName, _handleBusinessName, submision) =>
    dispatch(
      actionCreators.verifyBusinessName(
        businessName,
        _handleBusinessName,
        submision
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
