import React, { Component } from "react";
import { Text, View } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen.svg";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
export default class PenIconBrand extends Component {
  state = { input: false, coverHeadline: "", coverHeadlineError: "" };
  render() {
    return (
      <Item style={styles.inputHeadline}>
        <PenIcon
          style={{ bottom: 20 }}
          fill={
            this.state.input
              ? "#FF9D00"
              : this.props.coverHeadlineError
              ? "red"
              : "#fff"
          }
        />
        <View
          style={{
            flexDirection: "column",
            bottom: 30
          }}
        >
          <Text style={[styles.subtitleHeading]}>{this.props.field}</Text>
          <Input
            style={styles.inputText}
            defaultValue={
              !this.props.data ? "Headline" : this.props.data.coverHeadline
            }
            maxLength={55}
            placeholder="Enter your cover headline"
            placeholderTextColor="#fff9"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => this.props.changeHeadline(value)}
            onFocus={() => {
              //   this.props.focus(businessNameComp ? "inputB" : "inputH");
              this.setState({ input: true });
            }}
            onBlur={() => {
              this.setState({ input: false });
              this.setState({
                coverHeadlineError: validateWrapper(
                  "mandatory",
                  this.props.coverHeadline
                )
              });
            }}
          />
        </View>
      </Item>
    );
  }
}
