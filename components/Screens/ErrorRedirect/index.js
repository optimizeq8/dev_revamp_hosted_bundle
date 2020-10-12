import React, { Component } from "react";
import { View, Image, BackHandler, ScrollView, Text } from "react-native";
import analytics from "@segment/analytics-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, NavigationActions } from "react-navigation";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons
import ErrorIcon from "../../../assets/SVGs/Error";

import LoadingScreen from "../../MiniComponents/LoadingScreen";
// import { AdjustEvent, Adjust } from "react-native-adjust";

class ErrorRedirect extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      logoImage: require("../../../assets/images/logo01.png"),
    };
  }

  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      "payment_processing"
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      "a_payment_processing"
    );
    let segmentInfo = {};
    if (this.props.navigation.getParam("isWallet") === "1") {
      segmentInfo = {
        amount: parseFloat(this.props.navigation.getParam("amount", "null")),
        payment_status: "failure",
        top_wallet_amount: this.props.navigation.getParam("amount", "null"),
      };
    } else {
      segmentInfo = {
        payment_status: "failure",
        campaign_channel:
          this.props.channel === "" ? "snapchat" : this.props.channel,
        amount: parseFloat(this.props.navigation.getParam("amount", 0)),
        campaign_ad_type:
          this.props.channel === "google"
            ? "GoogleSEAd"
            : this.props.channel === "instagram"
            ? this.props.adTypeInstagram
            : this.props.adType,
        campaign_ltv: parseFloat(
          this.props.navigation.getParam("campaign_ltv", 0)
        ),
        campaign_revenue: parseFloat(
          this.props.navigation.getParam("campaign_revenue", 0)
        ),
      };
    }
    analytics.track(`payment_end`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
      businessid: this.props.mainBusiness.businessid,
      businessname: this.props.mainBusiness.businessname,
      ...segmentInfo,
      payment_mode: this.props.navigation.getParam("payment_mode"),
    });
    //TODO: add adjust analytics accordingly
    if (this.props.navigation.getParam("isWallet") === "1") {
      // let adjustWalletPaymentTracker = new AdjustEvent("l70qk7");
      // adjustWalletPaymentTracker.addPartnerParameter(
      //   this.props.channel === "google"
      //     ? `Google_SEM`
      //     : `Snap_${this.props.adType}`,
      //   this.props.channel === "google" ? "google_sem" : this.props.adType
      // );
      // adjustWalletPaymentTracker.setRevenue(
      //   parseFloat(this.props.navigation.getParam("amount", "null")),
      //   "USD"
      // );
      // adjustWalletPaymentTracker.setTransactionId(
      //   this.props.navigation.getParam("paymentId", "null")
      // );
      // Adjust.trackEvent(adjustWalletPaymentTracker);
    } else {
      // let adjustPaymentTracker = new AdjustEvent("kdnzgg");
      // adjustPaymentTracker.addPartnerParameter(
      //   this.props.channel === "google"
      //     ? `Google_SEM`
      //     : `Snap_${this.props.adType}`,
      //   this.props.channel === "google" ? "google_sem" : this.props.adType
      // );
      // adjustPaymentTracker.setRevenue(
      //   parseFloat(this.props.navigation.getParam("amount", "null")),
      //   "USD"
      // );
      // adjustPaymentTracker.setTransactionId(
      //   this.props.navigation.getParam("paymentId", "null")
      // );
      // Adjust.trackEvent(adjustPaymentTracker);
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  render() {
    const { translate } = this.props.screenProps;
    if (!this.props.navigation.state.params) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Image
            style={styles.media}
            source={this.state.logoImage}
            resizeMode="contain"
          />
          <View style={styles.view}>
            <ErrorIcon fill="#E26A65" width={80} height={80} />

            <Text style={styles.title}> {translate("Sorry")} </Text>
            <Text style={styles.errorText}>
              {translate(
                "There seems to be a problem with\nyour payment method"
              )}
              .
            </Text>
            <View style={styles.details}>
              <Text style={styles.text}>
                {translate("Payment ID:")}{" "}
                {this.props.navigation.getParam("paymentId", "")}
              </Text>
              <Text style={styles.text}>
                {translate("Track ID:")}{" "}
                {this.props.navigation.getParam("trackID", "")}
              </Text>
              <Text style={styles.text}>
                {translate("Amount:")}
                {this.props.navigation.getParam("kdamount", 0)} KWD
              </Text>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={[styles.text]}>{translate("Date:")} </Text>
                <Text style={[{ writingDirection: "ltr" }, styles.text]}>
                  {this.props.navigation.getParam("date", "")}
                </Text>
              </View>
              <Text style={styles.text}>
                {translate("Status:")}{" "}
                {this.props.navigation.getParam("status", "")}
              </Text>
            </View>
            <GradientButton
              uppercase
              style={styles.button}
              text={translate("Retry")}
              onPressAction={() => {
                if (this.props.navigation.getParam("isWallet") === "1") {
                  this.props.navigation.navigate("PaymentForm", {
                    addingCredits: true,
                    amount: this.props.navigation.getParam("amount", 0),
                    source: "payment_mode",
                    source_action: "a_retry_payment",
                  });
                } else {
                  this.props.navigation.navigate("PaymentForm", {
                    addingCredits: false,
                    source: "payment_mode",
                    source_action: "a_retry_payment",
                    amount: this.props.navigation.getParam("amount", 0),
                  });
                }
              }}
            />
            <GradientButton
              onPressAction={() => {
                // if (this.props.channel === "") {
                //   this.props.resetCampaignInfo();
                //   this.props.reset_transaction_reducer();
                // }
                // if (this.props.channel === "google") {
                //   this.props.rest_google_campaign_data();
                //   this.props.reset_transaction_reducer();
                // }
                this.props.navigation.reset(
                  [
                    NavigationActions.navigate({
                      routeName: "Dashboard",
                      params: {
                        source: "payment_end",
                        source_action: "a_go_to_home",
                      },
                    }),
                  ],
                  0
                );
              }}
              text={translate("Home")}
              transparent
              style={styles.whiteButton}
              uppercase
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  campaign_id: state.transA.campaign_id,
  campaign_budget: state.transA.campaign_budget,
  campaign_budget_kdamount: state.transA.campaign_budget_kdamount,
  channel: state.transA.channel,
  adType: state.campaignC.adType,
  adTypeInstagram: state.instagramAds.adType,
});
const mapDispatchToProps = (dispatch) => ({
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  rest_google_campaign_data: () =>
    dispatch(actionCreators.rest_google_campaign_data()),
  reset_transaction_reducer: () =>
    dispatch(actionCreators.reset_transaction_reducer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ErrorRedirect);
