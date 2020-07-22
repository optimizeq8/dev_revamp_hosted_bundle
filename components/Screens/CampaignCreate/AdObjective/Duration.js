import React, { Component } from "react";
import { View, TouchableHighlight, I18nManager } from "react-native";
import { Text } from "native-base";
import dateFormat from "dateformat";

import CalendarIcon from "../../../../assets/SVGs/Calendar";

//styles
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";
export default class Duration extends Component {
  render() {
    const { translate } = this.props.screenProps;
    const { label } = this.props;
    let currentDay =
      dateFormat(new Date(), "d mmm").toUpperCase() +
      " " +
      new Date().getFullYear();
    let end_time = "";
    let start_time = "";
    let end_year = "";
    let start_year = "";
    let selectedCampaign = this.props.selectedCampaign;

    if (this.props.start_time !== "") {
      // end_time = new Date(this.props.end_time.split("T")[0]);
      start_time = new Date(this.props.start_time.split("T")[0]);
      // end_year = end_time.getFullYear();
      start_year = start_time.getFullYear();
      // end_time = dateFormat(end_time, "d mmm").toUpperCase();
      start_time = dateFormat(start_time, "d mmm").toUpperCase();
    }
    return (
      <TouchableHighlight
        disabled={this.props.loading}
        underlayColor="rgba(255,255,255,0.2)"
        style={[
          styles.dateInput,
          // this.props.start_timeError ? GlobalStyles.redBorderColor : GlobalStyles.transparentBorderColor,
          this.props.style,
        ]}
        onPress={() => {
          this.props.dismissKeyboard && this.props.dismissKeyboard();
          this.props.dateField.showModal();
        }}
      >
        <View style={styles.dateContainer}>
          <CalendarIcon />
          <View
            style={{ flexDirection: "column", marginLeft: 13, width: "100%" }}
          >
            <Text style={styles.inputLabel}>{translate(label)}</Text>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between"
              }}
            >
              <View style={styles.dateColumn}>
                {this.props.start_time !== "" || selectedCampaign ? (
                  <Text style={styles.date}>
                    {start_time} {start_year}
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.dateLabel,

                      I18nManager.isRTL
                        ? { marginHorizontal: -15 }
                        : { marginHorizontal: 0 },
                    ]}
                  >
                    {this.props.start_time === "" || selectedCampaign
                      ? ""
                      : translate("Start")}
                  </Text>
                )}
              </View>

              {/* <Text
                style={[
                  styles.dateLabel,
                  GlobalStyles.whiteTextColor,
                  {
                    alignSelf: "center",
                    marginHorizontal:
                      ((this.props.start_time === "" || selectedCampaign) &&
                        !this.props.slidePanel) ||
                      (selectedCampaign &&
                        new Date(selectedCampaign.end_time) < new Date())
                        ? 0
                        : widthPercentageToDP(5),
                    // top: this.props.start_time === '' ? 0 : 10,
                    // marginHorizontal: -25
                  },
                ]}
              >
                {(this.props.start_time === "" || selectedCampaign) &&
                (!this.props.slidePanel ||
                  new Date(selectedCampaign.end_time) < new Date())
                  ? translate("Select Campaign Duration")
                  : translate("To")}
              </Text> */}

              {/* {!this.props.slidePanel ||
              new Date(selectedCampaign.end_time) < new Date() ? (
                <View style={styles.dateColumn}>
                  {this.props.end_time !== "" || selectedCampaign ? (
                    <Text style={styles.date}>
                      {end_time} {end_year}
                    </Text>
                  ) : (
                    <Text style={[styles.dateLabel]}>
                      {(this.props.start_time === "" || selectedCampaign) &&
                      (!this.props.slidePanel ||
                        new Date(selectedCampaign.end_time) < new Date())
                        ? ""
                        : translate("End")}
                    </Text>
                  )}
                </View>
              ) : (
                this.props.slidePanel && (
                  <View style={styles.dateColumn}>
                    <Text style={styles.date}>
                      {new Date(selectedCampaign.start_time.split("T")[0]) >=
                      new Date()
                        ? end_time + " " + end_year
                        : currentDay}
                    </Text>
                  </View>
                )
              )} */}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
