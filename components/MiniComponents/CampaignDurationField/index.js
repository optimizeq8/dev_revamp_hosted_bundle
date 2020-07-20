import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon, Button } from "native-base";
import styles from "./styles";
export default class CampaignDuration extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.durationContainer}>
        <Icon type="AntDesign" name="clockcircleo" style={{ color: "#fff" }} />
        <View style={styles.durationContent}>
          <Text style={styles.durationLabel}>{translate("Duration")}</Text>
          <Text style={[styles.durationData]}>
            {this.props.duration}{" "}
            <Text style={[styles.durationData, { fontSize: 10 }]}>
              day{this.props.duration > 1 ? "S" : ""}
            </Text>
          </Text>
          <View style={styles.durationButtons}>
            <Button
              onPressOut={() => this.props.stopTimer()}
              onPressIn={() => this.props.handleDuration(true)}
              style={[styles.durButton, styles.leftButton]}
            >
              <Text style={styles.buttonText}>-</Text>
            </Button>
            <Button
              onPressOut={() => this.props.stopTimer()}
              onPressIn={() => this.props.handleDuration(false)}
              style={[styles.durButton, styles.rightButton]}
            >
              <Text style={styles.buttonText}>+</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
