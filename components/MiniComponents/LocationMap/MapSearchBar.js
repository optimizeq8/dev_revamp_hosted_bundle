import React, { Component } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Axios from "axios";

export default class MapSearchBar extends Component {
  state = { searchValue: "" };
  SearchFilterFunction = (text) => {
    this.setState({ searchValue: text });
  };
  searchForGeocode = (e) => {
    let location = e.nativeEvent.text;
    Axios.get(
      `https://api.geocodify.com/v2/geocode?api_key=710870f62a633c72ad91bc4ab46c4aee88e4dd78&q=${location}`
    )
      .then((res) => res.data)
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));

        let features = data.response.features;
        let coordinates = features[0].geometry.coordinates;
        coordinates = { latitude: coordinates[1], longitude: coordinates[0] };
        this.props.handleRegionChange(coordinates);
      })
      .catch((err) => console.log("err", JSON.stringify(err.response)));
  };
  render() {
    return (
      <View style={{ position: "absolute", width: "100%" }}>
        <SafeAreaView forceInset={{ top: "always" }} />

        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onEndEditing={this.searchForGeocode}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.searchValue}
        />
      </View>
    );
  }
}
