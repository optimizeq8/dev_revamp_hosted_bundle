import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

import Header from "../../../MiniComponents/Header";
import Website from "./Website";
import styles from "../styles/swipeUpDestination.styles";

class SwipeUpDestination extends React.Component {
  getSwipeUpDestination = () => {
    console.log("data", this.props.data);
  };
  render() {
    this.getSwipeUpDestination();
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
          // segment={
          //   {
          //     // str: "Instagram Feed Ad Objective Back Button",
          //     // obj: { businessname: this.props.mainBusiness.businessname }
          //   }
          // }
          navigation={this.props.navigation}
          title={"Swipe Up destination"}
        />
        <Website
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
        />
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
