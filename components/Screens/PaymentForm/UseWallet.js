import React, { Component } from "react";
import { Text, View, Modal, Platform } from "react-native";
import { BlurView } from "expo";
import WalletIcon from "../../../assets/SVGs/Wallet";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import styles from "./styles";
import GlobalStyles from "../../../Global Styles";
import { Button } from "native-base";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
    await this.props.useWallet(this.props.campaign_id);
    // this.props.setShowWalletModal(true);
    // this.setState({
    //   showModal: true
    // });
  };

  render() {
    return (
      <View style={[styles.walletPaymentModalContainer]}>
        <WalletIcon
          width={heightPercentageToDP(10)}
          height={heightPercentageToDP(10)}
        />
        <Text style={styles.text}>Wallet Balance</Text>
        <Text style={[GlobalStyles.numbers, styles.walltetAmountText]}>
          {this.props.walletUsed
            ? this.props.wallet_balance_amount
            : this.props.wallet}
          <Text style={styles.text}>$</Text>
        </Text>
        <Text style={styles.errortext}>
          Use your wallet to activate your Ad
        </Text>
        {/* {this.props.wallet > 0 && (
          <Button
            full
            style={styles.walletButton}
            onPress={() => this._handleWallet()}
          >
            <Text style={styles.buttontext}>Use Wallet</Text>
          </Button>
        )} */}
        {this.props.walletUsed && (
          <Button
            full
            style={styles.walletButton}
            onPress={() => this._handleRemoveAmount()}
          >
            <Text style={styles.buttontext}>Remove Wallet Amount</Text>
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
          visible={this.props.showWalletModal}
        >
          <BlurView tint="dark" intensity={100} style={styles.BlurView}>
            <View style={styles.walletPaymentModalContainer}>
              {this.props.loading ? (
                <LoadingScreen top={50} />
              ) : (
                <>
                  <WalletIcon width={80} height={80} />
                  <Text style={[styles.walletInfo, styles.useWalletText]}>
                    Use Wallet
                  </Text>
                  <Text style={styles.walletInfo}>
                    Amout taken from wallet: {this.props.wallet_amount_applied}
                  </Text>
                  <Text style={styles.walletInfo}>
                    New Wallet Balance: {this.props.wallet_balance_amount}
                  </Text>
                  <Text style={styles.walletInfo}>
                    New Budget Total: {this.props.campaign_balance_amount}
                  </Text>
                  <Button
                    onPress={() => this._handleConfirm()}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>Confirm</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      this._handleRemoveAmount();
                      this.props.setShowWalletModal(false);
                    }}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>Cancel</Text>
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
  campaign_id: state.campaignC.campaign_id
});

const mapDispatchToProps = dispatch => ({
  useWallet: info => dispatch(actionCreators.useWallet(info)),
  removeWalletAmount: info => dispatch(actionCreators.removeWalletAmount(info)),
  checkoutwithWallet: info => dispatch(actionCreators.checkoutwithWallet(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseWallet);
