import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import styles from "./styles";

class CameraLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraLoader: require("../../../assets/animation/cameraLoader.json"),
      camera: require("../../../assets/animation/camera.json")
    };
  }
  componentDidMount() {
    this.animation.play();
  }

  onLottieLoad = () => {
    this.animation.play();
  };

  render() {
    return (
      <View
        style={[
          styles.mainView
          //   this.props.top
          //     ? {
          //         top: this.props.top
          //       }
          //     : {},
          //     this
        ]}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={[styles.lottieViewContainer, { ...this.props.style }]}
          resizeMode="cover"
          source={this.state.cameraLoader}
        />
        {/* <LottieView
          ref={animation => {
            this.animationCamera = animation;
          }}
          style={[styles.lottieViewContainer, { ...this.props.style }]}
          resizeMode="cover"
          source={this.state.camera}
        /> */}
      </View>
    );
  }
}

export default CameraLoading;
