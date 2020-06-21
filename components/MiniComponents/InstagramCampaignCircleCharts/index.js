import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import Chart from "../CircleChart/Chart";
import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import formatNumber from "../../formatNumber";
import ReachIcon from "../../../assets/SVGs/CampaignDetail/ReachIcon";
import FrequencyIcon from "../../../assets/SVGs/CampaignDetail/FrequencyIcon";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Text, Button, Icon } from "native-base";
import CampaignStats from "../../Screens/CampaignDetails/CampStats/CampaignStats";
import InstaCampaignStats from "../../Screens/InstagramCampaignDetails/CampStats/CampaignStats";
import CampDetailsInfo from "./CampDetailsInfo";
import LowerButton from "../LowerButton";
import globalStyles from "../../../GlobalStyles";
import { Small } from "../../MiniComponents/StyledComponents/index";
class CampaignCircleChart extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.chartExpanded !== this.props.chartExpanded &&
      !this.props.chartExpanded
    ) {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }
  }

  campaignEndedOrNot = (campaign) => {
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 2);
    let campaignEndedOrNot =
      campaign.review_status.includes("APPROVED") &&
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
    let {
      campaign,
      detail,
      loading,
      handleChartToggle,
      channel,
      chartExpanded,
    } = this.props;
    let mediaChannel = campaign.channel || channel;
    return (
      <View style={detail ? styles.campaignInfoStyle : styles.campaignInfoCard}>
        {detail && (
          <View style={styles.titleContainer}>
            {/* To switch between date choices and header of the component */}
            {!chartExpanded && (
              <>
                <Text uppercase style={globalStyles.title}>
                  {translate("Ad Performance")}
                </Text>
                <LowerButton
                  function={() => handleChartToggle()}
                  width={15}
                  height={15}
                  style={styles.adPerformanceLowerBUtton}
                />
              </>
            )}
          </View>
        )}
        <ScrollView
          ref={(ref) => (this.scroll = ref)}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled={detail && chartExpanded}
          contentContainerStyle={{
            justifyContent: "flex-start",
            paddingRight: 40,
          }}
          style={{
            maxHeight: "100%",
          }}
        >
          {!loading && (
            <Chart
              budget={
                mediaChannel === "snapchat" || mediaChannel === "instagram"
                  ? campaign.lifetime_budget_micro
                  : campaign.budget
              }
              spends={campaign.spends}
              screenProps={this.props.screenProps}
              detail={detail}
            />
          )}

          <View style={{ paddingHorizontal: 12, alignSelf: "center" }}>
            <View style={detail ? styles.campaignIcons : styles.campaignCard}>
              {!detail ||
              (campaign && campaign.objective === "BRAND_AWARENESS") ? (
                <ImpressionsIcons
                  fill="#fff"
                  height={heightPercentageToDP(3)}
                  width={heightPercentageToDP(3)}
                />
              ) : (
                <SwipeUpsIcon
                  fill="#fff"
                  height={heightPercentageToDP(3)}
                  width={heightPercentageToDP(3)}
                />
              )}
              <View
                style={[
                  styles.campaignInfo,
                  { flexDirection: detail ? "column-reverse" : "column" },
                ]}
              >
                <Text
                  style={[
                    styles.campaignNumbers,
                    detail && styles.campaignNumbersDetail,
                  ]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {formatNumber(
                    campaign
                      ? !detail || campaign.objective === "BRAND_AWARENESS"
                        ? campaign.impressions
                        : mediaChannel === "instagram"
                        ? campaign.clicks
                        : campaign.swipes
                      : 0,
                    true
                  )}
                </Text>
                <Text
                  uppercase
                  style={[styles.subtext, detail && styles.subtextDetail]}
                >
                  {!detail ||
                  (campaign && campaign.objective === "BRAND_AWARENESS")
                    ? translate("Impressions")
                    : mediaChannel === "instagram"
                    ? translate("Clicks")
                    : translate("Swipe Ups")}
                </Text>
              </View>
            </View>
            {detail ? (
              <View style={detail ? styles.campaignIcons : styles.campaignCard}>
                <ReachIcon
                  fill="#fff"
                  height={heightPercentageToDP(3)}
                  width={heightPercentageToDP(3)}
                />
                <View style={styles.campaignInfo}>
                  <Text
                    uppercase
                    style={[styles.subtext, , detail && styles.subtextDetail]}
                  >
                    {translate("Reach")}
                    <Small style={{ fontSize: 8 }}> {translate("Total")}</Small>
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.campaignNumbers,
                      detail && styles.campaignNumbersDetail,
                    ]}
                  >
                    {campaign ? formatNumber(campaign.reach, true) : 0}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={detail ? styles.campaignIcons : styles.campaignCard}>
                <SwipeUpsIcon
                  fill="#fff"
                  height={heightPercentageToDP(3)}
                  width={heightPercentageToDP(3)}
                />
                <View style={styles.campaignInfo}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.campaignNumbers,
                      detail && styles.campaignNumbersDetail,
                    ]}
                  >
                    {formatNumber(
                      campaign
                        ? campaign.objective === "BRAND_AWARENESS"
                          ? campaign.cpm
                          : mediaChannel === "instagram"
                          ? campaign.clicks
                          : campaign.swipes
                        : 0,
                      campaign.objective !== "BRAND_AWARENESS"
                    )}
                  </Text>
                  <Text
                    uppercase
                    style={[styles.subtext, , detail && styles.subtextDetail]}
                  >
                    {campaign && campaign.objective === "BRAND_AWARENESS"
                      ? translate("cpm")
                      : mediaChannel === "instagram"
                      ? translate("Clicks")
                      : translate("Swipe Ups")}
                  </Text>
                </View>
              </View>
            )}
            {detail && (
              <View style={detail ? styles.campaignIcons : styles.campaignCard}>
                <FrequencyIcon
                  fill="#fff"
                  height={heightPercentageToDP(3)}
                  width={heightPercentageToDP(3)}
                />
                <View style={styles.campaignInfo}>
                  <Text
                    uppercase
                    style={[styles.subtext, detail && styles.subtextDetail]}
                  >
                    {translate("Frequency")}
                    <Small style={{ fontSize: 8 }}> {translate("Total")}</Small>
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.campaignNumbers,
                      detail && styles.campaignNumbersDetail,
                    ]}
                  >
                    {campaign ? campaign.paid_frequency.toFixed(2) : 0}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {detail &&
            chartExpanded &&
            (mediaChannel === "instagram" ? (
              <InstaCampaignStats
                selectedCampaign={campaign}
                screenProps={this.props.screenProps}
              />
            ) : (
              <CampaignStats
                selectedCampaign={campaign}
                screenProps={this.props.screenProps}
              />
            ))}
        </ScrollView>
        {detail &&
          !(
            this.campaignEndedOrNot(campaign) || campaign.campaign_end === "1"
          ) && <CampDetailsInfo {...this.props} />}
      </View>
    );
  }
}

export default CampaignCircleChart;
