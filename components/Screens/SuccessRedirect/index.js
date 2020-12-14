import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import analytics from "@segment/analytics-react-native";
import { NavigationActions } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import GradientButton from "../../MiniComponents/GradientButton";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons
import SuccessIcon from "../../../assets/SVGs/Success";
import VerifyEngagmentNumber from "./VerifyEngagmentNumber";
// import { AdjustEvent, Adjust } from "react-native-adjust";

class SuccessRedirect extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      media: require("../../../assets/images/logo01.png"),
      successLogo: require("../../../assets/animation/success.json"),
      showVerifyEngagment: false,
      engagmentNumberVerified: false,
      objective: "",
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
        payment_status: "success",
        top_wallet_amount: this.props.navigation.getParam("amount", "null"),
        type: "Wallet load",
      };
      analytics.identify(this.props.userInfo.userid, {
        wallet_amount: this.props.navigation.getParam("amount", "null"),
      });
    } else {
      segmentInfo = {
        payment_status: "success",
        campaign_channel:
          this.props.channel === "" ? "snapchat" : this.props.channel,
        amount: parseFloat(this.props.navigation.getParam("amount", "null")),
        campaign_ad_type:
          this.props.channel === "google"
            ? "GoogleSEAd"
            : this.props.channel === "instagram"
            ? this.props.adTypeInstagram
            : this.props.adType,

        campaign_ltv: parseFloat(
          this.props.navigation.getParam("campaign_ltv", "null")
        ),
        campaign_revenue: parseFloat(
          this.props.navigation.getParam("campaign_revenue", "null")
        ),
        type: "Campaign",
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
    //TODO: For adjust please add the analytics keywords accordinlgy for instagram channel
    if (this.props.navigation.getParam("isWallet") === "1") {
      // let adjustWalletPaymentTracker = new AdjustEvent("byiugh");
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
    } else if (!this.props.navigation.getParam("checkoutwithWallet", false)) {
      // let adjustPaymentTracker = new AdjustEvent("kdnzgg");
      // adjustPaymentTracker.addPartnerParameter(
      //   this.props.channel === "google"
      //     ? `Google_SEM`
      //     : this.props.channel === "instagram"
      //     ? `Instagram_${this.props.adType}`
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
    this.setState(
      {
        ...this.props.navigation.state.params,
        objective: this.props.data && this.props.data.objective,
        campaign_id: this.props.data && this.props.data.campaign_id,
        engagmentPhoneNumber:
          this.props.data && this.props.data.attachment.phone_number_id,
        engagmentNumberVerified:
          this.props.data && this.props.data.verifiedEngagementNumber,
      },
      () => {
        if (
          this.state.objective === "ENGAGEMENT" &&
          !this.state.engagmentNumberVerified
        ) {
          analytics.track(`a_verify_phone_number_engagement`, {
            source: "payment_end",
            source_action: "a_verify_phone_number_engagement",
            campaign_id: this.state.campaign_id,
            campaign_engagement_phone_number: this.state.engagmentPhoneNumber,
          });
          this.props.getEngagmentNumberVerification(this.state.campaign_id);
          this.setState({ showVerifyEngagment: true });
        }
        if (
          this.props.channel === "" ||
          (this.props.channel &&
            this.props.channel.toLowerCase() === "snapchat")
        ) {
          this.props.resetCampaignInfo(false);
        }
        if (this.props.channel === "google") {
          this.props.rest_google_campaign_data();
        }
        if (this.props.channel === "instagram") {
          this.props.resetCampaignInfoInstagram();
        }
        this.props.reset_transaction_reducer();
      }
    );
  }
  onLottieEnd = () => {
    // this.animation.play();
  };
  handleButton = (show = false, navigateToDashboard = false) => {
    analytics.track(`a_go_to_dashboard`, {
      source: "payment_end",
      source_action: "a_go_to_dashboard",
      campaign_id: this.state.campaign_id,
    });
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
  };
  otpVerified = () => this.setState({ showVerifyEngagment: false });
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />

        <View style={styles.view}>
          {this.state.showVerifyEngagment ? (
            <VerifyEngagmentNumber
              otpVerified={this.otpVerified}
              getEngagmentNumberVerification={() =>
                this.props.getEngagmentNumberVerification(
                  this.state.campaign_id
                )
              }
              screenProps={this.props.screenProps}
              navigation={this.props.navigation}
              engagmentPhoneNumber={this.state.engagmentPhoneNumber}
              handleButton={this.handleButton}
              campaign_id={this.state.campaign_id}
            />
          ) : (
            <>
              <SuccessIcon width={80} height={80} />
              <Text uppercase style={styles.title}>
                {translate("Success!")}
              </Text>
              <Text style={styles.errortext}>
                {this.state.isWallet !== "1"
                  ? translate("Your Ad is now being processed")
                  : translate("Your wallet has been topped up!")}
              </Text>
            </>
          )}
          <View
            style={[
              styles.details,
              this.state.showVerifyEngagment && {
                paddingTop: 50,
                bottom: 45,
                zIndex: -1,
              },
            ]}
          >
            <Text style={styles.headingText}>
              {translate("Payment approved:")}
            </Text>
            <Text style={styles.text}>{translate("Here's your receipt:")}</Text>
            <Text style={styles.headingText}>{translate("Payment ID:")}</Text>
            <Text style={styles.text}>{this.state.paymentId}</Text>

            <Text style={styles.headingText}>{translate("Track ID:")}</Text>
            <Text style={styles.text}>{this.state.trackID}</Text>

            <Text style={styles.headingText}>{translate("Amount:")}</Text>
            <Text style={styles.text}>{this.state.kdamount} KWD</Text>

            <Text style={[styles.headingText]}>{translate("Date:")} </Text>
            <Text style={[{ writingDirection: "ltr" }, styles.text]}>
              {this.state.date}
            </Text>

            <Text style={styles.headingText}>{translate("Status:")}</Text>
            <Text style={styles.text}>{this.state.status}</Text>
          </View>

          {!this.state.showVerifyEngagment && (
            <GradientButton
              style={styles.button}
              onPressAction={() => this.handleButton(true, false)}
              textStyle={styles.buttontext}
              text={translate("Home")}
              uppercase={true}
            />
          )}
          {this.props.engagementNumberOTPLoading && (
            <LoadingScreen dash={true} />
          )}
        </View>
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
  data: state.campaignC.data,
  engagementNumberOTPLoading: state.campaignC.engagementNumberOTPLoading,
  verifiedEngagementNumber: state.campaignC.verifiedEngagementNumber,
});
const mapDispatchToProps = (dispatch) => ({
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo()),
  reset_transaction_reducer: () =>
    dispatch(actionCreators.reset_transaction_reducer()),
  rest_google_campaign_data: () =>
    dispatch(actionCreators.rest_google_campaign_data()),
  resetCampaignInfoInstagram: () =>
    dispatch(actionCreators.resetCampaignInfoInstagram()),
  getEngagmentNumberVerification: (campaign_id) =>
    dispatch(actionCreators.getEngagmentNumberVerification(campaign_id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SuccessRedirect);
