import React, { Component } from "react";
import { Text, View } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen.svg";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
export default class PenIconBrand extends Component {
  state = { input: false, brand_nameError: "" };
  render() {
    return (
      <Item
        style={[
          this.props.field === "Business Name"
            ? styles.inputBrand
            : styles.inputHeadline
          // this.props.rejected ? { opacity: 0.5 } : { opacity: 1 }
        ]}
      >
        <PenIcon
          fill={
            this.state.input
              ? "#FF9D00"
              : this.props.brand_nameError || this.state.brand_nameError
              ? "red"
              : "#fff"
          }
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={[styles.inputText, styles.subtitleHeading]}>
            {this.props.field}
          </Text>
          <Input
            // disabled={this.props.rejected}
            style={styles.inputText}
            maxLength={this.props.field === "Business Name" ? 25 : 34}
            placeholder={
              this.props.field === "Business Name"
                ? "Enter your business name"
                : "Enter your Headline"
            }
            defaultValue={
              this.props.field === "Business Name"
                ? this.props.mainBusiness.brandname &&
                  this.props.mainBusiness.brandname.length <= 25
                  ? this.props.mainBusiness.brandname
                  : ""
                : this.props.headline
                ? this.props.headline
                : this.props.data
                ? this.props.data.name
                : ""
            }
            placeholderLabel={styles.inputText}
            placeholderTextColor="#fff9"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value =>
              this.props.field === "Business Name"
                ? this.props.changeBusinessName(value)
                : this.props.changeHeadline(value)
            }
            onFocus={() => {
              //   this.props.focus(businessNameComp ? "inputB" : "inputH");
              this.setState({ input: true });
            }}
            onBlur={() => {
              this.setState({ input: false });
              this.setState({
                brand_nameError: validateWrapper(
                  "mandatory",
                  this.props.field === "Business Name"
                    ? this.props.brand_name
                    : this.props.headline
                )
              });
            }}
          />
        </View>
      </Item>
    );
  }
}
