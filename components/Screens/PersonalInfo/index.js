import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Platform,
  PixelRatio
} from "react-native";
import { Text, Item, Input, Label } from "native-base";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import { SafeAreaView } from "react-navigation";
import Header from "../../MiniComponents/Header";

//icons
import PersonalInfoIcon from "../../../assets/SVGs/Person";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";

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
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never" }}
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
                    <Text style={styles.label}>Full Name</Text>
                    <Text style={styles.nameText}>
                      {this.props.userInfo.firstname}{" "}
                      {this.props.userInfo.lastname}
                    </Text>
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        {
                          // fontSize:
                          //   Platform.OS === "android"
                          //     ? 14 / PixelRatio.getFontScale()
                          //     : 14,
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

                      <Input
                        disabled
                        style={styles.inputText}
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
                      <Label style={[styles.label, styles.labelEmail]}>
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
                        style={[styles.inputText]}
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
