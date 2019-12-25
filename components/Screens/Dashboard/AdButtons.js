import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";

//styles
import styles from "./styles";
export default class AdButtons extends Component {
  render() {
    let ad = this.props.ad;
    let AdIcon = ad.icon;
    let ChannelIcon = ad.channelIcon;
    return (
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "#0000"
        }}
      >
        <Button
          style={styles.snapAd}
          onPress={() => {
            this.props.navigationHandler(ad);
          }}
        >
          <AdIcon
            style={{}}
            width={ad.mediaType === "google" ? 20 : 30}
            height={ad.mediaType === "google" ? 20 : 30}
            stroke="#fff"
          />
          {ChannelIcon && (
            <ChannelIcon
              width={60}
              height={60}
              style={{ position: "absolute", top: -20, left: -20 }}
              fill="#0000"
            />
          )}
        </Button>
        <Text style={[styles.adButtonText, styles.newCampaignTitle]}>
          {this.props.translate(ad.title)}
        </Text>
      </View>
    );
  }
}
