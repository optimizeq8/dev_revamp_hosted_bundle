import React, { Component } from "react";
import { View, TouchableOpacity, Text, I18nManager } from "react-native";
import { Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import InstagramIcon from "../../../assets/SVGs/InstagramIcon";
import whyDidYouRender from "@welldone-software/why-did-you-render";

import { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";
import CampaignCircleChart from "../InstagramCampaignCircleCharts";
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
  ad_status = this.props.campaign.ad_status;
  ad_status_color_code = this.props.campaign.ad_status_color_code;

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }
  handleCampaignPress = () => {
    analytics.track(`a_open_campaign_card`, {
      source: "dashboard",
      source_action: "a_open_campaign_card",
      timestamp: new Date().getTime(),
      campaign_id: this.props.campaign.campaign_id,
      campaign_channel: "instagram",
    });
    this.props.getInstagramCampaignDetails(
      this.props.campaign.campaign_id,
      this.props.navigation
    );
  };

  campaignEndedOrNot = (campaign, endDate) => {
    endDate.setDate(endDate.getDate() + 2);
    let campaignEndedOrNot =
      this.review_status.includes("PENDING") ||
      (this.review_status.includes("APPROVED") &&
        new Date(campaign.start_time).setHours(0, 0, 0, 0) <=
          new Date().setHours(0, 0, 0, 0) &&
        new Date(campaign.end_time) >= new Date())
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
          // disabled={true}
          onPress={this.handleCampaignPress}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <InstagramIcon width={25} height={25} fill={"#FFF"} />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingHorizontal: 10,
                  flex: 1,
                }}
              >
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[
                    styles.titleText,
                    !isStringArabic(this.props.campaign.name)
                      ? {
                          fontFamily: "montserrat-bold-english",
                        }
                      : {
                          fontFamily: "changa-bold-arabic",
                        },
                  ]}
                >
                  {this.props.campaign.name}
                </Text>

                <View style={[styles.adStatus]}>
                  <Icon
                    style={[
                      styles.circleIcon,
                      {
                        color: this.ad_status_color_code,
                      },
                    ]}
                    name={
                      this.ad_status && this.ad_status.includes("Ad Rejected")
                        ? "circle-slash"
                        : "circle"
                    }
                    type={
                      this.ad_status && this.ad_status.includes("Ad Rejected")
                        ? "Octicons"
                        : "FontAwesome"
                    }
                  />
                  <Text
                    style={[
                      styles.reviewText,
                      {
                        color: this.ad_status_color_code,
                      },
                    ]}
                  >
                    {translate(`${this.ad_status}`) + " "}
                    {campaign && campaign.campaign_start_date
                      ? campaign.campaign_start_date
                      : ""}
                  </Text>
                </View>
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
                        color: globalColors.green,
                        // position: "absolute"
                      },
                    ]}
                  />
                )}
            </View>

            {this.ad_status && this.ad_status.includes("Ad Rejected") && (
              <Text style={[styles.subtext]}>
                {translate("Tap to submit your Ad again")}
              </Text>
            )}

            {this.review_status === "APPROVED" && (
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

const mapDispatchToProps = (dispatch) => ({
  getInstagramCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getInstagramCampaignDetails(id, naviagtion)),
});
export default connect(null, mapDispatchToProps)(CampaignCard);
CampaignCard.whyDidYouRender = false;
