import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text, Button } from "native-base";
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
      <Button
        key={choice}
        onPress={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        style={[
          styles.choiceButtons,
          {
            backgroundColor:
              this.state.selectedChoice === choice
                ? globalColors.orange
                : "transparent"
          },
          styles.chartChoiceButtons
        ]}
      >
        <Text
          uppercase
          style={[
            styles.choiceText,
            {
              color:
                this.state.selectedChoice !== choice
                  ? globalColors.orange
                  : "#fff"
            },
            styles.chartChoiceText
          ]}
        >
          {translate(choice)}
        </Text>
      </Button>
    ));
    return (
      <View style={[styles.choicesStyles, styles.chartChoices]}>{choices}</View>
    );
  }
}
