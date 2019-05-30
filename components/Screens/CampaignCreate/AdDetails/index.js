//Components
import React, { Component } from "react";
import {
  View,
  Slider,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  BackHandler,
  SafeAreaView
} from "react-native";
import Modal from "react-native-modal";
import {
  Text,
  Container,
  Icon,
  Content,
  Header,
  Left,
  Body
} from "native-base";
import cloneDeep from "lodash/cloneDeep";
import { LinearGradient, Segment, Video } from "expo";
import Sidemenu from "react-native-side-menu";
import { TextInputMask } from "react-native-masked-text";
import ReachBar from "./ReachBar";
import SelectRegions from "../../../MiniComponents/SelectRegions";
import SelectLanguages from "../../../MiniComponents/SelectLanguages";
import GenderOptions from "../../../MiniComponents/GenderOptions/GenderOptions";
import AgeOption from "../../../MiniComponents/AgeOptions/AgeOption";
import MultiSelectSections from "../../../MiniComponents/MultiSelect/MultiSelect";
import deepmerge from "deepmerge";
import BackButton from "../../../MiniComponents/BackButton";
import isNan from "lodash/isNaN";
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
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Validators
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import SelectOS from "../../../MiniComponents/SelectOS";
import { showMessage } from "react-native-flash-message";
import isEqual from "lodash/isEqual";
import combineMerge from "./combineMerge";
class AdDetails extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    state: {
      editCampaign: false
    }
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
          geos: [{ country_code: "", region_id: [] }]
        }
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
      selectionOption: ""
    };
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
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    Segment.screen("Select Ad Details Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      checkout_id: this.props.campaign_id,
      step: 4
    });
    this.props.get_languages();
    if (this.props.navigation.getParam("editCampaign", false)) {
      let editedCampaign = deepmerge(
        this.state.campaignInfo,
        this.props.navigation.state.params.campaign,
        { arrayMerge: combineMerge }
      );
      editedCampaign.targeting.demographics[0].max_age = parseInt(
        editedCampaign.targeting.demographics[0].max_age
      );
      getCountryName = countries.find(
        country =>
          country.value === editedCampaign.targeting.geos[0].country_code
      ).label;
      this.onSelectedCountryChange(
        editedCampaign.targeting.geos[0].country_code,
        null,
        getCountryName
      );
      let editedRegionNames = country_regions.find(
        country_region =>
          country_region.country_code ===
          editedCampaign.targeting.geos[0].country_code
      );
      editedCampaign.targeting.geos[0].region_id.forEach(id => {
        let name = editedRegionNames.regions.find(region => region.id === id)
          .name;
        this.onSelectedRegionChange(id, name);
      });
      await this.setState({
        campaignInfo: editedCampaign
      });
    } else {
      await this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          campaign_id: this.props.campaign_id,
          lifetime_budget_micro: this.props.minValueBudget
        },
        minValueBudget: this.props.minValueBudget,
        maxValueBudget: this.props.maxValueBudget,
        value: this.formatNumber(this.props.minValueBudget)
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
  onSelectedCountryChange = async (selectedItem, mounting, countryName) => {
    let replace = this.state.campaignInfo;
    let newCountry = selectedItem;

    if (typeof newCountry !== "undefined") {
      replace.targeting.geos[0].country_code = newCountry;
      replace.targeting.geos[0].region_id = [];
      let reg = country_regions.find(
        c => c.country_code === replace.targeting.geos[0].country_code
      );
      await this.setState({
        campaignInfo: replace,
        regions: reg.regions,
        filteredRegions: reg.regions,
        regionNames: [],
        countryName
      });
    }
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
    if (replace.targeting.demographics[0].languages.length === 0) {
      showMessage({
        message: "Please choose a language.",
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
      campaignInfo: replace,
      value: this.formatNumber(budget)
    });
  };

  onSelectedRegionChange = (selectedItem, regionName) => {
    console.log(selectedItem, regionName);

    let replace = this.state.campaignInfo;
    let names = this.state.regionNames;
    if (replace.targeting.geos[0].region_id.find(r => r === selectedItem)) {
      replace.targeting.geos[0].region_id = replace.targeting.geos[0].region_id.filter(
        r => r !== selectedItem
      );
    } else {
      replace.targeting.geos[0].region_id.push(selectedItem);
    }
    if (names.find(r => r === regionName)) {
      names = names.filter(r => r !== regionName);
    } else {
      names.push(regionName);
    }
    this.setState({ campaignInfo: replace, regionNames: names });
  };

  formatNumber = num => {
    return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  _handleBudget = (value, rawValue) => {
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
        value: value
      });
      return true;
    } else {
      showMessage({
        message: validateWrapper("Budget", rawValue)
          ? validateWrapper("Budget", rawValue)
          : "Budget can't be less than the minimum",
        type: "warning",
        position: "top"
      });
      this.setState({
        campaignInfo: {
          ...this.state.campaignInfo,
          lifetime_budget_micro: this.state.minValueBudget
        },
        value: value
      });
      return false;
    }
  };

  _handleSubmission = () => {
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
        message: "Please choose a country.",
        type: "warning",
        position: "top"
      });
    } else if (languagesError) {
      showMessage({
        message: "Please choose a language.",
        type: "warning",
        position: "top"
      });
    }

    if (
      this._handleBudget(
        this.state.value,
        this.state.campaignInfo.lifetime_budget_micro
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
      if (rep.targeting.demographics[0].max_age >= 35) {
        rep.targeting.demographics[0].max_age = "35+";
      }
      rep.targeting = JSON.stringify(rep.targeting);

      if (this.props.navigation.getParam("editCampaign", false)) {
        Segment.trackWithProperties("Select Ad Details Button (Update)", {
          business_name: this.props.mainBusiness.businessname,
          campaign_id: this.props.campaign_id
        });

        this.props.updateCampaign(
          rep,
          this.props.mainBusiness.businessid,
          this.props.navigation
        );
      } else {
        Segment.trackWithProperties("Select Ad Details Button", {
          business_name: this.props.mainBusiness.businessname,
          campaign_budget: this.state.campaignInfo.lifetime_budget_micro,
          campaign_id: this.props.campaign_id
        });
        Segment.trackWithProperties("Completed Checkout Step", {
          checkout_id: this.props.campaign_id,
          step: 4,
          business_name: this.props.mainBusiness.businessname
        });
        this.props.ad_details(
          rep,
          {
            interestNames: this.state.interestNames,
            regionNames: this.state.regionNames,
            countryName: this.state.countryName
          },
          this.props.navigation,
          this.props.navigation.getParam("image", "")
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
            languages: this.props.languages.map(lang => lang.id),
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
    }
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
    this.props.languages.forEach(r => {
      if (
        this.state.campaignInfo.targeting.demographics[0].languages.find(
          i => i === r.id
        )
      ) {
        languages_names.push(r.name);
      }
    });
    languages_names = languages_names.join(", ");

    let interests_names = [];
    this.state.interestNames.forEach(r => {
      interests_names.push(r.name);
    });
    interests_names = interests_names.join(", ");

    let editCampaign = this.props.navigation.getParam("editCampaign", false);
    //   this.props.navigation.state.params &&
    //   this.props.navigation.state.params.editCampaign;
    const campaign = this.props.navigation.getParam("campaign", {});
    const image = this.props.navigation.getParam("image", "");
    return (
      <SafeAreaView style={styles.container}>
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
          menu={this.state.sidemenustate && menu}
          menuPosition="right"
          openMenuOffset={wp("85%")}
          isOpen={this.state.sidemenustate}
        >
          <Container
            style={[
              styles.container,
              {
                flex: 1,
                display: "flex",
                // height: "100%",
                // backgroundColor: "transparent",
                // top: 50,
                marginTop: 40,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                overflow: "hidden",
                justifyContent: "space-between",
                backgroundColor: "black"
              }
            ]}
          >
            {(!image.includes(".jpg") ||
              !image.includes(".png") ||
              (campaign.media && !campaign.media.includes(".jpg")) ||
              (campaign.media && !campaign.media.includes(".png"))) && (
              <View
                style={[
                  styles.backgroundViewWrapper,
                  {
                    // borderTopRightRadius: 20,
                    // borderTopLeftRadius: 20,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: "black",
                    opacity: 0.2
                  }
                ]}
              >
                <Video
                  source={{
                    uri: editCampaign ? "http://" + campaign.media : image
                  }}
                  shouldPlay
                  isLooping
                  isMuted
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0.4,
                    backgroundColor: "black"
                  }}
                />
              </View>
            )}
            <ImageBackground
              imageStyle={{ opacity: 0.2 }}
              style={[
                styles.backgroundViewWrapper,

                {
                  width: "100%",
                  height: "100%",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  overflow: "hidden"
                }
              ]}
              source={{
                uri: image.includes(".jpg") ? image : "www.go.com"
              }}
            />
            <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
              <Header transparent noShadow iosBarStyle={"light-content"}>
                <Left style={{ flex: 0 }}>
                  <BackButton
                    style={{ top: 0, left: 0 }}
                    screenname="Ad Details"
                    businessname={this.props.mainBusiness.businessname}
                    navigation={
                      editCampaign
                        ? () =>
                            this.props.navigation.navigate("CampaignDetails")
                        : this.props.navigation.goBack
                    }
                  />
                </Left>
                <Body>
                  <Text style={styles.headline}>
                    Input your campaign details
                  </Text>
                </Body>
              </Header>

              <Content
                scrollEnabled={false}
                contentContainerStyle={{
                  flex: 1
                  // justifyContent: "space-around"
                }}
              >
                {!editCampaign ? (
                  <>
                    <Text style={[styles.subHeadings, { paddingVertical: 10 }]}>
                      Budget
                    </Text>
                    <View
                      style={{
                        //   height: 100,
                        //   width: 200,
                        flexDirection: "column",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: 15,
                        alignSelf: "center",
                        justifyContent: "space-around",
                        //   marginVertical: 10,
                        paddingVertical: 10
                      }}
                    >
                      <TextInputMask
                        includeRawValueInChangeText
                        type={"money"}
                        options={{
                          precision: 0,
                          delimiter: ",",
                          unit: "$"
                        }}
                        disabled={editCampaign}
                        maxLength={8}
                        defaultValue={this.state.value + ""}
                        value={this.state.value + ""}
                        onChangeText={(value, rawText) => {
                          if (!editCampaign) this._handleBudget(value, rawText);
                        }}
                        style={[
                          styles.budget,
                          { paddingBottom: 0, width: "100%" }
                        ]}
                        ref={ref => (this.moneyField = ref)}
                      />
                      <Text
                        style={[
                          styles.colorGrey,
                          {
                            fontSize: 11,
                            alignSelf: "center",
                            paddingHorizontal: 20
                          }
                        ]}
                      >
                        Tap to enter manually
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.slidercontainer,
                        {
                          alignSelf: "center",
                          paddingVertical: 10,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                          paddingHorizontal: 40
                        }
                      ]}
                    >
                      <View style={styles.textCon}>
                        <Text style={styles.colorGrey}>
                          ${this.state.minValueBudget}
                        </Text>
                        {/* <View
                        style={{
                          //   left: wp(4),
                          justifyContent: "center"
                        }}
                      > */}
                        <Text
                          style={[
                            styles.colorGrey,
                            {
                              fontSize: 11
                              // alignSelf: "center"
                            }
                          ]}
                        >
                          $25/day
                        </Text>
                        {/* </View> */}
                        <Text style={styles.colorGrey}>
                          ${this.state.maxValueBudget}
                        </Text>
                      </View>

                      <Slider
                        thumbTintColor={globalColors.orange}
                        disabled={editCampaign}
                        style={{
                          width: "100%",
                          height: 20
                        }}
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
                        maximumTrackTintColor="#fff"
                        minimumTrackTintColor="#751AFF"
                      />
                    </View>
                  </>
                ) : (
                  <View style={{ height: 50 }} />
                )}
                <Text style={[styles.subHeadings, { paddingVertical: 10 }]}>
                  Who would you like to reach?
                </Text>
                <ScrollView
                  indicatorStyle="white"
                  style={{
                    flexDirection: "column",
                    marginHorizontal: 40,
                    paddingBottom: 50
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
                            this.state.campaignInfo.targeting.demographics[0]
                              .min_age
                          }{" "}
                          -{" "}
                          {this.state.campaignInfo.targeting.demographics[0]
                            .max_age === 35
                            ? "35+"
                            : this.state.campaignInfo.targeting.demographics[0]
                                .max_age}
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
                          {this.state.countryName}
                        </Text>
                      </View>
                    </View>
                    {this.state.campaignInfo.targeting.geos[0].country_code ? (
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
                          {this.state.regionNames.join(", ")}
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

                    {this.state.campaignInfo.targeting.demographics[0].languages
                      .length !== 0 ? (
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
                        <Text style={styles.menutext}>Operating System</Text>
                        <Text style={styles.menudetails}>
                          {
                            OSType.find(r => {
                              if (
                                r.value ===
                                this.state.campaignInfo.targeting.devices[0]
                                  .os_type
                              )
                                return r;
                            }).label
                          }
                        </Text>
                      </View>
                    </View>

                    {this.state.campaignInfo.targeting.devices[0].os_type ===
                      "" ||
                    this.state.campaignInfo.targeting.devices[0].os_type ? (
                      <GreenCheckmarkIcon width={25} height={25} />
                    ) : (
                      <PlusCircleIcon width={25} height={25} />
                    )}
                  </TouchableOpacity>
                  {this.state.campaignInfo.targeting.devices[0].os_type !==
                    "" && (
                    <TouchableOpacity
                      onPress={() => {
                        this._renderSideMenu("selectors", "deviceVersions");
                      }}
                      style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <View style={{ flexDirection: "row", width: "80%" }}>
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
                        .os_version_min !== "" ? (
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

                    {this.state.campaignInfo.targeting.devices[0].marketing_name
                      .length !== 0 ? (
                      <GreenCheckmarkIcon width={25} height={25} />
                    ) : (
                      <PlusCircleIcon width={25} height={25} />
                    )}
                  </TouchableOpacity>
                </ScrollView>
                <Text
                  onPress={() =>
                    this.setState({ advance: !this.state.advance })
                  }
                  style={[styles.budget, { fontSize: 14, paddingBottom: 30 }]}
                >
                  Scroll for more options+
                </Text>

                <ReachBar
                  advance={this.state.advance}
                  _handleSubmission={this._handleSubmission}
                />
              </Content>
            </Content>
          </Container>
        </Sidemenu>
        <Modal isVisible={this.props.loading}>
          <LoadingScreen top={50} />
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  minValueBudget: state.campaignC.minValueBudget,
  maxValueBudget: state.campaignC.maxValueBudget,
  data: state.campaignC.data,
  average_reach: state.campaignC.average_reach,
  loading: state.campaignC.loadingDetail,
  mainBusiness: state.account.mainBusiness,
  languages: state.campaignC.languagesList
});

const mapDispatchToProps = dispatch => ({
  ad_details: (info, names, navigation, image) =>
    dispatch(actionCreators.ad_details(info, names, navigation, image)),
  updateCampaign: (info, businessid, navigation) =>
    dispatch(actionCreators.updateCampaign(info, businessid, navigation)),

  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
  get_languages: () => dispatch(actionCreators.get_languages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDetails);
