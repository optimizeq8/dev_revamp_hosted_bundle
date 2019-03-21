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

  render() {
    let title = "Phone Number";
    let content = <PhoneNo navigation={this.props.navigation} />;
    if (this.props.verificationCode && !this.props.verified) {
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
          onPress={() => this.props.navigation.goBack()}
          style={{
            paddingLeft: 10
          }}
        >
          <Icon
            style={{
              top: 20,
              fontSize: 35,
              color: "#fff"
            }}
            name="arrow-back"
          />
        </Button>
        <Text style={styles.title}>Registration</Text>
        <View style={styles.content}>
          <Badge
            style={
              this.props.verified && !this.props.registered
                ? styles.badge
                : styles.activeBadege
            }
          >
            <Text
              style={
                this.props.verified && !this.props.registered
                  ? styles.badgeText
                  : styles.activeBadegeText
              }
            >
              1
            </Text>
          </Badge>
          <View style={styles.dash} />

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

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={styles.keyboard}
        >
          <View style={[styles.mainCard]}>{content}</View>
        </KeyboardAwareScrollView>
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
