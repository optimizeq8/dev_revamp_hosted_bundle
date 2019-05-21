import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler
} from "react-native";
import { Card, Button, Text, Container } from "native-base";
import { Modal } from "react-native-paper";
import { LinearGradient, WebBrowser, Linking, Segment, BlurView } from "expo";
import UseWallet from "./UseWallet";
import BackDrop from "../../../assets/SVGs/BackDropIcon";
import NavigationService from "../../../NavigationService.js";
import formatNumber from "../../formatNumber";

//terms&conditions
import { openTerms } from "../../Terms&Condtions";

//icons
import WalletIcon from "../../../assets/SVGs/MenuIcons/Wallet";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import { globalColors } from "../../../Global Styles";

class PaymentForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    payment_type: 1,
    choice: 2,
    showModal: false,
    browserLoading: false
  };
  constructor(props) {
    super(props);
    this.navState = this.props.navigation.state.params;
    this.addingCredits = this.navState && this.navState.addingCredits;
    this.amount = this.navState && this.navState.amount;
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
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = async () => {
    if (this.state.browserLoading) return true;
    else if (
      !this.props.loading &&
      !this.state.browserLoading &&
      this.addingCredits
    ) {
      this.props.navigation.navigate("Wallet");
    } else {
      this.props.walletUsed ? this.showModal() : this.reviewPurchase();
    }
  };
  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      await WebBrowser.openBrowserAsync(
        this.addingCredits
          ? this.props.payment_data_wallet.knet_payment_url
          : this.props.payment_data.knet_payment_url
      ).then(action => {
        this.setState({
          browserLoading: action.type !== "cancel"
        });
      });
      Segment.screenWithProperties("Payment Knet Screen", {
        businessname: this.props.mainBusiness.businessname,
        campaign_id: this.props.campaign_id
      });
      this._removeLinkingListener();
    } catch (error) {
      console.log(error);
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

    let data = Linking.parse(event.url);

    this.setState({ redirectData: data });
  };

  _changeToKnet = () => {
    this.setState({ choice: 2 });
  };

  _handleSubmission = () => {
    this.setState({ browserLoading: true });
    if (this.state.browserLoading) return;
    if (this.addingCredits) {
      this.props.addWalletAmount(
        {
          amount: this.navState.amount,
          payment_type: this.state.payment_type
        },
        this._openWebBrowserAsync
      );
    } else {
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
    }
  };

  showModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  reviewPurchase = () => {
    if (this.props.walletUsed)
      this.props.removeWalletAmount(
        this.props.campaign_id,
        this.props.navigation,
        this.navState.names,
        true
      );

    !this.props.loading &&
      this.props.navigation.navigate("AdPaymentReview", {
        names: this.navState.names
      });
  };

  _handleChoice = choice => {
    this.setState({
      choice
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
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />

        <View style={styles.headerview}>
          <Text style={styles.header}>Payment</Text>
          <BackDrop style={styles.backDrop} />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 13,
                fontFamily: "montserrat-medium"
              }}
            >
              TOTAL
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles.money}>
                {this.addingCredits
                  ? " " + formatNumber(this.amount)
                  : this.props.walletUsed
                  ? formatNumber(this.props.campaign_balance_amount)
                  : formatNumber(this.props.data.lifetime_budget_micro)}
              </Text>

              <Text style={[styles.money, { fontSize: 16 }]}> USD</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  styles.money,
                  { fontSize: 10, fontFamily: "montserrat-regular" }
                ]}
              >
                {this.addingCredits
                  ? this.props.walletAmountInKwd
                  : this.props.walletUsed
                  ? this.props.campaign_balance_amount_kwd
                  : this.navState.kdamount}
              </Text>
              <Text
                style={[
                  styles.money,
                  { fontSize: 10, fontFamily: "montserrat-regular" }
                ]}
              >
                {" "}
                KWD
              </Text>
            </View>
          </View>
          {!this.addingCredits && (
            <View style={{ flexDirection: "row" }}>
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
              <Button
                style={[
                  styles.whitebutton2,
                  {
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
            </View>
          )}
        </View>

        {this.state.choice === 1 ? (
          <UseWallet _changeToKnet={this._changeToKnet} />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              bottom: "5%"
            }}
          >
            <Image
              style={styles.image}
              source={require("../../../assets/images/knet.png")}
              resizeMode="contain"
            />
            <Text style={styles.errortext}>
              You will be redirected to KNET’s {"\n"}
              payment gateway for the {"\n"}
              payment process
            </Text>
          </View>
        )}
        <View style={{ bottom: "5%" }}>
          {!this.addingCredits ? (
            <Button
              transparent
              onPress={() =>
                this.props.walletUsed ? this.showModal() : this.reviewPurchase()
              }
              style={styles.button}
            >
              <Text style={styles.boldtext}>Review Purchase</Text>
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => {
                !this.props.loading &&
                  !this.state.browserLoading &&
                  this.props.navigation.navigate("Wallet");
              }}
              style={styles.button}
            >
              <Text style={styles.boldtext}>Cancel Payment</Text>
            </Button>
          )}
        </View>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this._handleSubmission()}
            style={[
              styles.mainCard,
              {
                backgroundColor: !this.props.loading ? "#FF9D00" : "#aa6900"
              }
            ]}
          >
            <View>
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
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 13,
                  fontFamily: "montserrat-medium",
                  paddingBottom: 3
                }}
              >
                Pay now
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this._handleSubmission()}
          style={[styles.bottomCard]}
        >
          <Text style={[styles.link]}>
            {`By tapping this button you agree to the\n`}
            <Text
              onPress={() => {
                this.setState({ browserLoading: true });
                openTerms(this.closeBrowserLoading);
              }}
              style={[
                styles.link,
                {
                  textDecorationLine: "underline",
                  color: globalColors.purple
                }
              ]}
            >
              {`Terms & Conditions`}
            </Text>
          </Text>
        </TouchableOpacity>
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
      </Container>
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
  loading: state.campaignC.loading
});
const mapDispatchToProps = dispatch => ({
  payment_request_knet: (campaign_id, openBrowser, navigation) =>
    dispatch(
      actionCreators.payment_request_knet(campaign_id, openBrowser, navigation)
    ),
  removeWalletAmount: (info, naviagtion, names, goBack) =>
    dispatch(
      actionCreators.removeWalletAmount(info, naviagtion, names, goBack)
    ),
  addWalletAmount: (info, openBrowser) =>
    dispatch(actionCreators.addWalletAmount(info, openBrowser))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
