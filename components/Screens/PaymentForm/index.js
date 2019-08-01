import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler
} from "react-native";
import { Button, Text, Container, Content, Footer } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Modal } from "react-native-paper";
import { Linking } from "expo";

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

//terms&conditions
import { openTerms } from "../../Terms&Condtions";

//icons
import WalletIcon from "../../../assets/SVGs/Wallet";
import BackDrop from "../../../assets/SVGs/BackDropIcon";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { showMessage } from "react-native-flash-message";

class PaymentForm extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      addingCredits: this.props.navigation.getParam("addingCredits", false),
      amount: this.props.navigation.getParam("amount", 0),
      payment_type: 1,
      choice: 2,
      showModal: false,
      browserLoading: false,
      showWalletModal: false,
      showRemoveWalletAmount: false
    };
  }
  componentDidMount() {
    this.setState({
      browserLoading: false
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
        browserLoading: false
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
    this.setState({
      showRemoveWalletAmount: !this.state.showRemoveWalletAmount
    });
  };
  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      if (this.state.choice === 2) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.knet_payment_url
            : this.props.payment_data.knet_payment_url,
          title: "Knet Payment"
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
          campaign_id: this.props.campaign_id
        });
      }
      if (this.state.choice === 3) {
        this.props.navigation.navigate("WebView", {
          url: this.state.addingCredits
            ? this.props.payment_data_wallet.cc_payment_url
            : this.props.payment_data.cc_payment_url,
          title: "Credit Card Payment"
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
          campaign_id: this.props.campaign_id
        });
      }
      this.closeBrowserLoading();
      this._removeLinkingListener();
    } catch (error) {
      console.log(error);

      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: "Please try again later."
      });
      this.setState({
        browserLoading: false
      });
    }
  };
  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };

  _handleRedirect = event => {
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
      this.setState({
        showWalletModal: true
      });
    } else {
      this.setState({ browserLoading: true });
      if (this.state.browserLoading) return;
      if (this.state.addingCredits) {
        this.props.addWalletAmount(
          {
            amount: this.state.amount,
            payment_type: this.state.payment_type
          },
          this._openWebBrowserAsync
        );
      } else if (this.state.choice === 2) {
        Segment.trackWithProperties("Completed Checkout Step", {
          step: 6,
          business_name: this.props.mainBusiness.businessname,
          checkout_id: this.props.campaign_id,
          paymentMethod: "KNET"
        });
        this.props.payment_request_knet(
          this.props.campaign_id,
          this._openWebBrowserAsync,
          this.props.navigation
        );
      } else if (this.state.choice === 3) {
        Segment.trackWithProperties("Completed Checkout Step", {
          step: 6,
          business_name: this.props.mainBusiness.businessname,
          checkout_id: this.props.campaign_id,
          paymentMethod: "CREDIT CARD"
        });
        this.props.payment_request_credit_card(
          this.props.campaign_id,
          this._openWebBrowserAsync,
          this.props.navigation
        );
      }
    }
  };

  showModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  removeWalletAmountAndGoBack = () => {
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
        names: this.props.navigation.getParam("names", [])
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
          names: this.props.navigation.getParam("names", [])
        });
      }
      this.props.navigation.goBack();
      return true;
    }
  };

  _handleChoice = choice => {
    this.setState({
      choice,
      payment_type: choice === 3 ? 2 : 1
    });
  };
  _handleAgencyFee = () => {
    if (this.props.data.lifetime_budget_micro < 3000) {
      return this.props.data.lifetime_budget_micro * 0.15;
    } else if (this.props.data.lifetime_budget_micro < 10000) {
      return this.props.data.lifetime_budget_micro * 0.1;
    } else {
      return this.props.data.lifetime_budget_micro * 0.05;
    }
  };
  closeBrowserLoading = () => {
    this.setState({ browserLoading: false });
  };

  setShowWalletModal = value => {
    this.setState({
      showWalletModal: value
    });
  };
  render() {
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            if (this.props.navigation.getParam("addingCredits") === true) {
              Segment.screenWithProperties("Payment Selection", {
                category: "Wallet Top Up"
              });
            } else {
              Segment.screenWithProperties("Payment Selection", {
                businessname: this.props.mainBusiness.businessname,
                campaign_id: this.props.campaign_id,
                category: "Campaign Creation"
              });
              Segment.trackWithProperties("Viewed Checkout Step", {
                step: 6,
                business_name: this.props.mainBusiness.businessname,
                checkout_id: this.props.campaign_id
              });
            }
          }}
        />

        <Container style={[styles.container]}>
          <BackDrop style={styles.backDrop} />
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Payment Method Screen Back Button",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            // navigation={this.props.navigation}
            actionButton={this.reviewPurchase}
            // paymentForm={true}
            title="Payment"
          />
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={styles.contentStyle}
          >
            <View style={styles.buttonGroupBlock}>
              {!this.state.addingCredits && (
                <Button
                  style={[
                    styles.whitebutton,
                    this.state.choice === 1
                      ? globalStyles.orangeBackgroundColor
                      : globalStyles.whiteBackgroundColor
                  ]}
                  onPress={() => this._handleChoice(1)}
                >
                  <Text
                    style={[
                      styles.whitebuttontext,
                      this.state.choice === 1
                        ? globalStyles.whiteTextColor
                        : globalStyles.purpleTextColor
                    ]}
                  >
                    WALLET
                  </Text>
                </Button>
              )}

              <Button
                style={[
                  styles.whitebutton2,
                  this.state.choice === 2
                    ? globalStyles.orangeBackgroundColor
                    : globalStyles.whiteBackgroundColor,
                  {
                    borderTopStartRadius: this.state.addingCredits ? 15 : 0,
                    borderBottomStartRadius: this.state.addingCredits ? 15 : 0
                  }
                ]}
                onPress={() => this._handleChoice(2)}
              >
                <Text
                  style={[
                    styles.whitebuttontext,
                    this.state.choice === 2
                      ? globalStyles.whiteTextColor
                      : globalStyles.purpleTextColor
                  ]}
                >
                  KNET
                </Text>
              </Button>
              <Button
                style={[
                  styles.whitebutton3,
                  this.state.choice === 3
                    ? globalStyles.orangeBackgroundColor
                    : globalStyles.whiteBackgroundColor
                ]}
                onPress={() => this._handleChoice(3)}
              >
                <Text
                  style={[
                    styles.whitebuttontext,
                    this.state.choice === 3
                      ? globalStyles.whiteTextColor
                      : globalStyles.purpleTextColor
                  ]}
                >
                  CREDIT CARD
                </Text>
              </Button>
            </View>

            {this.state.choice === 1 && (
              <UseWallet
                showWalletModal={this.state.showWalletModal}
                setShowWalletModal={this.setShowWalletModal}
                _changeToKnet={this._changeToKnet}
                wallet={this.props.wallet}
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
                  You will be redirected to{" "}
                  <Text style={[styles.errortext, styles.errorTextKNET]}>
                    KNET’s
                  </Text>{" "}
                  {"\n"}
                  payment gateway for the {"\n"}
                  payment process
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
                  You will be redirected to a {"\n"}
                  payment gateway for the {"\n"}
                  payment process
                </Text>
              </View>
            )}
          </Content>
          <Footer style={[styles.bottomCard]}>
            <View style={styles.bottomCardBlock1}>
              <View>
                <View style={styles.dollarAmountContainer}>
                  <Text style={[styles.money, styles.dollarAmountText]}>
                    ${/* {"\t "} */}
                  </Text>

                  <Text style={[styles.money, {}]}>
                    {this.state.addingCredits
                      ? formatNumber(this.state.amount, true)
                      : this.props.walletUsed
                      ? formatNumber(this.props.campaign_balance_amount, true)
                      : this.props.data &&
                        formatNumber(
                          this.props.data.campaignInfo.lifetime_budget_micro,
                          true
                        )}
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
                          this.props.kdamount
                        )}
                  </Text>
                </View>
                {!this.state.addingCredits && (
                  <View style={styles.optimizeFeesTextContainer}>
                    <Text style={styles.optimizeFeesAmountText}>10%</Text>
                    <Text style={[styles.money, styles.optimizeFeesText]}>
                      Optimize App fees included
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => this._handleSubmission()}
                style={[
                  styles.mainCard,
                  { opacity: this.props.loadingTrans ? 0.5 : 1 }
                ]}
                disabled={
                  (this.state.choice === 1 && this.props.wallet === "0") ||
                  this.props.loadingTrans
                }
              >
                {/*
              ----------For future maybe----------
              <Text style={styles.text}>Agency Fee</Text>
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text style={styles.text}>
                {2500 - this._handleAgencyFee()} $
              </Text>
              <Text style={styles.text}>{this._handleAgencyFee()} $</Text>
            </View> */}

                <Text style={styles.payNowText}>Pay now</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this._handleSubmission()}
              disabled={this.state.choice === 1 && this.props.wallet === "0"}
              //   style={[styles.bottomCard]}
              style={styles.bottomCardBlock2}
            >
              <>
                <Text allowFontScaling={false} style={[styles.link]}>
                  {`By tapping this button you  agree to the `}
                </Text>
                <Text
                  allowFontScaling={false}
                  onPress={() => {
                    this.setState({ browserLoading: true });
                    openTerms(this.closeBrowserLoading);
                  }}
                  style={[styles.link, styles.tNcText]}
                >
                  Terms & Conditions
                </Text>
              </>
            </TouchableOpacity>
          </Footer>
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
                    Review Purchase
                  </Text>

                  <Text style={styles.walletInfo}>
                    Are you sure you want to go back? This will reset your
                    wallet.
                  </Text>
                  <Button
                    onPress={() => this.removeWalletAmountAndGoBack()}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>Confirm</Text>
                  </Button>
                  <Button
                    onPress={() => this.showRemoveAmountModal()}
                    style={styles.walletButton}
                  >
                    <Text style={styles.colorWhite}>Cancel</Text>
                  </Button>
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

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  mainBusiness: state.account.mainBusiness,
  campaign_id: state.campaignC.campaign_id,
  kdamount: state.campaignC.kdamount,
  payment_data: state.campaignC.payment_data,
  payment_data_wallet: state.transA.payment_data,
  wallet_amount_applied: state.transA.wallet_amount_applied,
  wallet_balance_amount: state.transA.wallet_balance_amount,
  campaign_balance_amount_kwd: state.transA.campaign_balance_amount_kwd,
  campaign_balance_amount: state.transA.campaign_balance_amount,
  walletUsed: state.transA.walletUsed,
  walletAmountInKwd: state.transA.walletAmountInKwd,
  loading: state.campaignC.loading,
  loadingTrans: state.transA.loading,
  wallet: state.transA.wallet
});
const mapDispatchToProps = dispatch => ({
  getWalletAmount: () => dispatch(actionCreators.getWalletAmount()),

  payment_request_knet: (campaign_id, openBrowser, navigation) =>
    dispatch(
      actionCreators.payment_request_knet(campaign_id, openBrowser, navigation)
    ),
  removeWalletAmount: (info, naviagtion, names, goBack) =>
    dispatch(
      actionCreators.removeWalletAmount(info, naviagtion, names, goBack)
    ),
  addWalletAmount: (info, openBrowser) =>
    dispatch(actionCreators.addWalletAmount(info, openBrowser)),
  payment_request_credit_card: (campaign_id, openBrowser, navigation) =>
    dispatch(
      actionCreators.payment_request_credit_card(
        campaign_id,
        openBrowser,
        navigation
      )
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
