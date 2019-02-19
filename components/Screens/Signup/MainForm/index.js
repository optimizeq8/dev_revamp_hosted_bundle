import React, { Component } from "react";
import { connect } from "react-redux";

import { View, KeyboardAvoidingView } from "react-native";
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
import { LinearGradient } from "expo";
import PersonalInfo from "../PersonalInfo";
import PhoneNo from "../PhoneNo";
import Verification from "../Verification";
import BusinessInfo from "../BusinessInfo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Style
import styles, { colors } from "./styles";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidUpdate() {
    if (this.props.verificationCode) alert(this.props.verificationCode);
  }

  render() {
    let content = <PhoneNo />;
    if (this.props.verificationCode) {
      content = <Verification />;
    }
    if (this.props.successNo) {
      content = <PersonalInfo />;
    }
    if (this.props.successEmail) {
      content = <BusinessInfo navigation={this.props.navigation} />;
    }

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={{
            backgroundColor: "#fff",
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          <Card
            style={[
              styles.mainCard,
              {
                margin: 0,
                shadowColor: "#fff",
                shadowRadius: 1,
                shadowOpacity: 0.7,
                shadowOffset: { width: 8, height: 8 }
              }
            ]}
          >
            <Text style={styles.text}>Registration</Text>
            <View style={styles.content}>
              <Badge
                style={
                  this.props.verificationCode
                    ? styles.badge
                    : styles.activeBadege
                }
              >
                <Text
                  style={
                    this.props.verificationCode
                      ? { color: "#5F5F5F" }
                      : { color: "#fff" }
                  }
                >
                  1
                </Text>
              </Badge>
              <Text> - </Text>
              <Badge
                style={
                  this.props.verificationCode && !this.props.successNo
                    ? styles.activeBadege
                    : styles.badge
                }
              >
                <Text
                  style={
                    this.props.verificationCode && !this.props.successNo
                      ? { color: "#fff" }
                      : { color: "#5F5F5F" }
                  }
                >
                  2
                </Text>
              </Badge>
              <Text> - </Text>
              <Badge
                style={
                  this.props.successNo && !this.props.successEmail
                    ? styles.activeBadege
                    : styles.badge
                }
              >
                <Text
                  style={
                    this.props.successNo && !this.props.successEmail
                      ? { color: "#fff" }
                      : { color: "#5F5F5F" }
                  }
                >
                  3
                </Text>
              </Badge>
              <Text> - </Text>
              <Badge
                style={
                  this.props.successEmail ? styles.activeBadege : styles.badge
                }
              >
                <Text
                  style={
                    this.props.successEmail
                      ? { color: "#fff" }
                      : { color: "#5F5F5F" }
                  }
                >
                  4
                </Text>
              </Badge>
            </View>
            {content}
          </Card>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  verificationCode: state.auth.verificationCode,
  successNo: state.auth.successNo,
  successEmail: state.auth.successEmail
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
