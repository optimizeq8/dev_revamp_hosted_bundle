import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";
import segmentEventTrack from "../../segmentEventTrack";

export default class AppCard extends Component {
  render() {
    let {
      item,
      attachment,
      appChoice,
      _getIosAppIds,
      _getAndroidAppIds,
      AppError,
      handleAppError,
      showConfirmBtn,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          showConfirmBtn(true);
          segmentEventTrack(
            `Selected App for ${appChoice === "iOS" ? "iOS" : "Android"}`,
            {
              campaign_app_name: item.name,
              campaign_app_id: item.unique_id,
            }
          );
          appChoice === "iOS" ? _getIosAppIds(item) : _getAndroidAppIds(item);
        }}
        style={[
          styles.campaignButton,
          {
            backgroundColor:
              attachment.ios_app_id === item.unique_id ||
              attachment.android_app_url ===
                item.unique_id.replace("/store/apps/details?id=", "")
                ? "#FF9D00"
                : "transparent",
          },
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
                uri: item.icon_url,
              }}
            />
          </View>
          <Text style={[styles.listText]}>{item.name}</Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}