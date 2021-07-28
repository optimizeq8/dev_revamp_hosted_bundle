import React, { Component } from "react";
import WebView from "react-native-webview";

import {
  ActivityIndicator,
  View,
  I18nManager,
  BackHandler,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card, Container } from "native-base";
import analytics from "@segment/analytics-react-native";
import SafeAreaView from "react-native-safe-area-view";

import CustomHeader from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";
import Input from "../../MiniComponents/InputFieldNew";

import Snapchat from "../../../assets/SVGs/Snapchat-Border";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";

class SnapchatCreateAdAcc extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      accept: false,
      is_political: null,
      paying_advertiser_name: "",
      paying_advertiser_nameError: false,
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

    analytics.track(`Screen Viewed`, {
      screen_name: "SnapchatCreateAdAcc",
      source,
      source_action,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  setValue = (stateName1, value) => {
    this.setState({
      [stateName1]: value,
    });
  };
  getValidInfo = (stateName1Error, value) => {
    this.setState({
      [stateName1Error]: value,
    });
  };
  acceptTNC = () => {
    const { translate } = this.props.screenProps;
    // To validate the paying advertiser name should not be blank id it going to be political account
    analytics.track("Button Pressed", {
      button_type: "Accepting Terms and Conditions for Snapchat",
      button_content: "ACCEPT",
      source: "SnapchatCreateAdAcc",
    });
    if (this.state.is_political === null) {
      analytics.track("Form Error Made", {
        source: "SnapchatCreateAdAcc",
        error_description:
          "Please confirm if your ad account will be used for political and advocacy or not",
        campaign_channel: "snapchat",
      });
      showMessage({
        type: "warning",
        message: translate(
          "Please confirm if your ad account will be used for political and advocacy or not"
        ),
      });
    } else if (this.state.is_political) {
      if (this.state.paying_advertiser_name === "") {
        analytics.track("Form Error Made", {
          source: "SnapchatCreateAdAcc",
          error_description: "Please enter paying advertiser name",
          campaign_channel: "snapchat",
        });
        this.setState({
          paying_advertiser_nameError: "Please enter paying advertiser name",
        });
        showMessage({
          type: "warning",
          message: translate("Please enter paying advertiser name"),
        });
      } else {
        this.props.navigation.navigate("AcceptTermsConditionLoading", {
          source: "SnapchatCreateAdAcc",
          source_action: "a_accept_ad_terms&conditions",
        });
        this.props.create_snapchat_ad_account(
          {
            businessid: this.props.mainBusiness.businessid,
            is_political: 1,
            paying_advertiser_name: this.state.paying_advertiser_name,
          },
          this.props.navigation
        );
      }
    } else {
      this.props.navigation.navigate("AcceptTermsConditionLoading", {
        source: "SnapchatCreateAdAcc",
        source_action: "a_accept_ad_terms&conditions",
      });
      this.props.create_snapchat_ad_account(
        {
          businessid: this.props.mainBusiness.businessid,
          is_political: this.state.is_political ? 1 : 0,
          paying_advertiser_name: this.state.is_political
            ? this.state.paying_advertiser_name
            : null,
        },
        this.props.navigation
      );
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    const { is_political } = this.state;
    return (
      <SafeAreaView
        style={{
          height: "100%",
          flex: 1,
          backgroundColor: "#0000",
        }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
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

          <Snapchat fill={"#000"} style={{ alignSelf: "center", margin: 15 }} />
          <View style={styles.questionView}>
            <Text style={styles.questionText}>
              {translate(
                "Will you use this ad account for political and advocacy?"
              )}
              *
            </Text>
            <View style={styles.radioView}>
              <TouchableOpacity
                style={[styles.answerRadio]}
                onPress={() => {
                  this.setState({
                    is_political: true,
                  });
                }}
              >
                {is_political && <View style={styles.answerRadioSelect} />}
              </TouchableOpacity>
              <Text style={[styles.answerText]}>{translate("Yes")}</Text>
            </View>
            <View style={styles.radioView}>
              <TouchableOpacity
                style={[styles.answerRadio]}
                onPress={() => {
                  this.setState({
                    is_political: false,
                  });
                }}
              >
                {is_political !== null && !is_political && (
                  <View style={styles.answerRadioSelect} />
                )}
              </TouchableOpacity>
              <Text style={[styles.answerText]}>{translate("No")}</Text>
            </View>
            {/* <Switch
              trackColor={{ false: "#FFF", true: "#FFF" }}
              ios_backgroundColor="#3e3e3e"
              thumbColor={is_political ? globalColors.orange : "#f8f8f8"}
              value={is_political}
              onValueChange={(val) => {
                this.setState({
                  is_political: val,
                  paying_advertiser_name: !val
                    ? ""
                    : this.state.paying_advertiser_name,
                });
              }}
            /> */}
          </View>
          {is_political && (
            <Input
              translate={this.props.screenProps.translate}
              label={"Paying Advertiser Name"}
              value={this.state.paying_advertiser_name}
              placeholder1={"Please enter paying advertiser name"}
              customStyles={{ width: "95%" }}
              stateName1={"paying_advertiser_name"}
              setValue={this.setValue}
              getValidInfo={this.getValidInfo}
              incomplete={true}
            />
          )}
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
              <GradientButton
                // disabled={!this.state.accept}
                style={[styles.button]}
                onPressAction={this.acceptTNC}
                uppercase
                radius={50}
                text={translate("Accept")}
              />
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
  create_snapchat_ad_account: (info, navigation) =>
    dispatch(actionCreators.create_snapchat_ad_account(info, navigation)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapchatCreateAdAcc);
