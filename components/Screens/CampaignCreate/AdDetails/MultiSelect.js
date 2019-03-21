import { connect } from "react-redux";
import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "native-base";
import * as actionCreators from "../../../../store/actions";

class MultiSelectList extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      selectedItemObjects: [],
      interests: []
    };
  }
  componentDidMount() {
    this.props.get_interests(this.props.country_code);
  }
  componentDidUpdate(prevProps) {
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
  render() {
    return (
      <>
        <View style={styles.slidercontainer}>
          <MultiSelect
            hideTags
            items={this.props.countries}
            uniqueKey="value"
            onSelectedItemsChange={this.props.onSelectedItemsChange}
            selectedItems={[this.props.country_codes]}
            selectText="Pick Countries"
            searchInputPlaceholderText="Search Items..."
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
        <View style={styles.slidercontainer}>
          <MultiSelect
            hideTags
            items={this.props.regions}
            uniqueKey="id"
            onSelectedItemsChange={this.props.onSelectedRegionChange}
            selectedItems={this.props.region_ids}
            selectText="Pick Regions (optional)"
            searchInputPlaceholderText="Search..."
            onChangeInput={text => console.log(text)}
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#CCC"
            submitButtonText="Confirm Select"
          />
        </View>
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
      </>
    );
  }
}
const mapStateToProps = state => ({
  interests: state.campaignC.interests
});

const mapDispatchToProps = dispatch => ({
  get_interests: countryCode =>
    dispatch(actionCreators.get_interests(countryCode))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectList);
