import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler,
  Linking,
} from "react-native";
import { Button, Text, Container, Content, Footer } from "native-base";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Modal, ActivityIndicator } from "react-native-paper";

import { BlurView } from "expo-blur";
import * as Segment from "expo-analytics-segment";
import * as WebBrowser from "expo-web-browser";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import UseWallet from "./UseWallet";
import formatNumber from "../../formatNumber";
import CustomHeader from "../../MiniComponents/Header";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import GradientButton from "../../MiniComponents/GradientButton";

//terms&conditions
import { openTerms } from "../../Terms&Conditions";

//icons
import WalletIcon from "../../../assets/SVGs/Wallet";
import BackDrop from "../../../assets/SVGs/BackDropIcon";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { showMessage } from "react-native-flash-message";
import segmentEventTrack from "../../segmentEventTrack";
import { AdjustEvent, Adjust } from "react-native-adjust";

class PaymentForm extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.showKnet = this.props.mainBusiness.country.toLowerCase() === "kuwait";
    this.state = {
      addingCredits: this.props.navigation.getParam("addingCredits", false),
      amount: this.props.navigation.getParam("amount", 0),
      payment_type: 1,
      choice: this.showKnet ? 2 : 3,
      showModal: false,
      browserLoading: false,
      showWalletModal: false,
      showRemoveWalletAmount: false,
    };
  }
  componentDidMount() {
    this.setState({
      browserLoading: false,
    });
    this.props.getWalletAmount();

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.addingCredits !== true &&
      this.props.navigation.getParam("addingCredits") === true
    ) {
      this.setState({
        addingCredits: this.props.navigation.getParam("addingCredits", true),
        amount: this.props.navigation.getParam("amount", 0),
        browserLoading: false,
      });
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    if (this.state.browserLoading) return true;
    else if (
      !this.props.loading &&
      !this.state.browserLoading &&
      this.state.addingCredits
    ) {
      //   this.props.navigation.navigate("Wallet");
      this.props.navigation.goBack();
      return true;
    } else if (this.props.walletUsed) {
      this.showRemoveAmountModal();
      return true;
    } else {
      this.reviewPurchase();
      return true;
    }
    //   this.reviewPurchase();
  };
  showRemoveAmountModal = () => {
    this.setState(
      {
        showRemoveWalletAmount: !this.state.showRemoveWalletAmount,
      },
      () => {
        if (this.state.showRemoveWalletAmount) {
          Segment.screen("Remove Wallet Amount");
        }
      }
    );
  };
  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      analytics.track(`payment_processing`, {
        source: "payment_mode",
        source_action: "a_payment_processing",
        amount: this.props.navigation.getParam("amount", 0),
        mode_of_payment: this.state.choice === 2 ? "KNET" : "CREDIT CARD",
        campaign_id: this.props.campaign_id,
      });
      if (this.state.choice === 2) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.knet_payment_url
            : this.props.payment_data.knet_payment_url,
          title: "Knet Payment",
          source: "payment_processing",
          source_action: "a_payment_processing",
        });
        // await WebBrowser.openBrowserAsync(
        //   this.state.addingCredits
        //     ? this.props.payment_data_wallet.knet_payment_url
        //     : this.props.payment_data.knet_payment_url
        // ).then(action => {
        //   if (action.type === "cancel")
        //     this.setState({
        //       browserLoading: false
        //     });
        // });
        Segment.screenWithProperties("Knet Payment", {
          businessname: this.props.mainBusiness.businessname,
          campaign_id: this.props.campaign_id,
        });
      }
      if (this.state.choice === 3) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.cc_payment_url
            : this.props.payment_data.cc_payment_url,
          title: "Credit Card Payment",
          source: "payment_processing",
          source_action: "a_payment_processing",
        });
        // await WebBrowser.openBrowserAsync(
        //   this.state.addingCredits
        //     ? this.props.payment_data_wallet.cc_payment_url
        //     : this.props.payment_data.cc_payment_url
        // ).then(action => {
        //   if (action.type === "cancel")
        //     this.setState({
        //       browserLoading: false
        //     });
        // });
        Segment.screenWithProperties("Credit Card Payment", {
          businessname: this.props.mainBusiness.businessname,
          campaign_id: this.props.campaign_id,
        });
      }
      this.closeBrowserLoading();
      this._removeLinkingListener();
    } catch (error) {
      analytics.track(`payment_processing`, {
        source: "payment_mode",
        source_action: "a_payment_processing",
        mode_of_payment: this.state.choice === 2 ? "KNET" : "CREDIT CARD",
        action_status: "failure",
        error_description: "Something went wrong",
        campaign_id: this.props.campaign_id,
      });

      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: "Please try again later.",
      });
      this.setState({
        browserLoading: false,
      });
    }
  };
  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };

  _handleRedirect = (event) => {
    WebBrowser.dismissBrowser();
    // this.setState({
    //   browserLoading: false
    // });
    let data = Linking.parse(event.url);

    // this.setState({ redirectData: data });
  };

  _changeToKnet = () => {
    this.setState({ choice: 2 });
  };

  _handleSubmission = () => {
    if (this.state.choice === 1) {
      if (this.props.wallet && this.props.wallet !== "0")
        this.setState({
          showWalletModal: true,
        });
      else {
        showMessage({ message: "No ammount in wallet", type: "warning" });
      }
    } else {
      this.setState({ browserLoading: true });
      if (this.state.browserLoading) return;
      if (this.state.addingCredits) {
        this.props.addWalletAmount(
          {
            amount: this.state.amount,
            payment_type: this.state.payment_type,
          },
          this._openWebBrowserAsync,
          this.state.choice === 2 ? "KNET" : "CREDIT CARD"
        );
      } else if (this.state.choice === 2) {
        Segment.trackWithProperties("Completed Checkout Step", {
          step: 6,
          business_name: this.props.mainBusiness.businessname,
          checkout_id: this.props.campaign_id,
          paymentMethod: "KNET",
        });
        this.props.payment_request_knet(
          this.props.campaign_id,
          this._openWebBrowserAsync,
          this.props.navigation,
          this.closeBrowserLoading
        );
      } else if (this.state.choice === 3) {
        Segment.trackWithProperties("Completed Checkout Step", {
          step: 6,
          business_name: this.props.mainBusiness.businessname,
          checkout_id: this.props.campaign_id,
          paymentMethod: "CREDIT CARD",
        });
        this.props.payment_request_credit_card(
          this.props.campaign_id,
          this._openWebBrowserAsync,
          this.props.navigation,
          this.closeBrowserLoading
        );
      }
    }
  };

  showModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  removeWalletAmountAndGoBack = () => {
    analytics.track(`a_remove_wallet_amount`, {
      source: "payment_mode",
      source_action: "a_remove_wallet_amount",
      campaign_id: this.props.campaign_id,
    });
    if (this.props.walletUsed) {
      this.props.removeWalletAmount(
        this.props.campaign_id,
        this.props.navigation,
        this.props.navigation.getParam("names", []),
        true
      );
    }
    if (!this.props.loading) {
      this.props.navigation.setParams({
        names: this.props.navigation.getParam("names", []),
      });
    }
    this.props.navigation.goBack();
    return true;
  };
  reviewPurchase = () => {
    if (this.props.walletUsed) {
      this.showRemoveAmountModal();
      //   this.props.removeWalletAmount(
      //     this.props.campaign_id,
      //     this.props.navigation,
      //     this.props.navigation.getParam("names", []),
      //     true
      //   );
    } else {
      if (!this.props.loading) {
        this.props.navigation.setParams({
          names: this.props.navigation.getParam("names", []),
        });
      }
      this.props.navigation.goBack();
      return true;
    }
  };

  _handleChoice = (choice) => {
    analytics.track(`a_select_payment_mode`, {
      source: "payment_mode",
      source_action: "a_select_payment_mode",
      payment_mode_type:
        choice === 1 ? "WALLET" : choice === 2 ? "KNET" : "CREDIT CARD",
    });
    this.setState({
      choice,
      payment_type: choice === 3 ? 2 : 1,
    });
  };
  _handleAgencyFee = () => {
    if (this.props.campaign_budget < 3000) {
      return this.props.campaign_budget * 0.15;
    } else if (this.props.campaign_budget < 10000) {
      return this.props.campaign_budget * 0.1;
    } else {
      return this.props.campaign_budget * 0.05;
    }
  };
  closeBrowserLoading = () => {
    this.setState({ browserLoading: false });
  };

  setShowWalletModal = (value) => {
    if (value) {
      Segment.screen("Payment through WALLET");
    }
    this.setState({
      showWalletModal: value,
    });
  };

  handlePaymentFormFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    const campaign_channel = this.props.navigation.getParam(
      "campaign_channel",
      this.props.screenProps.prevAppState
    );
    const campaign_ad_type = this.props.navigation.getParam(
      "campaign_ad_type",
      ""
    );

    if (this.state.addingCredits) {
      const amount = this.props.navigation.getParam(`amount`, 0);
      analytics.track(`payment_mode`, {
        source,
        source_action,
        top_up_amount: amount,
      });
      // Segment.screenWithProperties("Payment Selection", {
      //   category: "Wallet Top Up"
      // });
    } else {
      analytics.track(`payment_mode`, {
        source,
        source_action,
        campaign_id: this.props.campaign_id,
        campaign_ad_type,
        campaign_channel: this.state.addingCredits
          ? "wallet_top_up"
          : campaign_channel,
        campaign_budget: this.props.campaign_budget,
      });
      // Segment.screenWithProperties("Payment Selection", {
      //   businessname: this.props.mainBusiness.businessname,
      //   campaign_id: this.props.campaign_id,
      //   category: "Campaign Creation"
      // });
      // Segment.trackWithProperties("Viewed Checkout Step", {
      //   step: 6,
      //   business_name: this.props.mainBusiness.businessname,
      //   checkout_id: this.props.campaign_id
      // });
    }
    if (this.state.addingCredits) {
      // let adjustWalletPaymentFormTracker = new AdjustEvent("x8ckdv");
      // adjustWalletPaymentFormTracker.addPartnerParameter(
      //   this.props.channel === "google"
      //     ? `Google_SEM`
      //     : `Snap_${this.props.adType}`,
      //   this.props.channel === "google" ? "google_sem" : this.props.adType
      // );
      // adjustWalletPaymentFormTracker.setRevenue(this.state.amount, "USD");
      // Adjust.trackEvent(adjustWalletPaymentFormTracker);
    } else {
      // let adjustPaymentFormTracker = new AdjustEvent("gmds3l");
      // adjustPaymentFormTracker.addPartnerParameter(
      //   this.props.channel === "google"
      //     ? `Google_SEM`
      //     : `Snap_${this.props.adType}`,
      //   this.props.channel === "google" ? "google_sem" : this.props.adType
      // );
      // adjustPaymentFormTracker.setRevenue(
      //   this.props.campaign_budget && this.props.campaign_budget,
      //   "USD"
      // );
      // Adjust.trackEvent(adjustPaymentFormTracker);
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.handlePaymentFormFocus} />

        <Container style={[styles.container]}>
          {/* <BackDrop style={styles.backDrop} /> */}
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Payment Method Screen Back Button",
              obj: { businessname: this.props.mainBusiness.businessname },
            }}
            // navigation={this.props.navigation}
            actionButton={this.reviewPurchase}
            // paymentForm={true}
            title={this.state.addingCredits ? "Top up wallet" : "Payment"}
          />
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={styles.contentStyle}
          >
            <View style={styles.buttonGroupBlock}>
              {!this.state.addingCredits && (
                <GradientButton
                  radius={35}
                  transparent={this.state.choice !== 1}
                  style={[styles.whitebutton]}
                  textStyle={[
                    styles.whitebuttontext,
                    this.state.choice === 1 && globalStyles.whiteTextColor,
                  ]}
                  onPressAction={() => this._handleChoice(1)}
                  text={translate("Wallet")}
                  uppercase={true}
                />
              )}

              {this.showKnet && (
                <GradientButton
                  radius={35}
                  transparent={this.state.choice !== 2}
                  style={[styles.whitebutton2]}
                  textStyle={[
                    styles.whitebuttontext,
                    this.state.choice === 2 && globalStyles.whiteTextColor,
                  ]}
                  onPressAction={() => this._handleChoice(2)}
                  text={translate("KNET")}
                  uppercase={true}
                />
              )}
              <GradientButton
                transparent={this.state.choice !== 3}
                radius={35}
                style={[styles.whitebutton3]}
                textStyle={[
                  styles.whitebuttontext,
                  this.state.choice === 3 && globalStyles.whiteTextColor,
                ]}
                onPressAction={() => this._handleChoice(3)}
                text={translate("Credit Card")}
                uppercase={true}
              />
            </View>

            {this.state.choice === 1 && (
              <UseWallet
                showWalletModal={this.state.showWalletModal}
                setShowWalletModal={this.setShowWalletModal}
                _changeToKnet={this._changeToKnet}
                wallet={this.props.wallet}
                screenProps={this.props.screenProps}
              />
            )}
            {this.state.choice === 2 && (
              <View style={styles.knetContainer}>
                <Image
                  style={styles.media}
                  source={require("../../../assets/images/knet.png")}
                  resizeMode="contain"
                />
                <Text style={styles.errortext}>
                  {translate("You will be redirected to")}
                  {"\n"}
                  {translate("payment gateway for the")} {"\n"}
                  {translate("payment process")}
                </Text>
              </View>
            )}
            {this.state.choice === 3 && (
              <View style={styles.mastercardContainer}>
                <Image
                  style={[styles.media, styles.mastercardImage]}
                  source={require("../../../assets/images/mastercard.png")}
                  resizeMode="contain"
                />
                <Text style={styles.errortext}>
                  {translate("You will be redirected to")} {"\n"}
                  {translate("payment gateway for the")} {"\n"}
                  {translate("payment process")}
                </Text>
              </View>
            )}
          </Content>
          <View style={styles.curvedCard}>
            <Footer style={[styles.bottomCard]}>
              <View style={styles.bottomCardBlock1}>
                <View>
                  <View style={styles.dollarAmountContainer}>
                    <Text
                      style={[
                        styles.money,
                        styles.dollarAmountText,
                        styles.colorOrange,
                      ]}
                    >
                      ${/* {"\t "} */}
                    </Text>

                    <Text style={[styles.money, styles.colorOrange, {}]}>
                      {this.state.addingCredits
                        ? formatNumber(this.state.amount, true)
                        : this.props.walletUsed
                        ? formatNumber(this.props.campaign_balance_amount, true)
                        : this.props.campaign_budget &&
                          formatNumber(this.props.campaign_budget, true)}
                    </Text>
                  </View>
                  <View style={styles.kdAmountContainer}>
                    <Text style={[styles.money, styles.kdText]}>
                      KD {/* {"\t "} */}
                    </Text>
                    <Text style={[styles.money, styles.kdAmountText]}>
                      {this.state.addingCredits
                        ? this.props.walletAmountInKwd
                        : this.props.walletUsed
                        ? this.props.campaign_balance_amount_kwd
                        : this.props.navigation.getParam(
                            "kdamount",
                            this.props.campaign_budget_kdamount
                          )}
                    </Text>
                  </View>
                  {!this.state.addingCredits && (
                    <View style={styles.optimizeFeesTextContainer}>
                      <Text style={styles.optimizeFeesAmountText}>10%</Text>
                      <Text style={[styles.money, styles.optimizeFeesText]}>
                        {translate("Optimize App fees included")}
                      </Text>
                    </View>
                  )}
                </View>

                <GradientButton
                  onPressAction={this._handleSubmission}
                  style={[
                    styles.mainCard,
                    // { opacity: this.props.loadingTrans ? 0.5 : 1 }
                  ]}
                  disabled={this.props.loadingTrans}
                >
                  <View style={styles.flexBoxRow}>
                    <Text
                      uppercase={this.state.addingCredits}
                      style={styles.payNowText}
                    >
                      {this.state.addingCredits
                        ? translate("Top Up Now")
                        : translate("Pay Now")}
                    </Text>
                    {this.props.loadingTrans && (
                      <ActivityIndicator
                        color={globalColors.red}
                        style={{ right: 10, position: "absolute" }}
                      />
                    )}
                  </View>
                </GradientButton>
              </View>
              <View style={{ height: 40 }}></View>
            </Footer>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("WebView", {
                  url: "https://www.optimizeapp.com/terms_conditions",
                  title: "Terms & Conditions",
                  source: "payment_mode",
                  source_action: "a_open_app_TNC",
                })
              }
              disabled={this.state.choice === 1 && this.props.wallet === "0"}
              //   style={[styles.bottomCard]}
              style={styles.bottomCardBlock2}
            >
              <>
                <Text allowFontScaling={false} style={[styles.link]}>
                  {translate(`By tapping this button you  agree to the`)}
                </Text>
                <Text
                  allowFontScaling={false}
                  onPress={() => {
                    this.props.navigation.navigate("WebView", {
                      url: "https://www.optimizeapp.com/terms_conditions",
                      title: "Terms & Conditions",
                      source: "payment_mode",
                      source_action: "a_open_app_TNC",
                    });
                    // this.setState({ browserLoading: true });
                    // openTerms(this.closeBrowserLoading);
                  }}
                  style={[styles.link, styles.tNcText]}
                >
                  {translate("Terms & Conditions")}
                </Text>
              </>
            </TouchableOpacity>
          </View>
        </Container>
        <Modal
          animationType={"fade"}
          transparent={Platform.OS === "ios"}
          visible={!this.props.loading && this.state.showRemoveWalletAmount}
        >
          <BlurView tint="dark" intensity={100} style={styles.BlurView}>
            <View style={styles.walletPaymentModalContainer}>
              {this.props.loading ? (
                <LoadingScreen top={0} />
              ) : (
                <>
                  <WalletIcon width={80} height={80} />
                  <Text style={[styles.walletInfo, styles.reviewPurchaseText]}>
                    {translate("Review Purchase")}
                  </Text>

                  <Text style={styles.walletInfo}>
                    {translate(
                      "Are you sure you want to go back? This will reset your wallet"
                    )}
                  </Text>
                  <GradientButton
                    uppercase={true}
                    onPressAction={() => {
                      segmentEventTrack(
                        "Button clicked to CONFIRM remove wallet amount and go back to ad payment review screen"
                      );

                      this.removeWalletAmountAndGoBack();
                    }}
                    style={styles.walletButton}
                    text={translate("Confirm")}
                    textStyle={styles.colorWhite}
                  />

                  <GradientButton
                    uppercase={true}
                    transparent={true}
                    onPressAction={() => {
                      segmentEventTrack(
                        "Cancel Button clicked to close remove wallet amount modal"
                      );
                      this.showRemoveAmountModal();
                    }}
                    style={[styles.walletButton, styles.transaprentButton]}
                    text={translate("Cancel")}
                    textStyle={styles.colorWhite}
                  />
                </>
              )}
            </View>
          </BlurView>
        </Modal>
        <Modal dismissable={false} visible={this.state.browserLoading}>
          <LoadingScreen top={0} />
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  campaign_budget: state.transA.campaign_budget,
  mainBusiness: state.account.mainBusiness,
  campaign_id: state.transA.campaign_id,
  campaign_budget_kdamount: state.transA.campaign_budget_kdamount,
  payment_data: state.transA.campaign_payment_data,
  payment_data_wallet: state.transA.payment_data,
  wallet_amount_applied: state.transA.wallet_amount_applied,
  wallet_balance_amount: state.transA.wallet_balance_amount,
  campaign_balance_amount_kwd: state.transA.campaign_balance_amount_kwd,
  campaign_balance_amount: state.transA.campaign_balance_amount,
  walletUsed: state.transA.walletUsed,
  walletAmountInKwd: state.transA.walletAmountInKwd,
  loading: state.transA.loading_transaction,
  loadingTrans: state.transA.loading,
  wallet: state.transA.wallet,
  channel: state.transA.channel,
});
const mapDispatchToProps = (dispatch) => ({
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),

  payment_request_knet: (
    campaign_id,
    openBrowser,
    navigation,
    closeBrowserLoading
  ) =>
    dispatch(
      actionCreators.payment_request_knet(
        campaign_id,
        openBrowser,
        navigation,
        closeBrowserLoading
      )
    ),
  removeWalletAmount: (info, navigation, names, goBack) =>
    dispatch(
      actionCreators.removeWalletAmount(info, navigation, names, goBack)
    ),
  addWalletAmount: (info, openBrowser, payment_mode) =>
    dispatch(actionCreators.addWalletAmount(info, openBrowser, payment_mode)),
  payment_request_credit_card: (
    campaign_id,
    openBrowser,
    navigation,
    closeBrowserLoading
  ) =>
    dispatch(
      actionCreators.payment_request_credit_card(
        campaign_id,
        openBrowser,
        navigation,
        closeBrowserLoading
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
