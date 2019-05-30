import React, { Component } from "react";
import { View, Image, BackHandler, SafeAreaView } from "react-native";
import { Linking, LinearGradient, Segment } from "expo";
import { Button, Text, Container } from "native-base";
import ErrorIcon from "../../../assets/SVGs/Error.svg";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

//styles
import styles, { colors } from "./styles";

//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class ErrorRedirect extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
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
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Container style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/logo01.png")}
            resizeMode="contain"
          />
          <View style={styles.view}>
            <ErrorIcon width={93} height={93} />

            <Text style={styles.title}> Sorry </Text>
            <Text style={styles.errortext}>
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
              <Text style={styles.buttontext}> Retry </Text>
            </Button>
            <Button
              style={styles.whitebutton}
              onPress={() => this.props.navigation.navigate("Dashboard")}
            >
              <Text style={styles.whitebuttontext}> Home </Text>
            </Button>
          </View>
        </Container>
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
  resetCampaignId: () => dispatch(actionCreators.resetCampaignId())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorRedirect);
