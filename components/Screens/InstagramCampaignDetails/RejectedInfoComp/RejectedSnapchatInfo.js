import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "native-base";
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
      setRejectedAdType,
      setRejectedCampaignData,
      navigation
    } = this.props;
    setRejectedAdType(selectedCampaign.campaign_type);
    setRejectedCampaignData(selectedCampaign);
    navigation.navigate(
      selectedCampaign.campaign_type === "StoryAd" ? "AdCover" : "AdDesign",
      {
        rejected: true
      }
    );
  };

  render() {
    const { review_status_reason, screenProps } = this.props;

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
const mapDispatchToProps = dispatch => ({
  setRejectedAdType: info => dispatch(actionCreators.setRejectedAdType(info)),
  setRejectedCampaignData: rejCampaign =>
    dispatch(actionCreators.setRejectedCampaignData(rejCampaign))
});

export default connect(null, mapDispatchToProps)(RejectedSnapchatInfo);