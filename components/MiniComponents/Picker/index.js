import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Button, Text } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import isNull from "lodash/isNull";

import BackButton from "../../MiniComponents/BackButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";

import styles from "./styles";
import SectionStyle, { colors } from "../MultiSelect/SectionStyle";

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
          console.log("item : ");
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
          <Icon
            type="MaterialCommunityIcons"
            name="circle"
            style={styles.itemCircles}
          />
        }
        searchPlaceholderText={this.props.searchPlaceholderText}
        searchTextFontFamily={{
          fontFamily: "montserrat-regular"
        }}
        unselectedIconComponent={
          <Icon
            type="MaterialCommunityIcons"
            name="circle-outline"
            style={styles.itemCircles}
          />
        }
        noResultsComponent={
          <Text style={styles.errorText}>{translate("No item found")}</Text>
        }
        hideSelect
        hideConfirm
        subKey="children"
        styles={SectionStyle}
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
