import React, { Component } from "react";
import { View, TouchableOpacity, I18nManager } from "react-native";
import { Text, Container, Badge } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";

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
import FowrwardIcon from "../../../../assets/SVGs/ArrowForwardPurple";

import RegisterIcon from "../../../../assets/SVGs/RegisterIcon";
// Style
import styles from "./styles";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
  }
  /**
   * Gets called whenever a user presses on an invite registeration deep link
   */
  handleBusinessInvite = () => {
    if (this.props.navigation.getParam("b", null) === "0") {
      this.setState({
        businessInvite: this.props.navigation.getParam("b", null),
        tempId: this.props.navigation.getParam("v", null)
      });
      this.props.getTempUserInfo(this.props.navigation.getParam("v", null));
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    let content = (
      <PersonalInfo
        businessInvite={this.state.businessInvite}
        navigation={this.props.navigation}
        tempId={this.state.tempId}
        screenProps={this.props.screenProps}
      />
    );

    // if (this.props.successPersonalInfo && !this.state.businessInvite) {
    //   content = (
    //     <CreateBusinessAccount
    //       registering={true}
    //       navigation={this.props.navigation}
    //       screenProps={this.props.screenProps}
    //     />
    //   );
    // }

    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.handleBusinessInvite} />
        <Container style={styles.container}>
          <View style={styles.progressCardView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Signin");
                this.props.resetRegister();
              }}
            >
              {I18nManager.isRTL ? <FowrwardIcon /> : <BackIcon />}
            </TouchableOpacity>

            <View style={styles.registerHeaderIconView}>
              <RegisterIcon />
              <Text style={styles.registerationText}>
                {translate("Registration")}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.badgeView}>
                <Badge
                  style={
                    // (!this.props.successPersonalInfo &&
                    //   this.props.successEmail &&
                    //   !this.props.registered) ||
                    // this.state.businessInvite === "0" // Since there's only 1 badge for the invited member, this'll make it active
                    // ?
                    styles.activeBadege
                    // : styles.badge
                  }
                >
                  <Text
                    style={
                      // (!this.props.successPersonalInfo &&
                      //   this.props.successEmail &&
                      //   !this.props.registered) ||
                      // this.state.businessInvite === "0"
                      // ?
                      styles.activeBadegeText
                      // : styles.badgeText
                    }
                  >
                    {translate("1")}
                  </Text>
                </Badge>
                <Text
                  style={
                    // (!this.props.successPersonalInfo &&
                    //   this.props.successEmail &&
                    //   !this.props.registered) ||
                    // this.state.businessInvite === "0"
                    // ?
                    styles.activeTitleText
                    // : styles.titleText
                  }
                >
                  {translate("Details")}
                </Text>
              </View>
              {this.state.businessInvite !== "0" && (
                <>
                  <View
                    style={[
                      styles.dash,
                      // { width: 30 },
                      this.props.successPersonalInfo && !this.props.registered
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
                        this.props.successPersonalInfo && !this.props.registered
                          ? styles.activeBadege
                          : styles.badge
                      }
                    >
                      <Text
                        style={
                          this.props.successPersonalInfo &&
                          !this.props.registered
                            ? styles.activeBadegeText
                            : styles.badgeText
                        }
                      >
                        {translate("2")}
                      </Text>
                    </Badge>
                    <Text
                      style={
                        this.props.successPersonalInfo && !this.props.registered
                          ? styles.activeTitleText
                          : styles.titleText
                      }
                    >
                      {translate("Complete")}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
          {content}
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
  registered: state.register.registered,
  successPersonalInfo: state.register.successPersonalInfo
});

const mapDispatchToProps = dispatch => ({
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  getTempUserInfo: tempId => dispatch(actionCreators.getTempUserInfo(tempId))
});
export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
