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
  Badge
} from "native-base";
// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../../store/actions";

class Verification extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text style={styles.text}>
          Please Enter the {"\n"}
          Verification code sent to{"\n"} {this.props.mobileNo}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.verifyMobileCode({
              mobile: this.props.mobileNo,
              verificationCode: this.props.verificationCode
            });
          }}
          style={styles.button}
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
  mobileNo: state.auth.mobileNo,
  verificationCode: state.auth.verificationCode
});
const mapDispatchToProps = dispatch => ({
  verifyMobileCode: mobileAuth =>
    dispatch(actionCreators.verifyMobileCode(mobileAuth))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
