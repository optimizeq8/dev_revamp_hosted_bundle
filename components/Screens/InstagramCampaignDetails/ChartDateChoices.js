import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
import dateFormat from "dateformat";
export default class ChartDateChoices extends Component {
  state = { selectedChoice: "All" };

  /**
   * Handles filtering the data with which dates are chosen
   * @param choice A string either All, today or yesterday
   */
  handleDateButtons = (choice) => {
    let newDate = new Date();
    switch (choice) {
      case "All":
        this.props.durationChange(
          this.props.selectedCampaign.start_time,
          new Date(this.props.selectedCampaign.end_time) > new Date()
            ? dateFormat(new Date(), "yyyy-mm-dd")
            : this.props.selectedCampaign.end_time
        );
        break;
      case "Today":
        this.props.durationChange(
          dateFormat(newDate, "yyyy-mm-dd"),
          dateFormat(newDate, "yyyy-mm-dd")
        );
        break;
      case "Yesterday":
        let oldDate = newDate.setDate(newDate.getDate() - 1);
        this.props.durationChange(
          dateFormat(oldDate, "yyyy-mm-dd"),
          dateFormat(oldDate, "yyyy-mm-dd")
        );
        break;
      default:
        break;
    }
  };
  renderDateChoices = (choice) => {
    const { translate } = this.props.screenProps;

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={choice}
        onPress={() => {
          this.setState({
            selectedChoice: choice,
          });
          if (choice === "Custom") {
            this.props.dateField.showModal();
          } else this.handleDateButtons(choice);
        }}
        disabled={
          choice === "Today" || choice === "Yesterday"
            ? new Date(this.props.selectedCampaign.end_time) < new Date()
            : false
        }
        style={[
          styles.choiceButtons,
          {
            backgroundColor:
              this.state.selectedChoice === choice
                ? globalColors.orange
                : "transparent",
            // width: 65,

            width: "25%",
            // height: 30,
            opacity:
              choice === "Today" || choice === "Yesterday"
                ? new Date(this.props.selectedCampaign.end_time) < new Date()
                  ? 0.5
                  : 1
                : 1,
          },
        ]}
      >
        <Text style={[styles.choiceText, { fontSize: 12 }]}>
          {translate(choice)}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    let choices = ["All", "Today", "Yesterday", "Custom"].map((choice) =>
      this.renderDateChoices(choice)
    );

    return (
      <View style={[styles.choicesStyles, { backgroundColor: "#0003" }]}>
        {choices}
      </View>
    );
  }
}
