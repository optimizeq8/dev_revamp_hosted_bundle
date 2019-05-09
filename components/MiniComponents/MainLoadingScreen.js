import React from "react";
import { View, Platform, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";

class MainLoadingScreen extends React.Component {
  state = { visible: true };
  componentDidMount() {
    Platform.OS !== "android" && this.animation.play();
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
            ? heightPercentageToDP(40)
            : heightPercentageToDP(this.props.top),

          alignSelf: "center"
        }}
      >
        {this.props.dash && (
          <>
            <LinearGradient
              colors={["#fff"]}
              locations={[1]}
              style={styles.gradient}
            />
            <View>
              <Image
                source={require("../../assets/images/logoP.png")}
                style={{
                  width: 200,
                  height: 200,
                  bottom: heightPercentageToDP(4)
                }}
                resizeMode="contain"
              />
            </View>
          </>
        )}
        {Platform.OS === "android" ? (
          <ActivityIndicator color="#FF9D00" size="large" />
        ) : (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              zIndex: 10,
              alignSelf: "center",
              width: widthPercentageToDP(150),
              height: widthPercentageToDP(150)
              // position: "absolute"
            }}
            resizeMode="contain"
            source={require("../../assets/animation/loading.json")}
            loop
            autoPlay
          />
        )}
      </View>
    );
  }
}

export default MainLoadingScreen;

const styles = {
  gradient: {
    position: "absolute",
    alignSelf: "center",
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100)
  }
};
