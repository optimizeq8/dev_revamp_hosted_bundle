import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import * as actionCreators from "../../../store/actions";
import styles from "../MultiSelect/styles";

import LocationIcon from "../../../assets/SVGs/Location";
import LowerButton from "../LowerButton";
import { globalColors } from "../../../GlobalStyles";
import { country_regions } from "../../Screens/InstagramCampaignCreate/Feed/AdTargetting/data";

class SelectRegions extends Component {
  state = { selectedAll: false, filteredRegions: [] };
  filterRegions = (value) => {
    this.setState({ filteredRegions: value });
  };
  componentDidMount() {
    // SHOW ALL REGIONS for selected countries
    if (this.props.countries && this.props.countries.length > 0) {
      let ctryReg = this.props.countries.map((ctry) =>
        country_regions.find((cR) => cR.key === ctry)
      );
      this.setState({
        filteredRegions: ctryReg,
      });
    }
  }
  // selectAll = () => {
  //   this.setState({ selectedAll: !this.state.selectedAll });
  //   this.props.regions.forEach(region =>
  //     this.props.onSelectedRegionChange(region.id, region.name)
  //   );
  // };

  handleRegionSelection = (regions) => {
    this.props.onSelectedRegionChange(regions);
  };
  render() {
    const { translate } = this.props.screenProps;
    // console.log("filteredRegions", this.state.filteredRegions);
    let regionlist = this.state.filteredRegions.map((fReg) => {
      countryName = fReg.name;
      coReg = fReg.regions;

      return (
        <View key={countryName}>
          <Text style={[styles.optionsTextContainer, { paddingLeft: 0 }]}>
            {translate(countryName)}
          </Text>
          {coReg.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={styles.languageRowConatiner}
              // onPress={() => this.checkForLocations(c, fReg)}
              onPress={() => this.handleRegionSelection(c)}
            >
              <Icon
                type="MaterialCommunityIcons"
                name={
                  this.props.region_id.find((reg) => reg.key === c.key)
                    ? "circle"
                    : "circle-outline"
                }
                style={[
                  this.props.region_id.find((reg) => reg.key === c.key)
                    ? styles.activetext
                    : styles.inactivetext,
                  styles.optionsIconSize,
                ]}
              />
              <Text style={[styles.optionsTextContainer]}>
                {translate(c.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style={[styles.dataContainer]}>
          <LocationIcon
            width={70}
            height={70}
            fill={globalColors.rum}
            style={styles.locationIcon}
          />
          <Text style={[styles.title]}>{translate("Select Regions")}</Text>
          <View style={styles.slidercontainer}>
            {/* <Item>
              <Input
                placeholder={translate("Search Region")}
                style={[
                  styles.searchRegionText,
                  {
                    fontFamily: "montserrat-regular",
                    color: globalColors.rum,
                    fontSize: 14 / PixelRatio.getFontScale(),
                  },
                ]}
                placeholderTextColor={globalColors.rum}
                onChangeText={(value) => {
                  if (value === "") {
                    this.componentDidMount();
                  } else {
                    let filteredR =
                      this.state.filteredRegions &&
                      this.state.filteredRegions.length > 0 &&
                      this.state.filteredRegions.map((c) => {
                        let regions = c.regions;
                        regions = regions.filter((reg) =>
                          translate(reg.name)
                            .toLowerCase()
                            .includes(value.toLowerCase())
                        );
                        c.regions = regions;
                        return c;
                      });
                    console.log(
                      "filteredR",
                      JSON.stringify(filteredR, null, 2)
                    );
                    this.filterRegions(filteredR);
                  }
                }}
              />
            </Item> */}

            <ScrollView style={[styles.regionListContainer]}>
              {!this.props.addressForm && (
                <TouchableOpacity
                  style={[styles.languageRowConatiner, { alignSelf: "center" }]}
                  onPress={() => this.handleRegionSelection("all")}
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
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.instagramAds.data,
});
const mapDispatchToProps = (dispatch) => ({
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRegions);
