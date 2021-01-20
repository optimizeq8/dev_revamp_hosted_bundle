import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Container, Content, Footer } from "native-base";
import analytics from "@segment/analytics-react-native";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

import { Modal } from "react-native-paper";

import { BlurView } from "expo-blur";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import UseWallet from "./UseWallet";
import formatNumber from "../../formatNumber";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import GradientButton from "../../MiniComponents/GradientButton";

//icons
import WalletIcon from "../../../assets/SVGs/Wallet";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { showMessage } from "react-native-flash-message";
// import { AdjustEvent, Adjust } from "react-native-adjust";
import TopStepsHeader from "../../MiniComponents/TopStepsHeader";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
const screen = Dimensions.get("screen");

class PaymentForm extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.showKnet = this.props.mainBusiness.country.toLowerCase() === "kuwait";
    this.state = {
      addingCredits: this.props.navigation.getParam("addingCredits", false),
      refundAmountToWallet: this.props.navigation.getParam(
        "refundAmountToWallet",
        false
      ),
      selectedCampaign: this.props.navigation.getParam("selectedCampaign", {}),
      amount: this.props.navigation.getParam("amount", 0),
      payment_type: this.showKnet ? 1 : 3,
      choice: 2,
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
    let amount =
      this.props.navigation.getParam("addingCredits", false) ||
      this.props.navigation.getParam("refundAmountToWallet", false)
        ? this.props.navigation.getParam("amount", 0)
        : this.props.walletUsed
        ? this.props.campaign_balance_amount
        : this.props.campaign_budget && this.props.campaign_budget;
    // This is just to fetch the payment methods based on country
    this.props.getPaymentMethods(
      this.props.mainBusiness.country,
      this.props.mainBusiness.businessid,
      amount
    );
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
      if (
        prevState.refundAmountToWallet !== true &&
        this.props.navigation.getParam("refundAmountToWallet") === true
      ) {
        this.setState({
          refundAmountToWallet: this.props.navigation.getParam(
            "refundAmountToWallet",
            true
          ),
          amount: this.props.navigation.getParam("amount", 0),
          browserLoading: false,
        });
      }
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
      (this.state.addingCredits || this.state.refundAmountToWallet)
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
    this.setState({
      showRemoveWalletAmount: !this.state.showRemoveWalletAmount,
    });
  };
  _openWebBrowserAsync = async () => {
    try {
      analytics.track(`payment_processing`, {
        source: "payment_mode",
        source_action: "a_payment_processing",
        amount: this.props.navigation.getParam("amount", 0),
        // mode_of_payment: this.state.choice === 2 ? "KNET" : "CREDIT CARD",
        mode_of_payment: this.props.paymentMethods[this.state.choice - 2]
          .PaymentMethodEn,
        campaign_id: this.props.campaign_id,
      });
      if (
        this.props.paymentMethods[this.state.choice - 2].payment_type === "1"
      ) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.knet_payment_url
            : this.props.payment_data.knet_payment_url,
          title: "Knet Payment",
          source: "payment_processing",
          source_action: "a_payment_processing",
          backgroundColor: "transparent",
        });
      } else if (
        this.props.paymentMethods[this.state.choice - 2].payment_type === "3"
      ) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.mf_payment_url
            : this.props.payment_data.mf_payment_url,
          title: "Payment",
          source: "payment_processing",
          source_action: "a_payment_processing",
          backgroundColor: "#FFFFFF",
          marginTop: "-55%",
          showLogo: screen.height > 600,
          scrollEnabled: screen.height < 600,
          showCompanyName: true,
        });
      } else if (
        this.props.paymentMethods[this.state.choice - 2].payment_type === "2"
      ) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.cc_payment_url
            : this.props.payment_data.cc_payment_url,
          title: "Payment",
          source: "payment_processing",
          source_action: "a_payment_processing",
        });
      }
      this.closeBrowserLoading();
    } catch (error) {
      analytics.track(`payment_processing`, {
        source: "payment_mode",
        source_action: "a_payment_processing",
        // mode_of_payment: this.state.choice === 2 ? "KNET" : "CREDIT CARD",
        mode_of_payment: this.props.paymentMethods[this.state.choice - 2]
          .PaymentMethodEn,
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

  _changeToKnet = () => {
    this.setState({ choice: 2 });
  };

  _handleSubmission = () => {
    const channel = this.props.navigation.getParam("channel", "");
    if (channel === "instagram" && this.state.refundAmountToWallet) {
      this.props.moveRejectedAdAmountToWalletInstagram(
        this.state.selectedCampaign.campaign_id
      );
    } else if (this.state.refundAmountToWallet) {
      this.props.moveRejectedAdAmountToWallet(
        this.state.selectedCampaign.campaign_id
      );
    } else if (this.state.choice === 1) {
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
            payment_type: this.props.paymentMethods[this.state.choice - 2]
              .payment_type,
            PaymentMethodId: this.props.paymentMethods[this.state.choice - 2]
              .PaymentMethodId,
          },
          this._openWebBrowserAsync,
          this.props.paymentMethods[this.state.choice - 2].payment_type === 1
            ? "KNET"
            : "CREDIT CARD"
        );
      } else if (
        this.props.paymentMethods[this.state.choice - 2].payment_type === "1"
      ) {
        this.props.payment_request_knet(
          this.props.campaign_id,
          this._openWebBrowserAsync,
          this.props.navigation,
          this.closeBrowserLoading
        );
      } else if (
        this.props.paymentMethods[this.state.choice - 2].payment_type === "3"
      ) {
        this.props.payment_request_payment_method(
          this.props.campaign_id,
          this.props.paymentMethods[this.state.choice - 2].PaymentMethodId,
          this._openWebBrowserAsync,
          this.props.navigation,
          this.closeBrowserLoading
        );
      } else if (
        this.props.paymentMethods[this.state.choice - 2].payment_type === "2"
      ) {
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
        choice === 1
          ? "WALLET"
          : choice === 2 && this.showKnet
          ? "KNET"
          : choice === 2 && !this.showKnet
          ? "DEBIT CARD"
          : "CREDIT CARD",
    });
    this.setState({
      choice,
      payment_type: choice === 2 && this.showKnet ? 2 : 3, // Condition for KNET
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
    this.setState({
      showWalletModal: value,
    });
  };

  handlePaymentFormFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      "payment_processing"
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      "a_payment_processing"
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
  renderContent = () => {
    const { translate } = this.props.screenProps;
    if (this.state.refundAmountToWallet) {
      return (
        <Content
          padder
          scrollEnabled={false}
          contentContainerStyle={styles.contentStyle}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <WalletIcon width={80} height={80} />
            <Text
              style={{
                fontFamily: "montserrat-regular",
                color: "#fff",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {translate("You're requesting to refund to your wallet")}
            </Text>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                color: "#fff",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {translate(
                "Once the amount is moved back to wallet you will not be able to re-launch this campaign again"
              )}
            </Text>
          </View>
        </Content>
      );
    }
    return (
      <Content
        padder
        scrollEnabled={false}
        contentContainerStyle={styles.contentStyle}
      >
        <View style={styles.buttonGroupBlock}>
          {/* {!this.state.addingCredits && (
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
          )} */}
          {/* {this.props.paymentMethods &&
            this.props.paymentMethods.length > 0 &&
            this.props.paymentMethods.map((method, index) => (
              <GradientButton
                key={method.PaymentMethodEn}
                radius={35}
                transparent={this.state.choice !== index + 2}
                style={[styles.whitebutton2]}
                textStyle={[
                  styles.whitebuttontext,
                  this.state.choice === index + 2 &&
                    globalStyles.whiteTextColor,
                ]}
                onPressAction={() => this._handleChoice(index + 2)}
                text={translate(method.PaymentMethodEn)}
                uppercase={true}
              />
            ))} */}
          {/* {this.showKnet && (
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
          /> */}
        </View>
        {this.state.choice === 1 && (
          <UseWallet
            showWalletModal={this.state.showWalletModal}
            setShowWalletModal={this.setShowWalletModal}
            _changeToKnet={this._changeToKnet}
            wallet={this.props.wallet}
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
          />
        )}
        {this.state.choice !== 1 &&
          this.props.paymentMethods &&
          this.props.paymentMethods.length > 0 && (
            <View style={styles.knetContainer}>
              <Image
                style={styles.media}
                source={{
                  uri: this.props.paymentMethods[this.state.choice - 2]
                    .ImageUrl,
                }}
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

        <View>
          {this.props.paymentMethods &&
            this.props.paymentMethods.length > 0 &&
            this.props.paymentMethods.map((method, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this._handleChoice(index + 2)}
                style={styles.paymentMethodView}
              >
                <View>
                  <Text style={styles.paymentMethodText}>
                    {translate(method.PaymentMethodEn)}
                  </Text>
                  <Text style={styles.paymentMethodSubText}>
                    {translate("Pay with")} {translate(method.PaymentMethodEn)}
                  </Text>
                </View>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    backgroundColor: "rgba(0,0,0,0.26)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {this.state.choice === index + 2 && (
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 22,
                        backgroundColor: "#FF9D00",
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          {!this.state.addingCredits && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this._handleChoice(1)}
              style={{
                backgroundColor: "rgba(0,0,0,0.15)",
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 25,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "montserrat-bold",
                    color: "#FFF",
                  }}
                >
                  {translate("Wallet")}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "montserrat-regular",
                    color: "#FFF",
                  }}
                >
                  {translate("Pay with")} {translate("Wallet")}
                </Text>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: "rgba(0,0,0,0.26)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {this.state.choice === 1 && (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 22,
                      backgroundColor: "#FF9D00",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/* {this.state.choice === 3 && (
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
        )} */}
      </Content>
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    const campaign_channel = this.props.navigation.getParam(
      "campaign_channel",
      null
    );

    return (
      <View style={styles.safeAreaViewContainer}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <NavigationEvents onDidFocus={this.handlePaymentFormFocus} />

        <Container style={[styles.container]}>
          <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Payment Method Screen Back Button",
              obj: { businessname: this.props.mainBusiness.businessname },
              source: "payment_mode",
              source_action: "a_go_back",
            }}
            icon={campaign_channel}
            actionButton={this.handleBackButton}
            adType={
              this.props.channel === "" || this.props.channel === "snapchat"
                ? this.props.adType
                : null
            }
            currentScreen="Payment"
            onlyPayment={
              this.state.refundAmountToWallet || this.state.addingCredits
            }
            title={
              this.state.refundAmountToWallet
                ? "Refund to wallet"
                : this.state.addingCredits
                ? "Top up wallet"
                : "Payment"
            }
          />
          {this.renderContent()}

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
                      {this.state.addingCredits ||
                      this.state.refundAmountToWallet
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
                      {this.state.addingCredits ||
                      this.state.refundAmountToWallet
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
                  disabled={
                    this.props.loadingTrans || this.props.loadingPaymentMethods
                  }
                >
                  <View style={styles.flexBoxRow}>
                    <Text
                      uppercase={this.state.addingCredits}
                      style={styles.payNowText}
                    >
                      {this.state.refundAmountToWallet
                        ? translate("Refund Now")
                        : this.state.addingCredits
                        ? translate("Top Up Now")
                        : translate("Pay Now")}
                    </Text>
                    {(this.props.loadingTrans ||
                      this.props.loadingPaymentMethods) && (
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
        <Modal
          dismissable={false}
          visible={
            this.state.browserLoading ||
            this.props.movingAmountToWallet ||
            this.props.movingAmountToWalletInstagram
          }
        >
          <LoadingScreen top={0} />
        </Modal>
      </View>
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
  adType: state.campaignC.adType,
  movingAmountToWallet: state.campaignC.movingAmountToWallet,
  movingAmountToWalletInstagram: state.instagramAds.movingAmountToWallet,
  paymentMethods: state.transA.paymentMethods,
  loadingPaymentMethods: state.transA.loadingPaymentMethods,
});
const mapDispatchToProps = (dispatch) => ({
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),
  payment_request_payment_method: (
    campaign_id,
    PaymentMethodId,
    openBrowser,
    navigation,
    closeBrowserLoading
  ) =>
    dispatch(
      actionCreators.payment_request_payment_method(
        campaign_id,
        PaymentMethodId,
        openBrowser,
        navigation,
        closeBrowserLoading
      )
    ),
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
  moveRejectedAdAmountToWallet: (campaign_id) =>
    dispatch(actionCreators.moveRejectedAdAmountToWallet(campaign_id)),

  moveRejectedAdAmountToWalletInstagram: (campaign_id) =>
    dispatch(actionCreators.moveRejectedAdAmountToWalletInstagram(campaign_id)),
  getPaymentMethods: (businessCCountry, businessid, amount) =>
    dispatch(
      actionCreators.getPaymentMethods(businessCCountry, businessid, amount)
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
