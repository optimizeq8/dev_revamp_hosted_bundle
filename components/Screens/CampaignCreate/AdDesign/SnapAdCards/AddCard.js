import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";

import styles from "../styles";
export default class AddCard extends Component {
  render() {
    let { addButton, addSnapCard } = this.props;
    return (
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button style={styles.addButtonStyle} onPress={addSnapCard}>
          {/* <Text style={{ color: "#fff" }}>{addButton.item.id}</Text> */}
          <Icon
            style={{ alignSelf: "center", right: 2 }}
            name="plus"
            type="MaterialCommunityIcons"
          />
        </Button>
        <Text style={styles.addButtonText}>Add More</Text>
      </View>
    );
  }
}
