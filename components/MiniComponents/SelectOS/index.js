import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import LocationIcon from "../../../assets/SVGs/Location";
import { Input, Button, Item, Icon } from "native-base";
import styles from "./styles";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import OperatingSystemIcon from "../../../assets/SVGs/AdDetails/OperatingSystem.svg";
import { globalColors } from "../../../Global Styles";
export default class SelectOS extends Component {
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
            <OperatingSystemIcon
              fill="#fff"
              width={100}
              height={100}
              style={styles.icon}
            />
            <Text style={[styles.title]}>Select your audience's OS </Text>
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
              onPress={() => this.props.onSelectedOSChange("")}
            >
              <Icon
                type="MaterialCommunityIcons"
                name={
                  this.props.campaignInfo.targeting.devices[0].os_type === ""
                    ? "circle"
                    : "circle-outline"
                }
                style={[
                  this.props.campaignInfo.targeting.devices[0].os_type === ""
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
              onPress={() => this.props.onSelectedOSChange("iOS")}
            >
              <Icon
                type="MaterialCommunityIcons"
                name={
                  this.props.campaignInfo.targeting.devices[0].os_type === "iOS"
                    ? "circle"
                    : "circle-outline"
                }
                style={[
                  this.props.campaignInfo.targeting.devices[0].os_type === "iOS"
                    ? styles.activetext
                    : styles.inactivetext,
                  {
                    fontSize: 25
                  }
                ]}
              />
              <Text style={[styles.inactivetext, { textAlign: "center" }]}>
                iOS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20
              }}
              onPress={() => this.props.onSelectedOSChange("ANDROID")}
            >
              <Icon
                type="MaterialCommunityIcons"
                name={
                  this.props.campaignInfo.targeting.devices[0].os_type ===
                  "ANDROID"
                    ? "circle"
                    : "circle-outline"
                }
                style={[
                  this.props.campaignInfo.targeting.devices[0].os_type ===
                  "ANDROID"
                    ? styles.activetext
                    : styles.inactivetext,
                  {
                    fontSize: 25
                  }
                ]}
              />
              <Text style={[styles.inactivetext, { textAlign: "center" }]}>
                ANDROID
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
