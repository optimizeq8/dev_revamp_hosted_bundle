import React, { Component } from "react";
import { View, BackHandler, Text } from "react-native";
import { Content } from "native-base";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import analytics from "@segment/analytics-react-native";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import GradientButton from "../../../MiniComponents/GradientButton";

// Style
import styles from "./styles";

//Redux
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Functions
import formatNumber from "../../../formatNumber";
import dateFormat from "dateformat";
import isUndefined from "lodash/isUndefined";

//Data
import CountriesList from "../../../Data/countries.googleSE.data";
// import { Adjust, AdjustEvent } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../GradiantColors/colors";
import globalStyles from "../../../../GlobalStyles";

class AdPaymentReview extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      regionsNames: [],
      gender: "",
      end_time: "",
      start_time: "",
      age: "All",
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  formatAttribute = () => {
    const { translate } = this.props.screenProps;
    let regionsNames = [];
    if (this.props.campaign.location.length > 0) {
      regionsNames = this.props.campaign.location.map((r) => {
        let regionName = this.props.campaign.locationsFetchedList.find(
          (x) => x.id === r
        );
        if (!isUndefined(regionName)) {
          if (regionName.location && regionName.location.includes(", ")) {
            let textLoc = "";
            let splitArr = regionName.location.split(", ");
            splitArr = splitArr.map((lctn) => translate(lctn));
            textLoc = splitArr.join("-");
            return textLoc;
          } else {
            return translate(regionName.location);
          }
        }
      });
    }

    let gender =
      this.props.campaign.gender === "Undetermined"
        ? "All"
        : this.props.campaign.gender;
    let age =
      this.props.campaign.age.join(", ") === "Undetermined"
        ? translate("All")
        : this.props.campaign.age.map((a) => translate(a) + ", ");
    let end_time = new Date(this.props.campaign.end_time || "01-01-1970");
    let start_time = new Date(this.props.campaign.start_time || "01-01-1970");
    end_time = dateFormat(end_time, "d mmm yyyy");
    start_time = dateFormat(start_time, "d mmm yyyy");
    let country = CountriesList.find(
      (c) => c.criteria_id === this.props.campaign.country
    ).name;
    return {
      end_time,
      start_time,
      gender,
      age,
      regionsNames,
      country,
    };
  };
  componentDidMount() {
    const { translate } = this.props.screenProps;
    let regionsNames = [];
    if (this.props.campaign.location.length > 0) {
      regionsNames = this.props.campaign.location.map((r) => {
        let regionName = this.props.campaign.locationsFetchedList.find(
          (x) => x.id === r
        );
        if (!isUndefined(regionName)) {
          if (regionName.location && regionName.location.includes(", ")) {
            let textLoc = "";
            let splitArr = regionName.location.split(", ");
            splitArr = splitArr.map((lctn) => translate(lctn));
            textLoc = splitArr.join("-");
            return textLoc;
          } else {
            return translate(regionName.location);
          }
        }
      });
    }

    let gender =
      this.props.campaign.gender === "Undetermined"
        ? "All"
        : this.props.campaign.gender;
    let age =
      this.props.campaign.age.join(", ") === "Undetermined"
        ? translate("All")
        : this.props.campaign.age.map((a) => translate(a) + ", ");
    let end_time = new Date(this.props.campaign.end_time || "01-01-1970");
    let start_time = new Date(this.props.campaign.start_time || "01-01-1970");
    end_time = dateFormat(end_time, "d mmm yyyy");
    start_time = dateFormat(start_time, "d mmm yyyy");
    let country = CountriesList.find(
      (c) => c.criteria_id === this.props.campaign.country
    ).name;
    this.props.save_google_campaign_data({ campaignDateChanged: false });
    this.setState({
      end_time: end_time,
      start_time: start_time,
      gender: gender,
      age: age,
      regionsNames: regionsNames,
      country: country,
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleGooglePaymentReviewFocus = () => {
    const { gender, age, regionsNames, country } = this.formatAttribute();
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
      campaign_id: this.props.campaign_id,
      campaign_headline1: this.props.campaign.headline1,
      campaign_headline2: this.props.campaign.headline2,
      campaign_headline3: this.props.campaign.headline3,
      campaign_finalurl: this.props.campaign.finalurl,
      campaign_description: this.props.campaign.description,
      campaign_description2: this.props.campaign.description2,
      campaign_gender: gender,
      campaign_age: age,
      campaign_country: country,
      campaign_region: [...regionsNames].join(","),
      campaign_language:
        this.props.campaign.language === "1000" ? "English" : "Arabic",
      campaign_budget: formatNumber(this.props.campaign_budget, true),
      campaign_keywords: this.props.campaign.keywords.join(", "),
    };
    analytics.track(`Screen Viewed`, {
      screen_name: "GoogleAdPaymentReview",
      source,
      source_action,
      form_context: {
        ...segmentInfo,
      },
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.props.save_google_campaign_steps([
      "Dashboard",
      "GoogleAdInfo",
      "GoogleAdDesign",
      "GoogleAdTargeting",
      "GoogleAdPaymentReview",
    ]);

    // let adjustGoogleAdReviewTracker = new AdjustEvent("rag8r1");
    // adjustGoogleAdReviewTracker.addPartnerParameter(`Google_SEM`, "google_sem");
    // Adjust.trackEvent(adjustGoogleAdReviewTracker);
  };
  goToPayment = () => {
    analytics.track(`Button Pressed`, {
      button_type: "Submit Ad Review",
      button_content: "Payment Info",
      source: "GoogleAdPaymentReview",
    });

    this.props.navigation.navigate("PaymentForm", {
      source: "ad_review",
      source_action: `a_submit_ad_review`,
      campaign_channel: "google",
      campaign_ad_type: "GoogleSEAd",
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={[styles.safeAreaView]}>
        {/* <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        /> */}
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <NavigationEvents onDidFocus={this.handleGooglePaymentReviewFocus} />

        <TopStepsHeader
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "Ad Payment Review Back Button",
            obj: {
              businessname: this.props.mainBusiness.businessname,
            },
            source: "ad_review",
            source_action: "a_go_back",
          }}
          icon="google"
          navigation={this.props.navigation}
          currentScreen="Audience"
          title={"Review your Selection"}
        />

        <Content
          scrollEnabled={false}
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 20,
            marginVertical: 20,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              borderRadius: 30,
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Content>
              <View style={styles.budgetView}>
                <Text style={styles.budgetText}>{translate("Budget")}</Text>
                <View style={styles.budgetAmountView}>
                  <Text style={styles.budgetDollarText}>$</Text>
                  <Text style={styles.budgetAmountText}>
                    {formatNumber(this.props.campaign_budget, true)}
                  </Text>
                </View>
              </View>
              <Content contentContainerStyle={styles.contentContainerStyle}>
                <ReviewItemCard
                  screenProps={this.props.screenProps}
                  title="Duration"
                  subtitles={[
                    { title: "Start", content: this.state.start_time },
                    { title: "End", content: this.state.end_time },
                  ]}
                />
                <ReviewItemCard
                  screenProps={this.props.screenProps}
                  title="Ad Content"
                  subtitles={[
                    {
                      title: ["Headline", "1"],
                      content: this.props.campaign.headline1,
                    },
                    {
                      title: ["Headline", "2"],
                      content: this.props.campaign.headline2,
                    },
                    {
                      title: ["Headline", "3"],
                      content: this.props.campaign.headline3,
                    },
                    {
                      title: ["Landing Page"],
                      content: this.props.campaign.finalurl,
                    },
                    {
                      title: ["Description", "1"],
                      content: this.props.campaign.description,
                    },
                    {
                      title: ["Description", "2"],
                      content: this.props.campaign.description2,
                    },
                  ]}
                />

                <ReviewItemCard
                  screenProps={this.props.screenProps}
                  title="Audience"
                  subtitles={[
                    {
                      title: "Gender",
                      content: translate(this.state.gender),
                    },
                    {
                      title: "Location",
                      content:
                        translate(this.state.country) +
                        ": " +
                        [...this.state.regionsNames].join(", "),
                    },
                    {
                      title: "Language",
                      content:
                        this.props.campaign.language === "1000"
                          ? translate("English")
                          : translate("Arabic"),
                    },
                    {
                      title: "Age group",
                      content: this.state.age,
                    },
                    {
                      title: "Products",
                      content: this.props.campaign.keywords.join(", "),
                    },
                  ]}
                />
              </Content>
            </Content>
          </View>
        </Content>

        <View style={styles.bottomCardBlock1}>
          <View>
            <View style={styles.dollarAmountContainer}>
              <Text style={[styles.money, styles.dollarAmountText]}>$</Text>

              <Text style={[styles.money, { paddingLeft: 3 }]}>
                {formatNumber(this.props.campaign_budget, true)}
              </Text>
            </View>
            <View style={styles.kdAmountContainer}>
              <Text style={[styles.money, styles.kdText]}>KD </Text>
              <Text style={[styles.money, styles.kdAmountText]}>
                {parseFloat(this.props.campaign_budget_kdamount).toFixed(3)}
              </Text>
            </View>

            <View style={styles.optimizeFeesTextContainer}>
              <Text style={styles.optimizeFeesPercentange}>10%</Text>
              <Text style={[styles.money, styles.optimizeFeesText]}>
                {translate("Optimize App fees included")}
              </Text>
            </View>
          </View>
          <GradientButton
            onPressAction={this.goToPayment}
            style={[styles.mainCard]}
            text={translate("Payment Info")}
            textStyle={styles.payNowText}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.transA.campaign_id,
  campaign_budget_kdamount: state.transA.campaign_budget_kdamount,
  campaign_budget: state.transA.campaign_budget,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  save_google_campaign_steps: (value) =>
    dispatch(actionCreators.save_google_campaign_steps(value)),
  save_google_campaign_data: (info) =>
    dispatch(actionCreators.save_google_campaign_data(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdPaymentReview);
