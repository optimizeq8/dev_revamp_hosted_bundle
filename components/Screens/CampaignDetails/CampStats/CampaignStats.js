import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import BoxStats from "./BoxStats";

//styles
import styles from "../styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../../GlobalStyles";
import formatNumber from "../../../formatNumber";

class CampaignStats extends Component {
  render() {
    let selectedCampaign = this.props.selectedCampaign;

    return (
      <>
        <View
          style={{
            width: 200,
            top: 35,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255,255,255,0.4)",
            alignSelf: "center"
          }}
        />

        <View style={styles.mainMetrics}>
          {!this.props.loadingCampaignStats ? (
            <Text
              style={[
                styles.title,
                {
                  fontSize: 13
                }
              ]}
            >
              Impressions{"\n "}
              <Text style={globalStyles.numbers}>
                {selectedCampaign &&
                  formatNumber(selectedCampaign.impressions, true)}
              </Text>
            </Text>
          ) : (
            <PlaceholderLine width={70} />
          )}
          {!this.props.loadingCampaignStats ? (
            <Text
              style={[
                styles.title,
                {
                  fontSize: 13
                }
              ]}
            >
              Reach{" \n"}
              <Text style={globalStyles.numbers}>
                {selectedCampaign && formatNumber(selectedCampaign.reach, true)}
              </Text>
            </Text>
          ) : (
            <PlaceholderLine width={70} />
          )}
          {!this.props.loadingCampaignStats ? (
            <Text
              style={[
                styles.title,
                {
                  fontSize: 13
                }
              ]}
            >
              Paid Frequency{" \n"}
              <Text style={globalStyles.numbers}>
                {selectedCampaign &&
                  formatNumber(selectedCampaign.paid_frequency, true)}
              </Text>
            </Text>
          ) : (
            <PlaceholderLine width={70} />
          )}
        </View>
        <BoxStats selectedCampaign={selectedCampaign} />
        <View style={[styles.boxStats, styles.wideBoxStat]}>
          <Text style={[styles.stats, { width: 130 }]}>Total Spends</Text>

          {this.props.loadingCampaignStats ? (
            <PlaceholderLine />
          ) : (
            <Text style={[globalStyles.numbers, { fontSize: 25 }]}>
              $ {selectedCampaign && selectedCampaign.spends.toFixed(2)}
            </Text>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loadingCampaignStats: state.dashboard.loadingCampaignStats
});
export default connect(
  mapStateToProps,
  null
)(CampaignStats);
