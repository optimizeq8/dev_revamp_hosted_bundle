import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";
import { Toast } from "native-base";
import * as actionCreators from "../../../../store/actions";
// Style
import styles, { colors } from "./styles";

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
              <Text>Please Enter a valid Mobile number.</Text>
            </View>
          )}
        {!this.state.valid ? (
          <View style={styles.info}>
            <Text>Please Enter a valid Mobile number.</Text>
          </View>
        ) : null}
        {this.state.numExists !== "" ? (
          <View style={styles.info}>
            <Text>{this.state.numExists}</Text>
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
            style={[
              styles.input,
              { borderBottomColor: this.state.valid ? "#5F5F5F" : "red" }
            ]}
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry="kw"
            countriesList={require("./countries.json")}
            value="965"
            offset={15}
          />

          {this.renderInfo()}
          <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/button.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
