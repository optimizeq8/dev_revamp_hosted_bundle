import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import LocationRow from "../SnapchatLocation/LocationRow";

export default class SearchResault extends Component {
  render() {
    let { formatted_address, geometry, bbox } = this.props.item;
    // bbox = bbox ? bbox : [...geometry.coordinates, ...geometry.coordinates];
    console.log("this.props.item", this.props.item);

    return <LocationRow result={true} {...this.props.item} />;
  }
}
