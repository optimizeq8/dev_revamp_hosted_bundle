import React, { Component } from "react";
import { ImageBackground, View, BackHandler } from "react-native";
import { Content, Text, Container, Footer } from "native-base";
import { Video } from "expo-av";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import startCase from "lodash/startCase";
import lowerCase from "lodash/lowerCase";
import ReviewItemCard from "../../../../MiniComponents/ReviewItemCard";
import CustomHeader from "../../../../MiniComponents/Header";
import LoadingScreen from "../../../../MiniComponents/LoadingScreen";
import GradientButton from "../../../../MiniComponents/GradientButton";
import * as actionCreators from "../../../../../store/actions";
// Style
import styles from "./styles";
import countries, {
  gender as genderValues,
  country_regions,
} from "../AdTargetting/data";
//Redux
import { connect } from "react-redux";

//Functions

import formatNumber from "../../../../formatNumber";
import dateFormat from "dateformat";
import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";

class InstagramAdPaymentReview extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    this.props.save_campaign_info({ campaignDateChanged: false });
    this.props.get_languages();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  formatAttributes = () => {
    const { translate } = this.props.screenProps;
    const data = this.props.data;
    let campaignInfo = data.campaignInfo;

    let targeting = campaignInfo.targeting;
    let interestNames = [];
    let lifetime_budget_micro = campaignInfo.lifetime_budget_micro;

    if (targeting.flexible_spec[0].hasOwnProperty("interests")) {
      interestNames = targeting.flexible_spec[0].interests.map(
        (interest) => interest.name
      );
    }
    let end_time = new Date(data.end_time || "01-01-1970");

    let start_time = new Date(data.start_time || "01-01-1970");
    end_time = dateFormat(end_time, "d mmm yyyy");
    start_time = dateFormat(start_time, "d mmm yyyy");
    let gender = targeting.genders
      ? startCase(
          lowerCase(
            genderValues.find(
              (genderValue) => genderValue.value === targeting.genders[0]
            ).label
          )
        )
      : "All";
    let countrySelections = [];
    targeting.geo_locations.countries.forEach((selectedCountry) => {
      countrySelections.push(
        countries.find((countryData) => countryData.value === selectedCountry)
          .label
      );
    });

    if (targeting.geo_locations.hasOwnProperty("regions")) {
      var regionNames = targeting.geo_locations.regions.map((reg) => {
        return reg.name;
      });
    } else regionNames = [""];

    let instagram_business_name = data.instagram_business_name;
    let message = data.message;
    let link = data.link;

    let OSContnet = targeting.hasOwnProperty("user_os")
      ? targeting.user_os[0]
      : "All";

    let user_devices = targeting.user_device;

    return {
      interestNames,
      end_time,
      start_time,
      gender,
      regionNames,
      user_devices,
      OSContnet,
      message,
      link,
      instagram_business_name,
      countrySelections,
      lifetime_budget_micro,
    };
  };

  onDidFocus = () => {
    const {
      interestNames,

      gender,

      regionNames,
      user_devices,
      OSContnet,
      message,
      link,
      instagram_business_name,
      countrySelections,
      lifetime_budget_micro,
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
      campaign_channel: "instagram",
      campaign_ad_type: "InstagramFeedAd",
      campaign_duration:
        Math.ceil(
          (new Date(this.props.data.end_time) -
            new Date(this.props.data.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_name: this.props.data.name,
      campaign_id: this.props.data.campaign_id,
      campaign_caption: message,
      campaign_attachment: link,
      campaign_swipe_up_CTA: this.props.data.call_to_action,
      campaign_swipe_up_destination: this.props.data.destination,
      campaign_media: this.props.data.media,
      campaign_media_type: this.props.data.media_type,
      campaign_appChoice: this.props.data.appChoice,
      campaign_objective: this.props.data.objective,
      campaign_interest: interestNames,
      campaign_gender: gender,
      campaign_country: countrySelections,
      campaign_region: regionNames,
      campaign_devices: user_devices,
      camapign_OS: OSContnet,
    };
    analytics.track(`ad_review`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
      ...segmentInfo,
    });
    this.props.saveCampaignSteps([
      "Dashboard",
      "InstagramFeedAdObjective",
      "InstagramFeedAdDesign",
      "InstagramFeedAdTargetting",
      "InstagramAdPaymentReview",
    ]);
  };
  render() {
    const { translate } = this.props.screenProps;
    if (
      this.props.loading ||
      this.props.languagesListLoading
      // ||
      // !this.props.data
      // !this.props.data.campaignInfo.targeting
    ) {
      return <LoadingScreen top={50} />;
    } else {
      let data = this.props.data || {
        //Object for testing
        lifetime_budget_micro: "75",
        objectiveLabel: "Brand Awareness",
        instagram_business_name: "optimizeapp",
        message: `Captions here, 
        New line here`,
        link: "https://svsberbsd.sdv",
        end_time: "2020-03-19",
        start_time: "2020-03-18",
        campaignInfo: {
          targeting: {
            genders: ["1"],
            os_version_max: "3.2",
            os_version_min: "10.2",

            geo_locations: {
              countries: ["KW", "AE"],
              regions: [
                {
                  country: "SA",
                  key: "3203",
                  name: "Al-Qassim Region",
                },
                {
                  country: "SA",
                  key: "3199",
                  name: "Al Bahah Region",
                },
              ],
            },
            flexible_spec: [
              {
                interests: [
                  {
                    id: "6003030029655",
                    name: "Chinese cuisine",
                  },
                  {
                    id: "6003102988840",
                    name: "Latin American cuisine",
                  },
                  {
                    id: "6003134986700",
                    name: "Baking",
                  },
                ],
              },
            ],
            user_device: ["2.1", "6.1 plus", "a1000"],
            user_os: ["Android"],
          },
          lifetime_budget_micro: "75",
        },
      };
      let campaignInfo = data.campaignInfo;

      let targeting = campaignInfo.targeting;
      let interestNames = [];
      let lifetime_budget_micro = campaignInfo.lifetime_budget_micro;

      if (targeting.flexible_spec[0].hasOwnProperty("interests")) {
        interestNames = targeting.flexible_spec[0].interests.map(
          (interest) => interest.name
        );
      }
      let end_time = new Date(data.end_time || "01-01-1970");

      let start_time = new Date(data.start_time || "01-01-1970");
      end_time = dateFormat(end_time, "d mmm yyyy");
      start_time = dateFormat(start_time, "d mmm yyyy");
      let gender = targeting.genders
        ? startCase(
            lowerCase(
              genderValues.find(
                (genderValue) => genderValue.value === targeting.genders[0]
              ).label
            )
          )
        : "All";
      let countrySelections = [];
      targeting.geo_locations.countries.forEach((selectedCountry) => {
        countrySelections.push(
          countries.find((countryData) => countryData.value === selectedCountry)
            .label
        );
      });

      if (targeting.geo_locations.hasOwnProperty("regions")) {
        var regionNames = targeting.geo_locations.regions.map((reg) => {
          return reg.name;
        });
      } else regionNames = [""];

      let instagram_business_name = data.instagram_business_name;
      let message = data.message;
      let link = data.link;

      let OSContnet = targeting.hasOwnProperty("user_os")
        ? targeting.user_os[0]
        : "All";

      let user_devices = targeting.user_device;
      const media = data.media ? data.media : "//";
      // -------Keep commented code incase we will add it--------------//
      // let ageGroupContent =
      //   targeting.min_age +
      //   "-" +
      //   targeting.max_age;

      // if (
      //   targeting.geos[0].hasOwnProperty("region_id") &&
      //   this.props.regionNames.length > 0
      // ) {
      //   regionNames = this.props.regionNames.map(region => region);
      // }

      // let devices = [];
      // devices = targeting.hasOwnProperty("devices")
      //   ? targeting.devices[0].hasOwnProperty("marketing_name")
      //     ? targeting.devices[0].marketing_name.join(", ")
      //     : []
      //   : [];

      // let languageNames = [];
      // if (this.props.languages.length > 0) {
      //   languageNames =
      //     this.props.languages.length > 0 &&
      //     targeting &&
      //     targeting.demographics[0] &&
      //     targeting.languages.map(languageId => {
      //       return translate(
      //         this.props.languages &&
      //           this.props.languages.find(lang => lang.id === languageId).name
      //       );
      //     });
      // }

      return (
        <View style={[styles.safeAreaView]}>
          <SafeAreaView style={{ backgroundColor: "#fff" }} />
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <Container style={[styles.container]}>
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
              icon="instagram"
              currentScreen="Payment"
              navigation={this.props.navigation}
              title={"Campaign Review"}
            />

            <Content
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                marginVertical: 20,
              }}
              style={{
                marginHorizontal: 20,
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
                        {formatNumber(lifetime_budget_micro, true)}
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
                          content: translate(data.objectiveLabel),
                        },
                      ]}
                    />
                    <ReviewItemCard
                      screenProps={this.props.screenProps}
                      title="Media"
                      subtitles={[
                        {
                          title: "Business Name",
                          content: instagram_business_name,
                        },
                        {
                          title: "Headline",
                          content: message,
                        },
                        {
                          title: "Swipe Up destination",
                          content: link,
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
                          title: "Countries",
                          content: countrySelections.join(", "),
                        },
                        {
                          title: "Regions",
                          content: regionNames.join(", "),
                        },
                        // {
                        //   title: "Language",
                        //   content: languageNames.join(", ")
                        // },
                        // {
                        //   title: "Age group",
                        //   content: ageGroupContent
                        // },
                        interestNames.length > 0 && {
                          title: "Interests",
                          content: interestNames + "",
                        },

                        user_devices.length > 0 && {
                          title: "Devices",
                          content: user_devices.join(", "),
                        },
                        targeting.hasOwnProperty("user_os") &&
                          targeting.user_os[0] !== "" && {
                            title: "OS Type",
                            content: translate(OSContnet),
                          },
                        targeting.hasOwnProperty("os_version_max") &&
                          targeting.os_version_max !== "" && {
                            title: "OS Versions",
                            content:
                              targeting.hasOwnProperty("os_version_min") &&
                              targeting.os_version_min +
                                ", " +
                                targeting.os_version_max,
                          },
                      ]}
                    />
                  </Content>
                </Content>
              </ImageBackground>
            </Content>

            <View style={styles.footerBlock}>
              <View style={styles.bottomCardBlock1}>
                <View>
                  <View style={styles.dollarAmountContainer}>
                    <Text style={[styles.money, styles.dollarAmountText]}>
                      $
                    </Text>

                    <Text style={[styles.money, { paddingLeft: 3 }]}>
                      {formatNumber(lifetime_budget_micro, true)}
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
                  onPressAction={() => {
                    const {
                      interestNames,

                      gender,

                      regionNames,
                      user_devices,
                      OSContnet,
                      message,
                      link,
                      instagram_business_name,
                      countrySelections,
                      lifetime_budget_micro,
                    } = this.formatAttributes();
                    const segmentInfo = {
                      campaign_channel: "instagram",
                      campaign_ad_type: "InstagramFeedAd",
                      campaign_duration:
                        Math.ceil(
                          (new Date(this.props.data.end_time) -
                            new Date(this.props.data.start_time)) /
                            (1000 * 60 * 60 * 24)
                        ) + 1,
                      campaign_name: this.props.data.name,
                      campaign_id: this.props.data.campaign_id,
                      campaign_caption: message,
                      campaign_end_date: this.props.data.end_time,
                      campaign_start_date: this.props.data.start_time,
                      campaign_attachment: this.props.data.attachment,
                      campaign_swipe_up_CTA: this.props.data.call_to_action,
                      campaign_swipe_up_destination: this.props.data
                        .destination,
                      campaign_media: this.props.data.media,
                      campaign_media_type: this.props.data.media_type,
                      campaign_appChoice: this.props.data.appChoice,
                      campaign_objective: this.props.data.objective,
                      campaign_interest: interestNames,
                      campaign_gender: gender,
                      campaign_country: countrySelections,
                      campaign_region: regionNames,
                      campaign_devices: user_devices,
                    };
                    analytics.track(`a_submit_ad_review`, {
                      source: "ad_review",
                      source_action: "a_submit_ad_review",
                      action_status: "success",

                      ...segmentInfo,
                    });

                    this.props.navigation.navigate("PaymentForm", {
                      source: "ad_review",
                      source_action: `a_submit_ad_review`,
                      campaign_channel: "instagram",
                      campaign_ad_type: "InstagramFeedAd",
                    });
                  }}
                  style={[styles.mainCard]}
                  text={translate("Payment Info")}
                  textStyle={styles.payNowText}
                />
              </View>
            </View>
          </Container>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  userInfo: state.auth.userInfo,
  data: state.instagramAds.data,
  media: state.instagramAds.media,
  countryName: state.instagramAds.countryName,
  interestNames: state.instagramAds.interestNames,
  regionNames: state.instagramAds.regionNames,
  loading: state.instagramAds.loadingDetail,
  kdamount: state.instagramAds.kdamount,
  mainBusiness: state.account.mainBusiness,
  adType: state.instagramAds.adType,
  languages: state.instagramAds.languagesList,
  languagesListLoading: state.instagramAds.languagesListLoading,
  data: state.instagramAds.data,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),
  get_languages: () => dispatch(actionCreators.get_languages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramAdPaymentReview);
