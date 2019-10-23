import React, { Component } from "react";
import { Text, View } from "react-native";
import Logo from "../../../../assets/SVGs/Optimize";
import Background from "../../../../assets/SVGs/Background";
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";
import * as Animatable from "react-native-animatable";
import * as Segment from "expo-analytics-segment";
import isStringArabic from "../../../isStringArabic";
import styles from "./styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { Button } from "native-base";
export default class EmptyCampaigns extends Component {
  render() {
    let { mainBusiness, translate } = this.props;
    const B = props => (
      <Text style={{ fontFamily: "montserrat-bold" }}>{props.children}</Text>
    );

    return (
      <View>
        {/* <BackdropIcon style={styles.backDrop} /> */}
        {/* <Background style={styles.background} /> */}
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
          <Text style={styles.mainText}>
            {translate("Tap the button below to")} <B>{translate("launch")} </B>
            {translate("Your first Campaign")}
          </Text>
          <Animatable.View
            animation="swing"
            duration={1200}
            iterationDelay={1000}
            iterationCount="infinite"
          >
            <Button
              onPress={() => {
                if (!this.props.mainBusiness.snap_ad_account_id) {
                  Segment.trackWithProperties("Create SnapAd Acount", {
                    category: "Ad Account",
                    label: "New SnapAd Account",
                    business_name: this.props.mainBusiness.businessname,
                    business_id: this.props.mainBusiness.businessid
                  });
                  this.props.navigation.navigate("SnapchatCreateAdAcc");
                } else {
                  Segment.trackWithProperties("Create Campaign", {
                    category: "Campaign Creation"
                  });
                  this.props.navigation.navigate("AdType");
                }
              }}
              style={styles.campaignButton}
            >
              <Text style={styles.campaignButtonText}>
                {translate(`New\nCampaign`)}
              </Text>
            </Button>
          </Animatable.View>
        </View>
      </View>
    );
  }
}
