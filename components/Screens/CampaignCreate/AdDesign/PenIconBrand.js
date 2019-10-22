import React, { Component } from "react";
import { Text, View } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen";

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
    const { translate } = this.props.screenProps;
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
            {translate(field)}
          </Text>
          <Input
            disabled={storyAdSelected}
            style={styles.inputText}
            maxLength={field === "Business Name" ? 25 : 34}
            placeholder={
              field === "Business Name"
                ? translate("Enter your business name")
                : translate("Enter your Promotional Message")
            }
            value={
              field === "Business Name"
                ? brand_name
                  ? brand_name
                  : // : mainBusiness.brandname &&
                    //   mainBusiness.brandname.length <= 25
                    // ? mainBusiness.brandname
                    ""
                : headline
                ? headline
                : ""
            }
            placeholderLabel={styles.inputText}
            placeholderTextColor="#fff9"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => {
              value = value.replace(
                /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
                ""
              );
              field === "Business Name"
                ? changeBusinessName(value)
                : changeHeadline(value);
            }}
            onFocus={() => {
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
