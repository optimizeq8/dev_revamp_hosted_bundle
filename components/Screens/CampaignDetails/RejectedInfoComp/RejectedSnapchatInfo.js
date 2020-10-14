import React, { Component } from "react";
import { View, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
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
  state = { isVisible: false, rejectedReason: [], reasonNum: "" };
  setModalVisible = (visible, rejectedReason = [], reasonNum = "") => {
    this.setState({ isVisible: visible, rejectedReason, reasonNum });
  };
  moveAmountToWallet = () => {
    const { selectedCampaign } = this.props;
    const { translate } = this.props.screenProps;

    Alert.alert(
      translate("Warning"),
      translate(
        "Once the amount is moved back to wallet you will not be able to re-launch this campaign again"
      ) +
        ". " +
        translate("Are you sure you want to move amount to wallet?"),
      [
        { text: translate("Cancel") },
        {
          text: translate("Yes"),
          onPress: () => {
            this.props.moveRejectedAdAmountToWallet(
              selectedCampaign.campaign_id
            );
          },
        },
      ]
    );
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
        // setModalVisible={this.setModalVisible}
      />
    ));
    return (
      <View style={styles.rejectedOuterView}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <ScrollView
            contentContainerStyle={[
              styles.contentStyle,
              styles.rejectedReasonContainer,
            ]}
            nestedScrollEnabled={true}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Rejected width={20} height={20} />
              <Text uppercase style={styles.adRejectedTitle}>
                {translate("Ad Rejected")}
              </Text>
            </View>
            <Text style={styles.hereReasonsText}>
              {`There are ${rejReasons.length + 1} reasons for this:`}
            </Text>
            {rejReasons}
            <TouchableOpacity
              style={styles.rejectedInfoButton}
              onPress={() => this.setModalVisible(true, review_status_reason)}
            >
              <Info />
            </TouchableOpacity>
          </ScrollView>
        </View>
        {selectedCampaign.campaign_end === "0" && (
          <View style={styles.rejectedButtonView}>
            <CustomButtons
              screenProps={this.props.screenProps}
              onPressFunction={this.moveAmountToWallet}
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
  moveRejectedAdAmountToWallet: (campaign_id) =>
    dispatch(actionCreators.moveRejectedAdAmountToWallet(campaign_id)),
});

export default connect(null, mapDispatchToProps)(RejectedSnapchatInfo);
