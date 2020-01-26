import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
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
class GoogleCampaignCard extends Component {
  review_status = this.props.campaign.review_status;
  campaign_status = this.props.campaign.status;

  handleCampaignPress = () => {
    this.props.get_google_campiagn_details(
      this.props.campaign.campaign_id,
      this.props.campaign.start_time,
      this.props.campaign.end_time
    );
    this.props.navigation.navigate("GoogleCampaignDetails", {
      campaign: this.props.campaign
    });
    Segment.trackWithProperties("Pressed Google Campaign Card", {
      campaign_id: this.props.campaign.campaign_id
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    let campaign = this.props.campaign;

    return (
      <LinearGradient
        colors={["#9300FF", "#4E00CB"]}
        locations={[0.3, 1]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
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
                            fontFamily: "montserrat-bold-english"
                          }
                        : {}
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
                            color: globalColors.green
                          }
                        ]}
                        name={"circle"}
                        type={"FontAwesome"}
                      />
                      <Text
                        style={[
                          styles.reviewText,
                          { color: globalColors.green }
                        ]}
                      >
                        {translate(
                          `${
                            campaign.status === "LIVE"
                              ? "LIVE"
                              : campaign.status === "PAUSED"
                              ? "Campaign Paused"
                              : "Campaign ended"
                          }`
                        )}
                      </Text>
                    </View>
                  ) : this.review_status === "REJECTED" ? (
                    <View style={[styles.adStatus]}>
                      <Icon
                        style={[
                          styles.circleIcon,
                          {
                            color: globalColors.red
                          }
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
                            color: globalColors.orange
                          }
                        ]}
                        name={"circle"}
                        type={"FontAwesome"}
                      />
                      <Text
                        style={[
                          styles.reviewText,
                          {
                            color: globalColors.orange
                          }
                        ]}
                      >
                        {translate("In Review")}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {this.review_status === "APPROVED" && (
              <View style={styles.chartContainer}>
                <GoogleCampaignCircleCharts
                  channel={this.props.channel}
                  selectedCampaign={{ campaign }}
                  detail={false}
                  screenProps={this.props.screenProps}
                />

                {!campaign.status === "REMOVED" && (
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
  get_google_campiagn_details: (id, start_time, end_time) =>
    dispatch(
      actionCreators.get_google_campiagn_details(id, start_time, end_time)
    )
});
export default connect(null, mapDispatchToProps)(GoogleCampaignCard);
