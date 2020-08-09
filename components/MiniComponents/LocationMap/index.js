import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  Callout,
} from "react-native-maps";
import { Button, Icon } from "native-base";
import LowerButton from "../LowerButton";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import { cloneDeep } from "lodash";
import MapSearchBar from "./MapSearchBar";
import { SafeAreaView } from "react-navigation";
import Axios from "axios";
import countries from "../../Data/countries.billingAddress";
import GradientButton from "../GradientButton";
import MapMarker from "../../../assets/SVGs/MapMarker";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
export default class LocaionMap extends Component {
  state = {
    initialRegion: {
      // longitude: 42,
      // latitude: 27,
      // latitudeDelta: 30,
      // longitudeDelta: 3,
      longitude: 46.55303989999999,
      latitude: 28,
      latitudeDelta: 30,
      longitudeDelta: 3,
    },
    radius: 1000,
    markers: [],
    circles: [],
    marker: {
      latitude: 37.78825,
      longitude: -122.4324,
      radius: 500,
    },
    markerSelected: false,
    showFlatList: false,
    x: 50,
    y: 50,
    dropped: false,
    width: widthPercentageToDP(30),
    mapReady: false,
  };
  cirRefs = {};

  componentDidMount() {
    if (this.props.selectedLocation) {
      setTimeout(() => {
        this.handleRegionChange(this.props.selectedLocation);
      }, 100);
    }
    // if (this.props.circles.length > 0) {
    //   let cirs = this.props.circles.map((cir) => ({
    //     key: JSON.stringify(cir.latitude),
    //     coordinate: {
    //       latitude: cir.latitude,
    //       longitude: cir.longitude,
    //     },
    //     radius: cir.radius,
    //   }));
    //   this.setState({ markers: cirs });
    // }
  }
  handleDrag = (e, dragEnd = false) => {
    let cirLat = e.nativeEvent.coordinate.latitude;
    let cirLong = e.nativeEvent.coordinate.longitude;
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({ cirLat, cirLong, markerSelected: dragEnd });
  };
  handleRad = (subtract = false) => {
    let radius = this.state.marker.radius;
    let width = this.state.width;
    // if (subtract) {
    //   if (this.state.width > 100) width = this.state.width - 10;
    //   // radius = this.state.marker.radius - 250;
    // } else {
    //   if (this.state.width < 600) width = this.state.width + 10;
    //   // radius = this.state.marker.radius + 250;
    // }
    if (subtract) {
      if (this.state.marker.radius > 250)
        radius = this.state.marker.radius - 250;
    } else {
      if (this.state.marker.radius < 100000)
        radius = this.state.marker.radius + 250;
    }
    let marker = this.state.marker;
    marker.radius = radius;
    let markers = this.state.markers;
    markers[0] = marker;
    this.setState({ radius, width, marker });
    this.timer = setTimeout(() => this.handleRad(subtract), 20);
  };
  stopTimer = () => {
    clearTimeout(this.timer);
  };
  handleAddCir = (e) => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: JSON.stringify(e.nativeEvent.coordinate.latitude),
          radius: this.state.radius,
        },
      ],
      marker: {
        coordinate: e.nativeEvent.coordinate,
        key: JSON.stringify(e.nativeEvent.coordinate.latitude),
        radius: this.state.radius,
      },
      markerSelected: false,
      dropped: true,
    });
  };

  handleRemoveCir = () => {
    let mrkers = this.state.markers;
    mrkers = mrkers.filter((mrk) => mrk.key !== this.state.marker.key);
    // this.props.handleMarkers(mrkers);
    this.setState({
      markers: mrkers,
      markerSelected: false,
      dropped: false,
    });
  };
  handleMarkerSelect = (e, marker, onPress = false) => {
    this.setState({ marker, markerSelected: onPress });
  };
  handleRegionChange = async (selectedLocation) => {
    try {
      if (selectedLocation) {
        let { coordinates, bBox } = selectedLocation;
        let { width, height } = Dimensions.get("window");
        let ASPECT_RATIO = width / height;
        let northeastLat = parseFloat(bBox.northeast.lat);
        let southwestLat = parseFloat(bBox.southwest.lat);
        let latDelta = northeastLat - southwestLat;
        let lngDelta = latDelta * ASPECT_RATIO * 1.8;
        let northeast = {
          latitude: bBox.northeast.lat,
          longitude: bBox.northeast.lng,
        };
        let southwest = {
          latitude: bBox.southwest.lat,
          longitude: bBox.southwest.lng,
        };
        this.map.setMapBoundaries(northeast, southwest);
        let zoomLevel = {
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        };
        let initialRegion = {
          ...coordinates,
          ...zoomLevel,
        };
        this.map.animateToRegion({ ...initialRegion }, 1000);
        this.setState(
          {
            initialRegion: initialRegion,
            radius: selectedLocation.saved
              ? selectedLocation.radius
              : 5000 * (latDelta > 0.1 ? latDelta : 0.1),
          },
          () => {
            this.handleAddCir({ nativeEvent: { coordinate: coordinates } });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleInitialRegion = () => {
    let { country_code } = this.props;
    let countryName = "";
    if (country_code === "sa") {
      countryName = "Saudi Arabia";
    } else if (country_code === "ae") {
      countryName = "United Arab Emirates";
    } else
      countryName = countries.find((country) => country.value === country_code)
        .label;
    Axios.get(
      `https://api.geocodify.com/v2/geocode?api_key=710870f62a633c72ad91bc4ab46c4aee88e4dd78&q=${countryName}`
    )
      .then((res) => res.data)
      .then((data) => {
        let features = data.response.features;
        let country = features.find(
          (country) => country.properties.country === countryName
        );
        let countryCoords = country.geometry.coordinates;
        let bBox = country.bbox; //boundries of country
        this.handleRegionChange(countryCoords, bBox);
      })
      .catch((err) => {});
  };
  handleShowFlatList = (showFlatList) => {
    this.setState({ showFlatList });
  };
  handleMapSubmission = () => {
    let markers = cloneDeep(this.state.markers);
    let marker = {
      coordinates: {
        latitude: markers[0].coordinate.latitude,
        longitude: markers[0].coordinate.longitude,
      },
      radius: markers[0].radius,
      index: this.props.selectedLocation.index,
    };
    this.props.updateMarkerLocation(marker);
    this.props.handleMapModal(
      false,
      this.props.selectedLocation,
      this.props.selectedLocation.index
    );
  };
  handlePin = () => {
    this.state.dropped
      ? this.handleRemoveCir()
      : this.handleAddCir({
          nativeEvent: {
            coordinate: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          },
        });
  };
  render() {
    let { cirLat, cirLong, radius } = this.state;
    const { translate } = this.props.screenProps;
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: "#fff",
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={[
              globalStyles.row,
              {
                flex: 1,
              },
            ]}
          >
            <Icon
              onPress={() =>
                this.props.handleMapModal(
                  false,
                  this.props.selectedLocation,
                  this.props.selectedLocation.index
                )
              }
              name="close"
              type="FontAwesome"
              style={{ fontSize: 20, marginHorizontal: 10 }}
            />
            <View>
              <Text style={[styles.mapTitle, { fontSize: 17 }]}>
                {translate("Precise Location")}
              </Text>
              <Text
                style={[
                  styles.mapTitle,
                  {
                    fontSize: 12,
                    fontFamily: "montserrat-regular",
                  },
                ]}
              >
                {translate("Select a specific location")}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.handleMapSubmission}>
            <Text style={[styles.rangeStyle, { fontSize: 14 }]}>
              {translate("Save")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={[
              globalStyles.row,
              {
                justifyContent: "space-evenly",
                width: 100,
              },
            ]}
          >
            <Icon type="FontAwesome" name="circle-thin" />
            <View>
              <Text style={styles.mapTitle}>Range</Text>
              <Text style={styles.rangeStyle}>
                {(this.state.radius / 1000).toFixed(2)} KM
              </Text>
            </View>
          </View>
          <View style={globalStyles.row}>
            <Button
              onPressOut={() => this.stopTimer()}
              onPressIn={() => this.handleRad(true)}
              style={[styles.mapButtons, styles.leftButton]}
            >
              <Text style={styles.buttonText}>-</Text>
            </Button>
            <Button
              onPressOut={() => this.stopTimer()}
              onPressIn={() => this.handleRad(false)}
              style={[styles.mapButtons, styles.rightButton]}
            >
              <Text style={styles.buttonText}>+</Text>
            </Button>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            onMapReady={() => this.setState({ mapReady: true })}
            onRegionChangeComplete={(reg) => {
              this.map
                .pointForCoordinate({
                  latitude: reg.latitude,
                  longitude: reg.longitude,
                })
                .then((p) => {
                  this.setState({ ...p });
                });

              this.setState({ ...reg });
            }}
            ref={(ref) => (this.map = ref)}
            loadingEnabled={true}
            provider={PROVIDER_GOOGLE}
            onPress={() => this.handleShowFlatList(false)}
            onPanDrag={() => this.handleShowFlatList(false)}
            style={{ height: "100%" }}
            // onLongPress={this.handleAddCir}
            initialRegion={this.state.initialRegion}
            // minZoomLevel={this.state.initialRegion.latitudeDelta > 8 ? 5 : 8}
            maxZoomLevel={15}
          >
            {this.state.markers.map((marker) => (
              <Fragment key={marker.key}>
                <Marker
                  draggable={true}
                  geodesic={true}
                  onDragEnd={(e) => this.handleDrag(e, true)}
                  coordinate={marker.coordinate}
                  onDragStart={(e) => this.handleMarkerSelect(e, marker)}
                  style={{ width: 100, height: 100 }}
                  title="Hold to drag"
                  onPress={(e) => this.handleMarkerSelect(e, marker, true)}
                  // onDrag={this.handleDrag}
                >
                  <MapMarker />
                </Marker>
                <Circle
                  onLayout={() => {
                    if (this.cirRefs[marker.coordinate.latitude]) {
                      this.cirRefs[marker.coordinate.latitude].setNativeProps({
                        fillColor: globalColors.purpleTran,
                      });
                    }
                  }}
                  ref={(ref) => {
                    this.cirRefs[marker.coordinate.latitude] = ref;
                  }}
                  center={marker.coordinate}
                  radius={this.state.marker.radius}
                  fillColor={globalColors.purpleTran}
                  strokeColor="#9304FF"
                />
              </Fragment>
            ))}
          </MapView>
          {!this.state.dropped && (
            <View pointerEvents="none" style={styles.circleMarker(this.state)}>
              <MapMarker style={{ bottom: 20 }} />
              <Text style={styles.pinTextStyle}>
                {translate("Drop pin here")}
              </Text>
            </View>
          )}
          <GradientButton
            radius={50}
            purpleViolet
            style={styles.pinButton}
            onPressAction={this.handlePin}
            text={
              this.state.dropped
                ? translate("Remove pin")
                : translate("Drop pin")
            }
            uppercase={true}
          />
        </View>

        {/* {this.state.markers.length > 0 && (
          <Text
            style={{
              fontFamily: "montserrat-regular",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Select a marker to increase its size
          </Text>
        )} */}
        {/* <MapSearchBar
          handleShowFlatList={this.handleShowFlatList}
          country_code={this.props.country_code}
          showFlatList={this.state.showFlatList}
          handleRegionChange={this.handleRegionChange}
        /> */}
        {/* <LowerButton
          screenProps={this.props.screenProps}
          checkmark={true}
          // style={[styles.button]}
          function={this.handleMapSubmission}
        /> */}
      </View>
    );
  }
}
