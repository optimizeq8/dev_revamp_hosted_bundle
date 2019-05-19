import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
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
              {
                fontSize: 25
              }
            ]}
          />
          <Text
            style={{
              fontFamily: "montserrat-bold",
              color: "#fff",
              fontSize: 14,
              paddingLeft: 20
            }}
          >
            {c.name}
          </Text>
        </TouchableOpacity>
      );
    });
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
            <Text style={[styles.title]}>
              {" "}
              {this.props.addressForm ? "Select Region" : "Select Regions"}{" "}
            </Text>
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

              <View style={{ height: "75%" }}>
                <ScrollView>{regionlist}</ScrollView>
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
