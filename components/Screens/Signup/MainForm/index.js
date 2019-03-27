//Components
import React, { Component } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, Container, Icon, Badge } from "native-base";
import { LinearGradient } from "expo";
import PersonalInfo from "../PersonalInfo";
import PhoneNo from "../PhoneNo";
import Verification from "../Verification";
import BusinessInfo from "../BusinessInfo";

// Style
import styles, { colors } from "./styles";
//Redux
import { connect } from "react-redux";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = { verified: false };
  render() {
    let title = "Phone Number";
    let content = <PhoneNo navigation={this.props.navigation} />;
    if (this.props.verificationCode) {
      content = <Verification />;
      title = "Verification";
    }
    if (!this.props.registered && this.props.verified) {
      content = <PersonalInfo />;
      title = "Personal Info";
    }
    if (this.props.successEmail) {
      content = <BusinessInfo navigation={this.props.navigation} />;
      title = "Business Info";
    }

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("Signin")}
          style={{
            marginLeft: 10
          }}
        >
          <Icon
            style={{
              fontSize: 40,
              color: "#fff"
            }}
            name="close"
          />
        </Button>
        <Text style={styles.title}>Registration</Text>
        <View style={styles.content}>
          <Badge
            style={
              !this.props.successNo && !this.props.verificationCode
                ? styles.activeBadege
                : styles.badge
            }
          >
            <Text
              style={
                !this.props.successNo && !this.props.verificationCode
                  ? styles.activeBadegeText
                  : styles.badgeText
              }
            >
              1
            </Text>
          </Badge>
          <View style={styles.dash} />

          <Badge
            style={
              this.props.verificationCode && !this.props.verified
                ? styles.activeBadege
                : styles.badge
            }
          >
            <Text
              style={
                this.props.verificationCode && !this.props.verified
                  ? styles.activeBadegeText
                  : styles.badgeText
              }
            >
              2
            </Text>
          </Badge>
          <View style={styles.dash} />
          <Badge
            style={
              this.props.verified &&
              !this.props.successEmail &&
              !this.props.registered
                ? styles.activeBadege
                : styles.badge
            }
          >
            <Text
              style={
                this.props.verified &&
                !this.props.successEmail &&
                !this.props.registered
                  ? styles.activeBadegeText
                  : styles.badgeText
              }
            >
              3
            </Text>
          </Badge>
          <View style={styles.dash} />
          <Badge
            style={this.props.successEmail ? styles.activeBadege : styles.badge}
          >
            <Text
              style={
                this.props.successEmail
                  ? styles.activeBadegeText
                  : styles.badgeText
              }
            >
              4
            </Text>
          </Badge>
        </View>
        <Text style={styles.subtitle}>{title}</Text>

        <View style={[styles.mainCard]}>{content}</View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  verificationCode: state.auth.verificationCode,
  successNo: state.auth.successNo,
  successEmail: state.auth.successEmail,
  verified: state.auth.verified,
  registered: state.auth.registered
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
