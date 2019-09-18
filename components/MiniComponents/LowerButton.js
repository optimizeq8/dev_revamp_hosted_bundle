import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ForwardButton from "../../assets/SVGs/ForwardButton";
import CheckmarkIcon from "../../assets/SVGs/Checkmark.svg";
import CrossIcon from "../../assets/SVGs/CrossButton.svg";

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
        onPress={() =>
          this.props.function(false, this.props.cross ? true : false)
        }
      >
        {this.props.checkmark ? (
          <CheckmarkIcon width={53} height={53} />
        ) : this.props.cross ? (
          <CrossIcon fill="#E26A65" width={73} height={63} />
        ) : (
          <ForwardButton width={83} height={83} />
        )}
      </TouchableOpacity>
    );
  }
}
