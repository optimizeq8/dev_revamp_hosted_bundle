//Components
import React, { Component } from "react";
import {
  View,
  Slider,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import Modal from "react-native-modal";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import cloneDeep from "clone-deep";
import { LinearGradient, Segment } from "expo";
import Sidemenu from "react-native-side-menu";
import DateField from "../../../MiniComponents/DatePicker/DateFields";
import ReachBar from "./ReachBar";
import SelectRegions from "../../../MiniComponents/SelectRegions";
import SelectLanguages from "../../../MiniComponents/SelectLanguages";
import GenderOptions from "../../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../../MiniComponents/AgeOptions/AgeOption";
import dateFormat from "dateformat";
import MultiSelectSections from "../../../MiniComponents/MultiSelect/MultiSelect";
import deepmerge from "deepmerge";
import BackButton from "../../../MiniComponents/BackButton";
//Data
import country_regions from "./regions";
import countries from "./countries";
import OSType from "./OSType";
import { gender, languages } from "./demograph";

//Icnos
import GreenCheckmarkIcon from "../../../../assets/SVGs/GreenCheckmark.svg";
import LocationIcon from "../../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../../assets/SVGs/Interests.svg";
import GenderIcon from "../../../../assets/SVGs/Gender.svg";
import PlusCircleIcon from "../../../../assets/SVGs/PlusCircle.svg";
import AgeIcon from "../../../../assets/SVGs/AdDetails/AgeIcon";
import OperatingSystemIcon from "../../../../assets/SVGs/AdDetails/OperatingSystem";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../../Global Styles";
import { colors } from "../../../GradiantColors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

//Redux Axios
import Axios from "axios";
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Validators
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import SelectOS from "../../../MiniComponents/SelectOS";
import { validate } from "validate.js";
import { showMessage } from "react-native-flash-message";

class AdDetails extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        campaign_id: "",
        lifetime_budget_micro: 50,
        targeting: {
          demographics: [
            {
              gender: "",
              languages: ["en", "ar"],
              min_age: 13,
              max_age: 35
            }
          ],
          interests: [{ category_id: [] }],
          devices: [
            {
              marketing_name: [],
              os_type: "",
              os_version_min: "",
              os_version_max: ""
            }
          ],
          geos: [{ country_code: "kw", region_id: [] }]
        },
        start_time: "",
        end_time: ""
      },
      filteredRegions: country_regions[0].regions,
      filteredLanguages: [
        { value: "ar", label: "Arabic" },
        { value: "en", label: "English" }
      ],
      sidemenustate: false,
      sidemenu: "gender",
      regions: country_regions[0].regions,
      budget: 50,
      minValueBudget: 25,
      maxValueBudget: 1500,
      interestNames: [],
      modalVisible: false,
      totalReach: 0,
      selectionOption: ""
    };
  }

  async componentDidMount() {
    Segment.screen("Select Ad Details Screen");

    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.editCampaign
    ) {
      const emptyTarget = value => (Array.isArray(value) ? [] : {});
      const clone = (value, options) =>
        deepmerge(emptyTarget(value), value, options);
      function combineMerge(target, source, options) {
        const destination = target.slice();

        source.forEach(function(e, i) {
          if (typeof destination[i] === "undefined") {
            const cloneRequested = options.clone !== false;
            const shouldClone = cloneRequested && options.isMergeableObject(e);
            destination[i] = shouldClone ? clone(e, options) : e;
          } else if (options.isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, options);
          } else if (target.indexOf(e) === -1) {
            destination.push(e);
          }
        });
        return destination;
      }

      let editedCampaign = deepmerge(
        this.state.campaignInfo,
        this.props.navigation.state.params.campaign,
        { arrayMerge: combineMerge }
      );
      editedCampaign.targeting.demographics[0].max_age = parseInt(
        editedCampaign.targeting.demographics[0].max_age
      );

      await this.setState({
        campaignInfo: editedCampaign
      });
    } else {
      await this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          campaign_id: this.props.campaign_id
        }
      });
      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.appChoice
      ) {
        let navAppChoice = this.props.navigation.state.params.appChoice;
        let rep = this.state.campaignInfo;
        rep.targeting.devices[0].os_type = navAppChoice;
        await this.setState({
          campaignInfo: rep
        });
      }
      this._calcReach();
    }
  }

  _handleMaxAge = value => {
    let rep = this.state.campaignInfo;
    rep.targeting.demographics[0].max_age = parseInt(value);
    this.setState({
      campaignInfo: rep
    });
  };

  _handleMinAge = value => {
    let rep = this.state.campaignInfo;
    rep.targeting.demographics[0].min_age = value;
    this.setState({
      campaignInfo: rep
    });
  };
  onSelectedItemsChange = async selectedItems => {
    let replace = this.state.campaignInfo;
    let newCountry = selectedItems;

    if (typeof newCountry !== "undefined") {
      replace.targeting.geos[0].country_code = newCountry;
      replace.targeting.geos[0].region_id = [];
      let reg = country_regions.find(
        c => c.country_code === replace.targeting.geos[0].country_code
      );
      await this.setState({
        campaignInfo: replace,
        regions: reg.regions,
        filteredRegions: reg.regions
      });
      // this.getTotalReach();
    }
  };
  getMinimumCash = days => {
    let minValueBudget = days !== 0 ? 25 * days : 25;
    this.onSelectedBudgetChange(minValueBudget);
    this.setState({
      minValueBudget
    });
  };
  handleStartDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        start_time: date
      }
    });
  };
  handleEndDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date
      }
    });
  };
  onSelectedInterestsChange = selectedItems => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.interests[0].category_id = selectedItems;
    this.setState({ campaignInfo: replace });
  };

  onSelectedDevicesChange = selectedItems => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.devices[0].marketing_name = selectedItems;
    this.setState({ campaignInfo: replace });
  };
  onSelectedInterestsNamesChange = selectedItems => {
    this.setState({ interestNames: selectedItems });
  };

  onSelectedLangsChange = selectedItem => {
    let replace = this.state.campaignInfo;
    if (
      replace.targeting.demographics[0].languages.find(r => r === selectedItem)
    ) {
      replace.targeting.demographics[0].languages = replace.targeting.demographics[0].languages.filter(
        r => r !== selectedItem
      );
    } else {
      replace.targeting.demographics[0].languages.push(selectedItem);
    }

    this.setState({
      campaignInfo: replace,
      languagesError:
        this.state.campaignInfo.targeting.demographics[0].languages.length === 0
          ? "Please choose a language."
          : null
    });
  };

  onSelectedOSChange = selectedItem => {
    let replace = this.state.campaignInfo;
    replace.targeting.devices[0].os_type = selectedItem;
    this.setState({ campaignInfo: { ...replace } });
  };

  onSelectedVersionsChange = selectedItem => {
    let replace = this.state.campaignInfo;
    replace.targeting.devices[0].os_version_min = selectedItem[0];
    replace.targeting.devices[0].os_version_max = selectedItem[1];
    this.setState({ campaignInfo: { ...replace } });
  };
  onSelectedBudgetChange = budget => {
    let replace = this.state.campaignInfo;
    replace.lifetime_budget_micro = budget;
    this.setState({
      campaignInfo: replace
    });
  };

  onSelectedRegionChange = selectedItem => {
    let replace = this.state.campaignInfo;
    if (replace.targeting.geos[0].region_id.find(r => r === selectedItem)) {
      replace.targeting.geos[0].region_id = replace.targeting.geos[0].region_id.filter(
        r => r !== selectedItem
      );
    } else {
      replace.targeting.geos[0].region_id.push(selectedItem);
    }
    this.setState({ campaignInfo: replace });
  };

  _handleBudget = value => {
    if (
      !validateWrapper("Budget", value) &&
      value > this.state.minValueBudget
    ) {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: value !== "" ? parseFloat(value) : 0
        }
      });
      return true;
    } else {
      showMessage({
        message: validateWrapper("Budget", value)
          ? validateWrapper("Budget", value)
          : "Budget can't be less than the minimum",
        type: "warning",
        position: "top"
      });
      this.setState({
        value
      });
      return false;
    }
  };

  _handleSubmission = () => {
    const languagesError =
      this.state.campaignInfo.targeting.demographics[0].languages.length === 0
        ? "Please choose a language."
        : null;
    let dateErrors = this.dateField.getErrors();

    this.setState({
      languagesError,
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError
    });
    if (
      this._handleBudget(this.state.value) &&
      !languagesError &&
      !dateErrors.end_timeError &&
      !dateErrors.start_timeError
    ) {
      let rep = cloneDeep(this.state.campaignInfo);
      if (rep.targeting.demographics[0].gender === "") {
        delete rep.targeting.demographics[0].gender;
      }
      if (
        rep.targeting.geos[0].hasOwnProperty("region_id") &&
        rep.targeting.geos[0].region_id.length === 0
      ) {
        delete rep.targeting.geos[0].region_id;
      }
      if (
        rep.targeting.hasOwnProperty("interests") &&
        rep.targeting.interests[0].category_id.length === 0
      ) {
        delete rep.targeting.interests;
      }
      if (rep.targeting.demographics[0].max_age >= 35) {
        rep.targeting.demographics[0].max_age = "35+";
      }
      rep.targeting = JSON.stringify(rep.targeting);

      if (
        this.props.navigation.state.params &&
        this.props.navigation.state.params.editCampaign
      ) {
        this.props.updateCampaign(
          rep,
          this.props.mainBusiness.businessid,
          this.props.navigation
        );
      } else {
        this.props.ad_details(
          rep,
          this.state.interestNames,
          this.props.navigation
        );
      }
    }
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  onSelectedGenderChange = gender => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographics[0].gender = gender;
    this.setState({ campaignInfo: { ...replace } });
  };

  filterRegions = value => {
    this.setState({ filteredRegions: value });
  };

  filterLanguages = value => {
    this.setState({ filteredLanguages: value });
  };

  _calcReach = async () => {
    let r = cloneDeep(this.state.campaignInfo.targeting);
    if (r.demographics[0].gender === "") {
      delete r.demographics[0].gender;
    }
    if (r.devices[0].os_type === "") {
      delete r.devices[0].os_type;
    }
    if (
      r.geos[0].hasOwnProperty("region_id") &&
      r.geos[0].region_id.length === 0
    ) {
      delete r.geos[0].region_id;
    }
    if (r.demographics[0].max_age >= 35) {
      r.demographics[0].max_age = "35+";
    }
    if (
      r.hasOwnProperty("interests") &&
      r.interests[0].category_id.length === 0
    ) {
      delete r.interests;
    }
    const obj = {
      targeting: JSON.stringify(r),
      ad_account_id: this.props.mainBusiness.snap_ad_account_id
    };

    let totalReach = {
      demographics: [
        {
          languages: ["en", "ar"],
          min_age: 13,
          max_age: "35+"
        }
      ],
      geos: [
        {
          country_code: this.state.campaignInfo.targeting.geos[0].country_code
        }
      ]
    };
    const obj2 = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: this.props.mainBusiness.snap_ad_account_id
    };
    await this.props.snap_ad_audience_size(obj, obj2);
  };

  render() {
    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <GenderOptions
            campaignInfo={this.state.campaignInfo}
            onSelectedGenderChange={this.onSelectedGenderChange}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "age": {
        menu = (
          <AgeOption
            state={this.state}
            _handleMaxAge={this._handleMaxAge}
            _handleMinAge={this._handleMinAge}
            _handleSideMenuState={this._handleSideMenuState}
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
            regions={this.state.regions}
            region_id={this.state.campaignInfo.targeting.geos[0].region_id}
            filterRegions={this.filterRegions}
          />
        );

        break;
      }
      case "languages": {
        menu = (
          <SelectLanguages
            filteredLanguages={this.state.filteredLanguages}
            onSelectedLangsChange={this.onSelectedLangsChange}
            _handleSideMenuState={this._handleSideMenuState}
            languages={languages}
            demographics={this.state.campaignInfo.targeting.demographics}
            filterLanguages={this.filterLanguages}
          />
        );

        break;
      }
      case "OS": {
        menu = (
          <SelectOS
            campaignInfo={this.state.campaignInfo}
            onSelectedOSChange={this.onSelectedOSChange}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "selectors": {
        menu = (
          <MultiSelectSections
            countries={countries}
            country_code={
              this.state.campaignInfo.targeting.geos[0].country_code
            }
            onSelectedItemsChange={this.onSelectedItemsChange}
            country_codes={
              this.state.campaignInfo.targeting.geos[0].country_code
            }
            _handleSideMenuState={this._handleSideMenuState}
            onSelectedInterestsChange={this.onSelectedInterestsChange}
            onSelectedInterestsNamesChange={this.onSelectedInterestsNamesChange}
            selectedItems={
              this.state.campaignInfo.targeting.interests[0].category_id
            }
            selectedDevices={
              this.state.campaignInfo.targeting.devices[0].marketing_name
            }
            onSelectedDevicesChange={this.onSelectedDevicesChange}
            selectedMinVersions={
              this.state.campaignInfo.targeting.devices[0].os_version_min
            }
            selectedMaxVersions={
              this.state.campaignInfo.targeting.devices[0].os_version_max
            }
            onSelectedVersionsChange={this.onSelectedVersionsChange}
            OSType={this.state.campaignInfo.targeting.devices[0].os_type}
            option={this.state.selectionOption}
          />
        );
        break;
      }
    }

    let regions_names = [];
    this.state.regions.forEach(r => {
      if (
        this.state.campaignInfo.targeting.geos[0].region_id &&
        this.state.campaignInfo.targeting.geos[0].region_id.find(
          i => i === r.id
        )
      ) {
        regions_names.push(r.name);
      }
    });
    regions_names = regions_names.join(", ");

    let languages_names = [];
    languages.forEach(r => {
      if (
        this.state.campaignInfo.targeting.demographics[0].languages.find(
          i => i === r.value
        )
      ) {
        languages_names.push(r.label);
      }
    });
    languages_names = languages_names.join(", ");

    let interests_names = [];
    this.state.interestNames.forEach(r => {
      interests_names.push(r.name);
    });
    interests_names = interests_names.join(", ");

    let end_time = "";
    let start_time = "";
    let end_year = "";
    let start_year = "";
    if (
      this.state.campaignInfo.start_time !== "" &&
      this.state.campaignInfo.end_time !== ""
    ) {
      end_time = new Date(this.state.campaignInfo.end_time.split("T")[0]);
      start_time = new Date(this.state.campaignInfo.start_time.split("T")[0]);
      end_year = end_time.getFullYear();
      start_year = start_time.getFullYear();
      end_time = dateFormat(end_time, "d mmm");
      start_time = dateFormat(start_time, "d mmm");
    }

    return (
      <>
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <Sidemenu
            onChange={isOpen => {
              if (isOpen === false) {
                this._handleSideMenuState(isOpen);
                this._calcReach();
              }
            }}
            disableGestures={true}
            menu={menu}
            menuPosition="right"
            openMenuOffset={wp("85%")}
            isOpen={this.state.sidemenustate}
          >
            <View
              style={[
                styles.mainCard,
                {
                  margin: 0,
                  marginTop: 10,
                  flex: 1
                }
              ]}
            >
              <ImageBackground
                imageStyle={{ opacity: 0.4 }}
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: this.props.navigation.state.params
                    ? this.props.navigation.state.params.image
                    : "www.go.com"
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ height: hp(7) }}>
                    <BackButton navigation={this.props.navigation.goBack} />

                    <Text style={styles.headline}>
                      Input your Snapchat {"\n"} AD Details
                    </Text>
                  </View>
                  <Text style={[styles.subHeadings, { top: hp(1) }]}>
                    Budget
                  </Text>
                  <Icon
                    type="MaterialIcons"
                    name="edit"
                    style={[styles.editIcon]}
                  />
                  <View style={{ height: hp(6) }}>
                    <Input
                      keyboardType="numeric"
                      defaultValue={
                        this.state.campaignInfo.lifetime_budget_micro + ""
                      }
                      onChangeText={value => this._handleBudget(value)}
                      style={styles.colorYellow}
                    />
                  </View>
                  <View
                    style={[
                      styles.slidercontainer,
                      { alignSelf: "center", paddingTop: 0 }
                    ]}
                  >
                    <View style={styles.textCon}>
                      <Text style={styles.colorGrey}>
                        {this.state.minValueBudget}
                      </Text>
                      <View
                        style={{
                          left: wp(4),
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={[
                            styles.colorGrey,
                            {
                              fontSize: 11,
                              bottom: hp(1.2)
                            }
                          ]}
                        >
                          Tap to enter manually
                        </Text>
                        <Text
                          style={[
                            styles.colorGrey,
                            {
                              fontSize: 11
                            }
                          ]}
                        >
                          {"         "}25$/day
                        </Text>
                      </View>
                      <Text style={styles.colorGrey}>
                        {this.state.maxValueBudget} $
                      </Text>
                    </View>

                    <Slider
                      disabled={
                        this.props.navigation.state.params &&
                        this.props.navigation.state.params.editCampaign
                      }
                      style={{ width: 300, height: hp(2) }}
                      step={10}
                      minimumValue={this.state.minValueBudget}
                      maximumValue={this.state.maxValueBudget}
                      value={
                        this.state.campaignInfo.lifetime_budget_micro <
                        90000000000000000000
                          ? this.state.campaignInfo.lifetime_budget_micro
                          : 1500
                      }
                      onValueChange={val => this.onSelectedBudgetChange(val)}
                      thumbTintColor="rgb(252, 228, 149)"
                      maximumTrackTintColor="#fff"
                      minimumTrackTintColor="#751AFF"
                    />
                  </View>
                  <Text style={[styles.subHeadings]}>Duration</Text>

                  <TouchableHighlight
                    underlayColor="rgba(0,0,0,0.2)"
                    style={[
                      styles.dateInput,
                      {
                        borderColor: this.state.start_timeError
                          ? "red"
                          : "#D9D9D9"
                      }
                    ]}
                    onPress={() => {
                      if (
                        this.props.navigation.state.params &&
                        !this.props.navigation.state.params.hasOwnProperty(
                          "editCampaign"
                        )
                      )
                        this.dateField.showModal();
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          textAlign: "center"
                        }}
                      >
                        <Text style={[styles.categories, { fontSize: 16 }]}>
                          Start
                        </Text>
                        {this.state.campaignInfo.start_time !== "" && (
                          <Text style={styles.numbers}>
                            {start_time}
                            {"\n"}
                            <Text style={[styles.numbers, { fontSize: 12 }]}>
                              {start_year}
                            </Text>
                          </Text>
                        )}
                      </View>

                      <Text style={[styles.categories, { fontSize: 16 }]}>
                        To
                      </Text>

                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text style={[styles.categories, { fontSize: 16 }]}>
                          End
                        </Text>

                        {this.state.campaignInfo.end_time !== "" && (
                          <Text style={styles.numbers}>
                            {end_time}
                            {"\n"}
                            <Text style={[styles.numbers, { fontSize: 12 }]}>
                              {end_year}
                            </Text>
                          </Text>
                        )}
                      </View>
                    </View>
                  </TouchableHighlight>
                  <Text style={styles.subHeadings}>
                    Who would you like to reach?
                  </Text>

                  <View
                    style={{
                      felx: 1,
                      flexDirection: "column"
                    }}
                  >
                    <ScrollView
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        marginHorizontal: 20,
                        borderRadius: 15,
                        paddingHorizontal: 25,
                        marginBottom: 5,
                        height: hp("25%")
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          paddingVertical: 20
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("gender");
                          }}
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "center",
                            justifyContent: "space-between",
                            marginVertical: 5
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <GenderIcon width={25} height={25} />

                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Gender</Text>
                              <Text style={styles.menudetails}>
                                {
                                  gender.find(r => {
                                    if (
                                      r.value ===
                                      this.state.campaignInfo.targeting
                                        .demographics[0].gender
                                    )
                                      return r;
                                  }).label
                                }
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "column" }}>
                            {this.state.campaignInfo.targeting.demographics[0]
                              .gender === "" ||
                            this.state.campaignInfo.targeting.demographics[0]
                              .gender ? (
                              <GreenCheckmarkIcon width={25} height={25} />
                            ) : (
                              <PlusCircleIcon width={25} height={25} />
                            )}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("age");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <AgeIcon
                              fill={globalColors.orange}
                              width={25}
                              height={25}
                            />
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Age</Text>
                              <Text style={styles.menudetails}>
                                {
                                  this.state.campaignInfo.targeting
                                    .demographics[0].min_age
                                }{" "}
                                -{" "}
                                {this.state.campaignInfo.targeting
                                  .demographics[0].max_age === 35
                                  ? "35+"
                                  : this.state.campaignInfo.targeting
                                      .demographics[0].max_age}
                              </Text>
                            </View>
                          </View>

                          {this.state.campaignInfo.targeting.demographics[0]
                            .max_age ? (
                            <GreenCheckmarkIcon width={25} height={25} />
                          ) : (
                            <PlusCircleIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("selectors", "countries");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <LocationIcon width={25} height={25} />

                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Country</Text>
                              <Text style={styles.menudetails}>
                                {
                                  countries.find(c => {
                                    if (
                                      c.value ===
                                      this.state.campaignInfo.targeting.geos[0]
                                        .country_code
                                    )
                                      return c;
                                  }).label
                                }
                              </Text>
                            </View>
                          </View>
                          {this.state.campaignInfo.targeting.geos[0]
                            .country_code ? (
                            <GreenCheckmarkIcon width={25} height={25} />
                          ) : (
                            <PlusCircleIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("regions");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <LocationIcon width={25} height={25} />
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Regions</Text>
                              <Text style={styles.menudetails}>
                                {regions_names}
                              </Text>
                            </View>
                          </View>
                          {this.state.campaignInfo.targeting.geos[0].region_id
                            .length !== 0 ? (
                            <GreenCheckmarkIcon width={25} height={25} />
                          ) : (
                            <PlusCircleIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("languages");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <Icon
                              name="language"
                              type="MaterialIcons"
                              width={25}
                              height={25}
                              style={{
                                color: globalColors.orange,
                                right: 3
                              }}
                            />
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Language</Text>
                              <Text style={styles.menudetails}>
                                {languages_names}
                              </Text>
                            </View>
                          </View>

                          {this.state.campaignInfo.targeting.demographics[0]
                            .languages.length !== 0 ? (
                            <GreenCheckmarkIcon width={25} height={25} />
                          ) : (
                            <PlusCircleIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("selectors", "interests");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <InterestsIcon width={25} height={25} />
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Interests</Text>
                              <Text style={styles.menudetails}>
                                {interests_names}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "column" }}>
                            {this.state.campaignInfo.targeting.interests[0]
                              .category_id.length !== 0 ? (
                              <GreenCheckmarkIcon width={25} height={25} />
                            ) : (
                              <PlusCircleIcon width={25} height={25} />
                            )}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("OS");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <OperatingSystemIcon
                              width={25}
                              height={25}
                              fill={globalColors.orange}
                            />
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>
                                Operating System
                              </Text>
                              <Text style={styles.menudetails}>
                                {
                                  OSType.find(r => {
                                    if (
                                      r.value ===
                                      this.state.campaignInfo.targeting
                                        .devices[0].os_type
                                    )
                                      return r;
                                  }).label
                                }
                              </Text>
                            </View>
                          </View>

                          {this.state.campaignInfo.targeting.devices[0]
                            .os_type === "" ||
                          this.state.campaignInfo.targeting.devices[0]
                            .os_type ? (
                            <GreenCheckmarkIcon width={25} height={25} />
                          ) : (
                            <PlusCircleIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>
                        {this.state.campaignInfo.targeting.devices[0]
                          .os_type !== "" && (
                          <TouchableOpacity
                            onPress={() => {
                              this._renderSideMenu(
                                "selectors",
                                "deviceVersions"
                              );
                            }}
                            style={{
                              flexDirection: "row",
                              marginVertical: 5,
                              justifyContent: "space-between"
                            }}
                          >
                            <View
                              style={{ flexDirection: "row", width: "80%" }}
                            >
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
                              <View style={{ flexDirection: "column" }}>
                                <Text style={styles.menutext}>OS Versions</Text>
                                <Text style={styles.menudetails}>
                                  {this.state.campaignInfo.targeting.devices[0]
                                    .os_version_min +
                                    ", " +
                                    this.state.campaignInfo.targeting.devices[0]
                                      .os_version_max}
                                </Text>
                              </View>
                            </View>

                            {this.state.campaignInfo.targeting.devices[0]
                              .marketing_name.length !== 0 ? (
                              <GreenCheckmarkIcon width={25} height={25} />
                            ) : (
                              <PlusCircleIcon width={25} height={25} />
                            )}
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() => {
                            this._renderSideMenu("selectors", "deviceBrands");
                          }}
                          style={{
                            flexDirection: "row",
                            marginVertical: 5,
                            justifyContent: "space-between"
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <Icon
                              name="cellphone-settings"
                              type="MaterialCommunityIcons"
                              width={25}
                              height={25}
                              style={{
                                color: globalColors.orange,
                                right: 2
                              }}
                            />
                            <View style={{ flexDirection: "column" }}>
                              <Text style={styles.menutext}>Device Make</Text>
                              <Text style={styles.menudetails}>
                                {
                                  this.state.campaignInfo.targeting.devices[0]
                                    .marketing_name
                                }
                              </Text>
                            </View>
                          </View>

                          {this.state.campaignInfo.targeting.devices[0]
                            .marketing_name.length !== 0 ? (
                            <GreenCheckmarkIcon width={25} height={25} />
                          ) : (
                            <PlusCircleIcon width={25} height={25} />
                          )}
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                    <ReachBar
                      _handleSubmission={this._handleSubmission}
                      country_code={
                        this.state.campaignInfo.targeting.geos[0].country_code
                      }
                      targeting={this.state.campaignInfo.targeting}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Sidemenu>
        </Container>
        <Modal isVisible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal>
        <DateField
          getMinimumCash={this.getMinimumCash}
          onRef={ref => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.campaignInfo.start_time}
          end_time={this.state.campaignInfo.end_time}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  data: state.campaignC.data,
  average_reach: state.campaignC.average_reach,
  loading: state.campaignC.loading,
  mainBusiness: state.auth.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  ad_details: (info, interestNames, navigation) =>
    dispatch(actionCreators.ad_details(info, interestNames, navigation)),
  updateCampaign: (info, businessid, navigation) =>
    dispatch(actionCreators.updateCampaign(info, businessid, navigation)),

  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDetails);
