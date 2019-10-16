import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  MaskedViewIOS,
  I18nManager
} from "react-native";
import { connect } from "react-redux";

//icons
import GreenCheckmarkIcon from "../../../../assets/SVGs/GreenCheckmark.svg";
import LocationIcon from "../../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../../assets/SVGs/Interests.svg";
import GenderIcon from "../../../../assets/SVGs/Gender.svg";
import PlusCircleIcon from "../../../../assets/SVGs/PlusCircleOutline.svg";
import AgeIcon from "../../../../assets/SVGs/AdDetails/AgeIcon";
import OperatingSystemIcon from "../../../../assets/SVGs/AdDetails/OperatingSystem";
import LanguageIcon from "../../../../assets/SVGs/Language";
import DeviceMakeIcon from "../../../../assets/SVGs/DeviceMake";

import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
export class TargetAudience extends Component {
  state = { scrollY: 1 };
  handleFading = event => {
    let y = event.nativeEvent.contentOffset.y;
    this.setState({ scrollY: y > 10 ? y / 10 : 1 });
  };
  render() {
    let {
      _renderSideMenu,
      loading,
      gender,
      targeting,
      regions_names,
      languages_names,
      interests_names,
      OSType,
      mainState
    } = this.props;
    const { translate } = this.props.screenProps;
    return (
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
          ref={ref => (this.scrollView = ref)}
          indicatorStyle="white"
          contentContainerStyle={{ paddingBottom: 100 }}
          style={styles.targetList}
        >
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              _renderSideMenu("gender");
            }}
            style={styles.targetTouchable}
          >
            <View style={globalStyles.row}>
              <GenderIcon width={25} height={25} style={styles.icon} />
              <View style={globalStyles.column}>
                <Text style={styles.menutext}>{translate("Gender")}</Text>
                <Text style={styles.menudetails}>
                  {translate(
                    gender.find(r => {
                      if (r.value === targeting.demographics[0].gender)
                        return r;
                    }).label
                  )}
                </Text>
              </View>
            </View>
            <View style={globalStyles.column}>
              {targeting.demographics[0].gender === "" ||
              targeting.demographics[0].gender ? (
                <GreenCheckmarkIcon width={25} height={25} />
              ) : (
                <PlusCircleIcon width={25} height={25} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              _renderSideMenu("age");
            }}
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
                  {targeting.demographics[0].max_age === 35
                    ? "35+"
                    : targeting.demographics[0].max_age}
                </Text>
              </View>
            </View>

            {targeting.demographics[0].max_age ? (
              <GreenCheckmarkIcon width={25} height={25} />
            ) : (
              <PlusCircleIcon width={25} height={25} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              _renderSideMenu("selectors", "countries");
            }}
            style={styles.targetTouchable}
          >
            <View style={globalStyles.row}>
              <LocationIcon width={25} height={25} style={styles.icon} />

              <View style={globalStyles.column}>
                <Text style={styles.menutext}>{translate("Country")}</Text>
                <Text style={styles.menudetails}>
                  {mainState.countryName !== ""
                    ? translate(mainState.countryName)
                    : ""}
                </Text>
              </View>
            </View>
            {targeting.geos[0].country_code ? (
              <GreenCheckmarkIcon width={25} height={25} />
            ) : (
              <PlusCircleIcon width={25} height={25} />
            )}
          </TouchableOpacity>

          {mainState.showRegions && (
            <TouchableOpacity
              onPress={() => {
                _renderSideMenu("regions");
              }}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <LocationIcon width={25} height={25} style={styles.icon} />
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
                  <Text style={styles.menudetails} numberOfLines={1}>
                    {regions_names}
                  </Text>
                </View>
              </View>

              {targeting.geos[0].region_id.length !== 0 ? (
                <GreenCheckmarkIcon width={25} height={25} />
              ) : (
                <PlusCircleIcon width={25} height={25} />
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              _renderSideMenu("languages");
            }}
            style={styles.targetTouchable}
          >
            <View style={[globalStyles.row, styles.flex]}>
              <LanguageIcon width={25} height={25} style={styles.icon} />
              <View style={[globalStyles.column, styles.flex]}>
                <Text style={styles.menutext}>{translate("Language")}</Text>
                <Text numberOfLines={1} style={styles.menudetails}>
                  {languages_names}
                </Text>
              </View>
            </View>

            {targeting.demographics[0].languages.length !== 0 ? (
              <GreenCheckmarkIcon width={25} height={25} />
            ) : (
              <PlusCircleIcon width={25} height={25} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              targeting.geos[0].country_code === ""
                ? showMessage({
                    message: translate("Please select a country first"),
                    position: "top",
                    type: "warning"
                  })
                : _renderSideMenu("selectors", "interests");
            }}
            style={styles.targetTouchable}
          >
            <View style={[globalStyles.row, styles.flex]}>
              <InterestsIcon width={25} height={25} style={styles.icon} />
              <View style={[globalStyles.column, styles.flex]}>
                <Text style={styles.menutext}>{translate("Interests")}</Text>
                <Text numberOfLines={1} style={styles.menudetails}>
                  {interests_names}
                </Text>
              </View>
            </View>
            <View style={globalStyles.column}>
              {targeting.interests[0].category_id.length !== 0 ? (
                <GreenCheckmarkIcon width={25} height={25} />
              ) : (
                <PlusCircleIcon width={25} height={25} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              _renderSideMenu("OS");
            }}
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
                    OSType.find(r => {
                      if (r.value === targeting.devices[0].os_type) return r;
                    }).label
                  )}
                </Text>
              </View>
            </View>

            {targeting.devices[0].os_type === "" ||
            targeting.devices[0].os_type ? (
              <GreenCheckmarkIcon width={25} height={25} />
            ) : (
              <PlusCircleIcon width={25} height={25} />
            )}
          </TouchableOpacity>

          {targeting.devices[0].os_type !== "" && (
            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                _renderSideMenu("selectors", "deviceVersions");
              }}
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
                    right: 2
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

              {targeting.devices[0].os_version_min !== "" ? (
                <GreenCheckmarkIcon width={25} height={25} />
              ) : (
                <PlusCircleIcon width={25} height={25} />
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              _renderSideMenu("selectors", "deviceBrands");
            }}
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
                <Text style={styles.menutext}>{translate("Device Make")}</Text>
                <Text numberOfLines={1} style={styles.menudetails}>
                  {targeting.devices[0].marketing_name}
                </Text>
              </View>
            </View>

            {targeting.devices[0].marketing_name.length !== 0 ? (
              <GreenCheckmarkIcon width={25} height={25} />
            ) : (
              <PlusCircleIcon width={25} height={25} />
            )}
          </TouchableOpacity>
        </ScrollView>
      </MaskedViewIOS>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TargetAudience);
