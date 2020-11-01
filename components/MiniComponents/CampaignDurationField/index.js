import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
export default class CampaignDuration extends Component {
  render() {
    const { translate } = this.props.screenProps;
    const { disabled } = this.props;

    return (
      <View style={styles.durationContainer}>
        <Icon type="AntDesign" name="clockcircleo" style={{ color: "#fff" }} />
        <View style={styles.durationContent}>
          <Text style={styles.durationLabel}>{translate("Duration")}</Text>
          <Text style={[styles.durationData]}>
            {this.props.duration}{" "}
            <Text
              style={[
                styles.durationData,
                { fontSize: 10, fontFamily: "montserrat-bold" },
              ]}
            >
              {this.props.duration > 1 ? translate("days") : translate("day")}
            </Text>
          </Text>
          <View style={styles.durationButtons}>
            <TouchableOpacity
              disabled={this.props.disabled}
              activeOpacity={0.8}
              onPressOut={() => this.props.stopTimer()}
              onLongPress={() => this.props.handleDuration(true)}
              onPress={() => this.props.handleDuration(true, true)}
              delayLongPress={75}
              style={[
                styles.durButton,
                styles.leftButton,
                disabled && { opacity: 0.7 },
              ]}
              disabled={disabled}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPressOut={() => this.props.stopTimer()}
              onLongPress={() => this.props.handleDuration(false)}
              onPress={() => this.props.handleDuration(false, true)}
              delayLongPress={75}
              style={[styles.durButton, styles.rightButton]}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
