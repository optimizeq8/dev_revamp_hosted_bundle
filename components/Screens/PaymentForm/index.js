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
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <View
          style={{
            justifyContent: "center",
            marginTop: 10,
            marginLeft: 20
          }}
        />

        <View>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Text
              style={[
                styles.header,
                {
                  paddingHorizontal: 50,
                  paddingVertical: 30,
                  textAlign: "center"
                }
              ]}
            >
              Payment
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              marginHorizontal: 40
            }}
          />

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text style={styles.text}>Budget</Text>
              <Text style={styles.text}>Agency Fee</Text>
            </View>
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <Text style={styles.text}>
                {this.props.data.lifetime_budget_micro} $
              </Text>
              <Text style={styles.text}>20 $</Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#000" }}>
          <Card padder style={styles.bottomCard}>
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
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center"
                }}
              >
                Total {"\n"} {this.props.data.lifetime_budget_micro + 20} $
                {"\n"} Pay now{" "}
              </Text>
            </TouchableWithoutFeedback>
          </Card>
        </View>
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
