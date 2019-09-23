import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon.svg";
// import Toggle from "react-native-switch-toggle";
import Toggle from "../Toggle";

import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon.svg";

import appConfirmStyles from "../AppConfirm/styles";
import globalStyles from "../../../GlobalStyles";
import { Text } from "native-base";
import styles from "./styles";
export default class AppBox extends Component {
  render() {
    let { setModalVisible, attachment } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View>
        <View style={[appConfirmStyles.appStoreLabelView]}>
          <Text uppercase style={[appConfirmStyles.inputLabel]}>
            Your app
          </Text>
        </View>
        <View style={appConfirmStyles.advertiseOSView}>
          <View style={appConfirmStyles.advertiseOSButtonView}>
            <TouchableOpacity
              onPress={() => setModalVisible(true, "iOS")}
              style={[globalStyles.column, appConfirmStyles.appStoreButtons]}
            >
              <AppStoreIcon />
              <Text uppercase style={appConfirmStyles.appStoreButtonsText}>
                {translate(`apple\n app store`)}
              </Text>
              <Text style={styles.appStyle}>{attachment.iosApp_name}</Text>
              <Toggle
                switchOn={attachment.ios_app_id !== ""}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                duration={500}
                circleStyle={appConfirmStyles.toggleCircle}
                containerStyle={appConfirmStyles.toggleStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true, "ANDROID")}
              style={[globalStyles.column, appConfirmStyles.appStoreButtons]}
            >
              <PlayStoreIcon />
              <Text uppercase style={appConfirmStyles.appStoreButtonsText}>
                {translate(`google \n play store`)}
              </Text>
              <Text style={styles.appStyle}>{attachment.androidApp_name}</Text>

              <Toggle
                switchOn={attachment.android_app_url !== ""}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                duration={500}
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
