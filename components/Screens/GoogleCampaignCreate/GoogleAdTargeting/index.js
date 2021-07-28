//Components
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  I18nManager,
  Text,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { Content } from "native-base";
import Sidemenu from "../../../MiniComponents/SideMenu";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import { showMessage } from "react-native-flash-message";
import SideMenuContainer from "../../../MiniComponents/SideMenuContainer";
import RadioButtons from "../../../MiniComponents/RadioButtons";
import KeywordsSelectionList from "../../../MiniComponents/KeywordsSelectionList";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import LowerButton from "../../../MiniComponents/LowerButton";
import { BudgetCards } from "./BudgetCards";
import KeywordsCarousel from "../../../MiniComponents/KeywordsCarousel";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

//Data
import gender from "../../../Data/gender.googleSE.data";
import ageRange from "../../../Data/ageRange.googleSE.data";

//Icons
import PurpleCheckmarkIcon from "../../../../assets/SVGs/PurpleCheckmark";
import GreenCheckmarkIcon from "../../../../assets/SVGs/GreenCheckmark.svg";
import GenderIcon from "../../../../assets/SVGs/Gender.svg";
import PlusCircleIcon from "../../../../assets/SVGs/PlusCircleOutline.svg";
import AgeIcon from "../../../../assets/SVGs/AdDetails/AgeIcon";
import PlusCircle from "../../../../assets/SVGs/PlusCircle.svg";
import AudienceIcon from "../../../../assets/SVGs/AudienceOutline";

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
// import { AdjustEvent, Adjust } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";

import WalletIcon from "../../../../assets/SVGs/WalletOutline";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../GradiantColors/colors";
import GradientButton from "../../../MiniComponents/GradientButton";

class GoogleAdTargeting extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      budget:
        this.props.campaign && this.props.campaign.recommendedBudget
          ? this.props.campaign.recommendedBudget * 2
          : 75,
      age: ["Undetermined"],
      gender: "Undetermined",
      keywords: [],
      sidemenustate: false,
      sidemenu: "gender",
      budget:
        this.props.campaign && this.props.campaign.recommendedBudget
          ? this.props.campaign.recommendedBudget * 2
          : 0,
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
        budget:
          this.props.campaign && this.props.campaign.campaignDateChanged
            ? this.props.campaign.recommendedBudget * 2
            : this.props.campaign
            ? this.props.campaign.budget
            : 75,
        value:
          this.props.campaign && this.props.campaign.campaignDateChanged
            ? this.props.campaign.recommendedBudget * 2
            : this.props.campaign
            ? this.props.campaign.budget
            : 75,
        budgetOption:
          this.props.campaign && this.props.campaign.campaignDateChanged
            ? 1
            : !isNull(this.props.campaign.budgetOption) &&
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
    analytics.track(`Button Pressed`, {
      button_type: "Open Side Menu Targeting",
      button_content: this.componentDidMount,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  _handleGenderSelection = (gender) => {
    this.setState({ gender: gender });

    analytics.track(`Form Populated`, {
      form_type: "Google Ad Targeting Form",
      form_field: "ad_gender",
      form_value: gender,
      campaign_type: "google",
      campaign_id: this.props.campaign.id,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.props.save_google_campaign_data({ gender: gender });
  };

  _handleAgeSelection = (val) => {
    if (val === "Undetermined") {
      analytics.track(`Form Populated`, {
        form_type: "Google Ad Targeting Form",
        form_field: "ad_age",
        form_value: [val],
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
      this.setState({ age: [val] });
      this.props.save_google_campaign_data({ age: [val] });
    } else {
      var res;
      if (isUndefined(this.state.age.find((l) => l === val))) {
        res = this.state.age.filter((l) => l !== val);
        res = this.state.age.filter((l) => l !== "Undetermined");
        this.setState({ age: [...res, val] });
        analytics.track(`Form Populated`, {
          form_type: "Google Ad Targeting Form",
          form_field: "ad_age",
          form_value: [...res, val],
          business_id:
            this.props.mainBusiness && this.props.mainBusiness.businessid,
        });
        this.props.save_google_campaign_data({ age: [...res, val] });
      } else {
        res = this.state.age.filter((l) => l !== val);
        if (res.length === 0) {
          res = ["Undetermined"];
        } else if (res.length - 1 !== 0) {
          res = res.filter((l) => l !== "Undetermined");
        }
        analytics.track(`Form Populated`, {
          form_type: "Google Ad Targeting Form",
          form_field: "ad_age",
          form_value: res,
          business_id:
            this.props.mainBusiness && this.props.mainBusiness.businessid,
        });
        this.setState({ age: res });
        this.props.save_google_campaign_data({ age: res });
      }
    }
  };

  _handleAddKeyword = (keyword) => {
    if (keyword === "Reset") {
      analytics.track(`Form Populated`, {
        form_type: "Google Ad Targeting Form",
        form_field: "ad_keywords",
        form_value: [],
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
      this.setState({ keywords: [] });
      this.props.save_google_campaign_data({ keywords: [] });
      return;
    }
    var res = this.state.keywords.filter((l) => l !== keyword);
    if (isUndefined(this.state.keywords.find((l) => l === keyword))) {
      this.setState({ keywords: [...res, keyword] });
      analytics.track(`Form Populated`, {
        form_type: "Google Ad Targeting Form",
        form_field: "ad_keywords",
        form_value: [...res, keyword],
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
      this.props.save_google_campaign_data({
        keywords: [...res, keyword],
      });
    } else {
      analytics.track(`Form Populated`, {
        form_type: "Google Ad Targeting Form",
        form_field: "ad_keywords",
        form_value: res,
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
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
      rawValue >= 25 &&
      !isNan(rawValue)
    ) {
      this.setState({
        budget: rawValue,
        value: value,
        budgetOption,
      });
      analytics.track(`Form Populated`, {
        form_type: "Google Ad Targeting Form",
        form_field: "ad_handle_budget",
        form_value: rawValue,
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
      this.props.save_google_campaign_data({
        budget: rawValue,
        budgetOption,
      });
      return true;
    } else {
      if (onBlur) {
        if (validateWrapper("Budget", rawValue)) {
          analytics.track(`Form Error Made`, {
            source: "GoogleAdTargeting",
            source_action: "a_change_campaign_custom_budget",
            error_description: validateWrapper("Budget", rawValue) + " $" + 25,
            business_id:
              this.props.mainBusiness && this.props.mainBusiness.businessid,
          });
        }
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description: "$" + 25,
          type: "warning",
          position: "top",
        });
      }
      analytics.track(`Form Populated`, {
        form_type: "Google Ad Targeting Form",
        form_field: "ad_handle_budget",
        form_value: rawValue,
        custom_budget: true,
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
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
    let lifetime_budget =
      Math.round(
        Math.abs(
          (new Date(this.props.campaign.start_time).getTime() -
            new Date(this.props.campaign.end_time).getTime()) /
            86400000
        ) + 1
      ) * this.state.budget;
    let data = {
      budget: lifetime_budget,
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
        source: "GoogleAdTargeting",
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
      analytics.track(`Form Error Made`, {
        source: "GoogleAdTargeting",
        source_action: "a_submit_ad_targeting",
        error_description: isNull(keywordsError)
          ? "Budget can't be less than the minimum"
          : keywordsError,
        business_id:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
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

    analytics.track("Screen Viewed", {
      screen_name: "GoogleAdTargeting",
      form_context: { ...segmentInfo },
      source,
      source_action,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });

    this.props.save_google_campaign_steps([
      "Dashboard",
      "GoogleAdInfo",
      "GoogleAdDesign",
      "GoogleAdTargeting",
    ]);
  };
  duration = () => {
    return this.props.campaign && this.props.campaign.end_time
      ? Math.ceil(
          (new Date(this.props.campaign.end_time) -
            new Date(this.props.campaign.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 1;
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
            scrollEnabled={true}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.budgetHeader}>
              <WalletIcon width={25} height={25} fill={globalColors.rum} />
              <Text
                style={[
                  styles.subHeadings,
                  { paddingHorizontal: 10, textTransform: "capitalize" },
                ]}
              >
                {translate("Set your daily budget")}
              </Text>
              <View style={styles.lifetimeBudgetView}>
                <Text style={[styles.subHeadings, styles.lifetimeBudgetText]}>
                  {translate("Lifetime budget")}
                </Text>
                <Text style={[styles.subHeadings, styles.lifetimeBudgetNumber]}>
                  {this.formatNumber(
                    parseFloat(this.duration() * this.state.budget).toFixed(2),
                    true
                  )}
                </Text>
              </View>
            </View>

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
              <GradientButton
                style={styles.gradientAddProductsServices}
                screenProps={this.props.screenProps}
                onPressAction={() => this._renderSideMenu("keywords")}
              >
                <View style={styles.gradientAddProductsServices}>
                  <PlusCircle width={50} height={50} />

                  <Text style={[styles.addProductsText]}>
                    {translate("Select your keywords")}
                  </Text>
                </View>
              </GradientButton>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 30,
              }}
            >
              <AudienceIcon />
              <Text style={[styles.subHeadings, styles.selectAudienceText]}>
                {translate("Select Audience")}
              </Text>
            </View>

            <View
              ref={(ref) => (this.scrollView = ref)}
              indicatorStyle="white"
              style={styles.targetList}
            >
              <View
                style={[
                  globalStyles.row,
                  { alignItems: "center", marginBottom: 7 },
                ]}
              >
                <GenderIcon
                  width={15}
                  height={16}
                  fill={globalColors.purple3}
                />

                <Text style={[styles.menutextHeading]}>
                  {translate("Demographic")}
                </Text>
              </View>
              <TouchableOpacity
                disabled={this.props.campaign.uploading}
                // onPress={() => {
                //   this._renderSideMenu("age");
                // }}
                style={styles.targetTouchable}
                activeOpacity={1}
              >
                <View style={globalStyles.row}>
                  <View style={globalStyles.column}>
                    <Text style={styles.menutext}>{translate("Age")}</Text>
                    <View
                      style={[styles.genderOuterView, { flexWrap: "wrap" }]}
                    >
                      {ageRange.map((g) => (
                        <TouchableOpacity
                          style={[
                            styles.genderInnerView,
                            this.state.age.includes(g.value) &&
                              styles.genderInnerActiveView,
                            {
                              marginBottom: 5,
                            },
                          ]}
                          activeOpacity={0.6}
                          onPress={() => {
                            this._handleAgeSelection(g.value);
                          }}
                          //   disabled={loading || !startEditing}
                        >
                          <Text
                            style={[
                              styles.genderRadioText,
                              this.state.age.includes(g.value) &&
                                styles.genderRadioTextActive,
                            ]}
                          >
                            {translate(g.label)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={this.props.campaign.uploading}
                // onPress={() => {
                //   this._renderSideMenu("gender");
                // }}
                style={[styles.targetTouchable, { marginVertical: 0 }]}
                activeOpacity={1}
              >
                <View style={globalStyles.row}>
                  <View style={globalStyles.column}>
                    <Text style={styles.menutext}>{translate("Gender")}</Text>
                    <View style={styles.genderOuterView}>
                      {gender.map((g) => (
                        <TouchableOpacity
                          style={[
                            styles.genderInnerView,
                            this.state.gender === g.value &&
                              styles.genderInnerActiveView,
                          ]}
                          activeOpacity={0.6}
                          onPress={() => {
                            this._handleGenderSelection(g.value);
                          }}
                          //   disabled={loading || !startEditing}
                        >
                          <Text
                            style={[
                              styles.genderRadioText,
                              this.state.gender === g.value &&
                                styles.genderRadioTextActive,
                            ]}
                          >
                            {translate(g.label)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* <Text style={styles.menudetails}>
                      {gender.find((r) => r.value === this.state.gender)
                        ? translate(
                            gender.find((r) => r.value === this.state.gender)
                              .label
                          )
                        : ""}
                    </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Content>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              paddingTop: 10,
              paddingBottom: 25,
              paddingHorizontal: 20,
              justifyContent: "flex-end",
              borderTopWidth: 1,
              borderTopColor: "#75647C21",
            }}
          >
            {this.props.campaign.uploading ? (
              <AnimatedCircularProgress
                size={50}
                width={5}
                fill={100}
                rotation={360}
                lineCap="round"
                tintColor={globalColors.purple}
                backgroundColor="rgba(255,255,255,0.3)"
                adDetails={false}
                style={{ alignSelf: "flex-end" }}
              />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                style={[styles.reachBarLowerButton]}
                function={() => this._handleSubmission()}
                purpleViolet
                text={"Next"}
                width={15}
                height={15}
              />
            )}
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdTargeting);
