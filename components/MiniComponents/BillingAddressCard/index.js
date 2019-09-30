import React from "react";
import { View, TouchableOpacity, ScrollView, I18nManager } from "react-native";
import { Text, Item, Input, Label } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import isUndefined from "lodash/isUndefined";
import { showMessage } from "react-native-flash-message";

import RegionsAndAreas from "./RegionAndAreas";
import MultiSelect from "../MultiSelect/MultiSelect";
import KeyboardShift from "../KeyboardShift";
import Header from "../Header";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import CheckmarkLoading from "../../MiniComponents/CheckMarkLoading";
import Sidemenu from "../SideMenu";

//Data
import Countries from "../../Data/countries.billingAddress";
import allAreas from "../../Data/NewAreas";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Icons
import DownButton from "../../../assets/SVGs/DownButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import Address from "../../../assets/SVGs/Location";
import { from } from "rxjs";

class BillingAddressCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: this.props.country_code,
      region_id: [],
      areas: [],
      sidemenustate: false,
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
      buildingError: ""
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
        {
          label: this.props.address.country,
          value: this.props.country_code
        },
        true
      );
    }
  }

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this.props._handleSideMenuState(true)
    );
  };
  onSelectedCountryChange = async (selectedItem, mounting) => {
    let replace = this.props.address;
    if (selectedItem) {
      replace.country = selectedItem.label;
      if (!mounting) replace.area = "";
      let area = allAreas.find(
        c => c.country_code.toLowerCase() === selectedItem.value
      );
      this.props._handleAddressChange("address", replace, selectedItem.value);

      this.setState({
        country_code: selectedItem.value,
        areas: area ? area.list : [],
        countryError: ""
      });
    }
  };

  onSelectedRegionChange = async selectedItem => {
    if (selectedItem) {
      await this.setState({
        region_id: [selectedItem.id],
        selectedItems: selectedItem,
        areaError: ""
      });
    }
  };
  onSelectedRegionNameChange = async selectedItem => {
    let replace = this.props.address;
    if (selectedItem) {
      replace.area = selectedItem[0].name;

      this.props._handleAddressChange(
        "area",
        replace.area,
        this.state.country_code
      );
      await this.setState({
        selectedObjectets: selectedItem,
        areaError: ""
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
  render() {
    const { translate } = this.props.screenProps;
    let menu;
    switch (this.state.sidemenu) {
      case "countries": {
        menu = (
          <MultiSelect
            screenProps={this.props.screenProps}
            countries={Countries}
            country_code={this.state.country_code}
            onSelectedCountryChange={this.onSelectedCountryChange}
            _handleSideMenuState={this.props._handleSideMenuState}
            option={"countries"}
            addressForm={true}
          />
        );
        break;
      }
      case "regions": {
        menu = (
          <RegionsAndAreas
            area={this.props.address.area}
            _handleSideMenuState={this.props._handleSideMenuState}
            areas={this.state.areas}
            selectedObjectets={this.state.selectedObjectets}
            onSelectedRegionChange={this.onSelectedRegionChange}
            onSelectedRegionNameChange={this.onSelectedRegionNameChange}
            selectedItems={this.state.selectedItems}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
    }
    return (
      <Sidemenu
        onChange={isOpen => {
          if (isOpen === false) this.props._handleSideMenuState(isOpen);
        }}
        disableGestures={true}
        menu={this.props.sidemenustate && menu}
        menuPosition={I18nManager.isRTL ? "left" : "right"}
        openMenuOffset={wp("85%")}
        isOpen={this.props.sidemenustate}
        screenProps={this.props.screenProps}
      >
        <View style={styles.headerBlock}>
          <Header
            title={translate("Billing Address")}
            navigation={this.props.navigation}
          />

          <Address
            fill="#fff"
            style={styles.addressIcon}
            width={55}
            height={55}
          />
        </View>
        <View style={[styles.mainCard]}>
          <ScrollView contentContainerStyle={styles.contentScrollViewContainer}>
            <KeyboardShift>
              {() => (
                <View>
                  <Item
                    disabled={this.props.saving}
                    style={[
                      styles.selector,
                      this.state.inputC
                        ? globalStyles.purpleBorderColor
                        : this.state.countryError
                        ? globalStyles.redBorderColor
                        : globalStyles.lightGrayBorderColor,
                      globalStyles.row
                    ]}
                    onPress={() => this._renderSideMenu("countries")}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        this.state.inputC
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor,
                        {
                          flex: 3
                        }
                      ]}
                    >
                      {isUndefined(this.props.address.country)
                        ? translate("Country")
                        : this.props.address.country}
                    </Label>
                    <DownButton style={styles.flex} />
                  </Item>
                  <Item
                    disabled={this.props.saving}
                    style={[
                      styles.selector,
                      this.state.inputA
                        ? globalStyles.purpleBorderColor
                        : this.state.areaError
                        ? globalStyles.redBorderColor
                        : globalStyles.lightGrayBorderColor,
                      globalStyles.row
                    ]}
                    onPress={() => {
                      this.state.country_code === ""
                        ? showMessage({
                            message: translate("Please select a country first"),
                            type: "warning",
                            position: "top"
                          })
                        : this._renderSideMenu("regions");
                    }}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        this.state.inputA
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor,
                        {
                          flex: 3
                        }
                      ]}
                    >
                      {isUndefined(this.props.address.area) ||
                      this.props.address.area === ""
                        ? translate("Area")
                        : this.props.address.area}
                    </Label>
                    <DownButton style={styles.flex} />
                  </Item>

                  <View style={styles.blockAndBuildingView}>
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        this.state.inputBL
                          ? globalStyles.orangeBorderColor
                          : this.state.blockError
                          ? globalStyles.redBorderColor
                          : globalStyles.lightGrayBorderColor
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          this.state.inputBL
                            ? globalStyles.orangeTextColor
                            : globalStyles.darkGrayTextColor,

                          styles.bottom5
                        ]}
                      >
                        <Text style={styles.required}> *</Text>
                        {translate("Block")}
                      </Label>
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
                    <Item
                      disabled={this.props.saving}
                      floatingLabel
                      style={[
                        styles.input,
                        this.state.inputB
                          ? globalStyles.purpleBorderColor
                          : this.state.buildingError
                          ? globalStyles.redBorderColor
                          : globalStyles.lightGrayBorderColor,
                        {
                          alignSelf: "flex-end"
                        }
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          this.state.inputB
                            ? globalStyles.orangeTextColor
                            : globalStyles.darkGrayTextColor,
                          styles.bottom5,
                          {
                            fontSize: 11
                          }
                        ]}
                      >
                        <Text style={styles.required}> *</Text>
                        {translate("Building/House")}
                      </Label>
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
                  <Item
                    floatingLabel
                    style={[
                      styles.input,
                      this.state.inputS
                        ? globalStyles.purpleBorderColor
                        : this.state.streetError
                        ? globalStyles.redBorderColor
                        : globalStyles.lightGrayBorderColor,
                      styles.streetItem
                    ]}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        this.state.inputS
                          ? globalStyles.orangeTextColor
                          : globalStyles.darkGrayTextColor
                      ]}
                    >
                      <Text style={styles.required}> *</Text>
                      {translate("Street")}
                    </Label>
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

                  <View style={styles.officeAndAvenueView}>
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        this.state.inputO
                          ? globalStyles.purpleBorderColor
                          : globalStyles.lightGrayBorderColor
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          this.state.inputO
                            ? globalStyles.orangeTextColor
                            : globalStyles.darkGrayTextColor,
                          styles.bottom5
                        ]}
                      >
                        {translate("Office No")}
                      </Label>
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
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        this.state.inputAv
                          ? globalStyles.purpleBorderColor
                          : globalStyles.lightGrayBorderColor
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          this.state.inputAv
                            ? globalStyles.orangeTextColor
                            : globalStyles.darkGrayTextColor,

                          styles.bottom5
                        ]}
                      >
                        {translate("Avenue")}
                      </Label>
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
                </View>
              )}
            </KeyboardShift>
            {this.props.saving ? (
              <CheckmarkLoading
                style={{ bottom: 10, width: 65, height: 65 }}
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
          </ScrollView>
        </View>
      </Sidemenu>
    );
  }
}

export default BillingAddressCard;
