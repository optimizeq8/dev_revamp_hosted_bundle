import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";

import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import InputNumber from "rmc-input-number";
import inputNumberStyles from "./inputNumber";

export default class AgeOption extends Component {
  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            flexDirection: "column"
          }}
        >
          <View
            style={{ felx: 1, justifyContent: "flex-start", marginTop: 10 }}
          >
            <Text style={[styles.title, { fontSize: 50 }]}> AGE </Text>
            <Text style={[styles.title]}> Select Age Range </Text>
          </View>
          <Text style={[styles.subHeadings, { paddingHorizontal: 15 }]}>
            Selecting 35 for max age includes 35 and above.
          </Text>
          <View
            style={{
              paddingTop: 20,
              marginVertical: "40%",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Item
              rounded
              style={[
                styles.input,
                {
                  marginBottom: 30,
                  borderColor: this.props.state.min_ageError ? "red" : "#D9D9D9"
                }
              ]}
            >
              <InputNumber
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                min={13}
                max={
                  this.props.state.campaignInfo.targeting.demographics[0]
                    .max_age === 0
                    ? 35
                    : this.props.state.campaignInfo.targeting.demographics[0]
                        .max_age
                }
                styles={inputNumberStyles}
                defaultValue={
                  this.props.state.campaignInfo.targeting.demographics[0]
                    .min_age
                }
                onChange={value => this.props._handleMinAge(value)}
              />
              <Text style={[styles.text, { paddingTop: 0, paddingBottom: 0 }]}>
                Min Age
              </Text>
            </Item>
            {this.props.state.min_ageError && (
              <Text style={[styles.text, { paddingTop: 0 }]}>
                Min {this.props.state.min_ageError}
              </Text>
            )}
            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.props.state.max_ageError ? "red" : "#D9D9D9"
                }
              ]}
            >
              <InputNumber
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                max={35}
                min={
                  this.props.state.campaignInfo.targeting.demographics[0]
                    .min_age === 0
                    ? 13
                    : this.props.state.campaignInfo.targeting.demographics[0]
                        .min_age
                }
                styles={inputNumberStyles}
                defaultValue={
                  this.props.state.campaignInfo.targeting.demographics[0]
                    .max_age
                }
                onChange={value => this.props._handleMaxAge(value)}
              />
              <Text style={[styles.text, { paddingTop: 0, paddingBottom: 0 }]}>
                Max Age
              </Text>
            </Item>
            {this.props.state.max_ageError && (
              <Text style={[styles.text, { paddingTop: 0 }]}>
                Max {this.props.state.max_ageError}
              </Text>
            )}
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 25 }]}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  }
}
