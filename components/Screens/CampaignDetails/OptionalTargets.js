import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import LocationIcon from "../../../assets/SVGs/Location.svg";
import InterestIcon from "../../../assets/SVGs/Interests.svg";
import OperatingSystem from "../../../assets/SVGs/AdDetails/OperatingSystem";

import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
import { Icon } from "native-base";
export default class OptionalTargets extends Component {
  render() {
    let targeting = this.props.targeting;
    return (
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(80),
          width: "100%"
        }}
      >
        {this.props.region_names.length > 0 && (
          <View style={styles.optionalTargets}>
            <View style={{ flexDirection: "row" }}>
              <LocationIcon width={hp("2")} height={hp("2")} />
              <Text style={styles.categories}>Regions</Text>
            </View>

            <Text style={[styles.subtext]}>{this.props.region_names}</Text>
          </View>
        )}
        {this.props.interesetNames.length > 0 && (
          <View style={styles.optionalTargets}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <InterestIcon width={hp("2")} height={hp("2")} />
              <Text style={styles.categories}>Interests</Text>
            </View>

            <Text style={[styles.subtext]}>
              {this.props.interesetNames.join(",\n")}
            </Text>
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
              <Text style={styles.categories}>Device Makes</Text>
            </View>

            <Text style={[styles.subtext]}>{this.props.deviceMakes}</Text>
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
                <Text style={styles.categories}>Operating System</Text>
              </View>

              <Text style={[styles.subtext]}>
                {targeting.devices[0].os_type}
              </Text>
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
                <Text style={styles.categories}>OS Versions</Text>
              </View>

              <Text style={[styles.subtext]}>
                {targeting.devices[0].os_version_min + ", "}
                {targeting.devices[0].os_version_max}
              </Text>
            </View>
          )}
      </ScrollView>
    );
  }
}
