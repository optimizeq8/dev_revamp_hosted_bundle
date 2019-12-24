import React, { Component } from "react";
import { View, ScrollView, I18nManager } from "react-native";
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
  widthPercentageToDP
} from "react-native-responsive-screen";
import { Text, Button, Icon } from "native-base";
import CampaignStats from "../../Screens/CampaignDetails/CampStats/CampaignStats";
import CampDetailsInfo from "./CampDetailsInfo";
import LowerButton from "../LowerButton";
import globalStyles from "../../../GlobalStyles";
import { Small } from "../../MiniComponents/StyledComponents/index";
class CampaignCircleChart extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let {
      campaign,
      detail,
      loading,
      handleChartToggle,
      channel,
      chartExpanded
    } = this.props;

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
                  width={I18nManager.isRTL ? 8 : 40}
                  height={40}
                  isRTL={I18nManager.isRTL}
                  style={styles.adPerformanceLowerBUtton}
                />
              </>
            )}
          </View>
        )}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled={detail && chartExpanded}
          contentContainerStyle={{
            justifyContent: "flex-start"
          }}
          style={{ maxHeight: !detail ? "100%" : "80%", width: "100%" }}
        >
          {!loading && (
            <Chart
              budget={
                channel === "snapchat"
                  ? campaign.lifetime_budget_micro
                  : campaign.budget
              }
              spends={campaign.spends}
              screenProps={this.props.screenProps}
              detail={detail}
            />
          )}

          <View style={{ width: 170 }}>
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
              <View style={styles.campaignInfo}>
                <Text uppercase style={[styles.subtext]}>
                  {!detail ||
                  (campaign && campaign.objective === "BRAND_AWARENESS")
                    ? translate("Impressions")
                    : translate("Swipe Ups")}
                </Text>
                <Text
                  style={[GlobalStyles.numbers, styles.campaignNumbers]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {formatNumber(
                    campaign
                      ? !detail || campaign.objective === "BRAND_AWARENESS"
                        ? campaign.impressions
                        : campaign.swipes
                      : 0,
                    true
                  )}
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
                  <Text uppercase style={[styles.subtext]}>
                    {translate("Reach")}
                    <Small style={{ fontSize: 8 }}> {translate("Total")}</Small>
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[GlobalStyles.numbers, styles.campaignNumbers]}
                  >
                    {campaign ? campaign.reach : 0}
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
                  <Text uppercase style={[styles.subtext]}>
                    {campaign && campaign.objective === "BRAND_AWARENESS"
                      ? translate("cpm")
                      : translate("Swipe Ups")}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[GlobalStyles.numbers, styles.campaignNumbers]}
                  >
                    {campaign ? campaign.cpm : 0}
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
                  <Text uppercase style={[styles.subtext]}>
                    {translate("Frequency")}
                    <Small style={{ fontSize: 8 }}> {translate("Total")}</Small>
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[GlobalStyles.numbers, styles.campaignNumbers]}
                  >
                    {campaign ? campaign.paid_frequency : 0}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {detail && chartExpanded && (
            <CampaignStats
              selectedCampaign={campaign}
              screenProps={this.props.screenProps}
            />
          )}
        </ScrollView>
        {detail && <CampDetailsInfo {...this.props} />}
      </View>
    );
  }
}

export default CampaignCircleChart;
