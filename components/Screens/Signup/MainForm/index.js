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
import CreateBusinessAccount from "../../CreateBusinessAccount";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import CloseButton from "../../../MiniComponents/CloseButton";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = { verified: false };
  render() {
    let invite =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.invite;
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
      content = (
        <CreateBusinessAccount
          registering={true}
          navigation={this.props.navigation}
        />
      );
      //  <BusinessInfo navigation={this.props.navigation} />;
      title = "Business Info";
    }

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        
        <CloseButton
          navigation={() => this.props.navigation.navigate("Invitation")}
        />
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
  verificationCode: state.register.verificationCode,
  successNo: state.register.successNo,
  successEmail: state.register.successEmail,
  verified: state.register.verified,
  registered: state.register.registered
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
