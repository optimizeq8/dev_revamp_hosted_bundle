import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { Button } from "native-base";
import { globalColors } from "../../../GlobalStyles";

export default class ChartDateChoices extends Component {
  state = { selectedChoice: "All" };

  /**
   * Handles filtering the data with which dates are chosen
   * @param choice A string either All, today or yesterday
   */
  handleDateButtons = choice => {
    switch (choice) {
      case "All":
        this.props.durationChange(
          this.props.selectedCampaign.start_time,
          this.props.selectedCampaign.end_time
        );
        break;
      case "Today":
        this.props.durationChange(new Date().toString(), new Date().toString());
        break;
      case "Yesterday":
        this.props.durationChange(
          new Date().setDate(new Date() - 1).toString(),
          new Date().setDate(new Date() - 1).toString()
        );
        break;
      default:
        break;
    }
  };
  renderDateChoices = choice => {
    const { translate } = this.props.screenProps;

    return (
      <Button
        key={choice}
        onPress={() => {
          this.setState({
            selectedChoice: choice
          });
          if (choice === "Custom") {
            this.props.dateField.showModal();
          } else this.handleDateButtons(choice);
        }}
        style={[
          styles.choiceButtons,
          {
            backgroundColor:
              this.state.selectedChoice === choice
                ? globalColors.orange
                : "transparent",
            width: 65,
            height: 30
          }
        ]}
      >
        <Text style={[styles.choiceText, { fontSize: 12 }]}>
          {translate(choice)}
        </Text>
      </Button>
    );
  };
  render() {
    let choices = ["All", "Today", "Yesterday", "Custom"].map(choice =>
      this.renderDateChoices(choice)
    );

    return (
      <View style={[styles.choicesStyles, { backgroundColor: "#0003" }]}>
        {choices}
      </View>
    );
  }
}
