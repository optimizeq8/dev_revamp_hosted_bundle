import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Image
  } from "react-native";
import isEqual from "lodash/isEqual";
import { LinearGradient, Segment } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import Sidemenu from "react-native-side-menu";
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";
import { Modal } from "react-native-paper";
// Style
import styles from "./styles";
// import { colors } from "../../GradiantColors/colors";
//Icons
import Address from "../../../assets/SVGs/MenuIcons/AddressIcon";
import DownButton from "../../../assets/SVGs/DownButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg"
import Areas from "./Areas";
import Regions from "./Regions";
import Countries from "./Countries";
import MultiSelect from "../MultiSelect/MultiSelect";
import SelectRegions from "../SelectRegions";
import KeyboardShift from "../KeyboardShift";

class BillingAddressCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            country_code: "",
            region_id: [],
            areas: Areas[0].regions,
            sidemenustate: false,
            sidemenu: "",
            filteredRegions: Areas[0].regions,      
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
        }
        this.filterRegions = this.filterRegions.bind(this);
    }

    filterRegions = value => {
        this.setState({ filteredRegions: value });
      };
    
    _renderSideMenu = (component, option = "") => {
        this.setState({ sidemenu: component, selectionOption: option }, () =>
          this.props._handleSideMenuState(true)
        );
      };
    onSelectedItemsChange = async selectedItem => {
        let replace = this.props.address;
        if (selectedItem) {
            replace.country = selectedItem.label;
            replace.area = "";
            let area = Regions.find(
                c => c.country_code.toLowerCase() === selectedItem.value
            );
            this.props._handleAddressChange('address',replace)
            await this.setState({
                // address: replace,
                country_code: selectedItem.value,
                areas: area.cities,
                filteredRegions: area.cities,
                countryError: ""
            });
          // this.getTotalReach();
        }
    };
    
    onSelectedRegionChange = async selectedItem => {
        let replace = this.props.address;
        if (selectedItem) {
          replace.area = selectedItem.name;
           this.props._handleAddressChange('area',replace.area)
          await this.setState({
            // address: replace,
            region_id: [selectedItem.id],
            areaError: ""
          });
          // this.getTotalReach();
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
    render(){

    let menu;

    switch (this.state.sidemenu) {
      case "countries": {
        menu = (
          <MultiSelect
            countries={Countries}
            country_code={this.state.country_code}
            onSelectedItemsChange={this.onSelectedItemsChange}
            _handleSideMenuState={this.props._handleSideMenuState}
            option={"countries"}
            addressForm={true}
          />
        );
        break;
      }
      case "regions": {
        menu = (
          <SelectRegions
            filteredRegions={this.state.filteredRegions}
            onSelectedRegionChange={this.onSelectedRegionChange}
            _handleSideMenuState={this.props._handleSideMenuState}
            regions={this.state.areas}
            region_id={this.state.region_id}
            filterRegions={this.filterRegions}
            addressForm={true}
          />
        );
        break;
      }
    }
        return(

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
      
          <View style={styles.mainCard}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <KeyboardShift>
                {() => (
        
            <View style={styles.contentContainer}>
              <TouchableWithoutFeedback
                onPress={() => this._renderSideMenu("countries")}
              >
                <View
                  style={[
                    styles.selector,
                    {
                      borderColor: this.state.inputC
                        ? "#7039FF"
                        : this.state.countryError
                        ? "red"
                        : "#D9D9D9",
                      borderBottomWidth: 0.5,
                      marginBottom: -hp(11)
                    }
                  ]}
                >
                  <>
                    <Label
                      style={[
                        styles.inputtext,
                        {
                          bottom: 5,
                          color: this.state.inputC ? "#FF9D00" : "#717171"
                        }
                      ]}
                    >
                      {"  "}
                      {this.props.address.country === ""
                        ? "Country*"
                        : this.props.address.country}
                    </Label>
                    <DownButton style={{ left: 80, bottom: 5 }} />
                  </>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this._renderSideMenu("regions")}
              >
                <View
                  style={[
                    styles.selector,
                    {
                      borderColor: this.state.inputA
                        ? "#7039FF"
                        : this.state.areaError
                        ? "red"
                        : "#D9D9D9",
                      borderBottomWidth: 0.5,
                      marginBottom: -hp(5)
                    }
                  ]}
                >
                  <Label
                    style={[
                      styles.inputtext,
                      {
                        bottom: 5,

                        color: this.state.inputA ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    {"  "}
                    {this.props.address.area === ""
                      ? "Area*"
                      : this.props.address.area}
                  </Label>
                  <DownButton style={{ left: 90, bottom: 5 }} />
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  top: -hp("10")
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
                    {"  "}
                    Block*
                  </Label>
                  <Input
                    multiline={true}
                    maxLength={100}
                    style={styles.inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={this.props.address.block}
                    onChangeText={block => this.props._handleAddressChange('block', block)}
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
                <View style={{ width: 25 }} />
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputB
                        ? "#7039FF"
                        : this.state.buildingError
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
                        fontSize: wp(2.9),
                        color: this.state.inputB ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    Building/House #*
                  </Label>
                  <Input
                    value={this.props.address.building}
                    multiline={true}
                    maxLength={100}
                    onContentSizeChange={({
                      nativeEvent: {
                        contentSize: {
                          width: txtWidth,
                          height: txtHeight
                        }
                      }
                    }) => {
                      if (txtHeight > 40) {
                        this.setState({
                          height: txtHeight
                        });
                      }
                    }}
                    style={styles.inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={building => this.props._handleAddressChange('building', building)
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
                    width: 250,
                    top: -hp("23")
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      bottom: 5,

                      color: this.state.inputS ? "#FF9D00" : "#717171"
                    }
                  ]}
                >
                  {"  "}
                  Street*
                </Label>
                <Input
                  value={this.props.address.street}
                  multiline={true}
                  maxLength={100}
                  style={styles.inputtext}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={street =>
                    this.props._handleAddressChange('street', street)
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
                  justifyContent: "center",
                  position: "absolute",
                  top: hp(45),
                  alignSelf: "center"
                }}
              >
                <Item
                  floatingLabel
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputO
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

                        color: this.state.inputO ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    {"  "}
                    Office No.
                  </Label>
                  <Input
                    value={this.props.address.office}
                    multiline={true}
                    maxLength={100}
                    style={styles.inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={office =>
                      this.props._handleAddressChange('office', office)
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
                <View style={{ width: 25 }} />
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
                    {"  "}
                    Avenue
                  </Label>
                  <Input
                    value={this.props.address.avenue}
                    multiline={true}
                    maxLength={100}
                    style={styles.inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={avenue =>
                      this.props._handleAddressChange('avenue', avenue)
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
          
              <TouchableOpacity
                onPress={() => this._handleSubmission()}
                style={[styles.button , {opacity: (this.props.errorLoading ? 0.5 : 1 )}]}
                disabled={this.props.errorLoading}
              >
                <CheckmarkIcon />
              </TouchableOpacity>
            </View>)}
               </KeyboardShift>
               </TouchableWithoutFeedback>
             </View>
           </Sidemenu>
        )
    }
}

export default BillingAddressCard;