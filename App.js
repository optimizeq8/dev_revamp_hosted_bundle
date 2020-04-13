if (__DEV__) {
  import("./ReactotronConfig");
}
import React from "react";
import { connect } from "react-redux";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import {
  StatusBar,
  Platform,
  StyleSheet,
  View,
  Animated,
  Image,
  Text as TextReactNative,
  I18nManager,
  AppState,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import segmentEventTrack from "./components/segmentEventTrack";

TextReactNative.defaultProps = TextReactNative.defaultProps || {};
TextReactNative.defaultProps.allowFontScaling = false;

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

import {
  AppLoading,
  Linking,
  SplashScreen,
  Notifications,
  Updates
} from "expo";
import { LinearGradient } from "expo-linear-gradient";
import * as Permissions from "expo-permissions";
import * as Segment from "expo-analytics-segment";
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import NavigationService from "./NavigationService";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

import * as actionCreators from "./store/actions";

import AppNavigator from "./components/Navigation";
import { Provider } from "react-redux";
import { Icon as BIcon, Root } from "native-base";
import isNull from "lodash/isNull";

// console.disableYellowBox = true;
import store from "./store";
import FlashMessage from "react-native-flash-message";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

//icons
import PurpleLogo from "./assets/SVGs/PurpleLogo";
import { colors } from "./components/GradiantColors/colors";
import { REHYDRATE } from "redux-persist";
import { PESDK } from "react-native-photoeditorsdk";
import { Adjust, AdjustEvent, AdjustConfig } from "react-native-adjust";

import * as Sentry from "@sentry/react-native";
if (!__DEV__) {
  Sentry.init({
    dsn: "https://e05e68f510cd48068b314589fa032992@sentry.io/1444635"
  });
}
// Sentry.captureException(new Error("Oops!"));
// crash;

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
if (!__DEV__) PESDK.unlockWithLicense(require("./pesdk_license"));
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
      appState: AppState.currentState
      // locale: Localization.locale.includes("ar") ? "ar" : "en"
    };
    // Instruct SplashScreen not to hide yet
    SplashScreen.preventAutoHide();
    const adjustConfig = new AdjustConfig(
      "c698tyk65u68",
      // !__DEV__
      // ? AdjustConfig.EnvironmentProduction
      AdjustConfig.EnvironmentSandbox
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);
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
  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };
  async componentDidMount() {
    Segment.initialize({
      androidWriteKey: "A2VWqYBwmIPRr02L6Sqrw9zDwV0YYrOi",
      iosWriteKey: "A2VWqYBwmIPRr02L6Sqrw9zDwV0YYrOi"
    });
    persistor.dispatch({ type: REHYDRATE });

    this._loadAsync();
    store.dispatch(actionCreators.checkForExpiredToken());
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    AppState.addEventListener("change", this._handleAppStateChange);

    //       .then(() => this.setState({ isLoadingComplete: true })) // mark reasources as loaded
    //       .catch(error =>
    //         console.error(`Unexpected error thrown when loading:
    // ${error.stack}`)
    //       );
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      Platform.OS === "ios" && Notifications.setBadgeNumberAsync(0);
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
    this.setState({ appState: nextAppState });
  };

  _handleNotification = async handleScreen => {
    segmentEventTrack("Notification received");
    console.log("handleScreen app", handleScreen);
    store.dispatch(
      actionCreators.checkNotification(
        "recieved",
        JSON.stringify(handleScreen.data)
      )
    );
    if (handleScreen.data) {
      if (handleScreen.data.screenName === "MessengerLoading") {
        store.dispatch(actionCreators.set_as_seen(false));

        if (AppState.currentState !== "active")
          NavigationService.navigate(handleScreen.data.screenName);
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
            position: "top"
            // onPress: () => {
            //   NavigationService.navigate(handleScreen.data.screenName);
            // }
          });
        }
      }
    }

    if (handleScreen.origin === "received") {
      Platform.OS === "ios" && Notifications.setBadgeNumberAsync(0);
    }
    if (handleScreen.origin === "selected") {
      store.dispatch(
        actionCreators.checkNotification(
          "Pressed notification",
          JSON.stringify(handleScreen.data)
        )
      );

      segmentEventTrack("Pressed notification");
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
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    Adjust.componentWillUnmount();
  }

  getCurrentRouteName = navigationState => {
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
    if (!this.state.isLoadingComplete) {
      return (
        <>
          {/* <View
            style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}
          /> */}
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onFinish={() => {
              this.setState({ isLoadingComplete: true });
            }}
            autoHideSplash={true}
            // onError={console.warn}
          />
          {/* <View
            style={{
              flex: 1
            }}
          >
            <Image
              source={require("./assets/images/splash.png")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                resizeMode: "cover"
                // opacity: this.state.splashAnimation.interpolate({
                //   inputRange: [0, 1],
                //   outputRange: [0, 1]
                // })
              }}
              onLoadEnd={() => {
                // wait for image's content to fully load [`Image#onLoadEnd`] (https://facebook.github.io/react-native/docs/image#onloadend)
                console.log("Image#onLoadEnd: hiding SplashScreen");
                SplashScreen.hide(); // Image is fully presented, instruct SplashScreen to hide
              }}
              fadeDuration={0}
            />
          </View>
         */}
        </>
      );
    }
    {
      const prefix = Linking.makeUrl("/");

      return (
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={this.renderLoading()}>
            <StatusBar
              barStyle="light-content"
              translucent={true}
              style={{
                backgroundColor: "transparent",
                marginTop: 0,
                paddingTop: 0
              }}
            />
            <LinearGradient
              colors={["#6200FF", "#8900FF"]}
              locations={[1, 0.3]}
              style={styles.gradient}
            />
            <View
              style={{
                backgroundColor: "transparent",
                marginTop: 0,
                paddingTop: 0
              }}
            />
            <View style={styles.container}>
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
                  ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                  screenProps={{
                    translate: this.t,
                    locale: this.state.locale,
                    setLocale: this.setLocale
                  }}
                />
              </Root>
            </View>
            <FlashMessage icon="auto" duration={4000} position="top" />
          </PersistGate>
          {/* {this._maybeRenderLoadingImage()} */}
        </Provider>
      );
    }
  }
  _maybeRenderLoadingImage = () => {
    if (this.state.splashAnimationComplete) {
      return null;
    }

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          opacity: this.state.splashFadeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        }}
      >
        <Animated.Image
          source={require("./assets/images/MainSplashempty.png")}
          style={{
            width: undefined,
            height: undefined,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            resizeMode: "cover"
            // opacity: this.state.splashAnimation.interpolate({
            //   inputRange: [0, 1],
            //   outputRange: [0, 1]
            // })
          }}
          onLoadEnd={this._animateOut}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: "61%",
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            opacity: this.state.splashAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            }),
            transform: [
              {
                translateY: this.state.splashAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }
            ]
          }}
        >
          <PurpleLogo
            width={heightPercentageToDP(20)}
            height={heightPercentageToDP(20)}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  _animateOut = () => {
    SplashScreen.hide();
    Animated.sequence([
      Animated.timing(this.state.splashAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.splashFadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start(() => {
      this.setState({ splashAnimationComplete: true });
    });
  };
  _loadAppLanguage = async () => {
    const mobileLanguage = Localization.locale;
    const appLanguage = await AsyncStorage.getItem("appLanguage");
    if (isNull(appLanguage)) {
      if (mobileLanguage.includes("ar")) {
        await store.dispatch(actionCreators.getLanguageListPOEdit("ar"));
        this.setState({
          locale: "ar"
        });
        // for proper RTL direction
        Updates.reload();
      } else {
        await store.dispatch(actionCreators.getLanguageListPOEdit("en"));
        this.setState({
          locale: "en"
        });
        // i18n.translations = { [store.getState().language.phoneLanguage]: store.getState().language.terms };
      }
    } else {
      await store.dispatch(actionCreators.getLanguageListPOEdit(appLanguage));
      this.setState({
        locale: appLanguage
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
    await this._loadAppLanguage();
    const images = [require("./assets/images/splash.png")];
    const cacheImages = images.map(image =>
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
      Asset.loadAsync([require("./assets/images/MainSplash.png")]),

      Asset.loadAsync([require("./assets/images/knet.png")]),
      Asset.loadAsync([require("./assets/images/mastercard.png")]),
      Asset.loadAsync([require("./assets/splash.png")]),
      Asset.loadAsync([require("./assets/images/AdTypes/SnapAd.gif")]),
      Asset.loadAsync([require("./assets/images/AdTypes/StoryAd.gif")]),
      Asset.loadAsync([require("./assets/images/AdTypes/CollectionAd.gif")]),

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
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
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
    justifyContent: "center"
  },

  text: { color: "#fff" },

  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});
