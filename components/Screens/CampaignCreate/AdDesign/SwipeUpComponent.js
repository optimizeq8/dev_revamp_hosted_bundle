import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";
import { Icon } from "native-base";
export default class SwipeUpComponent extends Component {
  render() {
    let {
      destination,
      attachment,
      collectionAdLinkForm,
      adType,
      objective,
      image
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.swipeUp,
          {
            top: adType === "CollectionAd" ? "76%" : "88%"
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
          } else {
            objective === "TRAFFIC"
              ? this.props.navigation.push("SwipeUpDestination", {
                  _changeDestination: this.props._changeDestination,
                  image: image
                })
              : this.props.navigation.navigate("SwipeUpChoice", {
                  _changeDestination: this.props._changeDestination,
                  objective: objective,
                  collectionAdLinkForm: collectionAdLinkForm
                });
          }
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.swipeUpText}>
            {(destination !== "BLANK" && destination !== "REMOTE_WEBPAGE") ||
            (destination === "COLLECTION" && collectionAdLinkForm === 2)
              ? destination
              : (destination === "REMOTE_WEBPAGE" &&
                  objective !== "WEB_CONVERSION") ||
                (destination === "COLLECTION" && collectionAdLinkForm === 1)
              ? "Website"
              : objective === "WEB_CONVERSION" && destination !== "BLANK"
              ? "WhatsApp Campaign"
              : "Swipe Up destination"}
          </Text>
          {objective !== "WEB_CONVERSION" &&
            [
              "REMOTE_WEBPAGE",
              "DEEP_LINK",
              "LEAD_GENERATION",
              "COLLECTION"
            ].includes(destination) && (
              <Text
                ellipsizeMode={"tail"}
                numberOfLines={1}
                style={[
                  styles.swipeUpText,
                  { fontSize: 12, width: 150, textAlign: "center" }
                ]}
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
          style={{ left: 10, color: "#fff" }}
        />
      </TouchableOpacity>
    );
  }
}
