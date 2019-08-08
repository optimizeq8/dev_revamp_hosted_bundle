import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";

export default class AppCard extends Component {
  render() {
    let {
      item,
      attachment,
      choice,
      _getIosAppIds,
      _getAndroidAppIds,
      _handleBothOS,
      AppError,
      handleAppError
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          choice !== ""
            ? choice === "iOS"
              ? _getIosAppIds(item)
              : _getAndroidAppIds(item)
            : _handleBothOS(item)
        }
        style={[
          styles.campaignButton,
          {
            backgroundColor:
              attachment.ios_app_id === item.id ||
              attachment.android_app_url ===
                (item.id ? item.id : item.application_id)
                ? "#FF9D00"
                : "transparent"
          }
        ]}
      >
        <Animatable.View
          duration={200}
          easing={"ease"}
          animation={!AppError ? "" : "shake"}
          onAnimationEnd={() => handleAppError()}
          style={styles.animateView2}
        >
          <View style={[styles.media, styles.optionsRowView]}>
            <Image
              style={[styles.media, styles.listImage]}
              source={{
                uri: item.icon
              }}
            />
          </View>
          <Text style={[styles.listText]}>{item.title}</Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}
