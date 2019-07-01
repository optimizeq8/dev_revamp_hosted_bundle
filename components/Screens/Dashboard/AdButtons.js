import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";

//styles
import styles from "./styles";
export default class AdButtons extends Component {
  render() {
    let ad = this.props.ad;
    return (
      <View
        style={{
          flexDirection: "column"
        }}
      >
        <Button
          style={styles.snapAd}
          onPress={() => {
            this.props.navigationHandler(ad);
          }}
        >
          {ad.icon}
        </Button>
        <Text style={[styles.adButtonText, styles.newCampaignTitle]}>
          {ad.title}
        </Text>
      </View>
    );
  }
}
