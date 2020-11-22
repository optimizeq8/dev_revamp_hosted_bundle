import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

//icons
import PurpleCheckmarkIcon from "../../../../assets/SVGs/PurpleCheckmark";
import PurplePlusIcon from "../../../../assets/SVGs/PurplePlusIcon";

import LocationIcon from "../../../../assets/SVGs/Location";

import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
import { Icon } from "native-base";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
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
          <View style={styles.districtOuterView}>
            <View style={[globalStyles.row, styles.flex]}>
              <Text style={styles.chooseDistrictText}>
                {translate("Choose District")}
              </Text>
            </View>
            {districtListLoading && <ActivityIndicator size={"small"} />}
            {districtList &&
              districtList.map((district, index) => (
                <TouchableOpacity
                  key={district.value}
                  style={styles.districtInnerView}
                  onPress={() => {
                    handleDistricts(district.value);
                  }}
                  disabled={!startEditing}
                >
                  <View style={styles.districtHeaderView}>
                    <TouchableOpacity
                      disabled={!startEditing}
                      style={styles.districtHeaderInnerView}
                      onPress={() => {
                        handleDistricts(district.value);
                      }}
                    >
                      <View style={styles.radioButton}>
                        {districts.includes(district.value) && (
                          <View style={styles.radioButtonSelected} />
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
                        {translate(district.name)}
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
                          style={styles.arrow}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  {district.areas &&
                    district.areas.length > 0 &&
                    this.state.showDistricts[index] &&
                    district.areas.map((area) => (
                      <Text style={styles.areaName} key={area}>
                        {translate(area)}
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
