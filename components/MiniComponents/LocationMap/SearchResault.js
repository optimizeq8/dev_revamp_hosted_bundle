import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default class SearchResault extends Component {
  render() {
    let { properties, geometry, bbox } = this.props.item;
    let { name, country } = properties;
    bbox = bbox ? bbox : [...geometry.coordinates, ...geometry.coordinates];

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.handleRegionChange(geometry.coordinates, bbox)
        }
        style={styles.autoCompleteResaults}
      >
        <Text style={styles.autoCompleteResaultText}> {name} </Text>
        <Text style={styles.autoCompleteResaultTextSecondery}> {country} </Text>
      </TouchableOpacity>
    );
  }
}
