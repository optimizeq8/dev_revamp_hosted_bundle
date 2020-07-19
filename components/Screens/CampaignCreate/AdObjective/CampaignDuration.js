import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon, Button } from "native-base";
import styles from "./styles";
export default class CampaignDuration extends Component {
  render() {
    return (
      <View style={styles.durationContainer}>
        <Icon type="AntDesign" name="clockcircleo" style={{ color: "#fff" }} />
        <View style={styles.durationContent}>
          <Text style={styles.durationLabel}>Duration</Text>
          <Text style={styles.durationData}>
            {this.props.duration}{" "}
            <Text style={[styles.durationData, { fontSize: 11 }]}>day</Text>
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
