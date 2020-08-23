import React, { Component } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon";
import Toggle from "../Toggle";

import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon";

import appConfirmStyles from "../AppConfirm/styles";
import globalStyles from "../../../GlobalStyles";
import { Text } from "native-base";
import styles from "./styles";
export default class AppChoiceBusiness extends Component {
  state = {
    fadeIOSLogo: new Animated.Value(1),
    fadeAndroidLogo: new Animated.Value(1),
  };

  handleAndroidAppSelection = () => {
    let {
      setModalVisible,
      playstorelink,
      toggleAppSelection,
      appSelections,
    } = this.props;
    if (playstorelink && playstorelink.android_app_url === "")
      setModalVisible(true, "ANDROID");
    else {
      Animated.timing(this.state.fadeAndroidLogo, {
        toValue: !appSelections.androidAppSelected ? 1 : 0.5,
        useNativeDriver: true,
      }).start();
      toggleAppSelection(true);
    }
  };
  handleIOSAppSelection = () => {
    let {
      setModalVisible,
      appstorelink,
      toggleAppSelection,
      appSelections,
    } = this.props;
    if (appstorelink && appstorelink.ios_app_id === "")
      setModalVisible(true, "iOS");
    else {
      Animated.timing(this.state.fadeIOSLogo, {
        toValue: !appSelections.iosAppSelected ? 1 : 0.5,
        useNativeDriver: true,
      }).start();
      toggleAppSelection(false);
    }
  };
  render() {
    let {
      setModalVisible,
      playstorelink,
      appstorelink,
      appSelections,
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.advertiseOSButtonView}>
        <TouchableOpacity
          onPress={() => setModalVisible(true, "iOS")}
          style={[globalStyles.column, styles.appStoreButtons]}
        >
          <Animated.View style={{ opacity: this.state.fadeIOSLogo }}>
            <AppStoreIcon fill={"#FFF"} />
          </Animated.View>
          <Text
            uppercase
            style={[appConfirmStyles.appStoreButtonsText, { color: "#fff" }]}
          >
            {translate(`apple\napp store`)}
          </Text>
          <Text style={styles.appStyle}>
            {appstorelink &&
              appstorelink.app_name + "\n" + "id: " + appstorelink.ios_app_id}
          </Text>
          {/* iOSSwich */}
          <Toggle
            switchOn={
              appSelections.iosAppSelected &&
              appstorelink &&
              appstorelink.ios_app_id !== ""
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
          style={[globalStyles.column, styles.appStoreButtons]}
        >
          <Animated.View style={{ opacity: this.state.fadeAndroidLogo }}>
            <PlayStoreIcon />
          </Animated.View>
          <Text
            uppercase
            style={[appConfirmStyles.appStoreButtonsText, { color: "#fff" }]}
          >
            {translate(`google\nplay store`)}
          </Text>
          <Text style={styles.appStyle}>
            {playstorelink &&
              playstorelink.app_name +
                "\n" +
                "id:" +
                playstorelink.android_app_url}
          </Text>
          {/* Android switch */}
          <Toggle
            switchOn={
              appSelections.androidAppSelected &&
              playstorelink &&
              playstorelink.android_app_url !== ""
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
    );
  }
}
