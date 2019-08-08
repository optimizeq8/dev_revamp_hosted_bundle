import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Toggle from "react-native-switch-toggle";
import Chart from "./Charts";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";

import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";
import formatNumber from "../../formatNumber";
class CampaignCard extends Component {
  review_status = this.props.campaign.review_status;
  campaign_status = this.props.campaign.status;
  state = {
    paused: false,
    status: "PAUSED"
  };
  toggleStatus = () => {
    this.setState({ paused: !this.state.paused });
  };
  getLeftText = () => {
    return this.campaign_status === "PAUSED"
      ? ""
      : this.review_status === "COMPLETED"
      ? "Complete"
      : this.review_status.includes("PENDING")
      ? ""
      : "Live";
  };
  getRightText = () => {
    return this.review_status === "REJECTED" && this.campaign_status !== "LIVE"
      ? "Rejected"
      : this.review_status === "APPROVED"
      ? ""
      : this.campaign_status === "PAUSED"
      ? " Paused"
      : "";
  };

  render() {
    let campaign = this.props.campaign;
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 1);
    let chart = [{ spend: campaign.spends }].map((category, i) => (
      <Chart campaign={campaign} chartCategory={category} key={i} />
    ));
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        locations={[0.7, 1]}
        style={styles.cardStyle}
      >
        <TouchableOpacity
          onPress={() => {
            Segment.trackWithProperties("Pressed Campaign Card", {
              campaign_id: this.props.campaign.campaign_id
            });
            if (this.review_status !== "REJECTED") {
              this.props.getCampaignDetails(
                this.props.campaign.campaign_id,
                this.props.navigation
              );
            } else {
              this.props.navigation.navigate("AdDesign", {
                rejected: true,
                objective: campaign.objective,
                headline: campaign.headline,
                campaign_id: campaign.campaign_id
              });
            }
          }}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.titleText]}
              >
                {this.props.campaign.name}
              </Text>
            </View>
            {this.review_status.includes("APPROVED") &&
            (new Date(campaign.start_time).setHours(0, 0, 0, 0) <=
              new Date().setHours(0, 0, 0, 0) &&
              new Date(campaign.end_time) >=
                new Date()) ? null : campaign.campaign_end === "1" ||
              new Date(campaign.end_time) < new Date() ? (
              <View
                style={[styles.adStatus, GlobalStyles.orangeBackgroundColor]}
              >
                <Text style={styles.reviewText}>Campaign ended</Text>
              </View>
            ) : (
              <View
                style={[
                  styles.adStatus,
                  this.review_status.includes("REJECTED")
                    ? { backgroundColor: "#FF5700" }
                    : GlobalStyles.orangeBackgroundColor
                ]}
              >
                <Text style={styles.reviewText}>
                  {this.review_status.includes("PENDING")
                    ? "In Review"
                    : this.review_status.includes("REJECTED")
                    ? "Ad Rejected"
                    : this.campaign_status === "LIVE"
                    ? "LIVE"
                    : "Campaign Paused"}
                </Text>
              </View>
            )}
            <Icon
              type="MaterialCommunityIcons"
              name="snapchat"
              style={styles.icon}
            />
            {campaign.snap_ad_id &&
              campaign.campaign_end === "0" &&
              endDate < new Date() && (
                <Icon
                  type="MaterialCommunityIcons"
                  name="alert"
                  style={[
                    styles.icon,
                    { left: "75%", color: globalColors.green }
                  ]}
                />
              )}
            {!this.review_status.includes("PENDING") && (
              <Text style={[styles.subtext]}>
                {this.review_status.includes("REJECTED")
                  ? `${
                      campaign.review_status_reason
                    }\n Tap to submit your Ad again`
                  : "Tap to view more"}
              </Text>
            )}

            <View style={styles.chartContainer}>
              {chart}
              <View>
                <View style={styles.campaignIcons}>
                  <ImpressionsIcons style={styles.iconImpression} />
                  <View style={styles.campaignInfo}>
                    <Text
                      style={[GlobalStyles.numbers, styles.campaignNumbers]}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {formatNumber(campaign.impressions, true)}
                    </Text>
                    <Text style={[styles.subtext]}>Impressions</Text>
                  </View>
                </View>
                <View style={styles.campaignIcons}>
                  <SwipeUpsIcon />
                  <View style={styles.campaignInfo}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={[GlobalStyles.numbers, styles.campaignNumbers]}
                    >
                      {campaign.objective !== "BRAND_AWARENESS"
                        ? formatNumber(campaign.swipes, true)
                        : campaign.impressions > 0
                        ? (
                            (parseFloat(campaign.spends) /
                              parseFloat(campaign.impressions)) *
                            1000
                          ).toFixed(3)
                        : 0}
                    </Text>
                    <Text style={[styles.subtext]}>
                      {campaign.objective !== "BRAND_AWARENESS"
                        ? "Swipe Ups"
                        : "CPM"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View pointerEvents="none" style={styles.containerStyle}>
              <Toggle
                backTextLeft={this.getLeftText()}
                backTextRight={this.getRightText()}
                containerStyle={styles.toggleStyle}
                switchOn={
                  campaign.status !== "PAUSED" ||
                  campaign.review_status === "APPROVED"
                }
                textLeftStyle={[
                  styles.toggleTextLeft,
                  {
                    fontSize: this.review_status === "COMPLETED" ? 8 : 11,
                    left: this.review_status === "COMPLETED" ? 4 : 12
                  }
                ]}
                textRightStyle={styles.toggleTextRight}
                onPress={this.toggleStatus}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FF9D00"
                circleColorOn="#66D072"
                duration={200}
                circleStyle={styles.circleStyle}
              />
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getCampaignDetails(id, naviagtion))
});
export default connect(
  null,
  mapDispatchToProps
)(CampaignCard);
