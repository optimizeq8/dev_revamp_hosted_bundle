import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../../segmentEventTrack";
import { globalColors } from "../../../../GlobalStyles";
export default class PenIconBrand extends Component {
  state = { input: false, coverHeadline: "", coverHeadlineError: "" };
  render() {
    let { rejected, coverHeadline, disabled } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Item disabled={disabled} style={styles.inputHeadline}>
        <PenIcon
          width={16}
          height={16}
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
              segmentEventTrack("Changed Story Ad Cover Headline", {
                campaign_stoty_ad_cover_headline: this.props.coverHeadline,
              });
              this.setState({ input: false });
              this.setState(
                {
                  coverHeadlineError: validateWrapper(
                    "mandatory",
                    this.props.coverHeadline
                  ),
                },
                () => {
                  if (this.state.coverHeadlineError) {
                    segmentEventTrack(
                      "Error occured on Cover Headline input Blur",
                      {
                        campaign_error_stoty_ad_cover_headline: this.state
                          .coverHeadlineError,
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
