//Components
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  I18nManager
} from "react-native";
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
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import segmentEventTrack from "../../../segmentEventTrack";
import isNull from "lodash/isNull";

class GoogleAdTargetting extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      budget: this.props.campaign.recommendedBudget,
      age: ["Undetermined"],
      gender: "Undetermined",
      keywords: [],
      sidemenustate: false,
      sidemenu: "gender",
      value: this.props.campaign.recommendedBudget,
      modalVisible: false,
      selectionOption: "",
      budgetOption: 1
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
    let keys = Object.keys(this.state).filter(key => {
      if (this.props.campaign.hasOwnProperty(key)) return key;
    });

    let data = { ...this.state };
    keys.filter(key => {
      data = {
        ...data,
        [key]: this.props.campaign[key]
      };
    }, {});

    this.setState({
      ...data,
      budget: this.props.campaign.budget,
      value: this.props.campaign.budget
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  onSelectedBudgetChange = budget => {
    this.setState({
      budget: budget,
      value: this.formatNumber(budget)
    });
    segmentEventTrack("Selected Budget Change", {
      campaign_budget: budget
    });
    this.props.save_google_campaign_data({ budget: budget });
    this.props.setCampaignInfoForTransaction({
      campaign_id: this.props.campaign.campaign_id,
      campaign_budget: budget
    });
  };

  formatNumber = num => {
    return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    segmentEventTrack(`Button Clicked to open side menu for ${component}`);
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  _handleGenderSelection = gender => {
    this.setState({ gender: gender });
    segmentEventTrack("Selected Campaign gender", {
      campaign_gender: gender
    });
    this.props.save_google_campaign_data({ gender: gender });
  };

  _handleAgeSelection = val => {
    if (val === "Undetermined") {
      segmentEventTrack("Selected Campaign Age", {
        campaign_age: [val]
      });
      this.setState({ age: [val] });
      this.props.save_google_campaign_data({ age: [val] });
    } else {
      var res;
      if (isUndefined(this.state.age.find(l => l === val))) {
        res = this.state.age.filter(l => l !== val);
        res = this.state.age.filter(l => l !== "Undetermined");
        this.setState({ age: [...res, val] });
        segmentEventTrack("Selected Campaign Age", {
          campaign_age: [...res, val]
        });
        this.props.save_google_campaign_data({ age: [...res, val] });
      } else {
        res = this.state.age.filter(l => l !== val);
        if (res.length === 0) {
          res = ["Undetermined"];
        } else if (res.length - 1 !== 0) {
          res = res.filter(l => l !== "Undetermined");
        }
        segmentEventTrack("Selected Campaign Age", {
          campaign_age: res
        });
        this.setState({ age: res });
        this.props.save_google_campaign_data({ age: res });
      }
    }
  };

  _handleAddKeyword = keyword => {
    if (keyword === "Reset") {
      segmentEventTrack("Reset button keyword selected");
      this.setState({ keywords: [] });
      this.props.save_google_campaign_data({ keywords: [] });
      return;
    }
    var res = this.state.keywords.filter(l => l !== keyword);
    if (isUndefined(this.state.keywords.find(l => l === keyword))) {
      this.setState({ keywords: [...res, keyword] });
      segmentEventTrack("Selected Campaign keywords", {
        campaign_keywords: [...res, keyword]
      });
      this.props.save_google_campaign_data({
        keywords: [...res, keyword]
      });
    } else {
      segmentEventTrack("Selected Campaign keywords", {
        campaign_keywords: res
      });
      this.setState({ keywords: res });
      this.props.save_google_campaign_data({
        keywords: res
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
        budgetOption
      });

      this.props.save_google_campaign_data({
        budget: rawValue,
        budgetOption
      });
      return true;
    } else {
      if (onBlur) {
        if (validateWrapper("Budget", rawValue)) {
          segmentEventTrack("Error Campaign Budget Change", {
            campaign_budget_error:
              validateWrapper("Budget", rawValue) +
              " $" +
              this.props.campaign.minValueBudget
          });
        }
        showMessage({
          message: validateWrapper("Budget", rawValue)
            ? validateWrapper("Budget", rawValue)
            : translate("Budget can't be less than the minimum"),
          description: "$" + this.props.campaign.minValueBudget,
          type: "warning",
          position: "top"
        });
      }
      segmentEventTrack("Custom Campaign Budget Change", {
        campaign_budget: rawValue
      });
      this.setState({
        budget: rawValue,
        value: value,
        budgetOption
      });
      this.props.save_google_campaign_data({
        budget: rawValue,
        budgetOption
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
      campaign_id: this.props.campaign.campaign_id,
      campaign_budget: this.state.budget
    });
    let data = {
      budget: this.state.budget,
      age: this.state.age,
      gender: this.state.gender,
      keywords: this.state.keywords
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
        step: 3,
        business_name: this.props.mainBusiness.businessname,
        checkout_id: this.props.campaign.campaign_id,
        campaign_budget: this.state.budget,
        campaign_age: this.state.age,
        campaign_gender: this.state.gender,
        campaign_keywords: this.state.keywords
      };

      this.props.create_google_SE_campaign_ad_targeting(
        {
          businessid: this.props.mainBusiness.businessid,
          campaign_id: this.props.campaign.campaign_id,
          ...data
        },
        segmentInfo
      );
      this.props.save_google_campaign_data(data);
    } else {
      segmentEventTrack("Error on submit google Ad Targetting", {
        campaign_error_keywords: keywordsError
      });
      showMessage({
        message: isNull(keywordsError)
          ? translate("Budget can't be less than the minimum")
          : translate(keywordsError),
        description: isNull(keywordsError)
          ? "$" + this.props.campaign.minValueBudget
          : "",

        type: "warning",
        position: "top"
      });
    }
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
                campaign_id={this.props.campaign.campaign_id}
                businessid={this.props.mainBusiness.businessid}
                screenProps={this.props.screenProps}
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
        onChange={isOpen => {
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
        <SafeAreaView
          style={[styles.safeArea]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents
            onDidFocus={() => {
              this.props.save_google_campaign_steps([
                "Dashboard",
                "GoogleAdInfo",
                "GoogleAdDesign",
                "GoogleAdTargetting"
              ]);
              Segment.screenWithProperties("Google Ad Targetting", {
                category: "Campaign Creation",
                channel: "google"
              });
              Segment.trackWithProperties("Viewed Checkout Step", {
                checkout_id: this.props.campaign.campaign_id,
                step: 4
              });
            }}
          />
          <Container style={styles.mainContainer}>
            <Container style={styles.container}>
              <CustomHeader
                closeButton={false}
                segment={{
                  str: "Google SE Targetting Back Button",
                  obj: {
                    businessname: this.props.mainBusiness.businessname
                  }
                }}
                navigation={this.props.navigation}
                title={"Campaign details"}
                screenProps={this.props.screenProps}
              />

              <Content
                scrollEnabled={false}
                contentContainerStyle={styles.contentContainer}
              >
                <Text style={styles.subHeadings}>{translate("Budget")}</Text>
                <BudgetCards
                  value={this.state.value}
                  recBudget={this.props.campaign.recommendedBudget}
                  lifetime_budget_micro={this.state.budget}
                  budgetOption={this.state.budgetOption}
                  _handleBudget={this._handleBudget}
                />

                <Text style={styles.subHeadings}>
                  {translate("What are you promoting?")}
                </Text>
                {this.state.keywords.length !== 0 ? (
                  <View
                    style={{
                      padding: 5,
                      borderRadius: 10,
                      flex: 1
                    }}
                  >
                    <KeywordsCarousel
                      screenProps={this.props.screenProps}
                      keywords={this.state.keywords}
                      _renderSideMenu={this._renderSideMenu}
                      _handleAddKeyword={this._handleAddKeyword}
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
                    <Text
                      style={[
                        styles.subHeadings,
                        {
                          fontSize: 10
                        }
                      ]}
                    >
                      {translate("Add Products and Services")}
                    </Text>
                  </>
                )}

                <Text style={styles.subHeadings}>
                  {translate("Who would you like to reach?")}
                </Text>
                <ScrollView
                  ref={ref => (this.scrollView = ref)}
                  indicatorStyle="white"
                  style={styles.targetList}
                >
                  <TouchableOpacity
                    disabled={this.props.loading}
                    onPress={() => {
                      this._renderSideMenu("gender");
                    }}
                    style={styles.targetTouchable}
                  >
                    <View style={globalStyles.row}>
                      <GenderIcon width={25} height={25} style={styles.icon} />

                      <View style={globalStyles.column}>
                        <Text style={styles.menutext}>
                          {translate("Gender")}
                        </Text>
                        <Text style={styles.menudetails}>
                          {gender.find(r => r.value === this.state.gender)
                            ? translate(
                                gender.find(r => r.value === this.state.gender)
                                  .label
                              )
                            : ""}
                        </Text>
                      </View>
                    </View>
                    <View style={globalStyles.column}>
                      {this.state.gender ? (
                        <GreenCheckmarkIcon width={25} height={25} />
                      ) : (
                        <PlusCircleIcon width={25} height={25} />
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.props.loading}
                    onPress={() => {
                      this._renderSideMenu("age");
                    }}
                    style={styles.targetTouchable}
                  >
                    <View style={globalStyles.row}>
                      <AgeIcon
                        fill={globalColors.orange}
                        width={25}
                        height={25}
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
                      <GreenCheckmarkIcon width={25} height={25} />
                    ) : (
                      <PlusCircleIcon width={25} height={25} />
                    )}
                  </TouchableOpacity>
                </ScrollView>
                {this.props.campaign.uploading ? (
                  <ForwardLoading
                    mainViewStyle={{ width: wp(8), height: hp(8) }}
                    bottom={hp(5)}
                    style={{ width: wp(8), height: hp(8) }}
                  />
                ) : (
                  <LowerButton
                    isRTL={I18nManager.isRTL}
                    style={I18nManager.isRTL ? styles.proceedButtonRTL : {}}
                    width={I18nManager.isRTL ? 25 : null}
                    height={I18nManager.isRTL ? 25 : null}
                    bottom={5}
                    function={this._handleSubmission}
                  />
                )}
              </Content>
            </Container>
          </Container>
        </SafeAreaView>
      </Sidemenu>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds
});

const mapDispatchToProps = dispatch => ({
  setCampaignInfoForTransaction: data =>
    dispatch(actionCreators.setCampaignInfoForTransaction(data)),
  create_google_SE_campaign_ad_targeting: (info, segmentInfo) =>
    dispatch(
      actionCreators.create_google_SE_campaign_ad_targeting(info, segmentInfo)
    ),
  get_google_SE_keywords: (keyword, campaign_id, businessid) =>
    dispatch(
      actionCreators.get_google_SE_keywords(keyword, campaign_id, businessid)
    ),
  save_google_campaign_data: info =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  save_google_campaign_steps: value =>
    dispatch(actionCreators.save_google_campaign_steps(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdTargetting);
