import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Icon } from "native-base";
import { globalColors } from "../../../GlobalStyles";

export default class LocationRow extends Component {
  handleDeletion = (locationInfo) => {
    this.props.handleMarkers(null, locationInfo);
  };
  render() {
    let { locationInfo, index, handleMapModal, result } = this.props;
    return (
      <View style={styles.locationRow}>
        <Text style={styles.locationName}>
          {locationInfo.description.replace(",", " - ")}
        </Text>
        <View style={styles.buttonsContainer}>
          {result ? (
            <Text style={styles.buttonText}>Add</Text>
          ) : (
            <>
              <TouchableOpacity
                style={styles.mapButtonStyle}
                onPress={() => handleMapModal(true, locationInfo, index)}
              >
                <Icon
                  style={{ fontSize: 20 }}
                  name="my-location"
                  type="MaterialIcons"
                ></Icon>
                <Text>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleDeletion(locationInfo)}
                style={styles.deleteLocationStyle}
              >
                <Icon
                  style={{
                    fontSize: 20,
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
