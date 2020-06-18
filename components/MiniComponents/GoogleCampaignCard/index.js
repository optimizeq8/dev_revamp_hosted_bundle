import React, { Component } from "react";
import { View, TouchableOpacity, I18nManager } from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import GoogleAd from "../../../assets/SVGs/GoogleAds";
import { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";
import GoogleCampaignCircleCharts from "../GoogleCampaignCircleCharts";
import TimeDifferance from "../../Functions/TimeDifferance";
import globalStyles from "../../../GlobalStyles";
import dateFormat from "dateformat";

class GoogleCampaignCard extends Component {
  review_status = this.props.campaign.review_status;
  campaign_status = this.props.campaign.status;

  handleCampaignPress = () => {
    this.props.get_google_campiagn_details(
      this.props.campaign.campaign_id,
      this.props.campaign.start_time,
      this.props.campaign.end_time,
      false,
      {
        source: "dashboard",
        source_action: "a_open_campaign_details",
      }
    );
    this.props.navigation.navigate("GoogleCampaignDetails", {
      campaign: this.props.campaign,
      source: "dashboard",
      source_action: "a_open_campaign_details",
    });
    Segment.trackWithProperties("Pressed Google Campaign Card", {
      campaign_id: this.props.campaign.campaign_id,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    let campaign = this.props.campaign;
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 2);
    let gradientColor = {
      color1: "#9300FF",
      color2: "#671FDE",
    };
    if (I18nManager.isRTL) {
      gradientColor = {
        color2: "#9300FF",
        color1: "#671FDE",
      };
    }
    return (
      <LinearGradient
        colors={[gradientColor.color1, "#9300FF", gradientColor.color2]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.cardStyle}
      >
        <TouchableOpacity
          onPress={this.handleCampaignPress}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <GoogleAd width={30} height={30} />
                <View style={styles.headerContent}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.titleText,
                      !isStringArabic(campaign.name)
                        ? {
                            fontFamily: "montserrat-bold-english",
                          }
                        : {},
                    ]}
                  >
                    {campaign.name}
                  </Text>
                  {this.review_status === "APPROVED" ? (
                    <View style={[styles.adStatus]}>
                      <Icon
                        style={[
                          styles.circleIcon,
                          {
                            color:
                              campaign.status === "REMOVED"
                                ? globalColors.orange
                                : globalColors.green,
                          },
                        ]}
                        name={"circle"}
                        type={"FontAwesome"}
                      />
                      <Text
                        style={[
                          styles.reviewText,
                          {
                            color:
                              campaign.status === "REMOVED"
                                ? globalColors.orange
                                : globalColors.green,
                          },
                        ]}
                      >
                        {translate(
                          `${
                            campaign.status === "ENABLED"
                              ? new Date(campaign.start_time).setHours(
                                  0,
                                  0,
                                  0,
                                  0
                                ) > new Date().setHours(0, 0, 0, 0)
                                ? "Scheduled for"
                                : "LIVE"
                              : campaign.status === "PAUSED"
                              ? "Campaign Paused"
                              : "Campaign ended"
                          }`
                        ) +
                          " " +
                          (new Date(campaign.start_time) > new Date()
                            ? dateFormat(
                                new Date(campaign.start_time),
                                "mmm dS"
                              )
                            : "")}
                      </Text>
                    </View>
                  ) : this.review_status === "REJECTED" ? (
                    <View style={[styles.adStatus]}>
                      <Icon
                        style={[
                          styles.circleIcon,
                          {
                            color: globalColors.red,
                          },
                        ]}
                        name={"circle-slash"}
                        type={"Octicons"}
                      />
                      <Text
                        style={[styles.reviewText, { color: globalColors.red }]}
                      >
                        {translate("Ad Rejected")}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.adStatus]}>
                      <Icon
                        style={[
                          styles.circleIcon,
                          {
                            color: globalColors.orange,
                          },
                        ]}
                        name={"circle"}
                        type={"FontAwesome"}
                      />
                      <Text
                        style={[
                          styles.reviewText,
                          {
                            color: globalColors.orange,
                          },
                        ]}
                      >
                        {translate("In Review")}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {!campaign.completed &&
                campaign.status === "REMOVED" &&
                endDate < new Date() && (
                  <Icon
                    type="MaterialCommunityIcons"
                    name="alert"
                    style={[
                      styles.icon,
                      {
                        marginLeft: "auto",
                        // left: "75%",
                        color: globalColors.green,
                        // position: "absolute"
                      },
                    ]}
                  />
                )}
            </View>
            {this.review_status === "APPROVED" && (
              <View style={styles.chartContainer}>
                <GoogleCampaignCircleCharts
                  channel={this.props.channel}
                  selectedCampaign={{ campaign }}
                  detail={false}
                  screenProps={this.props.screenProps}
                />

                {campaign.status !== "REMOVED" && (
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

const mapDispatchToProps = (dispatch) => ({
  get_google_campiagn_details: (
    id,
    start_time,
    end_time,
    getStats,
    segmentInfo
  ) =>
    dispatch(
      actionCreators.get_google_campiagn_details(
        id,
        start_time,
        end_time,
        getStats,
        segmentInfo
      )
    ),
});
export default connect(null, mapDispatchToProps)(GoogleCampaignCard);
