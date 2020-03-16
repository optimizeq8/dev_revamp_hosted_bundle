import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Logo from "../../../../assets/SVGs/Optimize";
import * as Segment from "expo-analytics-segment";
import isStringArabic from "../../../isStringArabic";
import styles from "./styles";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Bold } from "../../../MiniComponents/StyledComponents";
import GradientButton from "../../../MiniComponents/GradientButton";
import PlusIcon from "../../../../assets/SVGs/Plus";
export default class EmptyCampaigns extends Component {
  render() {
    let { mainBusiness, translate, userInfo } = this.props;
    const { verified_account } = userInfo;
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
              style={{ alignSelf: "center" }}
              width={heightPercentageToDP(10)}
              height={heightPercentageToDP(10)}
            />

            <Text style={styles.logoText}>Optimize</Text>
            <Text
              style={[
                styles.brandNameStyle,
                this.props.mainBusiness &&
                !isStringArabic(this.props.mainBusiness.brandname)
                  ? {
                      fontFamily: "montserrat-bold-english"
                    }
                  : {}
              ]}
            >
              {mainBusiness.brandname}
            </Text>
            <Text
              style={[
                styles.businessNameStyle,
                this.props.mainBusiness &&
                !isStringArabic(this.props.mainBusiness.businessname)
                  ? {
                      fontFamily: "montserrat-medium-english"
                    }
                  : {}
              ]}
            >
              {mainBusiness.businessname}
            </Text>
          </View>
        )}

        <View style={styles.mainButtonView}>
          {mainBusiness.user_role == "3" ? (
            <Text style={styles.mainText}>
              {translate("This business doesn't have campaigns yet")}
            </Text>
          ) : !mainBusiness.hasOwnProperty("businessid") ? (
            <Text style={styles.mainText}>
              {translate("Tap the button below to")}
            </Text>
          ) : (
            <Text style={styles.mainText}>
              {translate("You haven’t launched any campaigns yet")}
            </Text>
          )}
          {mainBusiness.user_role !== "3" && (
            <GradientButton
              onPressAction={() => {
                if (this.props.mainBusiness.hasOwnProperty("businessid")) {
                  Segment.trackWithProperties("Create Campaign", {
                    category: "Campaign Creation"
                  });
                  this.props.navigation.navigate("AdType");
                } else {
                  this.props.navigation.navigate("CreateBusinessAccount");
                }
              }}
              uppercase={true}
              style={styles.campaignButton}
              radius={80}
            >
              <PlusIcon fill={"#FFFFFF"} width={22} height={22} />
            </GradientButton>
          )}
          {mainBusiness.user_role !== "3" &&
            !mainBusiness.hasOwnProperty("businessid") && (
              <Text style={styles.bottomText}>
                <Bold style={styles.launchText}>
                  {translate("create")}
                  {"\n"}
                </Bold>
                {translate("Your first business")}
              </Text>
            )}
          {mainBusiness.user_role !== "3" &&
            mainBusiness.hasOwnProperty("businessid") && (
              <Text style={styles.bottomText}>
                <Bold style={styles.launchText}>
                  {translate("launch")}
                  {"\n"}
                </Bold>
                {translate("Your first Campaign")}
              </Text>
            )}
        </View>
      </View>
    );
  }
}
