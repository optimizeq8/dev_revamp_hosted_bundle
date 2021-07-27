import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import analytics from "@segment/analytics-react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import isStringArabic from "../../../isStringArabic";
import styles from "./styles";

// MiniComponents
import LowerButton from "../../../MiniComponents/LowerButton";

// Icons
import LaunchCampaignIcon from "../../../../assets/SVGs/LaunchCampaignHome";
import Snapchat from "../../../../assets/SVGs/AdType/Snapchat";
import Google from "../../../../assets/SVGs/AdType/GoogleIcon";
import OnlineStoreHome from "../../../../assets/SVGs/OnlineStoreHome";
// import Logo from "../../../../assets/SVGs/Optimize";
import Logo from "../../../../assets/images/Optimize_Icon_White.png";

import Instagram from "../../../../assets/images/AdTypes/InstaWhiteLogo";

export default class EmptyCampaigns extends Component {
  redirectToCampaignAdTypeOrCreateBsn = () => {
    let userNotVerified =
      this.props.userInfo &&
      this.props.userInfo.hasOwnProperty("verified_account") &&
      !this.props.userInfo.verified_account;
    let businessApproved =
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("approved") &&
      this.props.mainBusiness.approved === "1";
    let userisSuperAdmin =
      this.props.userInfo &&
      this.props.userInfo.hasOwnProperty("superadmin") &&
      this.props.userInfo.superadmin;
    let hasBusinessId =
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("businessid");
    let routePath = "AdType";
    if (userNotVerified) {
      routePath = "VerifyAccount";
    } else if (!businessApproved && !userisSuperAdmin) {
      routePath = "VerifyBusiness";
    } else if (hasBusinessId) {
      routePath = "AdType";
    } else {
      routePath = "CreateBusinessAccount";
    }

    analytics.track(`Button Pressed`, {
      button_type: "Create Campaign",
      button_content: "LAUNCH YOU FIRST AD",
      button_color: "Orange Illustration",
    });

    this.props.navigation.navigate(routePath, {
      source: "Dashboard",
      source_action: "a_create_campaign",
    });
  };

  goToVerifyAccount = () => {
    analytics.track(`Button Pressed`, {
      button_type: "Verify account",
      button_content: "VERFIY ACCOUNT",
      button_color: "Orange text",
    });
    this.props.navigation.navigate("VerifyAccount", {
      source: "Dashboard",
      source_action: "start_account _verification",
    });
  };

  goToMyWebsiteTutorial = () => {
    let userNotVerified =
      this.props.userInfo &&
      this.props.userInfo.hasOwnProperty("verified_account") &&
      !this.props.userInfo.verified_account;
    let businessApproved =
      this.props.mainBusiness &&
      this.props.mainBusiness.hasOwnProperty("approved") &&
      this.props.mainBusiness.approved === "1";
    let userisSuperAdmin =
      this.props.userInfo &&
      this.props.userInfo.hasOwnProperty("superadmin") &&
      this.props.userInfo.superadmin;

    let routePath = "TutorialWeb";
    if (userNotVerified) routePath = "VerifyAccount";
    else if (!businessApproved && !userisSuperAdmin)
      routePath = "VerifyBusiness";

    this.props.navigation.navigate(routePath, {
      source: "Dashboard",
      source_action: "a_open_website_tutorial",
    });
  };
  render() {
    let { mainBusiness, translate, userInfo } = this.props;
    const { verified_account } = userInfo;
    const { user_role } = mainBusiness;

    return (
      <View style={styles.flex1}>
        {userInfo.hasOwnProperty("verified_account") && !verified_account ? (
          <View style={styles.flex}>
            {/* <Logo
              style={styles.logo}
              width={heightPercentageToDP(11)}
              height={heightPercentageToDP(11)}
            /> */}
            <Image
              source={Logo}
              resizeMode="contain"
              style={[
                {
                  width: widthPercentageToDP(25),
                  height: heightPercentageToDP(8),
                  alignSelf: "center",
                },
                styles.logo,
              ]}
            />
            <Text style={[styles.helloNameStyle]}>
              {translate("Hello")} {userInfo.firstname}!
            </Text>
            <Text style={[styles.accountNotVerifiedText]}>
              {translate("Your account is not verified yet")}
            </Text>
            <TouchableOpacity onPress={this.goToVerifyAccount}>
              <Text style={[styles.verifyAccountText]}>
                {translate("Verify Account")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.flex}>
            <Image
              source={Logo}
              resizeMode="contain"
              style={[
                {
                  width: widthPercentageToDP(25),
                  height: heightPercentageToDP(8),
                  alignSelf: "center",
                },
                styles.logo,
              ]}
            />

            <Text
              style={[
                styles.helloNameStyle,

                !isStringArabic(userInfo.firstname)
                  ? {
                      fontFamily: "montserrat-bold-english",
                    }
                  : {},
              ]}
            >
              {translate("Hello")} {userInfo.firstname}!
            </Text>
            <Text style={styles.logoText}>
              {translate("Welcome to")} Optimize App
            </Text>
          </View>
        )}
        <ScrollView
          contentContainerStyle={[
            styles.mainButtonView,
            (user_role === "3" ||
              (mainBusiness.weburl && mainBusiness.weburl !== "")) && {
              flex: 1,
            },
          ]}
        >
          <Text style={styles.getStartedText}>
            {translate("Get Started!")} !
          </Text>
          <TouchableOpacity
            style={styles.campaignCreateCard}
            onPress={this.redirectToCampaignAdTypeOrCreateBsn}
          >
            <LinearGradient
              colors={["#FF7964", "#CB5853"]}
              locations={[0.3, 0.75]}
              style={styles.gradient}
            />
            <View style={styles.socialPlatformIconView}>
              <Snapchat width={75} style={styles.snapchatIcon} fill="black" />
              <Google
                width={widthPercentageToDP(30)}
                style={styles.googleIcon}
              />
            </View>

            {user_role == "3" ? (
              <Text style={styles.mainText}>
                {translate("This business doesn't have campaigns yet")}
              </Text>
            ) : !mainBusiness.hasOwnProperty("businessid") ? (
              <Text style={styles.mainText}>
                {translate("Create new business")}
              </Text>
            ) : (
              <Text style={styles.mainText}>
                {translate("Launch your first Ad")}
              </Text>
            )}
            <LaunchCampaignIcon style={styles.launchCampaignIcon} />
            <LowerButton
              screenProps={this.props.screenProps}
              width={RFValue(10, 414)}
              height={RFValue(10, 414)}
              style={styles.lowerButton}
              function={this.redirectToCampaignAdTypeOrCreateBsn}
            />
          </TouchableOpacity>
          {mainBusiness.hasOwnProperty("businessid") &&
            user_role !== "3" &&
            (!mainBusiness.weburl || mainBusiness.weburl === "") && (
              <TouchableOpacity
                style={styles.websiteCard}
                onPress={this.goToMyWebsiteTutorial}
              >
                <LinearGradient
                  colors={["#41C5FF", "#46ABF4"]}
                  locations={[0.3, 0.75]}
                  style={styles.gradient}
                />
                {!mainBusiness.hasOwnProperty("businessid") ? (
                  <Text style={styles.mainText}>
                    {translate("Tap the button below to")}
                  </Text>
                ) : (
                  <Text style={styles.mainText}>
                    {translate("Create your own website")}
                  </Text>
                )}
                <OnlineStoreHome
                  width={widthPercentageToDP(100)}
                  style={styles.onlineStoreHomeIcon}
                />
                <LowerButton
                  screenProps={this.props.screenProps}
                  width={20}
                  height={20}
                  style={styles.lowerButton}
                  function={this.goToMyWebsiteTutorial}
                />
              </TouchableOpacity>
            )}
        </ScrollView>
      </View>
    );
  }
}
