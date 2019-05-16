import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import BackIcon from "../../assets/SVGs/BackButton";
import globalStyles from "../../Global Styles";
import { Segment } from "expo";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default class CloseButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Segment.trackWithProperties(
            `${this.props.screenname} Screen Back Button `,
            {
              business_name: this.props.businessname
            }
          );
          this.props.navigation();
        }}
        style={[globalStyles.backButton, this.props.style]}
      >
        <BackIcon height={24} width={24} />
      </TouchableOpacity>
    );
  }
}
