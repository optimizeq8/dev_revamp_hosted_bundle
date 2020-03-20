//Components
import React, { Component } from "react";
import { View, BackHandler, I18nManager } from "react-native";
import { Text, Container, Content } from "native-base";
import { Video } from "expo-av";
import * as Segment from "expo-analytics-segment";
// import Sidemenu from "react-native-side-menu";
import Sidemenu from "../../../../MiniComponents/SideMenu";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ReachBar from "./ReachBar";
import SelectRegions from "../../../../MiniComponents/SelectRegions";
import SelectLanguages from "../../../../MiniComponents/SelectLanguages";
import GenderOptions from "../../../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../../../MiniComponents/AgeOptions/AgeOption";
import MultiSelectSections from "../../../../MiniComponents/MultiSelectInstagram/MultiSelect";
import CustomHeader from "../../../../MiniComponents/Header";
import SelectOS from "../../../../MiniComponents/SelectOS";
import { showMessage } from "react-native-flash-message";

//Data
import countries, { gender, OSType, country_regions, allRegions } from "./data";

//Style
import styles from "../../styles/adTargetting.styles";

//Redux Axios
import * as actionCreators from "../../../../../store/actions";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../../../ValidationFunctions/ValidateWrapper";
import combineMerge from "./combineMerge";
import deepmerge from "deepmerge";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import isNan from "lodash/isNaN";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";
import { BudgetCards } from "./BudgetCards";
import { TargetAudience } from "./TargetAudience";
import find from "lodash/find";
import segmentEventTrack from "../../../../segmentEventTrack";

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
          genders: [""],
          flexible_spec: [
            {
              interests: []
            }
          ],
          user_os: [""],
          user_device: [],
          os_version_min: "",
          os_version_max: "",
          geo_locations: { countries: [], regions: [] }
        }
      },
      selectedCountriesAndRegions: [],
      filteredRegions: [],
      filteredLanguages: [],
      regionNames: [],
      countryName: "",
      advance: false,
      sidemenustate: false,
      sidemenu: "genders",
      regions: [],
      value: 50,
      minValueBudget: 25,
      maxValueBudget: 1500,
      interestNames: [],
      modalVisible: false,
      totalReach: 0,
      selectionOption: "",

      recBudget: 0,
      budgetOption: 1,
      startEditing: true
    };
    this.editCampaign = this.props.navigation.getParam("editCampaign", false);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps, prevState) {
    // if(this.prevProps)
    if (!isEqual(prevProps.languages, this.props.languages)) {
      //   const campaign = { ...this.state.campaignInfo };
      //   campaign.targeting.demographics[0].languages = this.props.languages.map(
      //     lang => lang.id
      //   );
      this.setState({
        // campaignInfo: campaign,
        filteredLanguages: this.props.languages
      });
    }
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  async componentDidMount() {
    // if (this.editCampaign) {
    //   let editedCampaign = deepmerge(
    //     this.state.campaignInfo,
    //     this.props.navigation.getParam("campaign", {}),
    //     { arrayMerge: combineMerge }
    //   );
    //   this.props.get_interests(
    //     editedCampaign.targeting.geo_locations.country_code
    //   );
    //   // editedCampaign.targeting.demographics[0].max_age = parseInt(
    //   //   editedCampaign.targeting.demographics[0].max_age
    //   // );
    //   getCountryName = countries.find(
    //     country =>
    //       country.value === editedCampaign.targeting.geo_locations.country_code
    //   ).label;
    //
    //   let editedRegionNames = country_regions.find(
    //     country_region =>
    //       country_region.country_code ===
    //       editedCampaign.targeting.geo_locations.country_code
    //   );
    //   editedCampaign.targeting.geo_locations.region_id.forEach(id => {
    //     let name = editedRegionNames.regions.find(region => region.id === id)
    //       .name;
    //     this.onSelectedRegionChange(id, name);
    //   });
    //   this.setState(
    //     {
    //       campaignInfo: editedCampaign,
    //       startEditing: false
    //     },
    //     () => this._calcReach()
    //   );
    // } else
    {
      let duration = Math.round(
        Math.abs(
          (new Date(this.props.data.start_time).getTime() -
            new Date(this.props.data.end_time).getTime()) /
            86400000
        ) + 1
      );

      let recBudget = duration * 75;

      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          campaign_id: this.props.campaign_id,
          lifetime_budget_micro: recBudget
        },
        minValueBudget: this.props.data.minValueBudget,
        maxValueBudget: this.props.data.maxValueBudget,
        value: this.formatNumber(recBudget),
        recBudget: recBudget
      });

      if (this.props.data.hasOwnProperty("campaignInfo")) {
        rep = { ...this.state.campaignInfo, ...this.props.data.campaignInfo };
        let countryRegions = find(
          country_regions,
          country =>
            country.country_code === rep.targeting.geo_locations.country_code
        );
        this.setState(
          {
            ...this.state,
            ...this.props.data,
            campaignInfo: {
              ...rep,
              lifetime_budget_micro: this.props.data.campaignDateChanged
                ? recBudget
                : this.props.data.campaignInfo.lifetime_budget_micro
            },
            value: this.formatNumber(
              this.props.data.campaignDateChanged
                ? recBudget
                : this.props.data.campaignInfo.lifetime_budget_micro
            ),
            recBudget,

            budgetOption: this.props.data.campaignDateChanged
              ? 1
              : this.props.data.budgetOption
          },
          () => {
            if (this.props.data.appChoice) {
              let navAppChoice =
                this.props.data.iosApp_name && this.props.data.androidApp_name
                  ? ""
                  : this.props.data.appChoice;
              let rep = this.state.campaignInfo;
              rep.targeting.devices[0].os_type = navAppChoice;
              this.setState({
                campaignInfo: rep
              });
            }
            this._calcReach();
          }
        );
      }
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  _handleMaxAge = value => {
    let rep = this.state.campaignInfo;
    // rep.targeting.demographics[0].max_age = parseInt(value);
    // segmentEventTrack(`Selected Max Age`, {
    //   campaign_max_age: parseInt(value)
    // });
    this.setState({
      campaignInfo: rep
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({ campaignInfo: rep });
  };

  _handleMinAge = value => {
    let rep = this.state.campaignInfo;
    // rep.targeting.demographics[0].min_age = value;
    // segmentEventTrack(`Selected Min Age`, {
    //   campaign_min_age: parseInt(value)
    // });

    this.setState({
      campaignInfo: rep
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({
      campaignInfo: rep
    });
  };

  onSelectedInterestsChange = selectedItems => {
    // No more used, kept for PICKER component
  };

  onSelectedDevicesChange = selectedItems => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.user_device = selectedItems;
    if (selectedItems.length > 0) {
      // segmentEventTrack(`Selected Devices`, {
      //   campaign_devices_name: selectedItems.join(", ")
      // });
    } else {
      // segmentEventTrack(`Selected No Devices`);
    }
    this.setState({
      campaignInfo: replace
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({
      campaignInfo: replace
    });
  };
  onSelectedInterestsNamesChange = selectedItems => {
    let replace = cloneDeep(this.state.campaignInfo);
    let interestArray =
      selectedItems.length > 0 &&
      selectedItems.map(item => {
        return { name: item.name, id: item.id };
      });
    replace.targeting.flexible_spec[0].interests = interestArray;
    this.setState({});
    this.setState({
      interestNames: selectedItems,
      campaignInfo: replace
    });
    let names = [];
    names = selectedItems.length > 0 && selectedItems.map(item => item.name);
    if (names && names.length > 0)
      // segmentEventTrack(`Selected Interests`, {
      //   campaign_interests_names: names.join(", ")
      // });
      //  !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        interestNames: selectedItems
      });
  };

  onSelectedLangsChange = selectedItem => {
    const { translate } = this.props.screenProps;
    let replace = this.state.campaignInfo;
    let langs = [];
    if (
      replace.targeting.demographics[0].languages.find(r => r === selectedItem)
    ) {
      replace.targeting.demographics[0].languages = replace.targeting.demographics[0].languages.filter(
        r => r !== selectedItem
      );
      langs = replace.targeting.demographics[0].languages;
      // segmentEventTrack(`Selected Languages`, {
      //   campaign_languages: langs.join(", ")
      // });
    } else {
      replace.targeting.demographics[0].languages.push(selectedItem);
      langs = replace.targeting.demographics[0].languages;
      // segmentEventTrack(`Selected Languages`, {
      //   campaign_languages: langs.join(", ")
      // });
    }

    if (replace.targeting.demographics[0].languages.length === 0) {
      // segmentEventTrack(`Error Selecting Language`, {
      //   campaign_languages_error: "Please choose a language"
      // });

      showMessage({
        message: translate("Please choose a language"),
        type: "warning",
        position: "top"
      });
    }
    this.setState({
      campaignInfo: replace,
      languagesError:
        this.state.campaignInfo.targeting.demographics[0].languages.length === 0
          ? "Please choose a language."
          : null
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({ campaignInfo: replace });
  };

  onSelectedOSChange = selectedItem => {
    let replace = this.state.campaignInfo;
    replace.targeting.user_os = [selectedItem];
    replace.targeting.user_device = [];
    replace.targeting.os_version_max = "";
    replace.targeting.os_version_min = "";

    // segmentEventTrack(`Selected OS Type`, {
    //   campaign_os_type: selectedItem === "" ? "ALL" : selectedItem
    // });
    this.setState({
      campaignInfo: { ...replace }
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({
      campaignInfo: { ...replace }
    });
  };

  onSelectedVersionsChange = selectedItem => {
    let replace = this.state.campaignInfo;
    replace.targeting.os_version_min = selectedItem[0];
    replace.targeting.os_version_max = selectedItem[1];
    // segmentEventTrack(`Selected OS Version`, {
    //   campaign_min_version: selectedItem[0],
    //   campaign_max_version: selectedItem[1]
    // });
    this.setState({
      campaignInfo: { ...replace }
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({
      campaignInfo: { ...replace }
    });
  };
  onSelectedBudgetChange = budget => {
    if (budget === this.state.maxValueBudget) {
      showMessage({
        message: "You can also enter your budget manually.",
        type: "success",
        position: "top"
      });
    }
    let replace = this.state.campaignInfo;
    replace.lifetime_budget_micro = budget;
    // segmentEventTrack(`Campaign Budget Change`, {
    //   campaign_budget: this.formatNumber(budget)
    // });
    this.setState({
      campaignInfo: replace,
      value: this.formatNumber(budget)
    });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({
      campaignInfo: replace
    });
  };

  onSelectedRegionChange = (selectedItem, regionName) => {
    let replace = this.state.campaignInfo;
    let rIds = replace.targeting.geo_locations.region_id;
    let rNamesSelected = this.state.regionNames;

    if (selectedItem === -1) {
      if (this.state.regions.length === this.state.regionNames.length) {
        replace.targeting.geo_locations.region_id = [];
        // segmentEventTrack(`Selected No Regions`);
        this.setState({
          regionNames: [],
          campaignInfo: replace
        });
      } else {
        rNamesSelected = this.state.regions.map(r => r.name);
        rIds = this.state.regions.map(r => r.id);
        replace.targeting.geo_locations.region_id = rIds;
        // segmentEventTrack(`Selected Regions`, {
        //   campaign_region_names: rNamesSelected.join(", ")
        // });
        this.setState({
          regionNames: rNamesSelected,
          campaignInfo: replace
        });
      }

      //  !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
        regionNames: rNamesSelected
      });
      return;
    } else {
      // logic change

      // campignInfo region
      if (rIds.find(r => r === selectedItem)) {
        replace.targeting.geo_locations.region_id = rIds.filter(
          r => r !== selectedItem
        );
        rNamesSelected = rNamesSelected.filter(r => r !== regionName);
      } else {
        replace.targeting.geo_locations.region_id.push(selectedItem);
        rNamesSelected.push(regionName);
      }
      // segmentEventTrack(`Selected Regions`, {
      //   campaign_region_names: rNamesSelected.join(", ")
      // });

      this.setState({
        campaignInfo: replace,
        regionNames: rNamesSelected
      });
      //  !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
        regionNames: rNamesSelected
      });
    }
  };

  formatNumber = num => {
    return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  _handleBudget = (value, rawValue, onBlur, budgetOption) => {
    const { translate } = this.props.screenProps;
    if (
      !validateWrapper("Budget", rawValue) &&
      rawValue >= this.state.minValueBudget &&
      !isNan(rawValue)
    ) {
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: rawValue
        },
        value: value,
        budgetOption
      });
      //  !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: rawValue
        },
        budgetOption
      });
      return true;
    } else {
      if (onBlur) {
        if (validateWrapper("Budget", rawValue)) {
          // segmentEventTrack("Error Campaign Budget Change", {
          //   campaign_budget_error:
          //     validateWrapper("Budget", rawValue) +
          //     " $" +
          //     this.state.minValueBudget
          // });
        }
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description: "$" + this.state.minValueBudget,
          type: "warning",
          position: "top"
        });
      }
      // segmentEventTrack("Custom Campaign Budget Change", {
      //   campaign_budget: rawValue
      // });
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: rawValue
        },
        value: value,
        budgetOption
      });
      //  !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: this.state.minValueBudget
        },
        budgetOption
      });

      return false;
    }
  };

  onSelectedGenderChange = gender => {
    let replace = this.state.campaignInfo;
    replace.targeting.genders = [gender];
    // segmentEventTrack(`Selected Gender`, {
    //   campaign_gender: gender === "" ? "ALL" : gender
    // });
    this.setState({ campaignInfo: { ...replace } });
    //  !this.editCampaign &&
    this.props.save_campaign_info_instagram({ campaignInfo: { ...replace } });
  };

  filterLanguages = value => {
    this.setState({ filteredLanguages: value });
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };
  _calcReach = async () => {
    // if (
    //   this.state.campaignInfo.targeting.geo_locations.countries.length > 0
    // ) {

    let r = cloneDeep(this.state.campaignInfo.targeting);

    if (r.genders[0] === "") {
      delete r.genders;
    }

    if (r.user_os[0] === "") {
      delete r.user_os;
      delete r.user_device;
      delete r.os_version_min;
      delete r.os_version_max;
    }
    if (
      !r.flexible_spec[0].interests ||
      r.flexible_spec[0].interests.length === 0
    ) {
      delete r.flexible_spec;
    }

    const obj = {
      targeting: JSON.stringify(r),
      ad_account_id: 123456789012
      //  this.props.mainBusiness.snap_ad_account_id
    };

    let totalReach = {
      geo_locations: {
        countries: r.geo_locations.countries,
        regions: r.geo_locations.regions
      }
    };
    if (totalReach.geo_locations.countries.length === 0) {
      delete totalReach.geo_locations.countries;
    }
    const obj2 = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: 123456789012
      // this.props.mainBusiness.snap_ad_account_id
    };
    // console.log("obj", obj);

    await this.props.instagram_ad_audience_size(obj, obj2);
    // }
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;

    const countryRegionError =
      this.state.campaignInfo.targeting.geo_locations.countries.length === 0 &&
      this.state.campaignInfo.targeting.geo_locations.regions.length === 0;
    if (countryRegionError) {
      showMessage({
        message: translate("Please choose a country"),
        type: "warning",
        position: "top"
      });
    }
    // segment track for error on final submit
    if (
      countryRegionError ||
      !this._handleBudget(
        this.state.value,
        this.state.campaignInfo.lifetime_budget_micro,
        true,
        this.state.budgetOption
      )
    ) {
      // segmentEventTrack("Error on submit ad details", {
      //   campaign_country_error: countryRegionError,
      //   campaign_languages_error: languagesError,
      //   campaign_budget_error: validateWrapper(
      //     "Budget",
      //     this.state.campaignInfo.lifetime_budget_micro
      //   )
      // });
    }
    if (
      this._handleBudget(
        this.state.value,
        this.state.campaignInfo.lifetime_budget_micro,
        true,
        this.state.budgetOption
      ) &&
      !countryRegionError
    ) {
      let interestNamesList = [];
      if (
        this.state.campaignInfo.targeting.flexible_spec[0].interests &&
        this.state.campaignInfo.targeting.flexible_spec[0].interests.length > 0
      ) {
        interestNamesList = this.state.campaignInfo.targeting.flexible_spec[0].interests.map(
          interest => interest.name
        );
      }

      let rep = cloneDeep(this.state.campaignInfo);
      if (rep.targeting.genders[0] === "") {
        delete rep.targeting.genders;
      }
      if (
        rep.targeting.geo_locations.hasOwnProperty("regions") &&
        rep.targeting.geo_locations.regions.length === 0
      ) {
        delete rep.targeting.geo_locations.regions;
      }
      if (
        rep.targeting.hasOwnProperty("flexible_spec") &&
        rep.targeting.flexible_spec[0].interests.length === 0
      ) {
        delete rep.targeting.flexible_spec;
      }

      if (
        rep.targeting.user_os[0] === "" ||
        rep.targeting.user_os[0] === null
      ) {
        delete rep.targeting.user_os[0];
        delete rep.targeting.os_version_max;
        delete rep.targeting.os_version_min;
        delete rep.targeting.user_device;
      }
      if (rep.targeting.os_version_max === "") {
        delete rep.targeting.os_version_max;
        delete rep.targeting.os_version_min;
      }
      if (rep.targeting.user_device && rep.targeting.user_device.length === 0) {
        delete rep.targeting.user_device;
      }
      rep.targeting = JSON.stringify(rep.targeting);

      // if (this.editCampaign) {
      //   Segment.trackWithProperties("Updated Ad Details", {
      //     business_name: this.props.mainBusiness.businessname,
      //     campaign_id: this.props.campaign_id
      //   });
      //   this.props.updateCampaign(
      //     rep,
      //     this.props.mainBusiness.businessid,
      //     this.props.navigation
      //   );
      // } else {

      Segment.trackWithProperties("Submitted Instagram Feed Ad Details", {
        business_name: this.props.mainBusiness.businessname,
        campaign_budget: this.state.campaignInfo.lifetime_budget_micro,
        campaign_id: this.props.campaign_id
      });

      const segmentInfo = {
        checkout_id: this.props.campaign_id,
        step: 4,
        business_name: this.props.mainBusiness.businessname,
        campaign_instagram_budget: this.state.campaignInfo
          .lifetime_budget_micro,
        campaign_instagram_gender:
          this.state.campaignInfo.targeting.genders[0] === ""
            ? "ALL"
            : this.state.campaignInfo.targeting.genders[0],
        // campaign_instagram_max_age: this.state.campaignInfo.targeting.demographics[0]
        //   .max_age,
        // campaign_instagram_min_age: this.state.campaignInfo.targeting.demographics[0]
        //   .min_age,
        // campaign_instagram_country_name: this.state.countryName,
        campaign_instagram_region_names:
          this.state.regionNames && this.state.regionNames.length > 0
            ? this.state.regionNames.join(", ")
            : null,
        // campaign_instagram_languages:
        //   this.state.campaignInfo.targeting.demographics[0].languages &&
        //   this.state.campaignInfo.targeting.demographics[0].languages.length > 0
        //     ? this.state.campaignInfo.targeting.demographics[0].languages.join(
        //         ", "
        //       )
        //     : null,
        campaign_instagram_min_version: this.state.campaignInfo.targeting
          .os_version_min,
        campaign_instagram_max_version: this.state.campaignInfo.targeting
          .os_version_max,
        campaign_instagram_os_type:
          this.state.campaignInfo.targeting.user_os[0] === ""
            ? "ALL"
            : this.state.campaignInfo.targeting.user_os[0],
        campaign_instagram_devices_name:
          this.state.campaignInfo.targeting.user_device &&
          this.state.campaignInfo.targeting.user_device.length > 0
            ? this.state.campaignInfo.targeting.user_device.join(", ")
            : null,
        campaign_instagram_interests_names:
          interestNamesList && interestNamesList.length > 0
            ? interestNamesList.join(", ")
            : null
      };
      // this.props.setCampaignInfoForTransaction({
      //   campaign_id: this.props.campaign_id,
      //   campaign_budget: this.state.campaignInfo.lifetime_budget_micro
      // });

      this.props.ad_details_instagram(rep, this.props.navigation, segmentInfo);
      // }
    }
  };

  selectedItemsId = array => {
    if (array && array.length > 0) {
      return array.map(item => item.id || item.key);
    }
    return [];
  };
  onSelectedCountryRegionChange = item => {
    let replace = this.state.campaignInfo;
    let countryArrayFromSelectedArray = countries.filter(country =>
      item.includes(country.value)
    );
    let regionArrayFromSelectedArray = item;
    // check if country exist
    if (countryArrayFromSelectedArray.length > 0) {
      countryArrayFromSelectedArray = countryArrayFromSelectedArray.map(
        country => country.value
      );
      // filter out regions from selected items array
      regionArrayFromSelectedArray = item.filter(
        key => !countryArrayFromSelectedArray.includes(key)
      );
    }
    replace.targeting.geo_locations.countries = countryArrayFromSelectedArray;

    // name the regions appropriately
    regionArrayFromSelectedArray = allRegions.filter(reg =>
      regionArrayFromSelectedArray.includes(reg.key)
    );

    replace.targeting.geo_locations.regions = regionArrayFromSelectedArray;
    countries.map(country => {
      // filter regionsBasedOnCountries
      let filteredRegionsOnCountry = regionArrayFromSelectedArray.filter(
        reg => reg.country === country.value
      );
      const findOriginalRegionLength = country_regions.find(
        cR => cR.key === country.value
      );

      if (
        findOriginalRegionLength &&
        filteredRegionsOnCountry.length ===
          findOriginalRegionLength.regions.length
      ) {
        //  country name selcted so remove regions from regions array
        replace.targeting.geo_locations.regions = replace.targeting.geo_locations.regions.filter(
          reg => reg.country !== country.value
        );
      } else if (
        findOriginalRegionLength &&
        filteredRegionsOnCountry.length <
          findOriginalRegionLength.regions.length
      ) {
        // all regions was selected initially and now removing ceratin regions from that country
        if (item.includes(country.value)) {
          item.splice(item.indexOf(country.value), 1);
        }
        if (replace.targeting.geo_locations.countries.includes(country.value)) {
          replace.targeting.geo_locations.countries.splice(
            replace.targeting.geo_locations.countries.indexOf(country.value),
            1
          );
        }
      }
    });

    this.setState({
      selectedCountriesAndRegions: item,
      campaignInfo: replace
    });
  };
  onSelectedCountryRegionsObjectsChange = items => {};
  render() {
    const { translate } = this.props.screenProps;
    let { campaignInfo, startEditing } = this.state;

    let menu;

    switch (this.state.sidemenu) {
      case "genders": {
        menu = (
          <GenderOptions
            chanel="instagram"
            selectedGender={this.state.campaignInfo.targeting.genders[0]}
            screenProps={this.props.screenProps}
            campaignInfo={this.state.campaignInfo}
            onSelectedGenderChange={this.onSelectedGenderChange}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      // case "age": {
      //   menu = (
      //     <AgeOption
      //       screenProps={this.props.screenProps}
      //       state={this.state.campaignInfo.targeting.demographics[0]}
      //       _handleMaxAge={this._handleMaxAge}
      //       _handleMinAge={this._handleMinAge}
      //       _handleSideMenuState={this._handleSideMenuState}
      //     />
      //   );
      //   break;
      // }
      // case "regions": {
      //   menu = (
      //     <SelectRegions
      //       screenProps={this.props.screenProps}
      //       countryName={this.state.countryName}
      //       filteredRegions={this.state.filteredRegions}
      //       onSelectedRegionChange={this.onSelectedRegionChange}
      //       _handleSideMenuState={this._handleSideMenuState}
      //       regions={this.state.regions}
      //       region_id={
      //         this.state.campaignInfo.targeting.geo_locations.region_id
      //       }
      //       filterRegions={this.filterRegions}
      //     />
      //   );

      //   break;
      // }
      // case "languages": {
      //   menu = (
      //     <SelectLanguages
      //       screenProps={this.props.screenProps}
      //       filteredLanguages={this.state.filteredLanguages}
      //       onSelectedLangsChange={this.onSelectedLangsChange}
      //       _handleSideMenuState={this._handleSideMenuState}
      //       languages={this.props.languages}
      //       demographics={this.state.campaignInfo.targeting.demographics}
      //       filterLanguages={this.filterLanguages}
      //     />
      //   );

      //   break;
      // }
      case "OS": {
        menu = (
          <SelectOS
            selectedOSType={this.state.campaignInfo.targeting.user_os[0]}
            iosName={"iOS"}
            androidName={"Android"}
            screenProps={this.props.screenProps}
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
              this.state.campaignInfo.targeting.flexible_spec[0].interests
            )}
            selectedDevices={this.state.campaignInfo.targeting.user_device}
            onSelectedDevicesChange={this.onSelectedDevicesChange}
            selectedMinVersions={
              this.state.campaignInfo.targeting.os_version_min
            }
            selectedMaxVersions={
              this.state.campaignInfo.targeting.os_version_max
            }
            onSelectedVersionsChange={this.onSelectedVersionsChange}
            OSType={this.state.campaignInfo.targeting.user_os[0]}
            option={this.state.selectionOption}
          />
        );
        break;
      }
    }
    let countries_names = [];
    countries.forEach(r => {
      if (
        this.state.campaignInfo.targeting.geo_locations.countries &&
        this.state.campaignInfo.targeting.geo_locations.countries.find(
          i => i === r.value
        )
      ) {
        countries_names.push(translate(r.label));
      }
    });
    countries_names = countries_names.join(", ");

    let regions_names = [];
    // this.state.regions.forEach(r => {
    //   if (
    //     this.state.campaignInfo.targeting.geo_locations.region_id &&
    //     this.state.campaignInfo.targeting.geo_locations.region_id.find(
    //       i => i === r.id
    //     )
    //   ) {
    //     regions_names.push(translate(r.name));
    //   }
    // });
    if (this.state.campaignInfo.targeting.geo_locations.regions.length > 0) {
      regions_names = this.state.campaignInfo.targeting.geo_locations.regions.map(
        reg => reg.name
      );
    }
    regions_names = regions_names.join(", ");

    let languages_names = [];
    // this.props.languages.forEach(r => {
    //   if (
    //     this.state.campaignInfo.targeting.demographics[0].languages.find(
    //       i => i === r.id
    //     )
    //   ) {
    //     languages_names.push(translate(r.name));
    //   }
    // });
    // languages_names = languages_names.join(", ");

    let interests_names = [];
    if (
      this.state.campaignInfo.targeting.flexible_spec[0].interests.length > 0
    ) {
      interests_names = this.state.campaignInfo.targeting.flexible_spec[0].interests.map(
        interest => interest.name
      );
    }
    interests_names = interests_names.join(", ");

    const campaign = this.props.navigation.getParam("campaign", {});

    const media =
      this.props.data && this.props.data.media
        ? this.props.data.media
        : this.props.navigation.getParam("media", "//");
    return (
      <Sidemenu
        onChange={isOpen => {
          if (isOpen === false) {
            this._handleSideMenuState(isOpen);
            this._calcReach();
          }
        }}
        disableGestures={true}
        menu={this.state.sidemenustate && menu}
        menuPosition={I18nManager.isRTL ? "left" : "right"}
        openMenuOffset={wp("85%")}
        isOpen={this.state.sidemenustate}
        // edgeHitWidth={-60}
      >
        {!this.editCampaign &&
          (media.includes(".mp4") ||
          media.includes(".mov") ||
          media.includes(".MP4") ||
          media.includes(".MOV") ||
          (campaign.media &&
            (campaign.media.includes(".mp4") ||
              campaign.media.includes(".MP4"))) ||
          (campaign.media &&
            (campaign.media.includes(".mov") ||
              campaign.media.includes(".MOV"))) ? (
            <View style={[styles.backgroundViewWrapper]}>
              <Video
                source={{
                  uri: this.editCampaign ? campaign.media : media
                }}
                shouldPlay
                isLooping
                isMuted
                resizeMode="cover"
                style={styles.videoBackgroundViewWrapper}
              />
            </View>
          ) : (
            <RNImageOrCacheImage
              media={media}
              style={[
                styles.imageBackgroundViewWrapper,
                this.state.sidemenustate && !I18nManager.isRTL
                  ? {
                      borderTopRightRadius: 30
                    }
                  : {},
                this.state.sidemenustate && I18nManager.isRTL
                  ? {
                      borderTopLeftRadius: 30
                    }
                  : {}
              ]}
            />
          ))}

        <SafeAreaView
          style={[
            styles.safeArea,
            {
              backgroundColor: this.editCampaign
                ? "transparent"
                : "rgba(0,0,0,0.75)"
            }
          ]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents
            onDidFocus={() => {
              // this.props.saveCampaignSteps(
              //   this.props.adType === "StoryAd"
              //     ? [
              //         "Dashboard",
              //         "AdObjective",
              //         "AdCover",
              //         "AdDesign",
              //         "AdDetails"
              //       ]
              //     : ["Dashboard", "AdObjective", "AdDesign", "AdDetails"]
              // );
              // if (this.editCampaign) {
              //   Segment.screenWithProperties("Snap Ad Targetting Update", {
              //     category: "Campaign Update"
              //   });
              // } else {
              //   Segment.screenWithProperties("Snap Ad Targetting", {
              //     category: "Campaign Creation",
              //     channel: "snapchat"
              //   });
              //   Segment.trackWithProperties("Viewed Checkout Step", {
              //     checkout_id: this.props.campaign_id,
              //     step: 4
              //   });
              // }
            }}
          />
          <Container style={styles.mainContainer}>
            <Container style={styles.container}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={false}
                segment={{
                  str: "Instagram Feed Ad Details Back Button",
                  obj: {
                    businessname: this.props.mainBusiness.businessname
                  }
                }}
                actionButton={
                  this.editCampaign
                    ? () => this.props.navigation.navigate("CampaignDetails")
                    : undefined
                }
                showTopRightButton={
                  this.editCampaign &&
                  this.state.campaignInfo.campaign_end === "0" &&
                  new Date(this.state.campaignInfo.end_time) > new Date() &&
                  !this.props.campaignEnded &&
                  this.props.mainBusiness.user_role !== "3"
                }
                topRightButtonFunction={() => {
                  this.setState({ startEditing: !startEditing });
                }}
                topRightButtonText={translate("Edit")}
                navigation={
                  this.editCampaign ? undefined : this.props.navigation
                }
                title={this.editCampaign ? "Audience" : "Campaign details"}
              />

              <Content
                scrollEnabled={false}
                contentContainerStyle={styles.contentContainer}
              >
                {!this.editCampaign ? (
                  <>
                    <Text uppercase style={styles.subHeadings}>
                      {translate("Set your budget")}
                    </Text>
                    <BudgetCards
                      value={this.state.value}
                      recBudget={this.state.recBudget}
                      lifetime_budget_micro={
                        this.state.campaignInfo.lifetime_budget_micro
                      }
                      budgetOption={this.state.budgetOption}
                      _handleBudget={this._handleBudget}
                      screenProps={this.props.screenProps}
                    />

                    {/*---------leave if in case we want to use it again---------*/}
                    {/* <View style={styles.sliderContainer}>
                      <View style={styles.budgetSliderText}>
                        <Text style={globalStyles.whiteTextColor}>
                          ${this.state.minValueBudget}
                        </Text>
                        <Text style={globalStyles.whiteTextColor}>
                          ${this.state.maxValueBudget}
                        </Text>
                      </View>

                      <Slider
                        thumbTintColor={globalColors.orange}
                        disabled={this.editCampaign || this.props.loading}
                        style={styles.slider}
                        step={10}
                        minimumValue={this.state.minValueBudget}
                        maximumValue={this.state.maxValueBudget}
                        value={
                          this.state.campaignInfo.lifetime_budget_micro <
                          90000000000000000000
                            ? this.state.campaignInfo.lifetime_budget_micro
                            : 1500
                        }
                        onValueChange={debounce(
                          this.onSelectedBudgetChange,
                          60
                        )}
                        maximumTrackTintColor={globalColors.white}
                        minimumTrackTintColor={globalColors.purple}
                      />
                    </View>
                  */}
                  </>
                ) : (
                  startEditing && (
                    <View style={styles.sliderPlaceHolder}>
                      <Text style={styles.subHeadings}>
                        {translate(
                          "Editing budget and duration\nis currently unavailable"
                        )}
                      </Text>
                    </View>
                  )
                )}
                {startEditing && (
                  <Text
                    uppercase
                    style={[styles.subHeadings, { width: "60%" }]}
                  >
                    {translate("Who would you like to reach?")}
                  </Text>
                )}
                <TargetAudience
                  screenProps={this.props.screenProps}
                  _renderSideMenu={this._renderSideMenu}
                  loading={this.props.loading}
                  gender={gender}
                  targeting={this.state.campaignInfo.targeting}
                  countries_names={countries_names}
                  regions_names={regions_names}
                  languages_names={languages_names}
                  interests_names={interests_names}
                  OSType={OSType}
                  mainState={this.state}
                  translate={translate}
                  editCampaign={this.editCampaign}
                  startEditing={startEditing}
                />

                <ReachBar
                  loading={this.props.loading}
                  campaignInfo={campaignInfo}
                  _handleSubmission={this._handleSubmission}
                  startEditing={startEditing}
                  campaignInfo={campaignInfo}
                  editCampaign={this.editCampaign}
                  screenProps={this.props.screenProps}
                />
              </Content>
            </Container>
          </Container>
        </SafeAreaView>
      </Sidemenu>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.instagramAds.campaign_id,
  minValueBudget: state.instagramAds.minValueBudget,
  maxValueBudget: state.instagramAds.maxValueBudget,
  adType: state.instagramAds.adType,
  data: state.instagramAds.data,
  average_reach: state.instagramAds.average_reach,
  loading: state.instagramAds.loadingDetail,
  mainBusiness: state.account.mainBusiness,
  languages: state.instagramAds.languagesList,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  interests: state.instagramAds.interests,
  campaignDateChanged: state.instagramAds.campaignDateChanged
});

const mapDispatchToProps = dispatch => ({
  ad_details_instagram: (info, navigation, segmentInfo) =>
    dispatch(
      actionCreators.ad_details_instagram(info, navigation, segmentInfo)
    ),
  // updateCampaign: (info, businessid, navigation) =>
  //   dispatch(actionCreators.updateCampaign(info, businessid, navigation)),
  save_campaign_info_instagram: info =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  instagram_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.instagram_ad_audience_size(info, totalReach))
  // get_languages: () => dispatch(actionCreators.get_languages()),
  // saveCampaignSteps: step => dispatch(actionCreators.saveCampaignSteps(step)),
  // setCampaignInfoForTransaction: data =>
  //   dispatch(actionCreators.setCampaignInfoForTransaction(data)),
  // resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  // get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
