import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Axios from "axios";
import countriesBillingAddress from "../../Data/countries.billingAddress";
import SearchResault from "./SearchResault";

export default class MapSearchBar extends Component {
  state = { searchValue: "", autoFeatures: "" };
  SearchFilterFunction = (text) => {
    this.setState({ searchValue: text });
  };
  searchForGeocode = (e) => {
    let location = e.nativeEvent.text;
    let countryName = "";
    if (this.props.country_code === "sa") {
      countryName = "Saudi Arabia";
    } else if (this.props.country_code === "ae") {
      countryName = "United Arab Emirates";
    } else
      countryName = countriesBillingAddress.find(
        (country) => country.value === this.props.country_code
      ).label;
    Axios.get(
      `https://api.geocodify.com/v2/geocode?api_key=710870f62a633c72ad91bc4ab46c4aee88e4dd78&q=${location}`
    )
      .then((res) => res.data)
      .then((data) => {
        let features = data.response.features;
        let country = features.find(
          (cou) => cou.properties.country === countryName
        );
        let coordinates = country.geometry.coordinates;
        let bBox = country.bbox; //boundries of country
        // this.props.handleRegionChange(coordinates, bBox);
      })
      .catch((err) => console.log("err", err));
  };
  handleAutoComplete = (location) => {
    this.SearchFilterFunction(location);
    setTimeout(() => {
      Axios.get(
        `https://api.geocodify.com/v2/autocomplete?api_key=710870f62a633c72ad91bc4ab46c4aee88e4dd78&q=${location}`
      )
        .then((res) => res.data)
        .then((data) => {
          let autoFeatures = data.response.features;
          this.props.handleAutoFeatures(autoFeatures);
          // this.props.handleShowFlatList(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
  };
  render() {
    return (
      <View style={{ width: "100%" }}>
        <SearchBar
          round
          containerStyle={{
            backgroundColor: "#fff",
            borderBottomWidth: 0,
            borderTopWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#0001",
          }}
          placeholderTextColor={"#0003"}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.handleAutoComplete(text)}
          //   onEndEditing={this.searchForGeocode}
          // onFocus={() =>
          //   this.state.autoFeatures.length > 0 &&
          //   // this.props.handleShowFlatList(true)
          // }
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Search for country or region"
          value={this.state.searchValue}
        />
      </View>
    );
  }
}
