import React, { Component } from "react";
import { View } from "react-native";
import { Button, Text, Container, Item, Input } from "native-base";
import { showMessage } from "react-native-flash-message";
import PhoneNo from "../Signup/PhoneNo";
import KeyboardShift from "../../MiniComponents/KeyboardShift";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Functions
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

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
    if (emailError || mobileError) {
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
      <Container style={[styles.container]}>
        <KeyboardShift style={styles.keyboardContainer}>
          {() => (
            <View style={styles.keyboardView}>
              <Text style={styles.title}>Get your invite code</Text>
              <PhoneNo _getMobile={this._getMobile} invite={true} />
              <Item rounded style={[styles.input]}>
                <Input
                  placeholderTextColor="#fff"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.inputText}
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
              <Text
                style={[styles.link]}
                onPress={() => this.props.toggleComps()}
              >
                Already have an invite code?
              </Text>
            </View>
          )}
        </KeyboardShift>
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
