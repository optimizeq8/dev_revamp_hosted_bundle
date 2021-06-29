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
  /**
   * handles the review and publish process
   */
  handleSnapchatRejection = () => {
    let {
      selectedCampaign,
      setRejectedAdType,
      setRejectedCampaignData,
      navigation,
    } = this.props;
    setRejectedAdType(selectedCampaign.campaign_type);
    let savedObjective =
      selectedCampaign.destination === "REMOTE_WEBPAGE" ||
      (selectedCampaign.destination === "COLLECTION" &&
        !selectedCampaign.attachment.hasOwnProperty("deep_link_uri"))
        ? "WEBSITE_TRAFFIC"
        : selectedCampaign.destination === "DEEP_LINK"
        ? "APP_TRAFFIC"
        : selectedCampaign.objective;
    setRejectedCampaignData({ ...selectedCampaign, savedObjective });
    navigation.navigate("AdDesign", {
      rejected: true,
      editInReview: false,
    });
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
                paddingHorizontal: 20,
                paddingTop: 20,
              }}
            >
              <Rejected width={20} height={20} />
              <Text uppercase style={styles.adRejectedTitle}>
                {translate("Ad Rejected")}
              </Text>
            </View>
            <Text style={[styles.hereReasonsText]}>
              {`There are ${rejReasons.length} reasons for this:`}
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
              buttonStyle={[
                styles.customButtonStyle,
                styles.moveToWalletButton,
              ]}
              textStyle={[styles.customButtonText]}
            />
          </ScrollView>
        </View>
        <RejectedReasonModal
          screenProps={screenProps}
          isVisible={this.state.isVisible}
          setModalVisible={this.setModalVisible}
          reasonNum={this.state.reasonNum}
          rejectedReason={this.state.rejectedReason}
          handleSnapchatRejection={this.handleSnapchatRejection}
          selectedCampaign={selectedCampaign}
          navigation={this.props.navigation}
          getWalletAmountInKwd={this.props.getWalletAmountInKwd}
          mainBusiness={this.props.mainBusiness}
          updateCampaignBrandName={this.props.updateCampaignBrandName}
          updateBrandNameLoading={this.props.updateBrandNameLoading}
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
  getWalletAmountInKwd: (amount) =>
    dispatch(actionCreators.getWalletAmountInKwd(amount)),
  updateCampaignBrandName: (campaign_id, navigation, setModalVisible) =>
    dispatch(
      actionCreators.updateCampaignBrandName(
        campaign_id,
        navigation,
        setModalVisible
      )
    ),
});

const mapStateToProps = (state) => ({
  updateBrandNameLoading: state.campaignC.updateBrandNameLoading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectedSnapchatInfo);
