import React, { Component, Fragment } from "react";
import { Text, View, Animated, Dimensions } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  Callout,
} from "react-native-maps";
import { Button, Icon } from "native-base";
import LowerButton from "../LowerButton";
import { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import { cloneDeep } from "lodash";
import MapSearchBar from "./MapSearchBar";
import { SafeAreaView } from "react-navigation";
import Axios from "axios";
import countries from "../../Data/countries.billingAddress";
export default class LocaionMap extends Component {
  state = {
    initialRegion: {
      longitude: 0,
      latitude: 0,
      latitudeDelta: 3,
      longitudeDelta: 3,
    },
    radius: 500,
    markers: [],
    circles: [],
    marker: {
      latitude: 37.78825,
      longitude: -122.4324,
      radius: 500,
    },
    markerSelected: false,
    showFlatList: false,
  };
  cirRefs = {};
  componentDidMount() {
    console.log(this.props.country_code);

    if (this.props.country_code) {
      this.handleInitialRegion();
    }
    if (this.props.circles.length > 0) {
      let cirs = this.props.circles.map((cir) => ({
        key: JSON.stringify(cir.latitude),
        coordinate: {
          latitude: cir.latitude,
          longitude: cir.longitude,
        },
        radius: cir.radius,
      }));
      this.setState({ markers: cirs });
    }
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
    if (subtract) {
      if (this.state.marker.radius > 250)
        radius = this.state.marker.radius - 250;
    } else {
      if (this.state.marker.radius < 100000)
        radius = this.state.marker.radius + 250;
    }
    let marker = this.state.marker;
    marker.radius = radius;
    this.setState({ radius });
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
          radius: 500,
        },
      ],
      marker: {
        coordinate: e.nativeEvent.coordinate,
        key: JSON.stringify(e.nativeEvent.coordinate.latitude),
        radius: 500,
      },
      markerSelected: false,
    });
  };

  handleRemoveCir = () => {
    let mrkers = this.state.markers;
    mrkers = mrkers.filter((mrk) => mrk.key !== this.state.marker.key);

    this.setState({ markers: mrkers, markerSelected: false });
  };
  handleMarkerSelect = (e, marker, onPress = false) => {
    this.setState({ marker, markerSelected: onPress });
  };
  handleRegionChange = (coordinates, bBox = {}) => {
    coordinates = {
      latitude: coordinates[1],
      longitude: coordinates[0],
    };
    bBox = {
      southWest: {
        latitude: bBox[1],
        longitude: bBox[0],
      },
      northEast: {
        latitude: bBox[3],
        longitude: bBox[2],
      },
    };
    let { width, height } = Dimensions.get("window");
    let ASPECT_RATIO = width / height;
    let northeastLat = parseFloat(bBox.northEast.latitude);
    let southwestLat = parseFloat(bBox.southWest.latitude);
    let latDelta = northeastLat - southwestLat;
    let lngDelta = latDelta * ASPECT_RATIO * 2.5;
    let zoomLevel = {
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
    this.map.animateToRegion(
      {
        ...this.state.initialRegion,
        ...coordinates,
        ...zoomLevel,
      },
      500
    );
    this.setState({
      initialRegion: {
        ...this.state.initialRegion,
        ...coordinates,
        ...zoomLevel,
      },
    });
  };

  handleInitialRegion = () => {
    let { country_code } = this.props;
    console.log(country_code);
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
      });
  };
  handleShowFlatList = (showFlatList) => {
    this.setState({ showFlatList });
  };
  handleMapSubmission = () => {
    let markers = cloneDeep(this.state.markers);
    markers = markers.map((mrk) => ({
      latitude: mrk.coordinate.latitude,
      longitude: mrk.coordinate.longitude,
      radius: mrk.radius,
    }));
    this.props.onSelectedMapChange(markers);
    this.props._handleSideMenuState(false);
  };
  render() {
    let { cirLat, cirLong, radius } = this.state;
    return (
      <View style={{ height: "100%" }}>
        <SafeAreaView forceInset={{ top: "always" }} />
        <View style={styles.mapContainer}>
          <MapView
            ref={(ref) => (this.map = ref)}
            loadingEnabled={true}
            provider={PROVIDER_GOOGLE}
            onPress={() => this.handleShowFlatList(false)}
            onPanDrag={() => this.handleShowFlatList(false)}
            style={{ height: "100%" }}
            onMarkerPress={(e) => console.log(e.nativeEvent)}
            onLongPress={this.handleAddCir}
            initialRegion={this.state.initialRegion}
          >
            {this.state.markers.map((marker) => (
              <Fragment key={marker.key}>
                <Marker
                  draggable={true}
                  geodesic={true}
                  onDragEnd={(e) => this.handleDrag(e, true)}
                  coordinate={marker.coordinate}
                  onDragStart={(e) => this.handleMarkerSelect(e, marker)}
                  style={{ width: 80, height: 80 }}
                  title="Hold to drag"
                  onPress={(e) => this.handleMarkerSelect(e, marker, true)}
                  // onDrag={this.handleDrag}
                />
                <Circle
                  onLayout={() => {
                    if (this.cirRefs[marker.coordinate.latitude]) {
                      this.cirRefs[marker.coordinate.latitude].setNativeProps({
                        fillColor: "#7778",
                      });
                    }
                  }}
                  ref={(ref) => {
                    this.cirRefs[marker.coordinate.latitude] = ref;
                  }}
                  center={marker.coordinate}
                  radius={marker.radius}
                  fillColor={"#7778"}
                />
              </Fragment>
            ))}
          </MapView>
        </View>
        {this.state.markerSelected && (
          <View style={styles.buttonContainer}>
            <Button
              onPressOut={() => this.stopTimer()}
              onPressIn={() => this.handleRad(true)}
              style={styles.mapButtons}
            >
              <Text style={styles.buttonText}>-</Text>
            </Button>
            <Button onPress={this.handleRemoveCir} style={styles.mapButtons}>
              <Icon
                type="AntDesign"
                name="delete"
                style={{ width: "100%", textAlign: "center" }}
              />
            </Button>

            <Button
              onPressOut={() => this.stopTimer()}
              onPressIn={() => this.handleRad(false)}
              style={styles.mapButtons}
            >
              <Text style={styles.buttonText}>+</Text>
            </Button>
          </View>
        )}
        {this.state.markers.length > 0 && (
          <Text
            style={{
              fontFamily: "montserrat-regular",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Select a marker to increase its size
          </Text>
        )}
        <MapSearchBar
          handleShowFlatList={this.handleShowFlatList}
          country_code={this.props.country_code}
          showFlatList={this.state.showFlatList}
          handleRegionChange={this.handleRegionChange}
        />
        <LowerButton
          screenProps={this.props.screenProps}
          checkmark={true}
          // style={[styles.button]}
          function={this.handleMapSubmission}
        />
      </View>
    );
  }
}
