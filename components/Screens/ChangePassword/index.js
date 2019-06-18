import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  TextInput
} from "react-native";
import { Segment } from "expo";
import { Text, Item, Input, Icon, Label, Container } from "native-base";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import { SafeAreaView } from "react-navigation";
import Header from "../../MiniComponents/Header";

//icons
import ChangePassIcon from "../../../assets/SVGs/ChangePassIcon.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

class ChangePassword extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        currentPassword: "",
        password: ""
      },

      inputF: false,
      inputL: false,
      inputE: false,
      inputP: false,
      inputPR: false,

      repassword: "",
      currentPasswordError: "",
      passwordError: "",

      repasswordError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this._passwordVarification = this._passwordVarification.bind(this);
  }
  componentDidMount() {
    Segment.screen("Change Password Screen");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _passwordVarification = () => {
    if (
      this.state.userInfo.password !== this.state.repassword ||
      this.state.repassword === ""
    ) {
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
      passwordError
    });
    if (this._passwordVarification() && !this.state.passwordError) {
      this.props.changePassword(
        this.state.userInfo.currentPassword,
        this.state.userInfo.password,
        this.props.navigation,
        this.props.user.email
      );
    }
  };
  render() {
    const tempPassword = this.props.navigation.getParam("temp_pwd", false);
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never" }}
      >
        <Container style={styles.container}>
          <Header
            title={"Change Password"}
            navigation={this.props.navigation}
          />
          <ChangePassIcon
            style={styles.iconChangePassword}
            fill="#fff"
            fillOpacity={1}
            width={100}
            height={100}
          />
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.mainCard}>
              <KeyboardShift>
                {() => (
                  <View style={styles.contentContainer}>
                    <View>
                      <Item
                        floatingLabel
                        style={[
                          styles.input,
                          this.state.inputP
                            ? globalStyles.purpleBorderColor
                            : this.state.currentPasswordError
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor
                        ]}
                      >
                        <Label
                          style={[
                            styles.label,
                            this.state.inputF
                              ? globalStyles.orangeTextColor
                              : globalStyles.darkGrayTextColor,

                            styles.newPasswordLabel
                          ]}
                        >
                          {tempPassword ? "Current Password" : "Old Password"}
                        </Label>
                        <Input
                          // allowFontScaling={true}
                          style={styles.inputtext}
                          secureTextEntry={true}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value =>
                            this.setState({
                              userInfo: {
                                ...this.state.userInfo,
                                currentPassword: value
                              }
                            })
                          }
                          onFocus={() => {
                            this.setState({ inputF: true });
                          }}
                          onBlur={() => {
                            this.setState({
                              inputF: false,
                              currentPasswordError: validateWrapper(
                                "mandatory",
                                this.state.userInfo.currentPassword
                              )
                            });
                          }}
                        />
                      </Item>

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
                        <Label
                          style={[
                            styles.label,
                            this.state.inputP
                              ? globalStyles.orangeTextColor
                              : globalStyles.darkGrayTextColor,
                            styles.newPasswordLabel
                          ]}
                        >
                          New Password
                        </Label>
                        <Input
                          style={styles.inputtext}
                          secureTextEntry={true}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value =>
                            this.setState({
                              userInfo: {
                                ...this.state.userInfo,
                                password: value
                              }
                            })
                          }
                          onFocus={() => {
                            this.setState({ inputP: true });
                          }}
                          onBlur={() => {
                            this.setState({
                              inputP: false,
                              passwordError: validateWrapper(
                                "password",
                                this.state.userInfo.password
                              )
                            });
                          }}
                        />
                      </Item>
                      {this.state.passwordError &&
                      this.state.passwordError.includes("8 characters") ? (
                        <Text style={[styles.text, styles.errorText]}>
                          {this.state.passwordError}
                        </Text>
                      ) : null}

                      <Item
                        floatingLabel
                        style={[
                          styles.input,
                          this.state.inputPR
                            ? globalStyles.purpleBorderColor
                            : this.state.repasswordError !== ""
                            ? globalStyles.redBorderColor
                            : globalStyles.lightGrayBorderColor,
                          styles.repasswordItem
                        ]}
                      >
                        <Label
                          style={[
                            styles.label,
                            this.state.inputPR
                              ? globalStyles.orangeTextColor
                              : globalStyles.darkGrayTextColor,
                            styles.repasswordLabel
                          ]}
                        >
                          Re-enter Password
                        </Label>

                        <Input
                          style={styles.inputtext}
                          secureTextEntry={true}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value =>
                            this.setState({ repassword: value })
                          }
                          onFocus={() => {
                            this.setState({ inputPR: true });
                          }}
                          onBlur={() => {
                            this.setState({ inputPR: false });
                            this._passwordVarification();
                          }}
                        />
                      </Item>
                      {this.state.repasswordError !== "" &&
                      this.state.userInfo.password !== "" ? (
                        <Text style={[styles.text, styles.repasswordErrorText]}>
                          {this.state.repasswordError}
                        </Text>
                      ) : null}
                    </View>
                    <TouchableOpacity
                      onPress={() => this._handleSubmission()}
                      style={styles.button}
                    >
                      <CheckmarkIcon />
                    </TouchableOpacity>
                  </View>
                )}
              </KeyboardShift>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: (currentPass, newPass, navigation, userEmail) =>
    dispatch(
      actionCreators.changePassword(currentPass, newPass, navigation, userEmail)
    ),
  logout: navigation => dispatch(actionCreators.logout(navigation))
});

const mapStateToProps = state => ({
  user: state.auth.userInfo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
