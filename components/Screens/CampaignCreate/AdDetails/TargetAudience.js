import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  I18nManager,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";

//icons
import PurpleCheckmarkIcon from "../../../../assets/SVGs/PurpleCheckmark";
import LocationIcon from "../../../../assets/SVGs/Location";
import InterestsIcon from "../../../../assets/SVGs/Interests";
import GenderIcon from "../../../../assets/SVGs/Gender";
import PurplePlusIcon from "../../../../assets/SVGs/PurplePlusIcon";
import AgeIcon from "../../../../assets/SVGs/AdDetails/AgeIcon";
import OperatingSystemIcon from "../../../../assets/SVGs/AdDetails/OperatingSystem";
import LanguageIcon from "../../../../assets/SVGs/Language";
import DeviceMakeIcon from "../../../../assets/SVGs/DeviceMake";

import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
import { Icon, Input } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { gender as genders } from "./data";
import InputField from "../../../MiniComponents/InputFieldNew";
export class TargetAudience extends Component {
  state = {
    scrollY: 1,
    advance: true,
    expandLocation: false,
    expandDemographics: false,
    expandDevices: false,
  };
  handleFading = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    this.setState({ scrollY: y > 10 ? y / 10 : 1 });
  };
  callFunction = (selector, option) => {
    const { translate } = this.props.screenProps;

    if (
      (option === "regions" || option === "interests") &&
      this.props.targeting.geos[0].country_code === ""
    ) {
      showMessage({
        message: translate("Please select a country first"),
        position: "top",
        type: "warning",
      });
    } else if (this.props.startEditing)
      this.props._renderSideMenu(selector, option);
  };
  expandLocation = () => {
    this.setState({
      expandLocation: !this.state.expandLocation,
      expandDevices: false,
      expandDemographics: false,
    });
  };
  expandDemographics = () => {
    this.setState({
      expandDemographics: !this.state.expandDemographics,
      expandDevices: false,
      expandLocation: false,
    });
  };
  expandDevices = () => {
    this.setState({
      expandDevices: !this.state.expandDevices,
      expandDemographics: false,
      expandLocation: false,
    });
  };
  setValue = (stateName, value) => {
    console.log("stateName", stateName);
    console.log("value", value);
  };
  getValidInfo = () => {};
  render() {
    let {
      loading,
      gender,
      targeting,
      regions_names,
      languages_names,
      interests_names,
      OSType,
      mainState,
      editCampaign,
      startEditing,
    } = this.props;
    const { translate } = this.props.screenProps;
    const { expandLocation, expandDemographics, expandDevices } = this.state;
    return (
      <View
        style={{
          height: heightPercentageToDP(67),
        }}
      >
        <ScrollView
          scrollEventThrottle={100}
          onScroll={this.handleFading}
          ref={(ref) => (this.scrollView = ref)}
          indicatorStyle="white"
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: heightPercentageToDP(20) }}
          style={[styles.targetList]}
        >
          <View style={styles.audienceCard}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.expandLocation}
              style={[globalStyles.row, { alignItems: "center" }]}
            >
              <LocationIcon
                width={15}
                height={16}
                style={styles.icon}
                fill={globalColors.purple3}
              />

              <Text style={styles.audienceHeading}>
                {translate("Location")}
              </Text>
              <Icon
                name={`ios-arrow-drop${expandLocation ? "up" : "down"}`}
                type="MaterialUIIcons"
                style={styles.iconDown}
                onPress={this.expandLocation}
              />
            </TouchableOpacity>

            {expandLocation && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "countries")}
                style={styles.targetTouchable}
              >
                <View
                  style={[
                    globalStyles.row,
                    styles.flex,
                    styles.subAudienceHeading,
                  ]}
                >
                  <View style={globalStyles.column}>
                    <Text style={styles.menutext}>{translate("Country")}</Text>
                    <Text style={styles.menudetails}>
                      {typeof mainState.countryName !== "string" &&
                      mainState.countryName.length > 0
                        ? mainState.countryName
                            .map((co) => translate(co))
                            .join(", ")
                        : mainState.countryName}
                    </Text>
                  </View>
                </View>
                {startEditing &&
                  (targeting.geos[0].country_code ? (
                    <PurpleCheckmarkIcon
                      width={22}
                      height={30}
                      fill={globalColors.purple}
                      stroke={"#FFF"}
                    />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            )}
            {expandLocation && mainState.showRegions ? ( //for campaign creation
              <TouchableOpacity
                onPress={() => this.callFunction("regions")}
                style={styles.targetTouchable}
              >
                <View
                  style={[
                    globalStyles.column,
                    styles.flex,
                    styles.subAudienceHeading,
                  ]}
                >
                  <Text style={[styles.menutext]}>{translate("Regions")}</Text>
                  <Text
                    style={styles.menudetails}
                    numberOfLines={startEditing ? 1 : 10}
                  >
                    {regions_names}
                  </Text>
                </View>

                {startEditing &&
                  (targeting.geos.some(
                    (geo) => geo.region_id && geo.region_id.length !== 0
                  ) ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={20} height={30} />
                  ))}
              </TouchableOpacity>
            ) : null}
            {expandLocation && mainState.showRegions && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("map")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.column, styles.subAudienceHeading]}>
                  <Text style={styles.menutext}>{translate("Map")}</Text>
                  <Text style={styles.menudetails}>
                    {mainState.locationsInfo &&
                    mainState.locationsInfo.length > 0
                      ? mainState.locationsInfo
                          .map((loc) => translate(loc.countryName))
                          .join(", ")
                      : ""}
                  </Text>
                </View>

                {startEditing &&
                  (targeting.locations[0].circles.length > 0 ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.audienceCard}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.expandDemographics}
              style={[globalStyles.row, { alignItems: "center" }]}
            >
              <GenderIcon
                width={15}
                height={16}
                fill={globalColors.purple3}
                style={styles.icon}
              />
              <Text style={styles.audienceHeading}>
                {translate("Demographic")}
              </Text>
              <Icon
                name={`ios-arrow-drop${expandDemographics ? "up" : "down"}`}
                type="MaterialUIIcons"
                style={styles.iconDown}
                onPress={this.expandDemographics}
              />
            </TouchableOpacity>
            {expandDemographics && (
              <TouchableOpacity
                disabled={loading}
                // onPress={() => this.callFunction("gender")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.column, styles.subAudienceHeading]}>
                  <Text style={styles.menutext}>{translate("Gender")}</Text>
                  <View style={styles.genderOuterView}>
                    {genders.map((g) => (
                      <TouchableOpacity
                        style={[
                          styles.genderInnerView,
                          targeting.demographics[0].gender === g.value &&
                            styles.genderInnerActiveView,
                        ]}
                        activeOpacity={0.6}
                        onPress={() => {
                          this.props.onSelectedGenderChange(g.value);
                        }}
                      >
                        <Text
                          style={[
                            styles.genderRadioText,
                            targeting.demographics[0].gender === g.value &&
                              styles.genderRadioTextActive,
                          ]}
                        >
                          {translate(g.label)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            {expandDemographics && (
              <TouchableOpacity
                disabled={loading}
                activeOpacity={1}
                onPress={() => this.callFunction("age")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.column, styles.subAudienceHeading]}>
                  <Text style={styles.menutext}>{translate("Age")}</Text>
                  <View style={styles.ageOuterView}>
                    <TouchableOpacity
                      style={styles.ageView}
                      onPress={() => this.callFunction("age")}
                    >
                      <Text style={styles.ageText}>
                        {targeting.demographics[0].min_age}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.toText}>{translate("To")}</Text>
                    <TouchableOpacity
                      style={styles.ageView}
                      onPress={() => this.callFunction("age")}
                    >
                      <Text style={styles.ageText}>
                        {targeting.demographics[0].max_age +
                          (targeting.demographics[0].max_age === 50 ? "+" : "")}
                      </Text>
                    </TouchableOpacity>

                    {/* <Text style={styles.menudetails}>
                    {targeting.demographics[0].min_age} {translate("To")}{" "}
                    {targeting.demographics[0].max_age +
                      (targeting.demographics[0].max_age === 50 ? "+" : "")}
                  </Text> */}
                  </View>
                </View>

                {/* {startEditing &&
                  (targeting.demographics[0].max_age ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))} */}
              </TouchableOpacity>
            )}
            {expandDemographics && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("languages")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.column, styles.subAudienceHeading]}>
                  <Text style={styles.menutext}>{translate("Language")}</Text>
                  {targeting.demographics[0].languages.length !== 0 ? (
                    <Text
                      numberOfLines={startEditing ? 1 : 10}
                      style={styles.menudetails}
                    >
                      {languages_names}
                    </Text>
                  ) : (
                    <View style={styles.selectLanguageButton}>
                      <Text style={styles.selectLanguageText}>
                        {translate("Select Languages")}
                      </Text>
                      <Icon
                        name={`keyboard-arrow-${
                          I18nManager.isRTL ? "left" : "right"
                        }`}
                        type="MaterialIcons"
                        style={{
                          color: globalColors.purple3,
                        }}
                      />
                    </View>
                  )}
                </View>

                {/* {startEditing &&
                  (targeting.demographics[0].languages.length !== 0 ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))} */}
              </TouchableOpacity>
            )}
          </View>

          {((!startEditing && editCampaign && interests_names) ||
            !editCampaign ||
            startEditing) && (
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("selectors", "interests")}
              style={[
                styles.targetTouchable,
                { marginVertical: 8, paddingHorizontal: 10 },
              ]}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <InterestsIcon
                  width={15}
                  height={16}
                  style={styles.icon}
                  fill={globalColors.purple3}
                />
                <View
                  style={[
                    globalStyles.column,
                    styles.flex,
                    styles.interestView,
                  ]}
                >
                  <Text style={[styles.interestText]}>
                    {translate("Interests")}
                  </Text>

                  <Text
                    numberOfLines={startEditing ? 1 : 10}
                    style={styles.menudetails}
                  >
                    {interests_names}
                  </Text>
                </View>
              </View>
              <View style={[globalStyles.column, { marginRight: 7 }]}>
                {startEditing &&
                  (targeting.interests[0].category_id.length !== 0 ? (
                    <PurpleCheckmarkIcon width={20} height={30} />
                  ) : (
                    <PurplePlusIcon width={20} height={30} />
                  ))}
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.audienceCard}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.expandDevices}
              style={[globalStyles.row, { alignItems: "center" }]}
            >
              <OperatingSystemIcon
                width={15}
                height={16}
                fill={globalColors.purple3}
                style={styles.icon}
              />
              <Text style={styles.audienceHeading}>{translate("Devices")}</Text>
              <Icon
                name={`ios-arrow-drop${expandDevices ? "up" : "down"}`}
                type="MaterialUIIcons"
                style={styles.iconDown}
                onPress={this.expandDevices}
              />
            </TouchableOpacity>

            {expandDevices && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("OS")}
                style={styles.targetTouchable}
              >
                <View
                  style={[
                    globalStyles.column,
                    styles.flex,
                    styles.subAudienceHeading,
                  ]}
                >
                  <Text style={styles.menutext}>
                    {translate("Operating System")}
                  </Text>
                  <Text style={styles.menudetails}>
                    {targeting.devices[0] &&
                      translate(
                        OSType.find((r) => {
                          if (r.value === targeting.devices[0].os_type)
                            return r;
                        }).label
                      )}
                  </Text>
                </View>

                {startEditing &&
                  targeting.devices[0] &&
                  (targeting.devices[0].os_type === "" ||
                  targeting.devices[0].os_type ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            )}
            {((!startEditing &&
              editCampaign &&
              targeting.devices[0] &&
              targeting.devices[0].os_version_min) ||
              ((!editCampaign || startEditing) &&
                targeting.devices[0] &&
                targeting.devices[0].os_type !== "")) &&
              expandDevices && (
                <TouchableOpacity
                  disabled={loading}
                  onPress={() =>
                    this.callFunction("selectors", "deviceVersions")
                  }
                  style={styles.targetTouchable}
                >
                  <View
                    style={[
                      globalStyles.column,
                      styles.flex,
                      styles.subAudienceHeading,
                    ]}
                  >
                    <Text style={styles.menutext}>
                      {translate("OS Versions")}
                    </Text>
                    <Text style={styles.menudetails}>
                      {targeting.devices[0] &&
                        targeting.devices[0].os_version_min +
                          ", " +
                          targeting.devices[0] &&
                        targeting.devices[0].os_version_max}
                    </Text>
                  </View>

                  {startEditing &&
                    (targeting.devices[0] &&
                    targeting.devices[0].os_version_min !== "" ? (
                      <PurpleCheckmarkIcon width={22} height={30} />
                    ) : (
                      <PurplePlusIcon width={22} height={30} />
                    ))}
                </TouchableOpacity>
              )}

            {((!startEditing &&
              editCampaign &&
              targeting.devices[0] &&
              targeting.devices[0].marketing_name &&
              targeting.devices[0].marketing_name.length > 0) ||
              !editCampaign ||
              startEditing) &&
              expandDevices && (
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => this.callFunction("selectors", "deviceBrands")}
                  style={styles.targetTouchable}
                >
                  <View
                    style={[
                      globalStyles.column,
                      styles.flex,
                      styles.subAudienceHeading,
                    ]}
                  >
                    <Text style={styles.menutext}>
                      {translate("Device Make")}
                    </Text>
                    <Text
                      numberOfLines={startEditing ? 1 : 10}
                      style={styles.menudetails}
                    >
                      {targeting.devices[0] &&
                        targeting.devices[0].marketing_name}
                    </Text>
                  </View>

                  {startEditing &&
                    (targeting.devices[0] &&
                    targeting.devices[0].marketing_name &&
                    targeting.devices[0].marketing_name.length !== 0 ? (
                      <PurpleCheckmarkIcon width={22} height={30} />
                    ) : (
                      <PurplePlusIcon width={22} height={30} />
                    ))}
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>

        {this.state.scrollY < heightPercentageToDP(0.8) &&
          !editCampaign &&
          heightPercentageToDP(100) < 700 && (
            <Text
              onPress={() => {
                this.scrollView.scrollToEnd({ animated: true });

                this.setState({ advance: !this.state.advance });
              }}
              style={styles.moreOptionsText}
            >
              {translate("Scroll for more options")}
            </Text>
          )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TargetAudience);
