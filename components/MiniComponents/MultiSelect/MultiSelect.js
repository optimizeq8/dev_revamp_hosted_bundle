import { connect } from "react-redux";
import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import * as actionCreators from "../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CustomChips from "./CustomChips";
import SelectDevices from "./SelectDevices";
import SelectInterests from "./SelectInterests";

//icon
import BackButton from "../../MiniComponents/BackButton";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../assets/SVGs/Interests.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";
//styles
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import SectionStyle from "./SectionStyle";

class MultiSelectList extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      selectedDevices: [],
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
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices
    });
  }
  componentDidUpdate(prevProps) {
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
  onSelectedItemObjectsChange = (selectedItems, option) => {
    this.props.onSelectedInterestsNamesChange(selectedItems);
    this.setState({ selectedItemObjects: selectedItems });
  };
  onSelectedItemsChange = (selectedItems, option) => {
    // console.log(selectedItems);
    if (option === "devices") {
      if (selectedItems[0] === "Devices") {
        selectedItems.shift();
      }
      this.props.onSelectedDevicesChange(selectedItems);
      this.setState({ selectedDevices: selectedItems });
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
              styles={SectionStyle}
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
              colors={SectionStyle.colors}
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
        return (
          <SelectInterests
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
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedDevices}
            _handleSideMenuState={this.props._handleSideMenuState}
          />
        );
        break;
    }
  }
}
const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.auth.mainBusiness,
  interests: state.campaignC.interests
});

const mapDispatchToProps = dispatch => ({
  get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectList);
