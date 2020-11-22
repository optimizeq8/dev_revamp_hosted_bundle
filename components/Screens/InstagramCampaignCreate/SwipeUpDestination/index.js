import React from "react";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

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
    let rejected = this.props.rejected;
    switch (
      rejected
        ? this.props.instaRejCampaign.objective
        : this.props.data.objective
    ) {
      case "BRAND_AWARENESS":
        listIndex = 0;
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
            toggleClickDestination={this.props.toggleClickDestination}
            rejected={rejected}
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
            toggleClickDestination={this.props.toggleClickDestination}
            rejected={rejected}
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
            toggleClickDestination={this.props.toggleClickDestination}
            rejected={rejected}
          />
        );
        break;
      case "APP_INSTALLS":
        listIndex = 3;
        content = (
          <InstaApp_Install
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
            toggleClickDestination={this.props.toggleClickDestination}
            rejected={rejected}
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
            toggleClickDestination={this.props.toggleClickDestination}
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
    return <View style={styles.safeAreaContainer}>{content}</View>;
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  instaRejCampaign: state.instagramAds.instaRejCampaign,
  adType: state.instagramAds.adType,
  admin: state.login.admin,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SwipeUpDestination);
