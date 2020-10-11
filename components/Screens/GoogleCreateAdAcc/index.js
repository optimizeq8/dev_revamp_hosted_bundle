import React, { Component } from "react";
import { ActivityIndicator, View, ScrollView, BackHandler } from "react-native";
import { Card, Text, Container } from "native-base";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import HTMLView from "react-native-htmlview";
import { terms, secondTerms } from "../../Data/terms.google.data";
import CustomHeader from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";
import GoogleAd from "../../../assets/SVGs/GoogleAds";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

// Style
import styles, { htmlStyles } from "./styles";
import { globalColors } from "../../../GlobalStyles";

class GoogleCreateAdAcc extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      accept: false,
    };
  }

  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    analytics.track(`ad_TNC`, {
      source,
      source_action,
      campaign_channel: "google",
      campaign_ad_type: "GoogleSEAd",
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={{
          height: "100%",
          flex: 1,
          backgroundColor: "#0000",
        }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Dashboard",
              obj: {
                businessname: this.props.mainBusiness.businessname,
              },
              source: "ad_TNC",
              source_action: "a_go_back",
            }}
            navigation={this.props.navigation}
            title="Google Ads Policies"
            screenProps={this.props.screenProps}
          />
          <GoogleAd
            width={50}
            height={70}
            style={{ alignSelf: "center", margin: 15 }}
          />
          <Card padder style={styles.mainCard}>
            <Text style={styles.text}>{translate("Terms & Conditions")}</Text>
            <ScrollView
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  this.setState({ accept: true });
                }
              }}
              scrollEventThrottle={400}
              contentContainerStyle={styles.scrollViewContentContainer}
              style={styles.scrollViewContainer}
            >
              <View style={styles.htmlContainer}>
                <HTMLView value={terms} stylesheet={htmlStyles} />
                <HTMLView value={secondTerms} stylesheet={htmlStyles} />
              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              {this.props.loading ? (
                <ActivityIndicator size="large" color={globalColors.orange} />
              ) : (
                <GradientButton
                  style={styles.button}
                  onPressAction={() => {
                    this.props.create_google_ad_account(
                      {
                        businessid: this.props.mainBusiness.businessid,
                      },
                      this.props.navigation
                    );
                  }}
                  uppercase
                  text={translate("Accept")}
                />
              )}
            </View>
          </Card>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  loading: state.account.loading,
});

const mapDispatchToProps = (dispatch) => ({
  create_google_ad_account: (info, navigation) =>
    dispatch(actionCreators.create_google_ad_account(info, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleCreateAdAcc);
