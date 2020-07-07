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
        this.props.handleRegionChange(coordinates, bBox);
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
          this.setState({ autoFeatures });
          this.props.handleShowFlatList(true);
        });
    }, 1000);
  };
  render() {
    return (
      <View style={{ position: "absolute", width: "100%", flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always" }} />
        <SearchBar
          round
          containerStyle={{
            backgroundColor: "#0000",
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.handleAutoComplete(text)}
          //   onEndEditing={this.searchForGeocode}
          onFocus={() =>
            this.state.autoFeatures.length > 0 &&
            this.props.handleShowFlatList(true)
          }
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.searchValue}
        />
        {this.props.showFlatList && (
          <FlatList
            style={{
              top: 20,
              maxHeight: 200,
              borderRadius: 15,
              overflow: "hidden",
              width: "95%",
              alignSelf: "center",
              borderWidth: 0.3,
              backgroundColor: "#fff",
            }}
            data={this.state.autoFeatures}
            //   data={[
            //     { properties: { name: "Salmiya", country: "Kuwait" } },
            //     { properties: { name: "LKNsdv", country: "Kuwait" } },

            //     { properties: { name: "Sallknmiya", country: "Kuwait" } },
            //   ]}
            renderItem={(item) => (
              <SearchResault
                handleRegionChange={this.props.handleRegionChange}
                item={item.item}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        )}
      </View>
    );
  }
}
