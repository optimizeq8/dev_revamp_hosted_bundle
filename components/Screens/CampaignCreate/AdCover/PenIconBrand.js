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
      <Item style={styles.inputHeadline}>
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
            style={styles.inputText}
            defaultValue={
              this.props.field === "Logo"
                ? this.props.mainBusiness.businessname
                  ? this.props.mainBusiness.businessname
                  : "Brand Name"
                : !this.props.data
                ? "Headline"
                : this.props.data.name
            }
            placeholderLabel={styles.inputText}
            placeholderTextColor="white"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value =>
              this.props.field === "Logo"
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
                  this.props.field === "Logo"
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
