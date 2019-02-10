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

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      repassword: ""
    };
  }

  render() {
    return (
      <View>
        <View style={{ paddingBottom: 0 }}>
          <Text style={styles.text}>Personal Info</Text>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="First Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ firstname: value })}
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="Last Name"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ lastname: value })}
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ email: value })}
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              style={styles.inputtext}
              placeholder="Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ password: value })}
            />
          </Item>
          <Item
            rounded
            style={[styles.input, { marginBottom: 0, paddingBottom: 0 }]}
          >
            <Input
              style={styles.inputtext}
              placeholder="Retype Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={value => this.setState({ repassword: value })}
            />
          </Item>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (this.state.password !== this.state.repassword) {
              Toast.show({
                text: "Your passwords don't match!",
                buttonText: "Okay",
                duration: 6000,
                type: "danger",
                buttonTextStyle: { color: "#000" },
                buttonStyle: {
                  backgroundColor: "#F1C04F",
                  alignSelf: "center"
                }
              });
            } else {
              this.props.verifyEmail(this.state.email, this.state);
            }
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

const mapDispatchToProps = dispatch => ({
  verifyEmail: (email, userInfo) =>
    dispatch(actionCreators.verifyEmail(email, userInfo))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
