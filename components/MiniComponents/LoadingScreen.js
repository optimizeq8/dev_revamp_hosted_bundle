import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../GradiantColors/colors";

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
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.4, 1]}
          style={styles.gradient}
        />
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

const styles = {
  gradient: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    height: heightPercentageToDP(100)
  }
};
