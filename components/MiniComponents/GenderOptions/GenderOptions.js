import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
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
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <View
            style={{ felx: 1, justifyContent: "flex-start", marginTop: 10 }}
          >
            <GenderIcon
              width={110}
              height={110}
              fill="#fff"
              style={{ alignSelf: "center" }}
            />
            <Text style={[styles.title]}>Select your audience's Gender</Text>
          </View>
          <View
            style={{
              felx: 1,
              flexDirection: "column",
              // alignItems: "flex-start",
              alignSelf: "flex-start",
              paddingTop: 20,
              paddingLeft: 50,
              elevation: -1
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20
              }}
              onPress={() => this.props._changeGender("")}
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

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20
              }}
              onPress={() => this.props._changeGender("MALE")}
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
              onPress={() => this.props._changeGender("FEMALE")}
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
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 25, elevation: -1 }]}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  }
}
