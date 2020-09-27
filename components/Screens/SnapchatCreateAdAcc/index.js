import React, { Component } from "react";
import WebView from "react-native-webview";

import { View, Text, BackHandler, I18nManager } from "react-native";
import { Card, Button, Container } from "native-base";
import analytics from "@segment/analytics-react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import Loading from "../../MiniComponents/LoadingScreen";
import { ActivityIndicator } from "react-native-paper";
import CustomHeader from "../../MiniComponents/Header";
import Snapchat from "../../../assets/SVGs/Snapchat-Border";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

// Style
import styles, { htmlStyles } from "./styles";
import { colors } from "../../GradiantColors/colors";
import { globalColors } from "../../../GlobalStyles";

class SnapchatCreateAdAcc extends Component {
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
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
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
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
    });
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
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            title="Snapchat Ads Policies"
          />

          <Snapchat style={{ alignSelf: "center", margin: 15 }} />
          {/* <Image
            style={styles.media}
            source={require("../../../assets/images/logo01.png")}
            resizeMode="contain"
          /> */}

          <Card padder style={styles.mainCard}>
            {/** Replace the hard code snapchat policies html data with webview so as to directly pull data from snapchat ad policies */}
            <WebView
              startInLoadingState={true}
              source={{
                uri: I18nManager.isRTL
                  ? "https://www.snap.com/ar/ad-policies"
                  : "https://www.snap.com/en-GB/ad-policies",
              }}
              renderLoading={() => (
                <ActivityIndicator
                  color={globalColors.orange}
                  style={{ bottom: "50%" }}
                  size="large"
                />
              )}
              style={styles.webview}
              contentContainerStyle={[styles.contentWebView]}
              ref={(ref) => (this.webview = ref)}
            />

            <View style={styles.bottomContainer}>
              <Button
                block
                dark
                // disabled={!this.state.accept}
                style={[styles.button]}
                onPress={() => {
                  this.props.navigation.navigate(
                    "AcceptTermsConditionLoading",
                    {
                      source: "ad_TNC",
                      source_action: "a_accept_ad_TNC",
                    }
                  );
                  this.props.create_snapchat_ad_account(
                    this.props.mainBusiness.businessid,
                    this.props.navigation
                  );
                }}
              >
                <Text style={styles.buttontext}>{translate("Accept")}</Text>
              </Button>
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
  adType: state.campaignC.adType,
});

const mapDispatchToProps = (dispatch) => ({
  create_snapchat_ad_account: (id, navigation) =>
    dispatch(actionCreators.create_snapchat_ad_account(id, navigation)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapchatCreateAdAcc);
