import { connect } from "react-redux";
import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";

import styles from "./styles";
import * as actionCreators from "../../../../store/actions";
import LocationIcon from "../../../../assets/SVGs/Location.svg";
import CheckmarkIcon from "../../../../assets/SVGs/Checkmark.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class MultiSelectList extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      selectedItemObjects: [],
      filteredCountreis: [],
      filteredRegions: [],
      interests: []
    };
  }
  componentDidMount() {
    this.props.get_interests(this.props.country_code);
    this.setState({
      filteredCountreis: this.props.countries,
      filteredRegions: this.props.regions
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.regions !== this.props.regions) {
      this.setState({
        filteredRegions: this.props.regions
      });
    }

    if (prevProps.interests !== this.props.interests) {
      let interests = [];
      let lenOfLists = 0;

      Object.keys(this.props.interests).forEach((key, i) => {
        if (this.props.interests[key].length > 0) {
          interests.push({
            id: key,
            name: `Category ${i + 1}`,
            children: this.props.interests[key]
          });
        }
        lenOfLists += this.props.interests[key].length;
      });

      if (lenOfLists === 0) {
        this.setState({ interests: [] });
      } else this.setState({ interests });
    }
    if (prevProps.country_code !== this.props.country_code) {
      this.props.get_interests(this.props.country_code);
    }
  }
  onSelectedItemObjectsChange = selectedItems => {
    this.props.onSelectedInterestsNamesChange(selectedItems);
    this.setState({ selectedItemObjects: selectedItems });
  };
  onSelectedItemsChange = selectedItems => {
    this.props.onSelectedInterestsChange(selectedItems);
    this.setState({ selectedItems });
  };

  selectCountry = () => {
    let countrylist = this.state.filteredCountreis.map(c => (
      <TouchableOpacity
        key={c.value}
        style={{
          paddingVertical: 20
        }}
        onPress={() => {
          this.props.onSelectedItemsChange(c.value);
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-bold",
            color: this.props.country_code === c.value ? "#FF9D00" : "#fff",
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
            <Text style={[styles.title]}> Select Country </Text>
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
                  placeholder="Search Country..."
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#fff",
                    fontSize: 14
                  }}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredC = this.props.countries.filter(c =>
                      c.label.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredCountreis: filteredC });
                  }}
                />
              </Item>

              <View style={{ height: "75%" }}>
                <ScrollView>{countrylist}</ScrollView>
              </View>
            </View>
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 30 }]}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  };
  selectRegion = () => {
    let regionlist = this.state.filteredRegions.map(c => {
      return (
        <TouchableOpacity
          key={c.id}
          style={{
            paddingVertical: 20
          }}
          onPress={() => {
            this.props.onSelectedRegionChange(c.id);
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              color: this.props.region_ids.find(r => r === c.id)
                ? "#FF9D00"
                : "#fff",
              fontSize: 14
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
            <Text style={[styles.title]}> Select Country </Text>
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
                  placeholder="Search Country..."
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
                    this.setState({ filteredRegions: filteredR });
                  }}
                />
              </Item>

              <View style={{ height: "75%" }}>
                <ScrollView>{regionlist}</ScrollView>
              </View>
              {
                //   <MultiSelect
                //   hideTags
                //   items={this.props.regions}
                //   uniqueKey="id"
                //   onSelectedItemsChange={this.props.onSelectedRegionChange}
                //   selectedItems={this.props.region_ids}
                //   selectText="Pick Regions (optional)"
                //   searchInputPlaceholderText="Search..."
                //   onChangeInput={text => console.log(text)}
                //   selectedItemTextColor="#CCC"
                //   selectedItemIconColor="#CCC"
                //   itemTextColor="#000"
                //   displayKey="name"
                //   searchInputStyle={{ color: "#CCC" }}
                //   submitButtonColor="#CCC"
                //   submitButtonText="Confirm Select"
                // />
              }
            </View>
          </View>
        </View>
      </>
    );
  };

  selectLanguage = () => (
    <View style={styles.slidercontainer}>
      <MultiSelect
        hideTags
        textColor={this.props.languagesError ? "red" : "#525966"}
        items={this.props.languages}
        uniqueKey="value"
        onSelectedItemsChange={this.props.onSelectedLangsChange}
        selectedItems={this.props.selectedLangs}
        selectText="Pick Languages"
        searchInputPlaceholderText="Search..."
        onChangeInput={text => console.log(text)}
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="label"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Confirm Select"
      />
    </View>
  );

  selectInteres = () => (
    <View style={styles.slidercontainer}>
      <SectionedMultiSelect
        loading={!this.props.interests ? true : false}
        items={this.state.interests}
        uniqueKey="id"
        selectToggleIconComponent={
          <Icon
            type="MaterialCommunityIcons"
            name="menu-down"
            style={styles.indicator}
          />
        }
        subKey="children"
        colors={{ chipColor: "red" }}
        styles={{
          selectToggle: {
            marginBottom: 30,
            borderBottomWidth: 0.5,
            borderColor: "#ccc"
          },
          selectToggleText: { color: "#525966", fontSize: 14 }
        }}
        iconKey="icon"
        selectText="Pick some interests (optional)"
        showDropDowns={true}
        showRemoveAll={true}
        readOnlyHeadings={true}
        noItemsComponent={
          <Text style={styles.text}>
            Sorry, no interests for selected country
          </Text>
        }
        modalAnimationType="fade"
        modalWithTouchable={true}
        onSelectedItemsChange={this.onSelectedItemsChange}
        onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
        selectedItems={this.state.selectedItems}
      />
    </View>
  );

  render() {
    console.log("regionslklk", this.props.region_ids);

    // console.log("poin", this.props.option);
    switch (this.props.option) {
      case "countries":
        return this.selectCountry();
        break;
      case "regions":
        return this.selectRegion();
        break;
      case "languages":
        return this.selectLanguage();
        break;
      case "interests":
        return this.selectInteres();
        break;
    }
  }
}
const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  average_reach: state.campaignC.average_reach,
  mainBusiness: state.auth.mainBusiness,
  interests: state.campaignC.interests
});

const mapDispatchToProps = dispatch => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
  get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectList);
