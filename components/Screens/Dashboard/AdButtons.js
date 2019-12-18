import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";

//styles
import styles from "./styles";
export default class AdButtons extends Component {
  render() {
    let ad = this.props.ad;
    let SnapIcon = ad.icon;
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
          <SnapIcon style={{}} width={30} height={30} />
        </Button>
        <Text style={[styles.adButtonText, styles.newCampaignTitle]}>
          {this.props.translate(ad.title)}
        </Text>
      </View>
    );
  }
}
