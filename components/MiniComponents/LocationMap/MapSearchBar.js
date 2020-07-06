import React, { Component } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-navigation";

export default class MapSearchBar extends Component {
  state = { searchValue: "" };
  SearchFilterFunction = (text) => {
    this.setState({ searchValue: text });
  };
  render() {
    return (
      <View style={{ position: "absolute", width: "100%" }}>
        <SafeAreaView forceInset={{ top: "always" }} />

        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.searchValue}
        />
      </View>
    );
  }
}
