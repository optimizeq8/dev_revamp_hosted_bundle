import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import WebView from "react-native-webview";
import analytics from "@segment/analytics-react-native";
import CustomHeader from "../Header";
import SafeAreaView from "react-native-safe-area-view";
import Logo from "../../../assets/SVGs/OptimizePurpleBgLogo";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import styles from "./styles";
import Loading from "../LoadingScreen";
import { heightPercentageToDP } from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../GlobalStyles";
const screen = Dimensions.get("window");
export default class index extends Component {
  componentDidMount() {
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
    });
  }
  state = { viewLoader: true };

  hideLoader = () => {
    setTimeout(() => this.setState({ viewLoader: false }), 1750);
  };
  onMessage = () => {};
  render() {
    const runFirst = `
     var logo = document.getElementsByClassName("logo");
     var vendorName = document.getElementsByClassName("vendorName");
        if(logo) {
            logo[0].style.display = 'none';
        }
        if(vendorName) {
            vendorName[0].style.display = 'none';
        }
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    const { translate } = this.props.screenProps;
    let url = this.props.navigation.getParam("url", "");
    let title = this.props.navigation.getParam("title", "");
    let backgroundColor = this.props.navigation.getParam(
      "backgroundColor",
      "transparent"
    );
    console.log("screen", screen);
    let showLogo = this.props.navigation.getParam("showLogo", false);
    let scrollEnabled = this.props.navigation.getParam("scrollEnabled", true);
    let showCompanyName = this.props.navigation.getParam(
      "showCompanyName",
      false
    );
    let ImageUrl = this.props.navigation.getParam("ImageUrl", "");

    return (
      <View>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
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
        <ScrollView
          contentContainerStyle={{
            backgroundColor: backgroundColor,
            height: scrollEnabled ? "100%" : "100%",
          }}
        >
          {showLogo && (
            <View style={[globalStyles.whiteBackgroundColor, styles.logoView]}>
              <Logo
                style={styles.logo}
                width={heightPercentageToDP(10)}
                height={heightPercentageToDP(10)}
              />
              <Image
                source={{ uri: ImageUrl }}
                style={{
                  width: heightPercentageToDP(10),
                  height: heightPercentageToDP(10),
                }}
                resizeMode="contain"
              />
            </View>
          )}
          {showCompanyName && (
            <View style={globalStyles.whiteBackgroundColor}>
              <Text style={styles.companyNameText}>
                {translate("Optimize Advertising & Marketing Company Wll")}
              </Text>
            </View>
          )}
          {/* <Content
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            // padder
          > */}
          <WebView
            // startInLoadingState={true}
            onLoadStart={() => {
              console.log("loading started");
            }}
            onLoad={() => this.hideLoader()}
            startInLoadingState={true}
            androidHardwareAccelerationDisabled={true}
            style={{
              //   marginTop: -((screen.width / screen.height) * 315),
              height: "100%",
            }}
            ref={(ref) => (this.webview = ref)}
            source={{
              uri: url,
            }}
            cacheEnabled={false}
            incognito={true}
            scrollEnabled={scrollEnabled}
            injectedJavaScript={runFirst}
            onMessage={this.onMessage}
            // renderLoading={() => (
            //   <View
            //     style={{
            //       height: "100%",
            //       backgroundColor: "red",
            //     }}
            //   >
            //     <Loading top={40} />
            //   </View>
            // )}
          />
          {this.state.viewLoader && (
            <View
              style={{
                height: "100%",
                backgroundColor: backgroundColor,
                marginTop: "20%",
              }}
            >
              <ActivityIndicator
                color={globalColors.purple}
                // size={75}
                style={{
                  transform: [{ scale: 3 }],
                }}
              />
            </View>
          )}
          {/* </Content> */}
        </ScrollView>
      </View>
    );
  }
}
