import React, { Component } from "react";
import { View, I18nManager } from "react-native";
import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";
import { globalColors } from "../../../GlobalStyles";

export default class ChartChoices extends Component {
  state = { selectedChoice: "Spend" };
  render() {
    const { translate } = this.props.screenProps;
    let choices = ["Spend", "Clicks", "CPC", "ctr"].map(choice => (
      <GradientButton
        key={choice}
        onPressAction={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        numberOfLines={2}
        style={[
          styles.choiceButtons,
          {
            height: 35,
            width: I18nManager.isRTL ? null : "20%", // Since for arabic the name string are big it should take up the width of the content size
            marginHorizontal: 0,
            borderRadius: 100
          }
        ]}
        radius={50}
        transparent={this.state.selectedChoice !== choice}
        text={translate(choice)}
        uppercase
        textStyle={[
          styles.choiceText,
          {
            fontSize: 11,
            paddingHorizontal: I18nManager.isRTL ? 15 : 5,
            color:
              this.state.selectedChoice !== choice
                ? globalColors.orange
                : "#fff"
          }
        ]}
      />
    ));
    return <View style={styles.chartChoicesView}>{choices}</View>;
  }
}
