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
import * as actionCreators from "../../../store/actions";

//Redux
import { connect } from "react-redux";

import Header from "../../MiniComponents/Header";
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
      inputP: false,
      inputPR: false,

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
    if (firstnameError || lastnameError || emailError) {
      showMessage({
        type: "warning",
        message: `Please provide a(n) ${
          firstnameError
            ? "first name"
            : lastnameError
            ? "last name"
            : emailError && "email"
        }`
      });
      return false;
    } else return true;
  };

  _handleSubmission = () => {
    if (this.validator()) {
      this.props.updateUserInfo();
    }
  };
  render() {
    console.log("STATE", this.state);

    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Header title={"Personal Info"} navigation={this.props.navigation} />

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
                    {/* <Text style={styles.label}>Full Name</Text> */}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                      }}
                    >
                      <Item
                        floatingLabel
                        style={[
                          styles.input,
                          { width: "45%" },
                          this.state.inputP
                            ? globalStyles.purpleBorderColor
                            : this.state.passwordError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
                        ]}
                      >
                        <Label style={[styles.label, styles.labelEmail]}>
                          First Name
                        </Label>
                        <Input
                          style={[styles.inputText]}
                          value={this.state.firstname}
                          onBlur={() => this.validator()}
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

                          this.state.inputP
                            ? globalStyles.purpleBorderColor
                            : this.state.passwordError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
                        ]}
                      >
                        <Label style={[styles.label, styles.labelEmail]}>
                          Last Name
                        </Label>
                        <Input
                          style={[styles.inputText]}
                          value={this.state.lastname}
                          onBlur={() => this.validator()}
                          onChangeText={lastname => this.setState({ lastname })}
                        />
                      </Item>
                    </View>
                    {/* <Text style={styles.nameText}>
                      {this.props.userInfo.firstname}{" "}
                      {this.props.userInfo.lastname}
                    </Text> */}

                    <View
                      style={[
                        styles.input,
                        this.state.inputPR
                          ? globalStyles.purpleBorderColor
                          : this.state.repasswordError !== ""
                          ? globalStyles.redBorderColor
                          : globalStyles.lightGrayBorderColor
                      ]}
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
                        Mobile No.
                      </Label>
                      <PhoneNoField
                        disabled={true}
                        changeNo={this.changePersonalNo}
                        phoneNum={this.props.userInfo.mobile}
                      />
                      {/* <Input
                        disabled
                        style={styles.inputText}
                        value={`${this.props.userInfo.mobile}`}
                      /> */}
                    </View>

                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        this.state.inputP
                          ? globalStyles.purpleBorderColor
                          : this.state.passwordError
                          ? globalStyles.redBorderColor
                          : globalStyles.lightGrayBorderColor
                      ]}
                    >
                      <Label style={[styles.label, styles.labelEmail]}>
                        E-Mail
                      </Label>
                      <Input
                        style={[styles.inputText]}
                        value={this.state.email}
                        onBlur={() => this.validator()}
                        onChangeText={email => this.setState({ email })}
                      />
                    </Item>
                  </View>
                  {/* 
                  <TouchableOpacity
                    onPress={() => this._handleSubmission()}
                    style={styles.button}
                  > */}
                  <LowerButton bottom={-20} function={this._handleSubmission} />
                  {/* </TouchableOpacity> */}
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
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: () => dispatch(actionCreators.updateUserInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
