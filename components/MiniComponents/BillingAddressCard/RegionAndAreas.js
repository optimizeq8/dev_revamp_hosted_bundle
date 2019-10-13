import React, { Component } from "react";
import { Text, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import BackButton from "../../MiniComponents/BackButton";
import LowerButton from "../LowerButton";

import styles from "./styles";
import LocationIcon from "../../../assets/SVGs/Location";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";
import { Button, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";

import SectionStyle, { colors } from "./SectionStyle";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

export default class RegionAndAreas extends Component {
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ bottom: "never", top: "always" }}
        style={[styles.container, styles.safeAreaViewRegionsAndAreas]}
      >
        <View>
          <View style={styles.topView}>
            <LocationIcon width={110} height={110} fill="#fff" />
            <Text style={[styles.title]}>{translate("Select Region")}</Text>
          </View>
          <Button
            style={[styles.interestButton, styles.addIconButton]}
            onPress={() => this.SectionedMultiSelect._toggleSelector()}
          >
            <PlusCircle width={53} height={53} />
          </Button>
          <Text style={[styles.title, styles.areaText]}>
            {this.props.selectedObjectets.length > 0
              ? this.props.selectedObjectets[0].name
              : this.props.area
              ? this.props.area
              : translate("Please select your area")}
          </Text>
          <SectionedMultiSelect
            ref={SectionedMultiSelect =>
              (this.SectionedMultiSelect = SectionedMultiSelect)
            }
            items={this.props.areas}
            uniqueKey="id"
            searchPlaceholderText={translate("Search Area")}
            searchTextFontFamily={{
              fontFamily: "montserrat-regular"
            }}
            stickyFooterComponent={
              <Button
                style={[styles.button, styles.submitButton]}
                onPress={() => this.SectionedMultiSelect._submitSelection()}
              >
                <CheckmarkIcon width={53} height={53} />
              </Button>
            }
            headerComponent={
              <View style={styles.headerComponent}>
                <BackButton
                  style={{
                    top: 0,
                    left: 0
                  }}
                  screenname="Select Area"
                  navigation={() =>
                    this.SectionedMultiSelect._cancelSelection()
                  }
                />
              </View>
            }
            single
            readOnlyHeadings
            hideSelect
            hideConfirm
            subKey="areas"
            styles={SectionStyle}
            confirmText={"\u2714"}
            colors={colors}
            searchIconComponent={
              <Icon
                type="MaterialCommunityIcons"
                name="magnify"
                style={[styles.indicator]}
              />
            }
            iconKey="icon"
            noItemsComponent={
              <Text style={styles.text}>
                {translate("Sorry, no areas for selected country")}
              </Text>
            }
            modalAnimationType="fade"
            onSelectedItemsChange={items =>
              this.props.onSelectedRegionChange(items)
            }
            onSelectedItemObjectsChange={items =>
              this.props.onSelectedRegionNameChange(items)
            }
            selectedItems={this.props.selectedItems}
          />
        </View>

        {this.props.selectedItems.length > 0 || this.props.area ? (
          <LowerButton function={this.props._handleSideMenuState} bottom={0} />
        ) : null}
      </SafeAreaView>
    );
  }
}
