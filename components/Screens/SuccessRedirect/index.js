import React, { Component } from "react";
import { View, Image, BackHandler } from "react-native";
import { LinearGradient, Segment } from "expo";
import { Button, Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import LottieView from "lottie-react-native";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles from "./styles";

// Icons
import SuccessIcon from "../../../assets/SVGs/Success.svg";
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
      image: require("../../../assets/images/logo01.png"),
      successLogo: require("../../../assets/animation/success.json")
    };
  }

  componentDidMount() {
    // this.animation.play();
    Segment.screen("Payment Success Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 7,
      business_name: this.props.mainBusiness.businessname,
      checkout_id: this.props.campaign_id
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.setState(this.props.navigation.state.params, () => {
      Segment.trackWithProperties("Completed Checkout Step", {
        step: 7,
        business_name: this.props.mainBusiness.businessname,
        checkout_id: this.props.campaign_id,
        paymentMethod: ""
      });

      if (this.props.data) {
        Segment.trackWithProperties("Order Completed", {
          label: "Campaign Purchase Completed",
          category: "Checkout",
          business_name: this.props.mainBusiness.businessname,
          order_id: this.props.campaign_id,
          currency: "USD",
          revenue: this.props.data.lifetime_budget_micro,
          products: [
            {
              products_id: 1,
              name: "Snapchat Snap Ad",
              price: this.props.data.lifetime_budget_micro,
              quantity: 1,
              category: "Advertisment"
            }
          ]
        });
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  onLottieEnd = () => {
    // this.animation.play();
  };
  render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Image
          style={styles.image}
          source={this.state.image}
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
          <Text style={styles.title}> Success! </Text>
          <Text style={styles.errortext}>
            {this.state.isWallet !== "1"
              ? "Your Ad is now being processed"
              : "Your wallet has been topped up!"}
          </Text>
          <View style={styles.details}>
            <Text style={styles.text}>Payment ID: {this.state.paymentId}</Text>
            <Text style={styles.text}>Track ID: {this.state.trackID}</Text>
            <Text style={styles.text}>Amount: {this.state.kdamount} KWD</Text>
            <Text style={styles.text}>Date: {this.state.date}</Text>
            <Text style={styles.text}>Status: {this.state.status}</Text>
          </View>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.resetCampaignInfo();
              this.props.navigation.replace("Dashboard");
            }}
          >
            <Text style={styles.buttontext}> Home </Text>
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
