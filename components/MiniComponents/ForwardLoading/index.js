import React from "react";
import { View, Animated } from "react-native";
import LottieView from "lottie-react-native";
import CircleLoader from "../CircleLoader/CircleLoader";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import styles from "./styles";

class ForwardLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forwardLoader: require("../../../assets/animation/forwardLoader.json"),
      progress: new Animated.Value(0),
      loop: false,
    };
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
      //   easing: Easing.linear
    }).start();
    this.animation.play();
  }

  onLottieLoad = () => {
    this.animation.play();
  };

  render() {
    return (
      <>
        {this.state.loop ? (
          <CircleLoader bottom={this.props.bottom ? this.props.bottom : 18} />
        ) : (
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
              onAnimationFinish={() => this.setState({ loop: true })}
              style={[styles.lottieViewContainer, { ...this.props.style }]}
              resizeMode="cover"
              loop={false}
              source={this.state.forwardLoader}
              progress={this.state.progress}
            />
          </View>
        )}
      </>
    );
  }
}

export default ForwardLoading;
