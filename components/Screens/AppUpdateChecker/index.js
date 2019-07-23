//Components
import React, { Component } from "react";
import { Linking } from "expo";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
const imageLogo = require("../../../assets/images/logo01.png");

import { Image, View, Text, Platform } from "react-native";
import BackdropIcon from "../../../assets/SVGs/BackDropIcon";
import {
  widthPercentageToDP,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Tutorial from "../Tutorial";
import { globalColors } from "../../../GlobalStyles";
import { Button } from "native-base";
class AppUpdateChecker extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      updateDownloaded: false
    };
  }
  async componentDidMount() {
    if (Constants.manifest.version === "0.1.60")
      this.setState({ updateDownloaded: true });

    // try {
    //   const update = await Updates.checkForUpdateAsync();
    //   if (update.isAvailable) {
    //     await Updates.fetchUpdateAsync();
    //     this.setState({ updateDownloaded: true });
    //     Updates.reloadFromCache();
    //   }
    // } catch (e) {
    //   console.log("error", e);
    // }
  }

  render() {
    if (this.state.updateDownloaded) {
      return <Tutorial navigation={this.props.navigation} />;
    } else
      return (
        <View style={{ height: "100%" }}>
          <BackdropIcon
            style={{
              position: "absolute",
              top: -hp("50%"),
              alignSelf: "center"
            }}
            height={hp("100%")}
          />
          <Image
            style={{
              // position: "absolute",
              alignSelf: "center",
              top: "15%",
              height: 150,
              width: "100%",
              margin: 10,
              justifyContent: "flex-start"
            }}
            source={imageLogo}
            resizeMode="contain"
          />

          {/* <Image
            style={{
              width: "100%",
              height: "100%",
              // top: 0,
              // left: 0,
              // bottom: 0,
              // right: 0,
              resizeMode: "cover"
            }}
            source={require("../../../assets/splash.png")}
          /> */}
          <Animatable.View
            animation={"slideInUp"}
            style={{
              alignSelf: "center",
              top: "20%",
              // backgroundColor: "#0009",
              width: "80%",
              height: "20%",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat-bold",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              UPDATE AVAILABLE
            </Text>
            <Text
              style={{
                fontFamily: "montserrat-light",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              You appear to be using an outdated version of OptimizeApp, please
              update to the latest version to enjoy all our features!
            </Text>
          </Animatable.View>
          <Button
            block
            onPress={() =>
              Linking.openURL(
                Platform.OS === "ios"
                  ? "https://apps.apple.com/us/app/optimizeapp/id1462878125"
                  : "https://play.google.com/store/apps/details?id=com.optimizeapp.optimizeapp&hl=en"
              )
            }
            style={{
              backgroundColor: globalColors.orange,
              width: "70%",
              alignSelf: "center",
              top: "40%",
              borderRadius: 15
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat-bold",
                color: globalColors.white,
                textAlign: "center",
                fontSize: 16
              }}
            >
              UPDATE NOW
            </Text>
          </Button>
          {/* <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              zIndex: 10,
              alignSelf: "center",
              position: "absolute",
              width: widthPercentageToDP(20),
              height: widthPercentageToDP(20),
              bottom: 20
              // position: "absolute"
            }}
            resizeMode="contain"
            source={require("../../../assets/animation/update_loader.json")}
            loop
            autoPlay
          /> */}
        </View>
      );
  }
}

export default AppUpdateChecker;
