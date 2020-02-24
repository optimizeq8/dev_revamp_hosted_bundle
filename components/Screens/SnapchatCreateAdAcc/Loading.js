import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";
import * as Segment from "expo-analytics-segment";
//Redux
import { connect } from "react-redux";

// Style
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

class AcceptTermsConditionLoading extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.mainBusiness.snap_ad_account_id) {
      this.props.navigation.navigate("Dashboard");
    }
  }

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.track("Accept Term and Condition Loading");
          }}
        />
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

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  loading: state.account.loading
});

export default connect(mapStateToProps, null)(AcceptTermsConditionLoading);
