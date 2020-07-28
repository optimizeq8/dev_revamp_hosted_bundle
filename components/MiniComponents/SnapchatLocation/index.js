import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import LocationMap from "../LocationMap";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import { Icon } from "native-base";
import LocationRow from "./LocationRow";
import LocationList from "./LocationList";
import LowerButton from "../LowerButton";

export default class SnapchatLocation extends Component {
  state = {
    mapModal: false,
    searchModalVisible: false,
    markers: [],
    locationsInfo: [],
    selectedLocation: {},
  };
  componentDidMount() {
    if (this.props.data.hasOwnProperty("markers")) {
      this.setState({
        markers: this.props.data.markers,
        locationsInfo: this.props.data.locationsInfo,
      });
    }
  }
  handleLocationRows = ({ item, index }) => {
    return (
      <LocationRow
        handleMapModal={this.handleMapModal}
        handleMarkers={this.handleMarkers}
        id={item.place_id + index}
        locationInfo={item}
        index={index}
      />
    );
  };
  handleMapModal = (value, locationInfo, index) => {
    if (locationInfo) {
      locationInfo.index = index;
      this.setState({
        selectedLocation: locationInfo,
      });
    }
    this.setState({
      mapModal: value,
    });
  };
  handleLocationSearchModal = (value) => {
    this.setState({ searchModalVisible: value });
  };
  handleMarkers = (marker, locInfo, remove = false) => {
    let markers = this.state.markers;
    let locationsInfo = this.state.locationsInfo;
    let index = locationsInfo.findIndex(
      (loc) => loc.place_id === locInfo.place_id
    );
    console.log(index);
    if (index > -1 && remove) {
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
  updateMarkerLocation = (location) => {
    let index = location.index;
    let locationsInfo = this.state.locationsInfo;
    let loc = locationsInfo[index];
    loc.coordinates = location.coordinates;
    let markers = this.state.markers;
    let marker = markers[index];
    marker.latitude = location.coordinates.latitude;
    marker.longitude = location.coordinates.longitude;
    marker.radius = location.radius;
    this.setState({ markers, locationsInfo });
  };
  handleSubmisionOfMarkers = () => {
    let markers = this.state.markers;
    markers = markers.map((mrk) => ({
      latitude: mrk.latitude,
      longitude: mrk.longitude,
      radius: mrk.radius,
    }));
    this.props.onSelectedMapChange(markers);
    this.props.save_campaign_info({
      markers: this.state.markers,
      locationsInfo: this.state.locationsInfo,
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
          keyExtractor={(item, index) => item.place_id + index}
          contentContainerStyle={{ height: "100%" }}
          style={{ width: "80%", height: "40%" }}
        />
        <LowerButton
          checkmark
          screenProps={this.props.screenProps}
          purpleViolet
          style={{ alignSelf: "flex-end", right: 30 }}
          function={this.handleSubmisionOfMarkers}
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
              {...props}
              handleMarkers={this.handleMarkers}
              handleMapModal={this.handleMapModal}
              selectedLocation={this.state.selectedLocation}
              updateMarkerLocation={this.updateMarkerLocation}
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
