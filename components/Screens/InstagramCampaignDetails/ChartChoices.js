import React, { Component } from "react";
import { ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";
import { globalColors } from "../../../GlobalStyles";

export default class ChartChoices extends Component {
  state = {
    selectedChoice:
      this.props.selectedCampaign && this.props.selectedCampaign.web_interaction
        ? "website interactions"
        : "Spend",
  };
  render() {
    let selectedCampaign = this.props.selectedCampaign;
    const { translate } = this.props.screenProps;
    let choices = [
      "Spend",
      "Impressions",
      selectedCampaign && selectedCampaign.objective === "BRAND_AWARENESS"
        ? "CPM"
        : "Clicks",
    ];
    if (selectedCampaign && selectedCampaign.web_interaction)
      choices.splice(0, 0, "website interactions");
    choices = choices.map((choice) => (
      <GradientButton
        activeOpacity={1}
        key={choice}
        onPressAction={() => {
          this.props.changeChart(choice);
          this.setState({ selectedChoice: choice });
        }}
        style={[styles.chartChoiceButtons]}
        purpleViolet={this.state.selectedChoice === choice}
        transparent={this.state.selectedChoice !== choice}
        uppercase
        numberOfLines={2}
        text={translate(choice)}
        textStyle={[
          styles.choiceText,
          {
            fontSize: RFValue(5.5, 414),
            paddingHorizontal: RFValue(7.5, 414),
            color:
              this.state.selectedChoice !== choice
                ? globalColors.purple3
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
        showsHorizontalScrollIndicator={false}
      >
        {choices}
      </ScrollView>
    );
  }
}
