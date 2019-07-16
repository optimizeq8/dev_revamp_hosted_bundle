import React, { Component } from "react";
import { connect } from "react-redux";

import { Image, Animated } from "react-native";
import { Container } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0.5);
    this.animatedValue2 = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 4,
      delay: 2500
    }).start();

    Animated.timing(this.animatedValue2, {
      toValue: 1,
      delay: 200,
      duration: 3000
    }).start();
  }
  render() {
    return (
      <Container style={styles.contentContainer}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />

        <Image
          style={styles.image}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
