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
  state = {
    scrollY: 1,
    advance: true,
    showDistricts: [false, false, false, false, false],
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
      districtListLoading,
      districtList,
      districts,
      handleDistricts,
    } = this.props;
    const { translate } = this.props.screenProps;

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
          <TouchableOpacity
            disabled={loading || true}
            onPress={() => this.callFunction("selectors", "countries")}
            style={styles.targetTouchable}
          >
            <View style={[globalStyles.row, styles.flex]}>
              <LocationIcon
                width={30}
                height={30}
                style={styles.icon}
                fill={globalColors.purple}
              />

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
                  width={30}
                  height={30}
                  fill={globalColors.purple}
                />
              ) : (
                <PurplePlusIcon width={30} height={30} />
              ))}
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <View style={[globalStyles.row, styles.flex]}>
              {/* <LocationIcon
                width={30}
                height={30}
                style={styles.icon}
                fill={globalColors.purple}
              /> */}

              <Text
                style={{
                  fontSize: 14,
                  color: globalColors.rum,
                  fontFamily: "montserrat-bold",
                  marginHorizontal: 5,
                  textTransform: "uppercase",
                }}
              >
                Choose District
              </Text>
            </View>
            {districtList.map((district, index) => (
              <TouchableOpacity
                key={district.value}
                style={{ marginVertical: 5 }}
                onPress={() => {
                  handleDistricts(district.value);
                }}
                disabled={!startEditing}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    disabled={!startEditing}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      handleDistricts(district.value);
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        width: 25,
                        height: 25,
                        backgroundColor: globalColors.white,
                        borderRadius: 25,
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: globalColors.rum,
                      }}
                    >
                      {districts.includes(district.value) && (
                        <View
                          style={{
                            display: "flex",
                            alignSelf: "center",
                            width: 18,
                            height: 18,
                            backgroundColor: globalColors.purple,
                            borderRadius: 18,
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: globalColors.rum,
                        fontFamily: "montserrat-bold",
                        marginHorizontal: 5,
                      }}
                    >
                      {district.name}
                    </Text>
                  </TouchableOpacity>
                  {district.areas && district.areas.length > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        let showDistrics = [...this.state.showDistricts];
                        showDistrics = showDistrics.map(
                          (val, i) => i === index
                        );
                        this.setState({
                          showDistricts: showDistrics,
                        });
                      }}
                    >
                      <Icon
                        name={
                          this.state.showDistricts[index]
                            ? "keyboard-arrow-up"
                            : "keyboard-arrow-down"
                        }
                        type="MaterialIcons"
                        width={25}
                        height={25}
                        style={{
                          color: globalColors.purple,
                          // right: 2,
                          alignSelf: "flex-end",
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {district.areas &&
                  district.areas.length > 0 &&
                  this.state.showDistricts[index] &&
                  district.areas.map((area) => (
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginHorizontal: 30,
                        color: globalColors.rum,
                        marginVertical: 2,
                        fontSize: 12,
                      }}
                    >
                      {area}
                    </Text>
                  ))}
              </TouchableOpacity>
            ))}
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
