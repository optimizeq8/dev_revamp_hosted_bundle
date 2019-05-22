import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import LocationIcon from "../../../assets/SVGs/Location";
import { Input, Button, Item, Icon } from "native-base";
import styles from "./styles";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
export default class SelectRegions extends Component {
  render() {
    let regionlist = this.props.filteredRegions.map(c => {
      return (
        <TouchableOpacity
          key={c.id}
          style={{
            paddingVertical: 20,
            flexDirection: "row"
          }}
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
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={[styles.dataContainer, { marginTop: 20 }]}>
            <LocationIcon
              width={110}
              height={110}
              fill="#fff"
              style={{ alignSelf: "center" }}
            />
            <Text style={[styles.title, { paddingBottom: 20 }]}>
              {" "}
              {this.props.addressForm ? "Select Region" : "Select Regions"}{" "}
            </Text>

            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder="Search Region..."
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#fff",
                    fontSize: 14
                  }}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredR = this.props.regions.filter(c =>
                      c.name.toLowerCase().includes(value.toLowerCase())
                    );
                    this.props.filterRegions(filteredR);
                  }}
                />
              </Item>
              <ScrollView style={[styles.regionListContainer]}>
                {regionlist}
              </ScrollView>
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
