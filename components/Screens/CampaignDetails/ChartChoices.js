import React, { Component } from "react";
import { ScrollView } from "react-native";
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
        : "Swipe Ups",
    ];
    if (
      selectedCampaign &&
      selectedCampaign.source === "SME GROWTH" &&
      "website interactions"
    )
      choices.push("website interactions");
    choices = choices.map((choice) => (
      <GradientButton
        activeOpacity={0.8}
        key={choice}
        onPressAction={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        style={[styles.chartChoiceButtons]}
        transparent={this.state.selectedChoice !== choice}
        uppercase
        numberOfLines={2}
        text={translate(choice)}
        textStyle={[
          styles.choiceText,
          {
            fontSize: 11,
            paddingHorizontal: 15,
            color:
              this.state.selectedChoice !== choice
                ? globalColors.orange
                : "#fff",
          },
        ]}
      />
    ));
    return (
      <ScrollView
        horizontal
        style={{
          alignSelf: "center",
          alignContent: "center",
          width: "100%",
          // paddingHorizontal: 20,
        }}
        contentContainerStyle={[
          styles.chartChoicesViewContainer,
          {
            width: choices.length === 4 ? null : "100%",
          },
        ]}
      >
        {choices}
      </ScrollView>
    );
  }
}
