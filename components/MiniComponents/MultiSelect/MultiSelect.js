import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, I18nManager } from "react-native";
import { Button, Text, Item, Input } from "native-base";
import { SafeAreaView } from "react-navigation";
import SelectDevices from "./SelectDevices";
import SelectInterests from "./SelectInterests";
import SelectVersions from "./SelectVersions";
import * as Segment from "expo-analytics-segment";

//Icon
import LocationIcon from "../../../assets/SVGs/Location";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";

//Styles
import styles from "./styles";
import rtlStyles from "./rtlStyles";

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
    };
  }
  componentDidMount() {
    if (!this.props.addressForm) {
      let country_code = this.props.country_code.map(
        (cCode) => cCode.country_code
      );
      this.props.get_interests(country_code.join(","));
    }
    this.setState({
      filteredCountreis: this.props.countries,
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices,
      selectedVersions: this.props.selectedVersions,
    });
    if (this.props.option === "countries") {
      Segment.screen("Country Options");
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.interests !== this.props.interests &&
      !this.props.addressForm
    ) {
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
    if (
      prevProps.country_code !== this.props.country_code &&
      !this.props.addressForm
    ) {
      let country_code = this.props.country_code.map(
        (cCode) => cCode.country_code
      );
      this.props.get_interests(country_code.join(","));
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
      if (selectedInterests[0] === "scls") {
        selectedInterests.shift();
      }
      this.props.onSelectedInterestsChange(selectedInterests);
      this.setState({ selectedItems });
    }
  };

  selectCountry = () => {
    let disabled =
      this.props.editCampaign && this.props.country_code.length > 1;
    const { translate } = this.props.screenProps;
    let countrylist = this.state.filteredCountreis.map((c) => {
      let country_code = this.props.country_code.find(
        (co) => co.country_code === c.value
      );
      return (
        <TouchableOpacity
          key={c.value}
          style={styles.selectTextContainer}
          disabled={disabled}
          onPress={() => {
            this.props.onSelectedCountryChange(
              !this.props.addressForm ? c.value : c,
              false,
              c.label
            );
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              color: (country_code ? country_code.country_code : "" === c.value)
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
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  interests: state.campaignC.interests,
});

const mapDispatchToProps = (dispatch) => ({
  get_interests: (info) => dispatch(actionCreators.get_interests(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MultiSelectList);
