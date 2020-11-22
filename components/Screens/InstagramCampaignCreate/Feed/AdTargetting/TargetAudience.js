import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MaskedView from "@react-native-community/masked-view";

//icons
import PurpleCheckmarkIcon from "../../../../../assets/SVGs/PurpleCheckmark";
import LocationIcon from "../../../../../assets/SVGs/Location";
import InterestsIcon from "../../../../../assets/SVGs/Interests";
import GenderIcon from "../../../../../assets/SVGs/Gender";
import PurplePlusIcon from "../../../../../assets/SVGs/PurplePlusIcon";
import AgeIcon from "../../../../../assets/SVGs/AdDetails/AgeIcon";
import OperatingSystemIcon from "../../../../../assets/SVGs/AdDetails/OperatingSystem";
import LanguageIcon from "../../../../../assets/SVGs/Language";
import DeviceMakeIcon from "../../../../../assets/SVGs/DeviceMake";

import styles from "../../styles/adTargetting.styles";
import globalStyles, { globalColors } from "../../../../../GlobalStyles";
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { gender as genders } from "./data";
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

    if (this.props.startEditing) this.props._renderSideMenu(selector, option);
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
  closeAll = () => {
    this.setState({
      expandDevices: false,
      expandDemographics: false,
      expandLocation: false,
    });
  };
  render() {
    let {
      loading,
      gender,
      targeting,
      regions_names,
      countries_names,
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
          height: editCampaign
            ? heightPercentageToDP(60)
            : heightPercentageToDP(100) > 700
            ? "50%"
            : "43%",
        }}
      >
        <ScrollView
          scrollEventThrottle={100}
          onScroll={this.handleFading}
          ref={(ref) => (this.scrollView = ref)}
          indicatorStyle="white"
          contentContainerStyle={{ paddingBottom: 100 }}
          style={[
            styles.targetList,
            { height: editCampaign ? heightPercentageToDP(60) : "90%" },
          ]}
        >
          <View style={styles.audienceCard}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.expandLocation}
              style={[
                globalStyles.row,
                { alignItems: "center", marginBottom: expandLocation ? 10 : 0 },
              ]}
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
                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Countries")}</Text>
                  <Text style={styles.menudetails}>{countries_names}</Text>
                </View>

                {startEditing &&
                  (countries_names.length !== 0 ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            )}
            {expandLocation && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("regions")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.menutext}>{translate("Regions")}</Text>
                  <Text style={styles.menudetails}>{regions_names}</Text>
                </View>

                {startEditing &&
                  (regions_names.length !== 0 ? (
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
              style={[
                globalStyles.row,
                {
                  alignItems: "center",
                  marginBottom: expandDemographics ? 10 : 0,
                },
              ]}
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
                activeOpacity={1}
                // onPress={() => this.callFunction("genders")}
                style={styles.targetTouchable}
              >
                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Gender")}</Text>

                  <View style={styles.genderOuterView}>
                    {genders.map((g) => (
                      <TouchableOpacity
                        style={[
                          styles.genderInnerView,
                          gender === g.value && styles.genderInnerActiveView,
                        ]}
                        activeOpacity={0.6}
                        onPress={() => {
                          this.props.onSelectedGenderChange(g.value);
                        }}
                        disabled={loading || !startEditing}
                      >
                        <Text
                          style={[
                            styles.genderRadioText,
                            gender === g.value && styles.genderRadioTextActive,
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
                onPress={() => this.callFunction("age")}
                style={styles.targetTouchable}
              >
                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Age")}</Text>

                  <View style={styles.ageOuterView}>
                    <TouchableOpacity
                      style={styles.ageView}
                      onPress={() => this.callFunction("age")}
                    >
                      <Text style={styles.ageText}>{targeting.age_min}</Text>
                    </TouchableOpacity>

                    <Text style={styles.toText}>{translate("To")}</Text>
                    <TouchableOpacity
                      style={styles.ageView}
                      onPress={() => this.callFunction("age")}
                    >
                      <Text style={styles.ageText}>{targeting.age_max}</Text>
                    </TouchableOpacity>

                    {/* <Text style={styles.menudetails}>
                    {targeting.demographics[0].min_age} {translate("To")}{" "}
                    {targeting.demographics[0].max_age +
                      (targeting.demographics[0].max_age === 50 ? "+" : "")}
                  </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/*
            
            Later if it has to be used
            {((!startEditing && editCampaign && regions_names) ||
              !editCampaign) &&
              targeting.geo_locations.countries.length > 0 && (
                <TouchableOpacity
                  onPress={() => this.callFunction("regions")}
                  style={styles.targetTouchable}
                >
                  <View style={[globalStyles.row, styles.flex]}>
                    <LocationIcon width={22} height={30} style={styles.icon}   fill={globalColors.purple}/>
                    <View style={[globalStyles.column, styles.flex]}>
                      <Text
                        style={[
                          styles.menutext,
                          {
                            paddingLeft:
                              Platform.OS === "android" && I18nManager.isRTL
                                ? 0
                                : 15,
                            paddingRight:
                              Platform.OS === "android" && I18nManager.isRTL
                                ? 15
                                : 0
                          }
                        ]}
                      >
                        {translate("Regions")}
                      </Text>
                      <Text
                        style={styles.menudetails}
                        numberOfLines={startEditing ? 1 : 10}
                      >
                        {regions_names}
                      </Text>
                    </View>
                  </View>

                  {startEditing &&
                    (targeting.geo_locations.region_id.length !== 0 ? (
                      <PurpleCheckmarkIcon width={22} height={30} />
                    ) : (
                      <PurplePlusIcon width={22} height={30} />
                    ))}
                </TouchableOpacity>
              )} */}

          {/* 
            Later will be used 
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("languages")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <LanguageIcon width={22} height={30} style={styles.icon}   fill={globalColors.purple}/>
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.menutext}>{translate("Language")}</Text>
                  <Text
                    numberOfLines={startEditing ? 1 : 10}
                    style={styles.menudetails}
                  >
                    {languages_names}
                  </Text>
                </View>
              </View>
              {startEditing &&
                (targeting.demographics[0].languages.length !== 0 ? (
                  <PurpleCheckmarkIcon width={22} height={30} />
                ) : (
                  <PurplePlusIcon width={22} height={30} />
                ))}
            </TouchableOpacity> */}

          {((!startEditing && editCampaign && interests_names) ||
            !editCampaign ||
            startEditing) && (
            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                this.closeAll();
                this.callFunction("selectors", "interests");
              }}
              style={[
                styles.targetTouchable,
                { marginVertical: 8, paddingHorizontal: 10 },
              ]}
            >
              <View style={[globalStyles.row, { width: "80%" }]}>
                <InterestsIcon
                  width={15}
                  height={30}
                  style={styles.icon}
                  fill={globalColors.purple3}
                />
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.interestText}>
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

              {startEditing &&
                (interests_names && interests_names.length !== 0 ? (
                  <PurpleCheckmarkIcon width={22} height={30} />
                ) : (
                  <PurplePlusIcon width={22} height={30} />
                ))}
            </TouchableOpacity>
          )}
          <View style={styles.audienceCard}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.expandDevices}
              style={[
                globalStyles.row,
                { alignItems: "center", marginBottom: expandDevices ? 10 : 0 },
              ]}
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
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.menutext}>
                    {translate("Operating System")}
                  </Text>
                  <Text style={styles.menudetails}>
                    {translate(
                      targeting.user_os[0] === "" ? "All" : targeting.user_os[0]
                    )}
                    {/* {translate(
                      OSType.find((r) => {
                        if (r.value === targeting.user_os[0]) return r;
                      }).label
                    )} */}
                  </Text>
                </View>

                {startEditing &&
                  (targeting.user_os[0] === "" || targeting.user_os[0] ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            )}
            {expandDevices &&
            ((startEditing && editCampaign && targeting.os_version_min) ||
              ((!editCampaign || startEditing) &&
                targeting.user_os[0] !== "")) ? (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "deviceVersions")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.menutext}>
                    {translate("OS Versions")}
                  </Text>
                  <Text style={styles.menudetails}>
                    {targeting.os_version_min + ", " + targeting.os_version_max}
                  </Text>
                </View>

                {startEditing &&
                  (targeting.os_version_min !== "" ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            ) : null}
            {expandDevices &&
              ((startEditing &&
                editCampaign &&
                targeting.user_device.length > 0) ||
                !editCampaign ||
                (startEditing && targeting.user_os[0] !== "")) && (
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => this.callFunction("selectors", "deviceBrands")}
                  style={styles.targetTouchable}
                >
                  <View style={[globalStyles.column, styles.flex]}>
                    <Text style={styles.menutext}>
                      {translate("Device Make")}
                    </Text>
                    <Text
                      numberOfLines={startEditing ? 1 : 10}
                      style={styles.menudetails}
                    >
                      {targeting.user_device.join(", ")}
                    </Text>
                  </View>

                  {startEditing &&
                    (targeting.user_device.length !== 0 ? (
                      <PurpleCheckmarkIcon width={22} height={30} />
                    ) : (
                      <PurplePlusIcon width={22} height={30} />
                    ))}
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>

        {this.state.scrollY < 12 &&
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
