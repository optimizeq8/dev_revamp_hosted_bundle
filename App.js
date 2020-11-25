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
} from "react-native";
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

import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import { LinearGradient } from "expo-linear-gradient";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import NavigationService from "./NavigationService";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

import * as actionCreators from "./store/actions";

import AppNavigator from "./components/Navigation";
import { Provider } from "react-redux";
import { Root } from "native-base";
import isNull from "lodash/isNull";

// console.disableYellowBox = true;
import store from "./store";
import FlashMessage from "react-native-flash-message";
import { heightPercentageToDP } from "react-native-responsive-screen";

//icons
import PurpleLogo from "./assets/SVGs/PurpleLogo";
import { REHYDRATE } from "redux-persist";
import { PESDK } from "react-native-photoeditorsdk";
import { VESDK } from "react-native-videoeditorsdk";
// // import { Adjust, AdjustEvent, AdjustConfig } from "react-native-adjust";
import RNBootSplash from "react-native-bootsplash";

import * as Sentry from "@sentry/react-native";
if (!__DEV__) {
  Sentry.init({
    dsn: "https://e05e68f510cd48068b314589fa032992@sentry.io/1444635",
  });
}
import { MixpanelInstance } from "react-native-mixpanel";
import AsyncStorage from "@react-native-community/async-storage";
import LottieView from "lottie-react-native";

//DEV TOKEN FOR MIXPANEL ====> c9ade508d045eb648f95add033dfb017
//LIVE TOKEN FOR MIXPANEL ====> ef78d7f5f4160b74fda35568224f6cfa
const MixpanelSDK = new MixpanelInstance(
  "c9ade508d045eb648f95add033dfb017",
  false,
  false
);
MixpanelSDK.initialize().then(() => MixpanelSDK.showInAppMessageIfAvailable());
analytics.getAnonymousId().then((id) => MixpanelSDK.identify(id));
// Sentry.captureException(new Error("Oops!"));
// crash;
import { enableScreens } from "react-native-screens";
import MaskedView from "@react-native-community/masked-view";
import Logo from "./assets/Logo.svg";
import { SafeAreaProvider } from "react-native-safe-area-context";
enableScreens();

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
    // const adjustConfig = new AdjustConfig(
    //   "c698tyk65u68",
    //   !__DEV__
    //     ? AdjustConfig.EnvironmentProduction
    //     : AdjustConfig.EnvironmentSandbox
    // );
    // adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    // Adjust.getAdid((adid) => {
    //   console.log("Adid = " + adid);
    // });

    // Adjust.create(adjustConfig);
    // if (Platform.OS === "android") {
    //   if (UIManager.setLayoutAnimationEnabledExperimental) {
    //     UIManager.setLayoutAnimationEnabledExperimental(true);
    //   }
    // }
  }

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
  async componentDidMount() {
    // FOR TEST ORG & PROJ ==> hNRRGVYYOxFiMXboexCvtPK7PSy2NgHp
    // FOR DEV ENVIRONMENT ==> fcKWh6YqnzDNtVwMGIpPOC3bowVHXSYh
    // FOR PROD EENV ==> ExPvBTX3CaGhY27ll1Cbk5zis5FVOJHB
    RNAdvertisingId.getAdvertisingId();
    analytics.setup("fcKWh6YqnzDNtVwMGIpPOC3bowVHXSYh", {
      using: [AdjustIntegration],
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
    });
    await RNBootSplash.hide();

    analytics.getAnonymousId().then((anonId) => {
      this.setState({
        anonymous_userId: anonId,
      });
    });

    persistor.dispatch({ type: REHYDRATE });

    this._loadAsync();
    store.dispatch(actionCreators.checkForExpiredToken(NavigationService));
    this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(
      this._handleNotification
    );
    AppState.addEventListener("change", this._handleAppStateChange);
    Platform.OS === "ios" && Intercom.registerForPush();

    Notifications.getDevicePushTokenAsync()
      .then((token) => {
        Intercom.sendTokenToIntercom(token.data);
      })
      .catch((err) => {});

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
    // to navigate from a deep link from a notification if the app is killed on iOS
    if (store.getState().auth.userInfo && Platform.OS === "ios") {
      if (
        this.state.mounted !== prevState.mounted &&
        this.state.mounted &&
        this.state.isLoadingComplete &&
        this.navigatorRef &&
        this.state.notificationData
      ) {
        this._handleNotification(this.state.notificationData);
      }
    }
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      analytics.track("app_open", {
        userid:
          (store.getState().auth &&
            store.getState().auth.userInfo &&
            store.getState().auth.userInfo.userid) ||
          this.state.anonymous_userId,
        anonymous_userId: this.state.anonymous_userId,
        source: this.state.appState,
        device_id: getUniqueId(),
        context: {
          device: {
            id: getUniqueId(),
            type: Platform.OS,
          },
        },
        timestamp: new Date().getTime(),
      });
      analytics.identify(null, { logged_out: false });
      Platform.OS === "ios" && Notifications.setBadgeCountAsync(0);
      // console.log("App has come to the foreground!");
      if (
        store.getState().auth.userInfo &&
        store.getState().messenger.unread_converstaion === 0
      ) {
        store.dispatch(
          actionCreators.connect_user_to_intercom(
            store.getState().auth.userInfo.userid
          )
        );
        store.dispatch(
          actionCreators.update_app_status_chat_notification(true)
        );
      }
    } else {
      // console.log("App has come to the background!");

      store.dispatch(actionCreators.update_app_status_chat_notification(false));
    }
    this.setState({
      prevAppState: this.state.appState,
      appState: nextAppState,
    });
  };

  _handleNotification = async (handleScreen) => {
    // console.log("handleScreen app", JSON.stringify(handleScreen, null, 2));
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
      Platform.OS === "ios" && Notifications.setBadgeCountAsync(0);
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
    const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
    }
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
    Notifications.setBadgeCountAsync(data.count);
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
          <LinearGradient
            colors={["#9300FF", "#5600CB"]}
            locations={[0, 1]}
            style={styles.gradient}
          />
          <View
            style={{
              backgroundColor: "transparent",
              marginTop: 0,
              paddingTop: 0,
            }}
          />
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
                <LottieView
                  ref={(animation) => {
                    this.animation = animation;
                  }}
                  resizeMode="contain"
                  source={require("./assets/animation/LogoAnimation.json")}
                  onAnimationFinish={() =>
                    Animated.timing(this.state.loadingProgress, {
                      toValue: 100,
                      duration: 1000,
                      useNativeDriver: true,
                      delay: 400,
                    }).start(() => {
                      this.setState({ animDone: true });
                    })
                  }
                  autoPlay={false}
                  loop={false}
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
                      const currentScreen = this.getCurrentRouteName(
                        currentState
                      );
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
        this.setState({
          locale: "ar",
        });
        // for proper RTL direction
        Updates.reload();
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
    console.log("started", new Date().getSeconds());
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
      console.log("Finished", new Date().getSeconds());
    });
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    this.animation.play(70, 200);
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
  },
});
