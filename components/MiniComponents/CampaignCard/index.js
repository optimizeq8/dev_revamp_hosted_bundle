import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import SnapchatBorder from "../../../assets/SVGs/Snapchat-Border";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import slowlog from "react-native-slowlog";

import GlobalStyles, { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";
import CampaignCircleChart from "../CampaignCircleCharts";
import TimeDifferance from "../../Functions/TimeDifferance";
import isEqual from "react-fast-compare";
import globalStyles from "../../../GlobalStyles";

whyDidYouRender(React);
class CampaignCard extends Component {
  constructor(props) {
    super(props);
    // slowlog(this, /.*/, {
    // verbose: true
    // }); //verbose logs all functions and their time
  }
  review_status = this.props.campaign.review_status;
  campaign_status = this.props.campaign.status;

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }
  handleCampaignPress = () => {
    Segment.trackWithProperties("Pressed Campaign Card", {
      campaign_id: this.props.campaign.campaign_id
    });
    this.props.getCampaignDetails(
      this.props.campaign.campaign_id,
      this.props.navigation
    );
  };

  campaignEndedOrNot = (campaign, endDate) => {
    endDate.setDate(endDate.getDate() + 2);
    let campaignEndedOrNot =
      this.review_status.includes("APPROVED") &&
      new Date(campaign.start_time).setHours(0, 0, 0, 0) <=
        new Date().setHours(0, 0, 0, 0) &&
      new Date(campaign.end_time) >= new Date()
        ? null
        : campaign.campaign_end === "1" ||
          new Date(campaign.end_time) < new Date();
    return campaignEndedOrNot;
  };
  render() {
    const { translate } = this.props.screenProps;
    let campaign = this.props.campaign;
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 2);
    return (
      <LinearGradient
        colors={["#9300FF", "#9300FF", "#4E00CB"]}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardStyle}
      >
        <TouchableOpacity
          onPress={this.handleCampaignPress}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <SnapchatBorder width={30} height={30} />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingHorizontal: 10,
                  flex: 1
                }}
              >
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[
                    styles.titleText,
                    !isStringArabic(this.props.campaign.name)
                      ? {
                          fontFamily: "montserrat-bold-english"
                        }
                      : {
                          fontFamily: "changa-bold-arabic"
                        }
                  ]}
                >
                  {this.props.campaign.name}
                </Text>
                {this.campaignEndedOrNot(campaign, endDate) ? (
                  <View style={[styles.adStatus]}>
                    <Icon
                      style={[
                        styles.circleIcon,
                        {
                          color: globalColors.orange
                        }
                      ]}
                      name={"circle"}
                      type={"FontAwesome"}
                    />
                    <Text
                      style={[
                        styles.reviewText,
                        { color: globalColors.orange }
                      ]}
                    >
                      {translate("Campaign ended")}
                    </Text>
                  </View>
                ) : (
                  <View style={[styles.adStatus]}>
                    <Icon
                      style={[
                        styles.circleIcon,
                        {
                          color: this.review_status.includes("REJECTED")
                            ? globalColors.red
                            : this.campaign_status === "LIVE"
                            ? globalColors.green
                            : globalColors.orange
                        }
                      ]}
                      name={
                        this.review_status.includes("REJECTED")
                          ? "circle-slash"
                          : "circle"
                      }
                      type={
                        this.review_status.includes("REJECTED")
                          ? "Octicons"
                          : "FontAwesome"
                      }
                    />
                    <Text
                      style={[
                        styles.reviewText,
                        {
                          color: this.review_status.includes("REJECTED")
                            ? globalColors.red
                            : !this.review_status.includes("PENDING") &&
                              this.campaign_status === "LIVE"
                            ? globalColors.green
                            : globalColors.orange
                        }
                      ]}
                    >
                      {translate(
                        `${
                          this.review_status.includes("PENDING")
                            ? "In Review"
                            : this.review_status.includes("REJECTED")
                            ? "Ad Rejected"
                            : this.campaign_status === "LIVE"
                            ? "LIVE"
                            : "Campaign Paused"
                        }`
                      )}
                    </Text>
                  </View>
                )}
              </View>
              {campaign.snap_ad_id &&
                campaign.campaign_end === "0" &&
                endDate < new Date() && (
                  <Icon
                    type="MaterialCommunityIcons"
                    name="alert"
                    style={[
                      styles.icon,
                      {
                        marginLeft: "auto",
                        // left: "75%",
                        color: globalColors.green
                        // position: "absolute"
                      }
                    ]}
                  />
                )}
            </View>

            {!this.review_status.includes("PENDING") &&
              this.review_status.includes("REJECTED") &&
              !(
                campaign.campaign_end === "1" ||
                new Date(campaign.end_time) < new Date()
              ) && (
                <Text style={[styles.subtext]}>
                  {translate("Tap to submit your Ad again")}
                </Text>
              )}

            {this.review_status.includes("APPROVED") && (
              <View style={styles.chartContainer}>
                <CampaignCircleChart
                  channel={this.props.channel}
                  campaign={campaign}
                  detail={false}
                  screenProps={this.props.screenProps}
                />

                {!this.campaignEndedOrNot(campaign, endDate) && (
                  <>
                    <View style={styles.horizontalLineView} />
                    <View style={styles.cardStatusDays}>
                      <Text style={globalStyles.numbers}>
                        {TimeDifferance(new Date(), campaign.end_time)}
                      </Text>
                      <Text uppercase style={styles.cardText}>
                        {translate("Day(s) left")}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}
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
export default connect(null, mapDispatchToProps)(CampaignCard);
CampaignCard.whyDidYouRender = false;
