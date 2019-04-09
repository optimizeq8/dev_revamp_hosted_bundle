import React, { Component } from "react";
import { View } from "react-native";
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
            <GenderIcon width={110} height={110} fill="#fff" />
            <Text style={[styles.title]}> Select Gender </Text>
          </View>
          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 20,
              elevation: -1
            }}
          >
            <Button
              block
              dark
              style={[
                this.props.campaignInfo.targeting.demographics[0].gender ===
                "FEMALE"
                  ? styles.activebutton
                  : styles.inactivebutton
              ]}
              onPress={() => this.props._changeGender("FEMALE")}
            >
              <View>
                <Icon
                  type="Ionicons"
                  name="ios-female"
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "FEMALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    {
                      fontSize: 30,
                      left: wp("5")
                    }
                  ]}
                />
                <Text
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "FEMALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    { textAlign: "center" }
                  ]}
                >
                  Female
                </Text>
              </View>
            </Button>
            <Button
              block
              dark
              style={[
                this.props.campaignInfo.targeting.demographics[0].gender ===
                "MALE"
                  ? styles.activebutton
                  : styles.inactivebutton
              ]}
              onPress={() => this.props._changeGender("MALE")}
            >
              <View>
                <Icon
                  type="Ionicons"
                  name="ios-male"
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "MALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    {
                      left: wp("3"),
                      fontSize: 30
                    }
                  ]}
                />
                <Text
                  style={[
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    "MALE"
                      ? styles.activetext
                      : styles.inactivetext,
                    { textAlign: "center" }
                  ]}
                >
                  Male
                </Text>
              </View>
            </Button>

            <Button
              block
              dark
              style={[
                this.props.campaignInfo.targeting.demographics[0].gender === ""
                  ? styles.activebutton
                  : styles.inactivebutton,
                { flexDirection: "column" }
              ]}
              onPress={() => this.props._changeGender("")}
            >
              <View>
                <GenderIcon
                  width={30}
                  height={30}
                  fill={
                    this.props.campaignInfo.targeting.demographics[0].gender ===
                    ""
                      ? "#fff"
                      : "#7039FF"
                  }
                />
              </View>
              <Text
                style={[
                  this.props.campaignInfo.targeting.demographics[0].gender ===
                  ""
                    ? styles.activetext
                    : styles.inactivetext,
                  { textAlign: "center" }
                ]}
              >
                All
              </Text>
            </Button>
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
