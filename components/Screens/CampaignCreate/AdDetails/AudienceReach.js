import React, { Component } from "react";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import LowerButton from "../../../MiniComponents/LowerButton";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
//Styles
import styles from "./styles";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import formatNumber from "../../../formatNumber";
import ImpressionsIcon from "../../../../assets/SVGs/Performance/Impressions";
import SwipeUpsIcon from "../../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import { globalColors } from "../../../../GlobalStyles";
import { heightPercentageToDP } from "react-native-responsive-screen";

class ReachBar extends Component {
  state = { showMetrics: false };
  render() {
    const { translate } = this.props.screenProps;
    let { startEditing, editCampaign, campaignInfo, copilot } = this.props;
    return (
      <View
        {...copilot}
        style={[
          styles.bottom,
          startEditing &&
            !editCampaign && {
              bottom:
                heightPercentageToDP(5) < 30
                  ? heightPercentageToDP(12)
                  : heightPercentageToDP(7),
            },
        ]}
      >
        <View style={styles.bottomReachView}>
          <Text style={styles.expectedResultText}>
            {translate("Expected Results")}
          </Text>
          <View style={styles.chartItems}>
            <View style={styles.reachPeopleView}>
              <SwipeUpsIcon
                fill="#9300FF"
                width={RFValue(13.5, 414)}
                height={RFValue(15, 414)}
              />
              <View style={styles.reachInnerView}>
                <View style={styles.swipesView}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.reachSubHeading}
                  >
                    {translate("Swipe Ups")}{" "}
                  </Text>
                  {/* <Small
                    style={[
                      styles.reachSubHeading,
                      { textTransform: "lowercase", fontSize: 8 },
                    ]}
                  >
                    ({translate("avg")})
                  </Small> */}
                </View>

                {this.props.estimatedMetricsLoading ? (
                  <PlaceholderLine width={70} height={10} />
                ) : (
                  <Text uppercase style={styles.reachTextNum}>
                    {this.props.estimated_metrics &&
                      formatNumber(this.props.estimated_metrics.swipes, true)}
                    {/* {"  " + translate("people")} */}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.reachPeopleView}>
              <ImpressionsIcon
                fill="#9300FF"
                width={RFValue(15, 414)}
                height={RFValue(15, 414)}
              />
              <View style={styles.reachInnerView}>
                <View style={styles.impressionsView}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.reachSubHeading}
                  >
                    {translate("Impressions")}{" "}
                  </Text>
                  {/* <Small
                    style={[
                      styles.reachSubHeading,
                      { textTransform: "lowercase", fontSize: 8 },
                    ]}
                  >
                    ({translate("avg")})
                  </Small> */}
                </View>
                {this.props.estimatedMetricsLoading ? (
                  <PlaceholderLine width={70} height={10} />
                ) : (
                  <Text style={styles.reachTextNum}>
                    {this.props.estimated_metrics &&
                      formatNumber(
                        this.props.estimated_metrics.impressions,
                        true
                      )}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
          {((editCampaign &&
            startEditing &&
            campaignInfo.campaign_end &&
            campaignInfo.campaign_end === "0" &&
            !this.props.campaignEnded &&
            this.props.mainBusiness.user_role !== "3") ||
            (!editCampaign && startEditing)) &&
            (this.props.loading ? (
              <AnimatedCircularProgress
                size={50}
                width={5}
                fill={100}
                rotation={360}
                lineCap="round"
                tintColor={globalColors.purple}
                backgroundColor="rgba(255,255,255,0.3)"
                adDetails={false}
                style={{ alignSelf: "center" }}
              />
            ) : (
              <LowerButton
                screenProps={this.props.screenProps}
                style={[styles.reachBarLowerButton]}
                function={() => this.props._handleSubmission()}
                purpleViolet
                text={"Next"}
                width={RFValue(7.5, 414)}
                height={RFValue(7.5, 414)}
              />
            ))}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  average_reach: state.campaignC.average_reach,
  estimated_metrics: state.campaignC.estimated_metrics,
  estimatedMetricsLoading: state.campaignC.estimatedMetricsLoading,
  total_reach: state.campaignC.total_reach,
  mainBusiness: state.account.mainBusiness,
  campaignEnded: state.campaignC.campaignEnded,
});
const mapDispatchToProps = (dispatch) => ({
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReachBar);
