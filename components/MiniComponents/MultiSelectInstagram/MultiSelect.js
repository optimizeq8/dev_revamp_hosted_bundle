import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  ActivityIndicator,
  Text,
} from "react-native";
import { Button, Item, Input, Icon } from "native-base";
import isNull from "lodash/isNull";
import { SafeAreaView } from "react-navigation";
import SelectDevices from "./SelectDevices";
import SelectInterests from "./SelectInterests";
import SelectVersions from "./SelectVersions";
import Picker from "../Picker";
import GradientButton from "../GradientButton";

//Icon
import LocationIcon from "../../../assets/SVGs/Location";
import PlusCircle from "../../../assets/SVGs/PlusCircle";

import CheckmarkIcon from "../../../assets/SVGs/Checkmark";

//Styles
import styles from "./styles";
import rtlStyles from "./rtlStyles";

// data

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import LowerButton from "../LowerButton";
import { globalColors } from "../../../GlobalStyles";

class MultiSelectList extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      selectedDevices: [],
      selectedVersions: [],
      selectedItemObjects: [],
      filteredCountreis: [],

      interests: [],
      customSelection: false,
      selectedCustomInterests: [],
      openCountryModal: false,
      openRegionModal: false,
    };
  }
  componentDidMount() {
    this.props.get_interests_instagram();
    this.setState({
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices,
      selectedVersions: this.props.selectedVersions,
      selectedCustomInterests: this.props.selectedCustomItems,
      filteredCountreis: this.props.countries,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.interests !== this.props.interests) {
      let interests = [];
      let lenOfLists = 0;

      this.props.interests &&
        Object.keys(this.props.interests).forEach((key, i) => {
          if (this.props.interests[key].length > 0) {
            interests.push({
              id: key,
              children: this.props.interests[key],
            });
          }
          lenOfLists += this.props.interests[key].length;
        });

      if (lenOfLists === 0) {
        this.setState({ interests: [] });
      } else this.setState({ interests });
    }
  }
  onSelectedItemObjectsChange = (selectedItems, option) => {
    this.props.onSelectedInterestsNamesChange(selectedItems, option);
    this.setState({ selectedItemObjects: selectedItems });
  };
  onSelectedItemsChange = (selectedItems, option, custom) => {
    if (option === "devices") {
      if (selectedItems[0] === "Devices") {
        selectedItems.shift();
      }
      this.props.onSelectedDevicesChange(selectedItems);
      this.setState({ selectedDevices: selectedItems });
    } else if (option === "versions") {
      this.props.onSelectedVersionsChange(selectedItems);
      this.setState({ selectedVersions: selectedItems });
    } else {
      let selectedInterests = selectedItems;

      this.props.onSelectedInterestsChange(selectedInterests);
      this.setState(
        custom
          ? { selectedCustomInterests: selectedItems, customSelection: true }
          : { selectedItems }
      );
    }
  };

  selectCountry = () => {
    let countryGeos =
      this.props.selectedItemsRegionsCountry[0] ||
      this.props.selectedItemsRegionsCountry;
    let disabled = this.props.editCampaign && countryGeos.length > 1;
    const { translate } = this.props.screenProps;
    let countrylist = this.state.filteredCountreis.map((c) => {
      let country_code = countryGeos.find((co) => co === c.value);
      return (
        <TouchableOpacity
          key={c.value}
          style={styles.selectTextContainer}
          onPress={() => {
            this.props.onSelectedCountryRegionChange(c.value);
          }}
          disabled={disabled}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              color:
                (country_code ? country_code : "") === c.value
                  ? "#FF9D00"
                  : globalColors.rum,
              fontSize: 14,
              opacity: !disabled ? 1 : 0.5,
            }}
          >
            {translate(c.label)}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <LocationIcon width={70} height={70} fill={globalColors.rum} />
            <Text style={styles.title}> {translate("Select Country")} </Text>

            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder={translate("Search Country")}
                  style={
                    I18nManager.isRTL
                      ? rtlStyles.searchInputText
                      : styles.searchInputText
                  }
                  placeholderTextColor={globalColors.rum}
                  onChangeText={(value) => {
                    let filteredC = this.props.countries.filter((c) =>
                      translate(c.label)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                    this.setState({ filteredCountreis: filteredC });
                  }}
                />
              </Item>

              <ScrollView style={styles.countryScrollContainer}>
                {countrylist}
              </ScrollView>
            </View>
          </View>

          <LowerButton
            screenProps={this.props.screenProps}
            style={styles.button}
            checkmark={true}
            purpleViolet
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  };

  selectRegions = () => {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <LocationIcon width={60} height={60} fill={globalColors.rum} />
            <Text style={styles.title}> {translate("Select Regions")} </Text>

            <View style={styles.slidercontainer}>
              <GradientButton
                style={[styles.toggleSelectorButton]}
                onPressAction={() => this.setState({ openRegionModal: true })}
              >
                <PlusCircle width={53} height={53} />
              </GradientButton>
              <ScrollView>
                <Picker
                  showDropDowns={true}
                  readOnlyHeadings={false}
                  showRemoveAll={true}
                  screenProps={this.props.screenProps}
                  searchPlaceholderText={translate("Search Regions")}
                  data={this.props.country_regions}
                  uniqueKey={"key"}
                  displayKey={"name"}
                  subKey="regions"
                  open={this.state.openRegionModal}
                  onSelectedItemsChange={
                    this.props.onSelectedCountryRegionChange
                  }
                  onSelectedItemObjectsChange={
                    this.props.onSelectedCountryRegionsObjectsChange
                  }
                  single={false}
                  showIcon={true}
                  highlightChildren={true}
                  selectedItems={this.props.selectedItemsRegionsCountry}
                  screenName={"Select Region"}
                  closeCategoryModal={() =>
                    this.setState({ openRegionModal: false })
                  }
                  customColors={{
                    chipColor: globalColors.rum,
                  }}
                />
              </ScrollView>
              {isNull(this.props.country_regions) && (
                <ActivityIndicator color={globalColors.rum} size="large" />
              )}
            </View>
          </View>

          <LowerButton
            screenProps={this.props.screenProps}
            style={styles.button}
            checkmark={true}
            purpleViolet
            function={() => this.props._handleSideMenuState(false)}
          />
        </View>
      </SafeAreaView>
    );
  };
  render() {
    switch (this.props.option) {
      case "countries":
        return this.selectCountry();
        break;
      // case "regions":
      //   return this.selectRegions();
      //   break;
      case "interests":
        return (
          <SelectInterests
            screenProps={this.props.screenProps}
            onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
            selectedCustomInterests={this.state.selectedCustomInterests}
            _handleSideMenuState={this.props._handleSideMenuState}
            country_code={this.props.country_code}
          />
        );
        break;
      case "deviceBrands":
        return (
          <SelectDevices
            screenProps={this.props.screenProps}
            OSType={this.props.OSType}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedDevices}
            _handleSideMenuState={this.props._handleSideMenuState}
          />
        );
        break;
      case "deviceVersions":
        return (
          <SelectVersions
            screenProps={this.props.screenProps}
            OSType={this.props.OSType}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedVersions}
            _handleSideMenuState={this.props._handleSideMenuState}
          />
        );
        break;
    }
  }
}
const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  interests: state.instagramAds.interests,
});

const mapDispatchToProps = (dispatch) => ({
  get_interests_instagram: () =>
    dispatch(actionCreators.get_interests_instagram()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MultiSelectList);
