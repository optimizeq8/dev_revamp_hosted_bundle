import React, { Component } from "react";
import { Text, View, Modal, Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";
import WalletIcon from "../../../assets/SVGs/Wallet";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import styles from "./styles";
import GlobalStyles from "../../../GlobalStyles";
import GradientButton from "../../MiniComponents/GradientButton";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import { heightPercentageToDP } from "react-native-responsive-screen";
import formatNumber from "../../formatNumber";
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
      this.props.checkoutwithWallet(this.props.campaign_id);
    } else {
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
            ? formatNumber(this.props.wallet_balance_amount, true)
            : formatNumber(this.props.wallet, true)}
          <Text style={styles.text}>$</Text>
        </Text>
        <Text style={styles.errortext}>
          {translate("Use your wallet to activate your Ad")}
        </Text>
        {this.props.walletUsed && (
          <GradientButton
            uppercase
            style={styles.walletButton}
            onPressAction={() => this._handleRemoveAmount()}
            text={translate("Remove Wallet Amount")}
            textStyle={styles.buttontext}
          />
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
          <View style={styles.BlurView}>
            <BlurView
              blurType="dark"
              blurAmount={20}
              reducedTransparencyFallbackColor="black"
            >
              <View style={styles.walletPaymentModalContainer}>
                {this.props.loading ? (
                  <>
                    <Text style={styles.warningLoadmessage}>
                      {translate("Please wait a while")}
                    </Text>
                    <Text style={styles.warningLoadmessage}>
                      {translate("Your transaction is being completed")}
                    </Text>
                    <Text style={styles.warningLoadmessage}>
                      {translate("Do not close the App")}
                    </Text>
                    <LoadingScreen top={40} />
                  </>
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
                    <GradientButton
                      onPressAction={() => this._handleConfirm()}
                      style={styles.walletButton}
                      textStyle={styles.colorWhite}
                      text={translate("Confirm")}
                      uppercase={true}
                      radius={50}
                    />
                    <GradientButton
                      onPressAction={() => {
                        this._handleRemoveAmount();
                        this.props.setShowWalletModal(false);
                      }}
                      style={[styles.walletButton, styles.transaprentButton]}
                      textStyle={styles.colorWhite}
                      text={translate("Cancel")}
                      transparent={true}
                      uppercase={true}
                      radius={50}
                    />
                  </>
                )}
              </View>
            </BlurView>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet: state.transA.wallet,
  loading: state.transA.loading,
  wallet_amount_applied: state.transA.wallet_amount_applied,
  wallet_balance_amount: state.transA.wallet_balance_amount,
  campaign_balance_amount: state.transA.campaign_balance_amount,
  campaign_balance_amount_kwd: state.transA.campaign_balance_amount_kwd,
  walletUsed: state.transA.walletUsed,
  campaign_id: state.transA.campaign_id,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  useWallet: (info, setShowWalletModal) =>
    dispatch(actionCreators.useWallet(info, setShowWalletModal)),
  removeWalletAmount: (info) =>
    dispatch(actionCreators.removeWalletAmount(info)),
  checkoutwithWallet: (info) =>
    dispatch(actionCreators.checkoutwithWallet(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UseWallet);
