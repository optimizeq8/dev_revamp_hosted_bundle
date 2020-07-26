import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Axios from "axios";
import countriesBillingAddress from "../../Data/countries.billingAddress";
import SearchResault from "./SearchResault";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q`
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
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q`
      )
        .then((res) => res.data)
        .then((data) => {
          console.log(JSON.stringify(data, null, 2));

          let results = data.results;
          this.props.handleAutoFeatures(results);
          // this.props.handleShowFlatList(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
  };
  handleCountrySelection = (data, details) => {
    let marker = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      radius: 5000,
    };
    this.props.handleMarkers(marker);
    this.props.handleLocationSearchModal(false);
  };
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.handleCountrySelection(data, details);
            // console.log(
            //   JSON.stringify(data, null, 2),
            //   JSON.stringify(details, null, 2)
            // );
          }}
          nearbyPlacesAPI={"GooglePlacesSearch"}
          query={{
            key: "AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q",
            language: "en",
          }}
        />
        {/* <SearchBar
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
        /> */}
      </View>
    );
  }
}
