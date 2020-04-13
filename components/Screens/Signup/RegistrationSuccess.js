import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, View, I18nManager } from "react-native";
import * as Segment from "expo-analytics-segment";
import RegisterSuccess from "../../../assets/SVGs/RegisterSuccess";
import GreenCheckmark from "../../../assets/SVGs/GreenCheckmark";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import GradientButton from "../../MiniComponents/GradientButton";
import segmentEventTrack from "../../segmentEventTrack";
import styles from "./MainForm/styles";
import { AdjustEvent, Adjust } from "react-native-adjust";
import { connect } from "react-redux";

class RegistartionSuccess extends React.Component {
  componentDidMount() {
    Segment.screen("Registration Complete");
    let adjustRegiserTracker = new AdjustEvent("z1mpdo");
    this.props.userInfo &&
      adjustRegiserTracker.setCallbackId(this.props.userInfo.userid);
    Adjust.trackEvent(adjustRegiserTracker);
  }
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{
          top: "always",
          bottom: "never"
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
            onPressAction={() => {
              segmentEventTrack("Button Clicked to navigate to Dashboard");
              this.props.navigation.push("Dashboard");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, null)(RegistartionSuccess);
