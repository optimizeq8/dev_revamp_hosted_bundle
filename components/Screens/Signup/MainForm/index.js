import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
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

// icons
import BackIcon from "../../../../assets/SVGs/BackButtonPurple";
import RegisterIcon from "../../../../assets/SVGs/RegisterIcon";
// Style
import styles from "./styles";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = { verified: false };
  componentDidMount() {
    if (this.props.navigation.getParam("b", null) === "0") {
      this.setState({
        businessInvite: this.props.navigation.getParam("b", null),
        tempId: this.props.navigation.getParam("v", null)
      });
      this.props.getTempUserInfo(this.props.navigation.getParam("v", null));
    }
  }
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
      content = (
        <PersonalInfo
          businessInvite={this.state.businessInvite}
          navigation={this.props.navigation}
          tempId={this.state.tempId}
          screenProps={this.props.screenProps}
        />
      );
      title = "Personal Info";
    }
    if (this.props.successEmail && !this.state.businessInvite) {
      content = (
        <CreateBusinessAccount
          registering={true}
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
      title = "Business Info";
    }

    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={styles.container}>
          <View style={styles.progressCardView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Signin");
                this.props.resetRegister();
              }}
            >
              <BackIcon fill={"#C6C6C6"} />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                alignItems: "center"
                // flex: 1
              }}
            >
              <RegisterIcon />
              <Text
                style={{
                  fontSize: 14,
                  color: "#6C63FF",
                  textTransform: "uppercase",
                  fontFamily: "montserrat-bold",
                  letterSpacing: 0,
                  lineHeight: 18,
                  marginTop: 10
                }}
              >
                {translate("Registration")}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.badgeView}>
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
                    {translate("1")}
                  </Text>
                </Badge>
                <Text
                  style={
                    !this.props.successNo && !this.props.verificationCode
                      ? styles.activeTitleText
                      : styles.titleText
                  }
                >
                  {translate("Number")}
                </Text>
              </View>
              <View
                style={[
                  styles.dash,
                  !this.props.successNo &&
                    !this.props.verificationCode &&
                    styles.dashActive
                ]}
              />
              <View style={styles.badgeView}>
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
                    {translate("2")}
                  </Text>
                </Badge>
                <Text
                  style={
                    this.props.verificationCode && !this.props.verified
                      ? styles.activeTitleText
                      : styles.titleText
                  }
                >
                  {translate("Verify")}
                </Text>
              </View>
              <View
                style={[
                  styles.dash,

                  this.props.verified &&
                  !this.props.successEmail &&
                  !this.props.registered
                    ? { marginLeft: -4, marginRight: -8 }
                    : { marginRight: -4 }
                ]}
              />
              <View style={styles.badgeView}>
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
                    {translate("3")}
                  </Text>
                </Badge>
                <Text
                  style={
                    this.props.verified &&
                    !this.props.successEmail &&
                    !this.props.registered
                      ? styles.activeTitleText
                      : styles.titleText
                  }
                >
                  {translate("Personal")}
                </Text>
              </View>
              {this.state.businessInvite !== "0" && (
                <>
                  <View
                    style={[
                      styles.dash,
                      // { width: 30 },
                      this.props.successEmail
                        ? { marginRight: -8 }
                        : {
                            marginRight: -4,
                            marginLeft: -4
                          }
                    ]}
                  />
                  <View style={styles.badgeView}>
                    <Badge
                      style={
                        this.props.successEmail
                          ? styles.activeBadege
                          : styles.badge
                      }
                    >
                      <Text
                        style={
                          this.props.successEmail
                            ? styles.activeBadegeText
                            : styles.badgeText
                        }
                      >
                        {translate("4")}
                      </Text>
                    </Badge>
                    <Text
                      style={
                        this.props.successEmail
                          ? styles.activeTitleText
                          : styles.titleText
                      }
                    >
                      {translate("Business")}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
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
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  getTempUserInfo: tempId => dispatch(actionCreators.getTempUserInfo(tempId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
