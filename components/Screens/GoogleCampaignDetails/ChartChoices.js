import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";
import { globalColors } from "../../../GlobalStyles";

export default class ChartChoices extends Component {
  state = { selectedChoice: "Spend" };
  render() {
    const { translate } = this.props.screenProps;
    let choices = ["Spend", "Clicks", "CPC", "ctr"].map((choice) => (
      <GradientButton
        key={choice}
        onPressAction={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        numberOfLines={2}
        style={[
          // styles.choiceButtons,
          {
            height: RFValue(17.5, 414),
            width: I18nManager.isRTL ? null : "20%", // Since for arabic the name string are big it should take up the width of the content size
            marginHorizontal: 0,
            borderRadius: RFValue(50, 414),
          },
        ]}
        radius={RFValue(25, 414)}
        purpleViolet={this.state.selectedChoice === choice}
        transparent={this.state.selectedChoice !== choice}
        text={translate(choice)}
        uppercase
        textStyle={[
          styles.choiceText,
          {
            fontSize: RFValue(5.5, 414),
            paddingHorizontal: I18nManager.isRTL
              ? RFValue(7.5, 414)
              : RFValue(2.5, 414),
            color:
              this.state.selectedChoice !== choice
                ? globalColors.purple3
                : "#fff",
          },
        ]}
      />
    ));
    return <View style={styles.chartChoicesView}>{choices}</View>;
  }
}
