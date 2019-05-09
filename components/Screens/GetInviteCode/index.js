import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Text, Container, Icon, Badge, Item, Input } from "native-base";
import { LinearGradient } from "expo";
import Verification from "../Signup/Verification";
import Signin from "../Signin/";
import * as Animatable from "react-native-animatable";
import PhoneNo from "../Signup/PhoneNo";
//icons
import Logo from "../../../assets/SVGs/Optimize";
import Background from "../../../assets/SVGs/Background";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";

class GetInviteCode extends Component {
  static navigationOptions = {
    header: null
  };

  state = { country_code: "", mobile: "", email: "", emailError: "" };

  _getMobile = info => {
    info.valid
      ? this.setState({
          mobile: info.mobile,
          country_code: info.country_code
        })
      : this.setState({
          mobile: "",
          country_code: ""
        });
  };
  _handleGetInviteCode = () => {
    const emailError = validateWrapper("email", this.state.email);
    const mobileError = validateWrapper("mandatory", this.state.mobile);
    console.log("info.valid", mobileError);
    if (emailError && mobileError) {
      showMessage({
        message: "Please enter your valid info!",
        type: "warning",
        position: "top"
      });
    } else {
      this.props.requestInvitationCode({
        country_code: this.state.country_code,
        mobile: this.state.mobile,
        email: this.state.email
      });
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.title}>Get your invite code</Text>
        <PhoneNo _getMobile={this._getMobile} invite={true} />
        <Item rounded style={[styles.input]}>
          <Input
            placeholderTextColor="#fff"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.inputtext}
            onChangeText={email => {
              this.setState({
                email
              });
            }}
            onBlur={() => {
              if (validateWrapper("email", this.state.email)) {
                showMessage({
                  message: "Please enter a valid email!",
                  type: "warning",
                  position: "top"
                });
              }
            }}
            placeholder="Enter your email"
          />
        </Item>
        <Button
          style={[styles.button]}
          onPress={() => {
            this._handleGetInviteCode();
          }}
        >
          <Text style={styles.buttontext}>Submit now!</Text>
        </Button>
        <Text style={[styles.link]} onPress={() => this.props.toggleComps()}>
          Already have an invite code?
        </Text>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  requestInvitationCode: info =>
    dispatch(actionCreators.requestInvitationCode(info))
});
export default connect(
  null,
  mapDispatchToProps
)(GetInviteCode);
