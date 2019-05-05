import React from "react";
import { View, Platform, StyleSheet, Image } from "react-native";
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
              colors={[colors.background1, colors.background2]}
              locations={[0.7, 1]}
              style={styles.gradient}
            />
            <View>
              <Image
                source={require("../../assets/images/logo01.png")}
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
          <ActivityIndicator
            color="#FF9D00"
            size="large"
            style={{ top: heightPercentageToDP(this.props.top) }}
          />
        ) : (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              alignSelf: "center",
              width: widthPercentageToDP(150),
              height: widthPercentageToDP(150),
              position: "absolute"
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

const mapStateToProps = state => ({
  loading: state.auth.loading
});
export default connect(mapStateToProps)(Loading);

const styles = {
  gradient: {
    position: "absolute",
    alignSelf: "center",
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100)
  }
};
