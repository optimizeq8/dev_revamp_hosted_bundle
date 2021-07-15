if (__DEV__) {
  import("./ReactotronConfig");
}
import React from "react";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import {
  StatusBar,
  Platform,
  StyleSheet,
  View,
  Animated,
  Text as TextReactNative,
  I18nManager,
  AppState,
  ActivityIndicator,
  Linking,
} from "react-native";
import RNRestart from "react-native-restart";

import Intercom from "react-native-intercom";
import analytics from "@segment/analytics-react-native";
import AdjustIntegration from "@segment/analytics-react-native-adjust";
import { getUniqueId } from "react-native-device-info";
TextReactNative.defaultProps = TextReactNative.defaultProps || {};
TextReactNative.defaultProps.allowFontScaling = false;
import RNAdvertisingId from "react-native-advertising-id";

import { Label, Text, Input } from "native-base";
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

Label.defaultProps = Label.defaultProps || {};
Label.defaultProps.allowFontScaling = true;

Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = true;

import { TextInputMask } from "react-native-masked-text";

TextInputMask.defaultProps = TextInputMask.defaultProps || {};
TextInputMask.defaultProps.allowFontScaling = false;
import { showMessage } from "react-native-flash-message";

import { LinearGradient } from "expo-linear-gradient";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import NavigationService from "./NavigationService";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import "react-native-gesture-handler";

import * as actionCreators from "./store/actions";

import AppNavigator from "./components/Navigation";
import { Provider } from "react-redux";
import { Root } from "native-base";
import isNull from "lodash/isNull";

// console.disableYellowBox = true;
import store from "./store";
import FlashMessage from "react-native-flash-message";

//icons
// import PurpleLogo from "./assets/SVGs/PurpleLogo";
import { REHYDRATE } from "redux-persist";
import { PESDK } from "react-native-photoeditorsdk";
import { VESDK } from "react-native-videoeditorsdk";
import RNBootSplash from "react-native-bootsplash";
import * as Sentry from "@sentry/react-native";
if (!__DEV__) {
  Sentry.init({
    dsn: "https://e05e68f510cd48068b314589fa032992@sentry.io/1444635",
  });
}
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from "lottie-react-native";
import Mixpanel from "@segment/analytics-react-native-mixpanel";
//DEV TOKEN FOR MIXPANEL ====> c9ade508d045eb648f95add033dfb017
//LIVE TOKEN FOR MIXPANEL ====> ef78d7f5f4160b74fda35568224f6cfa
// analytics.getAnonymousId().then((id) => MixpanelSDK.identify(id));
// Sentry.captureException(new Error("Oops!"));
// crash;
import { enableScreens } from "react-native-screens";
import MaskedView from "@react-native-community/masked-view";
import Logo from "./assets/Logo.svg";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Notifications as RNNotifications } from "react-native-notifications";
import { globalColors } from "./GlobalStyles";
import { IDFA } from "react-native-idfa";
import {
  getTrackingStatus,
  requestTrackingPermission,
} from "react-native-tracking-transparency";

const defaultErrorHandler = ErrorUtils.getGlobalHandler();

const myErrorHandler = (e, isFatal) => {
  // e: the error thrown
  if (isFatal) {
    if (store.getState().transA.walletUsed) {
      if (store.getState().campaignC.campaign_id !== "") {
        store.dispatch(
          actionCreators.removeWalletAmount(
            store.getState().campaignC.campaign_id
          )
        );
      }
    }
    if (!__DEV__) {
      let userInfo =
        store.getState().auth.userInfo || store.getState().register.userInfo;
      if (userInfo) Sentry.setUser(userInfo);
      Sentry.captureException(e);
    }
    // store.dispatch(actionCreators.logout(NavigationService));
  }
  // isFatal: if the error is fatal and will kill the app
  // define your code here...
  // after all, if you want to forward to default error handler
  // just call the variable we stored in the previous step
  defaultErrorHandler(e, isFatal);
};
// i18n.fallbacks = true;
// i18n.translations = { ar, en };
ErrorUtils.setGlobalHandler(myErrorHandler);
//don't think we can get back the trial version once this was triggered
if (!__DEV__) PESDK.unlockWithLicense(require("./img.ly/pesdk_license"));
if (!__DEV__) VESDK.unlockWithLicense(require("./img.ly/vesdk_license"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      splashAnimation: new Animated.Value(0),
      splashFadeAnimation: new Animated.Value(0.01),
      splashAnimationComplete: false,
      isAppReady: false,
      currentScreen: "",
      appState: AppState.currentState,
      prevAppState: AppState.currentState,
      anonymous_userId: "",
      translateY: new Animated.Value(1),
      bootSplashIsVisible: true,
      bootSplashLogoIsLoaded: false,
      notificationData: null,
      mounted: false,
      loadingProgress: new Animated.Value(0),
      animDone: false,
      // locale: Localization.locale.includes("ar") ? "ar" : "en"
    };
    this.interval = null;
    // Instruct SplashScreen not to hide yet
    // SplashScreen.preventAutoHide();
    // FOR TEST ORG & PROJ ==> hNRRGVYYOxFiMXboexCvtPK7PSy2NgHp
    // FOR DEV ENVIRONMENT ==> fcKWh6YqnzDNtVwMGIpPOC3bowVHXSYh
    // FOR PROD EENV ==> ExPvBTX3CaGhY27ll1Cbk5zis5FVOJHB
    analytics.setup(
      __DEV__
        ? "fcKWh6YqnzDNtVwMGIpPOC3bowVHXSYh"
        : "ExPvBTX3CaGhY27ll1Cbk5zis5FVOJHB",
      {
        using: [Mixpanel, AdjustIntegration],
        // Record screen views automatically!
        recordScreenViews: true,
        // Record certain application events automatically!
        trackAppLifecycleEvents: true,
        trackAttributionData: true,
        android: {
          flushInterval: 60,
          collectDeviceId: true,
        },
        ios: {
          trackAdvertising: true,
          trackDeepLinks: true,
          trackPushNotifications: true,
        },
        debug: true,
      }
    );
    getTrackingStatus().then((status) => {
      console.log("status", status);
      this.determineTrackingStatus(status);
    });

    RNNotifications.registerRemoteNotifications();
    RNNotifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        if (notification)
          analytics.track("Notification Received", {
            state: "Forground",
            notification: notification.payload,
            business_id:
              store.getState().account.mainBusiness &&
              store.getState().account.mainBusiness.businessid,
          });

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      }
    );

    RNNotifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        if (notification) {
          analytics.track("Notification Opened", {
            notification: notification.payload,
            state: "Background",
            business_id:
              store.getState().account.mainBusiness &&
              store.getState().account.mainBusiness.businessid,
          });
          if (notification.payload.hasOwnProperty("screenName")) {
            NavigationService.navigate(notification.payload.screenName);
          } else if (notification.payload.hasOwnProperty("appUri")) {
            Linking.openURL(notification.payload.appUri);
          } else if (notification.payload.hasOwnProperty("deeplinkType")) {
            let deeplinkType = notification.payload.deeplinkType;
            let campaign_id = notification.payload.campaign_id;

            switch (deeplinkType) {
              case "snapchatCampaignDetail":
                store.dispatch(
                  actionCreators.getCampaignDetails(
                    campaign_id,
                    NavigationService
                  )
                );
                break;
              case "googleCampaignDetail":
                let start_time =
                  handleScreen.notification.request.content.data.start_time;
                let end_time =
                  handleScreen.notification.request.content.data.end_time;
                store.dispatch(
                  actionCreators.get_google_campiagn_details(
                    campaign_id,
                    start_time,
                    end_time,
                    false,
                    {
                      source: "dashboard",
                      source_action: "a_open_campaign_details",
                    }
                  )
                );
                NavigationService.navigate("GoogleCampaignDetails", {
                  campaign: campaign_id,
                  source: "dashboard",
                  source_action: "a_open_campaign_details",
                });
                break;
              case "instagramCampaignDetail":
                store.dispatch(
                  actionCreators.getInstagramCampaignDetails(
                    campaign_id,
                    NavigationService
                  )
                );
                break;
              default:
                break;
            }
          }
        }
        completion();
      }
    );
    // if (Platform.OS === "android") {
    //   if (UIManager.setLayoutAnimationEnabledExperimental) {
    //     UIManager.setLayoutAnimationEnabledExperimental(true);
    //   }
    // }
  }
  determineTrackingStatus = (status) => {
    switch (status) {
      case "not-determined":
        analytics.track("Authorization Status Given", {
          status: "ATTracking Authorization Status Not Determined",
          business_id:
            store.getState().account.mainBusiness &&
            store.getState().account.mainBusiness.businessid,
        });
        requestTrackingPermission().then((status) => {
          determineTrackingStatus(status);
        });
        break;
      case "restricted":
        analytics.track("Authorization Status Given", {
          status: "ATTracking Authorization Status Restricted",
          business_id:
            store.getState().account.mainBusiness &&
            store.getState().account.mainBusiness.businessid,
        });
        break;
      case "denied":
        analytics.track("Authorization Status Given", {
          status: "ATTracking Authorization Status Denied",
          business_id:
            store.getState().account.mainBusiness &&
            store.getState().account.mainBusiness.businessid,
        });
        break;
      case "unavailable":
      case "authorized":
        analytics.track("Authorization Status Given", {
          status: "ATTracking Authorization Status Authorized",
          business_id:
            store.getState().account.mainBusiness &&
            store.getState().account.mainBusiness.businessid,
        });
        IDFA.getIDFA()
          .then((idfa) => {
            analytics.setIDFA(idfa);
            console.log("idfa", idfa);
          })
          .catch((e) => {
            analytics.track("Error Setting IDFA", {
              error_status: e,
              business_id:
                store.getState().account.mainBusiness &&
                store.getState().account.mainBusiness.businessid,
            });
          });

        break;
    }
  };
  _loadAsync = async () => {
    try {
      await this._loadResourcesAsync();
      // this.setState({ isLoadingComplete: true }, () => {
      this._registerForPushNotificationsAsync();
      // this._animateOut();
      // });
      // mark reasources as loaded
    } catch (e) {
      this._handleLoadingError(e);
    } finally {
      this._handleFinishLoading();
    }
  };
  setLocale = (locale) => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };
  componentDidMount() {
    enableScreens();
    // Linking.addEventListener("url", this.handleDeeplink);

    RNBootSplash.hide();

    analytics.getAnonymousId().then((anonId) => {
      this.setState({
        anonymous_userId: anonId,
      });
    });

    persistor.dispatch({ type: REHYDRATE });

    this._loadAsync();
    store.dispatch(actionCreators.checkForExpiredToken(NavigationService));
    AppState.addEventListener("change", this._handleAppStateChange);
    Platform.OS === "ios" && Intercom.registerForPush();

    RNNotifications.events().registerRemoteNotificationsRegistered((event) => {
      Intercom.sendTokenToIntercom(event.deviceToken);
    });
    Intercom.addEventListener(
      Intercom.Notifications.UNREAD_COUNT,
      this._onUnreadChange
    );
    Intercom.setInAppMessageVisibility("GONE");
    this._loadAppLanguage();

    this.interval = setInterval(() => {
      store.dispatch(actionCreators.crashAppForSpamUser());
    }, 300000);

    //       .then(() => this.setState({ isLoadingComplete: true })) // mark reasources as loaded
    //       .catch(error =>
    //         console.error(`Unexpected error thrown when loading:
    // ${error.stack}`)
    //       );
  }
  componentDidUpdate(prevProps, prevState) {
    if (store.getState().auth.userInfo && Platform.OS === "ios") {
      if (
        this.state.mounted !== prevState.mounted &&
        this.state.mounted &&
        this.state.isLoadingComplete &&
        this.navigatorRef &&
        this.state.notificationData
      ) {
        // this._handleNotification(this.state.notificationData);
      }
    }
  }
  handleDeeplink = (url) => {
    Linking.openURL(url.url);
    console.log("URL", url.url);
  };
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      //   analytics.identify(null, { logged_out: false }); // To avoid creating user profile
      Platform.OS === "ios" && RNNotifications.ios.setBadgeCount(0);
      // console.log("App has come to the foreground!");
    }
    this.setState({
      prevAppState: this.state.appState,
      appState: nextAppState,
    });
  };

  _handleNotification = async (handleScreen) => {
    console.log("handleScreen app", JSON.stringify(handleScreen, null, 2));
    // console.log(handleScreen.notification.request.content.data.screenName);
    this.setState({ notificationData: handleScreen });
    if (handleScreen.data) {
      store.dispatch(
        actionCreators.checkNotification(
          "recieved",
          JSON.stringify(handleScreen.data)
        )
      );
      if (
        handleScreen.data.screenName === "Messenger" ||
        handleScreen.data.screenName === "MessengerLoading"
      ) {
        store.dispatch(actionCreators.set_as_seen(false));

        if (AppState.currentState !== "active")
          NavigationService.navigate("Messenger");
        else if (
          // this.state.currentScreen !== "MessengerLoading" ||
          this.state.currentScreen !== "Messenger"
        ) {
          // console.log("currentScreen", this.state.currentScreen);

          store.dispatch(actionCreators.set_as_seen(false));
          showMessage({
            message: "Support Chat",
            description: handleScreen.data.message,
            type: "default",
            backgroundColor: "#FF9D00",
            color: "#fff",
            position: "top",
            // onPress: () => {
            //   NavigationService.navigate(handleScreen.data.screenName);
            // }
          });
        }
      }
    } else if (
      handleScreen.notification.request.content.data.hasOwnProperty(
        "screenName"
      ) &&
      this.state.mounted
    ) {
      if (
        handleScreen.notification.request.content.data.hasOwnProperty("adType")
      ) {
        store.dispatch(
          actionCreators.set_adType(
            handleScreen.notification.request.content.data.adType
          )
        );
      }
      if (
        handleScreen.notification.request.content.data.hasOwnProperty(
          "deeplinkType"
        )
      ) {
        let deeplinkType =
          handleScreen.notification.request.content.data.deeplinkType;
        let campaign_id =
          handleScreen.notification.request.content.data.campaign_id;

        switch (deeplinkType) {
          case "snapchatCampaignDetail":
            store.dispatch(
              actionCreators.getCampaignDetails(campaign_id, NavigationService)
            );
            break;
          case "googleCampaignDetail":
            let start_time =
              handleScreen.notification.request.content.data.start_time;
            let end_time =
              handleScreen.notification.request.content.data.end_time;
            store.dispatch(
              actionCreators.get_google_campiagn_details(
                campaign_id,
                start_time,
                end_time,
                false,
                {
                  source: "dashboard",
                  source_action: "a_open_campaign_details",
                }
              )
            );
            NavigationService.navigate("GoogleCampaignDetails", {
              campaign: campaign_id,
              source: "dashboard",
              source_action: "a_open_campaign_details",
            });
            break;
          case "instagramCampaignDetail":
            store.dispatch(
              actionCreators.getInstagramCampaignDetails(
                campaign_id,
                NavigationService
              )
            );
            break;
          default:
            break;
        }
      } else
        NavigationService.navigate(
          handleScreen.notification.request.content.data.screenName
        );
      this.setState({ notificationHandled: true });
    }

    if (handleScreen.origin === "received") {
      Platform.OS === "ios" && RNNotifications.ios.setBadgeCount(0);
    }
    if (handleScreen.origin === "selected") {
      store.dispatch(
        actionCreators.checkNotification(
          "Pressed notification",
          JSON.stringify(handleScreen.data)
        )
      );
    }
    //   this.setState({
    //     uploadMediaDifferentDeviceModal: false,
    //     uploadMediaNotification: uploadMediaNotification,
    //     downloadMediaModal: true
    //     // media: uploadMediaNotification.data.media,
    //     // type: uploadMediaNotification.data.media_type.includes("video")
    //     //   ? "VIDEO"
    //     //   : "IMAGE"
    //   });
    //   this.props.getWebUploadLinkMedia(this.props.campaign_id);
    // }
  };
  _registerForPushNotificationsAsync = async () => {
    // const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    // if (permission.status !== "granted") {
    //   const newPermission = await Permissions.askAsync(
    //     Permissions.NOTIFICATIONS
    //   );
    // }
    // else {
    // let anonId = getUniqueId();
    // let token = await Notifications.getDevicePushTokenAsync();
    // if (Platform.OS === "android") {
    //   analytics.identify(anonId, { $android_devices: [token.data] });
    // } else {
    //   analytics.identify(anonId, { $ios_devices: [token.data] });
    // }
    // }
  };

  componentWillUnmount() {
    Intercom.removeEventListener(
      Intercom.Notifications.UNREAD_COUNT,
      this._onUnreadChange
    );
    clearInterval(this.interval);
    AppState.removeEventListener("change", this._handleAppStateChange);
    // Adjust.componentWillUnmount();
  }
  _onUnreadChange = (data) => {
    RNNotifications.ios.setBadgeCount(data.count);
    store.dispatch(actionCreators.setCounterForUnreadMessage(data.count));
  };
  getCurrentRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    if (navigationState.index === -1) return null;

    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    // console.log("routes", route.routes);
    // console.log("routes", route);
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  };

  renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    let opacityNeg = {
      opacity: this.state.loadingProgress.interpolate({
        inputRange: [0, 25, 50],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",
      }),
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };
    const prefix = "optimize://";
    let opacity = {
      opacity: this.state.loadingProgress.interpolate({
        inputRange: [0, 25, 50],
        outputRange: [0, 0, 1],
        extrapolate: "clamp",
      }),
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            style={{
              backgroundColor: "transparent",
              marginTop: 0,
              paddingTop: 0,
            }}
          />
          <View style={styles.gradient} />
          {/* <LinearGradient
            // colors={["#9300FF", "#5600CB"]}
            colors={[globalColors.bluegem, globalColors.bluegem]}
            locations={[0, 1]}
            style={styles.gradient}
          /> */}

          {!this.state.animDone && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                position: "absolute",
                alignSelf: "center",
                width: "100%",
              }}
            >
              <Animated.View
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    alignSelf: "center",
                  },
                  opacityNeg,
                ]}
              >
                <View //To block the animations edge since its a diiferent shade of color
                  style={{
                    backgroundColor: "#5410BF",
                    top: 0,
                    width: "100:%",
                    height: "10%",
                    position: "absolute",
                    zIndex: 1,
                  }}
                />
                <LottieView
                  ref={(animation) => {
                    this.animation = animation;
                  }}
                  backgroundColor="#5511bf"
                  resizeMode="contain"
                  source={require("./assets/animation/NewLogoAnimation.json")}
                  onAnimationFinish={() =>
                    Animated.timing(this.state.loadingProgress, {
                      toValue: 100,
                      duration: 500,
                      useNativeDriver: true,
                      delay: 200,
                    }).start(() => {
                      this.setState({ animDone: true });
                    })
                  }
                  duration={4000}
                  autoPlay={false}
                  loop={false}
                />
                <View //To block the animations edge sinze its a diiferent shade of color
                  style={{
                    backgroundColor: "#5410BF",
                    bottom: 0,
                    width: "100:%",
                    height: "10%",
                    position: "absolute",
                    zIndex: 1,
                  }}
                />
                {/* <Logo width={1000} /> */}
              </Animated.View>
            </View>
          )}
          <Animated.View
            onLayout={() => this.setState({ mounted: true })}
            style={[styles.container, opacity]}
          >
            <SafeAreaProvider>
              {this.state.isLoadingComplete && (
                <Root>
                  <AppNavigator
                    onNavigationStateChange={(prevState, currentState) => {
                      const currentScreen =
                        this.getCurrentRouteName(currentState);
                      this.setState({ currentScreen });
                      // console.log("screeen name", currentScreen);
                    }}
                    uriPrefix={prefix}
                    ref={(navigatorRef) => {
                      this.navigatorRef = navigatorRef;
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                    screenProps={{
                      translate: this.t,
                      locale: this.state.locale,
                      setLocale: this.setLocale,
                      device_id: getUniqueId(),
                      anonymous_userId: this.state.anonymous_userId,
                      prevAppState: this.state.prevAppState,
                    }}
                  />
                  <FlashMessage
                    icon="auto"
                    duration={4000}
                    position={"top"}
                    floating={true}
                  />
                </Root>
              )}
            </SafeAreaProvider>
          </Animated.View>
          {/* </MaskedView> */}
        </PersistGate>
      </Provider>
    );
  }

  _loadAppLanguage = async () => {
    const mobileLanguage = Localization.locale;
    const appLanguage = await AsyncStorage.getItem("appLanguage");

    if (isNull(appLanguage)) {
      if (mobileLanguage.includes("ar")) {
        await store.dispatch(actionCreators.getLanguageListPOEdit("ar"));
        AsyncStorage.setItem("appLanguage", "ar").then(() => {
          RNRestart.Restart();
        });
        this.setState({
          locale: "ar",
        });

        // for proper RTL direction
      } else {
        await store.dispatch(actionCreators.getLanguageListPOEdit("en"));
        this.setState({
          locale: "en",
        });
        // i18n.translations = { [store.getState().language.phoneLanguage]: store.getState().language.terms };
      }
    } else {
      await store.dispatch(actionCreators.getLanguageListPOEdit(appLanguage));
      this.setState({
        locale: appLanguage,
      });
    }
    // console.log(
    //   "store.getState().language.phoneLanguage",
    //   store.getState().language.phoneLanguage
    // );

    // i18n.translations = {
    //   [store.getState().language.phoneLanguage]: store.getState().language.terms
    // };
  };
  _loadResourcesAsync = async () => {
    const images = [require("./assets/images/splash.png")];
    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );

    return Promise.all([
      cacheImages,
      Asset.loadAsync([require("./assets/images/logo01.png")]),
      Asset.loadAsync([require("./assets/images/logo02.png")]),

      Asset.loadAsync([require("./assets/images/tutorial/tutorial-1.png")]),
      Asset.loadAsync([require("./assets/images/tutorial/tutorial-2.png")]),
      Asset.loadAsync([require("./assets/images/tutorial/tutorial-3.png")]),
      Asset.loadAsync([require("./assets/images/tutorial/tutorial-4.png")]),
      Asset.loadAsync([require("./assets/images/GooglePhoneBG.png")]),
      Asset.loadAsync([require("./assets/images/GoogleSearchBar.png")]),

      Asset.loadAsync([require("./assets/images/knet.png")]),
      Asset.loadAsync([require("./assets/images/mastercard.png")]),

      Font.loadAsync({
        "montserrat-regular-arabic": require("./assets/fonts/Arabic/Changa-Regular.ttf"),
        "changa-bold-arabic": require("./assets/fonts/Arabic/Changa-Bold.ttf"),
        "montserrat-regular-english": require("./assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-medium-english": require("./assets/fonts/Montserrat-Medium.ttf"),
        "montserrat-bold-english": require("./assets/fonts/Montserrat-Bold.ttf"),
        "montserrat-light-english": require("./assets/fonts/Montserrat-Light.ttf"),
        "montserrat-semibold-english": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "montserrat-regular": I18nManager.isRTL
          ? require("./assets/fonts/Arabic/Changa-Regular.ttf")
          : require("./assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-light": I18nManager.isRTL
          ? require("./assets/fonts/Arabic/Changa-Light.ttf")
          : require("./assets/fonts/Montserrat-Light.ttf"),
        "montserrat-medium": I18nManager.isRTL
          ? require("./assets/fonts/Arabic/Changa-Medium.ttf")
          : require("./assets/fonts/Montserrat-Medium.ttf"),
        "montserrat-semibold": I18nManager.isRTL
          ? require("./assets/fonts/Arabic/Changa-SemiBold.ttf")
          : require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "montserrat-extralight": I18nManager.isRTL
          ? require("./assets/fonts/Arabic/Changa-ExtraLight.ttf")
          : require("./assets/fonts/Montserrat-ExtraLight.ttf"),
        "montserrat-bold": I18nManager.isRTL
          ? require("./assets/fonts/Arabic/Changa-Bold.ttf")
          : require("./assets/fonts/Montserrat-Bold.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }),
    ]).then(() => {
      //was used to animate the logo
      //  this.anim()
    });
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    this.animation.play(0, 200);
  };
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#0000",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  logoContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#0000",
  },
  logo: {
    width: "35%",
    height: "35%",
    alignSelf: "center",
    resizeMode: "contain",
    top: 10,

    // opacity: this.state.splashAnimation
  },
  text: { color: "#fff" },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: globalColors.bluegem,
  },
});
