import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PixelRatio
} from "react-native";
import { Input, Button, Item, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";

import styles from "../MultiSelect/styles";

import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import LocationIcon from "../../../assets/SVGs/Location";

export default class SelectRegions extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let regionlist = this.props.filteredRegions.map(c => {
      return (
        <TouchableOpacity
          key={c.id}
          style={styles.languageRowConatiner}
          onPress={() => {
            this.props.onSelectedRegionChange(
              this.props.addressForm ? c : c.id,
              c.name
            );
          }}
        >
          <Icon
            type="MaterialCommunityIcons"
            name={
              this.props.region_id.find(r => r === c.id)
                ? "circle"
                : "circle-outline"
            }
            style={[
              this.props.region_id.find(r => r === c.id)
                ? styles.activetext
                : styles.inactivetext,
              styles.optionsIconSize
            ]}
          />
          <Text style={styles.optionsTextContainer}>{c.name}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={[styles.dataContainer]}>
            <LocationIcon
              width={110}
              height={110}
              fill="#fff"
              style={styles.locationIcon}
            />
            <Text style={[styles.title]}>
              {this.props.addressForm
                ? translate("Select Region")
                : translate("Select Regions")}{" "}
            </Text>

            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder={translate("Search Region")}
                  style={[
                    styles.searchRegionText,
                    {
                      fontFamily: "montserrat-regular",
                      color: "#fff",
                      fontSize: 14 / PixelRatio.getFontScale()
                    }
                  ]}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredR = this.props.regions.filter(c =>
                      c.name.toLowerCase().includes(value.toLowerCase())
                    );
                    this.props.filterRegions(filteredR);
                  }}
                />
              </Item>
              {this.props.countryName === "" ? (
                <Text
                  style={{
                    paddingVertical: 20,
                    color: "#FFFF",
                    fontSize: 16,
                    textAlign: "center",
                    fontFamily: "montserrat-regular"
                  }}
                >
                  {translate("Please select a country to see the regions")}
                </Text>
              ) : (
                <ScrollView style={[styles.regionListContainer]}>
                  {regionlist}
                </ScrollView>
              )}
            </View>
          </View>

          <Button
            style={[styles.button]}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
