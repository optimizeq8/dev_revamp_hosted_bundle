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
import CTRIcon from "../../../assets/SVGs/Performance/CTR";
import ClicksIcon from "../../../assets/SVGs/Performance/Clicks";
import CampaignStats from "./CampStats/CampaignStats";
import { connect } from "react-redux";
import SingleMetric from "./CampStats/SingleMetric";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { Text, Button, Icon } from "native-base";

import CampDetailsInfo from "./CampDetailsInfo";
import LowerButton from "../LowerButton";
import globalStyles from "../../../GlobalStyles";
class CampaignCircleChart extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let {
      selectedCampaign,
      detail,
      loading,
      handleChartToggle,
      channel,
      chartExpanded,
      googleCampaignOverall
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
                  style={styles.adPerformanceLowerButton}
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
            marginHorizontal: detail ? 20 : 0
          }}
          style={{
            maxHeight: !detail ? "100%" : "80%",
            width: "100%"
          }}
        >
          {!loading && (
            <Chart
              budget={selectedCampaign.campaign.budget}
              spends={
                googleCampaignOverall.spend ||
                (!detail ? selectedCampaign.campaign.cost : 0)
              }
              screenProps={this.props.screenProps}
              detail={detail}
            />
          )}
          <View style={{ paddingHorizontal: 12 }}>
            {detail && (
              <SingleMetric
                detail={detail}
                translate={translate}
                loadingCampaignStats={this.props.loadingCampaignStats}
                metricValue={
                  googleCampaignOverall.impressions ||
                  (detail ? selectedCampaign.campaign.impressions : 0)
                }
                metric="impressions"
              />
            )}
            <SingleMetric
              detail={detail}
              translate={translate}
              loadingCampaignStats={this.props.loadingCampaignStats}
              metricValue={
                googleCampaignOverall.clicks ||
                (!detail ? selectedCampaign.campaign.clicks : 0)
              }
              metric="clicks"
            />
            <SingleMetric
              detail={detail}
              translate={translate}
              loadingCampaignStats={this.props.loadingCampaignStats}
              metricValue={
                googleCampaignOverall.ctr ||
                (!detail ? selectedCampaign.campaign.ctr.toFixed(2) : 0)
              }
              metric="ctr"
            />
          </View>

          {detail && chartExpanded && (
            <CampaignStats
              selectedCampaign={selectedCampaign}
              detail={true}
              screenProps={this.props.screenProps}
            />
          )}
        </ScrollView>
        {detail && (
          <CampDetailsInfo
            screenProps={this.props.screenProps}
            campaign={selectedCampaign.campaign}
            loading={loading}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  googleCampaignOverall: state.dashboard.googleCampaignOverall,
  googleCampaignStats: state.dashboard.googleCampaignStats,
  loadingCampaignStats: state.dashboard.loadingCampaignStats
});
export default connect(mapStateToProps, null)(CampaignCircleChart);
