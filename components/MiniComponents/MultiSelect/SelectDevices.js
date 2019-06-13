import React, { Component } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { Button, Icon } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import BackButton from "../../MiniComponents/BackButton";
import LoadingScreen from "../LoadingScreen";

//Icons
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";

//Styles
import SectionStyle, { colors } from "./SectionStyle";
import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

//Functions
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class SelectDevices extends Component {
  state = { deviceBrands: [] };

  componentDidMount() {
    this.props.get_device_brands();
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

      this.setState({ deviceBrands: [{ name: "Devices", id: 0, children }] });
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <Icon
              name="cellphone-settings"
              type="MaterialCommunityIcons"
              style={styles.icon}
            />
            <Text style={styles.title}> Select Devices Make</Text>
            <Text style={styles.subHeadings}>
              Choose which phones you want to target
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
                  loading={!this.props.deviceBrands ? true : false}
                  items={this.state.deviceBrands}
                  uniqueKey="id"
                  filterItems={(searchText, items) => {
                    if (this.state.deviceBrands.length !== 0) {
                      return items[0].children.filter(device =>
                        device.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      );
                    }
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
                  hideSelect
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
                        screenname="Select Devices"
                        businessname={this.props.mainBusiness.businessname}
                        navigation={() => this.DeviceSection._cancelSelection()}
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
                  iconKey="icon"
                  selectText="Select Interests"
                  showDropDowns={false}
                  showRemoveAll={true}
                  noItemsComponent={
                    <Text>Sorry, no interests for selected country</Text>
                  }
                  onCancel={() => {
                    this.props.onSelectedItemsChange([], "devices");
                  }}
                  selectChildren
                  modalAnimationType="fade"
                  onSelectedItemsChange={items =>
                    this.props.onSelectedItemsChange(items, "devices")
                  }
                  selectedItems={this.props.selectedItems}
                />
                {this.state.deviceBrands.length === 0 && (
                  <LoadingScreen top={-10} />
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
  get_device_brands: () => dispatch(actionCreators.get_device_brands())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDevices);
