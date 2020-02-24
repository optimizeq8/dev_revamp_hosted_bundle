import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";
import { globalColors } from "../../../GlobalStyles";

export default class ChartChoices extends Component {
  state = { selectedChoice: "Spend" };
  render() {
    let selectedCampaign = this.props.selectedCampaign;
    const { translate } = this.props.screenProps;
    let choices = [
      "Spend",
      "Impressions",
      selectedCampaign && selectedCampaign.objective === "BRAND_AWARENESS"
        ? "CPM"
        : "Swipe Ups"
    ];
    if (
      selectedCampaign &&
      selectedCampaign.source === "SME GROWTH" &&
      "website interactions"
    )
      choices.push("website interactions");
    choices = choices.map(choice => (
      <GradientButton
        key={choice}
        onPressAction={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        style={[styles.choiceButtons, styles.chartChoiceButtons]}
        transparent={this.state.selectedChoice !== choice}
        uppercase
        text={translate(choice)}
        textStyle={[
          styles.choiceText,
          {
            color:
              this.state.selectedChoice !== choice
                ? globalColors.orange
                : "#fff"
          }
        ]}
      />
    ));
    return <View style={[styles.chartChoicesViewContainer]}>{choices}</View>;
  }
}
