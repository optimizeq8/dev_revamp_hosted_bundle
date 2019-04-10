import { connect } from "react-redux";
import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";

import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import * as actionCreators from "../../../store/actions";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../assets/SVGs/Interests.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
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
      interests: []
    };
  }
  componentDidMount() {
    !this.props.addressForm &&
      this.props.get_interests(this.props.country_code);
    this.setState({
      filteredCountreis: this.props.countries
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.regions !== this.props.regions) {
      this.setState({
        filteredRegions: this.props.regions
      });
    }

    if (
      prevProps.interests !== this.props.interests &&
      !this.props.addressForm
    ) {
      let interests = [];
      let lenOfLists = 0;

      Object.keys(this.props.interests).forEach((key, i) => {
        if (this.props.interests[key].length > 0) {
          interests.push({
            id: key,
            children: this.props.interests[key]
          });
        }
        lenOfLists += this.props.interests[key].length;
      });

      if (lenOfLists === 0) {
        this.setState({ interests: [] });
      } else this.setState({ interests });
    }
    if (
      prevProps.country_code !== this.props.country_code &&
      !this.props.addressForm
    ) {
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
          this.props.onSelectedItemsChange(
            !this.props.addressForm ? c.value : c
          );
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

  selectInteres = () => (
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
          <InterestsIcon width={110} height={110} fill="#fff" />
          <Text style={[styles.title]}> Select Interests</Text>
        </View>
        <View
          style={{
            felx: 1,
            justifyContent: "space-between",
            paddingTop: 20,
            elevation: -1
          }}
        >
          <Text style={[styles.subHeadings]}>
            It is optional to select interests
          </Text>

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
              colors={{ chipColor: "#fff", primary: "#FF9D00" }}
              itemFontFamily={{ fontFamily: "montserrat-medium" }}
              confirmFontFamily={{ fontFamily: "montserrat-regular" }}
              subItemFontFamily={{ fontFamily: "montserrat-medium" }}
              searchTextFontFamily={{ fontFamily: "montserrat-medium" }}
              styles={{
                selectToggle: {
                  marginBottom: 30,
                  borderBottomWidth: 0.5,
                  borderColor: "#fff",
                  fontFamily: "montserrat-medium"
                },
                selectToggleText: {
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "montserrat-medium"
                }
              }}
              iconKey="icon"
              selectText="Select Interests"
              showDropDowns={false}
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

  render() {
    switch (this.props.option) {
      case "countries":
        return this.selectCountry();
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
