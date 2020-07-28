import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PixelRatio,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Input, Item, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import * as actionCreators from "../../../store/actions";
import styles from "../MultiSelect/styles";

import LocationIcon from "../../../assets/SVGs/Location";
import LowerButton from "../LowerButton";

class SelectRegions extends Component {
  state = { selectedAll: false };
  componentDidMount() {
    Segment.screen("Regions Options");
  }
  // selectAll = () => {
  //   this.setState({ selectedAll: !this.state.selectedAll });
  //   this.props.regions.forEach(region =>
  //     this.props.onSelectedRegionChange(region.id, region.name)
  //   );
  // };
  checkForLocations = (c, fReg) => {
    if (this.props.locationsSelected) {
      Alert.alert(
        "Reset selected locations",
        "Selecting regions will overwrite and reset your selected locations, are you sure you want to continue?",
        [
          {
            text: "Yes",
            onPress: () => {
              this.props.onSelectedMapChange(null, true);
              this.handleRegionSelection(c, fReg);
            },
          },
          { text: "Cancel" },
        ]
      );
    } else this.handleRegionSelection(c, fReg);
  };
  handleRegionSelection = (c, fReg) => {
    this.props.onSelectedRegionChange(
      this.props.addressForm ? c : c.id,
      c.name,
      fReg.country_code
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    let regionlist = this.props.filteredRegions.map((fReg) => {
      let countryName = fReg.country_name;
      let coRegIndex = this.props.region_id.findIndex(
        (coR) => coR.country_code === fReg.country_code
      );
      let coReg = fReg.regions;
      if (this.props.addressForm || coReg.length > 3)
        return (
          <View key={countryName}>
            <Text style={[styles.optionsTextContainer, { paddingLeft: 0 }]}>
              {countryName}
            </Text>
            {coReg.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.languageRowConatiner}
                onPress={() => this.checkForLocations(c, fReg)}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name={
                    this.props.region_id[coRegIndex].region_id.find(
                      (r) => r === c.id
                    )
                      ? "circle"
                      : "circle-outline"
                  }
                  style={[
                    this.props.region_id[coRegIndex].region_id.find(
                      (r) => r === c.id
                    )
                      ? styles.activetext
                      : styles.inactivetext,
                    styles.optionsIconSize,
                  ]}
                />
                <Text style={styles.optionsTextContainer}>
                  {translate(c.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
                      fontSize: 14 / PixelRatio.getFontScale(),
                    },
                  ]}
                  placeholderTextColor="#fff"
                  onChangeText={(value) => {
                    let filteredR = this.props.regions.filter((c) =>
                      translate(c.name)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                    this.props.filterRegions(filteredR);
                  }}
                />
              </Item>

              <ScrollView style={[styles.regionListContainer]}>
                {!this.props.addressForm && (
                  <TouchableOpacity
                    style={[
                      styles.languageRowConatiner,
                      { alignSelf: "center" },
                    ]}
                    onPress={() => this.props.onSelectedRegionChange(-1, "all")}
                  >
                    <Text
                      style={[
                        styles.optionsTextContainer,
                        { paddingLeft: 0, textDecorationLine: "underline" },
                      ]}
                    >
                      {translate("Select all")}
                    </Text>
                  </TouchableOpacity>
                )}

                {regionlist}
              </ScrollView>
            </View>
          </View>
          <LowerButton
            screenProps={this.props.screenProps}
            checkmark={true}
            style={[styles.button]}
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
});
const mapDispatchToProps = (dispatch) => ({
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRegions);
