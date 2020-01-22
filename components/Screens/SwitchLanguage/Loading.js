import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import { Updates } from "expo";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";

//Redux
import { connect } from "react-redux";

// Style
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

class SwitchLanguageLoading extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.languageChangeLoading && !this.props.languageChangeLoading) {
      Updates.reloadFromCache();
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
            {translate("Switching Language Please wait")} ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  languageChangeLoading: state.language.languageChangeLoading
});

export default connect(mapStateToProps, null)(SwitchLanguageLoading);
