// Components
import React, { Component } from "react";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import {
  View,
  BackHandler,
  Platform,
  I18nManager,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import analytics from "@segment/analytics-react-native";
import isNull from "lodash/isNull";
import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";
import GradientButton from "../../../MiniComponents/GradientButton";
import { showMessage } from "react-native-flash-message";

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
  heightPercentageToDP,
} from "react-native-responsive-screen";
import isStringArabic from "../../../isStringArabic";

class AdType extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    active:
      this.props.navigation.getParam("channel", "snapchat") === "snapchat"
        ? "Snapchat"
        : "Instagram",
    ad_type_array: snapAds,
    socialMediaPlatforms:
      Platform.OS === "android" && I18nManager.isRTL
        ? [...SocialPlatforms].reverse()
        : SocialPlatforms,
    route: "AdObjective",
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    if (
      (this.props.mainBusiness &&
        this.props.mainBusiness.instagram_access === "0") ||
      !this.props.mainBusiness.instagram_access
    ) {
      let socialMediaPlatforms =
        Platform.OS === "android" && I18nManager.isRTL
          ? [...SocialPlatforms].reverse()
          : [...SocialPlatforms];
      const index = socialMediaPlatforms.findIndex(
        (el) => el.title === "Instagram"
      );
      socialMediaPlatforms.splice(index, 1);
      this.setState({
        socialMediaPlatforms,
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }

    this.props.navigation.navigate("Dashboard", {
      source: "ad_type",
      source_action: "a_back_button",
    });
    return true;
  };

  navigationHandler = (adType) => {
    const { translate } = this.props.screenProps;

    const device_id = this.props.screenProps.device_id;
    analytics.track(`a_campaign_ad_type`, {
      source: "ad_type",
      source_action: "a_campaign_ad_type",
      campaign_channel: adType.mediaType,
      campaign_ad_type: adType.value,
      device_id,
      context: {
        device_id: device_id,
        type: Platform.OS,
      },
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    //Check if account is verified or not
    const { fb_connected, fb_ad_account_id } = this.props.mainBusiness;
    if (
      this.props.userInfo.hasOwnProperty("verified_account") &&
      !this.props.userInfo.verified_account
    ) {
      this.props.navigation.navigate("VerifyAccount", {
        source: "ad_type",
        source_action: "a_campaign_ad_type",
      });
    } else {
      if (
        this.props.adType !== adType.value &&
        !this.props.incompleteCampaign
      ) {
        this.props.resetCampaignInfo(true);
      }
      if (!this.props.incompleteCampaign && adType.mediaType === "snapchat") {
        this.props.set_adType(adType.value);
      }

      if (
        !this.props.mainBusiness.snap_ad_account_id &&
        adType.mediaType === "snapchat"
      ) {
        this.props.navigation.navigate("SnapchatCreateAdAcc", {
          source: "ad_type",
          source_action: "a_campaign_ad_type",
        });
      } else if (
        !this.props.mainBusiness.google_account_id &&
        adType.mediaType === "google"
      ) {
        this.props.navigation.navigate("GoogleCreateAdAcc", {
          source: "ad_type",
          source_action: "a_campaign_ad_type",
        });
      } else if (
        this.props.mainBusiness.google_account_id &&
        adType.mediaType === "google" &&
        this.props.mainBusiness.google_suspended === "1"
      ) {
        this.props.navigation.navigate("SuspendedWarning", {
          source: "ad_type",
          source_action: "a_campaign_ad_type",
        });
      } else if (adType.mediaType === "instagram" && fb_connected === "0") {
        this.props.navigation.navigate("WebView", {
          url: `https://www.optimizeapp.com/facebooklogin/login.php?b=${this.props.mainBusiness.businessid}`,
          title: "Instagram",
          source: "ad_type",
          source_action: "a_campaign_ad_type",
        });
      } else if (
        adType.mediaType === "instagram" &&
        fb_connected === "1" &&
        (isNull(fb_ad_account_id) || fb_ad_account_id === "")
      ) {
        showMessage({
          message: translate(
            `Your Instagram Account request is in process by OptimizeApp`
          ),
          type: "warning",
          position: "top",
        });
      } else
        this.props.navigation.navigate(adType.rout, {
          tempAdType: adType.value,
          source: "ad_type",
          source_action: "a_campaign_ad_type",
        });
    }
  };

  getValuebasedOnActiveSlide = () => {
    let backgroundColor = "#0000";
    let textColor = "#FFF";
    const index = SocialPlatforms.findIndex(
      (sP) => sP.title === this.state.active
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
        backgroundColor = "#4285F4";
        textColor = "#FFF";
        ad_type_array = instagramAds;
        break;
    }

    return {
      backgroundColor,
      textColor,
      MainIcon,
      ad_type_array,
    };
  };

  setActiveCampaignType = (title) => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const device_id = this.props.screenProps.device_id;
    analytics.track(`a_campaign_channel`, {
      source,
      source_action: "a_campaign_channel",
      timestamp: new Date().getTime(),
      device_id,
      userId: this.props.userInfo.userid,
      campaign_channel: title,
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    analytics.track(`ad_type`, {
      source,
      source_action: "a_campaign_channel",
      timestamp: new Date().getTime(),
      device_id,
      userId: this.props.userInfo.userid,
      campaign_channel: title.toLowerCase(),
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({
      active: title,
    });
  };

  onDidFocus = () => {
    const { translate } = this.props.screenProps;
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    analytics.track(`ad_type`, {
      source,
      source_action,
      campaign_channel: this.state.active.toLowerCase(),
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    const changeFbConnectStatus = this.props.navigation.getParam(
      "success",
      false
    );
    const fb_ad_account_id = this.props.navigation.getParam(
      "fb_ad_account_id",
      null
    );
    if (changeFbConnectStatus && changeFbConnectStatus.includes("true")) {
      const instagram_username = this.props.navigation.getParam(
        "instagram_username",
        ""
      );
      showMessage({
        type: "success",
        message: translate(
          `Your Instagram Business Account {{instagram_username}} has been connected successfully!`,
          {
            instagram_username: instagram_username,
          }
        ),
        duration: 5000,
      });
      this.props.updateBusinessConnectedToFacebook({
        fb_connected: "1",
        fb_ad_account_id: fb_ad_account_id,
        insta_handle: instagram_username,
      });
    }
  };

  render() {
    const { translate } = this.props.screenProps;
    const {
      backgroundColor,
      textColor,
      MainIcon,
      ad_type_array,
    } = this.getValuebasedOnActiveSlide();

    const { fb_connected, fb_ad_account_id } = this.props.mainBusiness;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[
          {
            backgroundColor: backgroundColor,
          },
          styles.safeAreaView,
        ]}
      >
        {this.state.active === "Instagram" && (
          <LinearGradient
            colors={["#DC8B61", "#4300D9"]}
            start={[0, 0]}
            end={[0.7, 0.25]}
            style={styles.gradient}
          />
        )}
        <NavigationEvents onDidFocus={this.onDidFocus} />

        <CustomHeader
          screenProps={this.props.screenProps}
          closeButton={true}
          titleStyle={{ color: textColor }}
          iconColor={textColor}
          segment={{
            str: "Ad Type Close",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "ad_type",
            source_action: "a_go_back",
          }}
          navigation={
            !this.props.navigation.getParam("campaignCreationReset", false)
              ? this.props.navigation
              : undefined
          }
          actionButton={
            this.props.navigation.getParam("campaignCreationReset", false)
              ? () => this.props.navigation.replace("Dashboard")
              : undefined
          }
        />

        <View style={{ paddingHorizontal: 26 }}>
          <Text
            style={[
              styles.createANewText,
              {
                color: textColor,
              },
            ]}
          >
            {translate("Create a new")}
          </Text>
          <ScrollView horizontal contentContainerStyle={{ width: "100%" }}>
            {this.state.socialMediaPlatforms.map((social) => {
              let MediaIcon = social.icon.type;
              return (
                <TouchableOpacity
                  key={social.title}
                  onPress={() => this.setActiveCampaignType(social.title)}
                  style={[
                    styles.mediaIcon,
                    this.state.active === social.title &&
                      styles.activeMediaIcon,
                  ]}
                >
                  <MediaIcon fill="black" width={"100%"} height={"100%"} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <MainIcon
            width={widthPercentageToDP(70)}
            style={[
              styles.mainIcon,
              this.state.active === "Google" && styles.googleMainIcon,
              {
                right:
                  this.state.active === "Google" && I18nManager.isRTL
                    ? widthPercentageToDP(-20)
                    : this.state.active === "Google" && !I18nManager.isRTL
                    ? widthPercentageToDP(-32)
                    : widthPercentageToDP(-22),
                top:
                  this.state.active === "Google"
                    ? heightPercentageToDP(-5)
                    : heightPercentageToDP(-10),
              },
              this.state.active === "Snapchat" &&
                I18nManager.isRTL && {
                  transform: [{ rotateY: "180deg" }],
                },
            ]}
          />
          {this.state.active !== "Google" && I18nManager.isRTL ? (
            <Text
              style={[
                styles.campaignText,
                {
                  color: textColor,
                },
              ]}
            >
              {translate("Campaign") + " "}
              <Text
                style={[
                  styles.headingText,
                  {
                    color: textColor,
                  },
                ]}
              >
                {translate(this.state.active)}
              </Text>
            </Text>
          ) : (
            <Text
              style={[
                styles.headingText,
                {
                  color: textColor,
                },
              ]}
            >
              {translate(this.state.active)}
              <Text
                style={[
                  styles.campaignText,
                  {
                    color: textColor,
                  },
                ]}
              >
                {" " + translate("Campaign")}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.mainView}>
          {this.state.active === "Instagram" && fb_connected === "0" && (
            <GradientButton
              onPressAction={() =>
                this.props.navigation.navigate("WebView", {
                  url: `https://www.optimizeapp.com/facebooklogin/login.php?b=${this.props.mainBusiness.businessid}`,
                  title: "Instagram",
                  source: "ad_type",
                  source_action: "a_connect_to_facebook",
                })
              }
              style={styles.loginBtn}
              uppercase
              text={translate("Login with Facebook")}
            />
          )}
          {this.state.active === "Instagram" &&
            fb_connected === "1" &&
            (isNull(fb_ad_account_id) || fb_ad_account_id === "") && (
              <Text style={styles.fbUnderProcessText}>
                {translate(
                  `Your Instagram Account request is in process by OptimizeApp`
                )}
              </Text>
            )}
          <Text style={styles.selectADTypeText}>
            {translate(`Select {{activeSlide}} Ad Type`, {
              activeSlide: I18nManager.isRTL ? " " : this.state.active,
            })}
          </Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {ad_type_array.map((item) => {
              let Image = item.image;
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.navigationHandler(item);
                  }}
                  key={item.title}
                  style={styles.cardView}
                >
                  <Image style={styles.adTypeImage} />
                  <View style={styles.descriptionView}>
                    <Text
                      style={[
                        styles.titleText,
                        !isStringArabic(translate(item.title)) && {
                          fontFamily: "montserrat-bold-english",
                        },
                      ]}
                    >
                      {`\u200F ${translate(item.title)}`}
                      {/**Added speecial character for strings that has combination of english and arabic */}
                    </Text>
                    <Text style={styles.description}>
                      {translate(item.description)}
                    </Text>
                    <Text style={styles.suitableForText}>
                      {translate("Suitable For:")}
                    </Text>
                    {item.suitableFor.map((point) => {
                      let Icon = point.icon;
                      return (
                        <View
                          key={point.name}
                          style={styles.suitablePointsView}
                        >
                          <Icon />
                          <Text style={styles.suitablePoints}>
                            {translate(point.name)}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <LowerButton
                    screenProps={this.props.screenProps}
                    style={styles.lowerButton}
                    width={12}
                    height={15}
                    bottom={2}
                    function={() => {
                      this.navigationHandler(item);
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  adType: state.campaignC.adType,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  set_adType: (value) => dispatch(actionCreators.set_adType(value)),
  resetCampaignInfo: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  updateBusinessConnectedToFacebook: (data) =>
    dispatch(actionCreators.updateBusinessConnectedToFacebook(data)),
  getFacebookPagesList: (accessToken, fb_user_id, permissions) =>
    dispatch(
      actionCreators.getFacebookPagesList(accessToken, fb_user_id, permissions)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdType);
