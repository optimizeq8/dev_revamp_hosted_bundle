import React, { Component } from "react";
import { Text, View } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  Callout,
} from "react-native-maps";
import { Button } from "native-base";

export default class LocaionMap extends Component {
  state = {
    cirLat: 37.78825,
    cirLong: -122.4324,
    cirRad: 1000,
    markers: [],
    marker: { latitude: 37.78825, longitude: -122.4324 },
  };
  handleDrag = (e) => {
    let cirLat = e.nativeEvent.coordinate.latitude;
    let cirLong = e.nativeEvent.coordinate.longitude;
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({ cirLat, cirLong });
  };
  handleRad = (subtract = false) => {
    let cirRad = subtract
      ? this.state.marker.cirRad - 100
      : this.state.marker.cirRad + 100;
    let marker = this.state.marker;
    marker.cirRad = cirRad;
    this.setState({ cirRad });
  };
  handleAddCir = (e) => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: JSON.stringify(e.nativeEvent.coordinate.latitude),
          cirRad: 1000,
        },
      ],
      marker: {
        coordinate: e.nativeEvent.coordinate,
        key: JSON.stringify(e.nativeEvent.coordinate.latitude),
        cirRad: 1000,
      },
    });
  };
  handleMarkerSelect = (e, marker, onPress = false) => {
    if (onPress) {
      console.log(JSON.stringify(e.nativeEvent, null, 2));
    }
    this.setState({ marker });
  };
  handleMarkerLayput = (e, marker) => {
    console.log(JSON.stringify(e.nativeEvent, null, 2));
  };
  render() {
    let { cirLat, cirLong, cirRad } = this.state;
    return (
      <View
        style={{
          height: 400,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ height: 400 }}
          onMarkerPress={(e) => console.log(e.nativeEvent)}
          onLongPress={this.handleAddCir}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.markers.map((marker) => (
            <>
              <Marker
                onLayout={this.handleMarkerLayput}
                draggable={true}
                geodesic={true}
                onDragEnd={this.handleDrag}
                coordinate={marker.coordinate}
                onDragStart={(e) => this.handleMarkerSelect(e, marker)}
                style={{ width: 80, height: 80 }}
                title="Hiii"
                // onDrag={this.handleDrag}
                onSelect={(e) => this.handleMarkerSelect(e, marker, true)}
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
                radius={marker.cirRad}
                fillColor={"rgba(132,22,25,1)"}
              />
            </>
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
            radius={cirRad}
            fillColor={"rgba(132,22,25,1)"}
          /> */}
        </MapView>
      </View>
    );
  }
}
