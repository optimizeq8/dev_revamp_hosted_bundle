import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
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
import globalStyles from "../../../GlobalStyles";
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
    this.setState({ viewLoader: false });
  };
  render() {
    const { translate } = this.props.screenProps;
    let url = this.props.navigation.getParam("url", "");
    let title = this.props.navigation.getParam("title", "");
    let backgroundColor = this.props.navigation.getParam(
      "backgroundColor",
      "transparent"
    );

    let marginTop = this.props.navigation.getParam("marginTop", 0);
    let showLogo = this.props.navigation.getParam("showLogo", false);
    let scrollEnabled = this.props.navigation.getParam("scrollEnabled", true);
    let showCompanyName = this.props.navigation.getParam(
      "showCompanyName",
      false
    );
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
            height: scrollEnabled ? "150%" : "100%",
          }}
        >
          {showLogo && (
            <View style={globalStyles.whiteBackgroundColor}>
              <Logo
                style={{ alignSelf: "center", marginVertical: 10 }}
                width={heightPercentageToDP(10)}
                height={heightPercentageToDP(10)}
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
            onLoad={() => this.hideLoader()}
            androidHardwareAccelerationDisabled={true}
            // renderLoading={() => (
            //   <View style={{ height: "100%", backgroundColor: "#0000" }}>
            //     <Loading top={40} />
            //   </View>
            // )}
            style={{ backgroundColor: backgroundColor, marginTop: marginTop }}
            contentContainerStyle={{
              backgroundColor: backgroundColor,
            }}
            ref={(ref) => (this.webview = ref)}
            source={{ uri: url }}
            cacheEnabled={false}
            incognito={true}
            scrollEnabled={scrollEnabled}
          />
          {this.state.viewLoader && (
            <View
              style={{
                height: "100%",
                backgroundColor: backgroundColor,
              }}
            >
              <Loading top={40} />
            </View>
          )}
          {/* </Content> */}
        </ScrollView>
      </View>
    );
  }
}
