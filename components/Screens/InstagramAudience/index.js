import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  I18nManager,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import MaskedView from "@react-native-community/masked-view";
import cloneDeep from "lodash/cloneDeep";
import analytics from "@segment/analytics-react-native";
import find from "lodash/find";

//icons
import PurpleCheckmarkIcon from "../../../assets/SVGs/PurpleCheckmark";
import LocationIcon from "../../../assets/SVGs/Location";
import InterestsIcon from "../../../assets/SVGs/Interests";
import GenderIcon from "../../../assets/SVGs/Gender";
import PurplePlusIcon from "../../../assets/SVGs/PurplePlusIcon";
import AgeIcon from "../../../assets/SVGs/AdDetails/AgeIcon";
import OperatingSystemIcon from "../../../assets/SVGs/AdDetails/OperatingSystem";
import LanguageIcon from "../../../assets/SVGs/Language";
import DeviceMakeIcon from "../../../assets/SVGs/DeviceMake";

import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Sidemenu from "../../MiniComponents/SideMenu";
import SelectRegions from "../../MiniComponents/SelectRegionsInstagram";
import SelectLanguages from "../../MiniComponents/SelectLanguages";
import GenderOptions from "../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../MiniComponents/AgeOptions/AgeOption";
import MultiSelectSections from "../../MiniComponents/MultiSelectInstagram/MultiSelect";
import SelectOS from "../../MiniComponents/SelectOS";
import Header from "../../MiniComponents/Header";
import SnapchatLocation from "../../MiniComponents/SnapchatLocation";
import InputField from "../../MiniComponents/InputFieldNew";
let LocationMap = null;

// REDUX
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// DATA
import countries, {
  gender as genders,
  OSType,
  country_regions,
  allRegions,
} from "../InstagramCampaignCreate/Feed/AdTargetting/data";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

export class InstagramAudience extends Component {
  constructor(props) {
    super(props);
    this.state = state = {
      scrollY: 1,
      advance: true,
      audienceName: "",
      audienceNameError: "",
      countryName: "",
      regions: [],
      interestNames: [],
      filteredRegions: [],
      regionNames: [],
      showRegions: false,
      locationsInfo: [],
      filteredLanguages: this.props.languages,
      expandLocation: false,
      expandDemographics: false,
      expandDevices: false,
      selectedGender: "",
      selectedCountriesAndRegions: [],
      filteredRegions: [],
      customInterests: [],
      locationsInfo: [],
    };
    this.editAudience = this.props.navigation.getParam("editAudience", false);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.audienceDetailLoading !== this.props.audienceDetailLoading &&
      this.props.audience.targeting.geo_locations.countries &&
      this.props.audience.targeting.geo_locations.countries.length !== 0
    ) {
      let showRegions = false;
      let countryRegions = this.props.audience.targeting.geo_locations.countries.map(
        (cou) => {
          let foundCountryReg = find(
            country_regions,
            (country) => country.key === cou.value
          );
          //   showRegions = foundCountryReg.regions.length > 3;

          return foundCountryReg;
        }
      );

      let locationsInfo = [];
      let markers = [];
      if (this.props.audience.coordinates) {
        locationsInfo = cloneDeep(JSON.parse(this.props.audience.coordinates));
        markers = cloneDeep(
          this.props.audience.targeting.geo_locations.customLocations
        );
      }

      this.setState({
        regions: countryRegions ? countryRegions : [],
        filteredRegions: countryRegions ? countryRegions : [],
        // showRegions: showRegions,
        locationsInfo,
        markers,
      });
    }
  }
  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    let rep = cloneDeep(this.props.audience);
    const audienceNameError =
      this.props.audience.name.length === 0
        ? "Please enter name for your audience"
        : null;
    const countryRegionError =
      rep.targeting.geo_locations.countries.length === 0 &&
      rep.targeting.geo_locations.regions.length === 0;
    if (audienceNameError) {
      showMessage({
        message: translate(audienceNameError),
        type: "warning",
        position: "top",
      });
    } else if (countryRegionError) {
      showMessage({
        message: translate("Please choose a country"),
        type: "warning",
        position: "top",
      });
    }
    // segment track for error on final submit
    if (countryRegionError || audienceNameError) {
      analytics.track(`a_error_form`, {
        error_page: "audience_targeting",
        source_action: "a_save_audience_targeting",
        timestamp: new Date().getTime(),
        // campaign_channel: "snapchat",
        // campaign_ad_type: this.props.adType,
        error_description: countryRegionError || audienceNameError,
      });
    }
    if (!audienceNameError && !countryRegionError) {
      if (rep.targeting.geo_locations.custom_locations.length > 0) {
        rep.targeting.geo_locations.custom_locations = this.props.customLocations;
      } else {
        delete rep.targeting.geo_locations.custom_locations;
      }

      if (this.editAudience) {
        this.props.updateAudience(
          rep.id,
          rep.name,
          rep.targeting,
          this.state.locationsInfo,
          this.state.customInterests,
          this.props.customLocations
        );
      } else {
        rep.targeting = JSON.stringify(rep.targeting);
        this.props.createAudience(
          rep,
          this.props.navigation.getParam(
            "audience_type",
            "InstagramFeedAdTargetting"
          ),
          this.state.locationsInfo,
          this.state.customInterests,
          this.props.customLocations
        );
      }
    }
  };

  handleFading = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    this.setState({ scrollY: y > 10 ? y / 10 : 1 });
  };
  callFunction = (selector, option) => {
    this._renderSideMenu(selector, option);
  };

  _handleAge = (values) => {
    let rep = cloneDeep(this.props.audience);
    rep.targeting.age_min = parseInt(values[0]);
    rep.targeting.age_max = parseInt(values[1]);
    analytics.track(`a_audience_age`, {
      source: "audience_detail",
      source_action: "a_audience_age",
      audience_max_age: parseInt(values[0]),
      audience_min_age: parseInt(values[1]),
    });
    this.props.setAudienceDetail({ ...rep });
  };

  onSelectedInterestsChange = (selectedItems) => {
    // No more used, kept for PICKER component
  };

  onSelectedDevicesChange = (selectedItems) => {
    let replace = cloneDeep(this.props.audience);
    replace.targeting.user_device = selectedItems;

    analytics.track(`a_audience_devices`, {
      source: "audience_detail",
      source_action: "a_audience_devices",
      audience_devices_name:
        selectedItems.length > 0 ? selectedItems.join(", ") : "",
    });

    this.props.setAudienceDetail({
      ...replace,
    });
  };
  onSelectedInterestsNamesChange = (selectedItems, custom = false) => {
    let replace = cloneDeep(this.props.audience);
    selectedItems = selectedItems.filter((item) => item);
    let interestArray =
      selectedItems.length > 0
        ? selectedItems.map((item) => {
            return { name: item.name, id: item.id };
          })
        : [];
    if (!custom) {
      replace.targeting.flexible_spec[0].interests = interestArray;
      this.setState({ campaignInfo: replace });
    } else {
      this.setState({
        customInterests: interestArray,
      });
    }
    this.setState({
      interestNames: selectedItems,
    });

    analytics.track(`a_audience_interests`, {
      source: "audience_detail",
      source_action: "a_audience_interests",
      audience_interests_names:
        selectedItems && selectedItems.length > 0 && selectedItems.join(", "),
    });
    this.props.setAudienceDetail({
      ...replace,
      customInterests: custom ? interestArray : this.state.customInterests,
      customInterestObjects: custom
        ? selectedItems
        : this.props.audience.customInterestObjects,
    });
  };

  onSelectedLangsChange = (selectedItem) => {
    const { translate } = this.props.screenProps;
    let replace = cloneDeep(this.props.audience);
    let langs = [];
    if (
      replace.targeting.demographics[0].languages.find(
        (r) => r === selectedItem
      )
    ) {
      replace.targeting.demographics[0].languages = replace.targeting.demographics[0].languages.filter(
        (r) => r !== selectedItem
      );
      langs = replace.targeting.demographics[0].languages;
      analytics.track(`a_audience_languages`, {
        source: "audience_detail",
        source_action: "a_audience_languages",
        audience_languages: langs.join(", "),
      });
    } else {
      if (replace.targeting.geos.length > 1) {
        replace.targeting.demographics[0].languages = [selectedItem];
      } else replace.targeting.demographics[0].languages.push(selectedItem);
      langs = replace.targeting.demographics[0].languages;
      analytics.track(`a_audience_languages`, {
        source: "audience_detail",
        source_action: "a_audience_languages",
        audience_languages: langs.join(", "),
      });
    }

    if (replace.targeting.demographics[0].languages.length === 0) {
      analytics.track(`a_error_form`, {
        error_page: "audience_detail",
        source_action: "a_audience_languages",
        error_description: "Please choose a language",
      });

      showMessage({
        message: translate("Please choose a language"),
        type: "warning",
        position: "top",
      });
    }
    this.setState({
      languagesError:
        this.props.audience.targeting.demographics[0].languages.length === 0
          ? "Please choose a language."
          : null,
    });
    this.props.setAudienceDetail({ ...replace });
  };

  onSelectedOSChange = (selectedItem) => {
    let replace = cloneDeep(this.props.audience);
    replace.targeting.user_os = [selectedItem];
    replace.targeting.user_device = [];
    replace.targeting.os_version_max = "";
    replace.targeting.os_version_min = "";
    analytics.track(`a_audience_OS_type`, {
      source: "audience_detail",
      source_action: "a_audience_OS_type",
      audience_os_type: selectedItem === "" ? "ALL" : selectedItem,
      audience_os_min_ver: "",
      audience_os_max_ver: "",
    });

    this.props.setAudienceDetail({
      ...replace,
    });
  };

  onSelectedVersionsChange = (selectedItem) => {
    let replace = cloneDeep(this.props.audience);
    replace.targeting.os_version_min = selectedItem[0];
    replace.targeting.os_version_max = selectedItem[1];
    analytics.track(`a_audience_OS_version`, {
      source: "audience_detail",
      source_action: "a_audience_OS_version",
      audience_os_min_ver: selectedItem[0],
      audience_os_max_ver: selectedItem[1],
    });

    this.props.setAudienceDetail({
      ...replace,
    });
  };

  onSelectedMapChange = (
    selectedItems,
    unselect = false,
    locationsInfo = []
  ) => {
    let stateRep = cloneDeep(this.props.audience);
    if (unselect) {
      stateRep.targeting.geo_locations.custom_locations = [];
    } else stateRep.targeting.geo_locations.custom_locations = selectedItems;
    analytics.track(`a_ad_map_locations`, {
      source: "ad_targeting",
      source_action: "a_ad_map_locations",
      campaign_map_locations: selectedItems,
    });
    this.setState({
      //   campaignInfo: { ...stateRep },
      locationsInfo,
    });
    this.props.setAudienceDetail({
      ...stateRep,
    });
  };
  onSelectedRegionChange = (
    selectedItem,
    regionName,
    country_code,
    unselect = false
  ) => {
    let replace = cloneDeep(this.props.audience);
    let regionsArray = cloneDeep(replace.targeting.geo_locations.regions);

    let selectedAllRegions = selectedItem === "all";
    if (selectedItem === "all") {
      if (this.state.selectedAllRegions) {
        regionsArray = [];
        selectedAllRegions = false;
      } else {
        regionsArray = replace.targeting.geo_locations.countries.map(
          (country) =>
            allRegions.filter((cR) => {
              if (cR.country === country) return cR;
            })
        );
        regionsArray = regionsArray.flat(1);
        selectedAllRegions = true;
      }
    } else {
      let checkIfInRegionsArray = regionsArray.findIndex(
        (reg) => reg.key === selectedItem.key
      );

      if (checkIfInRegionsArray === -1) {
        regionsArray = [...regionsArray, { ...selectedItem }];
      } else {
        regionsArray.splice(checkIfInRegionsArray, 1);
      }
    }
    replace.targeting.geo_locations.regions = [...regionsArray];
    this.props.setAudienceDetail({
      ...replace,
    });
  };

  onSelectedGenderChange = (gender) => {
    let replace = cloneDeep(this.props.audience);
    // let x = "";
    // switch (gender) {
    //   case "MALE":
    //     x = "1";
    //     break;
    //   case "FEMALE":
    //     x = "2";
    //     break;
    //   default:
    //     x = "";
    //     break;
    // }
    //gender is coming in as 1,2
    replace.targeting.genders = [gender];
    analytics.track(`a_audience_gender`, {
      source: "audience_detail",
      source_action: "a_audience_gender",
      audience_gender: replace.targeting.genders,
    });

    this.props.setAudienceDetail({
      ...replace,
    });
  };

  filterRegions = (value) => {
    this.setState({ filteredRegions: value });
  };

  filterLanguages = (value) => {
    this.setState({ filteredLanguages: value });
  };

  _handleSideMenuState = (status) => {
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  setAudienceName = (stateName, value) => {
    analytics.track("a_audience_name", {
      audience_name: value,
    });
    this.props.setAudienceDetail({ name: value });
  };
  getValidAudienceName = (stateName, value) => {
    this.setState({
      audienceNameError: value,
    });
  };

  getLanguagesName = () => {
    // Map language code to actual language name
    const { translate } = this.props.screenProps;
    let languages_names = [];
    languages_names =
      this.props.audience.targeting &&
      this.props.audience.targeting.demographics &&
      this.props.audience.targeting.demographics[0].languages.length > 0 &&
      this.props.audience.targeting.demographics[0].languages.map(
        (lang_code) => {
          return (
            this.props.languages &&
            this.props.languages.length > 0 &&
            typeof this.props.languages === "object" &&
            translate(
              this.props.languages.find((lang) => lang.id == lang_code).name
            )
          );
        }
      );
    return languages_names && languages_names.length > 0
      ? languages_names.join(", ")
      : [];
  };

  getInterestNames = () => {
    // Map Interest code to actual Interest name
    const { translate } = this.props.screenProps;
    const { targeting } = this.props.audience;
    let interestNames = [];
    let interests_names = [];

    if (targeting.flexible_spec[0].interests.length > 0) {
      interests_names = targeting.flexible_spec[0].interests.map(
        (interest) => interest.name
      );
      interests_names = [
        targeting.flexible_spec[0].interests.map((interest) => interest.name),
        this.state.customInterests &&
          this.state.customInterests.map((interest) => interest.name),
      ];
    } else if (
      this.state.customInterests &&
      this.state.customInterests.length > 0
    ) {
      interests_names = [
        this.state.customInterests &&
          this.state.customInterests.map((interest) => interest.name),
      ];
    }
    interests_names = [].concat.apply([], interests_names);

    return interests_names && interests_names.length > 0
      ? interests_names.join(", ")
      : [];
  };
  getCountryNames = () => {
    // Map Country code to actual Country name
    const { translate } = this.props.screenProps;
    let countryNames = [];
    countryNames =
      this.props.audience.targeting &&
      this.props.audience.targeting.geos &&
      this.props.audience.targeting.geos.length > 0 &&
      this.props.audience.targeting.geos.map((country_code) => {
        return country_regions &&
          country_regions.length > 0 &&
          country_code.country_code !== ""
          ? country_regions.find(
              (country) => country.country_code == country_code.country_code
            )
            ? translate(
                country_regions.find(
                  (country) => country.country_code == country_code.country_code
                ).country_name
              )
            : ""
          : "";
      });
    return countryNames && countryNames.length > 0
      ? countryNames.join(", ")
      : [];
  };

  getRegionNames = () => {
    const { translate } = this.props.screenProps;

    let regionNames = [];

    this.props.audience.targeting &&
      this.props.audience.targeting.geos &&
      this.props.audience.targeting.geos.length > 0 &&
      this.props.audience.targeting.geos.map((country_code) => {
        let regionList =
          country_regions &&
          country_regions.length > 0 &&
          country_code.country_code !== ""
            ? country_regions.find(
                (country) => country.country_code == country_code.country_code
              ).regions
            : [];

        if (country_code.region_id && country_code.region_id.length > 0) {
          regionList = country_code.region_id.map((id) => {
            regionNames.push(
              translate(regionList.find((rL) => rL.id === id).name)
            );
          });
        }
      });
    return regionNames && regionNames.length > 0 ? regionNames.join(", ") : "";
  };
  goBack = () => {
    const { translate } = this.props.screenProps;
    analytics.track("go_back_warning", {
      source: "audience_detail",
      source_action: "a_go_back",
    });
    Alert.alert(
      translate("Warning"),
      translate(
        `You didn't save your changes Do you want go back without saving`
      ),
      [
        {
          text: translate("Cancel"),
          onPress: () => {
            analytics.track("a_cancel_go_back", {
              source: "audience_detail",
              source_action: "a_go_back",
            });
          },
          style: "cancel",
        },
        {
          text: translate("Yes"),
          onPress: () => {
            analytics.track("a_go_back", {
              source: "audience_detail",
              source_action: "a_go_back",
            });
            this.props.navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track("audience_detail", {
      source,
      source_action,
      new: !this.editAudience,
      audience_channel: "snapchat",
    });
  };
  expandLocation = () => {
    this.setState({
      expandLocation: !this.state.expandLocation,
    });
  };
  expandDemographics = () => {
    this.setState({
      expandDemographics: !this.state.expandDemographics,
    });
  };
  expandDevices = () => {
    this.setState({
      expandDevices: !this.state.expandDevices,
    });
  };
  selectedItemsId = (array) => {
    if (array && array.length > 0) {
      return array.map((item) => item.id || item.key);
    }
    return [];
  };
  selectedCustomItemsId = (array) => {
    if (array && array.length > 0) {
      return array.map((item) => item.id || item.key);
    }
    return [];
  };
  // For picker not to crash
  onSelectedCountryRegionChange = (item) => {
    let replace = cloneDeep(this.props.audience);

    // check if country exist in array remove it else add country and show regions for that country
    if (
      replace.targeting.geo_locations.countries &&
      replace.targeting.geo_locations.countries.length > 0
    ) {
      let countryExist = replace.targeting.geo_locations.countries.find(
        (ctry) => item === ctry
      );
      if (countryExist) {
        replace.targeting.geo_locations.countries = replace.targeting.geo_locations.countries.filter(
          (ctr) => ctr !== countryExist
        );

        // remove all regions of those countries
        replace.targeting.geo_locations.regions = replace.targeting.geo_locations.regions.filter(
          (ctr) => ctr.country !== countryExist
        );
      } else {
        replace.targeting.geo_locations.countries.push(item);
      }
    } // add the country
    else {
      replace.targeting.geo_locations.countries.push(item);
      // show all regions of that country
    }

    this.setState({
      selectedCountriesAndRegions: replace.targeting.geo_locations.countries,
    });
    this.props.setAudienceDetail({ ...replace });
  };
  onSelectedCountryRegionsObjectsChange = (items) => {};
  filterRegions = (value) => {
    this.setState({ filteredRegions: value });
  };
  render() {
    let { saveAudienceLoading = false, audience } = this.props;
    const { targeting } = audience;
    const { translate } = this.props.screenProps;
    // let languages_names = this.getLanguagesName();
    let interests_names = this.getInterestNames();
    let countries_names = [];
    countries.forEach((r) => {
      if (
        targeting.geo_locations &&
        targeting.geo_locations.countries &&
        targeting.geo_locations.countries.find((i) => i === r.value)
      ) {
        countries_names.push(translate(r.label));
      }
    });
    countries_names = countries_names.join(", ");

    let regions_names = [];

    if (targeting.geo_locations && targeting.geo_locations.regions.length > 0) {
      // GET COUNTRY then
      regions_names = targeting.geo_locations.regions.map((reg) =>
        translate(reg.name)
      );
    }
    regions_names = regions_names.join(", ");

    const { expandLocation, expandDemographics, expandDevices } = this.state;
    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <GenderOptions
            screenProps={this.props.screenProps}
            campaignInfo={this.props.audience}
            onSelectedGenderChange={this.onSelectedGenderChange}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "age": {
        menu = (
          <AgeOption
            showPlusIcon={false}
            screenProps={this.props.screenProps}
            state={this.props.audience}
            _handleAge={this._handleAge}
            _handleSideMenuState={this._handleSideMenuState}
            ageValuesRange={[18, 65]}
            minAge={targeting.age_min || 18}
            maxAge={targeting.age_max || 65}
          />
        );
        break;
      }
      case "regions": {
        menu = (
          <SelectRegions
            screenProps={this.props.screenProps}
            countryName={this.state.countryName}
            countries={targeting.geo_locations.countries}
            filteredRegions={this.state.filteredRegions}
            onSelectedRegionChange={this.onSelectedRegionChange}
            _handleSideMenuState={this._handleSideMenuState}
            regions={this.state.regions}
            region_id={targeting.geo_locations.regions}
            filterRegions={this.filterRegions}
          />
        );

        break;
      }
      case "map": {
        if (!LocationMap) {
          LocationMap = require("../../MiniComponents/LocationMap").default;
        }
        menu = (
          <SnapchatLocation
            country_code={targeting.geo_locations.countries[0]}
            screenProps={this.props.screenProps}
            _handleSideMenuState={this._handleSideMenuState}
            circles={targeting.geo_locations.custom_locations}
            locationsInfo={this.state.locationsInfo}
            onSelectedMapChange={this.onSelectedMapChange}
            save_campaign_info={this.props.setAudienceDetail}
            data={this.props.audience}
            _handleSideMenuState={this._handleSideMenuState}
            editCampaign={true}
          />
        );
        break;
      }
      case "languages": {
        menu = (
          <SelectLanguages
            screenProps={this.props.screenProps}
            filteredLanguages={this.state.filteredLanguages}
            onSelectedLangsChange={this.onSelectedLangsChange}
            _handleSideMenuState={this._handleSideMenuState}
            languages={this.props.languages}
            demographics={this.props.audience.targeting.demographics}
            filterLanguages={this.filterLanguages}
            showBackButton={true}
          />
        );

        break;
      }
      case "OS": {
        menu = (
          <SelectOS
            selectedOSType={targeting.user_os[0]}
            iosName={"iOS"}
            androidName={"Android"}
            data={OSType}
            // objective={objective}
            screenProps={this.props.screenProps}
            campaignInfo={this.props.audience}
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
            screenProps={this.props.screenProps}
            country_regions={country_regions}
            selectedItemsRegionsCountry={this.state.selectedCountriesAndRegions}
            onSelectedCountryRegionChange={this.onSelectedCountryRegionChange}
            onSelectedCountryRegionsObjectsChange={
              this.onSelectedCountryRegionsObjectsChange
            }
            _handleSideMenuState={this._handleSideMenuState}
            onSelectedInterestsChange={this.onSelectedInterestsChange}
            onSelectedInterestsNamesChange={this.onSelectedInterestsNamesChange}
            selectedItems={this.selectedItemsId(
              targeting.flexible_spec[0].interests
            )}
            selectedCustomItems={this.selectedCustomItemsId(
              this.state.customInterests
            )}
            selectedDevices={targeting.user_device}
            onSelectedDevicesChange={this.onSelectedDevicesChange}
            selectedMinVersions={targeting.os_version_min}
            selectedMaxVersions={targeting.os_version_max}
            selectedVersions={[
              targeting.os_version_min,
              targeting.os_version_max,
            ]}
            onSelectedVersionsChange={this.onSelectedVersionsChange}
            OSType={targeting.user_os[0]}
            option={this.state.selectionOption}
            editCampaign={this.editCampaign}
          />
        );
        break;
      }
    }

    if (this.props.audienceDetailLoading) {
      return (
        <View style={styles.outerView}>
          <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <Header
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            iconColor={globalColors.purple}
            title={`${this.editAudience ? "Edit" : "New"} Preset`}
            titleStyle={{ color: globalColors.purple }}
            showTopRightButton={true}
            topRightButtonText={translate("Save")}
            topRightButtonFunction={this._handleSubmission}
            disabled={saveAudienceLoading}
          />
          <ActivityIndicator size={"large"} color={globalColors.orange} />
        </View>
      );
    } else
      return (
        <View style={styles.outerView}>
          <Sidemenu
            onChange={(isOpen) => {
              if (isOpen === false) {
                this._handleSideMenuState(isOpen);
              }
            }}
            disableGestures={true}
            menu={this.state.sidemenustate && menu}
            menuPosition={I18nManager.isRTL ? "left" : "right"}
            openMenuOffset={wp(100)}
            isOpen={this.state.sidemenustate}
            menuContainerStyle={{ top: this.state.sidemenustate ? 80 : 0 }}
          >
            <NavigationEvents onDidFocus={this.onDidFocus} />
            <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
            <Header
              screenProps={this.props.screenProps}
              actionButton={this.goBack}
              iconColor={globalColors.purple}
              title={`${this.editAudience ? "Edit" : "New"} Preset`}
              titleStyle={{ color: globalColors.purple }}
              showTopRightButton={true}
              topRightButtonText={translate("Save")}
              topRightButtonFunction={this._handleSubmission}
              disabled={saveAudienceLoading || this.props.audienceDetailLoading}
            />

            <View style={styles.innerView}>
              <InputField
                translate={this.props.screenProps.translate}
                label={"Preset Name"}
                stateName1={"audienceName"}
                placeholder1={"Enter a name for your audience"}
                setValue={this.setAudienceName}
                value={this.props.audience.name}
                getValidInfo={this.getValidAudienceName}
                customStyles={{ backgroundColor: "#FFF" }}
                inputStyle={{ color: globalColors.gray }}
                placeholderColor={globalColors.gray}
                labelColor={globalColors.gray}
                incomplete={false}
              />
              <MaskedView
                maskElement={
                  <LinearGradient
                    colors={["black", "black", "transparent"]}
                    start={[0, 0]}
                    end={[0, this.state.scrollY]}
                    style={styles.maskedView}
                  />
                }
              >
                <ScrollView
                  scrollEventThrottle={100}
                  onScroll={this.handleFading}
                  ref={(ref) => (this.scrollView = ref)}
                  indicatorStyle="white"
                  contentContainerStyle={{ paddingBottom: 100 }}
                  style={[styles.targetList]}
                >
                  <View style={styles.targetTouchableOuter}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.expandLocation}
                      style={[
                        globalStyles.row,
                        {
                          alignItems: "center",
                          marginVertical: expandLocation ? 10 : 0,
                        },
                      ]}
                    >
                      <LocationIcon
                        width={RFValue(7.5, 414)}
                        height={RFValue(8, 414)}
                        style={styles.icon}
                        fill={globalColors.purple3}
                      />

                      <Text style={styles.audienceHeading}>
                        {translate("Location")}
                      </Text>
                      <Icon
                        name={`ios-arrow-drop${expandLocation ? "up" : "down"}`}
                        type="MaterialUIIcons"
                        style={styles.iconDown}
                        onPress={this.expandLocation}
                      />
                    </TouchableOpacity>
                    {expandLocation && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() =>
                          this.callFunction("selectors", "countries")
                        }
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Countries")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {countries_names}
                          </Text>
                        </View>

                        {countries_names.length !== 0 ? (
                          <PurpleCheckmarkIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        ) : (
                          <PurplePlusIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    {expandLocation && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() => this.callFunction("regions")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.flex,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Regions")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {regions_names}
                          </Text>
                        </View>

                        {regions_names.length !== 0 ? (
                          <PurpleCheckmarkIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        ) : (
                          <PurplePlusIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    {expandLocation && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() => this.callFunction("map")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.flex,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Map Targeting")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {this.state.locationsInfo &&
                            this.state.locationsInfo.length > 0
                              ? (typeof this.state.locationsInfo === "string"
                                  ? JSON.parse(this.state.locationsInfo)
                                  : this.state.locationsInfo
                                )
                                  .map((loc) => translate(loc.countryName))
                                  .join(", ")
                              : ""}
                          </Text>
                        </View>

                        {this.state.locationsInfo &&
                        this.state.locationsInfo.length > 0 ? (
                          <PurpleCheckmarkIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        ) : (
                          <PurplePlusIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.targetTouchableOuter}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.expandDemographics}
                      style={[
                        globalStyles.row,
                        {
                          alignItems: "center",
                          marginVertical: expandDemographics ? 10 : 0,
                        },
                      ]}
                    >
                      <GenderIcon
                        width={RFValue(7.5, 414)}
                        height={RFValue(8, 414)}
                        fill={globalColors.purple3}
                        style={styles.icon}
                      />
                      <Text style={styles.audienceHeading}>
                        {translate("Demographic")}
                      </Text>
                      <Icon
                        name={`ios-arrow-drop${
                          expandDemographics ? "up" : "down"
                        }`}
                        type="MaterialUIIcons"
                        style={styles.iconDown}
                        onPress={this.expandDemographics}
                      />
                    </TouchableOpacity>
                    {expandDemographics && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        activeOpacity={1}
                        // onPress={() => this.callFunction("genders")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Gender")}
                          </Text>

                          <View style={styles.genderOuterView}>
                            {genders.map((g) => (
                              <TouchableOpacity
                                style={[
                                  styles.genderInnerView,
                                  targeting.genders.includes(g.value) &&
                                    styles.genderInnerActiveView,
                                ]}
                                activeOpacity={0.6}
                                onPress={() => {
                                  this.onSelectedGenderChange(g.value);
                                }}
                                disabled={saveAudienceLoading}
                              >
                                <Text
                                  style={[
                                    styles.genderRadioText,
                                    targeting.genders.includes(g.value) &&
                                      styles.genderRadioTextActive,
                                  ]}
                                >
                                  {translate(g.label)}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {expandDemographics && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() => this.callFunction("age")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Age")}
                          </Text>

                          <View style={styles.ageOuterView}>
                            <TouchableOpacity
                              style={styles.ageView}
                              onPress={() => this.callFunction("age")}
                            >
                              <Text style={styles.ageText}>
                                {targeting.age_min}
                              </Text>
                            </TouchableOpacity>

                            <Text style={styles.toText}>{translate("To")}</Text>
                            <TouchableOpacity
                              style={styles.ageView}
                              onPress={() => this.callFunction("age")}
                            >
                              <Text style={styles.ageText}>
                                {targeting.age_max}
                              </Text>
                            </TouchableOpacity>

                            {/* <Text style={styles.menudetails}>
                    {targeting.demographics[0].min_age} {translate("To")}{" "}
                    {targeting.demographics[0].max_age +
                      (targeting.demographics[0].max_age === 50 ? "+" : "")}
                  </Text> */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/*
            
            Later if it has to be used
            {((! editCampaign && regions_names) ||
              !editCampaign) &&
              targeting.geo_locations.countries.length > 0 && (
                <TouchableOpacity
                  onPress={() => this.callFunction("regions")}
                  style={styles.targetTouchable}
                >
                  <View style={[globalStyles.row, styles.flex]}>
                    <LocationIcon width={RFValue(11, 414)} height={RFValue(15, 414)} style={styles.icon}   fill={globalColors.purple}/>
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
                      <Text
                        style={styles.menudetails}
                        numberOfLines={startEditing ? 1 : 10}
                      >
                        {regions_names}
                      </Text>
                    </View>
                  </View>

                  {
                    (targeting.geo_locations.region_id.length !== 0 ? (
                      <PurpleCheckmarkIcon width={RFValue(11, 414)} height={RFValue(15, 414)} />
                    ) : (
                      <PurplePlusIcon width={RFValue(11, 414)} height={RFValue(15, 414)} />
                    ))}
                </TouchableOpacity>
              )} */}

                  {/* 
            Later will be used 
            <TouchableOpacity
              disabled={saveAudienceLoading}
              onPress={() => this.callFunction("languages")}
              style={styles.targetTouchable}
            >
              <View style={[globalStyles.row, styles.flex]}>
                <LanguageIcon width={RFValue(11, 414)} height={RFValue(15, 414)} style={styles.icon}   fill={globalColors.purple}/>
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
              {
                (targeting.demographics[0].languages.length !== 0 ? (
                  <PurpleCheckmarkIcon width={RFValue(11, 414)} height={RFValue(15, 414)} />
                ) : (
                  <PurplePlusIcon width={RFValue(11, 414)} height={RFValue(15, 414)} />
                ))}
            </TouchableOpacity> */}

                  {interests_names && (
                    <TouchableOpacity
                      disabled={saveAudienceLoading}
                      onPress={() => {
                        this.callFunction("selectors", "interests");
                      }}
                      style={[
                        styles.targetTouchable,
                        {
                          marginVertical: RFValue(4, 414),
                          paddingHorizontal: RFValue(5, 414),
                          borderRadius: RFValue(10, 414),
                        },
                      ]}
                    >
                      <View style={[globalStyles.row, { width: "80%" }]}>
                        <InterestsIcon
                          width={RFValue(7.5, 414)}
                          height={RFValue(15, 414)}
                          style={styles.icon}
                          fill={globalColors.purple3}
                        />
                        <View style={[globalStyles.column, styles.flex]}>
                          <Text style={styles.audienceHeading}>
                            {translate("Interests")}
                          </Text>
                          <Text numberOfLines={10} style={styles.menudetails}>
                            {interests_names}
                          </Text>
                        </View>
                      </View>

                      {interests_names && interests_names.length !== 0 ? (
                        <PurpleCheckmarkIcon
                          width={RFValue(11, 414)}
                          height={RFValue(15, 414)}
                        />
                      ) : (
                        <PurplePlusIcon
                          width={RFValue(11, 414)}
                          height={RFValue(15, 414)}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                  <View style={styles.targetTouchableOuter}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.expandDevices}
                      style={[
                        globalStyles.row,
                        {
                          alignItems: "center",
                          marginBottom: expandDevices ? 10 : 0,
                        },
                      ]}
                    >
                      <OperatingSystemIcon
                        width={RFValue(7.5, 414)}
                        height={RFValue(8, 414)}
                        fill={globalColors.purple3}
                        style={styles.icon}
                      />
                      <Text style={styles.audienceHeading}>
                        {translate("Devices")}
                      </Text>
                      <Icon
                        name={`ios-arrow-drop${expandDevices ? "up" : "down"}`}
                        type="MaterialUIIcons"
                        style={styles.iconDown}
                        onPress={this.expandDevices}
                      />
                    </TouchableOpacity>
                    {expandDevices && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() => this.callFunction("OS")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.flex,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Operating System")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {translate(
                              targeting.user_os && targeting.user_os[0] === ""
                                ? "All"
                                : targeting.user_os && targeting.user_os[0]
                            )}
                            {/* {translate(
                      OSType.find((r) => {
                        if (r.value === targeting.user_os && targeting.user_os[0]) return r;
                      }).label
                    )} */}
                          </Text>
                        </View>

                        {(targeting.user_os && targeting.user_os[0] === "") ||
                        (targeting.user_os && targeting.user_os[0]) ? (
                          <PurpleCheckmarkIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        ) : (
                          <PurplePlusIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    {expandDevices &&
                    (targeting.os_version_min ||
                      (targeting.user_os && targeting.user_os[0] !== "")) ? (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() =>
                          this.callFunction("selectors", "deviceVersions")
                        }
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.flex,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("OS Versions")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {targeting.os_version_min +
                              ", " +
                              targeting.os_version_max}
                          </Text>
                        </View>

                        {targeting.os_version_min !== "" ? (
                          <PurpleCheckmarkIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        ) : (
                          <PurplePlusIcon
                            width={RFValue(11, 414)}
                            height={RFValue(15, 414)}
                          />
                        )}
                      </TouchableOpacity>
                    ) : null}
                    {expandDevices &&
                      ((targeting.user_device &&
                        targeting.user_device.length > 0) ||
                        (targeting.user_os && targeting.user_os[0] !== "")) && (
                        <TouchableOpacity
                          disabled={saveAudienceLoading}
                          onPress={() =>
                            this.callFunction("selectors", "deviceBrands")
                          }
                          style={styles.targetTouchable}
                        >
                          <View
                            style={[
                              globalStyles.column,
                              styles.flex,
                              styles.audienceSubHeading,
                            ]}
                          >
                            <Text style={styles.menutext}>
                              {translate("Device Make")}
                            </Text>
                            <Text numberOfLines={10} style={styles.menudetails}>
                              {targeting.user_device.join(", ")}
                            </Text>
                          </View>

                          {targeting.user_device &&
                          targeting.user_device.length !== 0 ? (
                            <PurpleCheckmarkIcon
                              width={RFValue(11, 414)}
                              height={RFValue(15, 414)}
                            />
                          ) : (
                            <PurplePlusIcon
                              width={RFValue(11, 414)}
                              height={RFValue(15, 414)}
                            />
                          )}
                        </TouchableOpacity>
                      )}
                  </View>
                </ScrollView>
              </MaskedView>
              {this.state.scrollY < heightPercentageToDP(0.8) &&
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
            {saveAudienceLoading && (
              <View style={styles.loader}>
                <LoadingScreen dash={true} />
              </View>
            )}
          </Sidemenu>
        </View>
      );
  }
}

const mapStateToProps = (state) => ({
  audience: state.instagramAudience.audience,
  languages: state.instagramAds.languagesList,
  audienceDetailLoading: state.instagramAudience.audienceDetailLoading,
  saveAudienceLoading: state.instagramAudience.saveAudienceLoading,
  mainBusiness: state.account.mainBusiness,
  interests: state.instagramAds.interests,
  customLocations: state.instagramAds.customLocations,
});

const mapDispatchToProps = (dispatch) => ({
  setAudienceDetail: (audienceInfo) =>
    dispatch(actionCreators.setInstagramAudienceDetail(audienceInfo)),
  get_interests: (countryCode) =>
    dispatch(actionCreators.get_interests(countryCode)),
  createAudience: (
    audience,
    navigate,
    locationInfo,
    custom_interest,
    custom_location
  ) =>
    dispatch(
      actionCreators.createInstagramAudience(
        audience,
        navigate,
        locationInfo,
        custom_interest,
        custom_location
      )
    ),
  updateAudience: (
    audienceId,
    audienceName,
    targeting,
    locationInfo,
    custom_interest,
    custom_location
  ) =>
    dispatch(
      actionCreators.updateInstagramAudience(
        audienceId,
        audienceName,
        targeting,
        locationInfo,
        custom_interest,
        custom_location
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(InstagramAudience);
