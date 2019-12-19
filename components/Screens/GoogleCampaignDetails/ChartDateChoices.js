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
        let today = new Date().toISOString().split("T")[0];
        this.props.durationChange(today, today);
        break;
      case "Yesterday":
        let yesterday = new Date();
        yesterday = yesterday.setDate(yesterday.getDate() - 1);
        yesterday = new Date(yesterday);
        yesterday = yesterday.toISOString().split("T")[0];

        this.props.durationChange(yesterday, yesterday);
        break;
      default:
        break;
    }
  };
  renderDateChoices = choice => {
    const { translate } = this.props.screenProps;
    let disabledBtn = false;

    let result = new Date(new Date());
    result.setDate(result.getDate() - 1);
    if (
      (choice === "Today" &&
        new Date() > new Date(this.props.selectedCampaign.end_time)) ||
      (choice === "Yesterday" &&
        result > new Date(this.props.selectedCampaign.end_time))
    )
      disabledBtn = true;
    return (
      <Button
        disabled={disabledBtn}
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
        <Text
          style={[
            styles.choiceText,
            { fontSize: 12, opacity: disabledBtn ? 0.3 : 1 }
          ]}
        >
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
