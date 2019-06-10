import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { LinearGradient } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import { SafeAreaView } from "react-navigation";
import Header from "../../MiniComponents/Header";

//icons
import ChangePassIcon from "../../../assets/SVGs/MenuIcons/ChangePassIcon";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PersonalInfoIcon from "../../../assets/SVGs/Person";
// Style
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

class PersonalInfo extends Component {
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
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#0000" }}
        forceInset={{ bottom: "never" }}
      >
        <Header title={"Personal Info"} navigation={this.props.navigation} />

        <PersonalInfoIcon
          style={{
            alignSelf: "center",
            marginTop: 20
          }}
          width={55}
          height={55}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.mainCard}>
            <KeyboardShift>
              {() => (
                <View style={styles.contentContainer}>
                  <View
                    style={{
                      paddingHorizontal: 35,
                      textAlign: "left"
                    }}
                  >
                    <Text style={styles.label}>Full Name</Text>
                    <Text
                      style={{
                        color: "#5F5F5F",
                        fontFamily: "montserrat-medium",
                        fontSize: 23,
                        textAlign: "left",
                        paddingBottom: 60
                      }}
                    >
                      {this.props.userInfo.firstname}{" "}
                      {this.props.userInfo.lastname}
                    </Text>
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        {
                          marginBottom: 30,
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
                          styles.label,
                          {
                            bottom: 5
                          }
                        ]}
                      >
                        Mobile No.
                      </Label>

                      <Input
                        disabled
                        style={styles.inputtext}
                        value={`${this.props.userInfo.mobile}`}
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
                          styles.label,
                          {
                            bottom: 5
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
                        E-Mail
                      </Label>
                      <Input
                        disabled
                        style={[styles.inputtext]}
                        value={this.props.userInfo.email}
                      />
                    </Item>
                  </View>

                  {/* <TouchableOpacity
                    onPress={() => this._handleSubmission()}
                    style={styles.button}
                  >
                    <CheckmarkIcon />
                  </TouchableOpacity> */}
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

export default connect(
  mapStateToProps,
  null
)(PersonalInfo);
