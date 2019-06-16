import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { Button } from "native-base";
import { globalColors } from "../../../GlobalStyles";

export default class ChartChoices extends Component {
  state = { selectedChoice: "Spend" };
  render() {
    let selectedCampaign = this.props.selectedCampaign;

    let choices = [
      "Spend",
      "Impressions",
      selectedCampaign && selectedCampaign.objective === "BRAND_AWARENESS"
        ? "CPM"
        : "Swipe-Ups"
    ].map(choice => (
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
          }
        ]}
      >
        <Text style={styles.choiceText}>{choice}</Text>
      </Button>
    ));
    return <View style={styles.choicesStyles}>{choices}</View>;
  }
}
