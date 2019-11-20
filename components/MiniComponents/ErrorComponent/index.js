import React, { Component } from "react";
import { View, Image, BackHandler } from "react-native";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text } from "native-base";
import { SafeAreaView } from "react-navigation";

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles, { colors } from "./styles";

// Icons
import ErrorIcon from "../../../assets/SVGs/Error";

import LoadingScreen from "../LoadingScreen";
import GradientButton from "../GradientButton";

const imageLogo = require("../../../assets/images/logo01.png");

class ErrorComponent extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      logoImage: require("../../../assets/images/logo01.png")
    };
  }

  componentDidMount() {
    Segment.screen("Error");
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }
  // handleBackButton() {
  //   return true;
  // }
  render() {
    const { translate } = this.props.screenProps;
    if (this.props.loading) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    }
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", bottom: "never" }}
      >
        <LinearGradient
          colors={["#6200FF", "#8900FF"]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <Image style={styles.media} source={imageLogo} resizeMode="contain" />
        <View style={styles.view}>
          <ErrorIcon fill="#ea514b" width={80} height={80} />

          <Text style={styles.title}>{translate("Sorry")}</Text>
          <Text style={styles.errortext}>
            {translate(
              "Oops ! There seems to be a problem\nTry again in sometime"
            )}
            .
          </Text>
          <GradientButton
            style={styles.button}
            onPressAction={() => {
              this.props.dashboard
                ? this.props.userInfo
                  ? this.props.clearPushToken(
                      this.props.navigation,
                      this.props.userInfo.userid
                    )
                  : this.props.logout(this.props.navigation)
                : this.props.navigation.goBack();
            }}
            textStyle={styles.buttontext}
            text={
              this.props.dashboard ? translate("Sign in") : translate("Go Back")
            }
            uppercase={true}
          />
          <GradientButton
            transparent={true}
            style={styles.whitebutton}
            onPressAction={() => {
              this.props.dashboard
                ? this.props.navigation.navigate("AppUpdateChecker")
                : this.props.navigation.navigate("Dashboard");
            }}
            textStyle={styles.whitebuttontext}
            text={
              this.props.dashboard ? translate("Reload") : translate("Home")
            }
            uppercase={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});
const mapDispatchToProps = dispatch => ({
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  logout: nav => dispatch(actionCreators.logout(nav))
});
export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
