import React, { Component } from "react";
import { Text, View, Modal, Platform } from "react-native";
import { BlurView } from "expo";
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import styles from "./styles";
import GlobalStyles from "../../../Global Styles";
import { Button } from "native-base";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import { heightPercentageToDP } from "react-native-responsive-screen";
class UseWallet extends Component {
  state = { showModal: false };

  _handleConfirm = () => {
    if (this.props.campaign_balance_amount === "0") {
      this.props.checkoutwithWallet(this.props.campaign_id);
    } else {
      this.props._changeToKnet();
    }
  };
  _handleRemoveAmount = () => {
    this.props.removeWalletAmount(this.props.campaign_id);
    this.setState({
      showModal: false
    });
  };
  _handleWallet = async () => {
    await this.props.useWallet(this.props.campaign_id);
    this.setState({
      showModal: true
    });
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          bottom: "10%"
        }}
      >
        <WalletIcon width={80} height={80} />
        <Text style={styles.text}>Wallet Balance</Text>
        <Text style={[GlobalStyles.numbers, { fontSize: 25 }]}>
          {this.props.walletUsed
            ? this.props.wallet_balance_amount
            : this.props.wallet}
          <Text style={styles.text}>$</Text>
        </Text>
        <Text style={styles.errortext}>
          Use your wallet to activate your Ad
        </Text>
        <Button
          full
          style={styles.walletButton}
          onPress={() => this._handleWallet()}
        >
          <Text style={styles.buttontext}>Use Wallet</Text>
        </Button>
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
          //   onRequestClose={() => this.setState({ showModal: false })}
          visible={!this.props.loading && this.state.showModal}
        >
          <BlurView tint="dark" intensity={100} style={styles.BlurView}>
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.props.loading ? (
                <LoadingScreen top={0} />
              ) : (
                <>
                  <WalletIcon width={80} height={80} />
                  <Text
                    style={[
                      styles.walletInfo,
                      { fontSize: 20, fontFamily: "montserrat-bold" }
                    ]}
                  >
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
                    <Text style={{ color: "#fff" }}>Confrim</Text>
                  </Button>
                  <Button
                    onPress={() => this._handleRemoveAmount()}
                    style={styles.walletButton}
                  >
                    <Text style={{ color: "#fff" }}>Cancel</Text>
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
