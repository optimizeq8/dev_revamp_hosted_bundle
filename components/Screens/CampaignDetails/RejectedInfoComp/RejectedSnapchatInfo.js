import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";

// Redux
import * as actionCreators from "../../../../store/actions";

// Icons
import Rejected from "../../../../assets/SVGs/Rejected.svg";
import Info from "../../../../assets/SVGs/Info.svg";

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
  state = { isVisible: false, rejectedReason: "", reasonNum: "" };
  setModalVisible = (visible, rejectedReason = "", reasonNum = "") => {
    this.setState({ isVisible: visible, rejectedReason, reasonNum });
  };

  render() {
    const { review_status_reason, screenProps, selectedCampaign } = this.props;

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

        {selectedCampaign.campaign_end === "0" && (
          <View style={styles.rejectedButtonView}>
            <CustomButtons
              screenProps={this.props.screenProps}
              onPressFunction={() =>
                this.props.handleSnapchatRejection(selectedCampaign)
              }
              content="Move Amount to Wallet"
              buttonStyle={[
                styles.customButtonStyle,
                styles.moveToWalletButton,
              ]}
              textStyle={[styles.customButtonText]}
            />

            <CustomButtons
              screenProps={this.props.screenProps}
              onPressFunction={() =>
                this.props.handleSnapchatRejection(selectedCampaign)
              }
              content="Update Ad"
              filled
              buttonStyle={styles.customButtonStyle}
              textStyle={styles.customButtonText}
            />
          </View>
        )}
        {selectedCampaign.campaign_end === "0" && (
          <View style={styles.warningView}>
            <Info width={20} />
            <Text style={styles.moveToWalletWarning}>
              Once the amount is moved back to wallet you will not be able to
              re-launch this campaign again
            </Text>
          </View>
        )}
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
  setRejectedAdType: (info) => dispatch(actionCreators.setRejectedAdType(info)),
  setRejectedCampaignData: (rejCampaign) =>
    dispatch(actionCreators.setRejectedCampaignData(rejCampaign)),
});

export default connect(null, mapDispatchToProps)(RejectedSnapchatInfo);
