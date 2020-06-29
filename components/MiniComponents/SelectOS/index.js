import React, { Component } from "react";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import LocationIcon from "../../../assets/SVGs/Location";
import { Icon } from "native-base";
import styles from "../MultiSelect/styles";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";
import OperatingSystemIcon from "../../../assets/SVGs/AdDetails/OperatingSystem";
import { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";
import LowerButton from "../LowerButton";
export default class SelectOS extends Component {
  componentDidMount() {
    Segment.screen("OS Type Options");
  }
  render() {
    let devices = this.props.campaignInfo.targeting.hasOwnProperty("devices")
      ? this.props.campaignInfo.targeting.devices[0].os_type
      : this.props.campaignInfo.targeting.user_os[0];
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
                  name={devices === "" ? "circle" : "circle-outline"}
                  style={[
                    devices === "" ? styles.activetext : styles.inactivetext,
                    styles.optionsIconSize,
                  ]}
                />
                <Text style={[styles.inactivetext, { fontSize: 14 }]}>
                  {translate("All")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionsRowContainer}
                onPress={() => this.props.onSelectedOSChange("iOS")}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={devices === "iOS" ? "circle" : "circle-outline"}
                  style={[
                    devices === "iOS" ? styles.activetext : styles.inactivetext,
                    styles.optionsIconSize,
                  ]}
                />
                <Text
                  style={[
                    styles.inactivetext,
                    styles.optionsTextContainer,
                    I18nManager.isRTL && !isStringArabic(translate("iOS"))
                      ? {
                          marginTop: 0,
                          marginBottom: 15,
                        }
                      : {},
                  ]}
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
                  name={devices === "ANDROID" ? "circle" : "circle-outline"}
                  style={[
                    devices === "ANDROID"
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.optionsIconSize,
                  ]}
                />
                <Text
                  style={[
                    styles.inactivetext,
                    styles.optionsTextContainer,
                    I18nManager.isRTL && !isStringArabic(translate("ANDROID"))
                      ? {
                          marginBottom: 20,
                        }
                      : {},
                  ]}
                >
                  {translate("ANDROID")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <LowerButton
            screenProps={this.props.screenProps}
            style={[styles.button]}
            checkmark={true}
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
