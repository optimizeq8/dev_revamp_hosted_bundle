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
      valid: "",
      type: "",
      value: ""
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });

    if (this.phone.isValidNumber()) {
      this.props.sendMobileNo({ mobile: this.phone.getValue() });
      if (
        this.props.message !==
          "Please enter the verification code sent on your mobile" ||
        this.props.message !== ""
      ) {
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
    } else {
      Toast.show({
        text: "The number is not valid, please try again.",
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

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
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
            style={styles.input}
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry="kw"
            countriesList={require("./countries.json")}
            value="965"
            offset={15}
          />

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
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  sendMobileNo: mobileNo => dispatch(actionCreators.sendMobileNo(mobileNo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNo);
