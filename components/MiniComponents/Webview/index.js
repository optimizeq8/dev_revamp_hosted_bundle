import React, { Component } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";
import CustomHeader from "../Header";
import { Container, Content } from "native-base";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import Loading from "../LoadingScreen";
export default class index extends Component {
  render() {
    let url = this.props.navigation.getParam("url", "");
    let title = this.props.navigation.getParam("title", "");
    return (
      <SafeAreaView
        style={styles.mainSafeArea}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={["#751AFF", "#6268FF"]}
          locations={[0.3, 1]}
          style={styles.gradient}
        />
        <Container style={styles.container}>
          <CustomHeader navigation={this.props.navigation} title={title} />
          <Content
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            padder
          >
            <WebView
              startInLoadingState
              renderLoading={() => <Loading dash={true} />}
              style={{ backgroundColor: "#0000" }}
              ref={ref => (this.webview = ref)}
              source={{ uri: url }}
            />
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
