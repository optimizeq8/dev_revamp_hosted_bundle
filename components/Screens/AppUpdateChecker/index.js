//Components
import React, { Component } from "react";
import { Updates } from "expo";

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
      updateDownloaded: false
    };
  }
  async componentDidMount() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        this.setState({ updateDownloaded: true });
        Updates.reloadFromCache();
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    if (this.state.updateDownloaded) {
      return <Tutorial navigation={this.props.navigation} />;
    }
    return (
      <View style={{ height: "100%" }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            resizeMode: "cover"
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
