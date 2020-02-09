import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "native-base";
import Chart from "../CircleChart/Chart";
import CampaignStats from "./CampStats/CampaignStats";
import SingleMetric from "./CampStats/SingleMetric";
import CampDetailsInfo from "./CampDetailsInfo";
import LowerButton from "../LowerButton";

//Redux
import { connect } from "react-redux";

//Styles
import globalStyles from "../../../GlobalStyles";
import styles from "./styles";

class CampaignCircleChart extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let {
      selectedCampaign,
      detail,
      loading,
      handleChartToggle,
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
                  width={15}
                  height={15}
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
            paddingRight: 30
          }}
          style={{
            maxHeight: "100%",
            paddingLeft: detail ? 20 : 0
          }}
        >
          {!loading && (
            <Chart
              budget={selectedCampaign.campaign.budget}
              spends={
                !detail
                  ? selectedCampaign.campaign.cost
                  : googleCampaignOverall.spend
              }
              screenProps={this.props.screenProps}
              detail={detail}
            />
          )}
          <View style={{ paddingLeft: 12, alignSelf: "center" }}>
            {detail && (
              <SingleMetric
                detail={detail}
                translate={translate}
                loadingCampaignStats={this.props.loadingCampaignStats}
                metricValue={
                  !detail
                    ? selectedCampaign.campaign.impressions
                    : googleCampaignOverall.impressions
                }
                metric="impressions"
              />
            )}
            <SingleMetric
              detail={detail}
              translate={translate}
              loadingCampaignStats={this.props.loadingCampaignStats}
              metricValue={
                !detail
                  ? selectedCampaign.campaign.clicks
                  : googleCampaignOverall.clicks
              }
              metric="clicks"
            />
            <SingleMetric
              detail={detail}
              translate={translate}
              loadingCampaignStats={this.props.loadingCampaignStats}
              metricValue={
                !detail
                  ? selectedCampaign.campaign.ctr.toFixed(2)
                  : googleCampaignOverall.ctr
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
        {detail && selectedCampaign.campaign.status !== "REMOVED" && (
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
