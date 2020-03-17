import React, { Component } from "react";
import { ImageBackground, View, BackHandler } from "react-native";
import { Content, Text, Container, Footer } from "native-base";
import { Video } from "expo-av";
import * as Segment from "expo-analytics-segment";
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
  country_regions
} from "../AdTargetting/data";
//Redux
import { connect } from "react-redux";

//Functions

import formatNumber from "../../../../formatNumber";
import dateFormat from "dateformat";

class InstagramAdPaymentReview extends Component {
  static navigationOptions = {
    header: null
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
            demographics: [
              {
                gender: "1"
              }
            ],
            geo_locations: {
              country: ["KW"],
              regions: [{ key: "4362" }, { key: "4366" }]
            },
            flexible_spec: [
              {
                interests: [
                  {
                    id: "6003584163107",
                    name: "Advertising"
                  },
                  {
                    id: "6003127206524",
                    name: "Digital marketing"
                  }
                ]
              }
            ],
            devices: [{ os_type: "iOS" }]
          },
          lifetime_budget_micro: "75"
        }
      };
      let campaignInfo = data.campaignInfo;

      let targeting = campaignInfo.targeting;
      let interestNames = [];
      let lifetime_budget_micro = campaignInfo.lifetime_budget_micro;

      if (targeting.flexible_spec[0].hasOwnProperty("interests")) {
        interestNames = targeting.flexible_spec[0].interests.map(
          interest => interest.name
        );
      }
      let end_time = new Date(data.end_time || "01-01-1970");

      let start_time = new Date(data.start_time || "01-01-1970");
      end_time = dateFormat(end_time, "d mmm yyyy");
      start_time = dateFormat(start_time, "d mmm yyyy");
      let gender = targeting.demographics[0].gender
        ? startCase(
            lowerCase(
              genderValues.find(
                genderValue =>
                  genderValue.value === targeting.demographics[0].gender
              ).label
            )
          )
        : "All";
      let country =
        this.props.country ||
        countries.find(
          country => country.value === targeting.geo_locations.country[0]
        );

      let country_region = country_regions.find(
        countryRegs => countryRegs.country_code === country.value
      );
      if (targeting.geo_locations.hasOwnProperty("regions")) {
        var regionNames = targeting.geo_locations.regions.map(reg => {
          return country_region.regions.find(cReg => cReg.id === reg.key).name;
        });
      } else regionNames = [""];

      let locationContent =
        regionNames.length > 0
          ? translate(country.label) + ": " + regionNames
          : translate(country.label);

      let instagram_business_name = data.instagram_business_name;
      let message = data.message;
      let link = data.link;

      let OSContnet =
        targeting.devices[0].hasOwnProperty("os_type") &&
        targeting.devices[0].os_type !== ""
          ? targeting.devices[0].os_type
          : "All";

      const media = data.media ? data.media : "//";
      // -------Keep commented code incase we will add it--------------//
      // let ageGroupContent =
      //   targeting.demographics[0].min_age +
      //   "-" +
      //   targeting.demographics[0].max_age;

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
      //     targeting.demographics[0].languages.map(languageId => {
      //       return translate(
      //         this.props.languages &&
      //           this.props.languages.find(lang => lang.id === languageId).name
      //       );
      //     });
      // }

      return (
        <SafeAreaView
          style={[styles.safeAreaView]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents
            onDidFocus={() => {
              this.props.saveCampaignSteps(
                this.props.adType === "StoryAd"
                  ? [
                      "Dashboard",
                      "AdObjective",
                      "AdCover",
                      "AdDesign",
                      "AdDetails",
                      "AdPaymentReview"
                    ]
                  : [
                      "Dashboard",
                      "AdObjective",
                      "AdDesign",
                      "AdDetails",
                      "AdPaymentReview"
                    ]
              );
              Segment.screenWithProperties("Snap Ad Payment Review", {
                category: "Campaign Creation",
                channel: "snapchat"
              });
              Segment.trackWithProperties("Viewed Checkout Step", {
                step: 5,
                business_name: this.props.mainBusiness.businessname,
                checkout_id: this.props.campaign_ids
              });
            }}
          />

          <Container style={[styles.container]}>
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Ad Payment Review Back Button",
                obj: {
                  businessname: this.props.mainBusiness.businessname
                }
              }}
              navigation={this.props.navigation}
              title={"Review your Selection"}
            />

            <Content
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
                marginVertical: 20
              }}
              style={{
                marginHorizontal: 20
              }}
            >
              {(media.includes(".mp4") ||
                media.includes(".mov") ||
                media.includes(".MP4") ||
                media.includes(".MOV")) && (
                <View style={[styles.backgroundViewWrapper, styles.videoView]}>
                  <Video
                    source={{
                      uri: media
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
                      : "www.go.com"
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
                          content: translate(data.objectiveLabel)
                        }
                      ]}
                    />
                    <ReviewItemCard
                      screenProps={this.props.screenProps}
                      title="Media"
                      subtitles={[
                        {
                          title: "Business Name",
                          content: instagram_business_name
                        },
                        {
                          title: "Headline",
                          content: message
                        },
                        {
                          title: "Swipe Up Destination",
                          content: link
                        }
                      ]}
                    />

                    <ReviewItemCard
                      screenProps={this.props.screenProps}
                      title="Audience"
                      subtitles={[
                        {
                          title: "Gender",
                          content: translate(gender)
                        },
                        {
                          title: "Location",
                          content: locationContent
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
                          content: interestNames + ""
                        },

                        // devices.length > 0 && {
                        //   title: "Devices",
                        //   content: devices + ""
                        // },
                        targeting.hasOwnProperty("devices") && {
                          title: "OS Type",
                          content: translate(OSContnet)
                        }
                        // targeting.hasOwnProperty("devices") &&
                        //   targeting.devices[0].os_version_max !== "" && {
                        //     title: "OS Versions",
                        //     content:
                        //       targeting.devices[0].hasOwnProperty(
                        //         "os_version_min"
                        //       ) &&
                        //       targeting.devices[0].os_version_min +
                        //         ", " +
                        //         targeting.devices[0].os_version_max
                        //   }
                      ]}
                    />
                  </Content>
                </Content>
              </ImageBackground>
            </Content>

            <Footer style={styles.footerBlock}>
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
                    Segment.trackWithProperties(
                      "Select Ad Payment Review Button",
                      {
                        business_name: this.props.mainBusiness.businessname,
                        campaign_budget: data.lifetime_budget_micro
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
            </Footer>
          </Container>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
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
  data: state.instagramAds.data
});

const mapDispatchToProps = dispatch => ({
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  saveCampaignSteps: step => dispatch(actionCreators.saveCampaignSteps(step)),
  get_languages: () => dispatch(actionCreators.get_languages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramAdPaymentReview);
