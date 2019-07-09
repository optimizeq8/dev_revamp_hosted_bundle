import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default class AttachmentCard extends Component {
  render() {
    let { value, label, icon, info } = this.props.opt;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState(
            {
              selected: value,
              sidemenustate: true
            },
            () => {
              Segment.trackWithProperties("Selected Traffic Website Swipeup", {
                category: "Campaign Creation",
                label: "Traffic Objective"
              });
            }
          );
        }}
        style={[
          styles.buttonN,
          this.state.selected === value
            ? GlobalStyles.orangeBackgroundColor
            : GlobalStyles.transparentBackgroundColor
        ]}
      >
        <WebsiteIcon style={styles.icon} />
        <View style={styles.textcontainer}>
          <Text style={styles.titletext}>{label}</Text>
          <Text style={styles.subtext}>{info}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
