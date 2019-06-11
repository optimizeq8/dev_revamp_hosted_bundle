import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler
} from "react-native";
import { Button, Text, Container, Content, Footer } from "native-base";
import { Modal } from "react-native-paper";
import { WebBrowser, Linking, Segment, BlurView } from "expo";
import UseWallet from "./UseWallet";
import BackDrop from "../../../assets/SVGs/BackDropIcon";
import formatNumber from "../../formatNumber";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../MiniComponents/Header";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

//terms&conditions
import { openTerms } from "../../Terms&Condtions";

//icons
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";

// Style
import styles from "./styles";
import { globalColors } from "../../../Global Styles";

//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

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
      showWalletModal: false
    };
  }
  componentDidMount() {
    Segment.screenWithProperties("Payment Form Screen", {
      businessname: this.props.mainBusiness.businessname,
      campaign_id: this.props.campaign_id
    });
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 6,
      business_name: this.props.mainBusiness.businessname,
      checkout_id: this.props.campaign_id
    });
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
    } else {
      this.props.walletUsed ? this.showModal() : this.reviewPurchase();
      //   this.reviewPurchase();
    }
  };
  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      if (this.state.choice === 2) {
        await WebBrowser.openBrowserAsync(
          this.state.addingCredits
            ? this.props.payment_data_wallet.knet_payment_url
            : this.props.payment_data.knet_payment_url
        ).then(action => {
          if (action.type === "cancel")
            this.setState({
              browserLoading: false
            });
        });
        Segment.screenWithProperties("Payment Knet Screen", {
          businessname: this.props.mainBusiness.businessname,
          campaign_id: this.props.campaign_id
        });
      }
      if (this.state.choice === 3) {
        await WebBrowser.openBrowserAsync(
          this.state.addingCredits
            ? this.props.payment_data_wallet.cc_payment_url
            : this.props.payment_data.cc_payment_url
        ).then(action => {
          if (action.type === "cancel")
            this.setState({
              browserLoading: false
            });
        });
        Segment.screenWithProperties("Payment CC Screen", {
          businessname: this.props.mainBusiness.businessname,
          campaign_id: this.props.campaign_id
        });
      }
      this.closeBrowserLoading();
      this._removeLinkingListener();
    } catch (error) {
      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: "Please try again later."
      });
      // console.log("broweser error", error);
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

  reviewPurchase = () => {
    console.log("walletUsed", this.props.walletUsed);
    if (this.props.walletUsed)
      this.props.removeWalletAmount(
        this.props.campaign_id,
        this.props.navigation,
        this.navState.names,
        true
      );

    if (!this.props.loading) {
      //   this.props.navigation.navigate("AdPaymentReview", {
      //     names: this.navState.names
      //   });
      this.props.navigation.setParams({
        names: this.props.navigation.getParam("names", [])
      });
    }
    this.props.navigation.goBack();
    return true;
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
        style={{ flex: 1, backgroundColor: "#0000" }}
        forceInset={{ bottom: "never" }}
      >
        <Container
          style={[styles.container, { backgroundColor: "transparent" }]}
        >
          <BackDrop style={styles.backDrop} />

          <CustomHeader
            closeButton={false}
            segment={{
              str: "Payment Method Screen Back Button",
              obj: { businessname: this.props.mainBusiness.businessname }
            }}
            navigation={this.props.navigation}
            title="Payment"
          />
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={{ flex: 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 40,
                marginTop: 20,
                alignSelf: "center"
              }}
            >
              {!this.state.addingCredits && (
                <Button
                  style={[
                    styles.whitebutton,
                    {
                      backgroundColor:
                        this.state.choice === 1 ? globalColors.orange : "#fff"
                    }
                  ]}
                  onPress={() => this._handleChoice(1)}
                >
                  <Text
                    style={[
                      styles.whitebuttontext,
                      {
                        color:
                          this.state.choice === 1 ? "#fff" : globalColors.purple
                      }
                    ]}
                  >
                    WALLET
                  </Text>
                </Button>
              )}

              <Button
                style={[
                  styles.whitebutton2,
                  {
                    borderTopStartRadius: this.state.addingCredits ? 15 : 0,
                    borderBottomStartRadius: this.state.addingCredits ? 15 : 0,
                    backgroundColor:
                      this.state.choice === 2 ? globalColors.orange : "#fff"
                  }
                ]}
                onPress={() => this._handleChoice(2)}
              >
                <Text
                  style={[
                    styles.whitebuttontext,
                    {
                      color:
                        this.state.choice === 2 ? "#fff" : globalColors.purple
                    }
                  ]}
                >
                  KNET
                </Text>
              </Button>
              <Button
                style={[
                  styles.whitebutton3,
                  {
                    backgroundColor:
                      this.state.choice === 3 ? globalColors.orange : "#fff"
                  }
                ]}
                onPress={() => this._handleChoice(3)}
              >
                <Text
                  style={[
                    styles.whitebuttontext,
                    {
                      color:
                        this.state.choice === 3 ? "#fff" : globalColors.purple
                    }
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
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/knet.png")}
                  resizeMode="contain"
                />
                <Text style={styles.errortext}>
                  You will be redirected to{" "}
                  <Text
                    style={[
                      styles.errortext,
                      { fontFamily: "montserrat-semibold" }
                    ]}
                  >
                    KNET’s
                  </Text>{" "}
                  {"\n"}
                  payment gateway for the {"\n"}
                  payment process
                </Text>
              </View>
            )}
            {this.state.choice === 3 && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={[styles.image, { width: 250 }]}
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
          <Footer
            style={[
              {
                borderTopWidth: 0,
                width: "100%",
                paddingHorizontal: 20
              },
              styles.bottomCard
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <View>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text style={[styles.money, { fontSize: 18 }]}>
                    ${/* {"\t "} */}
                  </Text>

                  <Text style={[styles.money, {}]}>
                    {this.state.addingCredits
                      ? formatNumber(this.state.amount, true)
                      : this.props.walletUsed
                      ? formatNumber(this.props.campaign_balance_amount, true)
                      : this.props.data &&
                        formatNumber(
                          this.props.data.lifetime_budget_micro,
                          true
                        )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 2
                  }}
                >
                  <Text
                    style={[
                      styles.money,
                      { fontSize: 14, fontFamily: "montserrat-regular" }
                    ]}
                  >
                    KD {/* {"\t "} */}
                  </Text>
                  <Text
                    style={[
                      styles.money,
                      { fontSize: 14, fontFamily: "montserrat-bold" }
                    ]}
                  >
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
                  <View style={{ flexDirection: "row", paddingTop: 3 }}>
                    <Text
                      style={[
                        styles.money,
                        {
                          fontSize: 12,
                          fontFamily: "montserrat-regular",
                          textAlign: "left"
                        }
                      ]}
                    >
                      Optimize App fees{"\n"}10% included
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => this._handleSubmission()}
                style={[styles.mainCard]}
                disabled={this.state.choice === 1 && this.props.wallet === "0"}
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

                <Text
                  style={{
                    color: "#FF9D00",
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "montserrat-bold"
                    //   paddingBottom: 3
                  }}
                >
                  Pay now
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this._handleSubmission()}
              disabled={this.state.choice === 1 && this.props.wallet === "0"}
              //   style={[styles.bottomCard]}
              style={{ width: "100%", paddingTop: 5 }}
            >
              <>
                <Text allowFontScaling={false} style={[styles.link]}>
                  {`By tapping this button you \n agree to the `}
                </Text>
                <Text
                  allowFontScaling={false}
                  onPress={() => {
                    this.setState({ browserLoading: true });
                    openTerms(this.closeBrowserLoading);
                  }}
                  style={[
                    styles.link,
                    {
                      textDecorationLine: "underline",
                      color: "#FFF",
                      fontFamily: "montserrat-bold"
                    }
                  ]}
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
                    Review Purchase
                  </Text>

                  <Text style={styles.walletInfo}>
                    Are you sure you want to go back? This will reset your
                    wallet.
                  </Text>
                  <Button
                    onPress={() => this.reviewPurchase()}
                    style={styles.walletButton}
                  >
                    <Text style={{ color: "#fff" }}>Confirm</Text>
                  </Button>
                  <Button
                    onPress={() => this.showModal()}
                    style={styles.walletButton}
                  >
                    <Text style={{ color: "#fff" }}>Cancel</Text>
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
