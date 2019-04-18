import React from "react";
import { View, Animated, Modal } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { connect } from "react-redux";
class Loading extends React.Component {
  state = { visible: true };
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View
        style={{
          position: "absolute",
          top: heightPercentageToDP(20),

          alignSelf: "center"
        }}
      >
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
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});
export default connect(mapStateToProps)(Loading);
