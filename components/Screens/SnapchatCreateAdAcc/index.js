import React, { Component } from "react";
import WebView from "react-native-webview";

import { View, BackHandler, I18nManager } from "react-native";
import { Card, Button, Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
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

class SnapchatCreateAdAcc extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      accept: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    if (this.props.mainBusiness.snap_ad_account_id) {
      this.props.navigation.navigate("Dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.mainBusiness.snap_ad_account_id) {
      this.props.navigation.getParam("closeAnimation", () => {})();
      this.props.navigation.navigate("Dashboard");
    }
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
          backgroundColor: "#0000"
        }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Snap Ad Account", {
              category: "Sign Up"
            });
          }}
        />
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Dashabord",
              obj: {
                businessname: this.props.mainBusiness.businessname
              }
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
                  : "https://www.snap.com/en-GB/ad-policies"
              }}
              renderLoading={() => <Loading top={40} />}
              style={styles.webview}
              contentContainerStyle={[styles.contentWebView]}
              ref={ref => (this.webview = ref)}
            />

            <View style={styles.bottomContainer}>
              {this.props.loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Button
                  block
                  dark
                  // disabled={!this.state.accept}
                  style={[styles.button]}
                  onPress={() => {
                    this.props.create_snapchat_ad_account(
                      this.props.mainBusiness.businessid,
                      this.props.navigation
                    );
                  }}
                >
                  <Text style={styles.buttontext}>{translate("Accept")}</Text>
                </Button>
              )}
            </View>
          </Card>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  loading: state.account.loading
});

const mapDispatchToProps = dispatch => ({
  create_snapchat_ad_account: (id, navigation) =>
    dispatch(actionCreators.create_snapchat_ad_account(id, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapchatCreateAdAcc);
