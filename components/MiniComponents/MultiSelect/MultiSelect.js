import { connect } from "react-redux";
import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import BackButton from "../../MiniComponents/BackButton";
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import * as actionCreators from "../../../store/actions";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../assets/SVGs/Interests.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CustomChips from "./CustomChips";

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
      filteredCountreis: this.props.countries,
      selectedItems: this.props.selectedItems
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
          style={[styles.button, { marginBottom: 30, elevation: -1 }]}
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
          <Text style={[styles.subHeadings, { fontSize: wp(4) }]}>
            Choose Interests that best describe your audience
          </Text>
          <View style={styles.slidercontainer}>
            <Button
              style={[styles.interestButton, { elevation: -1 }]}
              onPress={() => this.Section._toggleSelector()}
            >
              <PlusCircle width={53} height={53} />
            </Button>
            <SectionedMultiSelect
              ref={ref => (this.Section = ref)}
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
              selectedIconComponent={
                <Icon
                  type="MaterialCommunityIcons"
                  name="circle"
                  style={[styles.itemCircles]}
                />
              }
              unselectedIconComponent={
                <Icon
                  type="MaterialCommunityIcons"
                  name="circle-outline"
                  style={[styles.itemCircles]}
                />
              }
              hideSelect
              hideConfirm
              subKey="children"
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
                },
                container: {
                  // marginTop: hp(5),
                  marginVertical: -"100%",
                  marginLeft: 0,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  width: wp(100)
                },
                searchBar: {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 15,
                  color: "#fff",
                  width: wp(80),
                  alignSelf: "center"
                },
                searchTextInput: { color: "#FFF" },
                item: {
                  backgroundColor: "rgba(0,0,0,0)"
                },

                subItemText: {
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "montserrat-bold"
                },
                scrollView: {
                  width: wp(80),
                  marginBottom: hp(5),
                  alignSelf: "center"
                },
                button: {
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  alignSelf: "center"
                },
                confirmText: { color: "#fff" }
              }}
              confirmText={"\u2714"}
              stickyFooterComponent={
                <Button
                  style={[styles.button, { marginBottom: 30, elevation: -1 }]}
                  onPress={() => this.Section._submitSelection()}
                >
                  <CheckmarkIcon width={53} height={53} />
                </Button>
              }
              headerComponent={
                <View style={{ height: 70, marginBottom: hp(5), top: hp(3) }}>
                  <BackButton
                    navigation={() => this.Section._cancelSelection()}
                  />
                </View>
              }
              colors={{
                subItemBackground: "transparent",
                itemBackground: "transparent",
                chipColor: "#fff",
                primary: "#FF9D00",
                searchPlaceholderTextColor: "#fff",
                searchSelectionColor: "#fff"
              }}
              searchIconComponent={
                <Icon
                  type="MaterialCommunityIcons"
                  name="magnify"
                  style={[styles.indicator]}
                />
              }
              customChipsRenderer={info => {
                return (
                  <CustomChips
                    Section={this.Section}
                    uniqueKey={info.uniqueKey}
                    subKey={info.subKey}
                    displayKey={info.displayKey}
                    items={info.items}
                    selectedItems={info.selectedItems}
                  />
                );
              }}
              iconKey="icon"
              selectText="Select Interests"
              showDropDowns={false}
              showRemoveAll={true}
              // readOnlyHeadings={true}
              noItemsComponent={
                <Text style={styles.text}>
                  Sorry, no interests for selected country
                </Text>
              }
              onCancel={() => {
                this.onSelectedItemsChange([]);
                this.onSelectedItemObjectsChange([]);
              }}
              selectChildren
              modalAnimationType="fade"
              onSelectedItemsChange={this.onSelectedItemsChange}
              onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
              selectedItems={this.state.selectedItems}
            />
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
