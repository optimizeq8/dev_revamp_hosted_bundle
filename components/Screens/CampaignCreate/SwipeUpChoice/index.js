import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Content, Container, View, Text, Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
import * as Segment from "expo-analytics-segment";
import CustomeHeader from "../../../MiniComponents/Header";
import KeyBoardShift from "../../../MiniComponents/KeyboardShift";
import Website from "./Website";
import App_Install from "./App_Install";
import Long_Form_Video from "./Long_Form_Video";
import Deep_Link from "./Deep_Link";

// Style
import styles from "./styles";
import WhatsApp from "./WhatsApp";

//Redux
import { connect } from "react-redux";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { globalColors } from "../../../../GlobalStyles";
// import * as actionCreators from "../../../../store/actions";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    this.segment();
  }
  segment = () => {
    const source = this.props.screenProps.prevAppState;

    const source_action = this.props.screenProps.prevAppState;

    const campaign_ad_type = this.props.screenProps.prevAppState;

    switch (this.props.objective) {
      case "LEAD_GENERATION":
        analytics.track(`ad_swipe_up_destination`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          campaign_swipe_up_destination: "website",
          campaign_objective: this.props.objective,
          campaign_channel: "snapchat",
          campaign_ad_type,
        });
        // Segment.trackWithProperties(
        //   "Selected Lead Generation Website Swipeup",
        //   {
        //     category: "Campaign Creation"
        //   }
        // );
        break;
      case "VIDEO_VIEWS":
        Segment.screenWithProperties("Snap Ad Video Views SwipeUp", {
          category: "Campaign Creation",
          channel: "snapchat",
          label: "Video Views Objective",
        });
        analytics.track(`ad_swipe_up_destination`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          campaign_swipe_up_destination: "video_views",
          campaign_objective: this.props.objective,
          campaign_channel: "snapchat",
          campaign_ad_type,
        });
        break;
      case "WEB_CONVERSION":
        analytics.track(`ad_swipe_up_destination`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          campaign_swipe_up_destination: "sme_growth",
          campaign_objective: this.props.objective,
          campaign_channel: "snapchat",
          campaign_ad_type,
        });
        break;
      default:
        Segment.screenWithProperties("Snap Ad App Install SwipeUp", {
          category: "Campaign Creation",
          channel: "snapchat",
          label: "App Install Objective",
        });
        analytics.track(`ad_swipe_up_destination`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          campaign_swipe_up_destination: "app_install",
          campaign_objective: this.props.objective,
          campaign_channel: "snapchat",
          campaign_ad_type,
        });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    let objective = this.props.objective;
    let _changeDestination = this.props._changeDestination;
    console.log("objective", objective);

    let menu = <View />;
    if (this.props.adType === "CollectionAd") {
      switch (this.props.collectionAdLinkForm) {
        case 1: {
          menu = (
            <>
              <NavigationEvents onDidFocus={this.segment} />
              <Website
                objective={objective}
                _changeDestination={_changeDestination}
                navigation={this.props.navigation}
                // toggleSideMenu={this.toggleSideMenu}
                screenProps={this.props.screenProps}
                toggle={this.props.toggle}
                //   swipeUpDestination={true}
              />
            </>
          );
          break;
        }
        case 2: {
          menu = (
            <>
              <NavigationEvents onDidFocus={this.segment} />
              <Deep_Link
                objective={objective}
                _changeDestination={_changeDestination}
                navigation={this.props.navigation}
                // toggleSideMenu={this.toggleSideMenu}
                screenProps={this.props.screenProps}
                toggle={this.props.toggle}
                //   swipeUpDestination={true}
              />
            </>
          );
          break;
        }
      }
    } else {
      if (objective === "LEAD_GENERATION" || objective === "WEBSITE_TRAFFIC")
        menu = (
          <Website
            objective={objective}
            _changeDestination={_changeDestination}
            navigation={this.props.navigation}
            collectionAdLinkForm={this.props.collectionAdLinkForm}
            screenProps={this.props.screenProps}
            toggle={this.props.toggle}
          />
        );
      else if (objective === "VIDEO_VIEWS") {
        menu = (
          <>
            <NavigationEvents onDidFocus={this.segment} />
            <Long_Form_Video
              _changeDestination={_changeDestination}
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
              toggle={this.props.toggle}
            />
          </>
        );
      } else if (objective.toLowerCase() === "app_installs") {
        menu = (
          <>
            <NavigationEvents onDidFocus={this.segment} />
            <App_Install
              _changeDestination={_changeDestination}
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
              toggle={this.props.toggle}
            />
          </>
        );
      } else if (objective.toLowerCase() === "app_traffic") {
        menu = (
          <>
            <NavigationEvents onDidFocus={this.segment} />
            <Deep_Link
              _changeDestination={_changeDestination}
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
              toggle={this.props.toggle}
            />
          </>
        );
      } else if (objective === "WEB_CONVERSION") {
        menu = (
          <>
            <NavigationEvents onDidFocus={this.segment} />
            <WhatsApp
              _changeDestination={_changeDestination}
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
              toggle={this.props.toggle}
            />
          </>
        );
      }
    }

    // if (this.props.adType === "CollectionAd") return menu;
    // else
    return (
      <View style={styles.safeAreaContainer}>
        {/* <SafeAreaView
            // style={{ backgroundColor: "#fff" }}
            forceInset={{ top: "always" }}
          /> */}
        <NavigationEvents onDidFocus={this.segment} />

        {/* <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            navigation={this.props.navigation}
            segment={{
              source: "ad_swipe_up_destination",
              source_action: "a_go_back",
            }}
            icon="snapchat"
            adType={this.props.adType}
            currentScreen="Compose"
            title={"Swipe Up destination"}
          /> */}
        {/* <CustomeHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            screenProps={this.props.screenProps}
            title={"Swipe Up destination"}
            navigation={this.props.navigation}
          /> */}
        <View style={{ flex: 1 }}>{menu}</View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType,
});

export default connect(mapStateToProps, null)(SwipeUpChoice);
