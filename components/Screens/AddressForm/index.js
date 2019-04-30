import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image
} from "react-native";
import { LinearGradient, Segment } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import Sidemenu from "react-native-side-menu";
import MultiSelect from "../../MiniComponents/MultiSelect/MultiSelect";
import SelectRegions from "../../MiniComponents/SelectRegions";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
//Icons
import Address from "../../../assets/SVGs/MenuIcons/AddressIcon";
import DownButton from "../../../assets/SVGs/DownButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import globalStyles from "../../../Global Styles";

//Data
// import Areas from "./regions";
import countries from "./Countries";
import Areas from "./Areas";
//Redux
import * as actionCreators from "../../../store/actions/";
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

class AddressForm extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      address: {
        country: "",
        area: "",
        block: "",
        street: "",
        building: "",
        office: "",
        avenue: ""
      },
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
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  componentDidMount() {
    Segment.screen("Address Form Screen");
  }
  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };
  onSelectedItemsChange = async selectedItem => {
    let replace = this.state.address;
    if (selectedItem) {
      replace.country = selectedItem.label;
      replace.area = "";
      console.log(Areas[0].country_code);
      let area = Areas.find(
        c => c.country_code.toLowerCase() === selectedItem.value
      );
      await this.setState({
        address: replace,
        country_code: selectedItem.value,
        areas: area.cities,
        filteredRegions: area.cities,
        countryError: ""
      });
      // this.getTotalReach();
    }
  };

  onSelectedRegionChange = async selectedItem => {
    let replace = this.state.address;
    if (selectedItem) {
      replace.area = selectedItem.name;
      await this.setState({
        address: replace,
        region_id: [selectedItem.id],
        areaError: ""
      });
      // this.getTotalReach();
    }
  };
  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };
  _handleSubmission = () => {
    const countryError = validateWrapper(
      "mandatory",
      this.state.address.country
    );
    const areaError = validateWrapper("mandatory", this.state.address.area);
    const blockError = validateWrapper("mandatory", this.state.address.block);
    const streetError = validateWrapper("mandatory", this.state.address.street);
    const buildingError = validateWrapper(
      "mandatory",
      this.state.address.building
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
      console.log("here");

      this.props.addressForm(
        this.state.address,

        this.props.navigation
      );
    }
  };
  filterRegions = value => {
    this.setState({ filteredRegions: value });
  };
  render() {
    let menu;
    switch (this.state.sidemenu) {
      case "countries": {
        menu = (
          <MultiSelect
            countries={countries}
            country_code={this.state.country_code}
            onSelectedItemsChange={this.onSelectedItemsChange}
            _handleSideMenuState={this._handleSideMenuState}
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
            _handleSideMenuState={this._handleSideMenuState}
            regions={this.state.areas}
            region_id={this.state.region_id}
            filterRegions={this.filterRegions}
            addressForm={true}
          />
        );
        break;
      }
    }
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        {!this.state.sidemenustate && (
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={globalStyles.backButton}
            >
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.title}>Billing Address</Text>
            <Address
              style={{
                alignSelf: "center"
              }}
              width={85}
              height={85}
            />
          </>
        )}
        <Sidemenu
          onChange={isOpen => {
            if (isOpen === false) this._handleSideMenuState(isOpen);
          }}
          disableGestures={true}
          menu={this.state.sidemenustate && menu}
          menuPosition="right"
          openMenuOffset={wp("85%")}
          isOpen={this.state.sidemenustate}
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
                            {this.state.address.country === ""
                              ? "Country*"
                              : this.state.address.country}
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
                          {this.state.address.area === ""
                            ? "Area*"
                            : this.state.address.area}
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
                          onChangeText={block =>
                            this.setState({
                              address: { ...this.state.address, block }
                            })
                          }
                          onFocus={() => {
                            this.setState({ inputBL: true });
                          }}
                          onBlur={() => {
                            this.setState({
                              inputBL: false,
                              blockError: validateWrapper(
                                "mandatory",
                                this.state.address.block
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
                          onChangeText={building =>
                            this.setState({
                              address: { ...this.state.address, building }
                            })
                          }
                          onFocus={() => {
                            this.setState({ inputB: true });
                          }}
                          onBlur={() => {
                            this.setState({
                              inputB: false,
                              buildingError: validateWrapper(
                                "mandatory",
                                this.state.address.building
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
                        multiline={true}
                        maxLength={100}
                        style={styles.inputtext}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={street =>
                          this.setState({
                            address: { ...this.state.address, street }
                          })
                        }
                        onFocus={() => {
                          this.setState({ inputS: true });
                        }}
                        onBlur={() => {
                          this.setState({
                            inputS: false,
                            streetError: validateWrapper(
                              "mandatory",
                              this.state.address.street
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
                          multiline={true}
                          maxLength={100}
                          style={styles.inputtext}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={office =>
                            this.setState({
                              address: { ...this.state.address, office }
                            })
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
                          multiline={true}
                          maxLength={100}
                          style={styles.inputtext}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={avenue =>
                            this.setState({
                              address: { ...this.state.address, avenue }
                            })
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
                      style={styles.button}
                    >
                      <CheckmarkIcon />
                    </TouchableOpacity>
                  </View>
                )}
              </KeyboardShift>
            </TouchableWithoutFeedback>
          </View>
        </Sidemenu>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  addressForm: (address, navigation) =>
    dispatch(actionCreators.addressForm(address, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm);
