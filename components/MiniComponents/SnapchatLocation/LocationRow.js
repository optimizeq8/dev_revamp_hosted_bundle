import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
import { Icon } from "native-base";
import { globalColors } from "../../../GlobalStyles";

export default class LocationRow extends Component {
  handleDeletion = (locationInfo) => {
    this.props.handleMarkers(null, locationInfo, true);
  };
  render() {
    let { locationInfo, index, handleMapModal, result } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.locationRow}>
        <Text style={styles.locationName}>
          {locationInfo &&
            locationInfo.description &&
            locationInfolocationInfo.description.replace(",", " - ")}
        </Text>
        <View style={styles.buttonsContainer}>
          {result ? (
            <Text style={styles.buttonText}>{translate("Add")}</Text>
          ) : (
            <>
              <TouchableOpacity
                style={styles.mapButtonStyle}
                onPress={() => handleMapModal(true, locationInfo, index)}
              >
                <Icon
                  style={{ fontSize: RFValue(10, 414) }}
                  name="my-location"
                  type="MaterialIcons"
                ></Icon>
                <Text style={{ fontSize: RFValue(6, 414) }}>
                  {translate("Map")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleDeletion(locationInfo)}
                style={styles.deleteLocationStyle}
              >
                <Icon
                  style={{
                    fontSize: RFValue(10, 414),
                    color: globalColors.purple,
                  }}
                  name="delete-outline"
                  type="MaterialCommunityIcons"
                ></Icon>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }
}
