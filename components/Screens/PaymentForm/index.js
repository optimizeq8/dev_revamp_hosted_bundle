import React, { Component } from "react";
import { View, Image, TouchableOpacity, Platform } from "react-native";
import { Card, Button, Text, Container } from "native-base";
import { Modal } from "react-native-paper";
import { LinearGradient, WebBrowser, Linking, Segment, BlurView } from "expo";
import UseWallet from "./UseWallet";
import BackDrop from "../../../assets/SVGs/BackDropIcon";
import NavigationService from "../../../NavigationService.js";

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
    showModal: false
  };
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
  }
  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        this.props.navigation.state.params &&
          this.props.navigation.state.params.addingCredits
          ? this.props.payment_data_wallet.knet_payment_url
          : this.props.payment_data.knet_payment_url
      );
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
    console.log(event.url);
    console.log("data", data);
    this.setState({ redirectData: data });
  };

  _changeToKnet = () => {
    this.setState({ choice: 2 });
  };

  _handleSubmission = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.addingCredits
    ) {
      this.props.addWalletAmount(
        {
          amount: this.props.navigation.state.params.amount,
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
      this.props.removeWalletAmount(this.props.campaign_id);

    !this.props.loading &&
      this.props.navigation.navigate("AdPaymentReview", {
        interestNames: this.props.navigation.state.params.interestNames
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
  render() {
    let addingCredits =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.addingCredits;
    let amount =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.amount;
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
          <View style={{ flexDirection: "column" }}>
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
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "montserrat-bold",
                paddingTop: 3
              }}
            >
              {addingCredits
                ? amount + "$"
                : this.props.walletUsed
                ? this.props.campaign_balance_amount +
                  "$" +
                  "\n" +
                  this.props.campaign_balance_amount_kwd
                : this.props.data.lifetime_budget_micro +
                  "\n" +
                  this.props.navigation.state.params.kdamount +
                  "KWD"}
            </Text>
          </View>
          {!addingCredits && (
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
                  KENT
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
              Payment gateway for the {"\n"}
              payment process
            </Text>
          </View>
        )}
        <View style={{ bottom: "5%" }}>
          {!addingCredits ? (
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
              onPress={() =>
                !this.props.loading &&
                this.props.navigation.navigate("AddCredits")
              }
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
          <Text style={styles.link}>
            By tapping this button you {"\n"}
            Agree to the Terms & Conditions
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
                    <Text style={{ color: "#fff" }}>Confrim</Text>
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

        <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  mainBusiness: state.auth.mainBusiness,
  campaign_id: state.campaignC.campaign_id,
  kdamount: state.campaignC.kdamount,
  payment_data: state.campaignC.payment_data,
  payment_data_wallet: state.transA.payment_data,
  wallet_amount_applied: state.transA.wallet_amount_applied,
  wallet_balance_amount: state.transA.wallet_balance_amount,
  campaign_balance_amount_kwd: state.transA.campaign_balance_amount_kwd,
  campaign_balance_amount: state.transA.campaign_balance_amount,
  walletUsed: state.transA.walletUsed,
  loading: state.campaignC.loading
});
const mapDispatchToProps = dispatch => ({
  payment_request_knet: (campaign_id, openBrowser, navigation) =>
    dispatch(
      actionCreators.payment_request_knet(campaign_id, openBrowser, navigation)
    ),
  removeWalletAmount: info => dispatch(actionCreators.removeWalletAmount(info)),
  addWalletAmount: (info, openBrowser) =>
    dispatch(actionCreators.addWalletAmount(info, openBrowser))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
