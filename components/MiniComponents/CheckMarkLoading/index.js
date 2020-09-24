import React from "react";
import { View, Animated } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

class CheckMarkLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMarkLoader: require("../../../assets/animation/checkMarkLoader.json"),
      progress: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
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
          { ...this.props.mainViewStyle },
        ]}
      >
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={[styles.lottieViewContainer, { ...this.props.style }]}
          resizeMode="cover"
          source={this.state.checkMarkLoader}
          progress={this.props.progress}
          // loop={false}
          // onAnimationFinish={() => {
          // 	// console.log("onAnimateFinish lottieView");
          // }}
        />
      </View>
    );
  }
}

export default CheckMarkLoading;
