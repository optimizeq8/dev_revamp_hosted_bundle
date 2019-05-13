import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import dateFormat from "dateformat";

//styles
import styles from "./styles";
import GlobalStyles from "../../../../Global Styles";
export default class Duration extends Component {
  render() {
    let end_time = "";
    let start_time = "";
    let end_year = "";
    let start_year = "";
    if (this.props.start_time !== "" && this.props.end_time !== "") {
      end_time = new Date(this.props.end_time.split("T")[0]);
      start_time = new Date(this.props.start_time.split("T")[0]);
      end_year = end_time.getFullYear();
      start_year = start_time.getFullYear();
      end_time = dateFormat(end_time, "d mmm").toUpperCase();
      start_time = dateFormat(start_time, "d mmm").toUpperCase();
    }
    return (
      <TouchableHighlight
        underlayColor="rgba(255,255,255,0.2)"
        style={[
          styles.dateInput,
          {
            borderColor: this.props.start_timeError ? "red" : "transparent"
          }
        ]}
        onPress={() => {
          this.props.dateField.showModal();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              textAlign: "center"
            }}
          >
            <Text style={[styles.categories, { fontSize: 16 }]}>Start</Text>
            {this.props.start_time !== "" && (
              <Text style={styles.date}>
                {start_time} {start_year}
              </Text>
            )}
          </View>

          <Text
            style={[
              styles.categories,
              {
                fontSize: 16,
                color: "#fff",
                top: this.props.start_time === "" ? 0 : 10,
                marginHorizontal: 5
              }
            ]}
          >
            To
          </Text>

          <View
            style={{
              flexDirection: "column"
            }}
          >
            <Text style={[styles.categories, { fontSize: 16 }]}>End</Text>

            {this.props.end_time !== "" && (
              <Text style={styles.date}>
                {end_time} {end_year}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
