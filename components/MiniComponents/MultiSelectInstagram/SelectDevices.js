import React, { Component } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import isNull from "lodash/isNull";
import * as Segment from "expo-analytics-segment";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Components
import BackButton from "../../MiniComponents/BackButton";

//Icons
import PlusCircle from "../../../assets/SVGs/PlusCircle";

//Styles
import SectionStyle, { colors } from "./SectionStyle";
import styles from "./styles";
import LowerButton from "../LowerButton";
import GradientButton from "../GradientButton";
import { upperFirst } from "lodash";

class SelectDevices extends Component {
  state = { deviceBrands: null };

  componentDidMount() {
    Segment.screen("Devices Brands Options");
    this.props.getDeviceBrand(upperFirst(this.props.OSType.toLowerCase()));
  }

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <Icon
              name="cellphone-settings"
              type="MaterialCommunityIcons"
              style={styles.icon}
            />
            <Text style={styles.title}>
              {" "}
              {translate("Select Devices Make")}
            </Text>
            <Text style={styles.subHeadings}>
              {translate("Choose which phones you want to target")}
            </Text>

            <View style={styles.slidercontainer}>
              <GradientButton
                style={styles.toggleSelectorButton}
                onPressAction={() => this.DeviceSection._toggleSelector()}
              >
                <PlusCircle width={53} height={53} />
              </GradientButton>
              <ScrollView style={styles.scrollContainer}>
                <SectionedMultiSelect
                  ref={(ref) => (this.DeviceSection = ref)}
                  loading={isNull(this.props.deviceBrands) ? true : false}
                  items={this.props.deviceBrands}
                  modalWithSafeAreaView={true}
                  uniqueKey="name"
                  readOnlyHeadings={false}
                  selectChildren={true}
                  filterItems={(searchText, items) => {
                    if (this.props.deviceBrands.length !== 0) {
                      return items.filter((device) =>
                        device.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      );
                    }
                  }}
                  //   modalWithSafeAreaView={true}
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
                  noResultsComponent={
                    <Text style={styles.errorText}>
                      {translate("No item found")}
                    </Text>
                  }
                  hideSelect={true}
                  hideConfirm
                  subKey="children"
                  styles={SectionStyle}
                  confirmText={"\u2714"}
                  stickyFooterComponent={
                    <LowerButton
                      screenProps={this.props.screenProps}
                      checkmark
                      style={styles.button}
                      function={() => this.DeviceSection._submitSelection()}
                    />
                  }
                  headerComponent={
                    <View style={styles.headerComponent}>
                      <BackButton
                        style={{ top: 0, left: 0 }}
                        screenname="Select Devices"
                        businessname={this.props.mainBusiness.businessname}
                        navigation={() => this.DeviceSection._cancelSelection()}
                      />
                    </View>
                  }
                  colors={colors}
                  searchPlaceholderText={translate("Search Devices")}
                  searchTextFontFamily={{
                    fontFamily: "montserrat-regular",
                  }}
                  searchIconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="magnify"
                      style={styles.indicator}
                    />
                  }
                  iconKey="icon"
                  selectText="Select Interests"
                  showDropDowns={false}
                  showRemoveAll={true}
                  noItemsComponent={
                    <Text>
                      {translate("Sorry, no Devices for selected country")}
                    </Text>
                  }
                  onCancel={() => {
                    this.props.onSelectedItemsChange([], "devices");
                  }}
                  modalAnimationType="fade"
                  onSelectedItemsChange={(items) =>
                    this.props.onSelectedItemsChange(items, "devices")
                  }
                  selectedItems={this.props.selectedItems}
                />
                {isNull(this.state.deviceBrands) && (
                  <ActivityIndicator color="#FFFF" size="large" />
                )}
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
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  deviceBrands: state.instagramAds.deviceBrands,
});

const mapDispatchToProps = (dispatch) => ({
  getDeviceBrand: (os) => dispatch(actionCreators.getDeviceBrand(os)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectDevices);
