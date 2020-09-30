import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import * as Updates from "expo-updates";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import analytics from "@segment/analytics-react-native";
//Redux
import { connect } from "react-redux";

// Style
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

class SwitchLanguageLoading extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.languageChangeLoading && !this.props.languageChangeLoading) {
      Updates.reloadAsync();
    }
  }
  onDidFocus = () => {
    analytics.track(`switch_language_loading`, {
      source: this.props.navigation.getParam(
        "source",
        this.props.screenProps.prevAppState
      ),
      source_action: this.props.navigation.getParam(
        "source_action",
        this.props.screenProps.prevAppState
      ),
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <View style={styles.loadingView}>
          <ActivityIndicator color={globalColors.orange} size="large" />
          <Text style={styles.loadingText}>
            {translate("Switching Language Please wait")} ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  languageChangeLoading: state.language.languageChangeLoading,
});

export default connect(mapStateToProps, null)(SwitchLanguageLoading);
