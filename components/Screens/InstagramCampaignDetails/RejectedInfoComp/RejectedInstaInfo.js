import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";

import Rejected from "../../../../assets/SVGs/Rejected.svg";
import CustomButtons from "../../../MiniComponents/CustomButtons";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";
import RejectedReason from "./RejectedReason";
import RejectedReasonModal from "./RejectedReasonModal";
import styles from "./styles";

/**
 * Component that displays the different reasons from snapchat
 * @class
 *
 */
class RejectedSnapchatInfo extends Component {
  state = { isVisible: false, rejectedReason: "", reasonNum: "" };
  setModalVisible = (visible, rejectedReason = "", reasonNum = "") => {
    this.setState({ isVisible: visible, rejectedReason, reasonNum });
  };
  /**
   * handles the review and publish process
   */
  handleSnapchatRejection = () => {
    let {
      selectedCampaign,
      setInstaRejectedAdType,
      setInstaRejectedCampaignData,
      navigation,
    } = this.props;
    setInstaRejectedAdType(selectedCampaign.campaign_type);
    setInstaRejectedCampaignData(selectedCampaign);
    this.props.setRejectedCarouselAds(selectedCampaign.carousel_media);
    navigation.navigate(
      selectedCampaign.campaign_type === "InstagramFeedAd"
        ? "InstagramFeedAdDesign"
        : "InstagramStoryAdDesign",
      {
        rejected: true,
      }
    );
  };

  render() {
    const { review_status_reason, screenProps } = this.props;
    console.log(this.props.selectedCampaign.campaign_type);
    const { translate } = this.props.screenProps;
    let rejReasons = review_status_reason.map((reason, i) => (
      <RejectedReason
        screenProps={screenProps}
        key={reason}
        reason={reason}
        index={i + 1}
        setModalVisible={this.setModalVisible}
      />
    ));
    return (
      <View style={styles.rejectedOuterView}>
        <ScrollView
          contentContainerStyle={styles.contentStyle}
          nestedScrollEnabled={true}
        >
          <View style={styles.rejectedHeader}>
            <Rejected />
            <Text uppercase style={styles.adRejectedTitle}>
              {translate("Ad Rejected")}
            </Text>
            <Text style={styles.hereReasonsText}>
              {translate("Here Are The Reasons") + ":"}
            </Text>
            {rejReasons}
          </View>
        </ScrollView>
        <CustomButtons
          screenProps={this.props.screenProps}
          onPressFunction={this.handleSnapchatRejection}
          content="Review Ad"
          filled
          buttonStyle={styles.customButtonStyle}
          textStyle={styles.customButtonText}
        />
        <RejectedReasonModal
          screenProps={screenProps}
          isVisible={this.state.isVisible}
          setModalVisible={this.setModalVisible}
          reasonNum={this.state.reasonNum}
          rejectedReason={this.state.rejectedReason}
        />
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setInstaRejectedAdType: (info) =>
    dispatch(actionCreators.setInstaRejectedAdType(info)),
  setInstaRejectedCampaignData: (rejCampaign) =>
    dispatch(actionCreators.setInstaRejectedCampaignData(rejCampaign)),
  setRejectedCarouselAds: (rejCampaign) =>
    dispatch(actionCreators.setRejectedCarouselAds(rejCampaign)),
});

export default connect(null, mapDispatchToProps)(RejectedSnapchatInfo);
