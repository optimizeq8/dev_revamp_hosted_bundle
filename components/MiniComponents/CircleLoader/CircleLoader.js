import React, { Component } from "react";
import { Text, View, Animated } from "react-native";
import styles from "./styles";
import LottieView from "lottie-react-native";

export default class CircleLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleLoader: require("../../../assets/animation/update_loader.json"),
      progress: new Animated.Value(0)
    };
  }
  componentDidMount() {
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 1000
    //   //   easing: Easing.linear
    // }).start();
    this.animation.play();
  }

  onLottieLoad = () => {
    this.animation.play();
  };
  render() {
    return (
      <View
        style={[
          styles.mainView,
          {
            bottom: this.props.bottom ? this.props.bottom : 18
          },
          { ...this.props.mainViewStyle }
        ]}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          loop={true}
          style={[styles.lottieViewContainer, { ...this.props.style }]}
          resizeMode="cover"
          source={this.state.circleLoader}
          // progress={this.state.progress}
        />
      </View>
    );
  }
}
