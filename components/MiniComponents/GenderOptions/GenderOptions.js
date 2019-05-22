import React, { Component } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

export default class GenderOptions extends Component {
  render() {
    return (
      <SafeAreaView style={{ height: "100%" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center"
            }}
          >
            <GenderIcon width={110} height={110} fill="#fff" />
            <Text
              style={[
                styles.title,
                { fontSize: 16, fontFamily: "montserrat-bold" }
              ]}
            >
              Gender
            </Text>
            <Text style={[styles.title]}>Select your audience's Gender</Text>

            <View style={{ marginTop: 50 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 20
                }}
                onPress={() => this.props.onSelectedGenderChange("MALE")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "MALE"
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "MALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    {
                      fontSize: 25
                    }
                  ]}
                />
                <Text style={[styles.inactivetext, { textAlign: "center" }]}>
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 20
                }}
                onPress={() => this.props.onSelectedGenderChange("FEMALE")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "FEMALE"
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "FEMALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    {
                      fontSize: 25
                    }
                  ]}
                />
                <Text style={[styles.inactivetext, { textAlign: "center" }]}>
                  Female
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 20
                }}
                onPress={() => this.props.onSelectedGenderChange("")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    ""
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    ""
                      ? styles.activetext
                      : styles.inactivetext,
                    {
                      fontSize: 25
                    }
                  ]}
                />
                <Text style={[styles.inactivetext, { textAlign: "center" }]}>
                  All
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            style={[styles.button, {}]}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
