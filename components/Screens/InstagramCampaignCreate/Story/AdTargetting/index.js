//Components
import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  I18nManager,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Container, Content, Row, Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
// import Sidemenu from "react-native-side-menu";
import Sidemenu from "../../../../MiniComponents/SideMenu";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { RFValue } from "react-native-responsive-fontsize";
let LocationMap = null;
import SnapchatLocation from "../../../../MiniComponents/SnapchatLocation";

import ReachBar from "./ReachBar";
import SelectRegions from "../../../../MiniComponents/SelectRegionsInstagram";
import SelectLanguages from "../../../../MiniComponents/SelectLanguages";
import GenderOptions from "../../../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../../../MiniComponents/AgeOptions/AgeOption";
import MultiSelectSections from "../../../../MiniComponents/MultiSelectInstagram/MultiSelect";
import CustomHeader from "../../../../MiniComponents/Header";
import SelectOS from "../../../../MiniComponents/SelectOS";
import { showMessage } from "react-native-flash-message";
import InstagramAudienceList from "../../../InstagramCampaignAudienceList";

//Data
import countries, {
  gender,
  OSType,
  country_regions,
  allRegions,
  mothersDayTargeting,
  mothersDayCustomInterest,
  mothersDayCustomInterestObject,
} from "./data";

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
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BudgetCards } from "./BudgetCards";
import { TargetAudience } from "./TargetAudience";
import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";
import { globalColors } from "../../../../../GlobalStyles";

import AudienceIcon from "../../../../../assets/SVGs/AudienceOutline";
import WalletIcon from "../../../../../assets/SVGs/WalletOutline";
import PurplePlusIcon from "../../../../../assets/SVGs/PurplePlusIcon";
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
          geo_locations: { countries: [], regions: [], custom_locations: [] },
          age_max: 65,
          age_min: 18,
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
      customInterests: [],
      selectedAllRegions: false,
      showAudienceList: false,
      locationsInfo: [],
    };
    this.editCampaign = this.props.navigation.getParam("editCampaign", false);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps, prevState) {
    // if(this.prevProps)
    // if (!isEqual(prevProps.languages, this.props.languages)) {
    //   //   const campaign = { ...this.state.campaignInfo };
    //   //   campaign.targeting.demographics[0].languages = this.props.languages.map(
    //   //     lang => lang.id
    //   //   );
    //   this.setState({
    //     // campaignInfo: campaign,
    //     filteredLanguages: this.props.languages,
    //   });
    // }
    if (
      prevState.campaignInfo.targeting.geo_locations.countries.length !==
      this.state.campaignInfo.targeting.geo_locations.countries.length
    ) {
      this.handleMultipleCountrySelection();
    }
  }
  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    if (this.state.sidemenustate) {
      if (
        this.state.sidemenu === "map" &&
        this.state.locationsInfo &&
        this.state.locationsInfo.length === 0
      ) {
        this.onSelectedMapChange([], true, []);
        this.props.deleteCustomLocation("all");
      }
      this._handleSideMenuState(false);
    } else this.props.navigation.goBack();
    return true;
  };
  async componentDidMount() {
    this.props.getAudienceList();

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
      // if (!editedCampaign.targeting.hasOwnProperty("user_os")) {
      //   editedCampaign.targeting["user_os"] = [""];
      // } else {
      //   editedCampaign.targeting["user_os"] = this.props.navigation.getParam(
      //     "campaign",
      //     {
      //       targeting: { user_os: [""] },
      //     }
      //   ).targeting.user_os;
      // }
      // if (!editedCampaign.targeting.hasOwnProperty("genders")) {
      //   editedCampaign.targeting["genders"] = [""];
      // } else {
      //   editedCampaign.targeting["genders"] = this.props.navigation.getParam(
      //     "campaign",
      //     {
      //       targeting: { genders: [""] },
      //     }
      //   ).targeting.genders;
      // }

      let selectedGender = "";
      switch (editedCampaign.targeting.genders[0]) {
        case "1":
          selectedGender = "1";
          break;
        case "2":
          selectedGender = "2";
          break;
        default:
          selectedGender = "";
          break;
      }
      let editedMapLocation = [];
      let markers = [];
      if (editedCampaign.coordinates) {
        editedMapLocation = cloneDeep(JSON.parse(editedCampaign.coordinates));
        markers = cloneDeep(
          editedCampaign.targeting.geo_locations.custom_locations
        );
      }
      this.setState(
        {
          campaignInfo: editedCampaign,
          startEditing: false,
          selectedGender,
          locationsInfo: editedMapLocation,
          markers,
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

      let recBudget = 75;

      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            campaign_id: this.props.campaign_id,
            lifetime_budget_micro: recBudget * 2,
          },
          minValueBudget: 25,
          maxValueBudget: 1500,
          value: this.formatNumber(recBudget * 2),
          recBudget: recBudget,
          duration,
        },
        async () => {
          let targeting = mothersDayTargeting;

          let customInterests = [];
          let customInterestObjects = [];
          if (this.props.data.hasOwnProperty("campaignInfo")) {
            let rep = {
              ...this.state.campaignInfo,
              ...this.props.data.campaignInfo,
            };
            if (this.props.data.objectiveLabel === "Mother's Day") {
              rep.targeting = {
                ...this.state.campaignInfo.targeting,
                ...this.props.data.campaignInfo.targeting,
                ...targeting,
              };
              customInterests = mothersDayCustomInterest;
              customInterestObjects = mothersDayCustomInterestObject;
            }
            // console.log("data campaignInfo", this.props.data);
            let minValueBudget =
              25 * rep.targeting.geo_locations.countries.length;
            recBudget *= rep.targeting.geo_locations.countries.length;
            this.setState(
              {
                ...this.state,
                ...this.props.data,
                campaignInfo: {
                  ...rep,
                  lifetime_budget_micro:
                    this.props.data && this.props.data.campaignDateChanged
                      ? recBudget * 2
                      : this.props.data
                      ? this.props.data.campaignInfo.lifetime_budget_micro
                      : 50,
                  campaign_id: this.props.campaign_id,
                  targeting: {
                    ...rep.targeting,
                    age_max: rep.targeting.age_max ? rep.targeting.age_max : 65,
                    age_min: rep.targeting.age_min ? rep.targeting.age_min : 18,
                  },
                },
                value: this.formatNumber(
                  this.props.data && this.props.data.campaignDateChanged
                    ? recBudget * 2
                    : this.props.data
                    ? this.props.data.campaignInfo.lifetime_budget_micro
                    : 50
                ),
                recBudget,
                budgetOption: this.props.data.campaignDateChanged
                  ? 1
                  : !isNull(this.props.data.budgetOption) ||
                    !isUndefined(this.props.data.budgetOption)
                  ? this.props.data.budgetOption
                  : 1,
                customInterests: this.props.data.customInterests
                  ? this.props.data.customInterests
                  : customInterests,
                minValueBudget,
                customInterestObjects,
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
                this.props.save_campaign_info_instagram({
                  budgetOption: this.state.budgetOption,
                });
              }
            );
          } else {
            if (this.props.data.objectiveLabel === "Mother's Day") {
              await this.setState({
                campaignInfo: {
                  ...this.state.campaignInfo,

                  targeting: {
                    ...this.state.campaignInfo.targeting,
                    ...targeting,
                  },
                },
                customInterests: mothersDayCustomInterest,
                customInterestObjects: mothersDayCustomInterestObject,
              });
            }
            if (this.props.data && this.props.data.appChoice) {
              let navAppChoice = this.props.data.appChoice;
              let rep = this.state.campaignInfo;
              rep.targeting.user_os = [navAppChoice];
              this.setState({
                campaignInfo: rep,
              });
            }
            let country_code = country_regions.find(
              (country) => country.name === this.props.mainBusiness.country
            ).key;

            await this.onSelectedCountryRegionChange(country_code);
          }
          await this._calcReach();
        }
      );
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  _handleAge = (values) => {
    let rep = cloneDeep(this.state.campaignInfo);
    rep.targeting.age_min = parseInt(values[0]);
    rep.targeting.age_max = parseInt(values[1]);

    analytics.track(`a_ad_age`, {
      source: "ad_targeting",
      source_action: "a_ad_age",
      campaign_min_age: parseInt(values[0]),
      campaign_max_age: parseInt(values[1]),
    });
    this.setState({
      campaignInfo: rep,
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: rep,
      });
  };
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
  onSelectedInterestsNamesChange = (selectedItems, custom = false) => {
    let replace = cloneDeep(this.state.campaignInfo);
    let interestArray =
      selectedItems.length > 0
        ? selectedItems.map((item) => {
            if (item) return { name: item.name, id: item.id };
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
    let names = [];
    // names = selectedItems.length > 0 && selectedItems.map((item) => item.name);
    analytics.track(`a_ad_interests`, {
      source: "ad_targeting",
      source_action: "a_ad_interests",
      campaign_interests_names: names && names.length > 0 && names.join(", "),
    });
    // if (names && names.length > 0)
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
        customInterests: custom ? interestArray : this.state.customInterests,
        customInterestObjects: custom
          ? selectedItems
          : this.props.data.customInterestObjects,
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
  //
  //   } else {
  //     replace.targeting.demographics[0].languages.push(selectedItem);
  //     langs = replace.targeting.demographics[0].languages;

  //   }

  //   if (replace.targeting.demographics[0].languages.length === 0) {

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

    this.setState({
      campaignInfo: replace,
      value: this.formatNumber(budget),
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
      });
  };

  onSelectedRegionChange = (selectedItem) => {
    let replace = cloneDeep(this.state.campaignInfo);
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

    this.setState({
      campaignInfo: replace,
      regions: regionsArray,
      selectedAllRegions: selectedAllRegions,
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: replace,
      });
  };

  formatNumber = (num) => {
    return (
      "$" +
      num
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
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
              this.state.minValueBudget,
          });
        }
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description:
            this.state.campaignInfo.targeting.geo_locations.countries.length > 1
              ? `$25 x ${translate("no of Countries")} = $${
                  this.state.minValueBudget
                }`
              : "$" + this.state.minValueBudget,
          type: "warning",
          position: "top",
        });
      }

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
    let replace = cloneDeep(this.state.campaignInfo);
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
    analytics.track(`a_ad_gender`, {
      source: "ad_targeting",
      source_action: "a_ad_gender",
      campaign_gender: replace.targeting.genders,
    });
    this.setState({ campaignInfo: { ...replace }, selectedGender: gender });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({ campaignInfo: { ...replace } });
    this._calcReach();
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
    if (
      r.flexible_spec[0].interests.length > 0 &&
      this.state.customInterests &&
      this.state.customInterests.length > 0
    )
      r.flexible_spec[0].interests = r.flexible_spec[0].interests.concat(
        this.state.customInterests
      );
    else if (
      this.state.customInterests &&
      this.state.customInterests.length > 0
    ) {
      r.flexible_spec[0].interests = this.state.customInterests;
    }
    let totalReach = {
      geo_locations: {
        countries: r.geo_locations.countries,
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
    // if (totalReach.geo_locations.regions.length === 0) {
    //   delete totalReach.geo_locations.regions;
    // }
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
      rep.lifetime_budget_micro =
        this.state.duration * this.state.campaignInfo.lifetime_budget_micro;
      if (
        rep.targeting.flexible_spec[0].interests.length > 0 &&
        this.state.customInterests &&
        this.state.customInterests.length > 0
      )
        rep.targeting.flexible_spec[0].interests = rep.targeting.flexible_spec[0].interests.concat(
          this.state.customInterests
        );
      else if (
        this.state.customInterests &&
        this.state.customInterests.length > 0
      ) {
        rep.targeting.flexible_spec[0].interests = this.state.customInterests;
      }
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
      if (
        rep.targeting.geo_locations.custom_locations &&
        rep.targeting.geo_locations.custom_locations.length > 0 &&
        !this.editCampaign
      ) {
        rep.targeting.geo_locations.custom_locations = this.props.customLocations;
      } else if (!this.editCampaign) {
        delete rep.targeting.geo_locations.custom_locations;
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
        if (
          rep.targeting.geo_locations.custom_locations.length > 0 &&
          !this.editCampaign
        ) {
          rep.targeting.geo_locations.custom_locations = this.props.customLocations;
        } else if (!this.editCampaign) {
          delete rep.targeting.geo_locations.custom_locations;
        }
        if (
          this.state.campaignInfo.targeting.geo_locations.custom_locations
            .length === 0
        ) {
          rep.coordinates = [];
          rep.custom_location = [];
        } else if (this.state.locationsInfo.length > 0) {
          rep.coordinates = this.state.locationsInfo;
          rep.custom_location = this.props.customLocations;
        } else {
          rep.coordinates = JSON.parse(rep.coordinates);
          rep.custom_location = JSON.parse(rep.custom_location);
        }
        this.props.updateInstagramCampaign(
          rep,
          this.props.mainBusiness.businessid,
          this.props.navigation,
          segmentInfo,
          this.state.customInterests,
          this.props.customLocations
        );
      } else {
        // this.props.setCampaignInfoForTransaction({
        //   campaign_id: this.props.campaign_id,
        //   campaign_budget: this.state.campaignInfo.lifetime_budget_micro
        // });
        /** If the audience list is empty for the first time create a new audience */

        if (this.props.audienceList.length === 0) {
          this.props.createAudience(
            {
              name: "Audience",
              targeting: rep.targeting,
            },
            false,
            this.state.locationsInfo,
            this.state.customInterests,
            this.props.customLocations
          );
        }
        this.props.ad_details_instagram(
          rep,
          this.props.navigation,
          segmentInfo,
          this.state.locationsInfo,
          this.state.customInterests,
          this.props.customLocations
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
  selectedCustomItemsId = (array) => {
    if (array && array.length > 0) {
      return array.map((item) => item.id || item.key);
    }
    return [];
  };
  // For picker not to crash
  onSelectedCountryRegionChange = (item) => {
    let replace = cloneDeep(this.state.campaignInfo);

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
      campaignInfo: replace,
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: { ...replace },
        selectedCountriesAndRegions: replace.targeting.geo_locations.countries, //to save the selection of countries and regions if they resumed
      });
  };
  onSelectedCountryRegionsObjectsChange = (items) => {};
  filterRegions = (value) => {
    this.setState({ filteredRegions: value });
  };
  handleMultipleCountrySelection = () => {
    if (!this.editCampaign) {
      let recBudget =
        this.state.campaignInfo.targeting.geo_locations.countries.length * 75;

      let minValueBudget =
        25 * this.state.campaignInfo.targeting.geo_locations.countries.length;
      let lifetime_budget_micro = this.state.campaignInfo.lifetime_budget_micro;
      let value = this.state.value;
      if (this.state.budgetOption !== 0) {
        switch (this.state.budgetOption) {
          case 1:
            lifetime_budget_micro = recBudget * 2;
            value = this.formatNumber(recBudget * 2, true);
            break;
          case 2:
            lifetime_budget_micro = recBudget;
            value = this.formatNumber(recBudget, true);
            break;
          case 3:
            lifetime_budget_micro = recBudget * 3;
            value = this.formatNumber(recBudget * 3, true);
            break;
          default:
            lifetime_budget_micro = recBudget * 2;
            value = this.formatNumber(recBudget * 2, true);
            break;
        }
      }
      this.setState({
        campaignInfo: { ...this.state.campaignInfo, lifetime_budget_micro },
        value,
        minValueBudget,
        recBudget,
      });
    }
  };
  createNewAudience = () => {
    this.props.setInstagramAudienceDetail({ reset: true });
    this.props.navigation.navigate("InstagramAudienceTagetting", {
      source: "audience_list",
      source_action: "a_create_audience_detail",
      audience_channel: "instagram",
      audience_type: "InstagramStoryAdTargetting",
    });
  };
  chooseExistingAudience = () => {
    // this.props.navigation.navigate("SnapchatAudienceList", {
    //   source: "ad_targeting",
    //   source_action: "a_open_audience_list",
    // });
    this.setState({
      showAudienceList: !this.state.showAudienceList,
    });
  };
  setSelectedAudience = (
    targeting,
    coordinates,
    customInterests = [],
    customLocations = []
  ) => {
    let editedCampaign = cloneDeep(this.state.campaignInfo);
    let campaignTargeting = targeting;
    let locationsInfo = coordinates || [];
    if (this.editCampaign) {
      campaignTargeting.geo_locations = editedCampaign.targeting.geo_locations;
    }
    editedCampaign.targeting = {
      ...editedCampaign.targeting,
      ...campaignTargeting,
    };

    // let editedCountryCodes = editedCampaign.targeting.geo_locations.map(
    //   (geo) => geo.country_code
    // );
    let selectedGender = "";
    switch (editedCampaign.targeting.genders[0]) {
      case "1":
        selectedGender = "1";
        break;
      case "2":
        selectedGender = "2";
        break;
      default:
        selectedGender = "";
        break;
    }
    editedCampaign.targeting.age_max = parseInt(
      editedCampaign.targeting.age_max
    );
    editedCampaign.targeting.age_min = parseInt(
      editedCampaign.targeting.age_min
    );
    let getCountryName = editedCampaign.targeting.geo_locations.countries.map(
      (geo, i) => countries.find((country) => country.value === geo.value)
    );
    let editedRegionNames = editedCampaign.targeting.geo_locations.regions.map(
      (geo, i) =>
        country_regions.find(
          (country_region) => country_region.country_code === geo.value
        )
    );
    let markers = [];
    // if (locationsInfo && locationsInfo.length > 0) {
    //   locationsInfo = cloneDeep(JSON.parse(locationsInfo));
    //   markers = cloneDeep(campaignTargeting.locations[0].circles);
    // }
    // LOCATIONS MAP
    let stateRegionNames = [];
    this.setState(
      {
        campaignInfo: editedCampaign,
        // startEditing: false,
        countryName: getCountryName,
        regions: editedRegionNames,
        filteredRegions: editedRegionNames,
        locationsInfo,
        markers,
        selectedGender,
        customInterests,
      },
      () => {
        // editedCampaign.targeting.geo_locations.forEach(
        //   (geo, i) =>
        //     editedCampaign.targeting.geos[i].region_id &&
        //     editedCampaign.targeting.geos[i].region_id.forEach((id) => {
        //       let regN = editedRegionNames[i].regions.find(
        //         (region) => region.id === id
        //       );
        //       regN.country_code = editedCampaign.targeting.geos[i].country_code;
        //       stateRegionNames.push(regN);
        //     })
        // );
        let showRegions = this.state.regions.some(
          (reg) => reg.regions.length > 3
        );

        if (this.props.data && this.props.data.appChoice) {
          let navAppChoice =
            this.props.data.iosApp_name &&
            this.props.data.iosApp_name !== "" &&
            this.props.data.androidApp_name &&
            this.props.data.androidApp_name !== ""
              ? ""
              : this.props.data.appChoice;
          let rep = cloneDeep(this.state.campaignInfo);
          rep.targeting.user_os = [navAppChoice];
          this.setState({
            campaignInfo: rep,
          });
        }
        this.handleMultipleCountrySelection();
        this._calcReach();
        this.setState({
          //   regionNames: stateRegionNames,
          showRegions,
          showAudienceList: false,
        });
        !this.editCampaign &&
          this.props.save_campaign_info_instagram({
            campaignInfo: editedCampaign,
            countryName: getCountryName,
            regions: editedRegionNames,
            filteredRegions: editedRegionNames,
            showRegions,
            // regionNames: stateRegionNames,
            markers,
            locationsInfo,
          });
      }
    );
  };
  onSelectedMapChange = (
    selectedItems,
    unselect = false,
    locationsInfo = []
  ) => {
    let stateRep = cloneDeep(this.state.campaignInfo);
    if (unselect) {
      stateRep.targeting.geo_locations.custom_locations = [];
      this.props.save_campaign_info_instagram({
        markers: [],
        locationsInfo: [],
      });
    } else stateRep.targeting.geo_locations.custom_locations = selectedItems;
    analytics.track(`a_ad_map_locations`, {
      source: "ad_targeting",
      source_action: "a_ad_map_locations",
      campaign_map_locations: selectedItems,
    });
    this.setState({
      campaignInfo: { ...stateRep },
      locationsInfo,
    });
    !this.editCampaign &&
      this.props.save_campaign_info_instagram({
        campaignInfo: { ...stateRep },
      });
  };

  render() {
    const { translate } = this.props.screenProps;
    let { campaignInfo, startEditing, showAudienceList } = this.state;
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
      case "age": {
        menu = (
          <AgeOption
            showPlusIcon={false}
            screenProps={this.props.screenProps}
            state={this.state.campaignInfo}
            _handleAge={this._handleAge}
            _handleSideMenuState={this._handleSideMenuState}
            ageValuesRange={[18, 65]}
            minAge={this.state.campaignInfo.targeting.age_min || 18}
            maxAge={this.state.campaignInfo.targeting.age_max || 65}
          />
        );
        break;
      }
      case "regions": {
        menu = (
          <SelectRegions
            screenProps={this.props.screenProps}
            countryName={this.state.countryName}
            countries={
              this.state.campaignInfo.targeting.geo_locations.countries
            }
            filteredRegions={this.state.filteredRegions}
            onSelectedRegionChange={this.onSelectedRegionChange}
            _handleSideMenuState={this._handleSideMenuState}
            regions={this.state.regions}
            region_id={this.state.campaignInfo.targeting.geo_locations.regions}
            filterRegions={this.filterRegions}
          />
        );

        break;
      }
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
            data={OSType}
            objective={!!this.props.data && this.props.data.objective}
            screenProps={this.props.screenProps}
            campaignInfo={this.state.campaignInfo}
            onSelectedOSChange={this.onSelectedOSChange}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "map": {
        if (!LocationMap) {
          LocationMap = require("../../../../MiniComponents/LocationMap")
            .default;
        }
        menu = (
          <SnapchatLocation
            country_code={
              this.state.campaignInfo.targeting.geo_locations.countries[0]
            }
            screenProps={this.props.screenProps}
            _handleSideMenuState={this._handleSideMenuState}
            circles={
              this.state.campaignInfo.targeting.geo_locations.custom_locations
            }
            locationsInfo={this.state.locationsInfo}
            onSelectedMapChange={this.onSelectedMapChange}
            save_campaign_info={this.props.save_campaign_info_instagram}
            data={this.props.data}
            _handleSideMenuState={this._handleSideMenuState}
            editCampaign={this.editCampaign}
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
              this.state.campaignInfo.targeting.flexible_spec[0].interests
            )}
            selectedCustomItems={this.selectedCustomItemsId(
              this.state.customInterests
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
            editCampaign={this.editCampaign}
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
        (reg) => translate(reg.name)
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
      interests_names = [
        this.state.campaignInfo.targeting.flexible_spec[0].interests.map(
          (interest) => interest.name
        ),
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
    interests_names = interests_names.join(", ");
    return (
      <View style={{ height: "100%", backgroundColor: "#F8F8F8" }}>
        <SafeAreaView
          style={[
            {
              backgroundColor: this.editCampaign ? "transparent" : "#fff",
            },
          ]}
          forceInset={{ bottom: "never", top: "always" }}
        />
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
            actionButton={() => this.handleBackButton()}
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
            actionButton={() => this.handleBackButton()}
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
            title={this.editCampaign ? "Audience" : "Campaign details"}
            titleStyle={{ color: globalColors.rum }}
            iconColor={globalColors.rum}
          />
        )}
        <View style={{ height: "100%" }}>
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
            openMenuOffset={wp(100)}
            isOpen={this.state.sidemenustate}
            // edgeHitWidth={-60}
          >
            <View style={[styles.safeArea]}>
              <NavigationEvents
                onDidFocus={() => {
                  const source = this.props.navigation.getParam(
                    "source",
                    this.props.screenProps.prevAppState
                  );
                  const source_action = this.props.navigation.getParam(
                    "source_action",
                    this.props.screenProps.prevAppState
                  );

                  const segmentInfo = this.props.data
                    ? {
                        source,
                        source_action,
                        campaign_channel: "instagram",
                        campaign_ad_type: "InstagramStoryAd",
                        campaign_name: this.props.data.name,
                        campaign_id: this.props.data.campaign_id,
                        campaign_message: this.props.data.message,
                        campaign_attachment: this.props.data.attachment,
                        campaign_swipe_up_CTA: this.props.data.call_to_action,
                        campaign_swipe_up_destination: this.props.data
                          .destination,
                        campaign_media: this.props.data.media,
                        campaign_media_type: this.props.data.media_type,
                        campaign_appChoice: this.props.data.appChoice,
                        campaign_objective: this.props.data.objective,
                      }
                    : {};
                  analytics.track("ad_targeting", {
                    timestamp: new Date().getTime(),
                    source,
                    source_action,
                    ...segmentInfo,
                  });
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
                  <Content
                    scrollEnabled={false}
                    contentContainerStyle={styles.contentContainer}
                  >
                    {!this.editCampaign ? (
                      <View style={{ marginTop: RFValue(2.5, 414) }}>
                        <Row size={-1} style={styles.row}>
                          <View style={styles.walletTextView}>
                            <WalletIcon
                              width={RFValue(15, 414)}
                              height={RFValue(15, 414)}
                              fill={globalColors.rum}
                            />
                            <Text
                              style={[
                                styles.subHeadings,
                                styles.dailyBudgetText,
                              ]}
                            >
                              {translate("Set your daily budget")}
                            </Text>
                          </View>
                          <View style={styles.lifetimeBudgetView}>
                            <Text
                              style={[
                                styles.subHeadings,
                                styles.lifetimeBudgetText,
                              ]}
                            >
                              {translate("Lifetime budget")}
                            </Text>
                            <Text
                              style={[
                                styles.subHeadings,
                                styles.lifetimeBudgetNumber,
                              ]}
                            >
                              {this.formatNumber(
                                this.state.duration *
                                  this.state.campaignInfo.lifetime_budget_micro,
                                true
                              )}
                            </Text>
                          </View>
                        </Row>
                        <BudgetCards
                          value={this.state.value}
                          recBudget={this.state.recBudget}
                          lifetime_budget_micro={
                            this.state.campaignInfo.lifetime_budget_micro
                          }
                          budgetOption={this.state.budgetOption}
                          _handleBudget={this._handleBudget}
                          screenProps={this.props.screenProps}
                          data={this.props.data}
                        />
                      </View>
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
                      <View style={styles.reachView}>
                        {showAudienceList ? (
                          <Icon
                            name={`keyboard-arrow-${
                              I18nManager.isRTL ? "right" : "left"
                            }`}
                            type="MaterialIcons"
                            style={{
                              fontSize: 25,
                              color: globalColors.rum,
                            }}
                            onPress={this.chooseExistingAudience}
                          />
                        ) : (
                          <AudienceIcon />
                        )}
                        <Text
                          style={[
                            styles.subHeadings,
                            styles.selectAudienceText,
                          ]}
                        >
                          {translate("Select Audience")}
                        </Text>

                        {(this.props.audienceList.length === 0 ||
                          showAudienceList) &&
                          !this.props.audienceListLoading && (
                            <TouchableOpacity
                              style={styles.createView}
                              onPress={this.createNewAudience}
                            >
                              <PurplePlusIcon
                                width={15}
                                height={15}
                                style={styles.iconAdd}
                              />
                              <Text style={styles.createText}>
                                {translate("Create")}
                              </Text>
                            </TouchableOpacity>
                          )}

                        {!showAudienceList &&
                        this.props.audienceList.length > 0 ? (
                          <TouchableOpacity
                            style={styles.createView}
                            onPress={this.chooseExistingAudience}
                          >
                            <Text style={styles.createText}>
                              {translate("Choose Preset")}
                            </Text>
                            <Icon
                              name={`keyboard-arrow-${
                                I18nManager.isRTL ? "left" : "right"
                              }`}
                              type="MaterialIcons"
                              style={styles.iconRight}
                            />
                          </TouchableOpacity>
                        ) : (
                          this.props.audienceListLoading && (
                            <ActivityIndicator
                              color={globalColors.purple}
                              size="small"
                              style={styles.iconLoading}
                            />
                          )
                        )}
                      </View>
                    )}
                    {!showAudienceList && (
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
                        onSelectedGenderChange={this.onSelectedGenderChange}
                      />
                    )}

                    {showAudienceList && (
                      <InstagramAudienceList
                        screenProps={this.props.screenProps}
                        navigation={this.props.navigation}
                        chooseExistingAudience={this.chooseExistingAudience}
                        setSelectedAudience={this.setSelectedAudience}
                        audience_type={"InstagramStoryAdTargetting"}
                      />
                    )}

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
        </View>
      </View>
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
  customLocations: state.instagramAds.customLocations,

  audienceList: state.instagramAudience.audienceList,
  audienceListLoading: state.instagramAudience.audienceListLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getAudienceList: () => dispatch(actionCreators.getInstagramAudienceList()),
  ad_details_instagram: (
    info,
    navigation,
    segmentInfo,
    locationsInfo,
    custom_interest,
    custom_location
  ) =>
    dispatch(
      actionCreators.ad_details_instagram(
        info,
        navigation,
        segmentInfo,
        locationsInfo,
        custom_interest,
        custom_location
      )
    ),
  updateInstagramCampaign: (
    info,
    businessid,
    navigation,
    segmentInfo,
    custom_interest,
    custom_location
  ) =>
    dispatch(
      actionCreators.updateInstagramCampaign(
        info,
        businessid,
        navigation,
        segmentInfo,
        custom_interest,
        custom_location
      )
    ),
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  instagram_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.instagram_ad_audience_size(info, totalReach)),
  // get_languages: () => dispatch(actionCreators.get_languages()),
  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),

  setInstagramAudienceDetail: (audienceInfo) =>
    dispatch(actionCreators.setInstagramAudienceDetail(audienceInfo)),
  createAudience: (
    audience,
    navigate,
    locationInfo,
    custom_interest,
    custom_locations
  ) =>
    dispatch(
      actionCreators.createInstagramAudience(
        audience,
        navigate,
        locationInfo,
        custom_interest,
        custom_locations
      )
    ),
  deleteCustomLocation: (index) =>
    dispatch(actionCreators.deleteCustomLocation(index)),
  // setCampaignInfoForTransaction: data =>
  //   dispatch(actionCreators.setCampaignInfoForTransaction(data)),
  // resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  // get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramStoryAdTargetting);
