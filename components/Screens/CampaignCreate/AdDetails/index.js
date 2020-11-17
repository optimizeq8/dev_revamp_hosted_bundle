//Components
import React, { Component } from "react";
import {
  View,
  BackHandler,
  I18nManager,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Content, Row, Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
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
import SnapchatAudienceList from "../../SnapchatCampaignAudienceList";
// import LocationMap from "../../../MiniComponents/LocationMap";
let LocationMap = null;
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
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";
import formatNumber from "../../../formatNumber";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BudgetCards } from "./BudgetCards";
import { TargetAudience } from "./TargetAudience";
import find from "lodash/find";
// import { AdjustEvent, Adjust } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
import SnapchatLocation from "../../../MiniComponents/SnapchatLocation";
import { globalColors } from "../../../../GlobalStyles";
import WalletIcon from "../../../../assets/SVGs/WalletOutline";
import AudienceIcon from "../../../../assets/SVGs/AudienceOutline";
import PurplePlusIcon from "../../../../assets/SVGs/PurplePlusIcon";

import GradientButton from "../../../MiniComponents/GradientButton";
import AudienceReach from "./AudienceReach";

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
              min_age: 18,
              max_age: 50,
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
          locations: [
            {
              circles: [],
              operation: "INCLUDE",
            },
          ],
        },
      },
      filteredRegions: country_regions[0].regions,
      filteredLanguages: [],
      regionNames: [],
      countryName: "",
      advance: false,
      sidemenustate: false,
      sidemenu: "gender",
      regions: [],
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
      locationsInfo: [],
      duration: 3,
      showAudienceList: false,
    };
    this.editCampaign = this.props.navigation.getParam("editCampaign", false);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPressAdDetails",
      this.handleBackButton
    );
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
    if (
      prevState.campaignInfo.targeting.geos.length !==
      this.state.campaignInfo.targeting.geos.length
    ) {
      this.handleMultipleCountrySelection();
    }
    if (
      JSON.stringify(this.state.campaignInfo) !==
      JSON.stringify(prevState.campaignInfo)
    ) {
      //to not set the audince again from navigation when AdDetails is focused
      this.props.navigation.setParams({ audienceSelected: false });
    }
  }
  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    if (this.state.sidemenustate) {
      this._handleSideMenuState(false);
    } else this.props.navigation.goBack();
    return true;
  };

  handleMultipleCountrySelection = () => {
    let languages = this.state.campaignInfo.targeting.demographics[0].languages;
    if (this.state.campaignInfo.targeting.geos.length > 1) {
      languages.length = 1;
    }
    if (!this.editCampaign) {
      let recBudget = this.state.campaignInfo.targeting.geos.length * 75;

      let minValueBudget = 25 * this.state.campaignInfo.targeting.geos.length;

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
  async componentDidMount() {
    this.props.get_languages();
    this.props.getAudienceList();
    if (this.editCampaign) {
      let editedCampaign = deepmerge(
        this.state.campaignInfo,
        this.props.navigation.getParam("campaign", {}),
        { arrayMerge: combineMerge }
      );
      let editedCountryCodes = editedCampaign.targeting.geos.map(
        (geo) => geo.country_code
      );
      this.props.get_interests(editedCountryCodes.join(","));
      editedCampaign.targeting.demographics[0].max_age = parseInt(
        editedCampaign.targeting.demographics[0].max_age
      );
      let getCountryName = editedCampaign.targeting.geos.map(
        (geo, i) =>
          countries.find(
            (country) =>
              country.value === editedCampaign.targeting.geos[i].country_code
          ).label
      );
      let editedRegionNames = editedCampaign.targeting.geos.map((geo, i) =>
        country_regions.find(
          (country_region) =>
            country_region.country_code ===
            editedCampaign.targeting.geos[i].country_code
        )
      );
      let editedMapLocation = [];
      let markers = [];
      if (editedCampaign.coordinates) {
        editedMapLocation = cloneDeep(JSON.parse(editedCampaign.coordinates));
        markers = cloneDeep(editedCampaign.targeting.locations[0].circles);
      }
      let stateRegionNames = [];
      this.setState(
        {
          campaignInfo: editedCampaign,
          startEditing: false,
          countryName: getCountryName,
          regions: editedRegionNames,
          filteredRegions: editedRegionNames,
          locationsInfo: editedMapLocation,
          markers,
        },
        () => {
          editedCampaign.targeting.geos.forEach((geo, i) =>
            editedCampaign.targeting.geos[i].region_id.forEach((id) => {
              let regN = editedRegionNames[i].regions.find(
                (region) => region.id === id
              );
              regN.country_code = editedCampaign.targeting.geos[i].country_code;
              stateRegionNames.push(regN);
            })
          );
          let showRegions = this.state.regions.some(
            (reg) => reg.regions.length > 3
          );
          this._calcReach();
          this.setState({ regionNames: stateRegionNames, showRegions });
        }
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

      // To by default set the country to that of the business country selected
      let country_code = find(
        countries,
        (country) => country.label === this.props.mainBusiness.country
      ).value;

      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            campaign_id: this.props.campaign_id,
            lifetime_budget_micro: recBudget * 2,
          },
          minValueBudget: 25,
          maxValueBudget: 1500,
          value: this.formatNumber(recBudget * 2, true),
          recBudget: recBudget,
          duration,
        },
        async () => {
          if (this.props.data.hasOwnProperty("campaignInfo")) {
            const rep = {
              ...this.state.campaignInfo,
              ...this.props.data.campaignInfo,
            };
            let savedRegionNames = this.props.data.regionNames;
            let countryRegions = rep.targeting.geos.map((cou) => {
              let foundCountryReg = find(
                country_regions,
                (country) => country.country_code === cou.country_code
              );
              let filterSelectedRegions = this.props.data.regionNames
                ? this.props.data.regionNames.filter(
                    (regN) => regN.country_code === cou.country_code
                  )
                : [];
              savedRegionNames =
                savedRegionNames &&
                uniq(flatten([savedRegionNames, filterSelectedRegions]));
              return foundCountryReg;
            });
            let minValueBudget = 25 * rep.targeting.geos.length;
            recBudget *= rep.targeting.geos.length;
            if (rep.targeting.geos.length > 1) {
              rep.targeting.demographics[0].languages.length = 1;
            }
            this.setState(
              {
                ...this.state,
                ...this.props.data,
                campaignInfo: {
                  ...rep,
                  campaign_id: this.props.campaign_id,
                  lifetime_budget_micro:
                    this.props.data && this.props.data.campaignDateChanged
                      ? recBudget * 2
                      : this.props.data
                      ? this.props.data.campaignInfo.lifetime_budget_micro
                      : 50,
                },
                value: this.formatNumber(
                  this.props.data && this.props.data.campaignDateChanged
                    ? recBudget * 2
                    : this.props.data
                    ? this.props.data.campaignInfo.lifetime_budget_micro
                    : 50
                ),
                showRegions: this.props.data.showRegions,
                filteredLanguages: this.props.languages,
                recBudget,
                filteredRegions: countryRegions ? countryRegions : [],
                regions: countryRegions ? countryRegions : [],
                budgetOption:
                  this.props.data && this.props.data.campaignDateChanged
                    ? 1
                    : !isNull(this.props.data.budgetOption) ||
                      !isUndefined(this.props.data.budgetOption)
                    ? this.props.data.budgetOption
                    : 1,
                regionNames: savedRegionNames,
                minValueBudget,
              },
              () => {
                if (this.props.data && this.props.data.appChoice) {
                  let navAppChoice =
                    this.props.data.attachment.ios_app_id &&
                    this.props.data.attachment.ios_app_id !== "" &&
                    this.props.data.attachment.android_app_url &&
                    this.props.data.attachment.android_app_url !== ""
                      ? ""
                      : this.props.data.appChoice;
                  let rep = cloneDeep(this.state.campaignInfo);
                  rep.targeting.devices[0].os_type = navAppChoice;
                  this.setState({
                    campaignInfo: rep,
                  });
                }
                this._calcReach();
              }
            );
          } else {
            await this.onSelectedCountryChange(
              country_code,
              null,
              this.props.mainBusiness.country
            );
            if (this.props.data && this.props.data.appChoice) {
              let navAppChoice =
                this.props.data.attachment.ios_app_id &&
                this.props.data.attachment.ios_app_id !== "" &&
                this.props.data.attachment.android_app_url &&
                this.props.data.attachment.android_app_url !== ""
                  ? ""
                  : this.props.data.appChoice;
              let rep = cloneDeep(this.state.campaignInfo);
              rep.targeting.devices[0].os_type = navAppChoice;
              this.setState({
                campaignInfo: rep,
              });
            }
          }
          this.props.save_campaign_info({
            budgetOption: this.state.budgetOption,
          });
          this._calcReach();
        }
      );
    }
  }

  _handleAge = (values) => {
    let rep = cloneDeep(this.state.campaignInfo);
    rep.targeting.demographics[0].min_age = parseInt(values[0]);
    rep.targeting.demographics[0].max_age = parseInt(values[1]);

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
      this.props.save_campaign_info({
        campaignInfo: rep,
      });
  };
  onSelectedCountryChange = async (
    selectedItem,
    mounting = null,
    countryName,
    addCountryOfLocations = false
  ) => {
    let replace = cloneDeep(this.state.campaignInfo);
    let newCountry = selectedItem;
    let regionNames = this.state.regionNames;
    let locationsInfo = this.state.locationsInfo;
    if (newCountry) {
      if (
        replace.targeting.geos.find((co) => co.country_code === newCountry) &&
        replace.targeting.geos.length === 1 &&
        !addCountryOfLocations
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
        !addCountryOfLocations
      ) {
        //To remove the country from the array
        replace.targeting.geos = replace.targeting.geos.filter(
          (co) => co.country_code !== newCountry
        );
        //To remove the regions from the the region names
        regionNames = this.state.regionNames.filter(
          (reg) => reg.country_code !== newCountry
        );
        //To remove the country name from the country names
        countryName = this.state.countryName.filter((co) => co !== countryName);
        locationsInfo = this.state.locationsInfo.filter((loc, i) => {
          if (loc.country_code !== newCountry) {
            return loc;
          } else {
            replace.targeting.locations[0].circles.splice(i, 1);
          }
        });
      } else if (replace.targeting.geos[0].country_code === "") {
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
        addCountryOfLocations
          ? !replace.targeting.geos.find((co) => co.country_code === newCountry)
          : true
      ) {
        //To add the coutnry to geos array
        replace.targeting.geos.push({
          country_code: newCountry,
          region_id: [],
        });
        countryName = [...this.state.countryName, countryName];
      } else {
        countryName = [...this.state.countryName];
      }

      let reg = country_regions.find((c) => c.country_code === newCountry);
      if (
        this.state.regions.find((c) => c.country_code === newCountry) &&
        !addCountryOfLocations
      ) {
        //To remove the region from the list of country regions that shows all regions of countriees when
        //the country is unselected
        reg = this.state.regions.filter((coReg) => {
          return coReg.country_code !== newCountry;
        });
      } else if (
        addCountryOfLocations
          ? !this.state.regions.find((c) => c.country_code === newCountry)
          : true
      ) {
        reg = [...this.state.regions, reg];
      } else {
        reg = [...this.state.regions];
      }

      replace.targeting.interests[0].category_id = [];
      analytics.track(`a_ad_country`, {
        source: "ad_targeting",
        source_action: "a_ad_country",
        campaign_country_name: countryName,
      });
      let showRegions = false;
      this.setState(
        {
          campaignInfo: replace,
          regions: reg,
          filteredRegions: reg,
          regionNames,
          interestNames: [],
          countryName,
          locationsInfo,
        },
        () => {
          //To show the regions options if one of the selected countries has more than 3 regions
          showRegions = this.state.regions.some(
            (reg) => reg.regions.length > 3
          );
          !this.editCampaign &&
            this.props.save_campaign_info({
              campaignInfo: replace,
              country_code: newCountry,
              countryName,
              showRegions: showRegions,
              regionNames,
              markers: replace.targeting.locations[0].circles,
              locationsInfo,
            });
          this.setState({ showRegions });
        }
      );
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
    analytics.track(`a_ad_interests`, {
      source: "ad_targeting",
      source_action: "a_ad_interests",
      campaign_interests_names: names && names.length > 0 && names.join(", "),
    });
    !this.editCampaign &&
      this.props.save_campaign_info({
        interestNames: selectedItems,
      });
  };

  onSelectedLangsChange = (selectedItem) => {
    const { translate } = this.props.screenProps;
    let replace = cloneDeep(this.state.campaignInfo);
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
      analytics.track(`a_ad_languages`, {
        source: "ad_targeting",
        source_action: "a_ad_languages",
        campaign_languages: langs.join(", "),
      });
    } else {
      if (replace.targeting.geos.length > 1) {
        replace.targeting.demographics[0].languages = [selectedItem];
      } else replace.targeting.demographics[0].languages.push(selectedItem);
      langs = replace.targeting.demographics[0].languages;
      analytics.track(`a_ad_languages`, {
        source: "ad_targeting",
        source_action: "a_ad_languages",
        campaign_languages: langs.join(", "),
      });
    }

    if (replace.targeting.demographics[0].languages.length === 0) {
      analytics.track(`a_error_form`, {
        error_page: "ad_targeting",
        source_action: "a_ad_languages",
        error_description: "Please choose a language",
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
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.devices[0].os_type = selectedItem;
    replace.targeting.devices[0].os_version_min = "";
    replace.targeting.devices[0].os_version_max = "";
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
      this.props.save_campaign_info({
        campaignInfo: { ...replace },
      });
  };

  onSelectedVersionsChange = (selectedItem) => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.devices[0].os_version_min = selectedItem[0];
    replace.targeting.devices[0].os_version_max = selectedItem[1];
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
      this.props.save_campaign_info({
        campaignInfo: { ...replace },
      });
  };

  onSelectedMapChange = (selectedItems, unselect = false, locationsInfo) => {
    let stateRep = cloneDeep(this.state.campaignInfo);
    if (unselect) {
      stateRep.targeting.locations[0].circles = [];
      this.props.save_campaign_info({ markers: [], locationsInfo: [] });
    } else stateRep.targeting.locations[0].circles = selectedItems;
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
      this.props.save_campaign_info({
        campaignInfo: { ...stateRep },
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
  //   this.setState({
  //     campaignInfo: replace,
  //     value: this.formatNumber(budget)
  //   });
  //   !this.editCampaign &&
  //     this.props.save_campaign_info({
  //       campaignInfo: replace
  //     });
  // };

  onSelectedRegionChange = (
    selectedItem,
    regionName,
    country_code,
    unselect = false
  ) => {
    let replace = cloneDeep(this.state.campaignInfo);
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
        if (reg.regions.length > 3) regionsLength += reg.regions.length;
      });
      if (regionsLength === this.state.regionNames.length || unselect) {
        //if all the regions of all selected countries are selected
        //then regionNames.length will === all the regions of the selected countries
        //Meaning that this will unselect all the regions
        replace.targeting.geos.forEach(
          (co, i) => (replace.targeting.geos[i].region_id = [])
        );
        analytics.track(`a_ad_regions`, {
          source: "ad_targeting",
          source_action: "a_ad_regions",
          campaign_region_names: [],
        });
        rNamesSelected = [];
        this.setState({
          regionNames: rNamesSelected,
          campaignInfo: replace,
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
        analytics.track(`a_ad_regions`, {
          source: "ad_targeting",
          source_action: "a_ad_regions",
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
      analytics.track(`a_ad_regions`, {
        source: "ad_targeting",
        source_action: "a_ad_regions",
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
      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            lifetime_budget_micro: rawValue,
          },
          value: value,
          budgetOption,
        },
        () => this._calcReach()
      );

      analytics.track(`a_handle_budget`, {
        source: "ad_targeting",
        source_action: "a_handle_budget",
        custom_budget: false,
        campaign_budget: rawValue,
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
          description:
            this.state.campaignInfo.targeting.geos.length > 1
              ? `$25 x ${translate("no of Countries")} = $${
                  this.state.minValueBudget
                }`
              : "$" + this.state.minValueBudget,
          type: "warning",
          position: "top",
        });
      }
      analytics.track(`a_handle_budget`, {
        source: "ad_targeting",
        source_action: "a_handle_budget",
        custom_budget: true,
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
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.demographics[0].gender = gender;
    analytics.track(`a_ad_gender`, {
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
        r.geos.some((re) => re.hasOwnProperty("region_id")) &&
        r.geos.some((re) => re.region_id.length === 0)
      ) {
        r.geos.forEach(
          (re) => re.region_id.length === 0 && delete re.region_id
        );
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
        daily_budget_micro: this.state.campaignInfo.lifetime_budget_micro,
        campaign_id: this.state.campaignInfo.campaign_id,
        duration: this.state.duration,
      };

      let totalReach = {
        demographics: [
          {
            languages: this.props.languages.map((lang) => lang.id),
            min_age: 18,
            max_age: "50+",
          },
        ],
        geos: this.state.campaignInfo.targeting.geos.map((geo) => ({
          country_code: geo.country_code,
        })),
      };
      const obj2 = {
        targeting: JSON.stringify(totalReach),
        duration: this.state.duration,
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
      analytics.track(`a_error_form`, {
        error_page: "ad_targeting",
        source_action: "a_submit_ad_targeting",
        timestamp: new Date().getTime(),
        campaign_id: this.props.data.campaign_id,
        campaign_channel: "snapchat",
        campaign_ad_type: this.props.adType,
        error_description:
          countryError ||
          languagesError ||
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
      !languagesError &&
      !countryError
    ) {
      let rep = cloneDeep(this.state.campaignInfo);
      rep.lifetime_budget_micro =
        this.state.duration * this.state.campaignInfo.lifetime_budget_micro;
      if (rep.targeting.demographics[0].gender === "") {
        delete rep.targeting.demographics[0].gender;
      }

      // TODO: Region_id can be for multiple geos, not sure if need to clean/delete that too before sending to save target
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
      if (rep.targeting.devices[0] && rep.targeting.devices[0].os_type === "") {
        delete rep.targeting.devices[0].os_type;
      }
      if (
        rep.targeting.devices[0] &&
        rep.targeting.devices[0].os_version_max === ""
      ) {
        delete rep.targeting.devices[0].os_version_max;
        delete rep.targeting.devices[0].os_version_min;
      }
      if (
        Object.entries(rep.targeting.devices[0]).length === 0 &&
        rep.targeting.devices[0].constructor === Object
      ) {
        delete rep.targeting.devices;
      }
      if (rep.targeting.demographics[0].max_age === 50) {
        rep.targeting.demographics[0].max_age = "50+";
      }

      if (
        rep.targeting.locations &&
        rep.targeting.locations[0].circles &&
        rep.targeting.locations[0].circles.length === 0
      ) {
        delete rep.targeting.locations[0].circles;
      }
      if (
        Object.entries(rep.targeting.locations[0]).length === 0 &&
        rep.targeting.locations[0].constructor === Object
      ) {
        delete rep.targeting.locations;
      }

      if (rep.targeting.enable_targeting_expansion) {
        delete rep.targeting.enable_targeting_expansion;
      }
      rep.targeting = JSON.stringify(rep.targeting);
      let interestNamesList = [];
      interestNamesList =
        this.state.interestNames &&
        this.state.interestNames.length > 0 &&
        this.state.interestNames.map((inter) => inter.name);
      const segmentInfo = {
        campaign_id: this.props.campaign_id,

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
          this.state.campaignInfo.targeting.demographics[0].languages.length > 0
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
          this.state.campaignInfo.targeting.devices[0].marketing_name.length > 0
            ? this.state.campaignInfo.targeting.devices[0].marketing_name.join(
                ", "
              )
            : null,
        campaign_interests_names:
          interestNamesList && interestNamesList.length > 0
            ? interestNamesList.join(", ")
            : null,
        campaign_reach: formatNumber(this.props.average_reach, true),
      };
      if (this.editCampaign) {
        this.props.updateCampaign(
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

        /** If the audience list is empty for the first time create a new audience */
        if (this.props.audienceList.length === 0) {
          this.props.createAudience(
            {
              name: "Audience",
              targeting: rep.targeting,
            },
            false,
            this.state.locationsInfo
          );
        }
        this.props.ad_details(
          rep,
          {
            interestNames: this.state.interestNames,
            regionNames: this.state.regionNames,
            countryName: this.state.countryName,
          },
          this.props.navigation,
          segmentInfo,
          this.state.locationsInfo
        );
      }
    }
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
  createNewAudience = () => {
    this.props.setAudienceDetail({ reset: true });
    this.props.navigation.navigate("SnapchatAudienceTagetting", {
      source: "audience_list",
      source_action: "a_create_audience_detail",
      audience_channel: "snapchat",
    });
  };

  setSelectedAudience = (targeting, coordinates) => {
    let editedCampaign = cloneDeep(this.state.campaignInfo);
    let campaignTargeting = targeting;
    let locationsInfo = coordinates;
    if (this.editCampaign) {
      campaignTargeting.geos = editedCampaign.targeting.geos;
    }
    editedCampaign.targeting = {
      ...editedCampaign.targeting,
      ...campaignTargeting,
    };

    let editedCountryCodes = editedCampaign.targeting.geos.map(
      (geo) => geo.country_code
    );
    this.props.get_interests(editedCountryCodes.join(","));
    editedCampaign.targeting.demographics[0].max_age = parseInt(
      editedCampaign.targeting.demographics[0].max_age
    );
    let getCountryName = editedCampaign.targeting.geos.map(
      (geo, i) =>
        countries.find(
          (country) =>
            country.value === editedCampaign.targeting.geos[i].country_code
        ).label
    );
    let editedRegionNames = editedCampaign.targeting.geos.map((geo, i) =>
      country_regions.find(
        (country_region) =>
          country_region.country_code ===
          editedCampaign.targeting.geos[i].country_code
      )
    );
    let markers = [];
    if (locationsInfo) {
      locationsInfo = cloneDeep(JSON.parse(locationsInfo));
      markers = cloneDeep(campaignTargeting.locations[0].circles);
    }
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
      },
      () => {
        editedCampaign.targeting.geos.forEach(
          (geo, i) =>
            editedCampaign.targeting.geos[i].region_id &&
            editedCampaign.targeting.geos[i].region_id.forEach((id) => {
              let regN = editedRegionNames[i].regions.find(
                (region) => region.id === id
              );
              regN.country_code = editedCampaign.targeting.geos[i].country_code;
              stateRegionNames.push(regN);
            })
        );
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
          rep.targeting.devices[0].os_type = navAppChoice;
          this.setState({
            campaignInfo: rep,
          });
        }
        this.handleMultipleCountrySelection();
        this._calcReach();
        this.setState({
          regionNames: stateRegionNames,
          showRegions,
          showAudienceList: false,
        });
        !this.editCampaign &&
          this.props.save_campaign_info({
            campaignInfo: editedCampaign,
            countryName: getCountryName,
            regions: editedRegionNames,
            filteredRegions: editedRegionNames,
            showRegions,
            regionNames: stateRegionNames,
            markers,
            locationsInfo,
          });
      }
    );
  };

  handleAdDetailsFocus = () => {
    BackHandler.addEventListener(
      "hardwareBackPressAdDetails",
      this.handleBackButton
    );
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
          campaign_channel: "snapchat",
          campaign_ad_type: this.props.adType,
          campaign_name: this.props.data.name,
          campaign_id: this.props.data.campaign_id,
          campaign_brand_name: this.props.data.brand_name,
          campaign_headline: this.props.data.headline,
          campaign_attachment: this.props.data.attachment,
          campaign_swipe_up_CTA: this.props.data.call_to_action,
          campaign_swipe_up_destination: this.props.data.destination,
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
    if (!this.editCampaign) {
      this.props.saveCampaignSteps(
        this.props.adType === "StoryAd"
          ? ["Dashboard", "AdObjective", "AdCover", "AdDesign", "AdDetails"]
          : ["Dashboard", "AdObjective", "AdDesign", "AdDetails"]
      );
    }
    // let adjustAdDetailsTracker = new AdjustEvent("1mtblg");
    // adjustAdDetailsTracker.addPartnerParameter(
    //   `Snap_${this.props.adType}`,
    //   this.props.adType
    // );
    // Adjust.trackEvent(adjustAdDetailsTracker);
  };

  handleAdDetailsBlur = () => {
    BackHandler.removeEventListener(
      "hardwareBackPressAdDetails",
      this.handleBackButton
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    let { campaignInfo, startEditing, showAudienceList } = this.state;
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
            _handleAge={this._handleAge}
            _handleSideMenuState={this._handleSideMenuState}
            ageValuesRange={[13, 50]}
            minAge={this.state.campaignInfo.targeting.demographics[0].min_age}
            maxAge={this.state.campaignInfo.targeting.demographics[0].max_age}
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
            region_id={this.state.campaignInfo.targeting.geos}
            filterRegions={this.filterRegions}
            locationsSelected={
              campaignInfo.targeting.locations[0].circles.length > 0
            }
            onSelectedMapChange={this.onSelectedMapChange}
          />
        );

        break;
      }
      case "map": {
        if (!LocationMap) {
          LocationMap = require("../../../MiniComponents/LocationMap").default;
        }
        menu = (
          <SnapchatLocation
            country_code={
              this.state.campaignInfo.targeting.geos[0].country_code
            }
            screenProps={this.props.screenProps}
            _handleSideMenuState={this._handleSideMenuState}
            circles={this.state.campaignInfo.targeting.locations[0].circles}
            locationsInfo={this.state.locationsInfo}
            onSelectedMapChange={this.onSelectedMapChange}
            save_campaign_info={this.props.save_campaign_info}
            data={this.props.data}
            regionsSelected={campaignInfo.targeting.geos}
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
            data={
              this.props.data &&
              this.props.data.appChoice &&
              ((this.props.data.attachment.ios_app_id &&
                this.props.data.attachment.ios_app_id !== "") ||
                (this.props.data.attachment.android_app_url &&
                  this.props.data.attachment.android_app_url !== ""))
                ? [
                    {
                      value: this.state.campaignInfo.targeting.devices[0]
                        .os_type,
                      label:
                        this.state.campaignInfo.targeting.devices[0].os_type ===
                        ""
                          ? "All"
                          : this.state.campaignInfo.targeting.devices[0]
                              .os_type,
                    },
                  ]
                : OSType
            }
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
            country_code={this.state.campaignInfo.targeting.geos}
            onSelectedCountryChange={this.onSelectedCountryChange}
            country_codes={this.state.campaignInfo.targeting.geos}
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
            editCampaign={this.editCampaign}
          />
        );
        break;
      }
    }

    let regions_names = [];
    regions_names = this.state.regionNames
      .map((regN) => translate(regN.name))
      .join(", ");
    let languages_names = [];
    if (typeof this.props.languages === "object")
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
      <View style={{ height: "100%", backgroundColor: "#F8F8F8" }}>
        <SafeAreaView
          style={{ backgroundColor: !this.editCampaign ? "#fff" : "#F8F8F8" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        {!this.editCampaign ? (
          <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Ad Details Back Button",
              obj: {
                businessname: this.props.mainBusiness.businessname,
              },
              source: "ad_targeting",
              source_action: "a_go_back",
            }}
            actionButton={
              this.editCampaign
                ? () => this.props.navigation.navigate("CampaignDetails")
                : undefined
            }
            icon="snapchat"
            actionButton={this.handleBackButton}
            adType={this.props.adType}
            currentScreen="Audience"
            title={"Campaign details"}
          />
        ) : (
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Ad Details Back Button",
              obj: {
                businessname: this.props.mainBusiness.businessname,
              },
              source: "ad_targeting",
              source_action: "a_go_back",
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
            titleStyle={{ color: globalColors.rum }}
            iconColor={globalColors.rum}
            topRightButtonText={translate("Edit")}
            navigation={this.editCampaign ? undefined : this.props.navigation}
            title={this.editCampaign ? "Audience" : "Campaign details"}
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
                onDidFocus={this.handleAdDetailsFocus}
                onBlur={this.handleAdDetailsBlur}
              />

              <Content
                scrollEnabled={false}
                contentContainerStyle={styles.contentContainer}
              >
                {!this.editCampaign ? (
                  <View style={{ marginTop: 5 }}>
                    <Row
                      size={-1}
                      style={{
                        alignItems: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      <WalletIcon
                        width={30}
                        height={30}
                        fill={globalColors.rum}
                      />
                      <Text
                        uppercase
                        style={[
                          styles.subHeadings,
                          { paddingHorizontal: 10, fontSize: 14 },
                        ]}
                      >
                        {translate("Set your daily budget")}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#FFF",
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                          borderRadius: 30,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.subHeadings,
                            {
                              fontSize: 10,
                              paddingHorizontal: 0,
                              color: globalColors.orange,
                            },
                          ]}
                        >
                          {translate("Lifetime budget")}
                        </Text>
                        <Text
                          style={[
                            styles.subHeadings,
                            {
                              fontSize: 14,
                              paddingHorizontal: 0,
                              paddingVertical: 0,
                            },
                          ]}
                        >
                          $
                          {formatNumber(
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
                        name="keyboard-arrow-left"
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
                        {
                          paddingHorizontal: 0,
                          width: "60%",
                          fontSize: 14,
                        },
                      ]}
                    >
                      {"Select Audience"}
                    </Text>
                    {showAudienceList && !this.props.audienceListLoading && (
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={this.createNewAudience}
                      >
                        <PurplePlusIcon
                          width={15}
                          height={15}
                          style={{ marginHorizontal: 5 }}
                        />
                        <Text
                          style={{
                            fontFamily: "montserrat-regular",
                            fontSize: 12,
                            color: "#9325FF",
                          }}
                        >
                          {translate("Create")}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {!showAudienceList && this.props.audienceList.length > 0 ? (
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={this.chooseExistingAudience}
                      >
                        <Text
                          style={{
                            fontFamily: "montserrat-regular",
                            fontSize: 12,
                            color: "#9325FF",
                          }}
                        >
                          {translate("Choose Preset")}
                        </Text>
                        <Icon
                          name="keyboard-arrow-right"
                          type="MaterialIcons"
                          style={{
                            fontSize: 20,
                            color: globalColors.purple,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      this.props.audienceListLoading && (
                        <ActivityIndicator
                          color={globalColors.purple}
                          size="small"
                          style={{
                            right: "100%",
                          }}
                        />
                      )
                    )}
                  </View>
                )}
                {showAudienceList && (
                  <SnapchatAudienceList
                    screenProps={this.props.screenProps}
                    navigation={this.props.navigation}
                    chooseExistingAudience={this.chooseExistingAudience}
                    setSelectedAudience={this.setSelectedAudience}
                  />
                )}
                {!showAudienceList && (
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
                )}
                <AudienceReach
                  loading={this.props.loading}
                  campaignInfo={campaignInfo}
                  _handleSubmission={this._handleSubmission}
                  startEditing={startEditing}
                  campaignInfo={campaignInfo}
                  editCampaign={this.editCampaign}
                  screenProps={this.props.screenProps}
                />
              </Content>
            </View>
          </Sidemenu>
        </View>
      </View>
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
  audienceList: state.audience.audienceList,
  audienceListLoading: state.audience.audienceListLoading,
});

const mapDispatchToProps = (dispatch) => ({
  ad_details: (info, names, navigation, segmentInfo, locationsInfo) =>
    dispatch(
      actionCreators.ad_details(
        info,
        names,
        navigation,
        segmentInfo,
        locationsInfo
      )
    ),
  updateCampaign: (info, businessid, navigation, segmentInfo) =>
    dispatch(
      actionCreators.updateCampaign(info, businessid, navigation, segmentInfo)
    ),
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
  getAudienceList: () => dispatch(actionCreators.getAudienceList()),
  createAudience: (audience, navigate, locationsInfo) =>
    dispatch(actionCreators.createAudience(audience, navigate, locationsInfo)),
  setAudienceDetail: (audienceInfo) =>
    dispatch(actionCreators.setAudienceDetail(audienceInfo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
