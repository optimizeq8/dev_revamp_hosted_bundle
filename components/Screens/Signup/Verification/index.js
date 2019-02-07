import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import { View, TouchableOpacity } from "react-native";
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
      </View>
    );
  }
}
const mapStateToProps = state => ({ mobileNo: state.auth.mobileNo });

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
