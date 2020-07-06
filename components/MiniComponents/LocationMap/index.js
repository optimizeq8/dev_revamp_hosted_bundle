import React, { Component, Fragment } from "react";
import { Text, View, Animated } from "react-native";
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
export default class LocaionMap extends Component {
  state = {
    initialRegion: {
      longitude: 48.07012852281332,
      latitude: 29.318775799600733,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    radius: 500,
    markers: [],
    circles: [],
    marker: { latitude: 37.78825, longitude: -122.4324, radius: 500 },
    markerSelected: false,
  };
  cirRefs = {};
  componentDidMount() {
    if (this.props.circles.length > 0) {
      let cirs = this.props.circles.map((cir) => ({
        key: JSON.stringify(cir.latitude),
        coordinate: { latitude: cir.latitude, longitude: cir.longitude },
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
  handleRegionChange = (coordinates) => {
    this.map.animateToRegion(
      { ...this.state.initialRegion, ...coordinates },
      500
    );
    this.setState({
      initialRegion: { ...this.state.initialRegion, ...coordinates },
    });
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
                {/* <Callout style={{ width: 200 }}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    style={{ width: 50, justifyContent: "center" }}
                    onPress={() => this.handleRad(false)}
                  >
                    <Text>+</Text>
                  </Button>
                  <Button
                    style={{ width: 50, justifyContent: "center" }}
                    onPress={() => this.handleRad(true)}
                  >
                    <Text>-</Text>
                  </Button>
                </View>
              </Callout>
              */}
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
        <MapSearchBar handleRegionChange={this.handleRegionChange} />
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
