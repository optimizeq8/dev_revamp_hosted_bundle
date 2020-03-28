// Components
import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import {
  View,
  BackHandler,
  Platform,
  I18nManager,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import * as Animatable from "react-native-animatable";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LowerButton from "../../../MiniComponents/LowerButton";
import AdTypeCard from "./AdTypeCard";
import CustomHeader from "../../../MiniComponents/Header";

//Icons
import BackDrop from "../../../MiniComponents/BackDrop";

//Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Data
import { SocialPlatforms } from "../../../Data/socialMediaPlatforms.data";
import { snapAds, googleAds, instagramAds } from "../../../Data/adTypes.data";
//Functions
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

import ContinueCampaign from "../../../MiniComponents/ContinueCampaign";

class AdType extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    activeSlide: 0,
    active: "Snapchat",
    ad_type_array: snapAds,
    media_type:
      Platform.OS === "android" && I18nManager.isRTL
        ? [...snapAds].reverse() //For some reason reverse inverts the original array every time, so this creates a new instance of it
        : snapAds,
    // media_type:
    //   Platform.OS === "android" && I18nManager.isRTL
    //     ? [...instagramAds].reverse() //For some reason reverse inverts the original array every time, so this creates a new instance of it
    //     : instagramAds,
    isVisible: false,
    socialMediaPlatforms:
      Platform.OS === "android" && I18nManager.isRTL
        ? [...SocialPlatforms].reverse()
        : SocialPlatforms,
    campaign_type: "SnapAd",
    route: "AdObjective",
    // campaign_type: "InstagramFeedAd",
    // route: "InstagramFeedAdObjective",
    inverted: Platform.OS === "android" && I18nManager.isRTL
  };

  componentDidMount() {
    // console.log("this.props.data", this.props.data);
    if (this.props.data && this.props.data.hasOwnProperty("index")) {
      this.navigationRouteHandler(this.props.data.index);
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    Segment.trackWithProperties("Closed Ad Type", {
      business_name: this.props.mainBusiness.businessname
    });

    this.props.navigation.navigate("Dashboard");

    return true;
  };

  navigationRouteHandler = index => {
    let activeSlide = index;
    if (this.state.inverted) {
      const reversedSnapAds = [...this.state.media_type].reverse(); //Needed to spread the state array becuase it was reversing the array every time you switch between slides
      // console.log("reversedSnapAds", reversedSnapAds);
      let campaign_type = reversedSnapAds[index].value;
      // console.log("index", index);
      // console.log("campaign_type reverse", campaign_type);
      let route = reversedSnapAds[index].rout;
      this.setState({ route, campaign_type, activeSlide });
    } else {
      let campaign_type = this.state.media_type[index].value;
      // console.log("campaign_type", campaign_type);
      let route = this.state.media_type[index].rout;
      this.setState({
        route,
        campaign_type,
        activeSlide
      });
    }
  };

  handleMediaChange = index => {
    let route = "";
    let media_type = "";

    switch (index) {
      case 0:
        route = "AdObjective";
        media_type = this.state.inverted ? [...snapAds].reverse() : snapAds;
        break;
      case 1:
        route = "GoogleAdInfo";
        media_type = googleAds;
        break;
      case 2:
        route = "InstagramFeedAdObjective";
        media_type = instagramAds;
        break;
    }
    // To set campaign type by deafult to 1st value of the respective media type selected
    let campaign_type = media_type[0].value;
    // console.log("campaign_tpe selected", campaign_type);

    this.setState({ route, media_type, activeSlide: 0, campaign_type });
  };

  navigationHandler = adType => {
    //Check if account is verified or not
    if (
      this.props.userInfo.hasOwnProperty("verified_account") &&
      !this.props.userInfo.verified_account
    ) {
      Segment.trackWithProperties("Navigate to VerifyAccount", {
        step: 1,
        business_name: this.props.mainBusiness.businessname,
        campaign_type: adType.value
      });
      this.props.navigation.navigate("VerifyAccount");
    } else {
      Segment.trackWithProperties("Selected Ad Type", {
        business_name: this.props.mainBusiness.businessname,
        campaign_type: adType.value
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        step: 1,
        business_name: this.props.mainBusiness.businessname,
        campaign_type: adType.value
      });
      if (
        this.props.adType !== adType.value &&
        !this.props.incompleteCampaign
      ) {
        this.props.resetCampaignInfo(true);
      }
      if (!this.props.incompleteCampaign) {
        this.props.set_adType(adType.value);
      }
      if (
        !this.props.mainBusiness.snap_ad_account_id &&
        adType.mediaType === "snapchat"
      ) {
        this.props.navigation.navigate("SnapchatCreateAdAcc");
      } else if (
        !this.props.mainBusiness.google_account_id &&
        adType.mediaType === "google"
      ) {
        this.props.navigation.navigate("GoogleCreateAdAcc");
      } else if (
        this.props.mainBusiness.google_account_id &&
        adType.mediaType === "google" &&
        this.props.mainBusiness.google_suspended === "1"
      ) {
        this.props.navigation.navigate("SuspendedWarning");
      } else
        this.props.navigation.navigate(adType.rout, {
          tempAdType: adType.value
        });
    }

    // this.props.save_campaign_info({ index: this.state.activeSlide });
  };

  _renderItem = ({ item }) => {
    let MediaIcon = item.icon.type;
    const { translate } = this.props.screenProps;
    return (
      <TouchableOpacity
        onPress={() => {
          this.media_carousel.snapToItem(item.id - 1);
        }}
        style={styles.slide}
      >
        <MediaIcon
          fill="#fff"
          width={"75%"}
          height={"75%"}
          style={styles.slideIcon}
        />
        <Text style={styles.iconTitle}>{translate(item.title)}</Text>
      </TouchableOpacity>
    );
  };

  _renderSlides = ({ item }) => {
    return (
      <AdTypeCard
        key={item.value}
        navigationHandler={this.navigationHandler}
        mainBusiness={this.props.mainBusiness}
        campaign_type={this.state.campaign_type}
        adType={item}
        screenProps={this.props.screenProps}
      />
    );
  };
  setModalVisible = (isVisible, resetCampaign) => {
    this.setState({ isVisible });
    resetCampaign && this.props.resetCampaignInfo(!resetCampaign);
  };
  getValuebasedOnActiveSlide = () => {
    let backgroundColor = "#0000";
    let textColor = "#FFF";
    const index = SocialPlatforms.findIndex(
      sP => sP.title === this.state.active
    );
    let MainIcon = SocialPlatforms[index].headingIcon.type;
    let ad_type_array = [];
    switch (this.state.active) {
      case "Snapchat":
        backgroundColor = "#FEFB00";
        textColor = "#000";
        ad_type_array = snapAds;
        break;
      case "Google":
        backgroundColor = "#4285F4";
        textColor = "#FFF";
        ad_type_array = googleAds;
        break;
      case "Instagram":
        backgroundColor = "#0000";
        textColor = "#FFF";
        ad_type_array = instagramAds;
        break;
    }

    return {
      backgroundColor,
      textColor,
      MainIcon,
      ad_type_array
    };
  };
  render() {
    const { translate } = this.props.screenProps;
    const {
      backgroundColor,
      textColor,
      MainIcon,
      ad_type_array
    } = this.getValuebasedOnActiveSlide();
    return (
      <SafeAreaView
        style={[
          styles.safeAreaView,
          {
            backgroundColor: backgroundColor
          }
        ]}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Ad Type", {
              category: "Campaign Creation"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              step: 1,
              business_name: this.props.mainBusiness.businessname,
              campaign_type: this.state.campaign_type
            });
          }}
        />
        <Container style={styles.container}>
          {/* <BackDrop /> */}
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            titelStyle={{ color: textColor }}
            iconColor={textColor}
            segment={{
              str: "Ad Type Close",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            // title={"Create a new campaign!"}
          />

          <View style={{ paddingHorizontal: 26 }}>
            <Text
              style={[
                {
                  fontFamily: "montserrat-bold",
                  fontSize: 16,
                  textAlign: "left",
                  textTransform: "uppercase",
                  paddingBottom: 12
                },
                {
                  color: textColor
                }
              ]}
            >
              Create a new
            </Text>
            <ScrollView horizontal>
              {SocialPlatforms.map(social => {
                let MediaIcon = social.icon.type;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        active: social.title
                      });
                    }}
                    style={[
                      {
                        alignItems: "center",
                        width: 55,
                        height: 55,
                        borderRadius: 50,
                        marginHorizontal: 5,
                        backgroundColor: "rgba(0,0,0,0.2)"
                      },
                      this.state.active === social.title && {
                        borderColor: "#FF790A",
                        borderWidth: 3
                      }
                    ]}
                  >
                    <MediaIcon width={"100%"} height={"100%"} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <MainIcon
              width={widthPercentageToDP(70)}
              style={{
                position: "absolute",
                right:
                  this.state.active === "Google"
                    ? widthPercentageToDP(-45)
                    : widthPercentageToDP(-22),
                top:
                  this.state.active === "Google"
                    ? heightPercentageToDP(-5)
                    : heightPercentageToDP(-10)
              }}
            />
            <Text
              style={[
                {
                  fontSize: 23,
                  fontFamily: "montserrat-bold",
                  textTransform: "uppercase",
                  paddingVertical: 13,
                  textAlign: "left"
                },
                {
                  color: textColor
                }
              ]}
            >
              {translate(this.state.active)}
              <Text
                style={[
                  {
                    color: "#FFF",
                    fontSize: 14,
                    fontFamily: "montserrat-bold",
                    textTransform: "uppercase"
                  },
                  {
                    color: textColor
                  }
                ]}
              >
                {" " + translate("Campaign")}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#F4F4F4",
              borderTopRightRadius: 35,
              borderTopLeftRadius: 35
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontFamily: "montserrat-bold",
                fontSize: 16,
                color: "#909090",
                paddingTop: 20,
                paddingHorizontal: 12 + 16
              }}
            >
              {`Select ${this.state.active} Ad Type`}
            </Text>
            <ScrollView
              // style={{
              //   paddingHorizontal: 12
              // }}
              contentContainerStyle={{
                paddingHorizontal: 12,
                marginHorizontal: 5
              }}
            >
              {ad_type_array.map(item => {
                let Image = item.image;
                return (
                  <View
                    key={item.title}
                    style={{
                      flexDirection: "row",
                      // alignItems: "center",
                      backgroundColor: "#FFF",
                      borderRadius: 35,
                      paddingVertical: 20,

                      marginVertical: 5
                    }}
                  >
                    <Image style={{ alignSelf: "center", marginLeft: 10 }} />
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text
                        style={{
                          fontFamily: "montserrat-bold",
                          fontSize: 19,
                          color: "#575757",
                          textTransform: "uppercase",
                          lineHeight: 21,
                          paddingTop: 10,
                          textAlign: "left"
                        }}
                      >
                        {translate(item.title)} {translate("Ad")}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "montserrat-regular",
                          fontSize: 10,
                          color: "#909090",
                          lineHeight: 17,
                          textAlign: "left",
                          width: widthPercentageToDP(55)
                        }}
                      >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo
                      </Text>
                      <Text
                        style={{
                          fontFamily: "montserrat-bold",
                          fontSize: 12,
                          lineHeight: 16,
                          marginTop: 12,
                          marginBottom: 4,
                          color: "#575757",
                          textTransform: "uppercase",
                          textAlign: "left"
                        }}
                      >
                        Suitable For:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "montserrat-bold",
                          fontSize: 9,
                          lineHeight: 14,
                          color: "#FF7A09",
                          textAlign: "left"
                        }}
                      >
                        Events Coverage, Vlogs ,Others
                      </Text>
                      <LowerButton
                        style={{
                          width: 50,
                          height: 50,
                          alignSelf: "flex-end"
                        }}
                        function={() => {
                          this.navigationHandler(item);
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {/* <View style={{ height: 70, marginBottom: 10 }}>
            <Animatable.View animation={"fadeIn"}>
              <LowerButton
                style={styles.proceedButtonRTL}
                function={this.navigationHandler}
                bottom={1}
              />
            </Animatable.View>
          </View> */}
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  set_adType: value => dispatch(actionCreators.set_adType(value)),
  save_campaign_info: info => dispatch(actionCreators.save_campaign_info(info)),
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdType);
