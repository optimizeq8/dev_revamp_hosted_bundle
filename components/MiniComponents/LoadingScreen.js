import React from "react";
import { View, Platform, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../GradiantColors/colors";

class Loading extends React.Component {
  state = { visible: true };
  componentDidMount() {
    // Platform.OS !== "android" &&
    this.animation.play();
  }

  onLottieLoad = () => {
    this.animation.play();
  };

  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: this.props.dash
            ? heightPercentageToDP(50)
            : heightPercentageToDP(this.props.top),

          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            // zIndex: 10,
            alignSelf: "center",
            width: widthPercentageToDP(100),
            height: widthPercentageToDP(150),
            position: "absolute",
            alignContent: "center",
            alignItems: "center"
          }}
          resizeMode="cover"
          source={require("../../assets/animation/loading.json")}
        />
      </View>
    );
  }
}

export default Loading;


const styles = {
  gradient: {
    position: "absolute",
    alignSelf: "center",
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100)
  }
};
