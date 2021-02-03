import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Item } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import PenIcon from "../../../../assets/SVGs/Pen";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { globalColors } from "../../../../GlobalStyles";
export default class CreativeHeadline extends Component {
  state = { input: false, coverHeadline: "", coverHeadlineError: "" };
  render() {
    let { disabled } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Item disabled={disabled} style={styles.inputHeadline}>
        <PenIcon
          width={RFValue(8, 414)}
          height={RFValue(8, 414)}
          style={{ alignSelf: "center" }}
          fill={
            this.state.input
              ? globalColors.orange
              : this.props.coverHeadlineError
              ? "red"
              : "#fff"
          }
        />
        <View
          style={{
            // paddingBottom: 10,
            width: "90%",
            height: "100%",
          }}
        >
          <Text style={[styles.subtitleHeading]}>
            {translate(this.props.field)}
          </Text>
          <TextInput
            editable={!disabled}
            style={[styles.inputText]}
            defaultValue={this.props.coverHeadline}
            maxLength={55}
            numberOfLines={3}
            multiline={true}
            placeholder={translate("Enter your cover headline")}
            placeholderTextColor="#fff9"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(value) => this.props.changeHeadline(value)}
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
                ),
              });
            }}
          />
        </View>
      </Item>
    );
  }
}
