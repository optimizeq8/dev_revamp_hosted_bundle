import { connect } from "react-redux";
import React, { Component } from "react";
import MultiSelect from "react-native-multiple-select";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import * as actionCreators from "../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CustomChips from "./CustomChips";
//icon
import BackButton from "../../MiniComponents/BackButton";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../assets/SVGs/Interests.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";
//styles
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import SectionStyle from "./SectionStyle";
import LoadingScreen from "../LoadingScreen";

class SelectInterests extends Component {
  state = { interests: [] };
  componentDidMount() {
    !this.props.addressForm &&
      this.props.get_interests(this.props.country_code);
    this.setState({
      filteredCountreis: this.props.countries,
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices
    });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.interests !== this.props.interests &&
      !this.props.addressForm
    ) {
      let interests = [];
      let lenOfLists = 0;

      Object.keys(this.props.interests).forEach((key, i) => {
        if (this.props.interests[key].length > 0) {
          interests.push({
            id: key,
            children: this.props.interests[key]
          });
        }
        lenOfLists += this.props.interests[key].length;
      });

      if (lenOfLists === 0) {
        this.setState({ interests: [] });
      } else this.setState({ interests });
    }
    if (
      prevProps.country_code !== this.props.country_code &&
      !this.props.addressForm
    ) {
      this.props.get_interests(this.props.country_code);
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
            <InterestsIcon width={100} height={100} fill="#fff" />
            <Text style={[styles.title]}> Select Interests</Text>
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
              Choose Interests that best describe your audience
            </Text>
            <View style={styles.slidercontainer}>
              <Button
                style={[styles.interestButton, { elevation: -1 }]}
                onPress={() => this.Section._toggleSelector()}
              >
                <PlusCircle width={53} height={53} />
              </Button>
              <ScrollView style={{ height: hp(45) }}>
                <SectionedMultiSelect
                  ref={ref => (this.Section = ref)}
                  loading={!this.props.interests ? true : false}
                  items={this.state.interests}
                  uniqueKey="id"
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
                      onPress={() => this.Section._submitSelection()}
                    >
                      <CheckmarkIcon width={53} height={53} />
                    </Button>
                  }
                  headerComponent={
                    <View
                      style={{ height: 70, marginBottom: hp(5), top: hp(3) }}
                    >
                      <BackButton
                        navigation={() => this.Section._cancelSelection()}
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
                  //     <CustomChips
                  //       Section={this.Section}
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
                  // readOnlyHeadings={true}
                  noItemsComponent={
                    <Text style={styles.text}>
                      Sorry, no interests for selected country
                    </Text>
                  }
                  onCancel={() => {
                    this.props.onSelectedItemsChange([]);
                    this.props.onSelectedItemObjectsChange([]);
                  }}
                  selectChildren
                  modalAnimationType="fade"
                  onSelectedItemsChange={this.props.onSelectedItemsChange}
                  onSelectedItemObjectsChange={
                    this.props.onSelectedItemObjectsChange
                  }
                  selectedItems={this.props.selectedItems}
                />
                {this.state.interests.length === 0 && (
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
  interests: state.campaignC.interests
});

const mapDispatchToProps = dispatch => ({
  get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectInterests);