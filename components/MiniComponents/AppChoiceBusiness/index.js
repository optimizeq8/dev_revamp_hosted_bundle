import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon";
import Toggle from "../Toggle";

import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon";

import appConfirmStyles from "../AppConfirm/styles";
import globalStyles from "../../../GlobalStyles";
import { Text } from "native-base";
import styles from "./styles";
export default class AppChoiceBusiness extends Component {
  render() {
    let { setModalVisible, playstorelink, appstorelink } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.advertiseOSButtonView}>
        <TouchableOpacity
          onPress={() => setModalVisible(true, "iOS")}
          style={[globalStyles.column, styles.appStoreButtons]}
        >
          <AppStoreIcon />
          <Text uppercase style={appConfirmStyles.appStoreButtonsText}>
            {translate(`apple\napp store`)}
          </Text>
          <Text style={styles.appStyle}>
            {appstorelink.app_name + "\n" + "id: " + appstorelink.ios_app_id}
          </Text>
          <Toggle
            switchOn={appstorelink && appstorelink.ios_app_id !== ""}
            backgroundColorOff="rgba(255,255,255,0.1)"
            backgroundColorOn="rgba(255,255,255,0.1)"
            circleColorOff="#FFf"
            circleColorOn="#66D072"
            onPress={() => setModalVisible(true, "iOS")}
            duration={500}
            circleStyle={appConfirmStyles.toggleCircle}
            containerStyle={appConfirmStyles.toggleStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true, "ANDROID")}
          style={[globalStyles.column, styles.appStoreButtons]}
        >
          <PlayStoreIcon />
          <Text uppercase style={appConfirmStyles.appStoreButtonsText}>
            {translate(`google\nplay store`)}
          </Text>
          <Text style={styles.appStyle}>
            {playstorelink.app_name +
              "\n" +
              "id:" +
              playstorelink.android_app_url}
          </Text>

          <Toggle
            switchOn={playstorelink && playstorelink.android_app_url !== ""}
            backgroundColorOff="rgba(255,255,255,0.1)"
            backgroundColorOn="rgba(255,255,255,0.1)"
            circleColorOff="#FFf"
            circleColorOn="#66D072"
            duration={500}
            onPress={() => setModalVisible(true, "ANDROID")}
            circleStyle={appConfirmStyles.toggleCircle}
            containerStyle={appConfirmStyles.toggleStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
