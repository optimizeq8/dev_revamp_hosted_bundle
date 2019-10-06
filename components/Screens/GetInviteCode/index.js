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

  state = {
    country_code: "",
    mobile: "",
    email: "",
    emailError: "",
    country_name: "",
    name_error: "",
    name: ""
  };

  _getMobile = info => {
    info.valid
      ? this.setState({
          mobile: info.mobile,
          country_code: info.country_code,
          country_name: info.country_name
        })
      : this.setState({
          mobile: "",
          country_code: "",
          country_name: ""
        });
  };
  _handleGetInviteCode = () => {
    const { translate } = this.props.screenProps;

    const emailError = validateWrapper("email", this.state.email);
    const mobileError = validateWrapper("mandatory", this.state.mobile);
    const nameError = validateWrapper("mandatory", this.state.name);
    if (emailError || mobileError || nameError) {
      showMessage({
        message: translate("Please enter your valid info!"),
        type: "warning",
        position: "top"
      });
    } else {
      this.props.requestInvitationCode({
        country_code: this.state.country_code,
        mobile: this.state.mobile,
        email: this.state.email,
        country_name: this.state.country_name,
        name: this.state.name
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <Container style={[styles.container]}>
        <KeyboardShift style={styles.keyboardContainer}>
          {() => (
            <View style={styles.keyboardView}>
              {/* <Text style={styles.title}>
                {translate("Get your invite code")}
              </Text> */}
              <Item rounded style={[styles.input]}>
                <Input
                  placeholderTextColor="#fff"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.inputText}
                  onChangeText={name => {
                    this.setState({
                      name
                    });
                  }}
                  onBlur={() => {
                    if (validateWrapper("mandatory", this.state.name)) {
                      showMessage({
                        message: translate("Please enter your name"),
                        type: "warning",
                        position: "top"
                      });
                    }
                  }}
                  placeholder={translate("Enter your name")}
                />
              </Item>
              <PhoneNo
                _getMobile={this._getMobile}
                invite={true}
                screenProps={this.props.screenProps}
              />
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
                        message: translate("Please enter a valid email!"),
                        type: "warning",
                        position: "top"
                      });
                    }
                  }}
                  placeholder={translate("Enter your email")}
                />
              </Item>

              <Button
                style={[styles.button]}
                onPress={() => {
                  this._handleGetInviteCode();
                }}
              >
                <Text style={styles.buttontext}>
                  {translate("Submit now!")}
                </Text>
              </Button>
              <Text
                style={[styles.link]}
                onPress={() => this.props.toggleComps()}
              >
                {translate("Already have an invite code?")}
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
