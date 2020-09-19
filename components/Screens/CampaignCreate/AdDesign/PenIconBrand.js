import React, { Component } from "react";
import { Text, View } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
export default class PenIconBrand extends Component {
  state = {
    input: false,
    brand_nameError: "",
    headlineError: "",
  };
  handleBlur = () => {
    let {
      brand_name,
      field,
      headline,

      setTheState,
    } = this.props;
    this.setState({ input: false });
    if (field === "Business Name") {
      this.setState(
        {
          brand_nameError: validateWrapper("mandatory", brand_name),
          headlineError: validateWrapper(
            "mandatory",
            field === "Business Name" ? brand_name : headline
          ),
        },
        () => {
          setTheState({
            brand_nameError: validateWrapper("mandatory", brand_name),
          });
        }
      );
    } else {
      this.setState(
        {
          brand_nameError: validateWrapper("mandatory", brand_name),
          headlineError: validateWrapper("mandatory", headline),
        },
        () => {
          setTheState({
            headlineError: validateWrapper("mandatory", headline),
          });
        }
      );
    }
    this.setState({
      brand_nameError: validateWrapper(
        "mandatory",
        field === "Business Name" ? brand_name : headline
      ),
      headlineError: validateWrapper(
        "mandatory",
        field === "Business Name" ? brand_name : headline
      ),
    });
  };
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
      headlineError,
      setTheState,
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Item style={[styles.inputBrand]}>
        <PenIcon
          fill={
            this.state.input
              ? "#FF9D00"
              : (field === "Business Name" &&
                  (brand_nameError || this.state.brand_nameError)) ||
                (field === "Promotional Message" &&
                  (headlineError || this.state.headlineError))
              ? "red"
              : "#fff"
          }
        />
        <View
          style={[
            { flexDirection: "column", width: "90%" },
            storyAdSelected || disabled ? { opacity: 0.5 } : { opacity: 1 },
          ]}
        >
          <Text style={[styles.inputText, styles.subtitleHeading]}>
            {translate(field)}
          </Text>
          <Input
            disabled={storyAdSelected || disabled}
            style={[styles.inputText, { width: "100%" }]}
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
            onBlur={this.handleBlur}
          />
        </View>
      </Item>
    );
  }
}
