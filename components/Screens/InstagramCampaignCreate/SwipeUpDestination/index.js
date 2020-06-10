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

class SwipeUpDestination extends React.Component {
  getSwipeUpDestination = () => {
    let listIndex = 0;
    switch (this.props.data.objective) {
      case "BRAND_AWARENESS":
        listIndex = 0;
        break;
      case "LEAD_GENERATION":
        listIndex = 2;
        break;
      case "LINK_CLICKS":
        listIndex = 1;
        break;
      case "APP_INSTALLS":
        listIndex = 3;
        break;
      default:
        listIndex = 0;
        break;
    }
    return { listIndex };
  };
  render() {
    const { listIndex } = this.getSwipeUpDestination();
    let { objective } = this.props.data;
    let content = <></>;
    switch (objective) {
      case "BRAND_AWARENESS":
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
          />
        );
        break;
      case "LINK_CLICKS":
        content = (
          <Website
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            listNum={listIndex}
          />
        );
        break;
      case "APP_INSTALLS":
        content = (
          <InstaApp_Install
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
          />
        );
        break;
      default:
        break;
    }

    return (
      <SafeAreaView
        forceInset={{
          top: "always",
          bottom: "never",
        }}
        style={styles.safeAreaContainer}
      >
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            source: "ad_swipe_up_destination",
            source_action: "a_go_back",
          }}
          navigation={this.props.navigation}
          title={"Swipe Up destination"}
        />
        {content}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  adType: state.instagramAds.adType,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  adType: state.instagramAds.adType,
  admin: state.login.admin,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SwipeUpDestination);
