import React, { Component } from "react";
import { View } from "react-native";
import { Text, Container, Badge } from "native-base";
import { SafeAreaView } from "react-navigation";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Components
import CustomHeader from "../../../MiniComponents/Header";
import PersonalInfo from "../PersonalInfo";
import PhoneNo from "../PhoneNo";
import Verification from "../Verification";
import CreateBusinessAccount from "../../CreateBusinessAccount";

// Style
import styles from "./styles";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = { verified: false };
  render() {
    const { translate } = this.props.screenProps;
    let invite =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.invite;
    let title = "Phone Number";
    let content = (
      <PhoneNo
        navigation={this.props.navigation}
        screenProps={this.props.screenProps}
      />
    );

    if (this.props.verificationCode) {
      content = <Verification screenProps={this.props.screenProps} />;
      title = "Verification";
    }
    if (!this.props.registered && this.props.verified) {
      content = <PersonalInfo screenProps={this.props.screenProps} />;
      title = "Personal Info";
    }
    if (this.props.successEmail) {
      content = (
        <CreateBusinessAccount
          registering={true}
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
      //  <BusinessInfo navigation={this.props.navigation} />;
      title = "Business Info";
    }

    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={styles.container}>
          <CustomHeader
            closeButton={true}
            actionButton={() => {
              this.props.navigation.navigate("Invitation");
              this.props.resetRegister();
            }}
            // navigation={this.props.navigation}
            title={translate("Registration")}
          />
          {/* <CloseButton
            navigation={() => {
              this.props.navigation.navigate("Invitation");
              this.props.resetRegister();
            }}
          />
          <Text style={styles.title}>Registration</Text> */}
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
              style={
                this.props.successEmail ? styles.activeBadege : styles.badge
              }
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
          <Text style={styles.subtitle}>{translate(title)}</Text>

          <View style={[styles.mainCard]}>{content}</View>
        </Container>
      </SafeAreaView>
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

const mapDispatchToProps = dispatch => ({
  resetRegister: () => dispatch(actionCreators.resetRegister())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
