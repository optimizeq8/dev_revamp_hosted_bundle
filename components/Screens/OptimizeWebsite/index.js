import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  BackHandler,
  Text,
  Image,
  ScrollView,
  I18nManager,
  Platform,
} from "react-native";
// import WebView from "react-native-webview";
import analytics from "@segment/analytics-react-native";
import SafeAreaView from "react-native-safe-area-view";
import { NavigationEvents } from "react-navigation";
import { showMessage } from "react-native-flash-message";

import { LinearGradient } from "expo-linear-gradient";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import BackIcon from "../../../assets/SVGs/BackButton";
import InstagramIcon from "../../../assets/SVGs/InstagarmBlackBg";
import WhatsApp from "../../../assets/SVGs/WhatsappBlackBg";
import PhoneIcon from "../../../assets/SVGs/PhoneBlackBackground";

// Style
import styles from "./styles";
import RegisterForm from "./RegisterForm";
import ProductSelect from "./ProductSelect";
const regsiterSteps = [
  {
    id: 1,
    name: "Details",
  },
  {
    id: 2,
    name: "Products",
  },
  {
    id: 3,
    name: "Done",
  },
];
class OptimizeWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.activeStep === 1) {
      analytics.track(`a_go_back`, {
        source: "my_website_detail",
        source_action: "a_go_back",
        businessid:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
    } else {
      analytics.track(`a_go_back`, {
        source: "my_website_products",
        source_action: "a_go_back",
        businessid:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
    }
    this.props.navigation.navigate("TutorialWeb", {
      source: "my_website_detail",
      source_action: "a_go_back",
    });
    return true;
  };
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`my_website_detail`, {
      source,
      source_action,
      new: true,
      timestamp: new Date().getTime(),
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  submitNextStep = (activeStep) => {
    analytics.track(`a_go_to_my_website_products`, {
      source: "my_website_detail",
      source_action: "a_submit_my_website_detail",
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    this.setState({
      activeStep,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeStep === 1 && this.state.activeStep === 2) {
      analytics.track(`my_website_products`, {
        source: "my_website_detail",
        source_action: "a_submit_my_website_detail",
        timestamp: new Date().getTime(),
        businessid:
          this.props.mainBusiness && this.props.mainBusiness.businessid,
      });
    }
  }
  hideLoader = () => {
    this.setState({ viewLoader: false });
  };
  onDidFocus = () => {
    const { translate } = this.props.screenProps;
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    analytics.track(`my_website_detail`, {
      source,
      source_action,
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    const changeFbConnectStatus = this.props.navigation.getParam(
      "success",
      false
    );
    console.log("changeFbConnectStatus", changeFbConnectStatus);
    const fb_ad_account_id = this.props.navigation.getParam(
      "fb_ad_account_id",
      null
    );
    if (changeFbConnectStatus && changeFbConnectStatus.includes("true")) {
      const instagram_username = this.props.navigation.getParam(
        "instagram_username",
        ""
      );
      showMessage({
        type: "success",
        message: translate(
          `Your Instagram Business Account {{instagram_username}} has been connected successfully!`,
          {
            instagram_username: instagram_username,
          }
        ),
        duration: 5000,
      });
      this.props.updateBusinessConnectedToFacebook({
        fb_connected: "1",
        fb_ad_account_id: fb_ad_account_id,
        insta_handle: instagram_username,
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    const { activeStep } = this.state;
    const { mainBusiness } = this.props;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <View style={styles.headerCardView}>
          <TouchableOpacity
            style={[
              I18nManager.isRTL && {
                transform: [{ rotateY: "180deg" }, { translateX: -13 }],
              },
            ]}
            onPress={this.handleBackPress}
          >
            <BackIcon stroke={"#4CA2E0"} width={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {activeStep === 1 && translate("WEBSITE REGISTRATION")}
            {activeStep === 2 && translate("Add Products")}
          </Text>
          <View style={styles.badgeView}>
            {regsiterSteps.map((step) => {
              return (
                <>
                  <View key={step.id} style={styles.badgeViewInner}>
                    <View
                      style={[
                        styles.stepNoView,
                        activeStep === step.id && styles.activeStepView,
                      ]}
                    >
                      <Text
                        style={[
                          styles.stepNoText,
                          activeStep === step.id && styles.activeStepText,
                        ]}
                      >
                        {step.id}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.stepNameText,
                        activeStep === step.id && styles.activeStepText,
                      ]}
                    >
                      {translate(step.name)}
                    </Text>
                  </View>
                  {step.id !== 3 && <View style={styles.horzintalLine} />}
                </>
              );
            })}
          </View>
        </View>
        <OnlineStoreHome style={styles.onlineStoreHomeIcon} />
        {activeStep === 2 && (
          <View style={styles.livePreviewView}>
            <Text style={styles.livePreviewText}>
              {translate("Live Preview")}
            </Text>
          </View>
        )}
        {/* {Platform.OS === "ios" && ( */}
        <ScrollView
          contentContainerStyle={[
            activeStep === 1 && styles.outerView,
            // activeStep === 2 && styles.step2OuterView
          ]}
        >
          {/* {activeStep === 1 && (
            <LinearGradient
              colors={["#9300FF", "#5600CB"]}
              locations={[0, 0.75]}
              style={styles.gradient}
            />
          )} */}

          {activeStep === 2 && (
            <View style={styles.previewOuterView}>
              {/* <LinearGradient
                colors={["#9300FF", "#5600CB"]}
                locations={[0, 0.75]}
                style={styles.gradient}
              /> */}
              <Image
                style={styles.profileIcon}
                source={{
                  uri: this.props.businessLogo,
                }}
              />
              <Text style={styles.bsnNameText}>
                {this.props.mainBusiness.businessname}
              </Text>
              <View style={styles.socialMediaView}>
                <PhoneIcon width={40} styles={styles.socialMediaIcon} />

                <InstagramIcon width={40} styles={styles.socialMediaIcon} />

                <WhatsApp width={40} styles={styles.socialMediaIcon} />
              </View>
            </View>
          )}
          {activeStep === 1 && (
            <Text style={styles.createWebsiteText}>
              {translate(
                "We’ll create a mini website for your business Just fill in the info below"
              )}
            </Text>
          )}
          {activeStep === 1 && (
            <RegisterForm
              screenProps={this.props.screenProps}
              submitNextStep={this.submitNextStep}
            />
          )}
          {activeStep === 2 && (
            <ProductSelect
              source={"my_website_products"}
              navigation={this.props.navigation}
              screenProps={this.props.screenProps}
            />
          )}
        </ScrollView>
        {/* )} */}
        {/* {activeStep === 1 && Platform.OS === "android" && (
          <WebView
            onLoad={() => this.hideLoader()}
            androidHardwareAccelerationDisabled={true}
            style={{
              backgroundColor: "#0000",

              height: "100%",
              flex: 1,
            }}
            contentContainerStyle={{
              backgroundColor: "#0000",
            }}
            ref={(ref) => (this.webview = ref)}
            source={{
              uri: `https://www.optimizeapp.com/mywebsite?edit=false&businessid=${mainBusiness.businessid}&insta_handle=${mainBusiness.insta_handle}&snapchat_handle=${mainBusiness.snapchat_handle}&callnumber=${mainBusiness.callnumber}&whatsappnumber=${mainBusiness.whatsappnumber}&googlemaplink=${mainBusiness.googlemaplink}&businessname=${mainBusiness.businessname}`,
            }}
            cacheEnabled={false}
            incognito={true}
          />
        )} */}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo,
});

const mapDispatchToProps = (dispatch) => ({
  updateBusinessConnectedToFacebook: (data) =>
    dispatch(actionCreators.updateBusinessConnectedToFacebook(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OptimizeWebsite);
