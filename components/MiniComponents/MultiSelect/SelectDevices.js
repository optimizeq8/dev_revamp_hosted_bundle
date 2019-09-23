import React, { Component } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { Button, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import isNull from "lodash/isNull";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Components
import BackButton from "../../MiniComponents/BackButton";

//Icons
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";

//Styles
import SectionStyle, { colors } from "./SectionStyle";
import styles from "./styles";

class SelectDevices extends Component {
  state = { deviceBrands: null };

  componentDidMount() {
    // console.log(
    //   "this.props.campaignInfo:",
    //   this.props.OSType
    // );
    // this.props.get_device_brands("");

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
              <Button
                style={styles.toggleSelectorButton}
                onPress={() => this.DeviceSection._toggleSelector()}
              >
                <PlusCircle width={53} height={53} />
              </Button>
              <ScrollView style={styles.scrollContainer}>
                <SectionedMultiSelect
                  ref={ref => (this.DeviceSection = ref)}
                  loading={isNull(this.state.deviceBrands) ? true : false}
                  items={this.state.deviceBrands}
                  modalWithSafeAreaView={true}
                  uniqueKey="id"
                  readOnlyHeadings={false}
                  selectChildren={true}
                  filterItems={(searchText, items) => {
                    if (this.state.deviceBrands.length !== 0) {
                      return items.filter(device =>
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
                    <Button
                      style={styles.stickyFooterButton}
                      onPress={() => this.DeviceSection._submitSelection()}
                    >
                      <CheckmarkIcon width={53} height={53} />
                    </Button>
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
                  onSelectedItemsChange={items =>
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

          <Button
            style={styles.button}
            onPress={() => this.props._handleSideMenuState(false)}
          >
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  deviceBrands: state.campaignC.deviceBrands
});

const mapDispatchToProps = dispatch => ({
  get_device_brands: os => dispatch(actionCreators.get_device_brands(os))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDevices);
