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
import { LinearGradient } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";

//icons
import ChangePassIcon from "../../../assets/SVGs/MenuIcons/ChangePassIcon";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PersonalInfo from "../../../assets/SVGs/MenuIcons/PersonalInfo";
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
  }

  render() {
    console.log(this.props.userInfo);

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
        <Text style={styles.title}>Personal Info</Text>

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
                      {/* <Icon
                        style={{
                          fontSize: 20,
                          color: this.state.inputF ? "#FF9D00" : "#717171"
                        }}
                        name="key"
                      /> */}
                      {"  "}
                      First Name
                    </Label>
                    <Input
                      style={styles.inputtext}
                      value={`${this.props.userInfo.firstname}`}
                      disabled
                    />
                  </Item>

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
                      {/* <Icon
                        style={{
                          fontSize: 20,
                          color: this.state.inputF ? "#FF9D00" : "#717171"
                        }}
                        name="key"
                      /> */}
                      {"  "}
                      Last Name
                    </Label>
                    <Input
                      style={styles.inputtext}
                      value={`${this.props.userInfo.lastname}`}
                      disabled
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
                      {/* <Icon
                        style={{
                          fontSize: 20,
                          color: this.state.inputP ? "#FF9D00" : "#717171"
                        }}
                        name="key"
                      /> */}
                      {"  "}
                      email
                    </Label>
                    <Input
                      disabled
                      style={styles.inputtext}
                      value={this.props.userInfo.email}
                    />
                  </Item>

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
                      Mobile No.
                    </Label>

                    <Input
                      style={styles.inputtext}
                      value={`+${this.props.userInfo.mobile}`}
                    />
                  </Item>

                  {/* <TouchableOpacity
                    onPress={() => this._handleSubmission()}
                    style={styles.button}
                  >
                    <CheckmarkIcon />
                  </TouchableOpacity> */}
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
  userInfo: state.auth.userInfo,
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