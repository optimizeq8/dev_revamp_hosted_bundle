import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { Button, Icon } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import * as actionCreators from "../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import compareVersions from "compare-versions"; //icons
import InterestsIcon from "../../../assets/SVGs/Interests.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import PlusCircle from "../../../assets/SVGs/PlusCircle.svg";
import BackButton from "../../MiniComponents/BackButton";

//Styles
import SectionStyle from "./SectionStyle";
import CustomChips2 from "./CustomChips2";
import styles from "../../Screens/CampaignCreate/AdDetails/styles";
import styles1 from "./styles";
import { globalColors } from "../../../Global Styles";
import LoadingScreen from "../LoadingScreen";
import { showMessage } from "react-native-flash-message";
class SelectVersions extends Component {
  state = {
    versions: [],
    os_version_min: "",
    os_version_max: "",
    selectedItems: []
  };

  componentDidMount() {
    this.props.OSType === "iOS"
      ? this.props.get_ios_verisons()
      : this.props.get_android_versions();
    this.setState({
      selectedItems: this.props.selectedItems
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.OSType === "iOS" &&
      prevProps.isoVersions !== this.props.isoVersions &&
      this.props.isoVersions.length > 0
    ) {
      let children = [];
      this.props.isoVersions.forEach((version, i) => {
        children.push({ ...version.os_version });
      });

      this.setState({ versions: [{ name: "Versions", id: 0, children }] });
    } else if (
      this.props.OSType === "ANDROID" &&
      prevProps.androidVersions !== this.props.androidVersions &&
      this.props.androidVersions.length > 0
    ) {
      let children = [];
      this.props.androidVersions.forEach((version, i) => {
        children.push({ ...version.os_version });
      });

      this.setState({ versions: [{ name: "Versions", id: 0, children }] });
    }
  }
  onSelectedItemsChange = selectedItems => {
    if (selectedItems.length > 2) {
      return;
    } else if (selectedItems.length === 2) {
      this.props.onSelectedItemsChange(
        selectedItems.sort(compareVersions),
        "versions"
      );
    }

    this.setState({
      selectedItems
    });
  };

  _handleSubmission = () => {
    if (this.state.selectedItems.length === 2)
      this.props._handleSideMenuState(false);
    else
      showMessage({
        message: "Please choose at least two versions",
        type: "warning",
        position: "top"
      });
  };
  render() {
    return (
      <SafeAreaView style={styles1.safeAreaContainer}>
        <View style={styles1.container}>
          <View style={[styles1.dataContainer, { marginTop: 30 }]}>
            <Icon
              name="versions"
              type="Octicons"
              style={{ fontSize: 60, color: "#fff" }}
            />
            <Text style={[styles1.title]}> Select OS Versions</Text>
            <Text style={[styles1.subHeadings]}>
              Choose which {this.props.OSType} versions you want to taregt
            </Text>

            <View style={styles1.slidercontainer}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly"
                }}
              >
                <Button
                  style={[styles1.interestButton, { elevation: -1 }]}
                  onPress={() => this.VersionSection._toggleSelector()}
                >
                  <PlusCircle width={53} height={53} />
                </Button>
                <Text style={styles1.inputtext}>
                  Choose Minimum and Maximum versions
                </Text>
              </View>
              <ScrollView style={styles1.scrollContainer}>
                <SectionedMultiSelect
                  ref={ref => (this.VersionSection = ref)}
                  loading={this.state.versions.length === 0 ? true : false}
                  items={this.state.versions}
                  uniqueKey="name"
                  // filterItems={(searchText, items) =>
                  //   items[0].children.filter(device =>
                  //     device.name
                  //       .toLowerCase()
                  //       .includes(searchText.toLowerCase())
                  //   )
                  // }
                  selectToggleIconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="menu-down"
                      style={styles1.indicator}
                    />
                  }
                  selectedIconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="circle"
                      style={[styles1.itemCircles]}
                    />
                  }
                  unselectedIconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="circle-outline"
                      style={[styles1.itemCircles]}
                    />
                  }
                  hideSelect
                  hideConfirm
                  subKey="children"
                  styles={SectionStyle}
                  stickyFooterComponent={
                    <Button
                      style={[
                        styles1.button,
                        { marginBottom: 30, elevation: -1 }
                      ]}
                      onPress={() => this.VersionSection._submitSelection()}
                    >
                      <CheckmarkIcon width={53} height={53} />
                    </Button>
                  }
                  headerComponent={
                    <View
                      style={{ height: 70, marginBottom: hp(5), top: hp(3) }}
                    >
                      <BackButton
                        navigation={() =>
                          this.VersionSection._cancelSelection()
                        }
                      />
                    </View>
                  }
                  colors={SectionStyle.colors}
                  searchIconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="magnify"
                      style={[styles1.indicator]}
                    />
                  }
                  // customChipsRenderer={info => {
                  //   return (
                  //     <CustomChips2
                  //       VersionSection={this.VersionSection}
                  //       uniqueKey={info.uniqueKey}
                  //       subKey={info.subKey}
                  //       displayKey={info.displayKey}
                  //       items={info.items}
                  //       selectedItems={info.selectedItems}
                  //     />
                  //   );
                  // }}
                  iconKey="icon"
                  showRemoveAll
                  selectText="Select Interests"
                  showDropDowns={false}
                  noItemsComponent={
                    <Text style={{}}>
                      Sorry, no interests for selected country
                    </Text>
                  }
                  onCancel={() => {
                    this.onSelectedItemsChange([], "version");
                  }}
                  selectChildren
                  modalAnimationType="fade"
                  onSelectedItemsChange={items =>
                    this.onSelectedItemsChange(items, "version")
                  }
                  selectedItems={this.state.selectedItems}
                />
                {this.state.versions.length === 0 && (
                  <LoadingScreen top={-10} />
                )}
              </ScrollView>
            </View>
          </View>

          <Button
            style={[styles1.button]}
            onPress={() => this._handleSubmission()}
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
  isoVersions: state.campaignC.isoVersions,
  androidVersions: state.campaignC.androidVersions
});

const mapDispatchToProps = dispatch => ({
  get_ios_verisons: () => dispatch(actionCreators.get_ios_versions()),
  get_android_versions: () => dispatch(actionCreators.get_android_versions())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectVersions);