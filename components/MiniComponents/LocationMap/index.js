import React, { Component } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";

export default class LocaionMap extends Component {
  render() {
    return (
      <View style={{ height: 400, justifyContent: "center" }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ height: 400 }}
          customMapStyle={[
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#242f3e",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#746855",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#242f3e",
                },
              ],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563",
                },
              ],
            },
            {
              featureType: "poi.business",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#263c3f",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#6b9a76",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#38414e",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#212a37",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9ca5b3",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#746855",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#1f2835",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#f3d19c",
                },
              ],
            },
            {
              featureType: "road.local",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [
                {
                  color: "#2f3948",
                },
              ],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#17263c",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#515c6d",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#17263c",
                },
              ],
            },
          ]}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable={true}
            geodesic={true}
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            style={{ width: 80, height: 80 }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 50,
                backgroundColor: "#3f35",
                zIndex: 10,
                position: "absolute",
                alignSelf: "center",
              }}
            />
          </Marker>
          <Circle
            center={{ latitude: 37.78825, longitude: -122.4324 }}
            radius={1000}
            fillColor={"rgba(132,22,25,1"}
          />
        </MapView>
      </View>
    );
  }
}
