import React, { Component } from "react";
import { View } from "react-native";
import Axios from "axios";
import countriesBillingAddress from "../../Data/countries.billingAddress";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PredefinedPlaces from "./PredefinedPlaces";
import { Icon } from "native-base";
import { globalColors } from "../../../GlobalStyles";
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
      .catch((err) => {
        //  console.log("err", err)}
      });
  };
  handleAutoComplete = (location) => {
    this.SearchFilterFunction(location);
    setTimeout(() => {
      Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q`
      )
        .then((res) => res.data)
        .then((data) => {
          let results = data.results;
          this.props.handleAutoFeatures(results);
          // this.props.handleShowFlatList(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
  };
  handleCountrySelection = (data, details) => {
    let northeastLat = parseFloat(details.geometry.viewport.northeast.lat);
    let southwestLat = parseFloat(details.geometry.viewport.southwest.lat);
    let latDelta = northeastLat - southwestLat;
    let radius = 5000 * (latDelta > 0.1 ? latDelta : 0.1);
    let marker = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      radius: Math.round(radius / 1000) * 1000,
      place_id: data.place_id,
    };
    let countryName =
      details.address_components[details.address_components.length - 1]
        .long_name;
    let country_code = details.address_components[
      details.address_components.length - 1
    ].short_name.toLowerCase();
    if (!isNaN(parseInt(countryName))) {
      countryName =
        details.address_components[details.address_components.length - 2]
          .long_name;
      country_code = details.address_components[
        details.address_components.length - 2
      ].short_name.toLowerCase();
    }
    if (countryName === "Saudi Arabia") {
      countryName = "KSA";
    } else if (countryName === "United Arab Emirates") {
      countryName = "UAE";
    }
    let locationInfo = {
      country_code,
      countryName,
      description: data.description,
      coordinates: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      },
      bBox: {
        ...details.geometry.viewport,
      },
      place_id: data.place_id,
    };

    this.props.handleMarkers(marker, locationInfo);
    this.props.handleLocationSearchModal(false);
  };
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          autoFocus
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.handleCountrySelection(data, details);
            // console.log(
            //   JSON.stringify(data, null, 2),
            //   JSON.stringify(details, null, 2)
            // );
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI={"GooglePlacesSearch"}
          query={{
            key: "AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q",
            language: "en",
            components: "country:sa|country:ae|country:om",
          }}
          renderLeftButton={() => (
            <Icon name="search" type="Fontisto" style={{ fontSize: 20 }} />
          )}
          // renderRow={(props) => {
          //   console.log(JSON.stringify(props, null, 2));
          //   return (
          //     <View>
          //       <Text>hi</Text>
          //     </View>
          //   );
          // }}
          predefinedPlaces={PredefinedPlaces}
          styles={{
            textInputContainer: {
              backgroundColor: "#fff",
              alignItems: "center",
              paddingHorizontal: 10,
              borderTopWidth: 0,
              alignSelf: "center",
              borderRadius: 50,
              width: "90%",
              borderBottomWidth: 0,
              alignItem: "center",
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
            },
            listView: {
              top: 30,
            },
            separator: {
              backgroundColor: "#0000",
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: globalColors.gray,
              fontSize: 16,
              borderRadius: 50,
              fontFamily: "montserrat-regular",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
              fontFamily: "montserrat-bold",
            },
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
