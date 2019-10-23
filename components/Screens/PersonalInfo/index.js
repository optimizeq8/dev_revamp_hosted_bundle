import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  TouchableOpacity
} from "react-native";
import { Text, Item, Input, Label, Icon } from "native-base";
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
import PhoneNoField from "../Signup/PhoneNo/PhoneNoField";
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
    Segment.screenWithProperties("Personal Info", {
      category: "User Menu"
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  changePersonalNo = (number, countryCode, type, valid) => {
    if (number.toString().length > 3 && valid) {
      this.setState({
        phoneNum: number.split(countryCode)[1],
        countryCode: countryCode,
        valid,
        type
      });
    }
  };

  validator = () => {
    const firstnameError = validateWrapper("mandatory", this.state.firstname);
    const lastnameError = validateWrapper("mandatory", this.state.lastname);
    const emailError = validateWrapper("mandatory", this.state.email);
    this.setState({
      firstnameError,
      lastnameError,
      emailError
    });
    const { translate } = this.props.screenProps;

    if (firstnameError || lastnameError) {
      showMessage({
        type: "warning",
        message: translate(
          `Please provide a ${
            firstnameError
              ? "first name"
              : lastnameError
              ? "last name"
              : emailError && "email"
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
        this.state.lastname !== this.props.userInfo.lastname;
      if (changedInfo)
        this.props.updateUserInfo({
          // email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        });
      else
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Item
                        floatingLabel
                        style={[
                          styles.input,
                          { width: "45%" },
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
                          { width: "45%" },

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
                    {/* <Text style={styles.nameText}>
                      {this.props.userInfo.firstname}{" "}
                      {this.props.userInfo.lastname}
                    </Text> */}

                    <View
                      style={[styles.input, globalStyles.lightGrayBorderColor]}
                    >
                      <Label
                        style={[
                          styles.label,
                          styles.labelMobileNo,
                          {
                            // fontSize:
                            //   Platform.OS === "android"
                            //     ? 14 / PixelRatio.getFontScale()
                            //     : 14
                          }
                        ]}
                      >
                        {translate("Mobile No")}
                      </Label>
                      <PhoneNoField
                        screenProps={this.props.screenProps}
                        valid
                        disabled={true}
                        changeNo={this.changePersonalNo}
                        phoneNum={this.props.userInfo.mobile}
                      />
                    </View>

                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        globalStyles.lightGrayBorderColor,
                        { width: "100%" }
                      ]}
                    >
                      <Label style={[styles.label, styles.labelEmail]}>
                        {translate("Email")}
                      </Label>
                      <Input
                        disabled
                        style={[styles.inputText, { opacity: 0.5 }]}
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
  updateUserInfo: info => dispatch(actionCreators.updateUserInfo(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
