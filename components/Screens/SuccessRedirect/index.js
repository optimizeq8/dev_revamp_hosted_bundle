import React, { Component } from "react";
import { View, Image } from "react-native";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Text } from "native-base";
import { SafeAreaView, NavigationActions } from "react-navigation";
import LottieView from "lottie-react-native";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons
import SuccessIcon from "../../../assets/SVGs/Success";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

class SuccessRedirect extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);

    this.state = {
      media: require("../../../assets/images/logo01.png"),
      successLogo: require("../../../assets/animation/success.json")
    };
  }

  componentDidMount() {
    Segment.screenWithProperties("Payment Success", {
      category:
        this.props.navigation.getParam("isWallet") === "1"
          ? "Wallet Top Up"
          : "Campaign Creation",
      label:
        this.props.navigation.getParam("isWallet") === "1"
          ? "Wallet Transaction"
          : "Campaign Transaction"
    });
    // this.animation.play();

    // Segment.trackWithProperties("Viewed Checkout Step", {
    //   step: 7,
    //   business_name: this.props.mainBusiness.businessname,
    //   checkout_id: this.props.campaign_id
    // });

    this.setState(this.props.navigation.state.params, () => {
      // Segment.trackWithProperties("Completed Checkout Step", {
      //   step: 7,
      //   business_name: this.props.mainBusiness.businessname,
      //   checkout_id: this.props.campaign_id,
      //   paymentMethod: ""
      // });

      if (this.props.data) {
        Segment.trackWithProperties("Order Completed", {
          label: "Campaign Purchase Completed",
          category: "Checkout",
          business_name: this.props.mainBusiness.businessname,
          order_id: this.props.campaign_id,
          currency: "USD",
          label: "Campaign Purchase Completed",
          category: "Checkout",
          revenue: this.props.data.lifetime_budget_micro,
          products: [
            {
              products_id: 1,
              name: "Snapchat Snap Ad",
              price: this.props.data.lifetime_budget_micro,
              quantity: 1,
              category: "Advertisement"
            }
          ]
        });
      }
      this.props.resetCampaignInfo();
    });
  }
  onLottieEnd = () => {
    // this.animation.play();
  };
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

        <Image
          style={styles.media}
          source={this.state.media}
          resizeMode="contain"
        />

        <View style={styles.view}>
          {/* <View
            style={{
              width: widthPercentageToDP(50),
              height: heightPercentageToDP(20)
              //   justifyContent: "flex-start"
            }}
          >
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={[styles.lottieViewContainer]}
              //   resizeMode="cover"
              source={this.state.successLogo}
            />
          </View> */}
          <SuccessIcon width={80} height={80} />
          <Text style={styles.title}> {translate("Success!")} </Text>
          <Text style={styles.errortext}>
            {this.state.isWallet !== "1"
              ? translate("Your Ad is now being processed")
              : translate("Your wallet has been topped up!")}
          </Text>
          <View style={styles.details}>
            <Text style={styles.text}>
              {translate("Payment ID:")} {this.state.paymentId}
            </Text>
            <Text style={styles.text}>
              {translate("Track ID:")} {this.state.trackID}
            </Text>
            <Text style={styles.text}>
              {translate("Amount:")} {this.state.kdamount} KWD
            </Text>
            <Text style={styles.text}>
              {translate("Date:")} {this.state.date}
            </Text>
            <Text style={styles.text}>
              {translate("Status:")} {this.state.status}
            </Text>
          </View>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.resetCampaignInfo();
              this.props.navigation.reset(
                [NavigationActions.navigate({ routeName: "Dashboard" })],
                0
              );
            }}
          >
            <Text style={styles.buttontext}> {translate("Home")} </Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  mainBusiness: state.account.mainBusiness,
  campaign_id: state.campaignC.campaign_id,
  interestsNames: state.campaignC.interestsNames
});
const mapDispatchToProps = dispatch => ({
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessRedirect);
