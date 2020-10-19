import React, { Component } from "react";
import { View, Text } from "react-native";

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

// Icons
import Rejected from "../../../../assets/SVGs/Rejected.svg";

import CustomButtons from "../../../MiniComponents/CustomButtons";
import RejectedReason from "./RejectedReason";
import RejectedReasonModal from "./RejectedReasonModal";

// Styles
import styles from "./styles";

/**
 * Component that displays the different reasons from snapchat
 * @class
 *
 */
class RejectedSnapchatInfo extends Component {
  state = { isVisible: false, rejectedReason: [], reasonNum: "" };
  setModalVisible = (visible, rejectedReason = [], reasonNum = "") => {
    this.setState({ isVisible: visible, rejectedReason, reasonNum });
  };
  /**
   * handles the review and publish process
   */
  handleAdRejection = () => {
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
        source: "campaign_detail",
        source_action: "a_review_ad",
      }
    );
  };

  render() {
    const { review_status_reason, screenProps, selectedCampaign } = this.props;
    const { translate } = this.props.screenProps;
    let rejReasons = review_status_reason.map((reason, i) => {
      return (
        <RejectedReason
          screenProps={screenProps}
          key={Object.keys(reason)[0]}
          reason={Object.keys(reason)[0]}
          index={i + 1}
          // setModalVisible={this.setModalVisible}
        />
      );
    });
    return (
      <View style={styles.rejectedOuterView}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#0005",
            borderRadius: 35,
            paddingBottom: 20,
          }}
        >
          <View style={styles.adRejetcedHeader}>
            <Rejected width={20} height={20} />
            <Text uppercase style={styles.adRejectedTitle}>
              {translate("Ad Rejected")}
            </Text>
          </View>
          <Text style={[styles.hereReasonsText]}>
            {rejReasons.length === 1
              ? `There is ${rejReasons.length} reason for this:`
              : `There are ${rejReasons.length} reasons for this:`}
          </Text>
          {rejReasons}
          {/* <TouchableOpacity
              style={styles.rejectedInfoButton}
              onPress={() => this.setModalVisible(true, review_status_reason)}
            >
              <Info />
            </TouchableOpacity> */}
          <CustomButtons
            screenProps={this.props.screenProps}
            onPressFunction={() =>
              this.setModalVisible(true, review_status_reason)
            }
            content="Fix Now"
            filled
            buttonStyle={[styles.customButtonStyle, styles.moveToWalletButton]}
            textStyle={[styles.customButtonText]}
          />
        </View>

        <RejectedReasonModal
          screenProps={screenProps}
          isVisible={this.state.isVisible}
          setModalVisible={this.setModalVisible}
          reasonNum={this.state.reasonNum}
          rejectedReason={this.state.rejectedReason}
          handleSnapchatRejection={this.handleAdRejection}
          selectedCampaign={selectedCampaign}
          navigation={this.props.navigation}
          getWalletAmountInKwd={this.props.getWalletAmountInKwd}
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
  getWalletAmountInKwd: (amount) =>
    dispatch(actionCreators.getWalletAmountInKwd(amount)),
});

export default connect(null, mapDispatchToProps)(RejectedSnapchatInfo);
