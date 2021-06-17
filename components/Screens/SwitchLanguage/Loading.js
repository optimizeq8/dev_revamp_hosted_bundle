import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import * as Updates from "expo-updates";
import { LinearGradient } from "expo-linear-gradient";

import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import RNRestart from "react-native-restart";
import analytics from "@segment/analytics-react-native";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";

class SwitchLanguageLoading extends Component {
  componentDidUpdate(prevProps) {
    console.log(
      "prevProps.languageChangeLoading",
      prevProps.languageChangeLoading
    );
    console.log(
      "this.props.languageChangeLoading",
      this.props.languageChangeLoading
    );
    if (prevProps.languageChangeLoading && !this.props.languageChangeLoading) {
      setTimeout(() => RNRestart.Restart(), 5000);
    }
  }
  onDidFocus = async () => {
    analytics.track(`switch_language_loading`, {
      source: this.props.navigation.getParam(
        "source",
        this.props.screenProps.prevAppState
      ),
      source_action: this.props.navigation.getParam(
        "source_action",
        this.props.screenProps.prevAppState
      ),
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    await this.props.getLanguageListPOEdit(
      this.props.appLanguage === "en" ? "ar" : "en"
    );
    this.props.screenProps.setLocale(this.props.appLanguage);
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <View style={styles.loadingView}>
          <ActivityIndicator color={globalColors.orange} size="large" />
          <Text
            style={[
              styles.loadingText,
              {
                fontFamily: isStringArabic(
                  translate("Switching Language Please wait")
                )
                  ? "montserrat-regular-arabic"
                  : "montserrat-regular-english",
              },
            ]}
          >
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
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  getLanguageListPOEdit: (language) =>
    dispatch(actionCreators.getLanguageListPOEdit(language)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchLanguageLoading);
