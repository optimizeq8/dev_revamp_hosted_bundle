import React, { Component } from "react";
import { Text, View } from "react-native";
import Logo from "../../../../assets/SVGs/Optimize";
import * as Animatable from "react-native-animatable";
import * as Segment from "expo-analytics-segment";
import isStringArabic from "../../../isStringArabic";
import styles from "./styles";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Bold } from "../../../MiniComponents/StyledComponents";
import GradientButton from "../../../MiniComponents/GradientButton";
export default class EmptyCampaigns extends Component {
  render() {
    let { mainBusiness, translate } = this.props;
    return (
      <View>
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
                  fontFamily: "montserrat-regular-english"
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
        <View style={styles.mainButtonView}>
          {mainBusiness.user_role === "3" ? (
            <Text style={styles.mainText}>
              {translate("This business doesn't have campaigns yet")}
            </Text>
          ) : !mainBusiness.hasOwnProperty("businessid") ? (
            <Text style={styles.mainText}>
              {translate("Tap the button below to")}{" "}
              <Bold>{translate("create")} </Bold>
              {translate("Your first business")}
            </Text>
          ) : (
            <Text style={styles.mainText}>
              {translate("Tap the button below to")}{" "}
              <Bold>{translate("launch")} </Bold>
              {translate("Your first Campaign")}
            </Text>
          )}
          {mainBusiness.user_role !== "3" && (
            <Animatable.View
              animation="swing"
              duration={1200}
              iterationDelay={1000}
              iterationCount="infinite"
            >
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
                textStyle={styles.campaignButtonText}
                text={
                  mainBusiness.hasOwnProperty("businessid")
                    ? translate(`New\nCampaign`)
                    : translate(`Create new business`)
                }
              />
            </Animatable.View>
          )}
        </View>
      </View>
    );
  }
}
