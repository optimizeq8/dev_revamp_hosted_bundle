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
          <View
            style={{
              // marginTop: -20,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFF",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Invitation");
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
                  lineHeight: 18
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
                    1
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
              <View style={[styles.dash, styles.dashActive]} />
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
                    2
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
              <View style={styles.dash} />
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
                    3
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
              <View
                style={[styles.dash, { marginRight: -3, marginLeft: -2 }]}
              />
              <View style={styles.badgeView}>
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
            </View>
          </View>
          <View style={[styles.mainCard]}>{content}</View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  verificationCode: true,
  successNo: true,
  successEmail: state.register.successEmail,
  verified: true,
  registered: false
});

const mapDispatchToProps = dispatch => ({
  resetRegister: () => dispatch(actionCreators.resetRegister())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
