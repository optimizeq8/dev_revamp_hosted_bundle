//Components
import React, { Component } from "react";

import { Image, View } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import Tutorial from "../Tutorial";
class AppUpdateChecker extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }
  componentDidMount = async () => {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        this.setState({ update: true });
        Expo.Updates.reloadFromCache();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (!this.state.update) {
      return <Tutorial navigation={this.props.navigation} />;
    }
    return (
      <View style={{ backgroundColor: "yellow", height: "100%" }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            resizeMode: "contain"
          }}
          source={require("../../../assets/images/MainSplash.png")}
        />
        <LottieView
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
        />
      </View>
    );
  }
}

export default AppUpdateChecker;
