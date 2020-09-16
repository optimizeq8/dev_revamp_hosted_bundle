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
    let disabled = this.props.objective === "APP_INSTALLS";
    const data = this.props.data;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <OperatingSystemIcon
              fill={globalColors.rum}
              width={100}
              height={100}
              style={styles.icon}
            />
            <Text style={styles.title}>{translate("Operating System")}</Text>
            <Text style={styles.subHeadings}>
              {translate(`Select your audience's OS`)}{" "}
            </Text>
            <View style={[styles.optionsContainer]}>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  disabled={disabled}
                  style={[
                    styles.optionsRowContainer,
                    { opacity: disabled ? 0.5 : 1 },
                  ]}
                  onPress={() => this.props.onSelectedOSChange(item.value)}
                >
                  <Icon
                    type="MaterialCommunityIcons"
                    name={devices === item.value ? "circle" : "circle-outline"}
                    style={[
                      devices === item.value
                        ? styles.activetext
                        : styles.inactivetext,
                      styles.optionsIconSize,
                    ]}
                  />
                  <Text
                    style={[
                      styles.inactivetext,
                      styles.optionsTextContainer,
                      I18nManager.isRTL &&
                      !isStringArabic(translate(item.label))
                        ? {
                            marginTop: 0,
                            marginBottom: 15,
                          }
                        : {},
                    ]}
                  >
                    {translate(item.label)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <LowerButton
            screenProps={this.props.screenProps}
            style={[styles.button]}
            checkmark={true}
            purpleViolet
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
