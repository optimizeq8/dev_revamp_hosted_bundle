import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";
import { Icon } from "native-base";
export default class SwipeUpComponent extends Component {
  render() {
    let { destination, attachment } = this.props;
    return (
      <TouchableOpacity
        style={styles.swipeUp}
        onPress={() => {
          this.props.objective.toLowerCase() === "traffic"
            ? this.props.navigation.push("SwipeUpDestination", {
                _changeDestination: this.props._changeDestination,
                image: this.props.image
              })
            : this.props.navigation.navigate("SwipeUpChoice", {
                _changeDestination: this.props._changeDestination,
                objective: this.props.objective
              });
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.swipeUpText}>
            {destination !== "BLANK" && destination !== "REMOTE_WEBPAGE"
              ? destination
              : destination === "REMOTE_WEBPAGE"
              ? "Website"
              : "Swipe Up destination"}
          </Text>
          {["REMOTE_WEBPAGE", "DEEP_LINK", "LEAD_GENERATION"].includes(
            destination
          ) && (
            <Text style={[styles.swipeUpText, { fontSize: 12 }]}>
              {attachment.hasOwnProperty("deep_link_uri")
                ? attachment.deep_link_uri
                : attachment.url}
            </Text>
          )}
        </View>
        <Icon
          type="MaterialIcons"
          name="arrow-drop-down"
          style={{ left: 15, color: "#fff" }}
        />
      </TouchableOpacity>
    );
  }
}
