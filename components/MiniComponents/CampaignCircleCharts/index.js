import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import Chart from "../CircleChart/Chart";
import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import formatNumber from "../../formatNumber";
import ReachIcon from "../../../assets/SVGs/CampaignDetail/ReachIcon";
import FrequencyIcon from "../../../assets/SVGs/CampaignDetail/FrequencyIcon";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CampaignStats from "../../Screens/CampaignDetails/CampStats/CampaignStats";
import InstaCampaignStats from "../../Screens/InstagramCampaignDetails/CampStats/CampaignStats";
import CampDetailsInfo from "./CampDetailsInfo";
import LowerButton from "../LowerButton";
import globalStyles from "../../../GlobalStyles";
import { Small } from "../../MiniComponents/StyledComponents/index";
import PlaceholderLineComp from "../PlaceholderLine";
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
      campaign.review_status.includes("PENDING") ||
      (campaign.review_status.includes("APPROVED") &&
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
    let {
      detail,
      loading,
      handleChartToggle,
      channel,
      chartExpanded,
    } = this.props;
    let campaign = this.props.campaign || { review_status: "" };

    return (
      <View style={detail ? styles.campaignInfoStyle : styles.campaignInfoCard}>
        {detail && (
          <View style={styles.titleContainer}>
            {/* To switch between date choices and header of the component */}
            {!chartExpanded && (
              <>
                <Text style={globalStyles.title}>
                  {translate("Ad Performance")}
                </Text>
                {!loading && (
                  <LowerButton
                    screenProps={this.props.screenProps}
                    function={() => handleChartToggle()}
                    width={15}
                    height={15}
                    style={styles.adPerformanceLowerBUtton}
                  />
                )}
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
            // justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "flex-end",
            paddingRight: detail ? 40 : 0,
          }}
          style={{
            maxHeight: "100%",
          }}
        >
          {
            <Chart
              budget={
                campaign
                  ? channel === "snapchat" || channel === "instagram"
                    ? campaign.lifetime_budget_micro
                    : campaign.budget
                  : 0
              }
              spends={campaign.spends}
              screenProps={this.props.screenProps}
              detail={detail}
              loading={loading}
            />
          }

          {loading ? (
            <View style={{ paddingHorizontal: 12, alignSelf: "center" }}>
              <PlaceholderLineComp {...styles.campaignIcons} />
              <PlaceholderLineComp {...styles.campaignIcons} />
              <PlaceholderLineComp {...styles.campaignIcons} />
            </View>
          ) : (
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
                          : channel === "instagram"
                          ? campaign.clicks
                          : campaign.swipes
                        : 0,
                      true
                    )}
                  </Text>
                  <Text
                    style={[styles.subtext, detail && styles.subtextDetail]}
                  >
                    {!detail ||
                    (campaign && campaign.objective === "BRAND_AWARENESS")
                      ? translate("Impressions")
                      : channel === "instagram"
                      ? translate("Clicks")
                      : translate("Swipe Ups")}
                  </Text>
                </View>
              </View>

              {detail ? (
                <View
                  style={detail ? styles.campaignIcons : styles.campaignCard}
                >
                  <ReachIcon
                    fill="#fff"
                    height={heightPercentageToDP(3)}
                    width={heightPercentageToDP(3)}
                  />
                  <View style={styles.campaignInfo}>
                    <Text
                      style={[styles.subtext, , detail && styles.subtextDetail]}
                    >
                      {translate("Reach")}
                      <Small style={{ fontSize: 8 }}>
                        {translate("Total")}
                      </Small>
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
                <View
                  style={detail ? styles.campaignIcons : styles.campaignCard}
                >
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
                            : campaign.swipes
                          : 0,
                        campaign.objective !== "BRAND_AWARENESS",
                        campaign.objective === "BRAND_AWARENESS"
                      )}
                    </Text>
                    <Text
                      style={[styles.subtext, , detail && styles.subtextDetail]}
                    >
                      {campaign && campaign.objective === "BRAND_AWARENESS"
                        ? translate("cpm")
                        : translate("Swipe Ups")}
                    </Text>
                  </View>
                </View>
              )}
              {detail && (
                <View
                  style={detail ? styles.campaignIcons : styles.campaignCard}
                >
                  <FrequencyIcon
                    fill="#fff"
                    height={heightPercentageToDP(3)}
                    width={heightPercentageToDP(3)}
                  />
                  <View style={styles.campaignInfo}>
                    <Text
                      style={[styles.subtext, detail && styles.subtextDetail]}
                    >
                      {translate("Frequency")}
                      {channel !== "instagram" && (
                        <Small style={{ fontSize: 8 }}>
                          {translate("Total")}
                        </Small>
                      )}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={[
                        styles.campaignNumbers,
                        detail && styles.campaignNumbersDetail,
                      ]}
                    >
                      {campaign
                        ? parseFloat(campaign.paid_frequency).toFixed(2)
                        : parseFloat(0).toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
          {detail &&
            chartExpanded &&
            (channel === "instagram" ? (
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
            campaign &&
            (this.campaignEndedOrNot(campaign) || campaign.campaign_end === "1")
          ) && <CampDetailsInfo {...this.props} />}
      </View>
    );
  }
}

export default CampaignCircleChart;
