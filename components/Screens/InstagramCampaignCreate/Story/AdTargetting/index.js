//Components
import React, { Component } from "react";
import { View, BackHandler, I18nManager } from "react-native";
import { Text, Container, Content } from "native-base";
import { Video } from "expo-av";
import analytics from "@segment/analytics-react-native";
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
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BudgetCards } from "./BudgetCards";
import { TargetAudience } from "./TargetAudience";
import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";

class InstagramStoryAdTargetting extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
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
              interests: [],
            },
          ],
          user_os: [""],
          user_device: [],
          os_version_min: "",
          os_version_max: "",
          geo_locations: { countries: [], regions: [] },
        },
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
      selectedGender: "",
      recBudget: 0,
      budgetOption: 1,
      startEditing: true,
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
        filteredLanguages: this.props.languages,
      });
    }
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  async componentDidMount() {
    if (this.editCampaign) {
      let editedCampaign = deepmerge(
        this.state.campaignInfo,
        this.props.navigation.getParam("campaign", {}),
        { arrayMerge: combineMerge }
      );

      getCountryName = editedCampaign.targeting.geo_locations.countries.map(
        (country) =>
          countries.find((count) => country.toLowerCase() === count.value)
      ).label;
      let editCountryAndRegionSelection = editedCampaign.targeting.geo_locations.regions.map(
        (reg, i) => {
          if (i === 0) {
            return reg.country;
          } else {
            return reg.key;
          }
        }
      );
      let editCountryRegions = [];
      //this is to get all the regions of a country since countries is passed only with
      //the country keys when editing a campiagn
      editedCampaign.targeting.geo_locations.countries.forEach((cou) => {
        editCountryRegions = country_regions
          .find((region) => cou.toLowerCase() === region.key.toLowerCase())
          .regions.map((regKey) => regKey.key);
      });
      editCountryAndRegionSelection.push(
        ...editedCampaign.targeting.geo_locations.countries
      );
      editCountryAndRegionSelection.push(...editCountryRegions);
      this.onSelectedCountryRegionChange(editCountryAndRegionSelection);
      if (!editedCampaign.targeting.hasOwnProperty("user_os")) {
        editedCampaign.targeting["user_os"] = [""];
      } else {
        editedCampaign.targeting["user_os"] = this.props.navigation.getParam(
          "campaign",
          {
            targeting: { user_os: [""] },
          }
        ).targeting.user_os;
      }
      if (!editedCampaign.targeting.hasOwnProperty("genders")) {
        editedCampaign.targeting["genders"] = [""];
      } else {
        editedCampaign.targeting["genders"] = this.props.navigation.getParam(
          "campaign",
          {
            targeting: { genders: [""] },
          }
        ).targeting.genders;
      }
      let selectedGender = "";
      switch (editedCampaign.targeting.genders[0]) {
        case "1":
          selectedGender = "MALE";
          break;
        case "2":
          selectedGender = "FEMALE";
          break;
        default:
          selectedGender = "";
          break;
      }
      this.setState(
        {
          campaignInfo: editedCampaign,
          startEditing: false,
          selectedGender,
        },
        () => this._calcReach()
      );
    } else {
      let duration = Math.round(
        Math.abs(
          (new Date(this.props.data.start_time).getTime() -
            new Date(this.props.data.end_time).getTime()) /
            86400000
        ) + 1
      );

      let recBudget = duration * 75;

      let country_code = country_regions.find(
        (country) => country.name === this.props.mainBusiness.country
      ).key;
      let allCountryRegions = country_regions
        .find((country) => country.name === this.props.mainBusiness.country)
        .regions.map((reg) => reg.key);
      await this.onSelectedCountryRegionChange([
        country_code,
        ...allCountryRegions,
      ]);
      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            campaign_id: this.props.campaign_id,
            lifetime_budget_micro: recBudget,
          },
          minValueBudget: this.props.data.minValueBudget,
          maxValueBudget: this.props.data.maxValueBudget,
          value: this.formatNumber(recBudget),
          recBudget: recBudget,
        },
        () => {
          this._calcReach();
        }
      );

      if (this.props.data.hasOwnProperty("campaignInfo")) {
        rep = { ...this.state.campaignInfo, ...this.props.data.campaignInfo };
        // console.log("data campaignInfo", this.props.data);

        this.setState(
          {
            ...this.state,
            ...this.props.data,
            campaignInfo: {
              ...rep,
              lifetime_budget_micro: this.props.data.campaignDateChanged
                ? recBudget
                : this.props.data.campaignInfo.lifetime_budget_micro,
              campaign_id: this.props.campaign_id,
            },
            value: this.formatNumber(
              this.props.data.campaignDateChanged
                ? recBudget
                : this.props.data.campaignInfo.lifetime_budget_micro
            ),
            recBudget,

            budgetOption: this.props.data.campaignDateChanged
              ? 1
              : this.props.data.budgetOption,
          },
          () => {
            if (this.props.data.appChoice) {
              let navAppChoice = this.props.data.appChoice;
              let rep = this.state.campaignInfo;
              rep.targeting.user_os = [navAppChoice];
              this.setState({
                campaignInfo: rep,
              });
            }
            this._calcReach();
          }
        );
      }
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // _handleMaxAge = value => {
  //   let rep = this.state.campaignInfo;
  //   // rep.targeting.demographics[0].max_age = parseInt(value);
  //   // segmentEventTrack(`Selected Max Age`, {
  //   //   campaign_max_age: parseInt(value)
  //   // });
  //   this.setState({
  //     campaignInfo: rep
  //   });
  //  !this.editCampaign &&
  //   this.props.save_campaign_info_instagram({ campaignInfo: rep });
  // };

  // _handleMinAge = value => {
  //   let rep = this.state.campaignInfo;
  //   // rep.targeting.demographics[0].min_age = value;
  //   // segmentEventTrack(`Selected Min Age`, {
  //   //   campaign_min_age: parseInt(value)
  //   // });

  //   this.setState({
  //     campaignInfo: rep
  //   });
  //  !this.editCampaign &&
  //   this.props.save_campaign_info_instagram({
  //     campaignInfo: rep
  //   });
  // };

  onSelectedInterestsChange = (selectedItems) => {
    // No more used, kept for PICKER component
  };

  onSelectedDevicesChange = (selectedItems) => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.user_device = selectedItems;
    analytics.track(`a_ad_devices`, {
      source: "ad_targeting",
      source_action: "a_ad_devices",
      campaign_devices_name:
        selectedItems.length > 0 ? selectedItems.join(", ") : "",
    });

    this.setState({
      campaignInfo: replace,
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
      });
  };
  onSelectedInterestsNamesChange = (selectedItems) => {
    let replace = cloneDeep(this.state.campaignInfo);
    let interestArray =
      selectedItems.length > 0 &&
      selectedItems.map((item) => {
        return { name: item.name, id: item.id };
      });
    replace.targeting.flexible_spec[0].interests = interestArray;
    this.setState({});
    this.setState({
      interestNames: selectedItems,
      campaignInfo: replace,
    });
    let names = [];
    names = selectedItems.length > 0 && selectedItems.map((item) => item.name);
    analytics.track(`a_ad_interests`, {
      source: "ad_targeting",
      source_action: "a_ad_interests",
      campaign_interests_names: names && names.length > 0 && names.join(", "),
    });
    if (names && names.length > 0)
      !this.editCampaign &&
        this.props.save_campaign_info_instagram({
          campaignInfo: replace,
        });
  };

  // onSelectedLangsChange = selectedItem => {
  //   const { translate } = this.props.screenProps;
  //   let replace = this.state.campaignInfo;
  //   let langs = [];
  //   if (
  //     replace.targeting.demographics[0].languages.find(r => r === selectedItem)
  //   ) {
  //     replace.targeting.demographics[0].languages = replace.targeting.demographics[0].languages.filter(
  //       r => r !== selectedItem
  //     );
  //     langs = replace.targeting.demographics[0].languages;
  //     // segmentEventTrack(`Selected Languages`, {
  //     //   campaign_languages: langs.join(", ")
  //     // });
  //   } else {
  //     replace.targeting.demographics[0].languages.push(selectedItem);
  //     langs = replace.targeting.demographics[0].languages;
  //     // segmentEventTrack(`Selected Languages`, {
  //     //   campaign_languages: langs.join(", ")
  //     // });
  //   }

  //   if (replace.targeting.demographics[0].languages.length === 0) {
  //     // segmentEventTrack(`Error Selecting Language`, {
  //     //   campaign_languages_error: "Please choose a language"
  //     // });

  //     showMessage({
  //       message: translate("Please choose a language"),
  //       type: "warning",
  //       position: "top"
  //     });
  //   }
  //   this.setState({
  //     campaignInfo: replace,
  //     languagesError:
  //       this.state.campaignInfo.targeting.demographics[0].languages.length === 0
  //         ? "Please choose a language."
  //         : null
  //   });
  //  !this.editCampaign &&
  //   this.props.save_campaign_info_instagram({ campaignInfo: replace });
  // };

  onSelectedOSChange = (selectedItem) => {
    let replace = this.state.campaignInfo;
    replace.targeting.user_os = [selectedItem];
    replace.targeting.user_device = [];
    replace.targeting.os_version_max = "";
    replace.targeting.os_version_min = "";

    // segmentEventTrack(`Selected OS Type`, {
    //   campaign_os_type: selectedItem === "" ? "ALL" : selectedItem
    // });
    analytics.track(`a_ad_OS_type`, {
      source: "ad_targeting",
      source_action: "a_ad_OS_type",
      campaign_os_type: selectedItem === "" ? "ALL" : selectedItem,
      campaign_os_min_ver: "",
      campaign_os_max_ver: "",
    });
    this.setState({
      campaignInfo: { ...replace },
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: { ...replace },
      });
  };

  onSelectedVersionsChange = (selectedItem) => {
    let replace = this.state.campaignInfo;
    replace.targeting.os_version_min = selectedItem[0];
    replace.targeting.os_version_max = selectedItem[1];
    analytics.track(`a_ad_OS_version`, {
      source: "ad_targeting",
      source_action: "a_ad_OS_version",
      campaign_os_min_ver: selectedItem[0],
      campaign_os_max_ver: selectedItem[1],
    });

    this.setState({
      campaignInfo: { ...replace },
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: { ...replace },
      });
  };
  onSelectedBudgetChange = (budget) => {
    if (budget === this.state.maxValueBudget) {
      showMessage({
        message: "You can also enter your budget manually.",
        type: "success",
        position: "top",
      });
    }
    let replace = this.state.campaignInfo;
    replace.lifetime_budget_micro = budget;
    // segmentEventTrack(`Campaign Budget Change`, {
    //   campaign_budget: this.formatNumber(budget)
    // });
    this.setState({
      campaignInfo: replace,
      value: this.formatNumber(budget),
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
      });
  };

  // onSelectedRegionChange = (selectedItem, regionName) => {
  //   let replace = this.state.campaignInfo;
  //   let rIds = replace.targeting.geo_locations.region_id;
  //   let rNamesSelected = this.state.regionNames;

  //   if (selectedItem === -1) {
  //     if (this.state.regions.length === this.state.regionNames.length) {
  //       replace.targeting.geo_locations.region_id = [];
  //       // segmentEventTrack(`Selected No Regions`);
  //       this.setState({
  //         regionNames: [],
  //         campaignInfo: replace
  //       });
  //     } else {
  //       rNamesSelected = this.state.regions.map(r => r.name);
  //       rIds = this.state.regions.map(r => r.id);
  //       replace.targeting.geo_locations.region_id = rIds;
  //       // segmentEventTrack(`Selected Regions`, {
  //       //   campaign_region_names: rNamesSelected.join(", ")
  //       // });
  //       this.setState({
  //         regionNames: rNamesSelected,
  //         campaignInfo: replace
  //       });
  //     }

  //  !this.editCampaign &&
  //     this.props.save_campaign_info_instagram({
  //       campaignInfo: replace,
  //       regionNames: rNamesSelected
  //     });
  //     return;
  //   } else {
  //     // logic change

  //     // campignInfo region
  //     if (rIds.find(r => r === selectedItem)) {
  //       replace.targeting.geo_locations.region_id = rIds.filter(
  //         r => r !== selectedItem
  //       );
  //       rNamesSelected = rNamesSelected.filter(r => r !== regionName);
  //     } else {
  //       replace.targeting.geo_locations.region_id.push(selectedItem);
  //       rNamesSelected.push(regionName);
  //     }
  //     // segmentEventTrack(`Selected Regions`, {
  //     //   campaign_region_names: rNamesSelected.join(", ")
  //     // });

  //     this.setState({
  //       campaignInfo: replace,
  //       regionNames: rNamesSelected
  //     });
  //  !this.editCampaign &&
  //     this.props.save_campaign_info_instagram({
  //       campaignInfo: replace,
  //       regionNames: rNamesSelected
  //     });
  //   }
  // };

  formatNumber = (num) => {
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
          lifetime_budget_micro: rawValue,
        },
        value: value,
        budgetOption,
      });
      analytics.track(`a_handle_budget`, {
        source: "ad_targeting",
        source_action: "a_handle_budget",
        custom_budget: false,
        campaign_budget: rawValue,
      });
      !this.editCampaign &&
        this.props.save_campaign_info_instagram({
          campaignInfo: {
            ...this.state.campaignInfo,
            lifetime_budget_micro: rawValue,
          },
          budgetOption,
        });
      return true;
    } else {
      if (onBlur) {
        if (validateWrapper("Budget", rawValue)) {
          analytics.track(`a_error_form`, {
            error_page: "ad_targeting",
            source_action: "a_change_campaign_custom_budget",
            error_description:
              validateWrapper("Budget", rawValue) +
              " $" +
              this.props.campaign.minValueBudget,
          });
        }
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description: "$" + this.state.minValueBudget,
          type: "warning",
          position: "top",
        });
      }
      // segmentEventTrack("Custom Campaign Budget Change", {
      //   campaign_budget: rawValue
      // });
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: rawValue,
        },
        value: value,
        budgetOption,
      });
      !this.editCampaign &&
        this.props.save_campaign_info_instagram({
          campaignInfo: {
            ...this.state.campaignInfo,
            lifetime_budget_micro: this.state.minValueBudget,
          },
          budgetOption,
        });

      return false;
    }
  };

  onSelectedGenderChange = (gender) => {
    let replace = this.state.campaignInfo;
    let x = "";
    switch (gender) {
      case "MALE":
        x = "1";
        break;
      case "FEMALE":
        x = "2";
        break;
      default:
        x = "";
        break;
    }
    replace.targeting.genders = [x];

    analytics.track(`a_ad_gender`, {
      source: "ad_targeting",
      source_action: "a_ad_gender",
      campaign_gender: replace.targeting.genders,
    });
    this.setState({ campaignInfo: { ...replace }, selectedGender: gender });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({ campaignInfo: { ...replace } });
  };

  // filterLanguages = value => {
  //   this.setState({ filteredLanguages: value });
  // };

  _handleSideMenuState = (status) => {
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
    let totalReach = {
      geo_locations: {
        countries: r.geo_locations.countries,
        regions: r.geo_locations.regions,
      },
    };
    if (r.geo_locations.countries.length === 0) {
      delete r.geo_locations.countries;
    }
    if (r.geo_locations.regions.length === 0) {
      delete r.geo_locations.regions;
    }
    if (
      !r.geo_locations.hasOwnProperty("regions") &&
      !r.geo_locations.hasOwnProperty("countries")
    ) {
      delete r.geo_locations;
    }
    if (r.genders[0] === "") {
      delete r.genders;
    }

    if (r.user_os[0] === "") {
      r.user_os = [];
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

    if (r.user_device && r.user_device.length === 0) {
      delete r.user_device;
    }
    if (r.os_version_min === "") {
      delete r.os_version_min;
    }
    if (r.os_version_max === "") {
      delete r.os_version_max;
    }
    const obj = {
      targeting: JSON.stringify(r),
      ad_account_id: this.props.mainBusiness.fb_ad_account_id,
    };

    if (totalReach.geo_locations.countries.length === 0) {
      delete totalReach.geo_locations.countries;
    }
    if (totalReach.geo_locations.regions.length === 0) {
      delete totalReach.geo_locations.regions;
    }
    if (
      !totalReach.geo_locations.hasOwnProperty("regions") &&
      !totalReach.geo_locations.hasOwnProperty("countries")
    ) {
      delete totalReach.geo_locations;
    }
    const obj2 = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: this.props.mainBusiness.fb_ad_account_id,
    };
    // console.log("obj2", obj2);

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
        position: "top",
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
      analytics.track(`a_error_form`, {
        error_page: "ad_targeting",
        source_action: "a_submit_ad_targeting",
        campaign_id: this.props.data.campaign_id,
        campaign_channel: "instagram",
        campaign_ad_type: "InstagramStoryAd",
        error_description:
          countryRegionError ||
          validateWrapper(
            "Budget",
            this.state.campaignInfo.lifetime_budget_micro
          ),
      });
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
          (interest) => interest.name
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

      if (rep.targeting.user_os[0] === "") {
        delete rep.targeting.user_os;
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
      const segmentInfo = {
        campaign_ad_type: "InstagramStoryAd",
        campaign_id: this.props.campaign_id,
        campaign_budget: this.state.campaignInfo.lifetime_budget_micro,
        campaign_gender:
          this.state.campaignInfo.targeting.genders[0] === ""
            ? "ALL"
            : this.state.campaignInfo.targeting.genders[0],
        campaign_region_names:
          this.state.regionNames && this.state.regionNames.length > 0
            ? this.state.regionNames.join(", ")
            : null,

        campaign_min_version: this.state.campaignInfo.targeting.os_version_min,
        campaign_max_version: this.state.campaignInfo.targeting.os_version_max,
        campaign_os_type:
          this.state.campaignInfo.targeting.user_os[0] === ""
            ? "ALL"
            : this.state.campaignInfo.targeting.user_os[0],
        campaign_devices_name:
          this.state.campaignInfo.targeting.user_device &&
          this.state.campaignInfo.targeting.user_device.length > 0
            ? this.state.campaignInfo.targeting.user_device.join(", ")
            : null,
        campaign_interests_names:
          interestNamesList && interestNamesList.length > 0
            ? interestNamesList.join(", ")
            : null,
      };
      if (this.editCampaign) {
        this.props.updateInstagramCampaign(
          rep,
          this.props.mainBusiness.businessid,
          this.props.navigation,
          segmentInfo
        );
      } else {
        // this.props.setCampaignInfoForTransaction({
        //   campaign_id: this.props.campaign_id,
        //   campaign_budget: this.state.campaignInfo.lifetime_budget_micro
        // });

        this.props.ad_details_instagram(
          rep,
          this.props.navigation,
          segmentInfo
        );
      }
    }
  };

  selectedItemsId = (array) => {
    if (array && array.length > 0) {
      return array.map((item) => item.id || item.key);
    }
    return [];
  };
  // For picker not to crash
  onSelectedCountryRegionChange = (item) => {
    let replace = this.state.campaignInfo;
    let countryArrayFromSelectedArray = countries.filter((country) =>
      item.includes(country.value)
    );
    let regionArrayFromSelectedArray = item;
    // check if country exist
    if (countryArrayFromSelectedArray.length > 0) {
      countryArrayFromSelectedArray = countryArrayFromSelectedArray.map(
        (country) => country.value
      );
      // filter out regions from selected items array
      regionArrayFromSelectedArray = item.filter(
        (key) => !countryArrayFromSelectedArray.includes(key)
      );
    }
    replace.targeting.geo_locations.countries = countryArrayFromSelectedArray;

    // name the regions appropriately
    regionArrayFromSelectedArray = allRegions.filter((reg) =>
      regionArrayFromSelectedArray.includes(reg.key)
    );

    replace.targeting.geo_locations.regions = regionArrayFromSelectedArray;
    countries.map((country) => {
      // filter regionsBasedOnCountries
      let filteredRegionsOnCountry = regionArrayFromSelectedArray.filter(
        (reg) => reg.country === country.value
      );
      const findOriginalRegionLength = country_regions.find(
        (cR) => cR.key === country.value
      );

      if (
        findOriginalRegionLength &&
        filteredRegionsOnCountry.length ===
          findOriginalRegionLength.regions.length
      ) {
        //  country name selcted so remove regions from regions array
        replace.targeting.geo_locations.regions = replace.targeting.geo_locations.regions.filter(
          (reg) => reg.country !== country.value
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
    analytics.track(`a_ad_regions`, {
      source: "ad_targeting",
      source_action: "a_ad_regions",
      campaign_region_names: replace.targeting.geo_locations.regions,
    });

    this.setState({
      selectedCountriesAndRegions: item,
      campaignInfo: replace,
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: { ...replace },
        selectedCountriesAndRegions: item, //to save the selection of countries and regions if they resumed
      });
  };
  onSelectedCountryRegionsObjectsChange = (items) => {};
  render() {
    const { translate } = this.props.screenProps;
    let { campaignInfo, startEditing } = this.state;

    let menu;

    switch (this.state.sidemenu) {
      case "genders": {
        menu = (
          <GenderOptions
            chanel="instagram"
            selectedGender={this.state.selectedGender}
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
            objective={this.props.data.objective}
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
            selectedVersions={[
              this.state.campaignInfo.targeting.os_version_min,
              this.state.campaignInfo.targeting.os_version_max,
            ]}
            onSelectedVersionsChange={this.onSelectedVersionsChange}
            OSType={this.state.campaignInfo.targeting.user_os[0]}
            option={this.state.selectionOption}
          />
        );
        break;
      }
    }
    let countries_names = [];
    countries.forEach((r) => {
      if (
        this.state.campaignInfo.targeting.geo_locations.countries &&
        this.state.campaignInfo.targeting.geo_locations.countries.find(
          (i) => i === r.value
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
        (reg) => reg.name
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
        (interest) => interest.name
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
        onChange={(isOpen) => {
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
        <View
          style={[
            styles.safeArea,
            {
              backgroundColor: this.editCampaign
                ? "transparent"
                : "rgba(0,0,0,0.75)",
            },
          ]}
        >
          <SafeAreaView
            style={[
              {
                backgroundColor: this.editCampaign ? "transparent" : "#fff",
              },
            ]}
            forceInset={{ bottom: "never", top: "always" }}
          />
          <NavigationEvents
            onDidFocus={() => {
              if (
                !this.props.currentCampaignSteps.includes(
                  "InstagramAdPaymentReview"
                ) &&
                !this.editCampaign
              ) {
                this.props.saveCampaignSteps([
                  "Dashboard",
                  "InstagramStoryAdObjective",
                  "InstagramStoryAdDesign",
                  "InstagramStoryAdTargetting",
                ]);
              }
            }}
          />
          <Container style={styles.mainContainer}>
            <Container style={styles.container}>
              {!this.editCampaign ? (
                <TopStepsHeader
                  screenProps={this.props.screenProps}
                  closeButton={false}
                  segment={{
                    str: "Instagram Story Ad Details Back Button",
                    obj: {
                      businessname: this.props.mainBusiness.businessname,
                    },
                    source: "ad_targeting",
                    source_action: "a_go_back",
                  }}
                  icon="instagram"
                  currentScreen="Audience"
                  actionButton={
                    this.editCampaign
                      ? () => this.props.navigation.goBack()
                      : undefined
                  }
                  navigation={
                    this.editCampaign ? undefined : this.props.navigation
                  }
                  title={this.editCampaign ? "Audience" : "Campaign details"}
                />
              ) : (
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={false}
                  segment={{
                    str: "Instagram Story Ad Details Back Button",
                    obj: {
                      businessname: this.props.mainBusiness.businessname,
                    },
                    source: "ad_targeting",
                    source_action: "a_go_back",
                  }}
                  actionButton={
                    this.editCampaign
                      ? () => this.props.navigation.goBack()
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
              )}

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
                  gender={this.state.selectedGender}
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
        </View>
      </Sidemenu>
    );
  }
}

const mapStateToProps = (state) => ({
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
  campaignDateChanged: state.instagramAds.campaignDateChanged,
});

const mapDispatchToProps = (dispatch) => ({
  ad_details_instagram: (info, navigation, segmentInfo) =>
    dispatch(
      actionCreators.ad_details_instagram(info, navigation, segmentInfo)
    ),
  updateInstagramCampaign: (info, businessid, navigation) =>
    dispatch(
      actionCreators.updateInstagramCampaign(info, businessid, navigation)
    ),
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  instagram_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.instagram_ad_audience_size(info, totalReach)),
  // get_languages: () => dispatch(actionCreators.get_languages()),
  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),
  // setCampaignInfoForTransaction: data =>
  //   dispatch(actionCreators.setCampaignInfoForTransaction(data)),
  // resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  // get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramStoryAdTargetting);