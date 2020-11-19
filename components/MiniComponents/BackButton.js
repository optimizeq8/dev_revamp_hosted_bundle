import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import BackIcon from "../../assets/SVGs/BackButton";
import globalStyles from "../../GlobalStyles";
export default class CloseButton extends Component {
  render() {
    const { stroke = "#FFF" } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation();
        }}
        style={[globalStyles.backButton, this.props.style]}
      >
        <BackIcon
          height={24}
          width={24}
          style={{ zIndex: 2 }}
          stroke={stroke}
        />
      </TouchableOpacity>
    );
  }
}
