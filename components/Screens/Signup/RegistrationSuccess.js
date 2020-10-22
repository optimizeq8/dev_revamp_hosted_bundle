import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, View } from "react-native";
import analytics from "@segment/analytics-react-native";
import RegisterSuccess from "../../../assets/SVGs/RegisterSuccess";
import GreenCheckmark from "../../../assets/SVGs/GreenCheckmark";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import GradientButton from "../../MiniComponents/GradientButton";
import styles from "./MainForm/styles";
// import { AdjustEvent, Adjust } from "react-native-adjust";
import { connect } from "react-redux";

class RegistartionSuccess extends React.Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    const { userInfo } = this.props;

    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam("source_action", null);
    const device_id = this.props.screenProps.device_id;
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    analytics.track("success_registration", {
      source,
      source_action,
      device_id,
      anonymous_userId,
      timestamp: new Date().getTime(),
      userId: userInfo.userid,
      ...userInfo,
    });

    // let adjustRegiserTracker = new AdjustEvent("z1mpdo");
    // this.props.userInfo &&
    //   adjustRegiserTracker.setCallbackId(this.props.userInfo.userid);
    // Adjust.trackEvent(adjustRegiserTracker);
  }
  getStartedBtnAction = () => {
    const device_id = this.props.screenProps.device_id;
    const anonymous_userId = this.props.screenProps.anonymous_userId;
    analytics.track(`a_get_start_dashboard`, {
      source: "success_registration",
      timestamp: new Date().getTime(),
      userId: this.props.userInfo.userid,
      device_id,
      anonymous_userId,
    });
    this.props.navigation.navigate("Dashboard", {
      source: "success_registration",
      source_action: "a_get_start_dashboard",
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{
          top: "always",
          bottom: "never",
        }}
      >
        <View style={styles.mainView}>
          <GreenCheckmark
            width={widthPercentageToDP(20)}
            height={heightPercentageToDP(10)}
          />
          <Text style={styles.registerCompleteText}>
            {translate("REGISTRATION COMPLETE!")}
          </Text>
          <Text style={styles.successText}>
            {translate("Your journey to success begins now!")}
          </Text>

          <RegisterSuccess style={styles.registerSuccessIcon} />
          <GradientButton
            style={styles.getStartedBtn}
            radius={50}
            textStyle={styles.getStartedText}
            text={translate("Get Started!")}
            uppercase
            onPressAction={this.getStartedBtnAction}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
});

export default connect(mapStateToProps, null)(RegistartionSuccess);
