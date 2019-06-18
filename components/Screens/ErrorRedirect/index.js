import React, { Component } from "react";
import { View, Image, BackHandler, ScrollView } from "react-native";
import { LinearGradient, Segment } from "expo";
import { Button, Text } from "native-base";
import { SafeAreaView } from "react-navigation";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

// Icons
import ErrorIcon from "../../../assets/SVGs/Error.svg";

import LoadingScreen from "../../MiniComponents/LoadingScreen";

class ErrorRedirect extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      logoImage: require("../../../assets/images/logo01.png")
    };
  }

  componentDidMount() {
    Segment.screen("Payment Error Screen");
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
    if (!this.props.navigation.state.params) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
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
            style={styles.image}
            source={this.state.logoImage}
            resizeMode="contain"
          />
          <View style={styles.view}>
            <ErrorIcon width={80} height={80} />

            <Text style={styles.title}> Sorry </Text>
            <Text style={styles.errorText}>
              There seems to be a problem with {"\n"}
              your payment method.
            </Text>
            <View style={styles.details}>
              <Text style={styles.text}>
                Payment ID: {this.props.navigation.getParam("paymentId", "")}
              </Text>
              <Text style={styles.text}>
                Track ID: {this.props.navigation.getParam("trackID", "")}
              </Text>
              <Text style={styles.text}>
                Amount: {this.props.navigation.getParam("kdamount", 0)} KWD
              </Text>
              <Text style={styles.text}>
                Date: {this.props.navigation.getParam("date", "")}
              </Text>
              <Text style={styles.text}>
                Status: {this.props.navigation.getParam("status", "")}
              </Text>
            </View>
            <Button
              style={styles.button}
              onPress={() => {
                if (this.props.navigation.getParam("isWallet") === "1") {
                  this.props.navigation.navigate("PaymentForm", {
                    addingCredits: true,
                    amount: this.props.navigation.getParam("amount", 0)
                  });
                } else {
                  this.props.navigation.navigate("PaymentForm", {
                    addingCredits: false,
                    amount: this.props.navigation.getParam("amount", 0)
                  });
                }
              }}
            >
              <Text style={styles.buttonText}> Retry </Text>
            </Button>
            <Button
              style={styles.whitebutton}
              onPress={() => {
                this.props.resetCampaignInfo();
                this.props.navigation.navigate("Dashboard");
              }}
              style={styles.whiteButton}
              onPress={() => this.props.navigation.navigate("Dashboard")}
            >
              <Text style={styles.whiteButtonText}> Home </Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  interestsNames: state.campaignC.interestsNames
});
const mapDispatchToProps = dispatch => ({
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id)),
  resetCampaignInfo: () => dispatch(actionCreators.resetCampaignInfo())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorRedirect);
