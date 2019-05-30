import React from "react";
import { connect } from "react-redux";

import {
  StatusBar,
  Platform,
  StyleSheet,
  View,
  Animated,
  Image,
  Text as TextReactNative
} from "react-native";

TextReactNative.defaultProps = TextReactNative.defaultProps || {};
TextReactNative.defaultProps.allowFontScaling = false;

import { Label, Text, Input } from "native-base";
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

Label.defaultProps = Label.defaultProps || {};
Label.defaultProps.allowFontScaling = false;

Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = false;

import { TextInputMask } from "react-native-masked-text";

TextInputMask.defaultProps = TextInputMask.defaultProps || {};
TextInputMask.defaultProps.allowFontScaling = false;

import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Linking,
  SplashScreen,
  Segment,
  Permissions,
  Notifications,
  LinearGradient
} from "expo";
import NavigationService from "./NavigationService";

import * as actionCreators from "./store/actions";

import AppNavigator from "./components/Navigation";
import { Provider } from "react-redux";
import { Icon as BIcon, Root } from "native-base";

// console.disableYellowBox = true;
import Sentry from "sentry-expo";
import store from "./store";
import FlashMessage from "react-native-flash-message";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

//icons
import PurpleLogo from "./assets/SVGs/PurpleLogo";
import { colors } from "./components/GradiantColors/colors";

// Sentry.enableInExpoDevelopment = true;
Sentry.config(
  "https://e05e68f510cd48068b314589fa032992@sentry.io/1444635"
).install();

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

    // store.dispatch(actionCreators.logout(NavigationService));
  }
  // isFatal: if the error is fatal and will kill the app
  // define your code here...
  // after all, if you want to forward to default error handler
  // just call the variable we stored in the previous step
  defaultErrorHandler(e, isFatal);
};

ErrorUtils.setGlobalHandler(myErrorHandler);
class App extends React.Component {
  state = {
    isLoadingComplete: false,
    splashAnimation: new Animated.Value(0),
    splashFadeAnimation: new Animated.Value(0.01),
    splashAnimationComplete: false,
    isAppReady: false
  };
  constructor(props) {
    super(props);
    // Instruct SplashScreen not to hide yet
    SplashScreen.preventAutoHide();
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
  componentDidMount() {
    Segment.initialize({
      androidWriteKey: "A2VWqYBwmIPRr02L6Sqrw9zDwV0YYrOi",
      iosWriteKey: "A2VWqYBwmIPRr02L6Sqrw9zDwV0YYrOi"
    });

    this._loadAsync();
    //       .then(() => this.setState({ isLoadingComplete: true })) // mark reasources as loaded
    //       .catch(error =>
    //         console.error(`Unexpected error thrown when loading:
    // ${error.stack}`)
    //       );
  }

  _registerForPushNotificationsAsync = async () => {
    const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
    }
  };

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
          <StatusBar barStyle="light-content" />
          <LinearGradient
            colors={["#751AFF", "#6268FF"]}
            locations={[0.3, 1]}
            style={styles.gradient}
          />
          <View
            style={{
              height: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
              backgroundColor: "transparent"
            }}
          />
          <View style={styles.container}>
            <Root>
              <AppNavigator
                uriPrefix={prefix}
                ref={navigatorRef => {
                  //console.log(navigatorRef);
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </Root>
            <FlashMessage icon="auto" duration={4000} position="top" />
          </View>
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

  _loadResourcesAsync = async () => {
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

      Asset.loadAsync([require("./assets/images/knet.png")]),
      Asset.loadAsync([require("./assets/splash.png")]),
      Asset.loadAsync([require("./assets/images/AdTypes/SnapAd.gif")]),
      Asset.loadAsync([require("./assets/images/AdTypes/StoryAd.gif")]),
      Asset.loadAsync([require("./assets/images/AdTypes/CollectionAd.gif")]),

      Font.loadAsync({
        "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
        "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
        "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "montserrat-extralight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
        "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
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
