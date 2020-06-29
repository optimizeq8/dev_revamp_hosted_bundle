import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import { Button, Text, Item, Input, Icon } from "native-base";
import isNull from "lodash/isNull";
import { SafeAreaView } from "react-navigation";
import SelectDevices from "./SelectDevices";
import SelectInterests from "./SelectInterests";
import SelectVersions from "./SelectVersions";
import Picker from "../Picker";
import GradientButton from "../GradientButton";
import * as Segment from "expo-analytics-segment";

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

class MultiSelectList extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      selectedDevices: [],
      selectedVersions: [],
      selectedItemObjects: [],

      interests: [],
      openCountryModal: false,
    };
  }
  componentDidMount() {
    this.props.get_interests_instagram();
    this.setState({
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices,
      selectedVersions: this.props.selectedVersions,
    });
    if (this.props.option === "countries") {
      Segment.screen("Country Options");
    }
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
    this.props.onSelectedInterestsNamesChange(selectedItems);
    this.setState({ selectedItemObjects: selectedItems });
  };
  onSelectedItemsChange = (selectedItems, option) => {
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
      this.setState({ selectedItems });
    }
  };

  selectCountry = () => {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <LocationIcon width={110} height={110} fill="#fff" />
            <Text style={styles.title}> {translate("Select Country")} </Text>

            <View style={styles.slidercontainer}>
              <GradientButton
                style={[styles.toggleSelectorButton]}
                onPressAction={() => this.setState({ openCountryModal: true })}
              >
                <PlusCircle width={53} height={53} />
              </GradientButton>
              <Picker
                showDropDowns={true}
                readOnlyHeadings={false}
                showRemoveAll={true}
                screenProps={this.props.screenProps}
                searchPlaceholderText={translate("Search Country")}
                data={this.props.country_regions}
                uniqueKey={"key"}
                displayKey={"name"}
                subKey="regions"
                open={this.state.openCountryModal}
                onSelectedItemsChange={this.props.onSelectedCountryRegionChange}
                onSelectedItemObjectsChange={
                  this.props.onSelectedCountryRegionsObjectsChange
                }
                single={false}
                showIcon={true}
                highlightChildren={true}
                selectedItems={this.props.selectedItemsRegionsCountry}
                screenName={"Select Country"}
                closeCategoryModal={() =>
                  this.setState({ openCountryModal: false })
                }
              />
              {isNull(this.props.country_regions) && (
                <ActivityIndicator color="#FFFF" size="large" />
              )}
            </View>
          </View>

          <LowerButton
            screenProps={this.props.screenProps}
            style={styles.button}
            checkmark={true}
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
      case "interests":
        return (
          <SelectInterests
            screenProps={this.props.screenProps}
            onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
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
