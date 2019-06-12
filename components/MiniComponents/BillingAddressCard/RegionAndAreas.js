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
    return (
      <SafeAreaView
        forceInset={{ bottom: "never" }}
        style={[styles.container, { flex: 1, justifyContent: "space-around" }]}
      >
        <View>
          <View
            style={{
              //   marginTop: 40,
              alignItems: "center"
            }}
          >
            <LocationIcon width={110} height={110} fill="#fff" />
            <Text style={[styles.title]}>Select Region</Text>
          </View>
          <Button
            style={[styles.interestButton, { elevation: -1 }]}
            onPress={() => this.SectionedMultiSelect._toggleSelector()}
          >
            <PlusCircle width={53} height={53} />
          </Button>
          <Text style={[styles.title, { marginTop: 30 }]}>
            {this.props.selectedObjectets.length > 0
              ? this.props.selectedObjectets[0].name
              : this.props.area
              ? this.props.area
              : "Please select your area."}
          </Text>
          <SectionedMultiSelect
            ref={SectionedMultiSelect =>
              (this.SectionedMultiSelect = SectionedMultiSelect)
            }
            items={this.props.areas}
            uniqueKey="id"
            stickyFooterComponent={
              <Button
                style={[
                  styles.button,
                  {
                    elevation: -1,
                    height: 0,
                    backgroundColor: "transparent",
                    top: "5%"
                  }
                ]}
                onPress={() => this.SectionedMultiSelect._submitSelection()}
              >
                <CheckmarkIcon width={53} height={53} />
              </Button>
            }
            headerComponent={
              <View style={{ height: 20, marginBottom: "5%", bottom: "5%" }}>
                <BackButton
                  screenname="Select Devices"
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
            selectText="Select Interests"
            noItemsComponent={
              <Text style={styles.text}>
                Sorry, no areas for selected country
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
