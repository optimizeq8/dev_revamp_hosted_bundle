import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import MapSearchBar from "../LocationMap/MapSearchBar";
import SearchResault from "../LocationMap/SearchResault";
import { Icon } from "native-base";
import styles from "./styles";

export default class LocationList extends Component {
  state = { autoFeatures: "" };
  handleAutoFeatures = (list) => {
    this.setState({ autoFeatures: list });
  };
  render() {
    return (
      <View style={styles.locationSearchContainer}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
        >
          <Icon
            onPress={() => this.props.handleLocationSearchModal(false)}
            name="close"
            type="FontAwesome"
            style={{ fontSize: 20, marginHorizontal: 10 }}
          />
          <Text style={styles.title}>Add Country</Text>
        </View>
        <MapSearchBar
          handleAutoFeatures={this.handleAutoFeatures}
          //   handleShowFlatList={this.handleShowFlatList}
          country_code={this.props.country_code}
          showFlatList={this.state.showFlatList}
          handleRegionChange={this.handleRegionChange}
        />

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
          //   data={this.state.autoFeatures}
          data={[
            { properties: { region: "Salmiya", country: "Kuwait" } },
            { properties: { region: "LKNsdv", country: "Kuwait" } },

            { properties: { region: "Sallknmiya", country: "Kuwait" } },
          ]}
          renderItem={(item) => (
            <SearchResault
              // // handleRegionChange={this.props.handleRegionChange}
              item={item.item}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  }
}
