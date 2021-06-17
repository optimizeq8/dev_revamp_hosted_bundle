import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import analytics from "@segment/analytics-react-native";
//Redux
import { connect } from "react-redux";

// Style
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

class AcceptTermsConditionLoading extends Component {
  state = { snap_ad_account_id: "" };
  componentDidMount() {
    this.setState({
      snap_ad_account_id: this.props.mainBusiness.snap_ad_account_id,
    });
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    analytics.track(`ad_TNC_loading`, {
      source,
      source_action,
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
      businessid: this.props.mainBusiness.businessid,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.snap_ad_account_id !==
        this.props.mainBusiness.snap_ad_account_id &&
      this.props.mainBusiness.snap_ad_account_id
    ) {
      this.setState({
        snap_ad_account_id: this.props.mainBusiness.snap_ad_account_id,
      });
      this.props.navigation.navigate("AdObjective", {
        source: "ad_TNC_loading",
        source_action: "a_accept_ad_TNC",
      });
    }
  }

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <View style={styles.loadingView}>
          <ActivityIndicator color={globalColors.orange} size="large" />
          <Text style={styles.loadingText}>
            {translate("Please wait while we get Snapchat ready")} ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  loading: state.account.loading,
  adType: state.campaignC.adType,
});

export default connect(mapStateToProps, null)(AcceptTermsConditionLoading);
