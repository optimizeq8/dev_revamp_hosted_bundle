import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
//styles
import styles from "./styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../Global Styles";

class CampaignStats extends Component {
  render() {
    let selectedCampaign = this.props.selectedCampaign;
    let highestDate = new Date(selectedCampaign.highest_spend_date);
    let month = highestDate.toLocaleString("en-us", { month: "short" });
    let date = highestDate.getDate() + " " + highestDate.getFullYear();
    return (
      <>
        <View
          style={{
            top: hp(5) > 44 ? 33 : 15,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          {selectedCampaign.video_views || selectedCampaign.video_views >= 0 ? (
            <Text
              style={[
                styles.title,
                {
                  fontSize: 13
                }
              ]}
            >
              Video Views{"\n "}
              <Text style={globalStyles.numbers}>
                {selectedCampaign.video_views}
              </Text>
            </Text>
          ) : null}
          {selectedCampaign.reach || selectedCampaign.reach >= 0 ? (
            <Text
              style={[
                styles.title,
                {
                  fontSize: 13
                }
              ]}
            >
              Reach{" \n"}
              <Text style={globalStyles.numbers}>{selectedCampaign.reach}</Text>
            </Text>
          ) : null}
          {selectedCampaign.paid_frequency ||
          selectedCampaign.paid_frequency >= 0 ? (
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
                {selectedCampaign.paid_frequency}
              </Text>
            </Text>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={styles.boxStats}>
            <Text style={styles.stats}>Average Spend Per day</Text>
            <Text style={[globalStyles.numbers, { fontSize: 25 }]}>
              <Text style={[globalStyles.numbers]}>$</Text>
              {selectedCampaign.avg_spend_per_day >= 0 &&
                selectedCampaign.avg_spend_per_day}
            </Text>
          </View>
          <View style={styles.boxStats}>
            <Text style={styles.stats}>Highest Spend Per day</Text>
            <Text style={[globalStyles.numbers, { fontSize: 25 }]}>
              <Text style={[globalStyles.numbers]}>$</Text>
              {selectedCampaign.avg_spend_per_day >= 0 &&
                selectedCampaign.highest_spend_per_day}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.boxStats,
            { width: "85%", alignSelf: "center", top: 40, height: 90 }
          ]}
        >
          <Text style={[styles.stats, { width: 130 }]}>Highest Spend Date</Text>

          {this.props.loadingCampaignStats ? (
            <PlaceholderLine />
          ) : (
            <Text style={[globalStyles.numbers, { fontSize: 25 }]}>
              {month + " " + date}
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
