import React from "react";
import PropTypes from "prop-types";
import { Animated, AppState, Easing, View, ViewPropTypes } from "react-native";
import CircularProgress from "./CircularProgress";
import { globalColors } from "../../../GlobalStyles";
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState(
      {
        fillAnimation: new Animated.Value(prefill)
      },
      () => this.animate(toVal, dur, ease)
    );
  }

  animate(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    const anim = Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }
  animateColor() {
    let animateColorsPercentages = [0, 35, 100];
    let animateColors = [
      this.props.tintColor,
      this.props.tintColorSecondary,
      this.props.tintColorThirdy
    ];
    if (this.props.adDetails) {
      animateColorsPercentages = [0, 15, 35, 65, 85, 100];
      animateColors = [
        globalColors.red,
        globalColors.yellow,
        globalColors.green,
        globalColors.green,
        globalColors.yellow,
        globalColors.red
      ];
    }
    if (!this.props.tintColorSecondary && !this.props.adDetails) {
      return this.props.tintColor;
    }

    const tintAnimation = this.state.fillAnimation.interpolate({
      inputRange: animateColorsPercentages,
      outputRange: animateColors
    });

    return tintAnimation;
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.fillAnimation}
        tintColor={this.animateColor()}
      />
    );
  }
}

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func
};

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0
};
