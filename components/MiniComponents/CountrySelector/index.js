import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Item, Input } from "native-base";

//Icon
import LocationIcon from "../../../assets/SVGs/Location.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";

//Styles
import styles from "./styles";

class CountrySelector extends Component {
  constructor() {
    super();
    this.state = {
      filteredCountreis: [],
    };
  }
  componentDidMount() {
    this.setState({
      filteredCountreis: this.props.countries,
    });
  }

  render() {
    const { translate } = this.props.screenProps;
    let countrylist = this.state.filteredCountreis.map((c) => (
      <TouchableOpacity
        key={c.id}
        style={styles.selectTextContainer}
        onPress={() => {
          this.props.onSelectedCountryChange(c.criteria_id);
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-bold",
            color: this.props.country === c.criteria_id ? "#FF9D00" : "#fff",
            fontSize: 14,
          }}
        >
          {translate(c.name)}
        </Text>
      </TouchableOpacity>
    ));
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <LocationIcon width={50} height={80} fill="#fff" />
          <View style={styles.slidercontainer}>
            <Item style={styles.searchBar}>
              <SearchIcon width={18} height={18} stroke="#fff" />
              <Input
                placeholder={translate("Search Country") + "..."}
                style={styles.searchInputText}
                placeholderTextColor="#fff"
                onChangeText={(value) => {
                  let filteredC = this.props.countries.filter((c) =>
                    translate(c.name)
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  );
                  this.setState({ filteredCountreis: filteredC });
                }}
              />
            </Item>

            <ScrollView style={styles.countryScrollContainer}>
              {countrylist}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

export default CountrySelector;
