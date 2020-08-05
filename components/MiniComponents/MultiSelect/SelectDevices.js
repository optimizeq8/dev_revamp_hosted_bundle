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
import { globalColors } from "../../../GlobalStyles";

class SelectDevices extends Component {
  state = { deviceBrands: null };

  componentDidMount() {
    // console.log(
    //   "this.props.campaignInfo:",
    //   this.props.OSType
    // );
    // this.props.get_device_brands("");
    Segment.screen("Devices Brands Options");

    switch (this.props.OSType) {
      case "iOS":
        this.props.get_device_brands("/1");
        break;
      case "ANDROID":
        this.props.get_device_brands("/2");
        break;

      default:
        this.props.get_device_brands("");

        break;
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.deviceBrands !== this.props.deviceBrands &&
      this.props.deviceBrands.length > 0
    ) {
      let children = [];
      this.props.deviceBrands.forEach((device, i) => {
        children.push({ ...device.marketing_name });
      });

      this.setState({ deviceBrands: children });
    }
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
                  loading={isNull(this.state.deviceBrands) ? true : false}
                  items={this.state.deviceBrands}
                  modalWithSafeAreaView={true}
                  uniqueKey="id"
                  readOnlyHeadings={false}
                  selectChildren={true}
                  filterItems={(searchText, items) => {
                    if (
                      this.state.deviceBrands &&
                      this.state.deviceBrands.length !== 0
                    ) {
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
                        stroke={"#FFF"}
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
                  colors={{
                    chipColor: globalColors.rum,
                  }}
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
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  deviceBrands: state.campaignC.deviceBrands,
});

const mapDispatchToProps = (dispatch) => ({
  get_device_brands: (os) => dispatch(actionCreators.get_device_brands(os)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectDevices);
