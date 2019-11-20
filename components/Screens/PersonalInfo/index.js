import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler
} from "react-native";
import { Item, Input, Label, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import CheckMarkLoading from "../../MiniComponents/CheckMarkLoading";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import CustomHeader from "../../MiniComponents/Header";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";

//icons
import PersonalInfoIcon from "../../../assets/SVGs/Person";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";
import PhoneNoField from "./PhoneInput";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
import LowerButton from "../../MiniComponents/LowerButton";

class PersonalInfo extends Component {
  static navigationOptions = {
    header: null
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
      emailError: ""
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
      countryCode: countryCode
    });
    Segment.screenWithProperties("Personal Info", {
      category: "User Menu"
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
      type
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
      emailErrorMandatory
    });
    const { translate } = this.props.screenProps;
    // validate all feilds and shows error if any
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
        )
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
            mobile
          },
          this.props.navigation
        );
      } else
        showMessage({
          type: "warning",
          message: translate("No changes to update"),
          position: "top"
        });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Personal Info"}
          navigation={this.props.navigation}
        />

        <PersonalInfoIcon
          style={styles.personalInfoIcon}
          width={55}
          height={55}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.mainCard}>
            <KeyboardShift>
              {() => (
                <View style={styles.contentContainer}>
                  <View style={styles.dataContainer}>
                    <View style={styles.fullNameView}>
                      <Item
                        floatingLabel
                        style={[
                          styles.input,
                          { width: "50%" },
                          this.state.inputF
                            ? globalStyles.purpleBorderColor
                            : this.state.firstnameError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
                        ]}
                      >
                        <Label style={[styles.label, styles.labelEmail]}>
                          {translate("First Name")}
                        </Label>
                        <Input
                          disabled={this.props.loadingUpdateInfo}
                          style={[styles.inputText]}
                          value={this.state.firstname}
                          onBlur={() => {
                            this.validator();
                            this.setState({
                              inputF: false
                            });
                          }}
                          onFocus={() => this.setState({ inputF: true })}
                          onChangeText={firstname =>
                            this.setState({ firstname })
                          }
                        />
                      </Item>
                      <Item
                        floatingLabel
                        style={[
                          styles.input,
                          { width: "50%" },

                          this.state.inputL
                            ? globalStyles.purpleBorderColor
                            : this.state.lastnameError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
                        ]}
                      >
                        <Label style={[styles.label, styles.labelEmail]}>
                          {translate("Last Name")}
                        </Label>
                        <Input
                          disabled={this.props.loadingUpdateInfo}
                          style={[styles.inputText]}
                          value={this.state.lastname}
                          onBlur={() => {
                            this.validator();
                            this.setState({ inputL: false });
                          }}
                          onFocus={() => this.setState({ inputL: true })}
                          onChangeText={lastname => this.setState({ lastname })}
                        />
                      </Item>
                    </View>
                    <View style={styles.mobileView}>
                      <Label style={[styles.label, styles.labelMobileNo]}>
                        {translate("Mobile No")}
                      </Label>
                      <PhoneNoField
                        disabled={this.props.loadingUpdateInfo}
                        screenProps={this.props.screenProps}
                        valid={this.state.valid}
                        changeNo={this.changePersonalNo}
                        phoneNum={this.state.phoneNum}
                      />
                    </View>

                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        globalStyles.lightGrayBorderColor,
                        styles.emailItem
                      ]}
                    >
                      <Label style={[styles.label, styles.labelEmail]}>
                        {translate("Email")}
                      </Label>
                      <Input
                        disabled={this.props.loadingUpdateInfo}
                        autoCapitalize={"none"}
                        style={[styles.inputText]}
                        value={this.state.email}
                        onBlur={() => this.validator()}
                        onChangeText={email => this.setState({ email })}
                      />
                    </Item>
                  </View>

                  {this.props.loadingUpdateInfo ? (
                    <CheckMarkLoading
                      style={{ top: "100%", width: 60, height: 60 }}
                    />
                  ) : (
                    <LowerButton
                      checkmark
                      bottom={-20}
                      function={this._handleSubmission}
                    />
                  )}
                </View>
              )}
            </KeyboardShift>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loadingUpdateInfo: state.auth.loadingUpdateInfo
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
