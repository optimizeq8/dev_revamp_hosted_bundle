import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { LinearGradient, Segment } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";

//icons
import ChangePassIcon from "../../../assets/SVGs/MenuIcons/ChangePassIcon";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

// Style
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import { heightPercentageToDP } from "react-native-responsive-screen";

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
  }
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
        this.props.navigation
      );
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={globalStyles.backButton}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Change Password</Text>
        <ChangePassIcon
          style={{
            alignSelf: "center"
          }}
          fill="#fff"
          fillOpacity={1}
          width={100}
          height={100}
        />
        <View style={styles.mainCard}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardShift>
              {() => (
                <View style={styles.contentContainer}>
                  <Item
                    floatingLabel
                    style={[
                      styles.input,
                      {
                        borderColor: this.state.inputP
                          ? "#7039FF"
                          : this.state.currentPasswordError
                          ? "red"
                          : "#D9D9D9"
                      }
                    ]}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          bottom: 5,

                          color: this.state.inputF ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      <Icon
                        style={{
                          fontSize: 20,
                          color: this.state.inputF ? "#FF9D00" : "#717171"
                        }}
                        name="key"
                      />
                      {"  "}
                      Current Password
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
                      {
                        borderColor: this.state.inputP
                          ? "#7039FF"
                          : this.state.passwordError
                          ? "red"
                          : "#D9D9D9"
                      }
                    ]}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          bottom: 5,

                          color: this.state.inputP ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      <Icon
                        style={{
                          fontSize: 20,
                          color: this.state.inputP ? "#FF9D00" : "#717171"
                        }}
                        name="key"
                      />
                      {"  "}
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
                    <Text
                      style={[
                        styles.text,
                        {
                          bottom: 40,
                          paddingVertical: 0,
                          paddingTop: 0,
                          marginBottom: 0,
                          paddingVertical: 0
                        }
                      ]}
                    >
                      {this.state.passwordError}
                    </Text>
                  ) : null}

                  <Item
                    floatingLabel
                    style={[
                      styles.input,
                      {
                        marginBottom: 0,
                        paddingBottom: 0,
                        borderColor: this.state.inputPR
                          ? "#7039FF"
                          : this.state.repasswordError !== ""
                          ? "red"
                          : "#D9D9D9"
                      }
                    ]}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          bottom: 5,
                          color: this.state.inputPR ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      Retype Password
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
                    <Text
                      style={[
                        styles.text,
                        {
                          bottom: 15,
                          paddingTop: 0,
                          marginBottom: 0,
                          paddingVertical: 0
                        }
                      ]}
                    >
                      {this.state.repasswordError}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => this._handleSubmission()}
                    style={styles.button}
                  >
                    <CheckmarkIcon />
                  </TouchableOpacity>
                </View>
              )}
            </KeyboardShift>
          </TouchableWithoutFeedback>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  changePassword: (currentPass, newPass, navigation) =>
    dispatch(actionCreators.changePassword(currentPass, newPass, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
