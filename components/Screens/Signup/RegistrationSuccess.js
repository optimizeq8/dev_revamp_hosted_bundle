import React from "react";
import SafeAreaView from "react-native-safe-area-view";

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
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";
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
    analytics.track("Screen Viewed", {
      screen_name: "RegistrationSuccess",
      source,
      source_action,
    });

    // let adjustRegiserTracker = new AdjustEvent("z1mpdo");
    // this.props.userInfo &&
    //   adjustRegiserTracker.setCallbackId(this.props.userInfo.userid);
    // Adjust.trackEvent(adjustRegiserTracker);
  }
  getStartedBtnAction = () => {
    analytics.track(`Button Pressed`, {
      source: "RegistrationSuccess",
      button_type: "Complete Registration",
      button_content: "GET STARTED",
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
        style={{ height: "100%" }}
        forceInset={{
          top: "always",
          bottom: "never",
        }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
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
  mainBusiness: state.account.mainBusiness,
});

export default connect(mapStateToProps, null)(RegistartionSuccess);
