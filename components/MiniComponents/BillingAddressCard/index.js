import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Item, Input, Icon } from "native-base";
import isUndefined from "lodash/isUndefined";
import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";

import CustomHeader from "../Header";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import CheckmarkLoading from "../../MiniComponents/CheckMarkLoading";
import Picker from "../Picker";

//Data
import Countries from "../../Data/countries.billingAddress";
import allAreas from "../../Data/NewAreas";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Icons
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";
import LocationIcon from "../../../assets/SVGs/LocationOutline";

class BillingAddressCard extends React.Component {
  constructor(props) {
    super(props);
    const { translate } = this.props.screenProps;
    this.state = {
      country_code: this.props.country_code,
      region_id: [],
      areas: [],
      sidemenu: "",
      selectedItems: [],
      selectedObjectets: [],
      inputC: false,
      inputA: false,
      inputBL: false,
      inputS: false,
      inputB: false,
      inputO: false,
      inputAv: false,
      countryError: "",
      areaError: "",
      blockError: "",
      streetError: "",
      buildingError: "",
      countries: Countries.map(country => {
        return {
          label: translate(country.label),
          value: country.value
        };
      })
    };
  }

  // componentDidMount() {
  //   this.setState({ country_code: this.props.country_code });
  // }
  componentDidUpdate(prevProps) {
    if (
      prevProps.country_code !== this.props.country_code &&
      this.props.address.area !== ""
    ) {
      this.setState({
        country_code: this.props.country_code,
        selectedItems: [],
        selectedObjectets: []
      });
      this.onSelectedCountryChange(
        [
          {
            label: this.props.address.country,
            value: this.props.country_code
          }
        ],
        true
      );
    }
  }

  onSelectedCountryChange = async (selectedItem, mounting) => {
    let replace = this.props.address;
    if (selectedItem && selectedItem.length > 0) {
      replace.country = Countries.find(
        country => country.value === selectedItem[0].value
      ).label;
      if (!mounting) replace.area = "";
      let area = allAreas.find(
        c => c.country_code.toLowerCase() === selectedItem[0].value
      );
      this.props._handleAddressChange(
        "address",
        replace,
        selectedItem[0].value
      );

      this.setState({
        country_code: selectedItem[0].value,
        areas: area ? area.list : [],
        countryError: "",
        inputC: false
      });
    }
  };

  onSelectedRegionChange = async selectedItem => {
    if (selectedItem) {
      await this.setState({
        region_id: [selectedItem],
        selectedItems: selectedItem,
        areaError: ""
      });
    }
  };
  onSelectedRegionNameChange = async selectedItem => {
    let replace = this.props.address;
    if (selectedItem && selectedItem.length > 0) {
      replace.area = selectedItem[0].name;

      this.props._handleAddressChange(
        "area",
        replace.area,
        this.state.country_code
      );
      await this.setState({
        selectedObjectets: selectedItem,
        areaError: "",
        inputA: false
      });
    }
  };

  onSelectedRegionSelected = async selectedItem => {
    if (selectedItem) {
      await this.setState({
        areas: selectedItem,
        areaError: ""
      });
    }
  };

  _handleSubmission = () => {
    const countryError = validateWrapper(
      "mandatory",
      this.props.address.country
    );
    const areaError = validateWrapper("mandatory", this.props.address.area);
    const blockError = validateWrapper("mandatory", this.props.address.block);
    const streetError = validateWrapper("mandatory", this.props.address.street);
    const buildingError = validateWrapper(
      "mandatory",
      this.props.address.building
    );
    this.setState({
      countryError,
      areaError,
      blockError,
      streetError,
      buildingError
    });
    if (
      !countryError &&
      !areaError &&
      !blockError &&
      !streetError &&
      !buildingError
    ) {
      this.props._handleSubmission();
    }
  };
  closeCountryModal = () => {
    this.setState({
      countryError: validateWrapper("mandatory", this.props.address.country),
      inputC: false,
      inputA: false
    });
  };
  onSelectedCountryIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("country", value);
  };
  setValue = (stateName, value) => {
    this.props._handleAddressChange(stateName, value);
  };
  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state
    });
  };

  render() {
    const { translate } = this.props.screenProps;

    return (
      <>
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Billing Address"}
          navigation={this.props.navigation}
        />

        <InputScrollView
          {...ScrollView.props}
          contentContainerStyle={styles.contentScrollViewContainer}
        >
          <View style={styles.marginVertical}>
            <Picker
              showIcon={true}
              screenProps={this.props.screenProps}
              searchPlaceholderText={translate("Search Country")}
              data={this.state.countries}
              uniqueKey={"value"}
              displayKey={"label"}
              open={this.state.inputC}
              onSelectedItemsChange={this.onSelectedCountryIdChange}
              onSelectedItemObjectsChange={this.onSelectedCountryChange}
              selectedItems={[this.state.country_code]}
              single={true}
              screenName={"Billing Address"}
              closeCategoryModal={this.closeCountryModal}
            />
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputC
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Country")}
              </Text>
            </View>
            <Item
              disabled={this.props.saving}
              onPress={() => {
                this.setState({
                  inputC: true
                });
              }}
              style={[
                styles.input,
                this.state.countryError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor,
                styles.itemView
              ]}
            >
              <LocationIcon
                style={styles.locationIcon}
                stroke={this.state.inputC ? "#FF9D00" : "#FFF"}
              />
              <Text
                style={[
                  styles.pickerText,
                  { fontFamily: "montserrat-regular" }
                ]}
              >
                {isUndefined(this.props.address.country)
                  ? translate("Select Country")
                  : translate(this.props.address.country)}
              </Text>
              <Icon type="AntDesign" name="down" style={styles.iconDown} />
            </Item>
          </View>

          <View style={styles.marginVertical}>
            <Picker
              showDropDowns={true}
              screenProps={this.props.screenProps}
              searchPlaceholderText={translate("Search Area")}
              data={this.state.areas}
              uniqueKey={"id"}
              displayKey={"name"}
              subKey="areas"
              single={true}
              open={this.state.inputA}
              onSelectedItemsChange={this.onSelectedRegionChange}
              onSelectedItemObjectsChange={this.onSelectedRegionNameChange}
              selectedItems={this.state.selectedItems}
              single={true}
              screenName={"Billing Address"}
              closeCategoryModal={this.closeCountryModal}
              readOnlyHeadings={true}
              showIcon={false}
            />
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputA
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Area")}
              </Text>
            </View>
            <Item
              disabled={this.props.saving}
              onPress={() => {
                this.state.country_code === ""
                  ? showMessage({
                      message: translate("Please select a country first"),
                      type: "warning",
                      position: "top"
                    })
                  : this.setState({
                      inputA: true
                    });
              }}
              style={[
                styles.input,
                this.state.areaError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor,
                styles.itemView
              ]}
            >
              <LocationIcon
                style={styles.locationIcon}
                stroke={this.state.inputA ? "#FF9D00" : "#FFF"}
              />
              <Text
                style={[
                  styles.pickerText,
                  { fontFamily: "montserrat-regular" }
                ]}
              >
                {isUndefined(this.props.address.area) ||
                this.props.address.area === ""
                  ? translate("Select Area")
                  : this.props.address.area}
              </Text>
              <Icon type="AntDesign" name="down" style={styles.iconDown} />
            </Item>
          </View>

          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputBL
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Block")}*
              </Text>
            </View>
            <Item
              disabled={this.props.saving}
              style={[
                styles.input,
                this.state.blockError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor,
                styles.itemView
              ]}
            >
              <Input
                disabled={this.props.saving}
                multiline={false}
                maxLength={10}
                style={styles.inputtext}
                autoCorrect={false}
                autoCapitalize="none"
                value={this.props.address.block}
                onChangeText={block =>
                  this.props._handleAddressChange("block", block)
                }
                onFocus={() => {
                  this.setState({ inputBL: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputBL: false,
                    blockError: validateWrapper(
                      "mandatory",
                      this.props.address.block
                    )
                  });
                }}
              />
            </Item>
          </View>

          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputB
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Building/House")}*
              </Text>
            </View>
            <Item
              disabled={this.props.saving}
              style={[
                styles.input,
                this.state.buildingError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor
              ]}
            >
              <Input
                disabled={this.props.saving}
                multiline={false}
                numberOfLines={1}
                value={this.props.address.building}
                maxLength={15}
                style={styles.inputtext}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={building =>
                  this.props._handleAddressChange("building", building)
                }
                onFocus={() => {
                  this.setState({ inputB: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputB: false,
                    buildingError: validateWrapper(
                      "mandatory",
                      this.props.address.building
                    )
                  });
                }}
              />
            </Item>
          </View>
          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputS
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Street")}*
              </Text>
            </View>
            <Item
              style={[
                styles.input,
                this.state.streetError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor
              ]}
            >
              <Input
                disabled={this.props.saving}
                value={this.props.address.street}
                numberOfLines={1}
                maxLength={70}
                style={styles.inputtext}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={street =>
                  this.props._handleAddressChange("street", street)
                }
                onFocus={() => {
                  this.setState({ inputS: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputS: false,
                    streetError: validateWrapper(
                      "mandatory",
                      this.props.address.street
                    )
                  });
                }}
              />
            </Item>
          </View>
          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputO
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Office No")}
              </Text>
            </View>
            <Item style={[styles.input]}>
              <Input
                disabled={this.props.saving}
                value={this.props.address.office}
                multiline={false}
                maxLength={10}
                style={styles.inputtext}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={office =>
                  this.props._handleAddressChange("office", office)
                }
                onFocus={() => {
                  this.setState({ inputO: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputO: false
                  });
                }}
              />
            </Item>
          </View>
          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputAv
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Avenue")}
              </Text>
            </View>
            <Item
              floatingLabel
              style={[
                styles.input
                // this.state.inputAv
                //   ? globalStyles.purpleBorderColor
                //   : globalStyles.lightGrayBorderColor
              ]}
            >
              <Input
                disabled={this.props.saving}
                value={this.props.address.avenue}
                multiline={false}
                maxLength={10}
                style={styles.inputtext}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={avenue =>
                  this.props._handleAddressChange("avenue", avenue)
                }
                onFocus={() => {
                  this.setState({ inputAv: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputAv: false
                  });
                }}
              />
            </Item>
          </View>

          {this.props.saving ? (
            <CheckmarkLoading
              style={{ bottom: -5, width: 70, height: 70 }}
              progress={this.props.progressSaving}
            />
          ) : (
            <TouchableOpacity
              onPress={() => this._handleSubmission()}
              style={[
                styles.button,
                {
                  opacity: this.props.errorLoading ? 0.5 : 1
                }
              ]}
              disabled={this.props.errorLoading}
            >
              <CheckmarkIcon />
            </TouchableOpacity>
          )}
        </InputScrollView>
      </>
    );
  }
}

export default BillingAddressCard;
