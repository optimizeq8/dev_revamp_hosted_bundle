import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, Animated, Easing } from "react-native";
import { Button, Content, Text, Container } from "native-base";
import * as actionCreators from "../../../store/actions";
import { LinearGradient } from "expo";
// Style
import styles, { colors } from "./styles";

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
