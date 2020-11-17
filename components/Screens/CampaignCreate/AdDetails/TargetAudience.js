import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  I18nManager,
} from "react-native";
import { connect } from "react-redux";
import MaskedView from "@react-native-community/masked-view";

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
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP } from "react-native-responsive-screen";
export class TargetAudience extends Component {
  state = { scrollY: 1, advance: true };
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

    return (
      <View
        style={{
          height: heightPercentageToDP(67),
        }}
      >
        {/* <MaskedView
          maskElement={
            <LinearGradient
              colors={["black", "black", "transparent"]}
              start={[0, 0]}
              end={[0, this.state.scrollY]}
              style={{ height: "100%" }}
            />
          }
        > */}
        <ScrollView
          scrollEventThrottle={100}
          onScroll={this.handleFading}
          ref={(ref) => (this.scrollView = ref)}
          indicatorStyle="white"
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: heightPercentageToDP(20) }}
          style={[
            styles.targetList,
            {
              // marginBottom: editCampaign
              //   ? heightPercentageToDP(10)
              //   : heightPercentageToDP(30),
            },
          ]}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 30,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginVertical: 8,
            }}
          >
            <View style={[globalStyles.row, { alignItems: "center" }]}>
              <LocationIcon
                width={25}
                height={25}
                style={styles.icon}
                fill={globalColors.purple3}
              />

              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 14,
                  color: globalColors.purple3,
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                LOCATIONS
              </Text>
              {/* <Text
                style={{
                  fontFamily: "montserrat-regular",
                  fontSize: 14,
                  color: globalColors.purple,
                  textAlign: "right",
                }}
              >
                Save
              </Text> */}
              <Icon
                name="arrow-down-drop-circle-outline"
                type="MaterialCommunityIcons"
                style={{
                  color: globalColors.purple,
                  right: 2,
                  fontSize: 22,
                }}
              />
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("selectors", "countries")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
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
                  />
                ) : (
                  <PurplePlusIcon width={22} height={30} />
                ))}
            </TouchableOpacity>

            {mainState.showRegions ? ( //for campaign creation
              <TouchableOpacity
                onPress={() => this.callFunction("regions")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
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
                              : 0,
                        },
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
                  (targeting.geos.some(
                    (geo) => geo.region_id && geo.region_id.length !== 0
                  ) ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </TouchableOpacity>
            ) : null}
            {mainState.showRegions && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("map")}
                style={styles.targetTouchable}
              >
                <View style={globalStyles.row}>
                  <View style={globalStyles.column}>
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
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 30,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <View style={[globalStyles.row, { alignItems: "center" }]}>
              <GenderIcon
                width={25}
                height={25}
                fill={globalColors.purple3}
                style={styles.icon}
              />
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 14,
                  color: globalColors.purple3,
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                DEMOGRAPHICS
              </Text>
              <Icon
                name="arrow-down-drop-circle-outline"
                type="MaterialCommunityIcons"
                style={{
                  color: globalColors.purple,
                  right: 2,
                  fontSize: 22,
                }}
              />
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("gender")}
              style={styles.targetTouchable}
            >
              <View style={globalStyles.row}>
                {/* <GenderIcon
                  width={22}
                  height={30}
                  style={styles.icon}
                  fill={globalColors.purple}
                /> */}
                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Gender")}</Text>
                  <Text style={styles.menudetails}>
                    {(targeting.demographics[0].gender ||
                      targeting.demographics[0].gender === "") &&
                      translate(
                        gender.find((r) => {
                          if (r.value === targeting.demographics[0].gender)
                            return r;
                        }).label
                      )}
                  </Text>
                </View>
              </View>
              <View style={globalStyles.column}>
                {startEditing &&
                  (targeting.demographics[0].gender === "" ||
                  targeting.demographics[0].gender ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("age")}
              style={styles.targetTouchable}
            >
              <View style={globalStyles.row}>
                {/* <AgeIcon
                  width={25}
                  height={25}
                  style={styles.icon}
                  fill={globalColors.purple}
                /> */}
                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Age")}</Text>
                  <Text style={styles.menudetails}>
                    {targeting.demographics[0].min_age} -{" "}
                    {targeting.demographics[0].max_age +
                      (targeting.demographics[0].max_age === 50 ? "+" : "")}
                  </Text>
                </View>
              </View>

              {startEditing &&
                (targeting.demographics[0].max_age ? (
                  <PurpleCheckmarkIcon width={22} height={30} />
                ) : (
                  <PurplePlusIcon width={22} height={30} />
                ))}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("languages")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                {/* <LanguageIcon
                  width={22}
                  height={30}
                  style={styles.icon}
                  fill={globalColors.purple}
                /> */}
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
            </TouchableOpacity>
          </View>

          {((!startEditing && editCampaign && interests_names) ||
            !editCampaign ||
            startEditing) && (
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("selectors", "interests")}
              style={[styles.targetTouchable, { marginVertical: 8 }]}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <InterestsIcon
                  width={22}
                  height={30}
                  style={styles.icon}
                  fill={globalColors.purple}
                />
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.menutext}>{translate("Interests")}</Text>
                  <Text
                    numberOfLines={startEditing ? 1 : 10}
                    style={styles.menudetails}
                  >
                    {interests_names}
                  </Text>
                </View>
              </View>
              <View style={globalStyles.column}>
                {startEditing &&
                  (targeting.interests[0].category_id.length !== 0 ? (
                    <PurpleCheckmarkIcon width={22} height={30} />
                  ) : (
                    <PurplePlusIcon width={22} height={30} />
                  ))}
              </View>
            </TouchableOpacity>
          )}
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 30,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <View style={[globalStyles.row, { alignItems: "center" }]}>
              <OperatingSystemIcon
                width={25}
                height={25}
                fill={globalColors.purple3}
                style={styles.icon}
              />
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 14,
                  color: globalColors.purple3,
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                DEVICES
              </Text>
              <Icon
                name="arrow-down-drop-circle-outline"
                type="MaterialCommunityIcons"
                style={{
                  color: globalColors.purple,
                  right: 2,
                  fontSize: 22,
                }}
              />
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("OS")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                {/* <OperatingSystemIcon
                  width={25}
                  height={25}
                  fill={globalColors.purple}
                  style={styles.icon}
                /> */}
                <View style={[globalStyles.column, styles.flex]}>
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

            {((!startEditing &&
              editCampaign &&
              targeting.devices[0] &&
              targeting.devices[0].os_version_min) ||
              ((!editCampaign || startEditing) &&
                targeting.devices[0] &&
                targeting.devices[0].os_type !== "")) && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "deviceVersions")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
                  {/* <Icon
                    name="versions"
                    type="Octicons"
                    width={25}
                    height={25}
                    style={{
                      color: globalColors.purple,
                      right: 2,
                    }}
                  /> */}
                  <View style={[globalStyles.column, styles.flex]}>
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
              startEditing) && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "deviceBrands")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
                  {/* <DeviceMakeIcon
                    width={25}
                    height={25}
                    style={styles.icon}
                    fill={globalColors.purple}
                  /> */}

                  <View style={[globalStyles.column, styles.flex]}>
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
        {/* </MaskedView> */}
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
