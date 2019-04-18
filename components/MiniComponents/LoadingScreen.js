import React from "react";
import { View, Platform } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
class Loading extends React.Component {
  state = { visible: true };
  componentDidMount() {
    Platform.OS !== "android" && this.animation.play();
  }

  onLottieLoad = () => {
    console.log("play lottie");
    this.animation.play();
  };

  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: heightPercentageToDP(20),

          alignSelf: "center"
        }}
      >
        {Platform.OS === "android" ? (
          <ActivityIndicator color="#FF9D00" size="large" />
        ) : (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: widthPercentageToDP(150),
              height: widthPercentageToDP(150)
            }}
            resizeMode="contain"
            source={require("../../assets/animation/loading.json")}
            loop
            autoPlay
            ardwareAccelerationAndroid={true}
            renderToHardwareTextureAndroid={true}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});
export default connect(mapStateToProps)(Loading);
