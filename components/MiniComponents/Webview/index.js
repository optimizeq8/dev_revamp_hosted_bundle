import React, { Component } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import analytics from "@segment/analytics-react-native";
import CustomHeader from "../Header";
import { Container, Content } from "native-base";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import styles from "./styles";
import Loading from "../LoadingScreen";
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
    let url = this.props.navigation.getParam("url", "");
    let title = this.props.navigation.getParam("title", "");

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
            // titelStyle={{ top: 5, left: 0 }}
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
            // startInLoadingState={true}
            onLoad={() => this.hideLoader()}
            // renderLoading={() => (
            //   <View style={{ height: "100%", backgroundColor: "#0000" }}>
            //     <Loading top={40} />
            //   </View>
            // )}
            style={{ backgroundColor: "transparent" }}
            contentContainerStyle={{ backgroundColor: "transparent" }}
            ref={(ref) => (this.webview = ref)}
            source={{ uri: url }}
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
