import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import BackIcon from "../../assets/SVGs/BackButton";
import globalStyles from "../../Global Styles";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class CloseButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation()}
        style={[globalStyles.backButton]}
      >
        <BackIcon />
      </TouchableOpacity>
    );
  }
}
