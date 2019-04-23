import React, { Component } from "react";
import {
  View,
  Image,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  Container,
  Icon,
  Spinner
} from "native-base";
import { LinearGradient, WebBrowser, Linking } from "expo";
import KnetIcon from "../../../assets/SVGs/Knet.svg";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class PaymentForm extends Component {
  static navigationOptions = {
    header: null
  };
  _openWebBrowserAsync = async () => {
    try {
      this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        this.props.payment_data.knet_payment_url
      );
      this._removeLinkingListener();
      console.log("result", result);
    } catch (error) {
      alert(error);
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
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />

        <View style={styles.headerview}>
          <Text style={styles.header}>Payment</Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Button disabled style={styles.whitebutton}>
              <Text style={styles.whitebuttontext}> WALLET </Text>
            </Button>
            */}
            <Button style={styles.button}>
              <Text style={styles.buttontext}> K-NET </Text>
            </Button>
            {/* <Button disabled style={styles.whitebutton2}>
              <Text style={styles.whitebuttontext}> CREDIT{"\n"}CARD </Text>
            </Button>
           */}
          </View>
        </View>

        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <View style={[styles.mainCard]}>
            <Text
              style={styles.boldtext}
              onPress={() =>
                this.props.navigation.navigate("AdPaymentReview", {
                  interestNames: this.props.navigation.state.params
                    .interestNames
                })
              }
            >
              Review Purchase
            </Text>
          </View>
        </View>
        <Card padder style={[styles.bottomCard]}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.payment_request_knet(
                this.props.campaign_id,
                this._openWebBrowserAsync
              )
            }
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center"
            }}
          >
            <View>
              {/* 
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
                  fontFamily: "montserrat-medium"
                }}
              >
                TOTAL
              </Text>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 18,
                  fontFamily: "montserrat-bold",
                  paddingTop: 3
                }}
              >
                {this.props.data.lifetime_budget_micro}$
              </Text>
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
              <Text style={styles.link}>
                By tapping this button you {"\n"}
                Agree to the Terms & Conditions
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  campaign_id: state.campaignC.campaign_id,
  payment_data: state.campaignC.payment_data
});
const mapDispatchToProps = dispatch => ({
  payment_request_knet: (campaign_id, openBrowser) =>
    dispatch(actionCreators.payment_request_knet(campaign_id, openBrowser))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);
