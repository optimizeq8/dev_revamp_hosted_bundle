import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import CloseIcon from "../../assets/SVGs/Close";
import globalStyles from "../../GlobalStyles";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class CloseButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation()}
        style={[
          globalStyles.backButton,
          { top: heightPercentageToDP(4), left: heightPercentageToDP(3) },
          this.props.style
        ]}
      >
        <CloseIcon />
      </TouchableOpacity>
    );
  }
}
