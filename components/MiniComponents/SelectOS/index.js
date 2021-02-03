import React, { Component } from "react";
import { Text, View, TouchableOpacity, I18nManager } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "native-base";
import styles from "../MultiSelect/styles";
import OperatingSystemIcon from "../../../assets/SVGs/AdDetails/OperatingSystem";
import { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";
import LowerButton from "../LowerButton";
import Header from "../Header";
export default class SelectOS extends Component {
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
        {this.props.showBackButton && (
          <Header
            screenProps={this.props.screenProps}
            iconColor={globalColors.purple}
            actionButton={() => {
              this.props._handleSideMenuState(false);
            }}
          />
        )}
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <OperatingSystemIcon
              fill={globalColors.rum}
              width={RFValue(50, 414)}
              height={RFValue(50, 414)}
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
