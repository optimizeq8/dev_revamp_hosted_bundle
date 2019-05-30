import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions
} from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Toggle from "react-native-switch-toggle";
import Chart from "./Charts";
import { LinearGradient, Segment } from "expo";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles, { globalColors } from "../../../Global Styles";
import formatNumber from "../../formatNumber";
class CampaignCard extends Component {
  state = {
    paused: false,
    status: "PAUSED"
  };
  toggleStatus = () => {
    this.setState({ paused: !this.state.paused });
  };
  getLeftText = () => {
    return this.props.campaign.status === "PAUSED"
      ? ""
      : this.props.campaign.review_status === "COMPLETED"
      ? "Complete"
      : this.props.campaign.review_status.includes("PENDING")
      ? ""
      : "Live";
  };
  getRightText = () => {
    return this.props.campaign.review_status === "REJECTED" &&
      this.props.campaign.status !== "LIVE"
      ? "Rejected"
      : this.props.campaign.status === "PAUSED"
      ? " Paused"
      : "";
  };

  render() {
    let campaign = this.props.campaign;

    let chart = [
      { spend: campaign.spends }
      // { impressions: campaign.impressions },
      // { swipes: campaign.swipes }
    ].map((category, i) => (
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
            if (this.props.campaign.review_status !== "REJECTED") {
              this.props.getCampaignDetails(
                this.props.campaign.campaign_id,
                this.props.navigation
              );
              Segment.trackWithProperties("Campaign Card Button", {
                campaign_id: this.props.campaign.campaign_id
              });
            } else {
              this.props.navigation.navigate("AdDesign", {
                rejected: true,
                objective: campaign.objective,
                headline: campaign.headline,
                campaign_id: campaign.campaign_id
              });
            }
            // this.props.navigation.push("CampaignDetails", {
            //   review_status: this.props.campaign.review_status
            // });
          }}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.titletext]}
              >
                {this.props.campaign.name}
              </Text>
            </View>
            {this.props.campaign.review_status.includes("PENDING") && (
              <View
                style={[
                  styles.adStatus,
                  {
                    backgroundColor: this.props.campaign.review_status.includes(
                      "REJECTED"
                    )
                      ? "#FF5700"
                      : globalColors.orange
                  }
                ]}
              >
                <Text style={styles.reviewtext}>
                  {this.props.campaign.review_status.includes("PENDING")
                    ? "In Review"
                    : this.props.campaign.review_status.includes("REJECTED")
                    ? "Ad Rejected"
                    : "Campaign Paused"}
                </Text>
              </View>
            )}
            <Icon
              type="MaterialCommunityIcons"
              name="snapchat"
              style={styles.icon}
            />
            {!this.props.campaign.review_status.includes("PENDING") && (
              <Text style={[styles.subtext]}>
                {this.props.campaign.review_status.includes("REJECTED")
                  ? "Tap here to submit your Ad again"
                  : "Tap to view more"}
              </Text>
            )}

            <View style={{ flexDirection: "row" }}>
              {chart}
              <View>
                <View style={styles.campaignIcons}>
                  <ImpressionsIcons style={{ bottom: 3 }} />
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
                        ? (parseFloat(campaign.spends) /
                            parseFloat(campaign.impressions)) *
                          1000
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
                switchOn={campaign.status !== "PAUSED"}
                textLeftStyle={[
                  styles.toggleTextLeft,
                  {
                    fontSize:
                      this.props.campaign.review_status === "COMPLETED"
                        ? 8
                        : 11,
                    left:
                      this.props.campaign.review_status === "COMPLETED" ? 4 : 12
                  }
                ]}
                textRightStyle={styles.toggleTextRight}
                onPress={this.toggleStatus}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FF9D00"
                circleColorOn="#66D072"
                duration={200}
                circleStyle={{
                  width: 17,
                  height: 17,
                  borderRadius: 50
                }}
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
