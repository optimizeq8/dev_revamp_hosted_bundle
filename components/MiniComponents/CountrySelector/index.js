import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input } from "native-base";
import { SafeAreaView } from "react-navigation";

//Icon
import LocationIcon from "../../../assets/SVGs/Location.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";

//Styles
import styles from "./styles";

class CountrySelector extends Component {
  constructor() {
    super();
    this.state = {
      filteredCountreis: []
    };
  }
  componentDidMount() {
    this.setState({
      filteredCountreis: this.props.countries
    });
  }
  componentDidUpdate(prevProps) {}

  render() {
    const { translate } = this.props.screenProps;
    let countrylist = this.state.filteredCountreis.map(c => (
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
            fontSize: 14
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
          {/* <Text style={styles.title}> Select Country </Text> */}

          <View style={styles.slidercontainer}>
            <Item
              style={{
                marginBottom: 10,
                marginTop: 20,
                alignSelf: "center",
                width: 300,
                borderColor: "#0000",
                backgroundColor: "rgba(0,0,0,0.15)",
                borderRadius: 30,
                paddingHorizontal: 15
              }}
            >
              <SearchIcon width={18} height={18} stroke="#fff" style={{}} />
              <Input
                placeholder={translate("Search Country") + "..."}
                style={styles.searchInputText}
                placeholderTextColor="#fff"
                onChangeText={value => {
                  let filteredC = this.props.countries.filter(c =>
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

        {/* <Button
            style={styles.button}
            onPress={() => this.props._handleMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button> */}
      </View>
    );
  }
}

export default CountrySelector;
