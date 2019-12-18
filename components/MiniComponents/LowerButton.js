import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ForwardButton from "../../assets/SVGs/ForwardButton";
import CheckmarkIcon from "../../assets/SVGs/Checkmark";
import CrossIcon from "../../assets/SVGs/CrossButton";
import BackButton from "../../assets/SVGs/BackButton";

export default class LowerButton extends Component {
  render() {
    let { width, height, style, isRTL } = this.props;
    let bottom = this.props.bottom ? this.props.bottom : 0;
    return (
      <TouchableOpacity
        style={[
          {
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 3,
            shadowOpacity: 0.2,
            bottom: heightPercentageToDP(bottom)
          },
          style
        ]}
        onPress={() => this.props.function(false)}
      >
        {this.props.checkmark ? (
          <CheckmarkIcon
            width={width ? width : 53}
            height={height ? height : 53}
          />
        ) : this.props.cross ? (
          <CrossIcon
            fill="#000"
            width={width ? width : 73}
            height={height ? height : 63}
          />
        ) : isRTL ? (
          <BackButton width={8} />
        ) : (
          <ForwardButton
            width={width ? width : 83}
            height={height ? height : 83}
          />
        )}
      </TouchableOpacity>
    );
  }
}
