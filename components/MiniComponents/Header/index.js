import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import styles from "./styles";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import CloseIcon from "../../../assets/SVGs/Close.svg";
import * as Segment from "expo-analytics-segment";
import isUndefined from "lodash/isUndefined";

export default class Header extends Component {
  render() {
    let {
      segment,
      title,
      navigation,
      closeButton,
      selectedCampaign,
      actionButton,
      campaignEnded
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (!isUndefined(segment))
              Segment.trackWithProperties(segment.str, segment.obj);
            if (!isUndefined(navigation)) navigation.goBack();
            else actionButton();
          }}
          style={styles.left}
        >
          {closeButton ? (
            <CloseIcon width={17} height={17} />
          ) : (
            <BackIcon width={24} height={24} />
          )}
        </TouchableOpacity>
        <Text uppercase style={styles.title}>
          {title}
        </Text>
        <View style={[styles.right, selectedCampaign ? {} : { width: 24 }]}>
          {selectedCampaign &&
          (selectedCampaign.campaign_end === "0") &
            (new Date(selectedCampaign.end_time) > new Date()) &
            !campaignEnded ? (
            <Text
              onPress={() =>
                navigation.push("AdDetails", {
                  editCampaign: true,
                  campaign: selectedCampaign,
                  image: selectedCampaign.media
                })
              }
              style={styles.edit}
            >
              Edit
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
}
