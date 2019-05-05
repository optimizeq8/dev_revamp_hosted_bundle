import React from "react";
import { connect } from "react-redux";

import { StatusBar, StyleSheet, View, Animated, Image } from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Linking,
  SplashScreen,
  Segment,
  Permissions,
  Notifications
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

// Sentry.enableInExpoDevelopment = true;
Sentry.config(
  "https://e05e68f510cd48068b314589fa032992@sentry.io/1444635"
).install();

// Sentry.captureException(new Error("Oops!"));
// crash;

const defaultErrorHandler = ErrorUtils.getGlobalHandler();

const myErrorHandler = (e, isFatal) => {
  // e: the error thrown
  console.log("errorrr", e);
  if (isFatal) {
    console.log("died", e);
    if (store.getState().transA.walletUsed) {
      if (store.getState().campaignC.campaign_id !== "") {
        console.log("11111111111111111");

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
    splashAnimationComplete: false,
    isAppReady: false
  };
  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide(); // Instruct SplashScreen not to hide yet
  }

  _loadAsync = async () => {
    try {
      await this._loadResourcesAsync();

      this.setState({ isLoadingComplete: true }, () => {
        this._registerForPushNotificationsAsync();
        // this._animateOut();
      });
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
        <AppLoading
          startAsync={this._loadAsync}
          onFinish={() => {
            this.setState({ isLoadingComplete: true });
          }}
          autoHideSplash={true}
          // onError={console.warn}
        />
      );
    } else {
      const prefix = Linking.makeUrl("/");

      return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Root>
              <AppNavigator
                uriPrefix={prefix}
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
              {/* {this._maybeRenderLoadingImage()} */}
            </Root>
            <FlashMessage icon="auto" duration={4000} position="bottom" />
          </View>
        </Provider>
      );
    }
  }
  _maybeRenderLoadingImage = () => {
    if (this.state.splashAnimationComplete) {
      return null;
    }

    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          width: widthPercentageToDP("100%"),
          height: heightPercentageToDP("100%")
        }}
      >
        <Image
          source={require("./assets/images/splash.png")}
          style={{
            width: widthPercentageToDP("100%"),
            height: heightPercentageToDP("110%")
            // position: "absolute",
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            // resizeMode: "cover"
          }}
          onLoadEnd={this._animateOut}
        />
      </View>
    );
  };

  _animateOut = () => {
    SplashScreen.hide();
    Animated.timing(this.state.splashAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start(() => {
      this.setState({ splashAnimationComplete: true });
    });
  };
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/logo01.png")]),
      Asset.loadAsync([require("./assets/images/logo02.png")]),
      Font.loadAsync({
        "montserrat-regular": require("./assets/fonts/BentonSans-Regular.otf"),
        "montserrat-light": require("./assets/fonts/BentonSans-Light.otf"),
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

const mapDispatch = dispatch => ({
  logout: navigation => dispatch(actionCreators(navigation))
});
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#751AFF",
    justifyContent: "center"
  },

  text: { color: "#fff" }
});
