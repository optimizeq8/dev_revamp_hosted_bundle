import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "react-native";
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
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />

        <Card padder style={styles.mainCard}>
          <Text style={styles.text}>Registration</Text>
          <View style={styles.content}>
            <Badge
              style={
                this.props.verificationCode ? styles.badge : styles.activeBadege
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
                this.props.verificationCode ? styles.activeBadege : styles.badge
              }
            >
              <Text
                style={
                  this.props.verificationCode
                    ? { color: "#fff" }
                    : { color: "#5F5F5F" }
                }
              >
                2
              </Text>
            </Badge>
            <Text> - </Text>
            <Badge style={styles.badge}>
              <Text style={{ color: "#5F5F5F" }}>3</Text>
            </Badge>
            <Text> - </Text>
            <Badge style={styles.badge}>
              <Text style={{ color: "#5F5F5F" }}>4</Text>
            </Badge>
          </View>
          {content}
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  verificationCode: state.auth.verificationCode
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
