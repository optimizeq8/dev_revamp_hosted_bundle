import React, { Component } from "react";
import { Text, View } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen.svg";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
export default class PenIconBrand extends Component {
  state = { input: false, brand_nameError: "" };
  render() {
    let {
      brand_name,
      brand_nameError,
      field,
      headline,
      data,
      changeBusinessName,
      changeHeadline,
      storyAdSelected
    } = this.props;

    return (
      <Item
        style={[
          field === "Business Name" ? styles.inputBrand : styles.inputHeadline
        ]}
      >
        <PenIcon
          fill={
            this.state.input
              ? "#FF9D00"
              : brand_nameError || this.state.brand_nameError
              ? "red"
              : "#fff"
          }
        />
        <View
          style={[
            { flexDirection: "column" },
            storyAdSelected ? { opacity: 0.5 } : { opacity: 1 }
          ]}
        >
          <Text style={[styles.inputText, styles.subtitleHeading]}>
            {field}
          </Text>
          <Input
            disabled={storyAdSelected}
            style={styles.inputText}
            maxLength={field === "Business Name" ? 25 : 34}
            placeholder={
              field === "Business Name"
                ? "Enter your business name"
                : "Enter your Headline"
            }
            defaultValue={
              field === "Business Name"
                ? brand_name
                  ? brand_name
                  : // : mainBusiness.brandname &&
                    //   mainBusiness.brandname.length <= 25
                    // ? mainBusiness.brandname
                    ""
                : headline
                ? headline
                : data
                ? data.name
                : ""
            }
            placeholderLabel={styles.inputText}
            placeholderTextColor="#fff9"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value =>
              field === "Business Name"
                ? changeBusinessName(value)
                : changeHeadline(value)
            }
            onFocus={() => {
              //   focus(businessNameComp ? "inputB" : "inputH");
              this.setState({ input: true });
            }}
            onBlur={() => {
              this.setState({ input: false });
              this.setState({
                brand_nameError: validateWrapper(
                  "mandatory",
                  field === "Business Name" ? brand_name : headline
                )
              });
            }}
          />
        </View>
      </Item>
    );
  }
}
