import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ForwardButton from "../../assets/SVGs/ForwardButton";
import CheckmarkIcon from "../../assets/SVGs/Checkmark.svg";

export default class LowerButton extends Component {
  render() {
    let bottom = this.props.bottom ? this.props.bottom : 0;
    return (
      <TouchableOpacity
        style={{
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 3,
          shadowOpacity: 0.2,
          bottom: heightPercentageToDP(bottom)
        }}
        onPress={() => this.props.function(false)}
      >
        {this.props.checkmark ? (
          <CheckmarkIcon width={53} height={53} />
        ) : (
          <ForwardButton
            width={heightPercentageToDP(9)}
            height={heightPercentageToDP(9)}
          />
        )}
      </TouchableOpacity>
    );
  }
}
