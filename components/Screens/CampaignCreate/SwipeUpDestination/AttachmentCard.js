import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import globalStyles, { globalColors } from "../../../../GlobalStyles";

import styles from "./styles";
export default class AttachmentCard extends Component {
  render() {
    let { value, label, icon, info } = this.props.opt;
    const { translate } = this.props.screenProps;
    let CardIcon = icon;
    return (
      <TouchableOpacity
        onPress={() => this.props.handleChoice(value)}
        style={[
          styles.buttonN,
          this.props.selected === value
            ? { borderColor: globalColors.purple }
            : { borderColor: "#0000" },
        ]}
      >
        <CardIcon
          fill={globalColors.rum}
          width={30}
          stroke={globalColors.rum}
          height={30}
          style={styles.icon}
        />
        <View style={styles.textcontainer}>
          <Text style={styles.titletext}>{translate(label)}</Text>
          <Text style={styles.subtext}>{translate(info)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
