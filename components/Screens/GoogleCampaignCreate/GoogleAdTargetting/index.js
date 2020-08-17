//Components
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  I18nManager,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { Text, Container, Icon, Content } from "native-base";
import * as Segment from "expo-analytics-segment";
import Sidemenu from "../../../MiniComponents/SideMenu";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import { showMessage } from "react-native-flash-message";
import SideMenuContainer from "../../../MiniComponents/SideMenuContainer";
import RadioButtons from "../../../MiniComponents/RadioButtons";
import KeywordsSelectionList from "../../../MiniComponents/KeywordsSelectionList";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import LowerButton from "../../../MiniComponents/LowerButton";
import { BudgetCards } from "./BudgetCards";
import KeywordsCarousel from "../../../MiniComponents/KeywordsCarousel";

//Data
import gender from "../../../Data/gender.googleSE.data";
import ageRange from "../../../Data/ageRange.googleSE.data";

//Icons
import GreenCheckmarkIcon from "../../../../assets/SVGs/GreenCheckmark.svg";
import GenderIcon from "../../../../assets/SVGs/Gender.svg";
import PlusCircleIcon from "../../../../assets/SVGs/PlusCircleOutline.svg";
import AgeIcon from "../../../../assets/SVGs/AdDetails/AgeIcon";
import PlusCircle from "../../../../assets/SVGs/PlusCircle.svg";

//Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../../GlobalStyles";

//Redux Axios
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

import isNan from "lodash/isNaN";
import isUndefined from "lodash/isUndefined";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import isNull from "lodash/isNull";
import { AdjustEvent, Adjust } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";

class GoogleAdTargetting extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
          budget:  this.props.campaign &&  this.props.campaign.recommendedBudget ? this.props.campaign.recommendedBudget * 2: 0,
      age: ["Undetermined"],
      gender: "Undetermined",
      keywords: [],
      sidemenustate: false,
      sidemenu: "gender",
                budget:  this.props.campaign &&  this.props.campaign.recommendedBudget ? this.props.campaign.recommendedBudget * 2: 0,    
      modalVisible: false,
      selectionOption: "",
      budgetOption: 1,
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    let keys = Object.keys(this.state).filter((key) => {
      if (this.props.campaign.hasOwnProperty(key)) return key;
    });

    let data = { ...this.state };
    keys.filter((key) => {
      data = {
        ...data,
        [key]: this.props.campaign[key],
      };
    }, {});

    this.setState(
      {
        ...data,
        budget: this.props.campaign.campaignDateChanged
          ? this.props.campaign.recommendedBudget * 2
          : this.props.campaign.budget,
        value: this.props.campaign.campaignDateChanged
          ? this.props.campaign.recommendedBudget * 2
          : this.props.campaign.budget,
        budgetOption: this.props.campaign.campaignDateChanged
          ? 1
          : !isNull(this.props.campaign.budgetOption) ||
            !isUndefined(this.props.campaign.budgetOption)
          ? this.props.campaign.budgetOption
          : 1,
      },
      () =>
        this.props.save_google_campaign_data({
          budgetOption: this.state.budgetOption,
        })
    );

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // onSelectedBudgetChange = budget => {
  //   this.setState({
  //     budget: budget,
  //     value: this.formatNumber(budget)
  //   });
  //   segmentEventTrack("Selected Budget Change", {
  //     campaign_budget: budget
  //   });
  //   this.props.save_google_campaign_data({ budget: budget });
  //   this.props.setCampaignInfoForTransaction({
  //     campaign_id: this.props.campaign.id,
  //     campaign_budget: budget
  //   });
  // };

  formatNumber = (num) => {
    return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  _handleSideMenuState = (status) => {
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    analytics.track(`a_open_side_menu`, {
      menu_component: component,
      source: "ad_targeting",
      source_action: "a_open_side_menu",
    });
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  _handleGenderSelection = (gender) => {
    this.setState({ gender: gender });

    analytics.track(`a_ad_gender`, {
      source: "ad_targeting",
      source_action: "a_ad_gender",
      campaign_type: "google",
      campaign_id: this.props.campaign.id,
      campaign_gender: gender,
    });
    this.props.save_google_campaign_data({ gender: gender });
  };

  _handleAgeSelection = (val) => {
    if (val === "Undetermined") {
      analytics.track(`a_ad_age`, {
        source: "ad_targeting",
        source_action: "a_ad_age",
        campaign_age: [val],
      });
      this.setState({ age: [val] });
      this.props.save_google_campaign_data({ age: [val] });
    } else {
      var res;
      if (isUndefined(this.state.age.find((l) => l === val))) {
        res = this.state.age.filter((l) => l !== val);
        res = this.state.age.filter((l) => l !== "Undetermined");
        this.setState({ age: [...res, val] });

        analytics.track(`a_ad_age`, {
          source: "ad_targeting",
          source_action: "a_ad_age",
          campaign_age: [...res, val],
        });
        this.props.save_google_campaign_data({ age: [...res, val] });
      } else {
        res = this.state.age.filter((l) => l !== val);
        if (res.length === 0) {
          res = ["Undetermined"];
        } else if (res.length - 1 !== 0) {
          res = res.filter((l) => l !== "Undetermined");
        }
        analytics.track(`a_ad_age`, {
          source: "ad_targeting",
          source_action: "a_ad_age",
          campaign_age: res,
        });
        this.setState({ age: res });
        this.props.save_google_campaign_data({ age: res });
      }
    }
  };

  _handleAddKeyword = (keyword) => {
    if (keyword === "Reset") {
      analytics.track(`a_ad_keywords`, {
        source: "ad_targeting",
        source_actions: "a_ad_keywords",
        campaign_keywords: [],
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
      });
      this.setState({ keywords: [] });
      this.props.save_google_campaign_data({ keywords: [] });
      return;
    }
    var res = this.state.keywords.filter((l) => l !== keyword);
    if (isUndefined(this.state.keywords.find((l) => l === keyword))) {
      this.setState({ keywords: [...res, keyword] });
      analytics.track(`a_ad_keywords`, {
        source: "ad_targeting",
        source_actions: "a_ad_keywords",
        campaign_keywords: [...res, keyword],
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
      });
      this.props.save_google_campaign_data({
        keywords: [...res, keyword],
      });
    } else {
      analytics.track(`a_ad_keywords`, {
        source: "ad_targeting",
        source_actions: "a_ad_keywords",
        campaign_keywords: res,
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
      });

      this.setState({ keywords: res });
      this.props.save_google_campaign_data({
        keywords: res,
      });
    }
  };

  _handleBudget = (value, rawValue, onBlur, budgetOption) => {
    const { translate } = this.props.screenProps;
    if (
      !validateWrapper("Budget", rawValue) &&
      rawValue >= this.props.campaign.minValueBudget &&
      !isNan(rawValue)
    ) {
      this.setState({
        budget: rawValue,
        value: value,
        budgetOption,
      });
      analytics.track(`a_handle_budget`, {
        source: "ad_targeting",
        source_action: "a_handle_budget",
        custom_budget: false,
        campaign_budget: rawValue,
      });
      this.props.save_google_campaign_data({
        budget: rawValue,
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
          description: "$" + this.props.campaign.minValueBudget,
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
        budget: rawValue,
        value: value,
        budgetOption,
      });
      this.props.save_google_campaign_data({
        budget: rawValue,
        budgetOption,
      });

      return false;
    }
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    const keywordsError =
      this.state.keywords.length === 0
        ? "Please choose keywords for your product"
        : null;

    this.props.setCampaignInfoForTransaction({
      campaign_id: this.props.campaign.id,
      campaign_budget: this.state.budget,
    });
    let data = {
      budget: this.state.budget,
      age: this.state.age,
      gender: this.state.gender,
      keywords: this.state.keywords,
    };
    if (
      this._handleBudget(
        this.state.value,
        this.state.budget,
        true,
        this.state.budgetOption
      ) &&
      !keywordsError
    ) {
      const segmentInfo = {
        campaign_id: this.props.campaign.id,
        campaign_budget: this.state.budget,
        campaign_age: this.state.age,
        campaign_gender: this.state.gender,
        campaign_keywords: this.state.keywords,
        source: "ad_targeting",
        source_action: "a_submit_ad_targeting",
        campaign_ad_type: "GoogleSEAd",
        campaign_channel: "google",
      };

      this.props.create_google_SE_campaign_ad_targeting(
        {
          businessid: this.props.mainBusiness.businessid,
          id: this.props.campaign.id,
          completed: true,
          ...data,
        },
        segmentInfo
      );
      this.props.save_google_campaign_data(data);
    } else {
      analytics.track(`a_error_form`, {
        error_page: "ad_targeting",
        source_action: "a_submit_ad_targeting",
        error_description: isNull(keywordsError)
          ? "Budget can't be less than the minimum"
          : keywordsError,
      });
      showMessage({
        message: isNull(keywordsError)
          ? translate("Budget can't be less than the minimum")
          : translate(keywordsError),
        description: isNull(keywordsError)
          ? "$" + this.props.campaign.minValueBudget
          : "",

        type: "warning",
        position: "top",
      });
    }
  };

  handleGoogleAdDetailsFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    const segmentInfo = {
      campaign_channel: "google",
      campaign_ad_type: "GoogleSEAd",
      campaign_duration:
        Math.ceil(
          (new Date(this.props.campaign.end_time) -
            new Date(this.props.campaign.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_name: this.props.campaign.name,
      campaign_language: this.props.campaign.language,
      campaign_start_date: this.props.campaign.start_time,
      campaign_end_date: this.props.campaign.end_time,
      campaign_location: this.props.campaign.location,
      campaign_country: this.props.campaign.country,
      campaign_id: this.props.campaign.id,
      campaign_headline1: this.props.campaign.headline1,
      campaign_headline2: this.props.campaign.headline2,
      campaign_headline3: this.props.campaign.headline3,
      campaign_description: this.props.campaign.description,
      campaign_description2: this.props.campaign.description2,
      campaign_finalurl: this.props.campaign.finalurl,
    };
    analytics.track("ad_targeting", {
      timestamp: new Date().getTime(),
      source,
      source_action,
      ...segmentInfo,
    });

    this.props.save_google_campaign_steps([
      "Dashboard",
      "GoogleAdInfo",
      "GoogleAdDesign",
      "GoogleAdTargetting",
    ]);
    // Segment.screenWithProperties("Google Ad Targetting", {
    //   category: "Campaign Creation",
    //   channel: "google",
    // });
    // Segment.trackWithProperties("Viewed Checkout Step", {
    //   checkout_id: this.props.campaign.id,
    //   step: 4,
    // });
    let adjustGoogleAdDetailsTracker = new AdjustEvent("1mtblg");
    adjustGoogleAdDetailsTracker.addPartnerParameter(
      `Google_SEM`,
      "google_sem"
    );

    Adjust.trackEvent(adjustGoogleAdDetailsTracker);
  };
  render() {
    const { translate } = this.props.screenProps;
    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <SideMenuContainer
            children={
              <RadioButtons
                screenProps={this.props.screenProps}
                data={gender}
                _handleChange={this._handleGenderSelection}
                selected={this.state.gender}
                id={"value"}
                value={"value"}
                label={"label"}
              />
            }
            icon={"gender"}
            title={"Gender"}
            subtitle={"Select your audience's Gender"}
            _handleSideMenuState={this._handleSideMenuState}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "age": {
        menu = (
          <SideMenuContainer
            children={
              <RadioButtons
                screenProps={this.props.screenProps}
                data={ageRange}
                _handleChange={this._handleAgeSelection}
                selected={this.state.age}
                id={"value"}
                value={"value"}
                label={"label"}
              />
            }
            icon={"age"}
            title={"Age"}
            subtitle={"Select your audience's Age Range"}
            _handleSideMenuState={this._handleSideMenuState}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }

      case "keywords": {
        menu = (
          <SideMenuContainer
            children={
              <KeywordsSelectionList
                _handleSearch={this.props.get_google_SE_keywords}
                loading={this.props.campaign.loading}
                _handleAddItem={this._handleAddKeyword}
                selected={this.state.keywords}
                data={this.props.campaign.fetchedKeywords}
                campaign_id={this.props.campaign.id}
                businessid={this.props.mainBusiness.businessid}
                screenProps={this.props.screenProps}
                source={"ad_targeting"}
              />
            }
            icon={""}
            title={"Products"}
            subtitle={""}
            _handleSideMenuState={this._handleSideMenuState}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
    }

    return (
      <Sidemenu
        onChange={(isOpen) => {
          if (isOpen === false) {
            this._handleSideMenuState(isOpen);
          }
        }}
        disableGestures={true}
        menu={this.state.sidemenustate && menu}
        menuPosition={I18nManager.isRTL ? "left" : "right"}
        openMenuOffset={wp("100%")}
        isOpen={this.state.sidemenustate}
      >
        <View style={[styles.safeArea]}>
          <SafeAreaView style={{ backgroundColor: "#fff" }} />

          <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Google SE Targetting Back Button",
              obj: {
                businessname: this.props.mainBusiness.businessname,
              },
              source: "ad_targeting",
              source_action: "a_go_back",
            }}
            icon="google"
            navigation={this.props.navigation}
            currentScreen="Audience"
            title={"Campaign details"}
            disabled={this.props.campaign.uploading}
          />
          <NavigationEvents onDidFocus={this.handleGoogleAdDetailsFocus} />
          <Content
            scrollEnabled={false}
            contentContainerStyle={styles.contentContainer}
          >
            <Text style={styles.subHeadings}>
              {translate("Set your budget")}
            </Text>
            <BudgetCards
              value={this.state.value}
              recBudget={this.props.campaign.recommendedBudget}
              lifetime_budget_micro={this.state.budget}
              budgetOption={this.state.budgetOption}
              _handleBudget={this._handleBudget}
              uploading={this.props.campaign.uploading}
              screenProps={this.props.screenProps}
              campaign={this.props.campaign}
            />

            <Text style={styles.subHeadings}>
              {translate("What are you promoting?")}
            </Text>
            {this.state.keywords.length !== 0 ? (
              <View
                style={{
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <KeywordsCarousel
                  screenProps={this.props.screenProps}
                  keywords={this.state.keywords}
                  _renderSideMenu={this._renderSideMenu}
                  _handleAddKeyword={this._handleAddKeyword}
                  uploading={this.props.campaign.uploading}
                />
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.keywordsAddButton}
                  onPress={() => this._renderSideMenu("keywords")}
                >
                  <PlusCircle width={35} height={35} />
                </TouchableOpacity>
                <Text style={[styles.subHeadings, styles.smallSubHeading]}>
                  {translate("Add Products and Services")}
                </Text>
              </>
            )}

            <Text style={[styles.subHeadings, { width: "60%" }]}>
              {translate("Who would you like to reach?")}
            </Text>
            <ScrollView
              ref={(ref) => (this.scrollView = ref)}
              indicatorStyle="white"
              style={styles.targetList}
            >
              <TouchableOpacity
                disabled={this.props.campaign.uploading}
                onPress={() => {
                  this._renderSideMenu("gender");
                }}
                style={styles.targetTouchable}
              >
                <View style={globalStyles.row}>
                  <GenderIcon width={30} height={30} style={styles.icon} />

                  <View style={globalStyles.column}>
                    <Text style={styles.menutext}>{translate("Gender")}</Text>
                    <Text style={styles.menudetails}>
                      {gender.find((r) => r.value === this.state.gender)
                        ? translate(
                            gender.find((r) => r.value === this.state.gender)
                              .label
                          )
                        : ""}
                    </Text>
                  </View>
                </View>
                <View style={globalStyles.column}>
                  {this.state.gender ? (
                    <GreenCheckmarkIcon width={30} height={30} />
                  ) : (
                    <PlusCircleIcon width={30} height={30} />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.props.campaign.uploading}
                onPress={() => {
                  this._renderSideMenu("age");
                }}
                style={styles.targetTouchable}
              >
                <View style={globalStyles.row}>
                  <AgeIcon
                    fill={globalColors.orange}
                    width={30}
                    height={30}
                    style={styles.icon}
                  />
                  <View style={globalStyles.column}>
                    <Text style={styles.menutext}>{translate("Age")}</Text>
                    <Text style={styles.menudetails}>
                      {this.state.age[0] === "Undetermined"
                        ? translate("All")
                        : this.state.age.join(", ")}
                    </Text>
                  </View>
                </View>

                {this.state.age.length !== 0 ? (
                  <GreenCheckmarkIcon width={30} height={30} />
                ) : (
                  <PlusCircleIcon width={30} height={30} />
                )}
              </TouchableOpacity>
            </ScrollView>
            {this.props.campaign.uploading ? (
              <ForwardLoading
                mainViewStyle={{ width: wp(8), height: hp(8) }}
                bottom={hp(25)}
                style={{ width: wp(8), height: hp(8) }}
              />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                style={styles.proceedButtonRTL}
                bottom={25}
                function={this._handleSubmission}
              />
            )}
          </Content>
        </View>
      </Sidemenu>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
});

const mapDispatchToProps = (dispatch) => ({
  setCampaignInfoForTransaction: (data) =>
    dispatch(actionCreators.setCampaignInfoForTransaction(data)),
  create_google_SE_campaign_ad_targeting: (info, segmentInfo) =>
    dispatch(
      actionCreators.create_google_SE_campaign_ad_targeting(info, segmentInfo)
    ),
  get_google_SE_keywords: (keyword, campaign_id, businessid, segmentInfo) =>
    dispatch(
      actionCreators.get_google_SE_keywords(
        keyword,
        campaign_id,
        businessid,
        segmentInfo
      )
    ),
  save_google_campaign_data: (info) =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  save_google_campaign_steps: (value) =>
    dispatch(actionCreators.save_google_campaign_steps(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdTargetting);
