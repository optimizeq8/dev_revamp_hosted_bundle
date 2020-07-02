import React from "react";
import { View } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

import Header from "../../../MiniComponents/Header";
import Website from "./Website";
import InstaApp_Install from "./InstaApp_Install";
import styles from "../styles/swipeUpDestination.styles";
import VideoViews from "./VideoViews";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";

class SwipeUpDestination extends React.Component {
  getSwipeUpDestination = () => {
    let listIndex = 0;
    let content = <></>;
    switch (this.props.data.objective) {
      case "BRAND_AWARENESS":
        listIndex = 0;
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
          />
        );
        break;
      case "LINK_CLICKS":
        listIndex = 1;
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
          />
        );
        break;
      case "LEAD_GENERATION":
        listIndex = 2;
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
          />
        );
        break;
      case "APP_INSTALLS":
        listIndex = 3;
        content = (
          <InstaApp_Install
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
          />
        );
        break;
      case "VIDEO_VIEWS":
        listIndex = 4;
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
          />
        );
        break;
      default:
        listIndex = 0;
        break;
    }
    return { content };
  };
  render() {
    const { content } = this.getSwipeUpDestination();
    return (
      <View style={styles.safeAreaContainer}>
        <SafeAreaView
          forceInset={{
            top: "always",
            bottom: "never",
          }}
          style={{ backgroundColor: "#fff" }}
        />
        <TopStepsHeader
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            source: "ad_swipe_up_destination",
            source_action: "a_go_back",
          }}
          icon="instagram"
          navigation={this.props.navigation}
          currentScreen="Compose"
          title={
            this.props.adType === "InstagramStoryAd"
              ? "Swipe Up destination"
              : "Click destination"
          }
        />
        {/* 
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            source: "ad_swipe_up_destination",
            source_action: "a_go_back",
          }}
          navigation={this.props.navigation}
          title={"Swipe Up destination"}
        /> */}
        <View style={{ top: 15 }}>{content}</View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  adType: state.instagramAds.adType,
  admin: state.login.admin,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SwipeUpDestination);
