//Components
import React, { Component } from "react";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { Button, Icon } from "native-base";

// Style
import styles, { colors } from "./styles";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

class PhoneNo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      valid: true,
      type: "",
      value: "",
      numExists: ""
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.message !== this.props.message &&
      prevProps.mobileNo !== this.state.value
    ) {
      this.setState({
        numExists:
          this.props.message.includes("registered") && this.props.message
            ? this.props.message
            : ""
      });
    }
  }

  updateInfo() {
    this.props.resetMessages();
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue(),
      numExists: !this.phone.isValidNumber() && ""
    });

    if (this.phone.isValidNumber() && this.phone.getNumberType() === "MOBILE") {
      this.props.sendMobileNo({ mobile: this.phone.getValue() });
    }
  }

  renderInfo() {
    return (
      <View>
        {this.state.type !== "MOBILE" &&
          this.state.type !== "" &&
          this.state.type !== "UNKNOWN" && (
            <View style={styles.info}>
              <Text style={styles.errorText}>
                Please Enter a valid Mobile number.
              </Text>
            </View>
          )}
        {!this.state.valid ? (
          <View style={styles.info}>
            <Text style={styles.errorText}>
              Please Enter a valid Mobile number.
            </Text>
          </View>
        ) : null}
        {this.state.numExists !== "" ? (
          <View style={styles.info}>
            <Text style={styles.errorText}>{this.state.numExists}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Please Provide your {"\n"}
            Mobile Number
          </Text>

          <PhoneInput
            textStyle={{
              ...styles.input,
              borderBottomColor: this.state.valid ? "#5F5F5F" : "red"
            }}
            buttonTextStyle={{ backgroundColor: "#000" }}
            flagStyle={{
              left: 30,
              bottom: 2
            }}
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry="kw"
            countriesList={require("./countries.json")}
            value="965"
            offset={15}
          />

          {this.renderInfo()}
          <Button onPress={this.updateInfo} style={styles.button}>
            <Icon style={styles.icon} name="arrow-forward" />
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  message: state.auth.message,
  verified: state.auth.verified
});

const mapDispatchToProps = dispatch => ({
  sendMobileNo: mobileNo => dispatch(actionCreators.sendMobileNo(mobileNo)),
  resetMessages: () => dispatch(actionCreators.resetMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNo);
