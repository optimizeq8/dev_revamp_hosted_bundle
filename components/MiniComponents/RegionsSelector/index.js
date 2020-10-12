import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Item, Input, Icon } from "native-base";
import LoadingScreen from "../LoadingScreen";

//Icon
import LocationIcon from "../../../assets/SVGs/Location.svg";
import SearchIcon from "../../../assets/SVGs/Search.svg";

//Styles
import styles from "./styles";

//Function
import isUndefined from "lodash/isUndefined";

class RegionsSelector extends Component {
  constructor() {
    super();
    this.state = {
      filteredRegions: [],
    };
  }
  componentDidMount() {
    this.setState({
      filteredRegions: this.props.locationsFetchedList,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        filteredRegions: this.props.locationsFetchedList,
      });
    }
  }
  kFormatter = (num) => {
    return Math.abs(num) > 999999
      ? (Math.abs(num) / 1000000).toFixed(1) + "M"
      : Math.abs(num) > 999
      ? (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.abs(num).toFixed(2);
  };
  render() {
    const { translate } = this.props.screenProps;
    if (this.props.loading) {
      return <LoadingScreen top={50} />;
    } else {
      let regionslist = this.state.filteredRegions.map((r) => {
        var found = !isUndefined(this.props.locations.find((l) => l === r.id));
        let textLocation = "";

        if (r.location.includes(", ")) {
          let locArray = r.location.split(", ");
          locArray = locArray.map((loc) => translate(loc));
          textLocation = locArray.join(", ");
        } else {
          textLocation = translate(r.location);
        }

        return (
          <TouchableOpacity
            key={r.id}
            style={styles.selectTextContainer}
            onPress={() => {
              this.props.onSelectRegions(r.id);
            }}
          >
            <View style={styles.regionTextView}>
              <Icon
                type="MaterialCommunityIcons"
                name={found ? "circle" : "circle-outline"}
                style={[
                  styles.itemCircles,
                  { color: found ? "#FF9D00" : "#fff" },
                ]}
              />
              <Text style={styles.regionText} numberOfLines={2}>
                {textLocation}
              </Text>
            </View>
            <Text style={styles.reachText}>{this.kFormatter(r.reach)}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <LocationIcon width={50} height={80} fill="#fff" />

            <View style={styles.slidercontainer}>
              <Item style={styles.searchbarContainer}>
                <SearchIcon width={18} height={18} stroke="#fff" />
                <Input
                  placeholder={translate("Search Region") + "..."}
                  style={styles.searchInputText}
                  placeholderTextColor="#fff"
                  onChangeText={(value) => {
                    let filteredR = this.props.locationsFetchedList.filter(
                      (c) => {
                        let textLocation = "";
                        if (c.location.includes(", ")) {
                          let locArray = c.location.split(", ");
                          locArray = locArray.map((loc) => translate(loc));
                          textLocation = locArray.join(", ");
                        } else {
                          textLocation = translate(c.location);
                        }
                        return textLocation
                          .toLowerCase()
                          .includes(value.toLowerCase());
                      }
                    );
                    this.setState({ filteredRegions: filteredR });
                  }}
                />
              </Item>
              <View style={styles.regionsHeader}>
                <Text uppercase style={styles.title}>
                  {translate("Regions")}
                </Text>
                <Text uppercase style={styles.title}>
                  {translate("Reach")}
                </Text>
              </View>
              <View style={styles.scrollContainer}>
                <ScrollView>{regionslist}</ScrollView>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

export default RegionsSelector;
