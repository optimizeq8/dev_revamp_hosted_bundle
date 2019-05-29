import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text, Item, Input, Label, Content } from "native-base";
import Sidemenu from "react-native-side-menu";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import isUndefined from "lodash/isUndefined";
import RegionsAndAreas from "./RegionAndAreas";
import MultiSelect from "../MultiSelect/MultiSelect";
import KeyboardShift from "../KeyboardShift";

//Data
import Countries from "./Countries";

import { all, kuwaitAreas } from "../../Screens/AddressForm/NewAreas";
// Style
import styles from "./styles";

//Icons
import DownButton from "../../../assets/SVGs/DownButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";

class BillingAddressCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: this.props.country_code,
      region_id: [],
      areas: kuwaitAreas[0].areas,
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
      let area = all.find(
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
    console.log("this.props.address.area", this.props.address);

    let menu;
    switch (this.state.sidemenu) {
      case "countries": {
        menu = (
          <MultiSelect
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
        menuPosition="right"
        openMenuOffset={wp("85%")}
        isOpen={this.props.sidemenustate}
      >
        <View
          style={[
            styles.mainCard,
            { top: this.props.sidemenustate ? hp(20) : 0 }
          ]}
        >
          <ScrollView>
            <KeyboardShift>
              {() => (
                <View>
                  <Item
                    style={[
                      styles.selector,
                      {
                        borderColor: this.state.inputC
                          ? "#7039FF"
                          : this.state.countryError
                          ? "red"
                          : "#D9D9D9",
                        flexDirection: "row"
                      }
                    ]}
                    onPress={() => this._renderSideMenu("countries")}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          flex: 3,
                          color: this.state.inputC ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      {isUndefined(this.props.address.country)
                        ? "Country"
                        : this.props.address.country}
                    </Label>
                    <DownButton style={{ flex: 1 }} />
                  </Item>
                  <Item
                    style={[
                      styles.selector,
                      {
                        borderColor: this.state.inputA
                          ? "#7039FF"
                          : this.state.areaError
                          ? "red"
                          : "#D9D9D9",
                        flexDirection: "row"
                      }
                    ]}
                    onPress={() => this._renderSideMenu("regions")}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          flex: 3,
                          color: this.state.inputA ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      {isUndefined(this.props.address.area) ||
                      this.props.address.area === ""
                        ? "Area"
                        : this.props.address.area}
                    </Label>
                    <DownButton style={{ flex: 1 }} />
                  </Item>

                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      justifyContent: "space-between",
                      width: 250,
                      marginBottom: 15
                    }}
                  >
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        {
                          borderColor: this.state.inputBL
                            ? "#7039FF"
                            : this.state.blockError
                            ? "red"
                            : "#D9D9D9"
                        }
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          {
                            bottom: 5,
                            color: this.state.inputBL ? "#FF9D00" : "#717171"
                          }
                        ]}
                      >
                        <Text style={styles.required}> *</Text>
                        Block
                      </Label>
                      <Input
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
                      floatingLabel
                      style={[
                        styles.input,
                        {
                          borderColor: this.state.inputB
                            ? "#7039FF"
                            : this.state.buildingError
                            ? "red"
                            : "#D9D9D9",
                          alignSelf: "flex-end"
                        }
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          {
                            bottom: 5,
                            fontSize: 11,
                            color: this.state.inputB ? "#FF9D00" : "#717171"
                          }
                        ]}
                      >
                        <Text style={styles.required}> *</Text>
                        Building/House
                      </Label>
                      <Input
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
                      {
                        borderColor: this.state.inputS
                          ? "#7039FF"
                          : this.state.streetError
                          ? "red"
                          : "#D9D9D9",
                        width: 250
                      }
                    ]}
                  >
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          color: this.state.inputS ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      <Text style={styles.required}> *</Text>
                      Street
                    </Label>
                    <Input
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

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 250,
                      marginTop: 20,
                      alignSelf: "center"
                    }}
                  >
                    <Item
                      floatingLabel
                      style={[
                        styles.input,
                        {
                          borderColor: this.state.inputO ? "#7039FF" : "#D9D9D9"
                        }
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          {
                            bottom: 5,
                            color: this.state.inputO ? "#FF9D00" : "#717171"
                          }
                        ]}
                      >
                        Office No.
                      </Label>
                      <Input
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
                        {
                          borderColor: this.state.inputAv
                            ? "#7039FF"
                            : "#D9D9D9"
                        }
                      ]}
                    >
                      <Label
                        style={[
                          styles.inputtext,
                          {
                            bottom: 5,

                            color: this.state.inputAv ? "#FF9D00" : "#717171"
                          }
                        ]}
                      >
                        Avenue
                      </Label>
                      <Input
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
          </ScrollView>
        </View>
      </Sidemenu>
    );
  }
}

export default BillingAddressCard;
