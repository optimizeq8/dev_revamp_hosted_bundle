import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import LocationIcon from "../../../assets/SVGs/Location";
import InterestIcon from "../../../assets/SVGs/Interests";
import OperatingSystem from "../../../assets/SVGs/AdDetails/OperatingSystem";

import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
import { Icon } from "native-base";
export default class OptionalTargets extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let targeting = this.props.targeting;
    return (
      <View>
        {this.props.region_names.length > 0 && (
          <View style={styles.optionalTargets}>
            <View style={styles.categoryView}>
              <LocationIcon width={hp("2")} height={hp("2")} />
              <Text style={styles.categories}>
                {translate("Regions") + "\n"}
                <Text numberOfLines={1} style={[styles.subtext]}>
                  {this.props.region_names}
                </Text>
              </Text>
            </View>
          </View>
        )}
        {this.props.interesetNames.length > 0 && (
          <View style={styles.optionalTargets}>
            <View style={styles.categoryView}>
              <InterestIcon width={hp("2")} height={hp("2")} />
              <Text numberOfLines={2} style={styles.categories}>
                {translate("Interests") + "\n"}
                <Text numberOfLines={1} style={[styles.subtext]}>
                  {this.props.interesetNames.join(", ")}
                </Text>
              </Text>
            </View>
          </View>
        )}
        {this.props.deviceMakes.length > 0 && (
          <View style={styles.optionalTargets}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="cellphone-settings"
                type="MaterialCommunityIcons"
                style={{
                  color: globalColors.orange,
                  right: 2,
                  fontSize: 23
                }}
              />
              <Text numberOfLines={2} style={styles.categories}>
                {translate("Device Make") + "\n"}{" "}
                <Text style={[styles.subtext]}>{this.props.deviceMakes}</Text>
              </Text>
            </View>
          </View>
        )}
        {targeting.hasOwnProperty("devices") &&
          targeting.devices[0].hasOwnProperty("os_type") && (
            <View style={styles.optionalTargets}>
              <View style={{ flexDirection: "row" }}>
                <OperatingSystem
                  fill={globalColors.orange}
                  width={hp("2.5")}
                  height={hp("2.5")}
                />
                <Text style={styles.categories}>
                  {translate("Operating System") + "\n"}
                  <Text numberOfLines={1} style={[styles.subtext]}>
                    {targeting.devices[0].os_type}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        {targeting.hasOwnProperty("devices") &&
          targeting.devices[0].hasOwnProperty("os_version_max") && (
            <View style={styles.optionalTargets}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="versions"
                  type="Octicons"
                  style={{
                    color: globalColors.orange,
                    right: 2,
                    fontSize: 23,
                    paddingLeft: 10
                  }}
                />
                <Text style={styles.categories}>
                  {translate("OS Versions") + "\n"}
                  <Text numberOfLines={1} style={[styles.subtext]}>
                    {targeting.devices[0].os_version_min + ", "}
                    {targeting.devices[0].os_version_max}
                  </Text>
                </Text>
              </View>
            </View>
          )}
      </View>
    );
  }
}
