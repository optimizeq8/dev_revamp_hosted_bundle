import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, View, ScrollView } from "react-native";
import { Button, Icon } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import * as actionCreators from "../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

//icons
import InterestsIcon from "../../../assets/SVGs/Interests.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";
import BackButton from "../../MiniComponents/BackButton";

//Styles
import SectionStyle from "./SectionStyle";
import CustomChips2 from "./CustomChips2";
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import { globalColors } from "../../../Global Styles";
import LoadingScreen from "../LoadingScreen";
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
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <Icon
              name="cellphone-settings"
              type="MaterialCommunityIcons"
              style={[styles.icon]}
            />
            <Text style={[styles.title]}> Select Devices Make</Text>
          </View>
          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 20,
              elevation: -1
            }}
          >
            <Text style={[styles.subHeadings, { fontSize: wp(4) }]}>
              Choose which phones you want to taregt
            </Text>
            <View style={styles.slidercontainer}>
              <Button
                style={[styles.interestButton, { elevation: -1 }]}
                onPress={() => this.DeviceSection._toggleSelector()}
              >
                <PlusCircle width={53} height={53} />
              </Button>
              <ScrollView style={{ height: hp(45) }}>
                <SectionedMultiSelect
                  ref={ref => (this.DeviceSection = ref)}
                  loading={!this.props.deviceBrands ? true : false}
                  items={this.state.deviceBrands}
                  uniqueKey="id"
                  filterItems={(searchText, items) =>
                    items[0].children.filter(device =>
                      device.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                  }
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
                      style={[
                        styles.button,
                        { marginBottom: 30, elevation: -1 }
                      ]}
                      onPress={() => this.DeviceSection._submitSelection()}
                    >
                      <CheckmarkIcon width={53} height={53} />
                    </Button>
                  }
                  headerComponent={
                    <View
                      style={{ height: 70, marginBottom: hp(5), top: hp(3) }}
                    >
                      <BackButton
                        screenname="Select Devices"
                        businessname={this.props.mainBusiness.businessname}
                        navigation={() => this.DeviceSection._cancelSelection()}
                      />
                    </View>
                  }
                  colors={SectionStyle.colors}
                  searchIconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="magnify"
                      style={[styles.indicator]}
                    />
                  }
                  // customChipsRenderer={info => {
                  //   return (
                  //     <CustomChips2
                  //       DeviceSection={this.DeviceSection}
                  //       uniqueKey={info.uniqueKey}
                  //       subKey={info.subKey}
                  //       displayKey={info.displayKey}
                  //       items={info.items}
                  //       selectedItems={info.selectedItems}
                  //     />
                  //   );
                  // }}
                  iconKey="icon"
                  selectText="Select Interests"
                  showDropDowns={false}
                  showRemoveAll={true}
                  noItemsComponent={
                    <Text style={styles.text}>
                      Sorry, no interests for selected country
                    </Text>
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
        </View>
        <Button
          style={[styles.button, { marginBottom: 30, elevation: -1 }]}
          onPress={() => this.props._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.auth.mainBusiness,
  deviceBrands: state.campaignC.deviceBrands
});

const mapDispatchToProps = dispatch => ({
  get_device_brands: () => dispatch(actionCreators.get_device_brands())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDevices);
