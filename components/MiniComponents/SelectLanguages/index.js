import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import LocationIcon from "../../../assets/SVGs/Location";
import { Input, Button, Item } from "native-base";
import styles from "./styles";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
export default class SelectLanguages extends Component {
  render() {
    let languagelist = this.props.filteredLanguages.map(c => (
      <TouchableOpacity
        key={c.value}
        style={{
          paddingVertical: 10,
          marginVertical: 10,
          backgroundColor: this.props.demographics[0].languages.find(
            l => l === c.value
          )
            ? "#FF9D00"
            : "transparent",
          borderRadius: 10,
          paddingLeft: 5
        }}
        onPress={() => {
          this.props.onSelectedLangsChange(c.value);
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-bold",
            color: "#fff",
            fontSize: 14
          }}
        >
          {c.label}
        </Text>
      </TouchableOpacity>
    ));
    return (
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <LocationIcon width={110} height={110} fill="#fff" />
            <Text style={[styles.title]}>Select Languages</Text>
          </View>
          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 20,
              elevation: -1
            }}
          >
            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder="Search Language..."
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#fff",
                    fontSize: 14
                  }}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredC = this.props.languages.filter(c =>
                      c.label.toLowerCase().includes(value.toLowerCase())
                    );
                    this.props.filterLanguages(filteredC);
                  }}
                />
              </Item>

              <View style={{ height: "75%" }}>
                <ScrollView>{languagelist}</ScrollView>
              </View>
            </View>
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 30, elevation: -1 }]}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  }
}
