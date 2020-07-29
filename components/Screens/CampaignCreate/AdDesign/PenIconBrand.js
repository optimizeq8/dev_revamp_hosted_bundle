import React, { Component } from "react";
import { Text, View } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../../segmentEventTrack";
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
      storyAdSelected,
      disabled,
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Item style={[styles.inputBrand]}>
        <PenIcon
          fill={
            this.state.input
              ? "#FF9D00"
              : (field === "Business Name" && brand_nameError) ||
                this.state.brand_nameError
              ? "red"
              : "#fff"
          }
        />
        <View
          style={[
            { flexDirection: "column" },
            storyAdSelected || disabled ? { opacity: 0.5 } : { opacity: 1 },
          ]}
        >
          <Text style={[styles.inputText, styles.subtitleHeading]}>
            {translate(field)}
          </Text>
          <Input
            disabled={storyAdSelected || disabled}
            style={styles.inputText}
            maxLength={field === "Business Name" ? 25 : 34}
            placeholder={
              field === "Business Name"
                ? translate("Enter your business name")
                : translate("Shop Our Latest Collection")
            }
            value={
              field === "Business Name"
                ? brand_name && brand_name.length <= 25
                  ? brand_name.replace(
                      /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
                      ""
                    )
                  : ""
                : headline
                ? headline.replace(
                    /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
                    ""
                  )
                : ""
            }
            placeholderLabel={styles.inputText}
            placeholderTextColor="#fff9"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(value) => {
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
              if (field === "Business Name") {
                segmentEventTrack("Changed Business Name", {
                  campaign_brand_name: brand_name,
                });
              } else {
                segmentEventTrack("Changed Headline", {
                  campaign_headline: headline,
                });
              }
              this.setState(
                {
                  brand_nameError: validateWrapper(
                    "mandatory",
                    field === "Business Name" ? brand_name : headline
                  ),
                },
                () => {
                  if (this.state.brand_nameError) {
                    segmentEventTrack(
                      `Error occured on blur of ${
                        field === "Business Name" ? "Brand Name" : "Headline"
                      } Ad Design Screen`,
                      {
                        [`${
                          field === "Business Name"
                            ? "camapign_error_brand_name"
                            : "campaign_error_headline"
                        }`]: this.state.brand_nameError,
                      }
                    );
                  }
                }
              );
            }}
          />
        </View>
      </Item>
    );
  }
}
