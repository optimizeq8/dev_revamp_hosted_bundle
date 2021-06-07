import React, { Component } from "react";
import { View, AppState, Platform } from "react-native";
import WebView from "react-native-webview";
import analytics from "@segment/analytics-react-native";
import CustomHeader from "../Header";
import { Container } from "native-base";
import CookieManager from "@react-native-cookies/cookies";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import { getUserAgent } from "react-native-device-info";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import styles from "./styles";
import Loading from "../LoadingScreen";
const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking");

class index extends Component {
  state = {
    // userAgent: "",
  };
  componentDidMount() {
    // getUserAgent().then((userAgent) => {
    //   this.setState({
    //     userAgent,
    //   });
    // });
    CookieManager.clearAll().then((val) =>
      console.log("webviewCookieManager", val)
    );
    RCTNetworking.clearCookies(() => true);
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`web_view`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });

    AppState.addEventListener("change", this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  };
  state = {
    appState: AppState.currentState,
    viewLoader: true,
  };

  hideLoader = () => {
    this.setState({ viewLoader: false });
  };
  render() {
    let url = this.props.navigation.getParam("url", "");
    let title = this.props.navigation.getParam("title", "");
    // console.log("userAgent", this.state.userAgent);
    return (
      <SafeAreaView
        // style={styles.mainSafeArea}
        style={{ flex: 1 }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />

        <Container style={styles.container}>
          <CustomHeader
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            // containerStyle={{ height: "3%" }}
            // titleStyle={{ top: 5, left: 0 }}
            segment={{
              source: this.props.navigation.getParam(
                "source",
                this.props.screenProps.prevAppState
              ),
              source_action: "a_go_back",
            }}
            title={title}
          />
          {/* <Content
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            // padder
          > */}

          <WebView
            userAgent={
              url.includes("facebooklogin/login.php") &&
              Platform.OS === "android"
                ? "Mozilla/5.0 (Windows Mobile; Opera Mini/5.1.21594/28.2725; U; en) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.149 Mobile Safari/537.36"
                : //   this.state.f
                  //Mozilla/5.0 (Linux; Android 9; Android SDK built for x86 Build/PSR1.180720.093; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36

                  //  "Mozilla/5.0 (Windows Mobile; Opera Mini/5.1.21594/28.2725; U; en) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.149 Mobile Safari/537.36"
                  ""
            }
            // startInLoadingState={true}
            onLoadStart={() => {
              RCTNetworking.clearCookies(() => true);
            }}
            onError={(error) => {
              console.log("error loading url", error);
              analytics.track("a_error", {
                source: "web_view",
                source_action: this.props.navigation.getParam(
                  "source_action",
                  this.props.screenProps.prevAppState
                ),
                url,
              });
            }}
            onLoad={() => this.hideLoader()}
            androidHardwareAccelerationDisabled={true}
            // renderLoading={() => (
            //   <View style={{ height: "100%", backgroundColor: "#0000" }}>
            //     <Loading top={40} />
            //   </View>
            // )}
            style={{ backgroundColor: "transparent" }}
            contentContainerStyle={{ backgroundColor: "transparent" }}
            ref={(ref) => (this.webview = ref)}
            source={{ uri: url }}
            cacheEnabled={false}
            sharedCookiesEnabled={false}
            // incognito={true}
            onNavigationStateChange={(navState) => {
              //   console.log("navState.url", navState.url);
              if (navState.url.includes("choosepage.php")) {
                CookieManager.clearAll(true).then((val) => {
                  console.log("onNavigationStateChangeclearAll", val);
                });
              }
              if (
                Platform.OS === "ios" &&
                (this.state.appState === "background" ||
                  this.state.appState === "inactive") &&
                (navState.url.includes("successpayment?result") ||
                  navState.url.includes("errorpayment?result"))
              ) {
                let decodeURi = decodeURIComponent(navState.url);
                decodeURi = decodeURi.substring(decodeURi.indexOf("?"));
                decodeURi = decodeURi.split("?result=");
                decodeURi = decodeURi[1];
                decodeURi = JSON.parse(decodeURi);
                //For redirection To Success or Error
                this.props.navigation.navigate(
                  navState.url.includes("successpayment?result")
                    ? "SuccessRedirect"
                    : "ErrorRedirect",
                  decodeURi
                );
              }
            }}
          />
          {this.state.viewLoader && (
            <View
              style={{
                height: "100%",
                backgroundColor: "#0000",
              }}
            >
              <Loading top={40} />
            </View>
          )}
          {/* </Content> */}
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});

export default connect(mapStateToProps, null)(index);
