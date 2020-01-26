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
                  width={15}
                  height={15}
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
            justifyContent: "flex-start",
            paddingRight: 40
          }}
          style={{
            maxHeight: "100%",
            paddingLeft: detail ? 20 : 0
          }}
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
                  { flexDirection: detail ? "column-reverse" : "column" }
                ]}
              >
                <Text
                  style={[
                    styles.campaignNumbers,
                    detail && styles.campaignNumbersDetail
                  ]}
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
                <Text
                  uppercase
                  style={[styles.subtext, detail && styles.subtextDetail]}
                >
                  {!detail ||
                  (campaign && campaign.objective === "BRAND_AWARENESS")
                    ? translate("Impressions")
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
                      detail && styles.campaignNumbersDetail
                    ]}
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
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.campaignNumbers,
                      detail && styles.campaignNumbersDetail
                    ]}
                  >
                    {formatNumber(
                      campaign
                        ? campaign.objective === "BRAND_AWARENESS"
                          ? campaign.cpm
                          : campaign.swipes
                        : 0,
                      true
                    )}
                  </Text>
                  <Text
                    uppercase
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
                      detail && styles.campaignNumbersDetail
                    ]}
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
