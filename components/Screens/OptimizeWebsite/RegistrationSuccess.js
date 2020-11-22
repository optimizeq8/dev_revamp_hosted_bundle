import React from "react";
import SafeAreaView from "react-native-safe-area-view";

import { Text, Clipboard, TouchableOpacity, ScrollView } from "react-native";
import analytics from "@segment/analytics-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import GradientButton from "../../MiniComponents/GradientButton";
import styles from "./styles";

//Redux
import { connect } from "react-redux";

// Icons
import Award from "../../../assets/SVGs/award";
import GreenCheckmark from "../../../assets/SVGs/GreenCheckmark";

class WebsiteRegistartionSuccess extends React.Component {
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`my_website_success_registration`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
  }
  goToMyWebsite = () => {
    analytics.track(`a_open_my_website`, {
      source: "my_website_success_registration",
      source_action: "a_open_my_website",
    });
    this.props.navigation.navigate("MyWebsite", {
      source: "my_website_success_registration",
      source_action: "a_open_my_website",
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    const mainBusiness = this.props.mainBusiness;

    return (
      <SafeAreaView
        forceInset={{
          top: "always",
          bottom: "never",
        }}
      >
        <ScrollView style={styles.mainView}>
          <GreenCheckmark
            width={widthPercentageToDP(20)}
            height={heightPercentageToDP(10)}
          />
          <Text style={styles.registerCompleteText}>
            {translate("YOUR WEBSITE IS READY!")}
          </Text>

          <Award style={styles.award} height={heightPercentageToDP(40)} />
          <Text style={styles.yourLinkText}>
            {translate("This is your link")}
          </Text>
          <TouchableOpacity
            style={styles.businessNameView}
            onPress={() => {
              analytics.track(`a_copy_my_website_url`, {
                source: "my_website_success_registration",
                source_action: "a_copy_my_website_url",
                weburl: mainBusiness.weburl,
              });
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
            onPressAction={this.goToMyWebsite}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});

export default connect(mapStateToProps, null)(WebsiteRegistartionSuccess);
