import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Button, Text } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import isNull from "lodash/isNull";

import BackButton from "../../MiniComponents/BackButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

import styles from "./styles";
import SectionStyle, { colors } from "../MultiSelect/SectionStyle";

export default class Picker extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open === this.props.open && this.props.open) {
      this.Section._toggleSelector();
    }
  }
  render() {
    return (
      <SectionedMultiSelect
        ref={ref => (this.Section = ref)}
        loading={isNull(this.props.data) ? true : false}
        items={this.props.data}
        single={this.props.single}
        uniqueKey={this.props.uniqueKey}
        displayKey={this.props.displayKey}
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
            style={styles.itemCircles}
          />
        }
        searchPlaceholderText={this.props.searchPlaceholderText}
        unselectedIconComponent={
          <Icon
            type="MaterialCommunityIcons"
            name="circle-outline"
            style={styles.itemCircles}
          />
        }
        noResultsComponent={<Text style={styles.errorText}>No item found</Text>}
        hideSelect
        hideConfirm
        subKey="children"
        styles={SectionStyle}
        confirmText={"\u2714"}
        stickyFooterComponent={
          <Button
            style={styles.stickyFooterButton}
            onPress={() => {
              this.Section._submitSelection();
              this.props.closeCategoryModal();
            }}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
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
        showDropDowns={false}
        showRemoveAll={true}
        noItemsComponent={
          <Text style={styles.errorText}>Sorry, No data available</Text>
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
      />
    );
  }
}
