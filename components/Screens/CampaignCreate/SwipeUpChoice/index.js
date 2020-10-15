import React, { Component } from "react";
import { NavigationEvents } from "react-navigation";
import { View } from "react-native";
import analytics from "@segment/analytics-react-native";
import Website from "./Website";
import App_Install from "./App_Install";
import Long_Form_Video from "./Long_Form_Video";
import Deep_Link from "./Deep_Link";
import Call from "./Call";

// Style
import styles from "./styles";
import WhatsApp from "./WhatsApp";

//Redux
import { connect } from "react-redux";
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
      case "ENGAGEMENT":
        analytics.track(`ad_swipe_up_destination`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          campaign_swipe_up_destination: "ad_to_call",
          campaign_objective: this.props.objective,
          campaign_channel: "snapchat",
          campaign_ad_type,
        });
        break;
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
        break;
      case "VIDEO_VIEWS":
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
    let savedObjective =
      this.props.rejCampaign &&
      this.props.rejCampaign.hasOwnProperty("savedObjective")
        ? this.props.rejCampaign.savedObjective
        : this.props.savedObjective;
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
      if (
        objective === "LEAD_GENERATION" ||
        savedObjective === "WEBSITE_TRAFFIC"
      )
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
      } else if (savedObjective.toLowerCase() === "app_traffic") {
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
      } else if (objective === "ENGAGEMENT") {
        menu = (
          <>
            <NavigationEvents onDidFocus={this.segment} />
            <Call
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
  savedObjective: state.campaignC.savedObjective,
  rejCampaign: state.dashboard.rejCampaign,
});

export default connect(mapStateToProps, null)(SwipeUpChoice);
