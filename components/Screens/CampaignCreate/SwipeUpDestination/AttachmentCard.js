import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import globalStyles, { globalColors } from "../../../../GlobalStyles";

import styles from "./styles";
export default class AttachmentCard extends Component {
  render() {
    let { value, label, icon, info } = this.props.opt;
    let CardIcon = icon;
    return (
      <TouchableOpacity
        onPress={() => this.props.handleChoice(value)}
        style={[
          styles.buttonN,
          this.props.selected === value
            ? globalStyles.orangeBackgroundColor
            : globalStyles.transparentBackgroundColor
        ]}
      >
        <CardIcon
          fill={globalColors.white}
          width={30}
          height={30}
          style={styles.icon}
        />
        <View style={styles.textcontainer}>
          <Text style={styles.titletext}>{label}</Text>
          <Text style={styles.subtext}>{info}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
