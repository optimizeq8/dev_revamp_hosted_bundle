import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import LocationMap from "../LocationMap";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import { Icon } from "native-base";
import LocationRow from "./LocationRow";
import LocationList from "./LocationList";

export default class SnapchatLocation extends Component {
  state = {
    mapModal: false,
    searchModalVisible: false,
    markers: [],
    locationsInfo: [],
    selectedLocation: {},
  };
  handleLocationRows = ({ item }) => {
    return (
      <LocationRow
        handleMapModal={this.handleMapModal}
        handleMarkers={this.handleMarkers}
        id={item.id}
        locationInfo={item}
      />
    );
  };
  handleMapModal = (value, locationInfo) => {
    this.setState({
      mapModal: value,
      selectedLocation: locationInfo,
    });
  };
  handleLocationSearchModal = (value) => {
    this.setState({ searchModalVisible: value });
  };
  handleMarkers = (marker, locInfo) => {
    let markers = this.state.markers;
    let locationsInfo = this.state.locationsInfo;
    let index = locationsInfo.findIndex(
      (loc) => loc.place_id === locInfo.place_id
    );
    console.log(index);
    if (index > -1) {
      locationsInfo.splice(index, 1);
      markers.splice(index, 1);
    } else {
      locationsInfo = [...locationsInfo, locInfo];
      markers = [...markers, marker];
    }
    this.setState({
      markers,
      locationsInfo,
    });
  };
  render() {
    let { ...props } = this.props;
    const { translate } = props.screenProps;
    return (
      <View style={styles.locationContainer}>
        <LocationIcon
          fill={globalColors.gray}
          width={60}
          height={60}
        ></LocationIcon>
        <Text style={styles.title}>{translate("Select location")}</Text>

        <TouchableOpacity
          onPress={() => this.handleLocationSearchModal(true)}
          style={styles.addLocationStyle}
        >
          <Icon style={styles.iconStyle} name="plus" type="Entypo" />
          <Text style={styles.buttonText}>Add location</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.locationsInfo}
          renderItem={this.handleLocationRows}
          keyExtractor={(item) => item}
          contentContainerStyle={{ height: "100%" }}
          style={{ width: "80%", height: "40%" }}
        />
        <Modal
          visible={this.state.mapModal}
          transparent
          animationType="slide"
          onDismiss={() => this.handleMapModal(false)}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "20%",
              position: "absolute",
            }}
            onPress={() => this.handleMapModal(false)}
            activeOpacity={1}
          ></TouchableOpacity>
          <View style={{ top: "20%" }}>
            <LocationMap
              handleMarkers={this.handleMarkers}
              handleMapModal={this.handleMapModal}
              {...props}
            />
          </View>
        </Modal>
        <Modal
          visible={this.state.mapModal}
          transparent
          animationType="slide"
          onDismiss={() => this.handleMapModal(false)}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "20%",
              position: "absolute",
            }}
            onPress={() => this.handleMapModal(false)}
            activeOpacity={1}
          ></TouchableOpacity>
          <View style={{ top: "18%" }}>
            <LocationMap
              {...props}
              selectedLocation={this.state.selectedLocation}
              handleMapModal={this.handleMapModal}
            />
          </View>
        </Modal>

        <Modal
          visible={this.state.searchModalVisible}
          transparent
          animationType="slide"
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "20%",
              position: "absolute",
            }}
            onPress={() => this.handleLocationSearchModal(false)}
            activeOpacity={1}
          ></TouchableOpacity>
          <View style={{ top: "20%" }}>
            <LocationList
              handleMarkers={this.handleMarkers}
              handleLocationSearchModal={this.handleLocationSearchModal}
              {...props}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
