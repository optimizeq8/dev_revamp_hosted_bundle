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

class PersonalInfo extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text style={styles.text}>Personal Info</Text>
        <Item rounded style={styles.input}>
          <Input style={styles.inputtext} placeholder="First Name" />
        </Item>
        <Item rounded style={styles.input}>
          <Input style={styles.inputtext} placeholder="Last Name" />
        </Item>
        <Item rounded style={styles.input}>
          <Input style={styles.inputtext} placeholder="Email" />
        </Item>
        <Item rounded style={styles.input}>
          <Input style={styles.inputtext} placeholder="Password" />
        </Item>
        <Item rounded style={styles.input}>
          <Input style={styles.inputtext} placeholder="Retype Password" />
        </Item>
        <Button block dark style={styles.button}>
          <Text style={styles.buttontext}>Login</Text>
        </Button>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
