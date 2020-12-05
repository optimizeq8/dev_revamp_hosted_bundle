import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  StatusBar,
} from "react-native";
import { Container, Badge } from "native-base";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import analytics from "@segment/analytics-react-native";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Components
import PersonalInfo from "../PersonalInfo";

// icons
import BackIcon from "../../../../assets/SVGs/BackButtonPurple";
import FowrwardIcon from "../../../../assets/SVGs/ArrowForwardPurple";

import RegisterIcon from "../../../../assets/SVGs/RegisterIcon";
// Style
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../GradiantColors/colors";
import globalStyles from "../../../../GlobalStyles";

class MainForm extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      verified: false,
    };
  }
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam("source_action", null);
    const device_id = this.props.screenProps.device_id;
    const anonymous_userId = this.props.screenProps.anonymous_userId;

    analytics.track(`registration_detail`, {
      source,
      source_action,
      device_id,
      anonymous_userId,
      timestamp: new Date().getTime(),
      email: this.props.userInfo && this.props.userInfo.email,
    });
  }
  /**
   * Gets called whenever a user presses on an invite registeration deep link
   */
  handleBusinessInvite = () => {
    if (this.props.navigation.getParam("b", null) === "0") {
      this.setState({
        businessInvite: this.props.navigation.getParam("b", null),
        tempId: this.props.navigation.getParam("v", null),
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

    return (
      <View
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

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
                <Badge style={styles.activeBadege}>
                  <Text style={styles.activeBadegeText}>{translate("1")}</Text>
                </Badge>
                <Text style={styles.activeTitleText}>
                  {translate("Details")}
                </Text>
              </View>

              <View
                style={[
                  styles.dash,
                  {
                    marginRight: -4,
                    marginLeft: -4,
                  },
                ]}
              />
              <View style={styles.badgeView}>
                <Badge style={styles.badge}>
                  <Text style={styles.badgeText}>{translate("2")}</Text>
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
            </View>
          </View>
          {content}
        </Container>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  verificationCode: state.register.verificationCode,
  successNo: state.register.successNo,
  successEmail: state.register.successEmail,
  verified: state.register.verified,
  registered: state.register.registered,
  userInfo: state.register.userInfo,
  successPersonalInfo: state.register.successPersonalInfo,
});

const mapDispatchToProps = (dispatch) => ({
  resetRegister: () => dispatch(actionCreators.resetRegister()),
  getTempUserInfo: (tempId) => dispatch(actionCreators.getTempUserInfo(tempId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
