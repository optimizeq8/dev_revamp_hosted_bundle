import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import ChangePassIcon from "../../../assets/SVGs/ChangePassIcon";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Data
import country_regions from "./regions";
//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import { heightPercentageToDP } from "react-native-responsive-screen";

class AddressForm extends Component {
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
      sidemenustate: false,
      sidemenu: "",
      filteredRegions: country_regions[0].regions,
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
  }

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
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
    if (!this.state.passwordError) {
      this.props.changePassword(
        this.state.userInfo.currentPassword,
        this.state.userInfo.password,
        this.props.navigation
      );
    }
  };
  render() {
    let menu;
    switch (this.state.sidemenu) {
      case "countries": {
        menu = (
          <GenderOptions
            campaignInfo={this.state.campaignInfo}
            _changeGender={this._changeGender}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "regions": {
        menu = (
          <AgeOption
            state={this.state}
            _handleMaxAge={this._handleMaxAge}
            _handleMinAge={this._handleMinAge}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
    }
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Button
          transparent
          onPress={() => this.props.navigation.goBack()}
          style={{
            marginLeft: 10
          }}
        >
          <Icon
            style={{
              fontSize: 40,
              color: "#fff"
            }}
            name="close"
          />
        </Button>
        <Text style={styles.title}>Change Password</Text>
        <View style={styles.mainCard}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardShift>
              {() => (
                <View style={styles.contentContainer}>
                  <ChangePassIcon
                    style={{
                      alignSelf: "center"
                    }}
                  />
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
                  {this.state.userInfo.password !== "" && (
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
                  )}
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
                  <Button
                    onPress={() => this._handleSubmission()}
                    style={styles.button}
                  >
                    <Icon style={styles.icon} name="arrow-forward" />
                  </Button>
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
)(AddressForm);
