import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import * as Updates from "expo-updates";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import analytics from "@segment/analytics-react-native";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Style
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

class SwitchLanguageLoading extends Component {
  async componentDidMount() {
    await this.props.getLanguageListPOEdit(
      this.props.appLanguage === "en" ? "ar" : "en"
    );
    this.props.screenProps.setLocale(this.props.appLanguage);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.terms !== this.props.terms) {
      Updates.reloadAsync().catch((err) => console.log(err));
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
  appLanguage: state.language.phoneLanguage,
  terms: state.language.terms,
});

const mapDispatchToProps = (dispatch) => ({
  getLanguageListPOEdit: (language) =>
    dispatch(actionCreators.getLanguageListPOEdit(language)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchLanguageLoading);
