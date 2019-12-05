import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Item, Input } from "native-base";
import PenIcon from "../../../../assets/SVGs/Pen";

import styles from "./styles";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../../segmentEventTrack";
export default class PenIconBrand extends Component {
  state = { input: false, coverHeadline: "", coverHeadlineError: "" };
  render() {
    let { rejected, coverHeadline } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <Item style={styles.inputHeadline}>
        <PenIcon
          width={21}
          height={21}
          style={{ alignSelf: "flex-start" }}
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
            paddingBottom: 20,
            justifyContent: "flex-start"
          }}
        >
          <Text style={[styles.subtitleHeading]}>
            {translate(this.props.field)}
          </Text>
          <TextInput
            style={[styles.inputText]}
            defaultValue={this.props.coverHeadline}
            maxLength={55}
            numberOfLines={3}
            multiline={true}
            placeholder={translate("Enter your cover headline")}
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
              this.setState(
                {
                  coverHeadlineError: validateWrapper(
                    "mandatory",
                    this.props.coverHeadline
                  )
                },
                () => {
                  if (this.state.coverHeadlineError) {
                    segmentEventTrack(
                      "Error occured on Cover Headline input Blur",
                      {
                        campaign_error_stoty_ad_cover_headline: this.state
                          .coverHeadlineError
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
