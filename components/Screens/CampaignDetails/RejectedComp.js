import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import * as actionCreators from "../../../store/actions";
import styles from "./styles";
class RejectedComp extends Component {
  render() {
    let { selectedCampaign, navigation } = this.props;
    const { translate } = this.props.screenProps;
    return (
      <View>
        <Text style={[styles.subHeadings, { fontSize: 17 }]}>
          {translate("Why was your ad rejected?")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignSelf: "center",
          }}
        >
          <View style={styles.dot} />
          <Text
            style={[
              styles.subtext,
              {
                fontFamily: "montserrat-regular",
                width: "80%",
              },
            ]}
          >
            {selectedCampaign && selectedCampaign.review_status_reason}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.setRejectedAdType(selectedCampaign.campaign_type);
            this.props.setRejectedCampaignData(selectedCampaign);
            navigation.navigate(
              selectedCampaign.campaign_type === "SnapAd" ||
                selectedCampaign.campaign_type === "CollectionAd"
                ? "AdDesign"
                : "AdCover",
              {
                rejected: true,
                objective: selectedCampaign.objective,
                headline: selectedCampaign.headline,
                campaign_id: selectedCampaign.campaign_id,
              }
            );
          }}
          style={styles.reviewButton}
        >
          <Text style={styles.subHeadings}>
            {translate("Review Ad and publish")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setRejectedAdType: (info) => dispatch(actionCreators.setRejectedAdType(info)),
  setRejectedCampaignData: (rejCampaign) =>
    dispatch(actionCreators.setRejectedCampaignData(rejCampaign)),
});

export default connect(null, mapDispatchToProps)(RejectedComp);
