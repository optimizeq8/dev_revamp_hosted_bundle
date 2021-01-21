import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Icon, Input, Item } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import isNull from "lodash/isNull";
import SearchIcon from "../../../assets/SVGs/Search";

import BackButton from "../../MiniComponents/BackButton";

import styles from "./styles";
import SectionStyle, { colors } from "../MultiSelect/SectionStyle";
import LowerButton from "../LowerButton";
import { globalColors } from "../../../GlobalStyles";

export default class Picker extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open === this.props.open && this.props.open) {
      this.Section._toggleSelector();
    }
  }
  render() {
    const { translate } = this.props.screenProps;
    let { customColors } = this.props;
    return (
      <SectionedMultiSelect
        ref={(ref) => (this.Section = ref)}
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
          fontFamily: "montserrat-regular",
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
            screenProps={this.props.screenProps}
            checkmark
            style={styles.button}
            function={() => {
              this.Section._submitSelection();
              this.props.closeCategoryModal();
            }}
          />
        }
        headerComponent={
          <View
            style={[
              styles.headerComponent,
              this.props.customSearch && {
                height: 100,
                width: "100%",
              },
            ]}
          >
            <BackButton
              stroke={globalColors.rum}
              style={{ top: 0, left: 0 }}
              screenname={this.props.screenName}
              //   businessname={this.props.mainBusiness.businessname}
              navigation={() => {
                this.Section._cancelSelection();
                this.props.closeCategoryModal();
              }}
            />
            {this.props.customSearch && (
              <Item rounded style={styles.customSearchField}>
                <SearchIcon stroke={globalColors.orange} />
                <Input
                  style={styles.customSearchInput}
                  placeholder={translate("Search Interests")}
                  placeholderTextColor={globalColors.rum}
                  autoCapitalize="none"
                  onChangeText={this.props.customSearch}
                />
                {this.props.customInterestsLoading && (
                  <ActivityIndicator color={globalColors.orange} />
                )}
              </Item>
            )}
          </View>
        }
        hideSearch={this.props.customSearch !== undefined}
        colors={{ ...colors, ...customColors }}
        searchIconComponent={<SearchIcon stroke={globalColors.orange} />}
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
          this.props.onSelectedItemsChange(
            [],
            "",
            this.props.customSearch ? true : false
          );
          this.props.onSelectedItemObjectsChange(
            [],
            this.props.customSearch ? true : false
          );
        }}
        selectChildren
        modalAnimationType="fade"
        onSelectedItemsChange={(items) =>
          this.props.onSelectedItemsChange(
            items,
            "",
            this.props.customSearch ? true : false
          )
        }
        onSelectedItemObjectsChange={(items) =>
          this.props.onSelectedItemObjectsChange(
            items,
            this.props.customSearch ? true : false
          )
        }
        selectedItems={
          this.props.data && this.props.data.length > 0
            ? this.props.selectedItems
            : []
        }
        removeAllText={translate("Remove all")}
        itemFontFamily={{
          fontFamily: "montserrat-regular",
        }}
      />
    );
  }
}
