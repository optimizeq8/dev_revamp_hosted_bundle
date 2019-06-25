import React from "react";
import { View, Animated } from "react-native";
import LottieView from "lottie-react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import styles from "./styles";

class ForwardLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forwardLoader: require("../../../assets/animation/forwardLoader.json"),
      progress: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 1000
      //   easing: Easing.linear
    }).start();
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
          { bottom: this.props.bottom ? this.props.bottom : 18 },
          { ...this.props.mainViewStyle }
        ]}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={[styles.lottieViewContainer, { ...this.props.style }]}
          resizeMode="cover"
          source={this.state.forwardLoader}
          progress={this.state.progress}
        />
      </View>
    );
  }
}

export default ForwardLoading;
