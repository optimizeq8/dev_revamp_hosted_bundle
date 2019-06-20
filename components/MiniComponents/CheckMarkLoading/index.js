import React from "react";
import { View, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

class CheckMarkLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkMarkLoader: require("../../../assets/animation/checkMarkLoader.json"),
      progress: new Animated.Value(0)
    };
  }
  componentDidMount() {
    this.animation.play();
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 2000
    //   //   easing: Easing.linear
    // }).start(() => {
    //   console.log("onAnimationFnish");
    //   if (this.props.navigate) {
    //     this.props.navigation();
    //   }
    // });
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
          source={this.state.checkMarkLoader}
          progress={this.props.progress}
          loop={false}
          onAnimationFinish={() => {
            // console.log("onAnimateFinish lottieView");
          }}
        />
      </View>
    );
  }
}

export default CheckMarkLoading;
