import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, View, Clipboard, TouchableOpacity } from "react-native";
import * as Segment from "expo-analytics-segment";

import GreenCheckmark from "../../../assets/SVGs/GreenCheckmark";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import GradientButton from "../../MiniComponents/GradientButton";
import segmentEventTrack from "../../segmentEventTrack";
import styles from "./styles";

//Redux
import { connect } from "react-redux";

// Icons
import Award from "../../../assets/SVGs/award";
class WebsiteRegistartionSuccess extends React.Component {
  componentDidMount() {
    Segment.screen("Website Registartion Complete");
  }
  render() {
    const { translate } = this.props.screenProps;
    const mainBusiness = this.props.mainBusiness;

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
            {translate("YOUR WEBSITE IS READY!")}
          </Text>

          <Award />
          <Text style={styles.yourLinkText}>
            {translate("This is your link")}
          </Text>
          <TouchableOpacity
            style={styles.businessNameView}
            onPress={() => {
              Clipboard.setString(mainBusiness.weburl);
            }}
          >
            <Text selectable style={styles.websiteUrl}>
              {mainBusiness.weburl}
            </Text>
            <Text style={styles.tapCopyText}>{translate("Tap to copy")}</Text>
          </TouchableOpacity>
          <GradientButton
            style={styles.getStartedBtn}
            radius={50}
            textStyle={styles.getStartedText}
            text={"Take me to my website settings"}
            onPressAction={() => {
              segmentEventTrack("Button Clicked to navigate to MyWebsite");
              this.props.navigation.navigate("MyWebsite");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness
});

export default connect(mapStateToProps, null)(WebsiteRegistartionSuccess);
