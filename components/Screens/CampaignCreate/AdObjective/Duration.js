import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import dateFormat from "dateformat";

//styles
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";
export default class Duration extends Component {
  render() {
    let currentDay =
      dateFormat(new Date(), "d mmm").toUpperCase() +
      " " +
      new Date().getFullYear();
    let end_time = "";
    let start_time = "";
    let end_year = "";
    let start_year = "";
    let selectedCampaign = this.props.selectedCampaign;
    if (this.props.end_time !== "") {
      if (this.props.start_time !== "" && this.props.end_time !== "") {
        end_time = new Date(this.props.end_time.split("T")[0]);
        start_time = new Date(this.props.start_time.split("T")[0]);
        end_year = end_time.getFullYear();
        start_year = start_time.getFullYear();
        end_time = dateFormat(end_time, "d mmm").toUpperCase();
        start_time = dateFormat(start_time, "d mmm").toUpperCase();
      }
    } else if (this.props.slidePanel) {
      end_time = new Date(selectedCampaign.end_time.split("T")[0]);
      start_time = new Date(selectedCampaign.start_time.split("T")[0]);
      end_year = end_time.getFullYear();
      start_year = start_time.getFullYear();
      end_time = dateFormat(end_time, "d mmm").toUpperCase();
      start_time = dateFormat(start_time, "d mmm").toUpperCase();
    }
    return (
      <TouchableHighlight
        disabled={this.props.loading}
        underlayColor="rgba(255,255,255,0.2)"
        style={[
          styles.dateInput,
          this.props.start_timeError
            ? GlobalStyles.redBorderColor
            : GlobalStyles.transparentBorderColor,
          this.props.style
        ]}
        onPress={() => {
          this.props.dismissKeyboard && this.props.dismissKeyboard();
          this.props.dateField.showModal();
        }}
      >
        <View style={styles.dateContainer}>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Start</Text>
            {(this.props.start_time !== "" || selectedCampaign) && (
              <Text style={styles.date}>
                {start_time} {start_year}
              </Text>
            )}
          </View>

          <Text
            style={[
              styles.dateLabel,
              GlobalStyles.whiteTextColor,
              {
                top: this.props.start_time === "" ? 0 : 10,
                marginHorizontal: 5
              }
            ]}
          >
            To
          </Text>

          {!this.props.slidePanel ||
          new Date(selectedCampaign.end_time) < new Date() ? (
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>End</Text>

              {(this.props.end_time !== "" || selectedCampaign) && (
                <Text style={styles.date}>
                  {end_time} {end_year}
                </Text>
              )}
            </View>
          ) : (
            this.props.slidePanel && (
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>End</Text>
                <Text style={styles.date}>
                  {new Date(selectedCampaign.start_time.split("T")[0]) >=
                  new Date()
                    ? end_time + " " + end_year
                    : currentDay}
                </Text>
              </View>
            )
          )}
        </View>
      </TouchableHighlight>
    );
  }
}
