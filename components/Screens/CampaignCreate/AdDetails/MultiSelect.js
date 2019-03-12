import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import { View } from "react-native";
import styles from "./styles";
export default class MultiSelectList extends Component {
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
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
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
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
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
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#CCC"
            submitButtonText="Confirm Select"
          />
        </View>
      </>
    );
  }
}
