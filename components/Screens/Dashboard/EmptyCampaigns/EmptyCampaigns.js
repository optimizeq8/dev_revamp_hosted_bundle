import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

import * as Segment from "expo-analytics-segment";
import isStringArabic from "../../../isStringArabic";
import styles from "./styles";

// MiniComponents
import LowerButton from "../../../MiniComponents/LowerButton";

// Icons
import LaunchCampaignIcon from "../../../../assets/SVGs/LaunchCampaignHome";
import Snapchat from "../../../../assets/SVGs/AdType/Snapchat";
import Google from "../../../../assets/SVGs/AdType/GoogleIcon";
import OnlineStoreHome from "../../../../assets/SVGs/OnlineStoreHome";
import Logo from "../../../../assets/SVGs/Optimize";

export default class EmptyCampaigns extends Component {
  redirectToCampaignAdTypeOrCreateBsn = () => {
    if (this.props.mainBusiness.hasOwnProperty("businessid")) {
      Segment.trackWithProperties("Create Campaign", {
        category: "Campaign Creation"
      });
      this.props.navigation.navigate("AdType");
    } else {
      this.props.navigation.navigate("CreateBusinessAccount");
    }
  };

  render() {
    let { mainBusiness, translate, userInfo } = this.props;
    const { verified_account } = userInfo;
    const { user_role } = mainBusiness;

    return (
      <View style={styles.flex1}>
        {userInfo.hasOwnProperty("verified_account") && !verified_account ? (
          <View style={styles.flex}>
            <Logo
              style={styles.logo}
              width={heightPercentageToDP(11)}
              height={heightPercentageToDP(11)}
            />

            <Text style={[styles.helloNameStyle]}>
              {translate("Hello")} {userInfo.firstname}!
            </Text>
            <Text style={[styles.accountNotVerifiedText]}>
              {translate("Your account is not verified yet")}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.push("VerifyAccount")}
            >
              <Text style={[styles.verifyAccountText]}>
                {translate("Verify Account")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.flex}>
            <Logo
              style={styles.logo}
              width={heightPercentageToDP(10)}
              height={heightPercentageToDP(10)}
            />

            <Text
              style={[
                styles.helloNameStyle,

                !isStringArabic(userInfo.firstname)
                  ? {
                      fontFamily: "montserrat-bold-english"
                    }
                  : {}
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
            (user_role === "3" || mainBusiness.weburl !== "") && {
              flex: 1
            }
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
              <Snapchat width={75} style={styles.snapchatIcon} />
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
              width={20}
              height={20}
              style={styles.lowerButton}
              function={this.redirectToCampaignAdTypeOrCreateBsn}
            />
          </TouchableOpacity>
          {mainBusiness.hasOwnProperty("businessid") &&
            user_role !== "3" &&
            (!mainBusiness.weburl || mainBusiness.weburl === "") && (
              <TouchableOpacity
                style={styles.websiteCard}
                onPress={() => {
                  this.props.navigation.navigate("OptimizeWebsite");
                }}
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
                  width={20}
                  height={20}
                  style={styles.lowerButton}
                />
              </TouchableOpacity>
            )}
        </ScrollView>
      </View>
    );
  }
}
