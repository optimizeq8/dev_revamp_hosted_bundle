import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import LocationIcon from "../../../assets/SVGs/Location";
import { Input, Button, Item, Icon } from "native-base";
import styles from "../MultiSelect/styles";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import OperatingSystemIcon from "../../../assets/SVGs/AdDetails/OperatingSystem.svg";
import { globalColors } from "../../../GlobalStyles";
export default class SelectOS extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <OperatingSystemIcon
              fill="#fff"
              width={100}
              height={100}
              style={styles.icon}
            />
            <Text style={styles.title}>{translate("Operating System")}</Text>
            <Text style={styles.subHeadings}>
              {translate(`Select your audience's OS`)}{" "}
            </Text>
            <View style={[styles.optionsContainer]}>
              <TouchableOpacity
                style={styles.optionsRowContainer}
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
                    styles.optionsIconSize
                  ]}
                />
                <Text
                  style={[styles.inactivetext, styles.optionsTextContainer]}
                >
                  {translate("All")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionsRowContainer}
                onPress={() => this.props.onSelectedOSChange("iOS")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.campaignInfo.targeting.devices[0].os_type ===
                    "iOS"
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.campaignInfo.targeting.devices[0].os_type ===
                    "iOS"
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.optionsIconSize
                  ]}
                />
                <Text
                  style={[styles.inactivetext, styles.optionsTextContainer]}
                >
                  {translate("iOS")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionsRowContainer}
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
                    styles.optionsIconSize
                  ]}
                />
                <Text
                  style={[styles.inactivetext, styles.optionsTextContainer]}
                >
                  {translate("ANDROID")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            style={[styles.button]}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
