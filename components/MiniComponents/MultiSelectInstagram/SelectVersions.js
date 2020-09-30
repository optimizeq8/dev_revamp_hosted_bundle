import React, { Component } from "react";
import { Text, View, ScrollView, StatusBar } from "react-native";
import { Button, Icon } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import LoadingScreen from "../LoadingScreen";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-navigation";
//Icons
import PlusCircle from "../../../assets/SVGs/PlusCircle";
import BackButton from "../../MiniComponents/BackButton";

//Styles
import SectionStyle, { colors } from "./SectionStyle";
import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

import compareVersions from "compare-versions";
import LowerButton from "../LowerButton";
import GradientButton from "../GradientButton";
import { upperFirst } from "lodash";
import { globalColors } from "../../../GlobalStyles";

class SelectVersions extends Component {
  state = {
    versions: [],
    os_version_min: "",
    os_version_max: "",
    selectedItems: [],
  };

  componentDidMount() {
    this.props.getOSVersion(upperFirst(this.props.OSType.toLowerCase()));
    this.setState({
      selectedItems: this.props.selectedItems,
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
        children.push({ id: version, name: version });
      });

      this.setState({
        versions: [{ name: "Versions", id: 0, children }],
      });
    } else if (
      this.props.OSType === "ANDROID" &&
      prevProps.androidVersions !== this.props.androidVersions &&
      this.props.androidVersions.length > 0
    ) {
      let children = [];
      this.props.androidVersions.forEach((version, i) => {
        children.push({ id: version, name: version });
      });

      this.setState({
        versions: [{ name: "Versions", id: 0, children }],
      });
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length > 2) {
      return;
    } else if (selectedItems.length === 2) {
      this.props.onSelectedItemsChange(
        selectedItems.sort(compareVersions),
        "versions"
      );
    }

    this.setState({
      selectedItems,
    });
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    if (this.state.selectedItems.length === 2)
      this.props._handleSideMenuState(false);
    else
      showMessage({
        message: translate("Please choose at least two versions"),
        type: "warning",
        position: "top",
      });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <View style={[styles.dataContainer]}>
          <Icon
            name="versions"
            type="Octicons"
            style={styles.selectVersionIcon}
          />
          <Text style={styles.title}> {translate("Select OS Versions")}</Text>
          <Text style={styles.subHeadings}>
            {translate(`Choose which {{osType}} versions you want to target`, {
              osType: this.props.OSType,
            })}
          </Text>

          <View style={styles.slidercontainer}>
            <View style={styles.choiceContainer}>
              <GradientButton
                style={styles.toggleSelectorButton}
                onPressAction={() => this.VersionSection._toggleSelector()}
              >
                <PlusCircle width={53} height={53} />
              </GradientButton>
              <Text style={styles.inputtext}>
                {translate("Choose Minimum and Maximum versions")}
              </Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
              <SectionedMultiSelect
                ref={(ref) => (this.VersionSection = ref)}
                loading={this.state.versions.length === 0 ? true : false}
                items={this.state.versions}
                uniqueKey="name"
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
                    style={styles.itemCircles}
                  />
                }
                hideSelect
                hideConfirm
                subKey="children"
                styles={SectionStyle}
                stickyFooterComponent={
                  <LowerButton
                    screenProps={this.props.screenProps}
                    checkmark
                    style={styles.button}
                    function={() => this.VersionSection._submitSelection()}
                  />
                }
                modalWithSafeAreaView={true}
                headerComponent={
                  <View style={styles.headerComponent}>
                    <BackButton
                      style={{ top: 0, left: 0 }}
                      navigation={() => this.VersionSection._cancelSelection()}
                    />
                  </View>
                }
                colors={{ ...colors, chipColor: globalColors.rum }}
                searchPlaceholderText={translate("Search Versions")}
                searchTextFontFamily={{
                  fontFamily: "montserrat-regular",
                }}
                searchIconComponent={
                  <Icon
                    type="MaterialCommunityIcons"
                    name="magnify"
                    style={[styles.indicator]}
                  />
                }
                iconKey="icon"
                showRemoveAll
                selectText="Select Versions"
                showDropDowns={false}
                noItemsComponent={
                  <Text>{translate("Sorry, No Versions Available")}</Text>
                }
                onCancel={() => {
                  this.onSelectedItemsChange([], "version");
                }}
                selectChildren
                modalAnimationType="fade"
                onSelectedItemsChange={(items) =>
                  this.onSelectedItemsChange(items, "version")
                }
                selectedItems={this.state.selectedItems}
              />
              {this.state.versions.length === 0 && <LoadingScreen top={-10} />}
            </ScrollView>
          </View>
        </View>
        <LowerButton
          screenProps={this.props.screenProps}
          style={[styles.button]}
          checkmark={true}
          purpleViolet
          function={() => this._handleSubmission()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  isoVersions: state.instagramAds.isoVersions,
  androidVersions: state.instagramAds.androidVersions,
});

const mapDispatchToProps = (dispatch) => ({
  getOSVersion: (OSType) => dispatch(actionCreators.getOSVersion(OSType)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectVersions);
