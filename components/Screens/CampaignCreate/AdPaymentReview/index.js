import React, { Component } from "react";
import { ImageBackground, View, BackHandler, Text } from "react-native";
import { Content } from "native-base";
import analytics from "@segment/analytics-react-native";
import { Video } from "expo-av";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import startCase from "lodash/startCase";
import lowerCase from "lodash/lowerCase";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import CustomHeader from "../../../MiniComponents/Header";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import GradientButton from "../../../MiniComponents/GradientButton";
import * as actionCreators from "../../../../store/actions";
// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";

//Functions

import formatNumber from "../../../formatNumber";
import dateFormat from "dateformat";
// import { AdjustEvent, Adjust } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
import isUndefined from "lodash/isUndefined";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../GradiantColors/colors";
import globalStyles from "../../../../GlobalStyles";

class AdPaymentReview extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    this.props.save_campaign_info({ campaignDateChanged: false });
    this.props.get_languages();
  }

  handlePaymentReviewBlur = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  };
  handlePaymentReviewFocus = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    const {
      interestNames,
      gender,
      countryName,
      regionNames,
      devices,
      languageNames,
    } = this.formatAttributes();

    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    const segmentInfo = {
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
      campaign_duration:
        Math.ceil(
          (new Date(this.props.data.end_time) -
            new Date(this.props.data.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
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
      campaign_interest: interestNames,
      campaign_gender: gender,
      campaign_country: countryName,
      campaign_region: regionNames,
      campaign_devices: devices,
      campaign_language: languageNames,
    };
    analytics.track(`ad_review`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
      ...segmentInfo,
    });
    this.props.saveCampaignSteps(
      this.props.adType === "StoryAd"
        ? [
            "Dashboard",
            "AdObjective",
            "AdCover",
            "AdDesign",
            "AdDetails",
            "AdPaymentReview",
          ]
        : [
            "Dashboard",
            "AdObjective",
            "AdDesign",
            "AdDetails",
            "AdPaymentReview",
          ]
    );

    // let adjustAdReviewTracker = new AdjustEvent("rag8r1");
    // adjustAdReviewTracker.addPartnerParameter(
    //   `Snap_${this.props.adType}`,
    //   this.props.adType
    // );
    // Adjust.trackEvent(adjustAdReviewTracker);
  };
  formatAttributes = () => {
    const { translate } = this.props.screenProps;
    let targeting = !isUndefined(this.props.data.campaignInfo)
      ? this.props.data.campaignInfo.targeting
      : {};
    let interestNames = [];
    if (this.props.interestNames.length > 0) {
      interestNames = this.props.interestNames.map((interest) =>
        translate(interest.name)
      );
    }
    let end_time = new Date(this.props.data.end_time || "01-01-1970");
    let start_time = new Date(this.props.data.start_time || "01-01-1970");
    end_time = dateFormat(end_time, "d mmm yyyy");
    start_time = dateFormat(start_time, "d mmm yyyy");
    let gender = targeting.demographics[0].gender
      ? startCase(lowerCase(targeting.demographics[0].gender))
      : "All";
    let countryName = this.props.countryName.map((country) =>
      translate(country)
    );
    if (this.props.regionNames) {
      var regionNames = this.props.regionNames.map((region) =>
        translate(region.name)
      );
    } else regionNames = [""];

    // if (
    //   targeting.geos[0].hasOwnProperty("region_id") &&
    //   this.props.regionNames.length > 0
    // ) {
    //   regionNames = this.props.regionNames.map(region => region);
    // }

    let devices = [];
    devices = targeting.hasOwnProperty("devices")
      ? targeting.devices[0].hasOwnProperty("marketing_name")
        ? targeting.devices[0].marketing_name.join(", ")
        : []
      : [];

    let languageNames = [];
    languageNames =
      this.props.languages.length > 0
        ? targeting &&
          targeting.demographics[0] &&
          targeting.demographics[0].languages.map((languageId) => {
            return translate(
              this.props.languages &&
                this.props.languages.find((lang) => lang.id === languageId).name
            );
          })
        : [];

    return {
      interestNames,
      end_time,
      start_time,
      gender,
      countryName,
      regionNames,
      devices,
      languageNames,
    };
  };

  goToPaymentForm = () => {
    const {
      interestNames,
      gender,
      countryName,
      regionNames,
      devices,
      languageNames,
    } = this.formatAttributes();
    const segmentInfo = {
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
      campaign_duration:
        Math.ceil(
          (new Date(this.props.data.end_time) -
            new Date(this.props.data.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_name: this.props.data.name,
      campaign_id: this.props.data.campaign_id,
      campaign_brand_name: this.props.data.campaignbrand_name,
      campaign_end_date: this.props.data.end_time,
      campaign_start_date: this.props.data.start_time,
      campaign_headline: this.props.data.headline,
      campaign_attachment: this.props.data.attachment,
      campaign_swipe_up_CTA: this.props.data.call_to_action,
      campaign_swipe_up_destination: this.props.data.destination,
      campaign_media: this.props.data.media,
      campaign_media_type: this.props.data.media_type,
      campaign_appChoice: this.props.data.appChoice,
      campaign_objective: this.props.data.objective,
      campaign_interest: interestNames,
      campaign_gender: gender,
      campaign_country: countryName,
      campaign_region: regionNames,
      campaign_devices: devices,
      campaign_language: languageNames,
    };
    analytics.track(`a_submit_ad_review`, {
      source: "ad_review",
      source_action: "a_submit_ad_review",
      action_status: "success",
      timestamp: new Date().getTime(),
      ...segmentInfo,
    });

    this.props.navigation.navigate("PaymentForm", {
      source: "ad_review",
      source_action: `a_submit_ad_review`,
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    if (
      this.props.loading ||
      this.props.languagesListLoading ||
      !this.props.data ||
      isUndefined(this.props.data.campaignInfo)
    ) {
      return (
        <>
          <NavigationEvents
            onDidFocus={this.handlePaymentReviewFocus}
            onDidBlur={this.handlePaymentReviewBlur}
          />
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={globalStyles.gradient}
          />
          <LoadingScreen top={50} />
        </>
      );
    } else {
      let targeting = !isUndefined(this.props.data.campaignInfo)
        ? this.props.data.campaignInfo.targeting
        : {};
      const {
        interestNames,
        end_time,
        start_time,
        gender,
        countryName,
        regionNames,
        devices,
        languageNames,
      } = this.formatAttributes();
      const media = this.props.data.media ? this.props.data.media : "//";
      return (
        <View style={[styles.safeAreaView]}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={globalStyles.gradient}
          />
          <SafeAreaView
            style={{ backgroundColor: "#fff" }}
            forceInset={{ bottom: "never", top: "always" }}
          />
          <NavigationEvents onDidFocus={this.handlePaymentReviewFocus} />
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
            actionButton={
              this.editCampaign
                ? () => this.props.navigation.navigate("CampaignDetails")
                : undefined
            }
            icon="snapchat"
            actionButton={this.handleBackButton}
            adType={this.props.adType}
            currentScreen="Payment"
            title={"Campaign Review"}
          />

          <Content
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              marginVertical: 20,
              // borderRadius: 30,
              // background: "rgba(0,0,0,.75)",
              // backgroundColor: "rgba(0,0,0,0.75)"
            }}
            style={{
              marginHorizontal: 20,

              // borderRadius: 30,
              // backgroundColor: "rgba(0,0,0,0.75)"
              // background: "rgba(0,0,0,.75)"
            }}
          >
            {(media.includes(".mp4") ||
              media.includes(".mov") ||
              media.includes(".MP4") ||
              media.includes(".MOV")) && (
              <View style={[styles.backgroundViewWrapper, styles.videoView]}>
                <Video
                  source={{
                    uri: media,
                  }}
                  shouldPlay
                  isLooping
                  isMuted
                  resizeMode="cover"
                  style={styles.video}
                />
              </View>
            )}
            <ImageBackground
              // blurRadius={20}
              // imageStyle={{ opacity: 0.2 }}
              style={[styles.backgroundViewWrapper, styles.imageBackground]}
              source={{
                uri:
                  media.includes(".jpg") ||
                  media.includes(".jpeg") ||
                  media.includes(".png") ||
                  media.includes(".JPG") ||
                  media.includes(".JPEG") ||
                  media.includes(".PNG")
                    ? media
                    : "www.go.com",
              }}
            >
              <Content contentContainerStyle={styles.contentContainerStyle1}>
                <View style={styles.budgetView}>
                  <Text style={styles.budgetText}>{translate("Budget")}</Text>
                  <View style={styles.budgetAmountView}>
                    <Text style={styles.budgetDollarText}>$</Text>
                    <Text style={styles.budgetAmountText}>
                      {formatNumber(
                        this.props.data.lifetime_budget_micro,
                        true
                      )}
                    </Text>
                  </View>
                </View>
                <Content contentContainerStyle={styles.contentContainerStyle}>
                  <ReviewItemCard
                    screenProps={this.props.screenProps}
                    title="Duration"
                    subtitles={[
                      { title: "Start", content: start_time },
                      { title: "End", content: end_time },
                      {
                        title: "Objective",
                        content: translate(this.props.data.objectiveLabel),
                      },
                    ]}
                  />
                  <ReviewItemCard
                    screenProps={this.props.screenProps}
                    title="Media"
                    subtitles={[
                      {
                        title: "Business Name",
                        content: this.props.data.brand_name,
                      },
                      {
                        title: "Headline",
                        content: this.props.data.headline,
                      },
                    ]}
                  />

                  <ReviewItemCard
                    screenProps={this.props.screenProps}
                    title="Audience"
                    subtitles={[
                      {
                        title: "Gender",
                        content: translate(gender),
                      },
                      {
                        title: "Location",
                        content:
                          regionNames.length > 0
                            ? countryName + ": " + regionNames
                            : countryName,
                      },
                      {
                        title: "Language",
                        content: languageNames.join(", "),
                      },
                      {
                        title: "Age group",
                        content:
                          targeting.demographics[0].min_age +
                          "-" +
                          targeting.demographics[0].max_age,
                      },
                      interestNames.length > 0 && {
                        title: "Interests",
                        content: interestNames + "",
                      },

                      devices.length > 0 && {
                        title: "Devices",
                        content: devices + "",
                      },
                      targeting.hasOwnProperty("devices") && {
                        title: "OS Type",
                        content: translate(
                          targeting.devices[0].hasOwnProperty("os_type") &&
                            targeting.devices[0].os_type !== ""
                            ? targeting.devices[0].os_type
                            : "All"
                        ),
                      },
                      targeting.hasOwnProperty("devices") &&
                        targeting.devices[0].os_version_max !== "" && {
                          title: "OS Versions",
                          content:
                            targeting.devices[0].hasOwnProperty(
                              "os_version_min"
                            ) &&
                            targeting.devices[0].os_version_min +
                              ", " +
                              targeting.devices[0].os_version_max,
                        },
                    ]}
                  />
                </Content>
              </Content>
            </ImageBackground>
          </Content>

          <View style={styles.bottomCardBlock1}>
            <View>
              <View style={styles.dollarAmountContainer}>
                <Text style={[styles.money, styles.dollarAmountText]}>$</Text>

                <Text style={[styles.money, { paddingLeft: 3 }]}>
                  {formatNumber(this.props.data.lifetime_budget_micro, true)}
                </Text>
              </View>
              <View style={styles.kdAmountContainer}>
                <Text style={[styles.money, styles.kdText]}>KD{}</Text>
                <Text style={[styles.money, styles.kdAmountText]}>
                  {this.props.kdamount}
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
              onPressAction={this.goToPaymentForm}
              style={[styles.mainCard]}
              text={translate("Payment Info")}
              textStyle={styles.payNowText}
            />

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
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  media: state.campaignC.media,
  countryName: state.campaignC.countryName,
  interestNames: state.campaignC.interestNames,
  regionNames: state.campaignC.regionNames,
  loading: state.campaignC.loadingDetail,
  kdamount: state.campaignC.kdamount,
  mainBusiness: state.account.mainBusiness,
  adType: state.campaignC.adType,
  languages: state.campaignC.languagesList,
  languagesListLoading: state.campaignC.languagesListLoading,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  saveCampaignSteps: (step) => dispatch(actionCreators.saveCampaignSteps(step)),
  get_languages: () => dispatch(actionCreators.get_languages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdPaymentReview);
