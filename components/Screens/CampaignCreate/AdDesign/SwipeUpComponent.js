import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
import SnapObjective from "../../../Data/snapchatObjectives.data";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default class SwipeUpComponent extends Component {
  handleSwipeUp = () => {
    let {
      destination,
      collectionAdLinkForm,
      adType,
      objective,
      media,
    } = this.props;
    if (adType === "CollectionAd") {
      this.props.navigation.navigate("SwipeUpChoice", {
        _changeDestination: this.props._changeDestination,
        objective: objective,
        collectionAdLinkForm: collectionAdLinkForm,
        adType: adType,
        source: "ad_design",
        source_action: "a_swipe_up_destination",
      });
    } else if (adType === "StoryAd") {
      objective === "BRAND_AWARENESS"
        ? this.props.navigation.navigate("SwipeUpDestination", {
            _changeDestination: this.props._changeDestination,
            objective,
            adType,
            destination,
            media,
            source: "ad_design",
            source_action: "a_swipe_up_destination",
          })
        : this.props.navigation.navigate("SwipeUpChoice", {
            _changeDestination: this.props._changeDestination,
            objective,
            adType,
            collectionAdLinkForm,
            source: "ad_design",
            source_action: "a_swipe_up_destination",
          });
    } else {
      objective === "TRAFFIC"
        ? this.props.navigation.navigate("SwipeUpDestination", {
            _changeDestination: this.props._changeDestination,
            objective,
            adType,
            destination,
            media,
            source: "ad_design",
            source_action: "a_swipe_up_destination",
          })
        : this.props.navigation.navigate("SwipeUpChoice", {
            _changeDestination: this.props._changeDestination,
            objective,
            collectionAdLinkForm,
            source: "ad_design",
            source_action: "a_swipe_up_destination",
          });
    }
  };
  render() {
    let {
      destination,
      attachment,
      collectionAdLinkForm,
      adType,
      objective,
      media,
      selectedStoryAd,
      call_to_action_label,
      disabled,
    } = this.props;
    let SwipeIcon = SnapObjective[adType || "SnapAd"].find(
      (obj) => obj.value === (objective || "BRAND_AWARENESS")
    ).icon;

    selectedStoryAd = selectedStoryAd ? selectedStoryAd : {};
    const { translate } = this.props.screenProps;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.swipeUp,
          {
            marginBottom: adType === "CollectionAd" ? 110 : 10,
          },
        ]}
        onPress={this.handleSwipeUp}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "red",
            width: "90%",
            alignItems: "center",
          }}
        >
          <SwipeIcon
            width={widthPercentageToDP(10)}
            height={widthPercentageToDP(10)}
            fill="#000"
            stroke="#000"
          />
          <View style={styles.swipeUpView}>
            <Text style={[styles.swipeUpText, { fontSize: 12 }]}>
              {translate("swipe up settings")}
            </Text>
            <Text style={styles.swipeUpText}>
              {call_to_action_label &&
              call_to_action_label !== "BLANK" &&
              ((destination !== "BLANK" && destination !== "REMOTE_WEBPAGE") ||
                (destination === "COLLECTION" && collectionAdLinkForm === 2))
                ? translate(destination.replace("_", " ").toLowerCase())
                : (destination === "REMOTE_WEBPAGE" &&
                    objective !== "WEB_CONVERSION") ||
                  (destination === "COLLECTION" && collectionAdLinkForm === 1)
                ? translate("Website")
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
        </View>
        <Icon
          type="MaterialIcons"
          name="keyboard-arrow-down"
          fontSize={50}
          style={styles.downIcon}
        />
      </TouchableOpacity>
    );
  }
}
