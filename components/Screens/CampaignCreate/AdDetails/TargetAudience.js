import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  MaskedViewIOS,
  I18nManager,
} from "react-native";
import { connect } from "react-redux";

//icons
import GreenCheckmarkIcon from "../../../../assets/SVGs/GreenCheckmark";
import LocationIcon from "../../../../assets/SVGs/Location";
import InterestsIcon from "../../../../assets/SVGs/Interests";
import GenderIcon from "../../../../assets/SVGs/Gender";
import PlusCircleIcon from "../../../../assets/SVGs/PlusCircleOutline";
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
import segmentEventTrack from "../../../segmentEventTrack";
export class TargetAudience extends Component {
  state = { scrollY: 1, advance: true };
  handleFading = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    this.setState({ scrollY: y > 10 ? y / 10 : 1 });
  };
  callFunction = (selector, option) => {
    const { translate } = this.props.screenProps;
    segmentEventTrack(
      "Cliked button to open sidemenu for " + selector + " " + option
        ? option
        : ""
    );

    if (
      (option === "regions" || option === "interests") &&
      this.props.targeting.geos[0].country_code === ""
    ) {
      segmentEventTrack(
        "Error occured on button click to open sidemenu for " + selector,
        {
          campaign_interest_error: "Please select a country first",
        }
      );
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
      <View style={{ height: "100%" }}>
        <MaskedViewIOS
          maskElement={
            <LinearGradient
              colors={["black", "black", "transparent"]}
              start={[0, 0]}
              end={[0, this.state.scrollY]}
              style={{ height: "100%" }}
            />
          }
        >
          <ScrollView
            scrollEventThrottle={100}
            onScroll={this.handleFading}
            ref={(ref) => (this.scrollView = ref)}
            indicatorStyle="white"
            contentContainerStyle={{ paddingBottom: 100 }}
            style={[
              styles.targetList,
              { height: editCampaign ? heightPercentageToDP(70) : "50%" },
            ]}
          >
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("selectors", "countries")}
              style={styles.targetTouchable}
            >
              <View style={globalStyles.row}>
                <LocationIcon width={30} height={30} style={styles.icon} />

                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Country")}</Text>
                  <Text style={styles.menudetails}>
                    {mainState.countryName !== ""
                      ? translate(mainState.countryName)
                      : ""}
                  </Text>
                </View>
              </View>
              {startEditing &&
                (targeting.geos[0].country_code ? (
                  <GreenCheckmarkIcon width={30} height={30} />
                ) : (
                  <PlusCircleIcon width={30} height={30} />
                ))}
            </TouchableOpacity>

            {mainState.showRegions ? ( //for campaign creation
              <TouchableOpacity
                onPress={() => this.callFunction("regions")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
                  <LocationIcon width={30} height={30} style={styles.icon} />
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
                  (targeting.geos[0].region_id.length !== 0 ? (
                    <GreenCheckmarkIcon width={30} height={30} />
                  ) : (
                    <PlusCircleIcon width={30} height={30} />
                  ))}
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("gender")}
              style={styles.targetTouchable}
            >
              <View style={globalStyles.row}>
                <GenderIcon width={30} height={30} style={styles.icon} />
                <View style={globalStyles.column}>
                  <Text style={styles.menutext}>{translate("Gender")}</Text>
                  <Text style={styles.menudetails}>
                    {translate(
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
                    <GreenCheckmarkIcon width={30} height={30} />
                  ) : (
                    <PlusCircleIcon width={30} height={30} />
                  ))}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("age")}
              style={styles.targetTouchable}
            >
              <View style={globalStyles.row}>
                <AgeIcon
                  fill={globalColors.orange}
                  width={25}
                  height={25}
                  style={styles.icon}
                />
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
                  <GreenCheckmarkIcon width={30} height={30} />
                ) : (
                  <PlusCircleIcon width={30} height={30} />
                ))}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("languages")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <LanguageIcon width={30} height={30} style={styles.icon} />
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
                  <GreenCheckmarkIcon width={30} height={30} />
                ) : (
                  <PlusCircleIcon width={30} height={30} />
                ))}
            </TouchableOpacity>

            {((!startEditing && editCampaign && interests_names) ||
              !editCampaign ||
              startEditing) && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "interests")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
                  <InterestsIcon width={30} height={30} style={styles.icon} />
                  <View style={[globalStyles.column, styles.flex]}>
                    <Text style={styles.menutext}>
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
                <View style={globalStyles.column}>
                  {startEditing &&
                    (targeting.interests[0].category_id.length !== 0 ? (
                      <GreenCheckmarkIcon width={30} height={30} />
                    ) : (
                      <PlusCircleIcon width={30} height={30} />
                    ))}
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.callFunction("OS")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <OperatingSystemIcon
                  width={25}
                  height={25}
                  fill={globalColors.orange}
                  style={styles.icon}
                />
                <View style={[globalStyles.column, styles.flex]}>
                  <Text style={styles.menutext}>
                    {translate("Operating System")}
                  </Text>
                  <Text style={styles.menudetails}>
                    {translate(
                      OSType.find((r) => {
                        if (r.value === targeting.devices[0].os_type) return r;
                      }).label
                    )}
                  </Text>
                </View>
              </View>

              {startEditing &&
                (targeting.devices[0].os_type === "" ||
                targeting.devices[0].os_type ? (
                  <GreenCheckmarkIcon width={30} height={30} />
                ) : (
                  <PlusCircleIcon width={30} height={30} />
                ))}
            </TouchableOpacity>

            {((!startEditing &&
              editCampaign &&
              targeting.devices[0].os_version_min) ||
              ((!editCampaign || startEditing) &&
                targeting.devices[0].os_type !== "")) && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "deviceVersions")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
                  <Icon
                    name="versions"
                    type="Octicons"
                    width={25}
                    height={25}
                    style={{
                      color: globalColors.orange,
                      right: 2,
                    }}
                  />
                  <View style={[globalStyles.column, styles.flex]}>
                    <Text style={styles.menutext}>
                      {translate("OS Versions")}
                    </Text>
                    <Text style={styles.menudetails}>
                      {targeting.devices[0].os_version_min +
                        ", " +
                        targeting.devices[0].os_version_max}
                    </Text>
                  </View>
                </View>

                {startEditing &&
                  (targeting.devices[0].os_version_min !== "" ? (
                    <GreenCheckmarkIcon width={30} height={30} />
                  ) : (
                    <PlusCircleIcon width={30} height={30} />
                  ))}
              </TouchableOpacity>
            )}

            {((!startEditing &&
              editCampaign &&
              targeting.devices[0].marketing_name.length > 0) ||
              !editCampaign ||
              startEditing) && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => this.callFunction("selectors", "deviceBrands")}
                style={styles.targetTouchable}
              >
                <View style={[globalStyles.row, styles.flex]}>
                  <DeviceMakeIcon
                    width={25}
                    height={25}
                    style={styles.icon}
                    fill={globalColors.orange}
                  />

                  <View style={[globalStyles.column, styles.flex]}>
                    <Text style={styles.menutext}>
                      {translate("Device Make")}
                    </Text>
                    <Text
                      numberOfLines={startEditing ? 1 : 10}
                      style={styles.menudetails}
                    >
                      {targeting.devices[0].marketing_name}
                    </Text>
                  </View>
                </View>

                {startEditing &&
                  (targeting.devices[0].marketing_name.length !== 0 ? (
                    <GreenCheckmarkIcon width={30} height={30} />
                  ) : (
                    <PlusCircleIcon width={30} height={30} />
                  ))}
              </TouchableOpacity>
            )}
          </ScrollView>
        </MaskedViewIOS>
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
