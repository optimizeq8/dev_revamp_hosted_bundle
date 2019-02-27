import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import { View, TouchableOpacity, Image } from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge,
  Toast
} from "native-base";

// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../../store/actions";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstname: "",
        lastname: "",
        email: "",
        mobile: this.props.mobileNo,
        password: ""
      },
      repassword: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  _handleSubmission = () => {
    let message = [];
    if (this.state.userInfo.firstname === "") {
      message.push("Please enter your First Name.");
    }
    if (this.state.userInfo.lastname === "") {
      message.push("Please enter your Last Name.");
    }
    if (this.state.userInfo.email === "") {
      message.push("Please enter your email.");
    }
    if (this.state.userInfo.password === "") {
      message.push("Please enter a password.");
    }
    if (this.state.userInfo.password !== this.state.repassword) {
      message.push("Your Passwords don't match.");
    }

    if (message.length !== 0) {
      message.forEach(m => {
        console.log(m);
        Toast.show({
          text: m,
          buttonText: "Okay",
          duration: 3000,
          type: "danger",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: {
            backgroundColor: "#717171",
            alignSelf: "center"
          }
        });
      });
    } else {
      this.props.verifyEmail(this.state.userInfo.email, this.state.userInfo);
      if (this.props.message === "Email already exist") {
        Toast.show({
          text: this.props.message,
          buttonText: "Okay",
          duration: 3000,
          type: "danger",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: {
            backgroundColor: "#717171",
            alignSelf: "center"
          }
        });
      }
    }
  };
  render() {
    return (
      <View>
        <View style={{ paddingBottom: 0 }}>
          <Text style={styles.text}>Personal Info</Text>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="First Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, firstname: value }
                })
              }
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="Last Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, lastname: value }
                })
              }
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, email: value }
                })
              }
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value =>
                this.setState({
                  userInfo: { ...this.state.userInfo, password: value }
                })
              }
            />
          </Item>
          <Item
            rounded
            style={[styles.input, { marginBottom: 0, paddingBottom: 0 }]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Retype Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ repassword: value })}
            />
          </Item>
        </View>
        <TouchableOpacity
          onPress={() => this._handleSubmission()}
          style={[styles.buttonN, { paddingTop: 0, bottom: 15 }]}
        >
          <Image
            style={styles.image}
            source={require("../../../../assets/images/button.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  message: state.auth.message,

  mobileNo: state.auth.mobileNo
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: (email, userInfo) =>
    dispatch(actionCreators.verifyEmail(email, userInfo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
