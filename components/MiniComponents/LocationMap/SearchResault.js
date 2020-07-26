import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import LocationRow from "../SnapchatLocation/LocationRow";

export default class SearchResault extends Component {
  render() {
    let { properties, geometry, bbox } = this.props.item;
    let { name, country } = properties;
    // bbox = bbox ? bbox : [...geometry.coordinates, ...geometry.coordinates];

    return <LocationRow result={true} {...this.props.item.properties} />;
  }
}
