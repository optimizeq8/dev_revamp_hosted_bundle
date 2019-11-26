import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
export default class SwipeUpComponent extends Component {
  render() {
    let {
      destination,
      attachment,
      collectionAdLinkForm,
      adType,
      objective,
      media,
      selectedStoryAd,
      call_to_action_label
    } = this.props;
    selectedStoryAd = selectedStoryAd ? selectedStoryAd : {};
    const { translate } = this.props.screenProps;
    return (
      <TouchableOpacity
        style={[
          styles.swipeUp,
          {
            bottom: 0,
            marginBottom: adType === "CollectionAd" ? 110 : 10
          }
        ]}
        onPress={() => {
          if (adType === "CollectionAd") {
            this.props.navigation.navigate("SwipeUpChoice", {
              _changeDestination: this.props._changeDestination,
              objective: objective,
              collectionAdLinkForm: collectionAdLinkForm,
              adType: adType
            });
          } else if (adType === "StoryAd") {
            objective === "BRAND_AWARENESS"
              ? this.props.navigation.push("SwipeUpDestination", {
                  _changeDestination: this.props._changeDestination,
                  objective,
                  adType,
                  destination,
                  media
                })
              : this.props.navigation.navigate("SwipeUpChoice", {
                  _changeDestination: this.props._changeDestination,
                  objective,
                  adType,
                  collectionAdLinkForm
                });
          } else {
            objective === "TRAFFIC"
              ? this.props.navigation.push("SwipeUpDestination", {
                  _changeDestination: this.props._changeDestination,
                  objective,
                  adType,
                  destination,
                  media
                })
              : this.props.navigation.navigate("SwipeUpChoice", {
                  _changeDestination: this.props._changeDestination,
                  objective,
                  collectionAdLinkForm
                });
          }
        }}
      >
        <View style={styles.swipeUpView}>
          <Text style={styles.swipeUpText}>
            {call_to_action_label &&
            call_to_action_label !== "BLANK" &&
            ((destination !== "BLANK" && destination !== "REMOTE_WEBPAGE") ||
              (destination === "COLLECTION" && collectionAdLinkForm === 2))
              ? translate(call_to_action_label)
              : (destination === "REMOTE_WEBPAGE" &&
                  objective !== "WEB_CONVERSION") ||
                (destination === "COLLECTION" && collectionAdLinkForm === 1)
              ? translate(call_to_action_label)
              : objective === "WEB_CONVERSION" &&
                call_to_action_label !== "BLANK" &&
                (destination !== "BLANK" ||
                  selectedStoryAd.destination !== "BLANK")
              ? translate("SME Growth")
              : translate("Swipe Up destination")}
          </Text>
          {objective !== "WEB_CONVERSION" &&
            ["REMOTE_WEBPAGE", "DEEP_LINK", "LEAD_GENERATION"].includes(
              destination
            ) && (
              <Text
                ellipsizeMode={"tail"}
                numberOfLines={1}
                style={[styles.swipeUpText, styles.swipeUpSubText]}
              >
                {attachment.hasOwnProperty("deep_link_uri")
                  ? attachment.deep_link_uri
                  : attachment.url}
              </Text>
            )}
        </View>
        <Icon
          type="MaterialIcons"
          name="arrow-drop-down"
          fontSize={50}
          style={styles.downIcon}
        />
      </TouchableOpacity>
    );
  }
}
