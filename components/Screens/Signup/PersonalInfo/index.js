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

class PersonalInfo extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <View style={{ paddingBottom: 0 }}>
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
          <Item
            rounded
            style={[styles.input, { marginBottom: 0, paddingBottom: 0 }]}
          >
            <Input style={styles.inputtext} placeholder="Retype Password" />
          </Item>
        </View>
        <TouchableOpacity
          onPress={() => {
            alert("Next");
          }}
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
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
