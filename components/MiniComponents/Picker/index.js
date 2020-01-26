import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Text } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import isNull from "lodash/isNull";

import BackButton from "../../MiniComponents/BackButton";

import styles from "./styles";
import SectionStyle, { colors } from "../MultiSelect/SectionStyle";
import LowerButton from "../LowerButton";

export default class Picker extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open === this.props.open && this.props.open) {
      this.Section._toggleSelector();
    }
  }
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SectionedMultiSelect
        ref={ref => (this.Section = ref)}
        loading={isNull(this.props.data) ? true : false}
        items={this.props.data}
        single={this.props.single}
        uniqueKey={this.props.uniqueKey}
        displayKey={this.props.displayKey}
        renderSelectText={() => {
          // console.log("item : ");
          return "test";
        }}
        selectToggleIconComponent={
          <Icon
            type="MaterialCommunityIcons"
            name="menu-down"
            style={styles.indicator}
          />
        }
        selectedIconComponent={
          this.props.showIcon ? (
            <Icon
              type="MaterialCommunityIcons"
              name="circle"
              style={styles.itemCircles}
            />
          ) : null
        }
        searchPlaceholderText={this.props.searchPlaceholderText}
        searchTextFontFamily={{
          fontFamily: "montserrat-regular"
        }}
        unselectedIconComponent={
          this.props.showIcon ? (
            <Icon
              type="MaterialCommunityIcons"
              name="circle-outline"
              style={styles.itemCircles}
            />
          ) : null
        }
        noResultsComponent={
          <Text style={styles.errorText}>{translate("No item found")}</Text>
        }
        hideSelect
        hideConfirm
        subKey={this.props.subKey ? this.props.subKey : "children"}
        readOnlyHeadings={this.props.readOnlyHeadings}
        styles={SectionStyle}
        stickyFooterComponent={
          <LowerButton
            checkmark
            style={styles.button}
            function={() => {
              this.Section._submitSelection();
              this.props.closeCategoryModal();
            }}
          />
        }
        headerComponent={
          <View style={styles.headerComponent}>
            <BackButton
              style={{ top: 0, left: 0 }}
              screenname={this.props.screenName}
              //   businessname={this.props.mainBusiness.businessname}
              navigation={() => {
                this.Section._cancelSelection();
                this.props.closeCategoryModal();
              }}
            />
          </View>
        }
        colors={colors}
        searchIconComponent={
          <Icon
            type="MaterialCommunityIcons"
            name="magnify"
            style={styles.indicator}
          />
        }
        modalWithSafeAreaView={true}
        iconKey="icon"
        showDropDowns={
          this.props.showDropDowns ? this.props.showDropDowns : false
        }
        showRemoveAll={true}
        noItemsComponent={
          <Text style={styles.errorText}>
            {translate("Sorry, No data available")}
          </Text>
        }
        onCancel={() => {
          this.props.onSelectedItemsChange([]);
          this.props.onSelectedItemObjectsChange([]);
        }}
        selectChildren
        modalAnimationType="fade"
        onSelectedItemsChange={this.props.onSelectedItemsChange}
        onSelectedItemObjectsChange={this.props.onSelectedItemObjectsChange}
        selectedItems={this.props.selectedItems}
        removeAllText={translate("Remove all")}
        itemFontFamily={{
          fontFamily: "montserrat-regular"
        }}
      />
    );
  }
}
