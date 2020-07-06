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

export default class LocaionMap extends Component {
  state = {
    cirLat: 37.78825,
    cirLong: -122.4324,
    radius: 500,
    markers: [],
    circles: [],
    marker: { latitude: 37.78825, longitude: -122.4324 },
    markerSelected: false,
  };
  handleDrag = (e, dragEnd = false) => {
    let cirLat = e.nativeEvent.coordinate.latitude;
    let cirLong = e.nativeEvent.coordinate.longitude;
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({ cirLat, cirLong, markerSelected: dragEnd });
  };
  handleRad = (subtract = false) => {
    let radius = subtract
      ? this.state.marker.radius - 100
      : this.state.marker.radius + 100;
    let marker = this.state.marker;
    marker.radius = radius;
    this.setState({ radius });
    this.animateRad();
    this.timer = setTimeout(() => this.handleRad(subtract), 200);
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
          ...e.nativeEvent.coordinate,
        },
      ],
      marker: {
        coordinate: e.nativeEvent.coordinate,
        key: JSON.stringify(e.nativeEvent.coordinate.latitude),
        radius: 500,
      },
      circles: [
        ...this.state.circles,
        {
          radius: 500,
          ...e.nativeEvent.coordinate,
        },
      ],

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
  handleMarkerLayput = (e, marker) => {};

  handleMapSubmission = () => {
    this.props._handleSideMenuState(false);
    this.props.onSelectedMapChange(this.state.markers);
  };
  render() {
    let { cirLat, cirLong, radius } = this.state;
    return (
      <View style={{ height: "100%" }}>
        <View style={styles.mapContainer}>
          <MapView
            loadingEnabled={true}
            provider={PROVIDER_GOOGLE}
            style={{ height: "100%" }}
            onMarkerPress={(e) => console.log(e.nativeEvent)}
            onLongPress={this.handleAddCir}
            initialRegion={{
              longitude: 48.07012852281332,
              latitude: 29.318775799600733,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
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
                    if (this.cir) {
                      this.cir.setNativeProps({
                        fillColor: "#7778",
                      });
                    }
                  }}
                  ref={(ref) => {
                    this.cir = ref;
                  }}
                  center={marker.coordinate}
                  // center={{ latitude: cirLat, longitude: cirLong }}
                  radius={marker.radius}
                  fillColor={"rgba(132,22,25,1)"}
                />
              </Fragment>
            ))}
            {/* <Marker
            draggable={true}
            geodesic={true}
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            style={{ width: 80, height: 80 }}
            onDrag={this.handleDrag}
          />
          <Circle
            onLayout={() => {
              if (this.cir) {
                this.cir.setNativeProps({
                  fillColor: "#7778",
                });
              }
            }}
            ref={(ref) => {
              this.cir = ref;
            }}
            center={{ latitude: cirLat, longitude: cirLong }}
            radius={radius}
            fillColor={"rgba(132,22,25,1)"}
          /> */}
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
