import React, { Component } from "react";
import { Text, View } from "react-native";
import BackDropIcon from "../../assets/SVGs/BackDropIcon";
import GlobalStyles from "../../GlobalStyles";
export default class BackDrop extends Component {
  render() {
    return (
      <View>
        <BackDropIcon style={GlobalStyles.backDrop} />
      </View>
    );
  }
}
