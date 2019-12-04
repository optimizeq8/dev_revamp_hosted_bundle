import React, { Component } from "react";
import { Text, View, Modal, Platform } from "react-native";
import * as Segment from "expo-analytics-segment";
import { BlurView } from "expo-blur";
import WalletIcon from "../../../assets/SVGs/Wallet";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import styles from "./styles";
import GlobalStyles from "../../../GlobalStyles";
import { Button } from "native-base";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import { heightPercentageToDP } from "react-native-responsive-screen";
import segmentEventTrack from "../../segmentEventTrack";
class UseWallet extends Component {
  //   state = { showModal: false };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.showWalletModal && this.props.showWalletModal) {
      this._handleWallet();
    }
  }
  _handleConfirm = () => {
    if (this.props.campaign_balance_amount === "0") {
      Segment.trackWithProperties("Completed Checkout Step", {
        step: 6,
        business_name: this.props.mainBusiness.businessname,
        checkout_id: this.props.campaign_id,
        paymentMethod: "WALLET"
      });
      this.props.checkoutwithWallet(this.props.campaign_id);
    } else {
      Segment.trackWithProperties("Pay remaining balance through KNET", {
        step: 6,
        business_name: this.props.mainBusiness.businessname,
        checkout_id: this.props.campaign_id,
        paymentMethod: "KNET"
      });
      this.props._changeToKnet();
    }
    this.props.setShowWalletModal(false);
  };
  _handleRemoveAmount = () => {
    this.props.removeWalletAmount(this.props.campaign_id);
    // this.props.setShowWalletModal(false);

    // this.setState({
    //   showModal: false
    // });
  };
  _handleWallet = async () => {
    await this.props.useWallet(
      this.props.campaign_id,
      this.props.setShowWalletModal
    );
    // this.props.setShowWalletModal(true);
    // this.setState({
    //   showModal: true
    // });
  };

  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={[styles.walletPaymentModalContainer]}>
        <WalletIcon
          width={heightPercentageToDP(10)}
          height={heightPercentageToDP(10)}
        />
        <Text style={styles.text}>{translate("Wallet Balance")}</Text>
        <Text style={[GlobalStyles.numbers, styles.walltetAmountText]}>
          {this.props.walletUsed
            ? this.props.wallet_balance_amount
            : this.props.wallet}
          <Text style={styles.text}>$</Text>
        </Text>
        <Text style={styles.errortext}>
          {translate("Use your wallet to activate your Ad")}
        </Text>
        {this.props.walletUsed && (
          <Button
            full
            style={styles.walletButton}
            onPress={() => this._handleRemoveAmount()}
          >
            <Text style={styles.buttontext}>
              {translate("Remove Wallet Amount")}
            </Text>
          </Button>
        )}
        {/* <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal> */}
        <Modal
          animationType={"fade"}
          transparent={Platform.OS === "ios"}
          //   onDismiss={() => this.setState({ showModal: false })}
          onRequestClose={() => this.props.setShowWalletModal(false)}
          visible={this.props.showWalletModal || this.props.loading}
        >
          <BlurView tint="dark" intensity={100} style={styles.BlurView}>
            <View style={styles.walletPaymentModalContainer}>
              {this.props.loading ? (
                <LoadingScreen top={50} />
              ) : (
                <>
                  <WalletIcon width={80} height={80} />
                  <Text style={[styles.walletInfo, styles.useWalletText]}>
                    {translate("Use Wallet")}
                  </Text>
                  <Text style={styles.walletInfo}>
                    {translate("Amount taken from wallet:")}{" "}
                    {this.props.wallet_amount_applied}
                  </Text>
                  <Text style={styles.walletInfo}>
                    {translate("New Wallet Balance:")}{" "}
                    {this.props.wallet_balance_amount}
                  </Text>
                  <Text style={styles.walletInfo}>
                    {translate("New Budget Total:")}{" "}
                    {this.props.campaign_balance_amount}
                  </Text>
                  <Button
                    onPress={() => this._handleConfirm()}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>
                      {translate("Confirm")}
                    </Text>
                  </Button>
                  <Button
                    onPress={() => {
                      segmentEventTrack(
                        "Button Clicked to CANCEL payment throught wallet"
                      );
                      this._handleRemoveAmount();
                      this.props.setShowWalletModal(false);
                    }}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>{translate("Cancel")}</Text>
                  </Button>
                </>
              )}
            </View>
          </BlurView>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  wallet: state.transA.wallet,
  loading: state.transA.loading,
  wallet_amount_applied: state.transA.wallet_amount_applied,
  wallet_balance_amount: state.transA.wallet_balance_amount,
  campaign_balance_amount: state.transA.campaign_balance_amount,
  campaign_balance_amount_kwd: state.transA.campaign_balance_amount_kwd,
  walletUsed: state.transA.walletUsed,
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  useWallet: (info, setShowWalletModal) =>
    dispatch(actionCreators.useWallet(info, setShowWalletModal)),
  removeWalletAmount: info => dispatch(actionCreators.removeWalletAmount(info)),
  checkoutwithWallet: info => dispatch(actionCreators.checkoutwithWallet(info))
});
export default connect(mapStateToProps, mapDispatchToProps)(UseWallet);
