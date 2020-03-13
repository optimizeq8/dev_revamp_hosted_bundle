import React, { Component } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon";
// import Toggle from "react-native-switch-toggle";
import Toggle from "../Toggle";

import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon";

import appConfirmStyles from "../AppConfirm/styles";
import globalStyles from "../../../GlobalStyles";
import { Text, Icon } from "native-base";
import styles from "./styles";
export default class AppBox extends Component {
  state = {
    fadeIOSLogo: new Animated.Value(1),
    fadeAndroidLogo: new Animated.Value(1)
  };

  /**
   * toggles the selection of the app if there's an app, else opens the app search moda;
   */
  handleIOSAppSelection = () => {
    let {
      setModalVisible,
      appstorelink,
      toggleAppSelection,
      appSelections
    } = this.props;
    if (
      this.props.iosApp_name === "" ||
      (this.props.iosApp_name === "" &&
        appstorelink &&
        appstorelink.ios_app_id === "")
    )
      setModalVisible(true, "iOS");
    else {
      Animated.timing(this.state.fadeIOSLogo, {
        toValue: !appSelections.iosAppSelected ? 1 : 0.5,
        useNativeDriver: true
      }).start();
      toggleAppSelection(false);
    }
  };
  handleAndroidAppSelection = () => {
    let {
      setModalVisible,
      playstorelink,
      toggleAppSelection,
      appSelections
    } = this.props;
    if (
      this.props.androidApp_name === "" ||
      (this.props.androidApp_name === "" &&
        playstorelink &&
        playstorelink.android_app_url === "")
    )
      setModalVisible(true, "ANDROID");
    else {
      Animated.timing(this.state.fadeAndroidLogo, {
        toValue: !appSelections.androidAppSelected ? 1 : 0.5,
        useNativeDriver: true
      }).start();
      toggleAppSelection(true);
    }
  };
  render() {
    console.log(this.props.iosApp_name);

    let {
      setModalVisible,
      attachment,
      iosApp_name,
      androidApp_name,
      appSelections
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View>
        <View style={[appConfirmStyles.appStoreLabelView]}>
          <Text uppercase style={[appConfirmStyles.inputLabel]}>
            {translate("Your app")}
          </Text>
        </View>
        <View style={appConfirmStyles.advertiseOSView}>
          <View style={appConfirmStyles.advertiseOSButtonView}>
            <TouchableOpacity
              onPress={() => setModalVisible(true, "iOS")}
              style={[globalStyles.column, appConfirmStyles.appStoreButtons]}
            >
              <Animated.View style={{ opacity: this.state.fadeIOSLogo }}>
                <AppStoreIcon />
              </Animated.View>
              <Text uppercase style={appConfirmStyles.appStoreButtonsText}>
                {translate(`apple\napp store`)}
              </Text>
              <Text style={styles.appStyle}>
                {iosApp_name +
                  "\n" +
                  (attachment.ios_app_id && "id: " + attachment.ios_app_id)}
              </Text>
              <Toggle
                switchOn={
                  appSelections.iosAppSelected && attachment.ios_app_id !== ""
                }
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                onPress={this.handleIOSAppSelection}
                duration={500}
                circleStyle={appConfirmStyles.toggleCircle}
                containerStyle={appConfirmStyles.toggleStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true, "ANDROID")}
              style={[globalStyles.column, appConfirmStyles.appStoreButtons]}
            >
              <Animated.View style={{ opacity: this.state.fadeAndroidLogo }}>
                <PlayStoreIcon />
              </Animated.View>

              <Text uppercase style={appConfirmStyles.appStoreButtonsText}>
                {translate(`google\nplay store`)}
              </Text>
              <Text style={styles.appStyle}>
                {androidApp_name +
                  "\n" +
                  (attachment.android_app_url &&
                    "id: " + attachment.android_app_url)}
              </Text>

              <Toggle
                switchOn={
                  appSelections.androidAppSelected &&
                  attachment.android_app_url !== ""
                }
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                duration={500}
                onPress={this.handleAndroidAppSelection}
                circleStyle={appConfirmStyles.toggleCircle}
                containerStyle={appConfirmStyles.toggleStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
