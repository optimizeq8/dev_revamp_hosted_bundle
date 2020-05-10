//Components
import React, { Component } from "react";
import { View, BackHandler, I18nManager } from "react-native";
import { Text, Container, Content } from "native-base";
import { Video } from "expo-av";
import * as Segment from "expo-analytics-segment";
// import Sidemenu from "react-native-side-menu";
import Sidemenu from "../../../MiniComponents/SideMenu";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ReachBar from "./ReachBar";
import SelectRegions from "../../../MiniComponents/SelectRegions";
import SelectLanguages from "../../../MiniComponents/SelectLanguages";
import GenderOptions from "../../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../../MiniComponents/AgeOptions/AgeOption";
import MultiSelectSections from "../../../MiniComponents/MultiSelect/MultiSelect";
import CustomHeader from "../../../MiniComponents/Header";
import SelectOS from "../../../MiniComponents/SelectOS";
import { showMessage } from "react-native-flash-message";

//Data
import countries, { gender, OSType, country_regions } from "./data";

//Style
import styles from "./styles";

//Redux Axios
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import combineMerge from "./combineMerge";
import deepmerge from "deepmerge";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import isNan from "lodash/isNaN";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import { BudgetCards } from "./BudgetCards";
import { TargetAudience } from "./TargetAudience";
import find from "lodash/find";
import segmentEventTrack from "../../../segmentEventTrack";
import { AdjustEvent, Adjust } from "react-native-adjust";

class AdDetails extends Component {
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
          demographics: [
            {
              gender: "",
              languages: ["ar", "en"],
              min_age: 13,
              max_age: 49,
            },
          ],
          interests: [{ category_id: [] }],
          devices: [
            {
              marketing_name: [],
              os_type: "",
              os_version_min: "",
              os_version_max: "",
            },
          ],
          geos: [{ country_code: "", region_id: [] }],
        },
      },
      filteredRegions: country_regions[0].regions,
      filteredLanguages: [],
      regionNames: [],
      countryName: "",
      advance: false,
      sidemenustate: false,
      sidemenu: "gender",
      regions: country_regions[0].regions,
      value: 50,
      minValueBudget: 25,
      maxValueBudget: 1500,
      interestNames: [],
      modalVisible: false,
      totalReach: 0,
      selectionOption: "",
      showRegions: false,
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
    this.props.get_languages();
    if (this.editCampaign) {
      let editedCampaign = deepmerge(
        this.state.campaignInfo,
        this.props.navigation.getParam("campaign", {}),
        { arrayMerge: combineMerge }
      );
      this.props.get_interests(editedCampaign.targeting.geos[0].country_code);
      editedCampaign.targeting.demographics[0].max_age = parseInt(
        editedCampaign.targeting.demographics[0].max_age
      );
      getCountryName = countries.find(
        (country) =>
          country.value === editedCampaign.targeting.geos[0].country_code
      ).label;
      this.onSelectedCountryChange(
        editedCampaign.targeting.geos[0].country_code,
        null,
        getCountryName
      );
      let editedRegionNames = country_regions.find(
        (country_region) =>
          country_region.country_code ===
          editedCampaign.targeting.geos[0].country_code
      );
      editedCampaign.targeting.geos[0].region_id.forEach((id) => {
        let name = editedRegionNames.regions.find((region) => region.id === id)
          .name;
        this.onSelectedRegionChange(id, name);
      });
      this.setState(
        {
          campaignInfo: editedCampaign,
          startEditing: false,
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

      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          campaign_id: this.props.campaign_id,
          lifetime_budget_micro: recBudget,
        },
        minValueBudget: this.props.data.minValueBudget,
        maxValueBudget: this.props.data.maxValueBudget,
        value: this.formatNumber(recBudget),
        recBudget: recBudget,
      });

      if (this.props.data.hasOwnProperty("campaignInfo")) {
        rep = { ...this.state.campaignInfo, ...this.props.data.campaignInfo };
        let countryRegions = find(
          country_regions,
          (country) =>
            country.country_code === rep.targeting.geos[0].country_code
        );
        this.setState(
          {
            ...this.state,
            ...this.props.data,
            campaignInfo: {
              ...rep,
              lifetime_budget_micro:
                this.props.data.campaignDateChanged &&
                this.props.data.campaignInfo.lifetime_budget_micro <
                  this.props.data.minValueBudget
                  ? recBudget
                  : this.props.data.campaignInfo.lifetime_budget_micro,
            },
            value: this.formatNumber(
              this.props.data.campaignDateChanged &&
                this.props.data.campaignInfo.lifetime_budget_micro <
                  this.props.data.minValueBudget
                ? recBudget
                : this.props.data.campaignInfo.lifetime_budget_micro
            ),
            showRegions: this.props.data.showRegions,
            filteredLanguages: this.props.languages,
            recBudget,
            filteredRegions: countryRegions ? countryRegions.regions : [],
            regions: countryRegions ? countryRegions.regions : [],
            budgetOption: this.props.data.campaignDateChanged
              ? 1
              : this.props.data.budgetOption,
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

  _handleMaxAge = (value) => {
    let rep = this.state.campaignInfo;
    rep.targeting.demographics[0].max_age = parseInt(value);
    segmentEventTrack(`Selected Max Age`, {
      campaign_max_age: parseInt(value),
    });
    this.setState({
      campaignInfo: rep,
    });
    !this.editCampaign && this.props.save_campaign_info({ campaignInfo: rep });
  };

  _handleMinAge = (value) => {
    let rep = this.state.campaignInfo;
    rep.targeting.demographics[0].min_age = value;
    segmentEventTrack(`Selected Min Age`, {
      campaign_min_age: parseInt(value),
    });

    this.setState({
      campaignInfo: rep,
    });
    !this.editCampaign &&
      this.props.save_campaign_info({
        campaignInfo: rep,
      });
  };
  onSelectedCountryChange = async (
    selectedItem,
    mounting = null,
    countryName
  ) => {
    let replace = this.state.campaignInfo;
    let newCountry = selectedItem;
    if (
      typeof newCountry !== "undefined" &&
      newCountry !== replace.targeting.geos[0].country_code
    ) {
      replace.targeting.geos[0].country_code = newCountry;

      replace.targeting.geos[0].region_id = [];

      let reg = country_regions.find(
        (c) => c.country_code === replace.targeting.geos[0].country_code
      );
      replace.targeting.interests[0].category_id = [];
      segmentEventTrack(`Selected Country`, {
        campaign_country_name: countryName,
      });

      await this.setState({
        campaignInfo: replace,
        regions: reg.regions,
        filteredRegions: reg.regions,
        regionNames: [],
        interestNames: [],
        countryName,
        showRegions: reg.regions.length > 3,
      });

      !this.editCampaign &&
        this.props.save_campaign_info({
          campaignInfo: replace,
          country_code: newCountry,
          countryName,
          showRegions: reg.regions.length > 3,
        });
    }
  };

  onSelectedInterestsChange = (selectedItems) => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.interests[0].category_id = selectedItems;
    this.setState({ campaignInfo: replace });
    !this.editCampaign &&
      this.props.save_campaign_info({ campaignInfo: replace });
  };

  onSelectedDevicesChange = (selectedItems) => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.devices[0].marketing_name = selectedItems;
    if (selectedItems.length > 0) {
      segmentEventTrack(`Selected Devices`, {
        campaign_devices_name: selectedItems.join(", "),
      });
    } else {
      segmentEventTrack(`Selected No Devices`);
    }
    this.setState({
      campaignInfo: replace,
    });
    !this.editCampaign &&
      this.props.save_campaign_info({
        campaignInfo: replace,
      });
  };
  onSelectedInterestsNamesChange = (selectedItems) => {
    this.setState({
      interestNames: selectedItems,
    });
    let names = [];
    names = selectedItems.length > 0 && selectedItems.map((item) => item.name);
    if (names && names.length > 0)
      segmentEventTrack(`Selected Interests`, {
        campaign_interests_names: names.join(", "),
      });
    !this.editCampaign &&
      this.props.save_campaign_info({
        interestNames: selectedItems,
      });
  };

  onSelectedLangsChange = (selectedItem) => {
    const { translate } = this.props.screenProps;
    let replace = this.state.campaignInfo;
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
      segmentEventTrack(`Selected Languages`, {
        campaign_languages: langs.join(", "),
      });
    } else {
      replace.targeting.demographics[0].languages.push(selectedItem);
      langs = replace.targeting.demographics[0].languages;
      segmentEventTrack(`Selected Languages`, {
        campaign_languages: langs.join(", "),
      });
    }

    if (replace.targeting.demographics[0].languages.length === 0) {
      segmentEventTrack(`Error Selecting Language`, {
        campaign_languages_error: "Please choose a language",
      });

      showMessage({
        message: translate("Please choose a language"),
        type: "warning",
        position: "top",
      });
    }
    this.setState({
      campaignInfo: replace,
      languagesError:
        this.state.campaignInfo.targeting.demographics[0].languages.length === 0
          ? "Please choose a language."
          : null,
    });
    !this.editCampaign &&
      this.props.save_campaign_info({ campaignInfo: replace });
  };

  onSelectedOSChange = (selectedItem) => {
    let replace = this.state.campaignInfo;
    replace.targeting.devices[0].os_type = selectedItem;
    replace.targeting.devices[0].os_version_min = "";
    replace.targeting.devices[0].os_version_max = "";
    segmentEventTrack(`Selected OS Type`, {
      campaign_os_type: selectedItem === "" ? "ALL" : selectedItem,
    });
    this.setState({
      campaignInfo: { ...replace },
    });
    !this.editCampaign &&
      this.props.save_campaign_info({
        campaignInfo: { ...replace },
      });
  };

  onSelectedVersionsChange = (selectedItem) => {
    let replace = this.state.campaignInfo;
    replace.targeting.devices[0].os_version_min = selectedItem[0];
    replace.targeting.devices[0].os_version_max = selectedItem[1];
    segmentEventTrack(`Selected OS Version`, {
      campaign_min_version: selectedItem[0],
      campaign_max_version: selectedItem[1],
    });
    this.setState({
      campaignInfo: { ...replace },
    });
    !this.editCampaign &&
      this.props.save_campaign_info({
        campaignInfo: { ...replace },
      });
  };
  // onSelectedBudgetChange = budget => {
  //   if (budget === this.state.maxValueBudget) {
  //     showMessage({
  //       message: "You can also enter your budget manually.",
  //       type: "success",
  //       position: "top"
  //     });
  //   }
  //   let replace = this.state.campaignInfo;
  //   replace.lifetime_budget_micro = budget;
  //   segmentEventTrack(`Campaign Budget Change`, {
  //     campaign_budget: this.formatNumber(budget)
  //   });
  //   this.setState({
  //     campaignInfo: replace,
  //     value: this.formatNumber(budget)
  //   });
  //   !this.editCampaign &&
  //     this.props.save_campaign_info({
  //       campaignInfo: replace
  //     });
  // };

  onSelectedRegionChange = (selectedItem, regionName) => {
    let replace = this.state.campaignInfo;
    let rIds = replace.targeting.geos[0].region_id;
    let rNamesSelected = this.state.regionNames;

    if (selectedItem === -1) {
      if (this.state.regions.length === this.state.regionNames.length) {
        replace.targeting.geos[0].region_id = [];
        segmentEventTrack(`Selected No Regions`);
        this.setState({
          regionNames: [],
          campaignInfo: replace,
        });
      } else {
        rNamesSelected = this.state.regions.map((r) => r.name);
        rIds = this.state.regions.map((r) => r.id);
        replace.targeting.geos[0].region_id = rIds;
        segmentEventTrack(`Selected Regions`, {
          campaign_region_names: rNamesSelected.join(", "),
        });
        this.setState({
          regionNames: rNamesSelected,
          campaignInfo: replace,
        });
      }

      !this.editCampaign &&
        this.props.save_campaign_info({
          campaignInfo: replace,
          regionNames: rNamesSelected,
        });
      return;
    } else {
      // logic change

      // campignInfo region
      if (rIds.find((r) => r === selectedItem)) {
        replace.targeting.geos[0].region_id = rIds.filter(
          (r) => r !== selectedItem
        );
        rNamesSelected = rNamesSelected.filter((r) => r !== regionName);
      } else {
        replace.targeting.geos[0].region_id.push(selectedItem);
        rNamesSelected.push(regionName);
      }
      segmentEventTrack(`Selected Regions`, {
        campaign_region_names: rNamesSelected.join(", "),
      });

      this.setState({
        campaignInfo: replace,
        regionNames: rNamesSelected,
      });
      !this.editCampaign &&
        this.props.save_campaign_info({
          campaignInfo: replace,
          regionNames: rNamesSelected,
        });
    }
  };

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
      !this.editCampaign &&
        this.props.save_campaign_info({
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
          segmentEventTrack("Error Campaign Budget Change", {
            campaign_budget_error:
              validateWrapper("Budget", rawValue) +
              " $" +
              this.state.minValueBudget,
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
      segmentEventTrack("Custom Campaign Budget Change", {
        campaign_budget: rawValue,
      });
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: rawValue,
        },
        value: value,
        budgetOption,
      });
      !this.editCampaign &&
        this.props.save_campaign_info({
          campaignInfo: {
            ...this.state.campaignInfo,
            lifetime_budget_micro: this.state.recBudget,
          },
          budgetOption,
        });

      return false;
    }
  };

  onSelectedGenderChange = (gender) => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographics[0].gender = gender;
    segmentEventTrack(`Selected Gender`, {
      campaign_gender: gender === "" ? "ALL" : gender,
    });
    this.setState({ campaignInfo: { ...replace } });
    !this.editCampaign &&
      this.props.save_campaign_info({ campaignInfo: { ...replace } });
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
  _calcReach = async () => {
    if (this.state.campaignInfo.targeting.geos[0].country_code !== "") {
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
      if (
        r.hasOwnProperty("interests") &&
        r.interests[0].category_id.length === 0
      ) {
        delete r.interests;
      }
      const obj = {
        targeting: JSON.stringify(r),
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
      };

      let totalReach = {
        demographics: [
          {
            languages: this.props.languages.map((lang) => lang.id),
            min_age: 13,
            max_age: 49,
          },
        ],
        geos: [
          {
            country_code: this.state.campaignInfo.targeting.geos[0]
              .country_code,
          },
        ],
      };
      const obj2 = {
        targeting: JSON.stringify(totalReach),
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
      };
      await this.props.snap_ad_audience_size(obj, obj2);
    }
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    const languagesError =
      this.state.campaignInfo.targeting.demographics[0].languages.length === 0
        ? "Please choose a language."
        : null;

    const countryError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.targeting.geos[0].country_code
    );
    if (countryError) {
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
    if (
      countryError ||
      languagesError ||
      !this._handleBudget(
        this.state.value,
        this.state.campaignInfo.lifetime_budget_micro,
        true,
        this.state.budgetOption
      )
    ) {
      segmentEventTrack("Error on submit ad details", {
        campaign_country_error: countryError,
        campaign_languages_error: languagesError,
        campaign_budget_error: validateWrapper(
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
      !languagesError &&
      !countryError
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
      if (rep.targeting.devices[0].marketing_name.length === 0) {
        delete rep.targeting.devices[0].marketing_name;
      }
      if (rep.targeting.devices[0].os_type === "") {
        delete rep.targeting.devices[0].os_type;
      }
      if (rep.targeting.devices[0].os_version_max === "") {
        delete rep.targeting.devices[0].os_version_max;
        delete rep.targeting.devices[0].os_version_min;
      }
      if (
        Object.entries(rep.targeting.devices[0]).length === 0 &&
        rep.targeting.devices[0].constructor === Object
      ) {
        delete rep.targeting.devices;
      }
      rep.targeting = JSON.stringify(rep.targeting);

      if (this.editCampaign) {
        Segment.trackWithProperties("Updated Ad Details", {
          business_name: this.props.mainBusiness.businessname,
          campaign_id: this.props.campaign_id,
        });
        this.props.updateCampaign(
          rep,
          this.props.mainBusiness.businessid,
          this.props.navigation
        );
      } else {
        Segment.trackWithProperties("Submitted Ad Details", {
          business_name: this.props.mainBusiness.businessname,
          campaign_budget: this.state.campaignInfo.lifetime_budget_micro,
          campaign_id: this.props.campaign_id,
        });
        let interestNamesList = [];
        interestNamesList =
          this.state.interestNames &&
          this.state.interestNames.length > 0 &&
          this.state.interestNames.map((inter) => inter.name);
        const segmentInfo = {
          checkout_id: this.props.campaign_id,
          step: 4,
          business_name: this.props.mainBusiness.businessname,
          campaign_budget: this.state.campaignInfo.lifetime_budget_micro,
          campaign_gender:
            this.state.campaignInfo.targeting.demographics[0].gender === ""
              ? "ALL"
              : this.state.campaignInfo.targeting.demographics[0].gender,
          campaign_max_age: this.state.campaignInfo.targeting.demographics[0]
            .max_age,
          campaign_min_age: this.state.campaignInfo.targeting.demographics[0]
            .min_age,
          campaign_country_name: this.state.countryName,
          campaign_region_names:
            this.state.regionNames && this.state.regionNames.length > 0
              ? this.state.regionNames.join(", ")
              : null,
          campaign_languages:
            this.state.campaignInfo.targeting.demographics[0].languages &&
            this.state.campaignInfo.targeting.demographics[0].languages.length >
              0
              ? this.state.campaignInfo.targeting.demographics[0].languages.join(
                  ", "
                )
              : null,
          campaign_min_version: this.state.campaignInfo.targeting.devices[0]
            .os_version_min,
          campaign_max_version: this.state.campaignInfo.targeting.devices[0]
            .os_version_max,
          campaign_os_type:
            this.state.campaignInfo.targeting.devices[0].os_type === ""
              ? "ALL"
              : this.state.campaignInfo.targeting.devices[0].os_type,
          campaign_devices_name:
            this.state.campaignInfo.targeting.devices[0].marketing_name &&
            this.state.campaignInfo.targeting.devices[0].marketing_name.length >
              0
              ? this.state.campaignInfo.targeting.devices[0].marketing_name.join(
                  ", "
                )
              : null,
          campaign_interests_names:
            interestNamesList && interestNamesList.length > 0
              ? interestNamesList.join(", ")
              : null,
        };
        // this.props.setCampaignInfoForTransaction({
        //   campaign_id: this.props.campaign_id,
        //   campaign_budget: this.state.campaignInfo.lifetime_budget_micro
        // });

        this.props.ad_details(
          rep,
          {
            interestNames: this.state.interestNames,
            regionNames: this.state.regionNames,
            countryName: this.state.countryName,
          },
          this.props.navigation,
          segmentInfo
        );
      }
    }
  };

  handleAdDetailsFocus = () => {
    this.props.saveCampaignSteps(
      this.props.adType === "StoryAd"
        ? ["Dashboard", "AdObjective", "AdCover", "AdDesign", "AdDetails"]
        : ["Dashboard", "AdObjective", "AdDesign", "AdDetails"]
    );

    if (this.editCampaign) {
      Segment.screenWithProperties("Snap Ad Targetting Update", {
        category: "Campaign Update",
      });
    } else {
      Segment.screenWithProperties("Snap Ad Targetting", {
        category: "Campaign Creation",
        channel: "snapchat",
      });
      Segment.trackWithProperties("Viewed Checkout Step", {
        checkout_id: this.props.campaign_id,
        step: 4,
      });
    }
    let adjustAdDetailsTracker = new AdjustEvent("1mtblg");
    adjustAdDetailsTracker.addPartnerParameter(
      `Snap_${this.props.adType}`,
      this.props.adType
    );
    Adjust.trackEvent(adjustAdDetailsTracker);
  };

  render() {
    const { translate } = this.props.screenProps;
    let { campaignInfo, startEditing } = this.state;
    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <GenderOptions
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
            screenProps={this.props.screenProps}
            state={this.state.campaignInfo.targeting.demographics[0]}
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
            screenProps={this.props.screenProps}
            countryName={this.state.countryName}
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
            screenProps={this.props.screenProps}
            filteredLanguages={this.state.filteredLanguages}
            onSelectedLangsChange={this.onSelectedLangsChange}
            _handleSideMenuState={this._handleSideMenuState}
            languages={this.props.languages}
            demographics={this.state.campaignInfo.targeting.demographics}
            filterLanguages={this.filterLanguages}
          />
        );

        break;
      }
      case "OS": {
        menu = (
          <SelectOS
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
            countries={countries}
            country_code={
              this.state.campaignInfo.targeting.geos[0].country_code
            }
            onSelectedCountryChange={this.onSelectedCountryChange}
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
    this.state.regions.forEach((r) => {
      if (
        this.state.campaignInfo.targeting.geos[0].region_id &&
        this.state.campaignInfo.targeting.geos[0].region_id.find(
          (i) => i === r.id
        )
      ) {
        regions_names.push(translate(r.name));
      }
    });
    regions_names = regions_names.join(", ");

    let languages_names = [];
    this.props.languages.forEach((r) => {
      if (
        this.state.campaignInfo.targeting.demographics[0].languages.find(
          (i) => i === r.id
        )
      ) {
        languages_names.push(translate(r.name));
      }
    });
    languages_names = languages_names.join(", ");

    let interests_names = [];
    if (this.state.campaignInfo.targeting.interests[0].category_id.length > 0) {
      interests_names = this.state.campaignInfo.targeting.interests[0].category_id.map(
        (interest) => {
          const nameItem = find(
            this.props.interests,
            (intrst) => interest === intrst.id
          );
          if (nameItem) return translate(nameItem.name);
        }
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
                  uri: this.editCampaign ? campaign.media : media,
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
                      borderTopRightRadius: 30,
                    }
                  : {},
                this.state.sidemenustate && I18nManager.isRTL
                  ? {
                      borderTopLeftRadius: 30,
                    }
                  : {},
              ]}
            />
          ))}

        <SafeAreaView
          style={[
            styles.safeArea,
            {
              backgroundColor: this.editCampaign
                ? "transparent"
                : "rgba(0,0,0,0.75)",
            },
          ]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents onDidFocus={this.handleAdDetailsFocus} />
          <Container style={styles.mainContainer}>
            <Container style={styles.container}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={false}
                segment={{
                  str: "Ad Details Back Button",
                  obj: {
                    businessname: this.props.mainBusiness.businessname,
                  },
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
                      data={this.props.data}
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

const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  minValueBudget: state.campaignC.minValueBudget,
  maxValueBudget: state.campaignC.maxValueBudget,
  adType: state.campaignC.adType,
  data: state.campaignC.data,
  average_reach: state.campaignC.average_reach,
  loading: state.campaignC.loadingDetail,
  mainBusiness: state.account.mainBusiness,
  languages: state.campaignC.languagesList,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  interests: state.campaignC.interests,
  campaignDateChanged: state.campaignC.campaignDateChanged,
});

const mapDispatchToProps = (dispatch) => ({
  ad_details: (info, names, navigation, segmentInfo) =>
    dispatch(actionCreators.ad_details(info, names, navigation, segmentInfo)),
  updateCampaign: (info, businessid, navigation) =>
    dispatch(actionCreators.updateCampaign(info, businessid, navigation)),
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
  get_languages: () => dispatch(actionCreators.get_languages()),
  saveCampaignSteps: (step) => dispatch(actionCreators.saveCampaignSteps(step)),
  setCampaignInfoForTransaction: (data) =>
    dispatch(actionCreators.setCampaignInfoForTransaction(data)),
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  get_interests: (info) => dispatch(actionCreators.get_interests(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
