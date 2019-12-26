import React, { Component } from "react";
import { View, BackHandler, TouchableOpacity } from "react-native";
import { Content, Text, Container, Footer } from "native-base";
import * as Segment from "expo-analytics-segment";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import CustomHeader from "../../../MiniComponents/Header";
// import LoadingScreen from "../../../MiniComponents/LoadingScreen";
// import * as actionCreators from "../../../../store/actions";
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

class AdPaymentReview extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      regionsNames: [],
      gender: "",
      end_time: "",
      start_time: "",
      age: "All"
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
    const { translate } = this.props.screenProps;
    let regionsNames = [];
    if (this.props.campaign.location.length > 0) {
      regionsNames = this.props.campaign.location.map(r => {
        let regionName = this.props.campaign.locationsFetchedList.find(
          x => x.id === r
        );
        if (!isUndefined(regionName)) {
          if (
            regionName &&
            regionName.location &&
            regionName.location.includes(", ")
          ) {
            let textLoc = "";
            let splitArr = regionName.location.split(", ");
            splitArr = splitArr.map(lctn => translate(lctn));
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
        : this.props.campaign.age.map(a => translate(a) + ", ");
    // console.log("gender: ", gender);
    // console.log("regionsNames: ", regionsNames);
    let end_time = new Date(this.props.campaign.end_time || "01-01-1970");
    let start_time = new Date(this.props.campaign.start_time || "01-01-1970");
    end_time = dateFormat(end_time, "d mmm yyyy");
    start_time = dateFormat(start_time, "d mmm yyyy");
    let country = CountriesList.find(
      c => c.criteria_id === this.props.campaign.country
    ).name;

    this.setState({
      end_time: end_time,
      start_time: start_time,
      gender: gender,
      age: age,
      regionsNames: regionsNames,
      country: country
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  render() {
    const { translate } = this.props.screenProps;

    //country
    // let countryName = "";
    // this.props.campaign.location.find(x => x === r.id);

    // let countryName = CountriesList.find(x => x === this.props);

    return (
      <SafeAreaView
        style={[styles.safeAreaView]}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            this.props.save_google_campaign_steps([
              "Dashboard",
              "GoogleAdInfo",
              "GoogleAdDesign",
              "GoogleAdTargetting",
              "GoogleAdPaymentReview"
            ]);
            // Segment.screenWithProperties("Google Ad Payment Review", {
            //   category: "Campaign Creation"
            // });
            // Segment.trackWithProperties("Viewed Checkout Step", {
            //   step: 5,
            //   business_name: this.props.mainBusiness.businessname,
            //   checkout_id: this.props.campaign_id
            // });
          }}
        />

        <Container style={[styles.container]}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Ad Payment Review Back Button",
              obj: {
                businessname: this.props.mainBusiness.businessname
              }
            }}
            navigation={this.props.navigation}
            title={"Review your Selection"}
            screenProps={this.props.screenProps}
          />

          <Content
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              paddingHorizontal: 20,
              marginVertical: 20,
              borderRadius: 30
            }}
          >
            <View
              style={{
                borderRadius: 30,
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.6)"
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
                      { title: "End", content: this.state.end_time }
                    ]}
                  />
                  <ReviewItemCard
                    screenProps={this.props.screenProps}
                    title="Ad Content"
                    subtitles={[
                      {
                        title: ["Headline", "1"],
                        content: this.props.campaign.headline1
                      },
                      {
                        title: ["Headline", "2"],
                        content: this.props.campaign.headline2
                      },
                      {
                        title: ["Headline", "3"],
                        content: this.props.campaign.headline3
                      },
                      {
                        title: ["Landing Page"],
                        content: this.props.campaign.finalurl
                      },
                      {
                        title: ["Description", "1"],
                        content: this.props.campaign.description
                      },
                      {
                        title: ["Description", "2"],
                        content: this.props.campaign.description2
                      }
                    ]}
                  />

                  <ReviewItemCard
                    screenProps={this.props.screenProps}
                    title="Audience"
                    subtitles={[
                      {
                        title: "Gender",
                        content: translate(this.state.gender)
                      },
                      {
                        title: "Location",
                        content:
                          translate(this.state.country) +
                          ": " +
                          [...this.state.regionsNames].join(", ")
                      },
                      {
                        title: "Language",
                        content:
                          this.props.campaign.language === "1000"
                            ? translate("English")
                            : translate("Arabic")
                      },
                      {
                        title: "Age group",
                        content: this.state.age
                      },
                      {
                        title: "Products",
                        content: this.props.campaign.keywords.join(", ")
                      }
                    ]}
                  />
                </Content>
              </Content>
            </View>
          </Content>

          <Footer style={styles.footerBlock}>
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
                    {this.props.campaign_budget_kdamount}
                  </Text>
                </View>

                <View style={styles.optimizeFeesTextContainer}>
                  <Text style={styles.optimizeFeesPercentange}>10%</Text>
                  <Text style={[styles.money, styles.optimizeFeesText]}>
                    {translate("Optimize App fees included")}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Segment.trackWithProperties(
                    "Select Ad Payment Review Button",
                    {
                      business_name: this.props.mainBusiness.businessname,
                      campaign_budget: this.props.campaign_budget
                    }
                  );
                  Segment.trackWithProperties("Completed Checkout Step", {
                    step: 5,
                    business_name: this.props.mainBusiness.businessname,
                    checkout_id: this.props.campaign_id
                  });

                  this.props.navigation.navigate("PaymentForm");
                }}
                style={[styles.mainCard]}
              >
                {/*
                    ----------For future maybe----------
                    <Text style={styles.text}>Agency Fee</Text>
                    <View style={{ flexDirection: "column", alignSelf: "center" }}>
                    <Text style={styles.text}>
                        {2500 - this._handleAgencyFee()} $
                    </Text>
                    <Text style={styles.text}>{this._handleAgencyFee()} $</Text>
                    </View> 
                */}

                <Text style={styles.payNowText}>
                  {translate("Payment Info")}
                </Text>
              </TouchableOpacity>
            </View>
          </Footer>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.transA.campaign_id,
  campaign_budget_kdamount: state.transA.campaign_budget_kdamount,
  campaign_budget: state.transA.campaign_budget,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  save_google_campaign_steps: value =>
    dispatch(actionCreators.save_google_campaign_steps(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdPaymentReview);
