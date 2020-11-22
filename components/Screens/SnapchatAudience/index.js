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
import SelectRegions from "../../MiniComponents/SelectRegions";
import SelectLanguages from "../../MiniComponents/SelectLanguages";
import GenderOptions from "../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../MiniComponents/AgeOptions/AgeOption";
import MultiSelectSections from "../../MiniComponents/MultiSelect/MultiSelect";
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
  gender,
  OSType,
  country_regions,
} from "../CampaignCreate/AdDetails/data";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

export class SnapchatAudience extends Component {
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
    };
    this.editAudience = this.props.navigation.getParam("editAudience", false);
  }

  async componentDidMount() {
    this.props.get_languages();

    // To by default set the country to that of the business country selected
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.audienceDetailLoading !== this.props.audienceDetailLoading &&
      this.props.audience.targeting.geos[0].country_code !== ""
    ) {
      let showRegions = false;
      let countryRegions = this.props.audience.targeting.geos.map((cou) => {
        let foundCountryReg = find(
          country_regions,
          (country) => country.country_code === cou.country_code
        );
        showRegions = foundCountryReg.regions.length > 3;

        return foundCountryReg;
      });

      let locationsInfo = [];
      let markers = [];
      if (this.props.audience.coordinates) {
        locationsInfo = cloneDeep(JSON.parse(this.props.audience.coordinates));
        markers = cloneDeep(this.props.audience.targeting.locations[0].circles);
      }

      this.setState({
        regions: countryRegions ? countryRegions : [],
        filteredRegions: countryRegions ? countryRegions : [],
        showRegions: showRegions,
        locationsInfo,
        markers,
      });
    }
  }
  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    const audienceNameError =
      this.props.audience.name.length === 0
        ? "Please enter name for your audience"
        : null;
    const languagesError =
      this.props.audience.targeting.demographics[0].languages.length === 0
        ? "Please choose a language."
        : null;

    const countryError = validateWrapper(
      "mandatory",
      this.props.audience.targeting.geos[0].country_code
    );
    if (audienceNameError) {
      showMessage({
        message: translate(audienceNameError),
        type: "warning",
        position: "top",
      });
    } else if (countryError) {
      showMessage({
        message: translate("Please choose a country"),
        type: "warning",
        position: "top",
      });
    } else if (languagesError) {
      showMessage({
        message: translate("Please choose a language"),
        type: "warning",
        position: "top",
      });
    }
    // segment track for error on final submit
    if (countryError || languagesError || audienceNameError) {
      analytics.track(`a_error_form`, {
        error_page: "audience_targeting",
        source_action: "a_save_audience_targeting",
        timestamp: new Date().getTime(),

        // campaign_channel: "snapchat",
        // campaign_ad_type: this.props.adType,
        error_description: countryError || languagesError || audienceNameError,
      });
    }
    if (!languagesError && !countryError && !audienceNameError) {
      let rep = cloneDeep(this.props.audience);
      // if (rep.targeting.demographics[0].gender === "") {
      //   delete rep.targeting.demographics[0].gender;
      // }
      // if (
      //   rep.targeting.geos[0].hasOwnProperty("region_id") &&
      //   rep.targeting.geos[0].region_id.length === 0
      // ) {
      //   delete rep.targeting.geos[0].region_id;
      // }
      // if (
      //   rep.targeting.hasOwnProperty("interests") &&
      //   rep.targeting.interests[0].category_id.length === 0
      // ) {
      //   delete rep.targeting.interests;
      // }
      // if (
      //   rep.targeting.devices[0].hasOwnProperty("marketing_name") &&
      //   rep.targeting.devices[0].marketing_name.length === 0
      // ) {
      //   delete rep.targeting.devices[0].marketing_name;
      // }
      // if (rep.targeting.devices[0].os_type === "") {
      //   delete rep.targeting.devices[0].os_type;
      // }
      // if (rep.targeting.devices[0].os_version_max === "") {
      //   delete rep.targeting.devices[0].os_version_max;
      //   delete rep.targeting.devices[0].os_version_min;
      // }
      // if (
      //   Object.entries(rep.targeting.devices[0]).length === 0 &&
      //   rep.targeting.devices[0].constructor === Object
      // ) {
      //   delete rep.targeting.devices;
      // }
      if (rep.targeting.demographics[0].max_age === 50) {
        rep.targeting.demographics[0].max_age = "50+";
      }
      // rep.targeting = JSON.stringify(rep.targeting);
      // let interestNamesList = [];
      // interestNamesList =
      //   this.state.interestNames &&
      //   this.state.interestNames.length > 0 &&
      //   this.state.interestNames.map((inter) => inter.name);
      // const segmentInfo = {
      //   campaign_id: this.props.campaign_id,

      //   business_name: this.props.mainBusiness.businessname,
      //   campaign_budget: this.props.audience.lifetime_budget_micro,
      //   campaign_gender:
      //     this.props.audience.targeting.demographics[0].gender === ""
      //       ? "ALL"
      //       : this.props.audience.targeting.demographics[0].gender,
      //   campaign_max_age: this.props.audience.targeting.demographics[0].max_age,
      //   campaign_min_age: this.props.audience.targeting.demographics[0].min_age,
      //   campaign_country_name: this.state.countryName,
      //   campaign_region_names:
      //     this.state.regionNames && this.state.regionNames.length > 0
      //       ? this.state.regionNames.join(", ")
      //       : null,
      //   campaign_languages:
      //     this.props.audience.targeting.demographics[0].languages &&
      //     this.props.audience.targeting.demographics[0].languages.length > 0
      //       ? this.props.audience.targeting.demographics[0].languages.join(", ")
      //       : null,
      //   campaign_min_version: this.props.audience.targeting.devices[0]
      //     .os_version_min,
      //   campaign_max_version: this.props.audience.targeting.devices[0]
      //     .os_version_max,
      //   campaign_os_type:
      //     this.props.audience.targeting.devices[0].os_type === ""
      //       ? "ALL"
      //       : this.props.audience.targeting.devices[0].os_type,
      //   campaign_devices_name:
      //     this.props.audience.targeting.devices[0].marketing_name &&
      //     this.props.audience.targeting.devices[0].marketing_name.length > 0
      //       ? this.props.audience.targeting.devices[0].marketing_name.join(", ")
      //       : null,
      //   campaign_interests_names:
      //     interestNamesList && interestNamesList.length > 0
      //       ? interestNamesList.join(", ")
      //       : null,

      // };
      if (this.editAudience) {
        this.props.updateAudience(
          rep.id,
          rep.name,
          rep.targeting,
          this.state.locationsInfo
        );
      } else {
        rep.targeting = JSON.stringify(rep.targeting);
        this.props.createAudience(rep, true, this.state.locationsInfo);
      }
    }
  };

  handleFading = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    this.setState({ scrollY: y > 10 ? y / 10 : 1 });
  };
  callFunction = (selector, option) => {
    const { translate } = this.props.screenProps;

    if (
      (option === "regions" || option === "interests") &&
      this.props.audience.targeting.geos[0].country_code === ""
    ) {
      showMessage({
        message: translate("Please select a country first"),
        position: "top",
        type: "warning",
      });
    } else this._renderSideMenu(selector, option);
  };

  _handleAge = (values) => {
    let rep = cloneDeep(this.props.audience);
    rep.targeting.demographics[0].min_age = parseInt(values[0]);
    rep.targeting.demographics[0].max_age = parseInt(values[1]);

    analytics.track(`a_audience_age`, {
      source: "audience_detail",
      source_action: "a_audience_age",
      audience_max_age: parseInt(values[0]),
      audience_min_age: parseInt(values[1]),
    });
    this.props.setAudienceDetail({ ...rep });
  };

  onSelectedCountryChange = async (
    selectedItem,
    mounting = false,
    countryName,
    addCountryOfLocations = false
  ) => {
    let replace = cloneDeep(this.props.audience);
    let newCountry = selectedItem;
    let regionNames = this.state.regionNames;
    let locationsInfo = this.state.locationsInfo;

    if (newCountry) {
      if (
        replace.targeting.geos.find((co) => co.country_code === newCountry) &&
        replace.targeting.geos.length === 1 &&
        !addCountryOfLocations &&
        !mounting
      ) {
        //To overwrite the object in geos instead of filtering it out
        replace.targeting.geos[0] = {
          country_code: "",
          region_id: [],
        };
        countryName = [];
        regionNames = [];
        locationsInfo = [];
        replace.targeting.locations[0].circles = [];
      } else if (
        replace.targeting.geos.find((co) => co.country_code === newCountry) &&
        !addCountryOfLocations &&
        !mounting
      ) {
        //To remove the country from the array
        replace.targeting.geos = replace.targeting.geos.filter(
          (co) => co.country_code !== newCountry
        );

        //To remove the regions from the the region names
        regionNames =
          this.state.regionNames.length > 0
            ? this.state.regionNames.filter(
                (reg) => reg.country_code !== newCountry
              )
            : [];

        locationsInfo =
          this.state.locationsInfo &&
          this.state.locationsInfo.length &&
          this.state.locationsInfo.filter((loc, i) => {
            if (loc.country_code !== newCountry) {
              return loc;
            } else {
              replace.targeting.locations[0].circles.splice(i, 1);
            }
          });
      } else if (replace.targeting.geos[0].country_code === "" && !mounting) {
        //To overwrite the only object in geos instead of pushing the new country
        replace.targeting.geos[0] = {
          country_code: newCountry,
          region_id: [],
        };
        countryName = [countryName];
        regionNames = this.state.regionNames.filter(
          (reg) => reg.country_code !== newCountry
        );
      } else if (
        (addCountryOfLocations
          ? !replace.targeting.geos.find((co) => co.country_code === newCountry)
          : true) &&
        !mounting
      ) {
        //To add the coutnry to geos array
        replace.targeting.geos.push({
          country_code: newCountry,
          region_id: [],
        });
      }
      let reg = country_regions.find((c) => c.country_code === newCountry);
      if (
        this.state.regions.find((c) => c.country_code === newCountry) &&
        !addCountryOfLocations &&
        !mounting
      ) {
        //To remove the region from the list of country regions that shows all regions of countriees when
        //the country is unselected
        reg = this.state.regions.filter((coReg) => {
          return coReg.country_code !== newCountry;
        });
      } else if (
        (addCountryOfLocations
          ? !this.state.regions.find((c) => c.country_code === newCountry)
          : true) &&
        !mounting
      ) {
        if (reg) reg = [...this.state.regions, reg];
      } else {
        reg = [...this.state.regions];
      }
      if (replace.targeting.interests)
        replace.targeting.interests[0].category_id = [];
      // analytics.track(`a_audience_country`, {
      //   source: "audience_detail",
      //   source_action: "a_audience_country",
      //   audience_country_name: countryName,
      // });
      let showRegions = false;
      this.setState(
        {
          regions: reg,
          filteredRegions: reg,
          // regionNames,
          // interestNames: [],
          // countryName,
          locationsInfo,
        },
        () => {
          // console.log("this.state.regions", this.state.regions);
          // //To show the regions options if one of the selected countries has more than 3 regions
          showRegions =
            this.state.regions && this.state.regions.length > 0
              ? this.state.regions.some(
                  (reg) => reg.regions && reg.regions.length > 3
                )
              : false;

          !mounting &&
            this.props.setAudienceDetail({
              ...replace,
            });
          this.setState({ showRegions });
        }
      );
    }
  };

  onSelectedInterestsChange = (selectedItems) => {
    let replace = cloneDeep(this.props.audience);
    replace.targeting.interests[0].category_id = selectedItems;
    this.props.setAudienceDetail({ ...replace });
  };

  onSelectedDevicesChange = (selectedItems) => {
    let replace = cloneDeep(this.props.audience);
    replace.targeting.devices[0].marketing_name = selectedItems;

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
  onSelectedInterestsNamesChange = (selectedItems) => {
    let names = [];
    names = selectedItems.length > 0 && selectedItems.map((item) => item.name);
    analytics.track(`a_audience_interests`, {
      source: "audience_detail",
      source_action: "a_audience_interests",
      audience_interests_names: names && names.length > 0 && names.join(", "),
    });
    this.setState({
      interestNames: names,
    });
    // this.props.setAudienceDetail({
    //   interestNames: names,
    // });
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
    replace.targeting.devices[0].os_type = selectedItem;
    replace.targeting.devices[0].os_version_min = "";
    replace.targeting.devices[0].os_version_max = "";
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
    replace.targeting.devices[0].os_version_min = selectedItem[0];
    replace.targeting.devices[0].os_version_max = selectedItem[1];
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

  onSelectedMapChange = (selectedItems, unselect = false, locationsInfo) => {
    let stateRep = cloneDeep(this.props.audience);
    if (unselect) {
      stateRep.targeting.locations[0].circles = [];
      // this.props.setAudienceDetail({ markers: [], locationsInfo: [] });
    } else stateRep.targeting.locations[0].circles = selectedItems;
    analytics.track(`a_audience_map_locations`, {
      source: "audience_detail",
      source_action: "a_audience_map_locations",
      audience_map_locations: selectedItems,
    });
    this.setState({
      // campaignInfo: { ...stateRep },
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
    let coRegIndex = 0;
    let rIds = [];
    if (country_code) {
      //get the index of the selected country to add the regions to it
      coRegIndex = replace.targeting.geos.findIndex(
        (co) => co.country_code === country_code
      );
      rIds = replace.targeting.geos[coRegIndex].region_id;
    }
    let rNamesSelected = this.state.regionNames;

    if (selectedItem === -1) {
      //Select all option
      let regionsLength = 0;
      this.state.regions.forEach((reg) => {
        if (reg.regions && reg.regions.length > 3)
          regionsLength += reg.regions.length;
      });
      if (regionsLength === this.state.regionNames.length || unselect) {
        //if all the regions of all selected countries are selected
        //then regionNames.length will === all the regions of the selected countries
        //Meaning that this will unselect all the regions
        replace.targeting.geos.forEach(
          (co, i) => (replace.targeting.geos[i].region_id = [])
        );
        analytics.track(`a_audience_regions`, {
          source: "audience_detail",
          source_action: "a_audience_regions",
          audience_region_names: [],
        });
        rNamesSelected = [];
        this.setState({
          regionNames: rNamesSelected,
          // campaignInfo: replace,
        });
      } else {
        //To select all regions of all selected countries
        rNamesSelected = [];
        rIds = [];
        //this.state.regions is an array of multiple country regions of selected countries
        //[{country_code:"kw",country_name:"Kuwait",regions:[{id,name},{id,name},{id,name}]}]
        this.state.regions.forEach(
          (r) =>
            r.regions.length > 3 &&
            r.regions.forEach((region) => {
              //Add region names of all regions of the selected countries
              rNamesSelected.push({
                name: region.name,
                country_code: r.country_code,
              });
            })
        );
        //To add the region ids of all selected countries
        replace.targeting.geos.forEach((cou, i) => {
          let foundRegions = this.state.regions.find(
            (cReg) =>
              cReg.regions.length > 3 &&
              cReg.country_code === replace.targeting.geos[i].country_code
          );
          replace.targeting.geos[i].region_id = foundRegions
            ? foundRegions.regions.map((reg) => reg.id)
            : [];
        });
        analytics.track(`a_audience_regions`, {
          source: "audience_detail",
          source_action: "a_audience_regions",
          audience_region_names: rNamesSelected.join(", "),
        });
        this.setState({
          regionNames: rNamesSelected,
          // campaignInfo: replace,
        });
      }

      this.props.setAudienceDetail({
        ...replace,
      });
      return;
    } else {
      // logic change

      // campignInfo region
      if (rIds.find((r) => r === selectedItem)) {
        replace.targeting.geos[coRegIndex].region_id = rIds.filter(
          (r) => r !== selectedItem
        );
        rNamesSelected = rNamesSelected.filter((r) => r.name !== regionName);
      } else {
        replace.targeting.geos[coRegIndex].region_id.push(selectedItem);
        rNamesSelected.push({
          name: regionName,
          country_code: country_code,
        });
      }
      analytics.track(`a_audience_regions`, {
        source: "audience_detail",
        source_action: "a_audience_regions",
        audience_region_names: rNamesSelected.join(", "),
      });
      this.setState({
        regionNames: rNamesSelected,
      });

      this.props.setAudienceDetail({
        ...replace,
      });
    }
  };

  onSelectedGenderChange = (gender) => {
    let replace = cloneDeep(this.props.audience);
    replace.targeting.demographics[0].gender = gender;
    analytics.track(`a_audience_gender`, {
      audience_gender: gender === "" ? "ALL" : gender,
    });
    this.setState({ targeting: { ...replace } });

    this.props.setAudienceDetail({ ...replace });
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
    let interestNames = [];
    interestNames =
      this.props.audience.targeting &&
      this.props.audience.targeting.interests &&
      this.props.audience.targeting.interests[0].category_id.length > 0 &&
      this.props.audience.targeting.interests[0].category_id.map(
        (category_id) => {
          return (
            this.props.interests &&
            this.props.interests.length > 0 &&
            translate(
              this.props.interests.find(
                (interest) => interest.id == category_id
              ).name
            )
          );
        }
      );
    return interestNames && interestNames.length > 0
      ? interestNames.join(", ")
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
          ? translate(
              country_regions.find(
                (country) => country.country_code == country_code.country_code
              ).country_name
            )
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
  render() {
    let { saveAudienceLoading = false, audience } = this.props;
    const { targeting } = audience;
    const { translate } = this.props.screenProps;
    let languages_names = this.getLanguagesName();
    let interests_names = this.getInterestNames();
    let country_names = this.getCountryNames();
    let region_names = this.getRegionNames();
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
            screenProps={this.props.screenProps}
            state={this.props.audience.targeting.demographics[0]}
            _handleSideMenuState={this._handleSideMenuState}
            _handleAge={this._handleAge}
            ageValuesRange={[13, 50]}
            minAge={this.props.audience.targeting.demographics[0].min_age}
            maxAge={this.props.audience.targeting.demographics[0].max_age}
          />
        );
        break;
      }
      case "regions": {
        menu = (
          <SelectRegions
            screenProps={this.props.screenProps}
            countryName={this.state.countryName}
            filteredRegions={this.state.filteredRegions}
            onSelectedRegionChange={this.onSelectedRegionChange}
            _handleSideMenuState={this._handleSideMenuState}
            regions={this.state.regions}
            region_id={this.props.audience.targeting.geos}
            filterRegions={this.filterRegions}
            locationsSelected={
              this.props.audience.targeting.locations[0].circles.length > 0
            }
            onSelectedMapChange={this.onSelectedMapChange}
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
            country_code={this.props.audience.targeting.geos[0].country_code}
            screenProps={this.props.screenProps}
            _handleSideMenuState={this._handleSideMenuState}
            circles={this.props.audience.targeting.locations[0].circles}
            locationsInfo={this.state.locationsInfo}
            onSelectedMapChange={this.onSelectedMapChange}
            save_campaign_info={this.props.setAudienceDetail}
            data={this.props.audience}
            regionsSelected={this.props.audience.targeting.geos}
            onSelectedRegionChange={this.onSelectedRegionChange}
            onSelectedCountryChange={this.onSelectedCountryChange}
            _handleSideMenuState={this._handleSideMenuState}
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
          />
        );

        break;
      }
      case "OS": {
        menu = (
          <SelectOS
            screenProps={this.props.screenProps}
            campaignInfo={this.props.audience}
            onSelectedOSChange={this.onSelectedOSChange}
            data={OSType}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }

      case "selectors": {
        menu = (
          <MultiSelectSections
            screenProps={this.props.screenProps}
            countries={countries}
            country_code={this.props.audience.targeting.geos}
            onSelectedCountryChange={this.onSelectedCountryChange}
            country_codes={this.props.audience.targeting.geos}
            _handleSideMenuState={this._handleSideMenuState}
            onSelectedInterestsChange={this.onSelectedInterestsChange}
            onSelectedInterestsNamesChange={this.onSelectedInterestsNamesChange}
            selectedItems={
              this.props.audience.targeting.interests
                ? this.props.audience.targeting.interests[0].category_id
                : []
            }
            selectedDevices={
              this.props.audience.targeting.devices[0].marketing_name
            }
            onSelectedDevicesChange={this.onSelectedDevicesChange}
            selectedMinVersions={
              this.props.audience.targeting.devices[0].os_version_min
            }
            selectedMaxVersions={
              this.props.audience.targeting.devices[0].os_version_max
            }
            onSelectedVersionsChange={this.onSelectedVersionsChange}
            OSType={this.props.audience.targeting.devices[0].os_type}
            option={this.state.selectionOption}
            editAudience={this.editAudience}
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
                      activeOpacity={0.8}
                      onPress={this.expandLocation}
                      style={[styles.header]}
                    >
                      <LocationIcon
                        width={22}
                        height={25}
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
                            {translate("Country")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {country_names}
                          </Text>
                        </View>

                        {targeting.geos[0].country_code ? (
                          <PurpleCheckmarkIcon
                            width={22}
                            height={30}
                            fill={globalColors.purple}
                          />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
                        )}
                      </TouchableOpacity>
                    )}
                    {this.state.showRegions && expandLocation ? ( //for campaign creation
                      <TouchableOpacity
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
                          <Text style={[styles.menutext]}>
                            {translate("Regions")}
                          </Text>
                          <Text style={styles.menudetails} numberOfLines={1}>
                            {region_names}
                          </Text>
                        </View>

                        {targeting.geos.some(
                          (geo) => geo.region_id && geo.region_id.length !== 0
                        ) ? (
                          <PurpleCheckmarkIcon width={22} height={30} />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
                        )}
                      </TouchableOpacity>
                    ) : null}
                    {expandLocation && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() => this.callFunction("map")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,
                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Map")}
                          </Text>
                          <Text style={styles.menudetails}>
                            {this.state.locationsInfo &&
                            this.state.locationsInfo.length > 0
                              ? this.state.locationsInfo
                                  .map((loc) => translate(loc.countryName))
                                  .join(", ")
                              : ""}
                          </Text>
                        </View>
                        {targeting.geos[0].country_code ? (
                          <PurpleCheckmarkIcon width={22} height={30} />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.targetTouchableOuter}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={this.expandDemographics}
                      style={[styles.header]}
                    >
                      <GenderIcon
                        width={22}
                        height={30}
                        style={styles.icon}
                        fill={globalColors.purple3}
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
                        // onPress={() => this.callFunction("gender")}
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
                            {gender.map((g) => (
                              <TouchableOpacity
                                style={[
                                  styles.genderInnerView,
                                  targeting.demographics[0].gender ===
                                    g.value && styles.genderInnerActiveView,
                                ]}
                                activeOpacity={0.6}
                                onPress={() => {
                                  this.onSelectedGenderChange(g.value);
                                }}
                              >
                                <Text
                                  style={[
                                    styles.genderRadioText,
                                    targeting.demographics[0].gender ===
                                      g.value && styles.genderRadioTextActive,
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
                                {targeting.demographics[0].min_age}
                              </Text>
                            </TouchableOpacity>

                            <Text style={styles.toText}>{translate("To")}</Text>
                            <TouchableOpacity
                              style={styles.ageView}
                              onPress={() => this.callFunction("age")}
                            >
                              <Text style={styles.ageText}>
                                {targeting.demographics[0].max_age +
                                  (targeting.demographics[0].max_age === 50
                                    ? "+"
                                    : "")}
                              </Text>
                            </TouchableOpacity>

                            {/* <Text style={styles.menudetails}>
                    {targeting.demographics[0].min_age} {translate("To")}{" "}
                    {targeting.demographics[0].max_age +
                      (targeting.demographics[0].max_age === 50 ? "+" : "")}
                  </Text> */}
                          </View>

                          {/* <Text style={styles.menudetails}>
                            {targeting.demographics &&
                              targeting.demographics[0].min_age}{" "}
                            -{" "}
                            {targeting.demographics &&
                              targeting.demographics[0].max_age +
                                (targeting.demographics[0].max_age === 50
                                  ? "+"
                                  : "")}
                          </Text> */}
                        </View>

                        {/* {targeting.demographics &&
                        targeting.demographics[0].max_age ? (
                          <PurpleCheckmarkIcon width={22} height={30} />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
                        )} */}
                      </TouchableOpacity>
                    )}
                    {expandDemographics && (
                      <TouchableOpacity
                        disabled={saveAudienceLoading}
                        onPress={() => this.callFunction("languages")}
                        style={styles.targetTouchable}
                      >
                        <View
                          style={[
                            globalStyles.column,

                            styles.audienceSubHeading,
                          ]}
                        >
                          <Text style={styles.menutext}>
                            {translate("Language")}
                          </Text>
                          {targeting.demographics[0].languages.length !== 0 ? (
                            <Text style={styles.menudetails}>
                              {languages_names}
                            </Text>
                          ) : (
                            <View style={styles.selectLanguageButton}>
                              <Text style={styles.selectLanguageText}>
                                {translate("Select Languages")}
                              </Text>
                              <Icon
                                name={`keyboard-arrow-${
                                  I18nManager.isRTL ? "left" : "right"
                                }`}
                                type="MaterialIcons"
                                style={{
                                  color: globalColors.purple3,
                                }}
                              />
                            </View>
                          )}
                        </View>

                        {/* {targeting.demographics[0].languages.length !== 0 ? (
                          <PurpleCheckmarkIcon width={22} height={30} />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
                        )} */}
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity
                    disabled={saveAudienceLoading}
                    onPress={() => this.callFunction("selectors", "interests")}
                    style={[
                      styles.targetTouchableOuter,
                      styles.targetTouchable,
                    ]}
                  >
                    <View style={[globalStyles.row, styles.flex]}>
                      <InterestsIcon
                        width={22}
                        height={30}
                        style={styles.icon}
                        fill={globalColors.purple3}
                      />
                      <View style={[globalStyles.column, styles.flex]}>
                        <Text style={styles.audienceHeading}>
                          {translate("Interests")}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[styles.menudetails, { paddingHorizontal: 4 }]}
                        >
                          {interests_names}
                        </Text>
                      </View>
                    </View>
                    <View style={globalStyles.column}>
                      {targeting.interests &&
                      targeting.interests[0].category_id.length !== 0 ? (
                        <PurpleCheckmarkIcon width={22} height={30} />
                      ) : (
                        <PurplePlusIcon width={22} height={30} />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View style={styles.targetTouchableOuter}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={this.expandDevices}
                      style={[styles.header]}
                    >
                      <OperatingSystemIcon
                        width={22}
                        height={25}
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
                              OSType.find((r) => {
                                if (
                                  r.value ===
                                  (targeting.devices &&
                                  targeting.devices[0].os_type
                                    ? targeting.devices[0].os_type
                                    : "")
                                )
                                  return r;
                              }).label
                            )}
                          </Text>
                        </View>

                        {(targeting.devices &&
                          targeting.devices[0].os_type === "") ||
                        (targeting.devices && targeting.devices[0].os_type) ? (
                          <PurpleCheckmarkIcon width={22} height={30} />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
                        )}
                      </TouchableOpacity>
                    )}
                    {expandDevices &&
                      targeting.devices &&
                      targeting.devices[0].os_type !== "" && (
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
                              {targeting.devices &&
                                targeting.devices[0].os_version_min + ", "}
                              {targeting.devices &&
                                targeting.devices[0].os_version_max}
                            </Text>
                          </View>

                          {targeting.devices &&
                          targeting.devices[0].os_version_min !== "" ? (
                            <PurpleCheckmarkIcon width={22} height={30} />
                          ) : (
                            <PurplePlusIcon width={22} height={30} />
                          )}
                        </TouchableOpacity>
                      )}
                    {expandDevices && (
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
                          <Text numberOfLines={1} style={styles.menudetails}>
                            {targeting.devices &&
                              targeting.devices[0].marketing_name &&
                              targeting.devices[0].marketing_name.join(", ")}
                          </Text>
                        </View>

                        {targeting.devices &&
                        targeting.devices[0].marketing_name &&
                        targeting.devices[0].marketing_name.length !== 0 ? (
                          <PurpleCheckmarkIcon width={22} height={30} />
                        ) : (
                          <PurplePlusIcon width={22} height={30} />
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
  audience: state.audience.audience,
  languages: state.campaignC.languagesList,
  audienceDetailLoading: state.audience.audienceDetailLoading,
  saveAudienceLoading: state.audience.saveAudienceLoading,
  mainBusiness: state.account.mainBusiness,
  interests: state.campaignC.interests,
});

const mapDispatchToProps = (dispatch) => ({
  setAudienceDetail: (audienceInfo) =>
    dispatch(actionCreators.setAudienceDetail(audienceInfo)),
  get_languages: () => dispatch(actionCreators.get_languages()),
  get_interests: (countryCode) =>
    dispatch(actionCreators.get_interests(countryCode)),
  createAudience: (audience, navigate, locationInfo) =>
    dispatch(actionCreators.createAudience(audience, navigate, locationInfo)),
  updateAudience: (audienceId, audienceName, targeting, locationInfo) =>
    dispatch(
      actionCreators.updateAudience(
        audienceId,
        audienceName,
        targeting,
        locationInfo
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapchatAudience);
